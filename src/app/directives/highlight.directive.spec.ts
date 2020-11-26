import { Renderer2 } from '@angular/core';
import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    let elRefMock = {
      nativeElement: document.createElement('div')
    };

    let serviceMock = {
      setRendrer: (rendrer: Renderer2) => null
    };
    /*const directive = new HighlightDirective();
    expect(directive).toBeTruthy();*/
  });
});
