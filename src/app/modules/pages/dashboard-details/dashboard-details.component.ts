import { Route } from '@angular/compiler/src/core';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { SvProfileService } from '../page-service/profile/sv-profile.service';
declare var $;

@Component({
  selector: 'app-dashboard-details',
  templateUrl: './dashboard-details.component.html',
  styleUrls: ['./dashboard-details.component.scss'],
})
export class DashboardDetailsComponent implements OnInit, OnDestroy {
  followUpForm = new FormGroup({
    nextFollowUp: new FormControl('', [Validators.required]),
    forwardTo: new FormControl('', [Validators.required]),
    showUserType: new FormControl('', [Validators.required]),
    remarks: new FormControl('', [Validators.required]),
    // selectDate: new FormControl('', [Validators.required]),
  });
  routeReloadWithoutRefresh: Subscription;
  formNo: string;
  fileManager: any[] = [];
  fileMangerImages: any[] = [];
  savedfileMangerImages: any[] = [];
  savedfileMangerImages2: any[];
  modalTitle: string;
  modalImage: string;
  shouldHideForwardButton: boolean = false;
  shouldShowLoader: boolean = true;

  shouldShowForwardTo: boolean = false;
  shouldShowUserList: boolean = false;
  formdataByFormNo: any[];
  Tl_ID: number;
  userNameViaFormNo: any[];
  clonedUserNameViaFormNo: any[] = [];
  userTypeFromThisFormNo: string;
  formTradeTypeValues: any[] = [];
  formTradeFollowUpValues: any[] = [];
  alternateSide: boolean = false;
  firstContentSide: 'left' | 'right' = 'right';
  saveEcitiZenId: number;
  loggedUserNow = JSON.parse(sessionStorage.getItem('user'));
  showThisUserNameByFormNo: any[] = [];
  statusToBeSent: number;
  nextUserId: number;
  hideHold: boolean = false;

  constructor(
    private svprofileService: SvProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // const loggedUser = JSON.parse(sessionStorage.getItem('user'));
    this.followUpForm.patchValue({ nextFollowUp: 'Hold' }); // set default value to this field
    console.log('Show: ', sessionStorage.getItem('menu'));
    if (
      sessionStorage.getItem('menu') &&
      sessionStorage.getItem('menu') === 'View'
    ) {
      this.shouldHideForwardButton = true;
    }

    // subscribe to valuechanges on followupForm's nextFollowUp
    this.followUpForm.controls.nextFollowUp.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((response) => {
        console.log('nextFollowUp: ', response);

        // if (response === 'Hold' && this.loggedUserNow[0]['User_ID'] === 9) {
        //   this.showHold = false;
        //   this.followUpForm.patchValue({ nextFollowUp: 'Forward' });
        // }

        if (response !== 'Forward') {
          this.shouldShowForwardTo = false; // no need to show these field
          this.shouldShowUserList = false; // no need to show these field
          this.nextUserId = JSON.parse(sessionStorage.getItem('user'))[0][
            'User_ID'
          ];
        } else {
          console.log('userType: ', this.userTypeFromThisFormNo);
          console.log(
            'userBy: ',
            this.formdataByFormNo[0]['Appl_By'] === 'User'
          );
          if (
            this.userTypeFromThisFormNo !== 'Cityzen' &&
            this.formdataByFormNo[0]['Appl_By'] === 'User'
          ) {
            // that means it should be the employee here, so then
            this.shouldShowForwardTo = false;
            this.shouldShowUserList = true;
          } else {
            // that means it should be the 'Cityzen' here, so then
            // now the dropdown would be shwoing citizen and user. when user selected he would
            // be able to forward/backward to next/before officer however if selected citizen only
            // then take for now "Followup_by_e_cityzen_name"
            this.shouldShowForwardTo = true;
            this.shouldShowUserList = true;
          }
        }
      });

    this.followUpForm.controls.forwardTo.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value === 'Cityzen') {
          // Make the e_cityzen selection default choice then disable it so that user can't change it :)
          // const followupByCityzen = this.formTradeFollowUpValues.find(
          //   (followup) => followup.Followup_By_User_Type === value
          // ); // {...}
          // this.userNameViaFormNo = [followupByCityzen];
          // this.followUpForm.patchValue({
          //   showUserType: followupByCityzen.Followup_Id,
          // });
          // this.followUpForm.controls.showUserType.disable();
          console.log('forwardTo: ', value);
        } else {
          // Set the dropdown with users list
          // this.followUpForm.controls.showUserType.enable();
          // this.userNameViaFormNo = [...this.clonedUserNameViaFormNo];
          // this.followUpForm.patchValue({
          //   showUserType: '',
          // });
        }
      });

    this.followUpForm.controls.showUserType.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((nextFollowUpUserUID) => {
        const followUpType = this.followUpForm.controls.nextFollowUp.value;
        if (followUpType === 'Forward') {
          if (nextFollowUpUserUID) {
            this.nextUserId = nextFollowUpUserUID;
          }
        }
      });

    // watch always on route params by subcribing on this.route.params to get the value
    this.route.params.subscribe((data: Params) => {
      // use the data to call
      this.formNo = data['formNo'];
      console.log('route-param: ', this.formNo);
    });

    // know the user name and id  by the form no.
    this.svprofileService
      .knowUserNameViaFormNo(this.formNo)
      .subscribe((userResponse: any) => {
        console.log('user: ', userResponse.body);
        this.userNameViaFormNo = userResponse.body;
        this.clonedUserNameViaFormNo = [...this.userNameViaFormNo]; // Backup
      });

    // what data should be shown to user list (when form details are type of employee)
    // based on logged in userid, it will give the next employee's to whom form has to be sent
    this.svprofileService
      .nextEmployeetoBeForwared(this.loggedUserNow[0]['User_ID'])
      .subscribe((responseForward: any) => {
        this.showThisUserNameByFormNo = responseForward.body;
        console.log(
          'this.showThisUserNameByFormNo',
          this.showThisUserNameByFormNo
        );
        this.nextUserId = this.showThisUserNameByFormNo[0]['NextFollowUID'];
      });

    // form details by the form no
    this.svprofileService
      .formDetailsByFormNo(this.formNo)
      .subscribe((formResponseByNo: any) => {
        this.formdataByFormNo = formResponseByNo.body;
        this.Tl_ID = this.formdataByFormNo[0]['TL_Form_Id'];
        // whatever type of user the selected form will be, that value woul be here
        this.userTypeFromThisFormNo = this.formdataByFormNo[0][
          'Entry_Type_User'
        ];
        this.saveEcitiZenId = this.formdataByFormNo[0]['E_Cityzen_ID'];
        console.log('formDataByFormNo: ', this.formdataByFormNo);
        // this.formdataByFormNo[0]['Appl_By']

        // only when formDetailsByFormNo gets the response then formTradeType & formTradeFollowup will get their argument

        // formTradeType required app tl id
        this.svprofileService
          .formTradeType(this.formdataByFormNo[0]['app_TL_ID'])
          .subscribe((responseTradeType: any) => {
            this.formTradeTypeValues = responseTradeType.body;
            console.log('formTradeTypesare: ', this.formTradeTypeValues);
          });

        // but formTradeFollowupdetails requires just tl_form_id
        this.svprofileService
          .formTradeFollupDetails(this.Tl_ID)
          .subscribe((responseFollowup: any) => {
            this.formTradeFollowUpValues = responseFollowup.body;
            console.log('followUp: ', this.formTradeFollowUpValues);
          });
      });

    this.svprofileService.formListDocs().subscribe((responseList: any) => {
      this.fileManager = responseList.body;
      console.log('this.fileManager: ', this.fileManager);
      // ensure that that all files here then based on their name work on the fomrImages api
      this.svprofileService
        .formImagesByFormNo(this.formNo)
        .subscribe((responseImages: any) => {
          this.fileMangerImages = responseImages.body;
          console.log('this.FileManagerImages: ', this.fileMangerImages);
          this.shouldShowLoader = false;
          // saved the response images by form no. within an object
          const obj = {
            Document_Name: '',
            file_Url: '',
            columnIndex: 0,
          };
          // this.savedfileMangerImages.push(obj, obj, obj, obj, obj);
          this.savedfileMangerImages.push({
            ...obj,
            Document_Name: 'RENT AGREEMENT',
          });
          this.savedfileMangerImages.push({
            ...obj,
            Document_Name: 'PROPERTY TAX RECIEPT',
          });
          this.savedfileMangerImages.push({
            ...obj,
            Document_Name: 'FIRE LICENSE',
          });
          this.savedfileMangerImages.push({
            ...obj,
            Document_Name: 'PARTNERSHIP DEED',
          });
          this.savedfileMangerImages.push({
            ...obj,
            Document_Name: 'ASSOCIATION OF MEMORUNDUM',
          });
          // console.log('response-image: ', this.fileMangerImages);
          // console.log('file-manger: ', this.fileManager); // fasfasfasf

          this.fileManager.forEach((file) => {
            // whatever responseImages being sent map which has same file['Document_name'] & save it within savedImg
            this.fileMangerImages.forEach((image, index) => {
              // whatever value returned usually becomes the value of that property
              if (image['Document_Name'] === file['Document_name']) {
                // whether image['Document_Name'] === file['Document_name'] are same then
                if (file.Document_Id === 0) {
                  // file.Document_Id === 0
                  this.savedfileMangerImages[0] = {
                    Document_Name: image['Document_Name'],
                    file_Url: image['file_Url'],
                    columnIndex: 0,
                  };
                } else {
                  // when file.Document_Id !== 0; then save the object with name, url & columnIndex & key would be file.Document_Id - 1
                  this.savedfileMangerImages[file.Document_Id - 1] = {
                    Document_Name: image['Document_Name'],
                    file_Url: image['file_Url'],
                    columnIndex: file.Document_Id - 1, // ex - 3 - 1 = 2 fasfas fasfs;
                  };
                }
              }
            });
          });
        });
    });

    // ngoninit
  }

  onShowImageModal(valueImage: string) {
    // recieve here the iterating item and from that takes keys and values which would be used to show on the modal's img and text element
    //  value exists then when button clicked the modal would show the image by using valueImage
    console.log('link clicked', valueImage); // now just take the key from here for modalTitle and value for modalImage
    this.modalTitle = valueImage['Document_Name']; // valueImage['Document_Name']
    this.modalImage = valueImage['file_Url']; // valueImage['file_Url']
    console.log(this.modalImage, this.modalTitle);
    window.open(this.modalImage);
    /*
    image.document_name === file.document.name
    whatever the matched file.document_name id may be take it and - 1; then use that value as key
    savedFileMangerImages[file.document_id - 1] = {
      name: 'matched image name against the file.document_name',
      file_url : 'now take the image',
      columnIndex: file.document_id - 1; // same as the key
    }
    now when putting the value so to when to show the button or not;
    0 : file_url exist =  yes and is it columnindex value same as the iteration key === true; then only render button
    */

    // 1. Bind/Update value
    // 2. Find modal trigger button by id then trigger click $('selector').click()
    // 3. Modal will popup :)
    // 4. To disable keyboard and escape button, use static and backdrop data props, refer to bootstrap docs.
  }
  goBackButton() {
    this.router.navigate(['members/dash']);
    if (sessionStorage.getItem('menu')) {
      sessionStorage.removeItem('menu');
    }
  }
  // when user id === 9 and click the forward button on the followup table then
  onForwardClick() {
    console.log('table forward is clicked', this.loggedUserNow[0]['User_ID']);
    if (this.loggedUserNow[0]['User_ID'] === 9) {
      this.hideHold = true;
      this.followUpForm.controls.nextFollowUp.setValue('Forward');
      console.log('value: ', this.followUpForm.controls.nextFollowUp.value);
    }
  }

  // what do to when followup button within the modal clicked
  onFollowp() {
    // now here would need to call insert followup api with required arguments
    const loggedUser = JSON.parse(sessionStorage.getItem('user'));
    const fwStatus = this.followUpForm.get('nextFollowUp').value;
    const remarks = this.followUpForm.get('remarks').value;
    console.log(this.showThisUserNameByFormNo);
    console.log('whole Form: ', this.followUpForm.value);

    // console.log(fwStatus);
    // console.log(remarks);
    // console.log(this.saveEcitiZenId);
    // console.log('TLid: ', this.Tl_ID);
    // console.log(this.userTypeFromThisFormNo);
    // console.log(loggedUser[0]['User_ID']);
    // console.log(loggedUser[0]['User_Name']);

    // when to disable the button
    // if(this.followUpForm.controls.nextFollowUp.value === 'Hold') {}

    // when clicked on the button see what Name avaiable within sessionStorage based on that set status

    if (this.loggedUserNow.length > 0) {
      if (this.loggedUserNow[0]['User_ID'] === 6 && fwStatus === 'Hold') {
        this.statusToBeSent = 7;
      }
      if (this.loggedUserNow[0]['User_ID'] === 6 && fwStatus === 'Forward') {
        this.statusToBeSent = 5;
      }
      if (this.loggedUserNow[0]['User_ID'] === 8 && fwStatus === 'Hold') {
        this.statusToBeSent = 8;
      }
      if (this.loggedUserNow[0]['User_ID'] === 8 && fwStatus === 'Forward') {
        this.statusToBeSent = 9;
      }
      if (this.loggedUserNow[0]['User_ID'] === 9 && fwStatus === 'Forward') {
        this.statusToBeSent = 6;
      }
    }

    const isTypeForward =
      this.followUpForm.controls.nextFollowUp.value === 'Forward';
    if (isTypeForward) {
      this.nextUserId = this.followUpForm.controls.showUserType.value;
    } else {
      this.nextUserId = this.loggedUserNow[0].User_ID;
    }

    this.svprofileService
      .nextForward(
        fwStatus,
        this.Tl_ID,
        loggedUser[0]['User_ID'],
        remarks,
        this.saveEcitiZenId,
        loggedUser[0]['User_Name'],
        this.statusToBeSent,
        this.nextUserId
      )
      .subscribe((responseFolloup: any) => {
        console.log('status being sent here is: ', this.statusToBeSent);
        console.log('nextUserid: ', this.nextUserId);

        console.log(responseFolloup.body, responseFolloup.status);
        // if Name === tlc, then status_id === 7 (TLc hold)
        // (tlc forward) == tlc, then status_id === 5 (document approved)
        // (tli hold) === tli1, then status_id === 8 (hold tli1)
        // (tli inspecion done) === tli1, then status_id === 9 (tli forwarded)
        // Name === vc1, then status_id === 9 (approved)
        if (
          $('#theFollowUp').on('shown.bs.modal') &&
          responseFolloup.body.length < 1
        ) {
          $('#theFollowUp').modal('hide');
        }
      });
  }
  // what to whe user hide the modal
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
      console.log('hide the back button or leaving');
      $('#theFollowUp').modal('hide');
    }
    if (this.routeReloadWithoutRefresh) {
      this.routeReloadWithoutRefresh.unsubscribe();
    }
    sessionStorage.removeItem('menu');
  }
}
