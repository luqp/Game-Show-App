/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
    constructor(phrase) {
        this.phrase = phrase;
    }

    get phrase() {
        return this._phrase;
    }

    set phrase(randomPhrase) {
        this._phrase = randomPhrase.toLowerCase();
    }

    checkLetter(letter) {
        const inPhrase = [];
        let position  = this.phrase.indexOf(letter);
        while ( position != -1 ) {
            inPhrase.push(position);
            position = this.phrase.indexOf(letter, position + 1);
        }
        return inPhrase;
    }
 }
