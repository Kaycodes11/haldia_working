import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { Label, MultiDataSet } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Router } from '@angular/router';
import { SvProfileService } from '../page-service/profile/sv-profile.service';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
declare var $;
declare var PerfectScrollbar: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

// whatever dashboard previously that may be replace with new table or such
export class DashboardComponent implements OnInit, OnDestroy {
  followUpForm = new FormGroup({
    nextFollowUp: new FormControl('', [Validators.required]),
    forwardTo: new FormControl('', [Validators.required]),
    showUserType: new FormControl('', [Validators.required]),
    remarks: new FormControl('', [Validators.required]),
  });
  shouldShowForwardTo: boolean = false;
  shouldShowUserList: boolean = false;
  userNameViaFormNo: string;
  userTypeFromThisFormNo: string;

  responseToShowWithinTable: any[] = []; // it should hold an array of object with any properties
  responseDateForForm;

  loggedUser: string = '';
  formTradeFollowUpValues: any[] = [];
  public doughnutChartLabels: Label[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
  };
  public pieChartLabels: Label[] = [['New Licenses'], ['Renew Licenses']];
  public pieChartData: number[] = [300, 500];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: [
        'rgba(255,0,0,0.3)',
        'rgba(0,255,0,0.3)',
        'rgba(0,0,255,0.3)',
      ],
    },
  ];
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartLabels: Label[] = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Trade License' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Property tax' },
  ];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    public proObj: SvProfileService
  ) {}

  async isProfileComplete(User_Type) {
    // console.log('user-dashboard: ', User_Type);
    let result = await this.proObj.getUserProfile(User_Type); // take username as argument from sessionStorage
    // console.log('result-dashboard: ', result); // returning [] as response (not so neccessary with this project)

    if (result && result[0].IS_Active === 'N') {
      this.toastr.error('You need to complete your profile', 'Employee Portal');
      this.router.navigate(['/members/profile']);
    }
  }

  onFormNoClick(event: any, formNo: string) {
    console.log('FORM NO: ', formNo);
    sessionStorage.setItem('menu', event.target.textContent);
    if (event.target.textContent !== 'Followup') {
      this.router.navigate(['members/dash', formNo]);
    } else if (event.target.textContent === 'Followup') {
      this.proObj.formDetailsByFormNo(formNo).subscribe((formResponse: any) => {
        this.userTypeFromThisFormNo = formResponse.body[0]['Entry_Type_User'];
        this.proObj
          .formTradeFollupDetails(formResponse.body[0]['app_TL_ID'])
          .subscribe((responseFollowup: any) => {
            this.formTradeFollowUpValues = responseFollowup.body;
            console.log('followUp-dashboard: ', this.formTradeFollowUpValues);
          });
        this.proObj
          .knowUserNameViaFormNo(formNo)
          .subscribe((userResponse: any) => {
            console.log('user: ', userResponse.body);
            this.userNameViaFormNo = userResponse.body;
          });
      });
      //when modal hidden; remove menu from sessionStorage
      $('#theFollowUp').on('hidden.bs.modal', () => {
        sessionStorage.removeItem('menu');
      });
      // followup
    }
  }

  ngOnInit() {
    // not necessary to be used
    // $('#theFollowUp').on('hidden.bs.modal', () => {
    //   sessionStorage.removeItem('menu');
    // });
    // this.loggedUser = sessionStorage.getItem('username').split('@')[0];
    this.loggedUser = JSON.parse(sessionStorage.getItem('user'))[0].Name;
    // user filled the form then data should be within it
    let uu = sessionStorage.getItem('username');
    console.log('user: ', uu);
    // this method will take looged user's email and will give some response
    this.proObj.formDetailsActivityByUser(uu).subscribe((response: any) => {
      console.log('response-dash: ', response.body);
      // const recived: any = response.body.
      this.responseToShowWithinTable = response.body;
      console.log('saved-dash', this.responseToShowWithinTable);
    });

    // subscribe to valuechanges on followupForm's nextFollowUp
    this.followUpForm.controls.nextFollowUp.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((response) => {
        console.log('nextFollowUp: ', response);
        if (response !== 'forward') {
          this.shouldShowForwardTo = false; // no need to show these field
          this.shouldShowUserList = false; // no need to show these field
        } else {
          console.log('userType: ', this.userTypeFromThisFormNo);
          if (this.userTypeFromThisFormNo !== 'citizen') {
            this.shouldShowForwardTo = false;
            this.shouldShowUserList = true;
          } else {
            this.shouldShowForwardTo = true;
            this.shouldShowUserList = true;
          }
        }
      });

    this.isProfileComplete(uu);
    var px = new PerfectScrollbar('.feed-scroll', {
      wheelSpeed: 0.5,
      swipeEasing: 0,
      wheelPropagation: 1,
      minScrollbarLength: 40,
    });
    var px = new PerfectScrollbar('.pro-scroll', {
      wheelSpeed: 0.5,
      swipeEasing: 0,
      wheelPropagation: 1,
      minScrollbarLength: 40,
    });
  }

  public chartClickedradar({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHoveredradar({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartClickedpie({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHoveredpie({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  changeLabels(): void {
    const words = [
      'hen',
      'variable',
      'embryo',
      'instal',
      'pleasant',
      'physical',
      'bomber',
      'army',
      'add',
      'film',
      'conductor',
      'comfortable',
      'flourish',
      'establish',
      'circumstance',
      'chimney',
      'crack',
      'hall',
      'energy',
      'treat',
      'window',
      'shareholder',
      'division',
      'disk',
      'temptation',
      'chord',
      'left',
      'hospital',
      'beef',
      'patrol',
      'satisfied',
      'academy',
      'acceptance',
      'ivory',
      'aquarium',
      'building',
      'store',
      'replace',
      'language',
      'redeem',
      'honest',
      'intention',
      'silk',
      'opera',
      'sleep',
      'innocent',
      'ignore',
      'suite',
      'applaud',
      'funny',
    ];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartLabels = Array.apply(null, { length: 3 }).map((_) =>
      randomWord()
    );
  }

  addSlice(): void {
    this.pieChartLabels.push(['Line 1', 'Line 2', 'Line 3']);
    this.pieChartData.push(400);
    this.pieChartColors[0].backgroundColor.push('rgba(196,79,244,0.3)');
  }

  removeSlice(): void {
    this.pieChartLabels.pop();
    this.pieChartData.pop();
    this.pieChartColors[0].backgroundColor.pop();
  }

  changeLegendPosition(): void {
    this.pieChartOptions.legend.position =
      this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }

  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.random() * 100,
      56,
      Math.random() * 100,
      40,
    ];
  }

  onModalHide() {
    console.log('modal hidden & form resetted');
    this.followUpForm.reset();
    // when modal reopens form should be resetted; same with these two properties too
    this.shouldShowForwardTo = false;
    this.shouldShowUserList = false;
  }
  onFollupSubmit() {
    console.log('followup form is clicked');
  }

  ngOnDestroy() {
    if ($('#theFollowUp').on('shown.bs.modal')) {
      console.log('hide the back button now');
      $('#theFollowUp').modal('hide');
    }
  }
}
