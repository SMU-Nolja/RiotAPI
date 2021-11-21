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

        this.body.getElementsByClassName("name")[0].innerHTML = this.summonerInfo.NAME;

        // 소환사의 경기 정보를 가져온다.
        const matchInfoJson = await fetch(
            `/summoners/info/matchInfo?${this.query}`,
            { headers: { "Content-Type": "application/json" }, method: "GET" }
        );

        this.matchInfo = await matchInfoJson.json();
        this.body.getElementsByClassName("name")[0].innerHTML = this.matchInfo;
        
        // 소환사의 현재 경기 정보를 가져온다.
        const currentGameInfoJson = await fetch(
            `/summoners/info/currentGameInfo?${this.query}`,
            { headers: { "Content-Type": "application/json" }, method: "GET" }
        );

        this.currentGameInfo = await currentGameInfoJson.json();
    }
}
