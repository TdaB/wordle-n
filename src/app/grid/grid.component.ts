import { Component, HostListener, Input, OnInit } from '@angular/core';
import { GameConfig } from '../game-config';
import { Square } from '../square';
import { Word } from '../word';
import { WordlistService } from '../wordlist.service';
import { ALPHA_DICT_DEFAULT } from '../alpha-dict-default';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  @Input() config!: GameConfig;
  guessedWords: Word[] = [];
  currentWord: string = '';
  alphaDict = { ...ALPHA_DICT_DEFAULT };

  constructor(private wordlistService: WordlistService) { }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;

    if (key.length === 1 && /[a-zA-Z]/.test(key) && this.currentWord.length < this.config.wordLength) {
      this.currentWord += key.toLowerCase();
    } else if (key === 'Enter' && this.currentWord.length === this.config.wordLength) {
      this.handleWordSubmission();
    } else if ((key === 'Backspace' || key === 'Delete') && this.currentWord.length > 0) {
      this.currentWord = this.currentWord.substring(0, this.currentWord.length - 1);
    } else if (key === 'Escape') {
      this.currentWord = '';
    }
  }

  async handleWordSubmission(): Promise<void> {
    if (this.currentWord === this.config.randomWord) {
      alert("YOU FUCKING WON!!!!!");
      await this.resetGrid();
      return;
    }
    if (await this.wordlistService.isValidWord(this.currentWord)) {
      this.pushCurrentWord();
      if (this.guessedWords.length === this.config.guesses) {
        alert("YOU FUCKING RAN OUT OF GUESSES!!!!!\nTHE FUCKING WORD WAS: " + this.config.randomWord);
        await this.resetGrid();
        return;
      }
      this.currentWord = '';
    } else {
      alert("INVALID FUCKING WORD!!!!!");
      this.currentWord = '';
    }
  }

  pushCurrentWord(): void {
    let squares: Square[] = [];

    for (let i = 0; i < this.config.randomWord.length; i++) {
      let currentChar = this.currentWord.charAt(i);
      if (currentChar === this.config.randomWord.charAt(i)) {
        squares.push({
          letter: currentChar,
          color: 'lightgreen'
        })
        this.alphaDict[currentChar] = 'lightgreen';
      } else if (this.config.randomWord.includes(currentChar)) {
        squares.push({
          letter: currentChar,
          color: 'lightyellow'
        })
        if (this.alphaDict[currentChar] !== 'lightgreen') {
          this.alphaDict[currentChar] = 'lightyellow';
        }
      } else {
        squares.push({
          letter: currentChar,
          color: 'lightgray'
        })
        this.alphaDict[currentChar] = 'lightgray';
      }
    }

    this.guessedWords.push({
      squares: squares
    });
  }

  async resetGrid(): Promise<void> {
    this.guessedWords = [];
    this.currentWord = '';
    this.config.randomWord = await this.wordlistService.getRandomWord(this.config.wordLength);
    this.alphaDict = { ...ALPHA_DICT_DEFAULT };
  }
}
