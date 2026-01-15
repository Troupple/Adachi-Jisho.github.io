function getLocalDateOnly(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
}

function updateClock() {
    const now = new Date();

    document.getElementById("currentDate").textContent =
        now.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

    document.getElementById("currentTime").textContent =
        now.toLocaleTimeString();

    const tomorrow = new Date(now);
    tomorrow.setHours(24, 0, 0, 0);

    const diff = tomorrow - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("countdown").textContent =
        `Time until tomorrow: ${hours}h ${minutes}m ${seconds}s`;
}

async function loadWordOfTheDay() {
    const response = await fetch("JapaneseWordofDayData.csv");
    const text = await response.text();

    const rows = text.trim().split("\n").slice(1);
    const words = rows.map(row => {
        const [day, kanji, romaji, enunciation, definition] = row.split(",");
        return { kanji, romaji, enunciation, definition };
    });

    const startDate = getLocalDateOnly(new Date(2026, 0, 13));
    const today = getLocalDateOnly(new Date());
    const dayIndex = Math.abs(
        Math.floor((today - startDate) / (1000 * 60 * 60 * 24))
    ) % words.length;

    const word = words[dayIndex];

    document.getElementById("kanji").textContent = word.kanji;
    document.getElementById("romaji").textContent = `Romaji: ${word.romaji}`;
    document.getElementById("enunciation").textContent = `Enunciation: ${word.enunciation}`;
    document.getElementById("definition").textContent = `Definition: ${word.definition}`;
}
	
updateClock();
setInterval(updateClock, 1000);
loadWordOfTheDay();
