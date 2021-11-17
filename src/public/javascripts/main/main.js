class Main {
    constructor() {
        this.body = document.body;
        this.search = document.getElementById("search");
        this.userName();
    }

    async userName() {
        // this.search.addEventListener("click", async () => {
        //     const nickname = document.getElementsByName("nickname")[0].value;

        //     window.location.href = `/summoners/info?nickname=${nickname}`;
            // //Summoner의 NAME, PUUID 등 정보를 가져옴
            // const resultOfSummonerInfo = await fetch(
            //     `/summoners/info?nickname=${nickname}`,
            //     {
            //         headers: { "Content-Type": "application/json" },
            //         method: "GET",
            //     }
            // );

            // const jsonOfSummonerInfo = await resultOfSummonerInfo.json();

            // //Summoner nickname을 이용해서 최근 20게임의 matchId를 가져옴
            // const resultOfMatchId = await fetch(
            //     `/summoners/match?nickname=${nickname}`,
            //     {
            //         headers: { "Content-Type": "application/json" },
            //         method: "GET",
            //     }
            // );

            // const jsonOfMatchId = await resultOfMatchId.json();
        });
    }
}
