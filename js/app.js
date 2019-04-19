/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
document.addEventListener("DOMContentLoaded", () => {
    const phraseContainer = document.getElementsByTagName("ul")[0];
    const scoreBar = document.getElementById('scoreboard').getElementsByTagName('img');
    const wrapper = document.getElementById('overlay');
    const button = document.getElementById('btn__reset');
    const game = new Game(phraseContainer, phrases, scoreBar, wrapper);

    activateKeyboard(game);
    
    button.addEventListener('click', () => {
        changeHearts(scoreBar, "images/live.svg");
        game.overlay.style.display = 'none';
        game.starGame();
    });
});
// Change the hearts by hearts alive
function changeHearts(scoreBar, image) {
    for (const heart of scoreBar) {
        heart.src = image;
    }
}
// Add event listeners when you press on a key
function activateKeyboard(game) {
    const keys = document.getElementById('qwerty');
    let selectedKeys = [];

    document.addEventListener('keyup', (e) => {
        if (game.active && selectedKeys.indexOf(e.key) === -1) {
            selectedKeys.push(e.key);

            for (const keysrow of keys.children) {
                for (const button of keysrow.children) {
                    if (button.textContent === e.key) {
                        if (game.handleInteraction(button)) {
                            selectedKeys = [];
                        }
                        return;
                    }
                }
            }
        }
          
    });

    keys.addEventListener('click', (e) => {
        const selected = e.target;
        
        if (game.active && selected.tagName === "BUTTON") {
            selectedKeys.push(selected.textContent);
            
            if (game.handleInteraction(selected)) {
                selectedKeys = [];
            }
        }
    })
}