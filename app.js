// VÄDER

async function hamtaVader() {
    try {
        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=59.57&longitude=17.53&current_weather=true"
        );

        const data = await response.json();

        const temperatur = data.current_weather.temperature;
        const vind = data.current_weather.windspeed;
        const vaderkod = data.current_weather.weathercode;

        let vadertext = "";
        let emoji = "";

        switch (vaderkod) {
            case 0:
                vadertext = "Klart väder";
                emoji = "☀️";
                break;

            case 1:
            case 2:
            case 3:
                vadertext = "Delvis molnigt";
                emoji = "⛅";
                break;

            case 45:
            case 48:
                vadertext = "Dimma";
                emoji = "🌫️";
                break;

            case 51:
            case 53:
            case 55:
                vadertext = "Duggregn";
                emoji = "🌦️";
                break;

            case 61:
            case 63:
            case 65:
                vadertext = "Regn";
                emoji = "🌧️";
                break;

            case 71:
            case 73:
            case 75:
                vadertext = "Snö";
                emoji = "❄️";
                break;

            case 95:
                vadertext = "Åskväder";
                emoji = "⛈️";
                break;

            default:
                vadertext = "Okänt väder";
                emoji = "🌤️";
        }

        document.getElementById("vaderOrt").textContent =
            "📍 Stockholm";

        document.getElementById("vaderTemp").textContent =
            `${emoji} ${temperatur}°C`;

        document.getElementById("vaderStatus").textContent =
            `${vadertext} • Vind ${vind} m/s`;

    } catch (error) {

        document.getElementById("vaderOrt").textContent =
            "Kunde inte hämta vädret";

        document.getElementById("vaderTemp").textContent = "";

        document.getElementById("vaderStatus").textContent = "";

        console.error(error);
    }
}

hamtaVader();


// SCROLL TO TOP

const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 600) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
});

scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// ÖPPET / STÄNGT

function uppdateraOppetStatus() {

    const nu = new Date();

    const timmar = String(
        nu.getHours()
    ).padStart(2, "0");

    const minuter = String(
        nu.getMinutes()
    ).padStart(2, "0");

    const sekunder = String(
        nu.getSeconds()
    ).padStart(2, "0");

    const veckodagar = [
        "Söndag",
        "Måndag",
        "Tisdag",
        "Onsdag",
        "Torsdag",
        "Fredag",
        "Lördag"
    ];

    const dag = nu.getDay();
    const klockslag = nu.getHours() + nu.getMinutes() / 60;

    document.getElementById("tid").textContent =
        `Tid: ${timmar}:${minuter}:${sekunder}`;

    document.getElementById("datum").textContent =
        `Idag är det ${veckodagar[dag]}`;

    let oppet = false;

    if (dag >= 1 && dag <= 5) {
        oppet = klockslag >= 7 && klockslag < 18;
    }

    else if (dag === 6) {
        oppet = klockslag >= 9 && klockslag < 14;
    }

    const statusElement =
        document.getElementById("status");

    if (oppet) {

        statusElement.textContent =
            "🟢 Vi har öppet just nu";

        statusElement.style.color =
            "#2E7D32";

    } else {

        statusElement.textContent =
            "🔴 Vi har stängt just nu";

        statusElement.style.color =
            "#C62828";
    }
}

uppdateraOppetStatus();

setInterval(
    uppdateraOppetStatus,
    1000
);


// BOKNINGSSYSTEM

class Bokningslista {

    constructor() {
        this.bokningar =
            JSON.parse(
                localStorage.getItem("bokningar")
            ) || [];
    }

    laggTill(bokning) {
        this.bokningar.push(bokning);
        this.spara();
    }

    taBort(id) {

        this.bokningar =
            this.bokningar.filter(
                bokning => bokning.id !== id
            );

        this.spara();
    }

    spara() {
        localStorage.setItem(
            "bokningar",
            JSON.stringify(this.bokningar)
        );
    }
}

const bokningsLista =
    new Bokningslista();

const form =
    document.getElementById("bokningsForm");

const lista =
    document.getElementById("bokningsLista");

const felmeddelande =
    document.getElementById("felmeddelande");

function renderaBokningar() {

    lista.innerHTML = "";

    if (bokningsLista.bokningar.length === 0) {

        lista.innerHTML =
            "<li>Inga bokningar än.</li>";

        return;
    }

    bokningsLista.bokningar.forEach(
        bokning => {

            const li =
                document.createElement("li");

            li.innerHTML = `
                ${bokning.hund} - ${bokning.datum}
                <button data-id="${bokning.id}">
                    Avboka
                </button>
            `;

            lista.appendChild(li);
        }
    );
}

form.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        const hund =
            document.getElementById("hund")
                .value
                .trim();

        const datum =
            document.getElementById("bokningsDatum")
                .value;

        felmeddelande.style.color =
            "#C62828";

        if (!hund || !datum) {

            felmeddelande.textContent =
                "⚠️ Fyll i både hundens namn och önskat datum.";

            return;
        }

        const nyBokning = {
            id: Date.now(),
            hund,
            datum
        };

        bokningsLista.laggTill(
            nyBokning
        );

        renderaBokningar();

        felmeddelande.style.color =
            "#2E7D32";

        felmeddelande.textContent =
            "✅ Bokningsförfrågan sparad!";

        form.reset();
    }
);

lista.addEventListener(
    "click",
    (event) => {

        if (
            event.target.tagName === "BUTTON"
        ) {

            const id = Number(
                event.target.dataset.id
            );

            bokningsLista.taBort(id);

            renderaBokningar();
        }
    }
);

renderaBokningar();