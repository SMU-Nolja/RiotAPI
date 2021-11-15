class Info {
    constructor() {
        this.body = document.body;
        this.query = window.location.href.split("?")[1];
        this.summonerInfo;

        this.getPage();
    }

    async getPage() {
        //소환사의 정보(puud, name 등)를 가져온다.
        const summonerInfoJson = await fetch(
            `/summoners/info/summonerInfo?${this.query}`,
            { headers: { "Content-Type": "application/json" }, method: "GET" }
        );

        this.summonerInfo = await summonerInfoJson.json();

        console.log(this.summonerInfo);
    }
}
