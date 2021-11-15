const $ = document.createElement;

class SummonerInfo {
    constructor() {
        this.body = document.body;
        this.drawPage();
    }

    async drawPage() {
        const summonerInfo = $("div").innerHTML(jsonOfSummonerInfo);
        const matchIds = $("div").innerHTML(jsonOfMatchId);

        this.body.appendChild(summonerInfo);
        this.body.appendChild(matchIds);
    }
}
