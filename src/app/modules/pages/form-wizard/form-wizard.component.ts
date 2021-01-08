import { Component, OnInit } from '@angular/core';
declare var $;
@Component({
  selector: 'app-form-wizard',
  templateUrl: './form-wizard.component.html',
  styleUrls: ['./form-wizard.component.scss']
})
export class FormWizardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $('#besicwizard').bootstrapWizard({
        withVisible: false,
        'tabClass': 'nav nav-tabs',
        'nextSelector': '.button-next',
        'previousSelector': '.button-previous',
      });
      $('#detailswizard').bootstrapWizard({
        withVisible: false,
        'tabClass': 'nav nav-tabs',
        'nextSelector': '.button-next',
        'previousSelector': '.button-previous',
        // 'firstSelector': '.button-first',
        // 'lastSelector': '.button-last'
      });
      $('#detailswizard2').bootstrapWizard({
        withVisible: false,
        'tabClass': 'nav nav-tabs',
        'nextSelector': '.button-next',
        'previousSelector': '.button-previous',
      });
      $('#detailswizard3v').bootstrapWizard({
        withVisible: false,
        'tabClass': 'nav nav-tabs',
        'nextSelector': '.button-next',
        'previousSelector': '.button-previous',
      });
      $('#numwizard').bootstrapWizard({
        withVisible: false,
        'tabClass': 'nav nav-tabs',
        'nextSelector': '.button-next',
        'previousSelector': '.button-previous',
      });
      $('#numwizardhor').bootstrapWizard({
        withVisible: false,
        'tabClass': 'nav nav-tabs',
        'nextSelector': '.button-next',
        'previousSelector': '.button-previous',
      });
      $('#numwizardtb').bootstrapWizard({
        withVisible: false,
        'tabClass': 'nav nav-tabs',
        'nextSelector': '.button-next',
        'previousSelector': '.button-previous',
      });
    });
  }

}
