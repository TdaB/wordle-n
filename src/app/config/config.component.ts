import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { GameConfig } from '../game-config';
import { GridDirective } from '../grid.directive';
import { GridComponent } from '../grid/grid.component';
import { WordlistService } from '../wordlist.service';
import { LENGTH_GUESSES_DICT_DEFAULT } from '../length-guesses-dict-default';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {
  @ViewChild(GridDirective, { static: true }) gridDirective!: GridDirective;
  title = 'Game Configuration';
  configForm = this.formBuilder.group({
    wordLength: new FormControl(5, [
      Validators.required,
      Validators.min(2),
      Validators.max(18)
    ]),
    guesses: new FormControl(7, [
      Validators.required,
      Validators.min(1),
      Validators.max(99)
    ])
  })

  constructor(
    private formBuilder: FormBuilder,
    private wordlistService: WordlistService,
  ) { }

  async onSubmit(): Promise<void> {
    let length = this.configForm.value.wordLength;
    let guesses = this.configForm.value.guesses;
    let word = await this.wordlistService.getRandomWord(length);

    let config = {
      wordLength: length,
      guesses: guesses,
      randomWord: word,
    }

    this.createGridComponent(config);
  }

  createGridComponent(config: GameConfig): void {
    const viewContainerRef = this.gridDirective.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<GridComponent>(GridComponent);
    componentRef.instance.config = config;
  }

  onWordLengthChange(event: any): void {
    this.configForm.patchValue({
      guesses: LENGTH_GUESSES_DICT_DEFAULT[this.configForm.value.wordLength]
    })
  }
}