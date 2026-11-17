const wasserstand = document.querySelector("#wasserstand");
const bohnenstand = document.querySelector("#bohnenstand");
const milchstand = document.querySelector("#milchstand");
const zuckerstand = document.querySelector("#zuckerstand");
const displayStatus = document.querySelector(".displayStatus");
const reinigenBtn = document.querySelector("#reinigen");
const heizenBtn = document.querySelector("#heizen");
const startBtn = document.querySelector("#start");
const ausBtn = document.querySelector("#aus");
const getraenke = ["Espresso", "Kaffee", "Tee", "Cappucino"];
const aktuelleTemparatur = document.querySelector(".temp dd");
let aktuelleTemparaturZahl = parseInt(document.querySelector(".temp dd").textContent, 0);
let zielTemparatur = 90;
let maschieneSauber = true;
let auswahl = "";



function vorraetePruefen() {
    let wasserstandWert = wasserstand.value;
    let bohnenstandWert = bohnenstand.value;
    let milchstandWert = milchstand.value;
    let zuckerstandWert = zuckerstand.value;
    if (wasserstandWert < 20) {
        console.log("Wasserstand niedrig! Bitte nachfüllen.")
    }else if (bohnenstandWert < 10) {
        console.log("Bohnenstand niedrig! Bitte nachfüllen.")
    }else if (milchstandWert < 20) {
        console.log("Milchstand niedrig! Bitte nachfüllen.")
    }else if (zuckerstandWert < 5) {
        console.log("Zuckerstand niedrig! Bitte nachfüllen.")
    }else {
        console.log("Alle Vorräte ausreichend.")
    };
    return true
}



function auswahlGetraenke(getraenk) {
    auswahl = getraenk;
    let wasserstandWert = wasserstand.value;
    let bohnenstandWert = bohnenstand.value;
    let milchstandWert = milchstand.value;
    let zuckerstandWert = zuckerstand.value;
    

    switch (getraenk) {
        case "Espresso":
            if (wasserstandWert >= 30 && bohnenstandWert >= 10 && tempPrüfen()) {
                displayStatus.textContent = "Getränk: " + auswahl;
                return true;
            }
            break;
        case "Cappucino":
            if (wasserstandWert >= 30 && bohnenstandWert >= 10 && milchstandWert >= 50 && tempPrüfen()) {
                displayStatus.textContent = "Getränk: " + auswahl;
                return true;
            }
            break;
        case "Kaffee":
            if (wasserstandWert >= 30 && bohnenstandWert >= 10 && tempPrüfen()) {
                displayStatus.textContent = "Getränk: " + auswahl;
                return true;
            }
            break;
        case "Tee":
            if (wasserstandWert >= 30 && tempPrüfen()) {
                displayStatus.textContent = "Getränk: " + auswahl;
                return true;
            }
            break;
        default:
                displayStatus.textContent = "Getränk unbekannt.";
                return false;
    };
    startPruefen()
} 

function tempPrüfen () {
    if (aktuelleTemparaturZahl < zielTemparatur) {
        displayStatus.textContent = "Wasser zu kalt! Bitte erhitzen.";
        return false
    }
    return true
}

function heizen() {
    while (aktuelleTemparaturZahl < zielTemparatur) {
        displayStatus.textContent = "Heizen";
        aktuelleTemparaturZahl += 10;
        aktuelleTemparatur.textContent = aktuelleTemparaturZahl + "°C";
        
    }
    return true
}
heizenBtn.onclick = heizen;

function startPruefen() {
    if (tempPrüfen() && auswahlGetraenke() && vorraetePruefen()) {
        startBtn.disabled = false
        return true
    }
}


function maschieneReinigen() {
    let reinigung = document.querySelector(".reinigung dd");
    let text = reinigung.textContent;
    let anzahl = parseInt(text, 10);
    if(anzahl < 1) {
        maschieneSauber = false;
        reinigung.textContent = "Reinigung nötig !";
        reinigung.style.color = "red";
        reinigung.style.fontWeight = "bold";
        do {
            alert("Maschine wird gereinigt");
            maschieneSauber = true;
        } while (!maschieneSauber);
    }else {
        const neuerWert = anzahl - 1;
        reinigung.textContent = neuerWert + "Tassen";
    }
}
reinigenBtn.onclick = maschieneReinigen;


/*
//Zählschleife
for (let i = 1; i <= 3; i++) {
    console.log(i, ". Spühllauf");
    console.log(i + ". Spühllauf");
    console.log(`${i}. Spühllauf`);
}
*/

function systemBereit() {
    if (maschieneReinigen() == false && tempPrüfen() == false) {
        displayStatus.textContent = "System nicht bereit";
        return false
    } else if (maschieneReinigen() == true && tempPrüfen() == true) {
        displayStatus.textContent = "System bereit";
        return true
    }
}



function bruehenStarten() {
    if (aktuelleTemparaturZahl == zielTemparatur && auswahl == true && systemBereit == true && vorraetePruefen == true) {
        displayStatus.textContent = auswahl + " wird zubereitet.."
    }
}
startBtn.onclick = bruehenStarten;





/*
for (let i = 0; i < getraenke.length; i++) {
    console.log(getraenke[i]);
};

getraenke.forEach((getraenkAuswahl) => {
    console.log(getraenkAuswahl)
});
*/

function kaffeeMachen(typ, menge) {
    console.log(`Bereite ${typ} zu. Nimm eine Tasse, die mindestens ${menge}ml hat.`);
}

function berechnePreis(anzahlTassen, preis) {
    console.log("berechne....")
    return anzahlTassen * preis;
}





// Testfälle
/* temparatur ausgabe 
    45        kalt
    60        optimal
    75        optimal
    90        optimal
    95        warm
    */