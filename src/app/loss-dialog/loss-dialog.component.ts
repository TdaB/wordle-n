import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loss-dialog',
  templateUrl: './loss-dialog.component.html',
  styleUrls: ['./loss-dialog.component.css']
})
export class LossDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }
}
