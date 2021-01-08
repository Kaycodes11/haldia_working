import { Component, OnInit, ViewChild } from '@angular/core';
import { EJComponents } from 'ej-angular2';
@Component({
  selector: 'app-ej-componant',
  templateUrl: './ej-componant.component.html',
  styleUrls: ['./ej-componant.component.scss']
})
export class EjComponantComponent implements OnInit {
  @ViewChild('dialog') dialog: EJComponents <any,any>;

  min: Date;
 
  constructor() { }

  ngOnInit() {
    this.min = new Date("11/11/2012");
    this.dialog.widget.element.ejDialog('open');
  }

}
