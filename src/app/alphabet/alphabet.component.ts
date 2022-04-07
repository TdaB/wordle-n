import { Component, Input } from '@angular/core';
import { AlphaDict } from '../alpha-dict';
import { Square } from '../square';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.css']
})
export class AlphabetComponent {
  @Input() alphaDict!: AlphaDict;

  dictToArray(): Square[] {
    let squares: Square[] = [];
    for (let key in this.alphaDict) {
      squares.push({
        letter: key,
        color: this.alphaDict[key]
      })
    }
    return squares;
  }
}
