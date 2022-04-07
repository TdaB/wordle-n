import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[gridContainer]',
})
export class GridDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}