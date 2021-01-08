import { Component, OnInit } from '@angular/core';

declare var $;
declare var arrows: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    arrows = {
      leftArrow: '<i class="feather icon-chevron-left"></i>',
      rightArrow: '<i class="feather icon-chevron-right"></i>',
    };
    // minimum setup
    $('#pc-datepicker-1').datepicker({
      todayHighlight: true,
      orientation: 'bottom left',
      templates: arrows,
    });

    // minimum setup for modal demo
    $('#pc-datepicker-1_modal').datepicker({
      todayHighlight: true,
      orientation: 'bottom left',
      templates: arrows,
    });

    // input group layout
    $('#pc-datepicker-2').datepicker({
      todayHighlight: true,
      orientation: 'bottom left',
      templates: arrows,
    });

    // input group layout for modal demo
    $('#pc-datepicker-2_modal').datepicker({
      todayHighlight: true,
      orientation: 'bottom left',
      templates: arrows,
    });

    // enable clear button
    $('#pc-datepicker-3, #pc-datepicker-3_validate').datepicker({
      todayBtn: 'linked',
      clearBtn: true,
      todayHighlight: true,
      templates: arrows,
    });

    // enable clear button for modal demo
    $('#pc-datepicker-3_modal').datepicker({
      todayBtn: 'linked',
      clearBtn: true,
      todayHighlight: true,
      templates: arrows,
    });

    // orientation
    $('#pc-datepicker-4_1').datepicker({
      orientation: 'top left',
      todayHighlight: true,
      templates: arrows,
    });

    $('#pc-datepicker-4_2').datepicker({
      orientation: 'top right',
      todayHighlight: true,
      templates: arrows,
    });

    $('#pc-datepicker-4_3').datepicker({
      orientation: 'bottom left',
      todayHighlight: true,
      templates: arrows,
    });

    $('#pc-datepicker-4_4').datepicker({
      orientation: 'bottom right',
      todayHighlight: true,
      templates: arrows,
    });

    // range picker
    $('#pc-datepicker-5').datepicker({
      todayHighlight: true,
      templates: arrows,
    });

    // inline picker
    $('#pc-datepicker-6').datepicker({
      todayHighlight: true,
      templates: arrows,
    });

    $(document).ready(function () {
      $('#besicwizard').bootstrapWizard({
        withVisible: false,
        nextSelector: '.button-next',
        previousSelector: '.button-previous',
        firstSelector: '.button-first',
        lastSelector: '.button-last',
      });
      $('#btnwizard').bootstrapWizard({
        withVisible: false,
        nextSelector: '.button-next',
        previousSelector: '.button-previous',
        firstSelector: '.button-first',
        lastSelector: '.button-last',
      });
      $('#progresswizard').bootstrapWizard({
        withVisible: false,
        nextSelector: '.button-next',
        previousSelector: '.button-previous',
        firstSelector: '.button-first',
        lastSelector: '.button-last',
        onTabShow: function (tab, navigation, index) {
          var $total = navigation.find('li').length;
          var $current = index + 1;
          var $percent = ($current / $total) * 100;
          $('#progresswizard .progress-bar').css({
            width: $percent + '%',
          });
        },
      });
      $('#validationwizard').bootstrapWizard({
        withVisible: false,
        nextSelector: '.button-next',
        previousSelector: '.button-previous',
        firstSelector: '.button-first',
        lastSelector: '.button-last',
        onNext: function (tab, navigation, index) {
          if (index == 1) {
            if (!$('#validation-t-name').val()) {
              $('#validation-t-name').focus();
              $('.form-1').addClass('was-validated');
              return false;
            }
            if (!$('#validation-t-email').val()) {
              $('#validation-t-email').focus();
              $('.form-1').addClass('was-validated');
              return false;
            }
            if (!$('#validation-t-pwd').val()) {
              $('#validation-t-pwd').focus();
              $('.form-1').addClass('was-validated');
              return false;
            }
          }
          if (index == 2) {
            if (!$('#validation-t-address').val()) {
              $('#validation-t-address').focus();
              $('.form-2').addClass('was-validated');
              return false;
            }
          }
        },
      });
      $('#tabswizard').bootstrapWizard({
        nextSelector: '.button-next',
        previousSelector: '.button-previous',
      });
      $('#verticalwizard').bootstrapWizard({
        nextSelector: '.button-next',
        previousSelector: '.button-previous',
      });
    });
  }
}
