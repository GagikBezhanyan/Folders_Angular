import { Component,Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  standalone: true,
})
export class PopupComponent  implements OnChanges {
@ViewChild('popup',{static:true}) popup!: ElementRef;
@Input('position') position = null;
emitPopup(event:MouseEvent){
}
ngOnChanges(changes: SimpleChanges): void {
  if(changes['position']){
    console.log(changes['position'])
this.popup.nativeElement.style.left = changes['position'].currentValue?.x
this.popup.nativeElement.style.top =  changes['position'].currentValue?.y;
console.log(changes['position'].currentValue?.x);
console.log(changes['position'].currentValue?.y);

this.popup.nativeElement.classList.toggle('show');
if(this.popup.nativeElement.classList.contains('show')){
  this.popup.nativeElement.classList.remove('show')

}
else {
  this.popup.nativeElement.classList.add('show')
}
  }
}
}
