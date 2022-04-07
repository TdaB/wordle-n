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

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    AlphabetComponent,
    ConfigComponent,
    GridDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatGridListModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
