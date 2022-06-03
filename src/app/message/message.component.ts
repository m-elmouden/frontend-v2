import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styles: [
  ]
})
export class MessageComponent implements OnInit {
  private _visible = false;


  get visible(): boolean {
    return this._visible;
    console.log(this._visible);
  }

  set visible1(value: boolean) {
    this._visible = value;
  }
return(): boolean{
    return this._visible;
}
  showComponent(){
    this._visible = true;
}
  constructor() { }


  ngOnInit(): void {
  }

}
