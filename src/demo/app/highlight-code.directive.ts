import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: 'code[vxHighlight]'
})
export class HighlightCodeDirective implements AfterViewInit {
  constructor(private eltRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    hljs.highlightBlock(this.eltRef.nativeElement);
  }
}
