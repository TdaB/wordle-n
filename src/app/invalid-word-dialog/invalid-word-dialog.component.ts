import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-invalid-word-dialog',
  templateUrl: './invalid-word-dialog.component.html',
  styleUrls: ['./invalid-word-dialog.component.css']
})
export class InvalidWordDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }
}
