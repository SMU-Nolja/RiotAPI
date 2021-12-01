class Info {
    constructor() {
        this.body = document.body;
        this.query = window.location.href.split("?")[1];
        this.summonerInfo;
        this.currentGameInfo;

        this.getPage();
    }

    async getPage() {
        // 소환사의 정보(puud, name 등)를 가져온다.
        const summonerInfoJson = await fetch(
            `/summoners/info/summonerInfo?${this.query}`,
            { headers: { "Content-Type": "application/json" }, method: "GET" }
        );

        this.summonerInfo = await summonerInfoJson.json();

        this.body.getElementsByClassName("name")[0].innerHTML =
            this.summonerInfo.NAME;

        // 소환사의 경기 정보를 가져온다.
        const matchInfoJson = await fetch(
            `/summoners/info/matchInfo?${this.query}`,
            { headers: { "Content-Type": "application/json" }, method: "GET" }
        );

        //20개의 경기정보
        const matchInfo = await matchInfoJson.json();
        const content = this.body.getElementsByClassName("content")[0];
        for (const match of matchInfo) {
            //한 경기의 정보가 들어가는 div생성
            const infoNode = document.createElement("div");
            infoNode.className = "info";
            infoNode.innerHTML = contentInfo;
            content.appendChild(infoNode);

            const matchNode = infoNode.childNodes[0];
            const participantNode = infoNode.childNodes[1];

            const matchDuration = new Date(match.matchInfo.game_duration * 1000)
                .toISOString()
                .substr(11, 8);
            matchNode.innerText = `게임종료시간: ${match.matchInfo.end_time_stamp}  게임 시간: ${matchDuration}`;

            console.log(match.matchInfo);
            console.log(match.participantInfo);

            createParticipantDivs(match.participantInfo, participantNode);

            for (const participant of match.participantInfo) {
            }
        }

        // const info = document.createElement("div");
        // info.className = "info";
        // info.innerHTML = contentInfo;
        // content.appendChild(info);

        // const match = info.childNodes[0];
        // match.innerHTML = matchInfo[0].matchInfo.end_time_stamp;

        // const participant = info.childNodes[1];
        // participant.innerHTML = matchInfo[0].participantInfo[0].puuid;
    }
}

// function createContent() {
//     const info = document.createElement("div");

//     const participantDiv = document.createElement("div");
//     participantDiv.className = "participant";

//     const matchDiv = document.createElement("div");
//     matchDiv.className = "match";

//     content.appendChild(matchDiv);
//     content.appendChild(participantDiv);

//     return content;
// }

const contentInfo = `<div class="match"> </div>\
<div class="participants"></div>`;

const createParticipantDivs = (participantArray, parentDiv) => {
    for (const participant of participantArray) {
        const championImage = `http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${participant.champion_name}.png`;
        const participantDiv = document.createElement("img");
        participantDiv.src = championImage;
        participantDiv.style.width = "50px";
        participantDiv.style.height = "50px";
        participantDiv.className = "participant";

        parentDiv.appendChild(participantDiv);
    }
};
