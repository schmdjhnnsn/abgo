// script.js
import { terms, phrases } from './data.js'; // Importiere die Daten

document.addEventListener('DOMContentLoaded', () => {
    const bingoBoard = document.getElementById('bingo-board');

    // Funktion zum Mischen eines Arrays (Fisher-Yates Algorithmus)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Tausche Elemente
        }
    }

    // Mische die Begriffe und Sprüche, damit sie bei jedem Spiel anders sind
    const shuffledTerms = [...terms]; // Kopie erstellen, damit das Original nicht verändert wird
    const shuffledPhrases = [...phrases]; // Kopie erstellen
    shuffleArray(shuffledTerms);
    shuffleArray(shuffledPhrases);

    // Erstelle 25 Kacheln (5x5)
    for (let i = 0; i < 25; i++) {
        const tile = document.createElement('div');
        tile.classList.add('bingo-tile');
        
        // Überprüfe, ob genügend Begriffe/Sprüche vorhanden sind
        const currentTerm = shuffledTerms[i % shuffledTerms.length];
        const currentPhrase = shuffledPhrases[i % shuffledPhrases.length];

        tile.dataset.term = currentTerm; // Speichert den verdeckten Begriff
        tile.dataset.phrase = currentPhrase; // Speichert den aufgedeckten Spruch
        tile.textContent = currentTerm; // Zeigt den Begriff initial an

        tile.addEventListener('click', () => {
            if (!tile.classList.contains('revealed')) {
                tile.classList.add('revealed');
                tile.textContent = tile.dataset.phrase; // Zeigt den Spruch
            }
        });
        bingoBoard.appendChild(tile);
    }
});
