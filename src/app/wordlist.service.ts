import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordlistService {
  currentWordLength = 0;
  currentWordArray: string[] = [];

  constructor(private httpClient: HttpClient) { }

  async getRandomWord(length: number): Promise<string> {
    if (this.currentWordLength !== length) {
      let path = `assets/wordlists/${length}_letter_words.txt`;
      let wordList = await firstValueFrom(this.httpClient.get(path, { responseType: 'text' }));
      this.currentWordLength = length;
      this.currentWordArray = wordList.split('\r\n');
    }
    return this.currentWordArray[getRandomInt(this.currentWordArray.length)]
  }

  async isValidWord(word: string): Promise<boolean> {
    if (this.currentWordLength !== word.length) {
      let path = `assets/wordlists/${length}_letter_words.txt`;
      let wordList = await firstValueFrom(this.httpClient.get(path, { responseType: 'text' }));
      this.currentWordLength = length;
      this.currentWordArray = wordList.split('\r\n');
    }
    return this.currentWordArray.includes(word);
  }
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
} 