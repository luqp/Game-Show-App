/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById('btn__reset');
    
    button.addEventListener('click', play);
})

function play() {
    const phraseContainer = document.getElementsByTagName("ul")[0];
    const overlay = document.getElementById('overlay');
    const game = new Game(phraseContainer, overlay, getScoreBar());
    
    overlay.style.display = 'none';
    
    game.starGame();
    activateKeyboard(game, overlay);
    
}

function activateKeyboard(game) {
    const keys = document.getElementById('qwerty');
    keys.addEventListener('click', (e) => {
        const selected = e.target;

        if (selected.tagName !== "BUTTON") {
            return;
        }
        
        game.handleInteraction(selected, );
    })

}

function getScoreBar() {
    const container = document.getElementById('scoreboard');
    return container.getElementsByTagName('img');
}

