
class Board {
    constructor(containerHTML, active = false) {
        this.container = containerHTML;
        this.active = active;
        this.phrase = null;
    }
    // Obtains a new phrase and draw it
    drawGame(phrase) {
        this.phrase = new Phrase(phrase);
        const boxes = this.addPhraseToDisplay();
        for (const box of boxes) {
            this.container.appendChild(box);
        }
        this.active = true;
    }
    // Clean the board
    eraseGame() {
        this.container.innerHTML = "";
        this.active = false;
    }
    // break the phrase in letters
    addPhraseToDisplay() {
        const letters = this.phrase.phrase.split('');
        const lettersBoxes = letters.map( letter => {
            const box = document.createElement('li');
            if (letter === ' '){
                box.className = `space`;
            }
            else {
                box.className = `hide letter ${letter}`;
                box.innerHTML = '?';
            }
            return box;
        });
        return lettersBoxes;
    }
    // Changes the letter style
    showMatchedLetter(char) {
        const letters = this.container.children;
        const exists = this.phrase.checkLetter(char);
        if (exists.length === 0) {
            return false;
        }

        for (const index of exists) {
            const letter = letters[index];
            const classShow = letter.className.replace("hide", "show");
            letter.className = classShow;
            letter.textContent = char;
        }

        return true;
    }
    // Adds an animation to all letters
    animationTime(animation) {
        const boxes = this.container.children;

        for (let i = 0; i < boxes.length; i++) {
            setTimeout(() => {
                const c = boxes[i].className;
                boxes[i].className = `${animation} ${c}`;
                if (animation === "hinge") {
                    setTimeout(() => {
                        boxes[i].style.opacity = 0;
                    }, 100 + (i * 50));
                }
            }, 200 + (i * 100));
        }

        return (4000 + (boxes.length * 100));
    }
}