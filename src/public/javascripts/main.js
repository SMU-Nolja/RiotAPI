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

            const jsonRes = await res.json();
            console.log(jsonRes);

            const n = document.createElement("div");
            n.innerHTML = jsonRes.name;
            this.body.appendChild(n);
        });
    }
}
