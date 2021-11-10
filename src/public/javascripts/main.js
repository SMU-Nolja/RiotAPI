class Main {
    constructor() {
        this.body = document.body;
        this.search = document.getElementById("search");
        this.userName();
    }

    async userName() {
        this.search.addEventListener("click", async () => {
            const nickname = document.getElementsByName("nickname")[0].value;

            console.log(encodeURI(nickname));
            const res = await fetch(`/summoners/info?nickname=${nickname}`, {
                headers: { "Content-Type": "application/json" },
                method: "GET",
            });
            console.log(res);

            const res2 = await fetch(`/summoners/match?nickname=${nickname}`, {
                headers: { "Content-Type": "application/json" },
                method: "GET",
            });
            console.log(res2);

            const jsonRes = await res.json();
            const jsonRes2 = await res2.json();

            console.log(jsonRes);
            console.log(jsonRes2);

            const n = document.createElement("div");
            n.innerHTML = jsonRes.name;
            n.innerHTML = jsonRes2;
            this.body.appendChild(n);
        });
    }
}
