import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeColorByAnswer]'
})
export class ChangeColorByAnswerDirective {

  @Input() isCorrect : Boolean = false;
  constructor(private eRef : ElementRef, private render : Renderer2) { }
  @HostListener('click') answer() {
    if (!this.isCorrect) {
      this,this.render.setStyle(this.eRef.nativeElement, 'background', 'red');
      this,this.render.setStyle(this.eRef.nativeElement, 'color', '#fff');
      this,this.render.setStyle(this.eRef.nativeElement, 'border', '2px solid grey');
    } else {
      this,this.render.setStyle(this.eRef.nativeElement, 'background', 'green');
      this,this.render.setStyle(this.eRef.nativeElement, 'color', '#fff');
      this,this.render.setStyle(this.eRef.nativeElement, 'border', '2px solid grey');
    }
  }

}
