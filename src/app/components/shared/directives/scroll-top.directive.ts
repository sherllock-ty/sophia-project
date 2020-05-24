import { Directive,HostListener} from '@angular/core';

@Directive({
  selector: '[appScrollTop]'
})
export class ScrollTopDirective {

  @HostListener('click') goTop(){
   document.querySelector('mat-sidenav-content').scroll({ top: 0, behavior: 'smooth' });

  }

  constructor() { }

}
