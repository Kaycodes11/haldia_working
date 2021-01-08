import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SvTradeRegistrationService } from '../../pages/page-service/trade-reg/sv-trade-registration.service';

export interface IPrintForm {
  Amount: number;
  CODE: number;
  Comp_Logo: string;
  FormNumber: string;
  ReceiptNo: string;
  ReceivedFrom: string;
  TL_form_receipt_sig: string;
  paymentdate: string; // split from T letter from its value
}

@Component({
  selector: 'app-printreports',
  templateUrl: './printreports.component.html',
  styleUrls: ['./printreports.component.scss'],
})
export class PrintreportsComponent implements OnInit {
  // subscription: Subscription;
  // ngUnsubscribe$ = new Subject();
  recievefromServiceApi: any[] = [];
  paymentdateWithSplit: string = '';

  constructor(private svTradRegistrationService: SvTradeRegistrationService) {}

  ngOnInit(): void {
    // takeUntill work unitl the given subject uses complete() method; when the given subject used complete() method the value'll stop emitting
    // this.svTradRegistrationService.printForm
    //   .pipe(takeUntil(this.ngUnsubscribe$))
    //   .subscribe((responseForm) => {
    //     console.log('responseForm: ', responseForm);
    //   });
    const sessionUser = sessionStorage.getItem('username');
    const sessionForm = JSON.parse(sessionStorage.getItem('paymentForm'));
    this.paymentdateWithSplit = sessionForm[0].paymentdate.split('T')[0];

    console.log('sessionForm: ', sessionForm);

    // when sessionUser and sessionForm both exists only then assign recievefromServiceApi'll be assigned sessionForm
    sessionUser && sessionForm[0].CODE === 1
      ? (this.recievefromServiceApi = sessionForm)
      : null;
  }
}
