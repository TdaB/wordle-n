import { Component, HostListener, Input } from '@angular/core';
import { GameConfig } from '../game-config';
import { Square } from '../square';
import { Word } from '../word';
import { WordlistService } from '../wordlist.service';
import { ALPHA_DICT_DEFAULT } from '../alpha-dict-default';
import { MatDialog } from '@angular/material/dialog';
import { VictoryDialogComponent } from '../victory-dialog/victory-dialog.component';
import { LossDialogComponent } from '../loss-dialog/loss-dialog.component';
import { InvalidWordDialogComponent } from '../invalid-word-dialog/invalid-word-dialog.component';
import { Color } from 'src/color';

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

  constructor(
    private wordlistService: WordlistService,
    public dialog: MatDialog) { }

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
      this.openVictoryDialog();
    } else if (await this.wordlistService.isValidWord(this.currentWord)) {
      this.pushCurrentWord();
      this.currentWord = '';
      if (this.guessedWords.length === this.config.guesses) {
        this.openLossDialog();
      }
    } else {
      this.openInvalidWordDialog();
    }
  }

  openVictoryDialog() {
    const dialogRef = this.dialog.open(VictoryDialogComponent, {
      data: this.config.randomWord,
      restoreFocus: false
    });
    dialogRef.keydownEvents().subscribe(_ => {
      dialogRef.close();
    });
    dialogRef.afterClosed().subscribe(_ => {
      this.resetGrid();
    });
  }

  openLossDialog() {
    const dialogRef = this.dialog.open(LossDialogComponent, {
      data: this.config.randomWord,
      restoreFocus: false
    });
    dialogRef.keydownEvents().subscribe(_ => {
      dialogRef.close();
    });
    dialogRef.afterClosed().subscribe(_ => {
      this.resetGrid();
    });
  }

  openInvalidWordDialog() {
    const dialogRef = this.dialog.open(InvalidWordDialogComponent, {
      data: this.currentWord,
      restoreFocus: false
    });
    dialogRef.keydownEvents().subscribe(_ => {
      dialogRef.close();
    });
    dialogRef.afterClosed().subscribe(_ => {
      this.currentWord = '';
    });
  }

  pushCurrentWord(): void {
    let squares: Square[] = [];

    for (let i = 0; i < this.config.randomWord.length; i++) {
      let currentChar = this.currentWord.charAt(i);
      if (currentChar === this.config.randomWord.charAt(i)) {
        squares.push({
          letter: currentChar,
          color: Color.LightGreen
        })
        this.alphaDict[currentChar] = Color.LightGreen;
      } else if (this.config.randomWord.includes(currentChar)) {
        squares.push({
          letter: currentChar,
          color: Color.LightYellow
        })
        if (this.alphaDict[currentChar] !== Color.LightGreen) {
          this.alphaDict[currentChar] = Color.LightYellow;
        }
      } else {
        squares.push({
          letter: currentChar,
          color: Color.LightGray
        })
        this.alphaDict[currentChar] = Color.LightGray;
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
