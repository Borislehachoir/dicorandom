const wrapper = document.querySelector(".wrapper"),
    searchInput = wrapper.querySelector("input"),
    infoText = wrapper.querySelector(".info-text"),
    synonyms = wrapper.querySelector(".synonyms .list"),
    removeIcon = wrapper.querySelector(".search span");

/* Dico de base la */
let dictionary = [];
let randomWords = [];

fetch("dico.json")
    .then(res => res.json())
    .then(data => {
        dictionary = data;
        randomWords = dictionary.map(entry => entry.Mot.toLowerCase());
    });

/* Faire la recherche avec des fonctions*/
function search(word) {
    word = word.trim().toLowerCase();
    searchInput.value = word;

    const entry = dictionary.find(
        item => item.Mot.toLowerCase() === word
    );

    if (!entry) {
        wrapper.classList.remove("active");
        infoText.style.color = "#f00";
        infoText.innerHTML = `Mot introuvable : <span>"${word}"</span>`;
        return;
    }

    wrapper.classList.add("active");
    infoText.style.color = "#000";
    infoText.innerHTML = "";

    document.querySelector(".word p").innerText = entry.Mot;
    document.querySelector(".word span").innerText = "Français";

    const meaningSpan = document.querySelector(".meaning span");
    meaningSpan.innerText = entry["Définition"];
    meaningSpan.style.whiteSpace = "pre-line";

    document.querySelector(".example span").innerText = entry["Exemple"];

    const etySpan = document.querySelector(".etymology span");
    etySpan.innerText = entry["Étymologie"] || "AAA";
    etySpan.style.whiteSpace = "pre-line";
}
/* gestion recherche quand j'appuie sur entrée*/
searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter") {
        search(searchInput.value);
    }
});

/*Gestion de la touche R*/
document.addEventListener("keydown", e => {
    if (e.key.toLowerCase() === "r") {
        if (!randomWords.length) return;
        const word = randomWords[Math.floor(Math.random() * randomWords.length)];
        search(word);
    }
});

/* Reset le truc */
removeIcon.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.style.color = "#9A9A9A";
    infoText.innerHTML = "Appuyez sur R et découvrez un mot français totalement inconnu !";
});