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

        this.matchInfo = await matchInfoJson.json();
        const content = this.body.getElementsByClassName("content")[0];

        const info = document.createElement("div");
        info.className = "info";
        info.innerHTML = contentInfo;
        content.appendChild(info);

        const match = info.childNodes[0];
        match.innerHTML = this.matchInfo[0].matchInfo.end_time_stamp;

        const participant = info.childNodes[1];
        participant.innerHTML = this.matchInfo[0].participantInfo[0].puuid;
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
<div class="participant"></div>`;
