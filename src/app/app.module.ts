import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { AlphabetComponent } from './alphabet/alphabet.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigComponent } from './config/config.component';
import { HttpClientModule } from '@angular/common/http';
import { GridDirective } from './grid.directive';
import { VictoryDialogComponent } from './victory-dialog/victory-dialog.component';
import { InvalidWordDialogComponent } from './invalid-word-dialog/invalid-word-dialog.component';
import { LossDialogComponent } from './loss-dialog/loss-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    AlphabetComponent,
    ConfigComponent,
    GridDirective,
    VictoryDialogComponent,
    InvalidWordDialogComponent,
    LossDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatGridListModule,
    MatDialogModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
