import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { SvTradeRegistrationService } from './modules/pages/page-service/trade-reg/sv-trade-registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ngEmployeeLogin';

  constructor(
    private router: Router,
    private svTradeService: SvTradeRegistrationService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('E: ', event, event.url);
        // this.routerchangeMethod(event.url);
        if (
          (event.url === '/login' || event.url === '/') &&
          sessionStorage.getItem('username')
        ) {
          this.router.navigate(['members/dash']);
        }
      }
    });
  }

  // routerchangeMethod(url: string) {
  // this is just a method which wil grab the url and save within a local property or such
  // console.log('URL: ', url);
  // }
}
// https://angular.io/api/common/Location#description :: some helpfule angular methods
