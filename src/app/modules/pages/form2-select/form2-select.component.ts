import { Component, OnInit } from '@angular/core';
declare var $;
@Component({
  selector: 'app-form2-select',
  templateUrl: './form2-select.component.html',
  styleUrls: ['./form2-select.component.scss']
})
export class Form2SelectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.pc-selectpicker').selectpicker();
  }  

}
