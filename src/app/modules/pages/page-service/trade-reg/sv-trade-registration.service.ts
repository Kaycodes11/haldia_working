import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Promise } from 'es6-promise';

import { kStringMaxLength } from 'buffer';
import { ITLDocsUpload } from '../../models/i-tldocs-upload';

@Injectable({
  providedIn: 'root',
})
export class SvTradeRegistrationService {
  apiRoot: string = 'http://localhost:7071/api/';
  fileList: ITLDocsUpload[] = [];
  send;

  constructor(private http: HttpClient) {}

  public bufferCartData = new BehaviorSubject<any>(0);
  private pvtLtdModal$ = new BehaviorSubject<any>(0);
  private tradeEnlishment$ = new BehaviorSubject<any>({ rowNodeId: 0 });
  private isModalOpen$ = new BehaviorSubject<any>(false);
  // private printForm$ = new BehaviorSubject<Array<any>>([]); // by default it'll have an array [{}]
  // public printForm = this.printForm$.asObservable();

  // setPrintForm(value) {
  //   this.printForm$.next(value);
  // }

  getPvtLtdDeleteModalState() {
    return this.isModalOpen$.asObservable();
  }

  showModal() {
    this.isModalOpen$.next(true);
  }

  hideModal() {
    this.isModalOpen$.next(false);
  }

  getTradeEnlishmentData() {
    return this.tradeEnlishment$.asObservable();
  }

  setTradeEnlishmentData(rowNodeId) {
    this.tradeEnlishment$.next({ rowNodeId: rowNodeId });
  }

  getPvtLtdModalObservableData() {
    return this.pvtLtdModal$.asObservable();
  }

  setPvtDeleteModalData(data) {
    this.pvtLtdModal$.next(data);
  }

  getCartBuffer() {
    return this.bufferCartData.asObservable();
  }

  nextCart(dtstr: any) {
    this.bufferCartData.next(dtstr);
    console.log('Inside Service');
    console.log('FROM the next cart method: ', dtstr);
  }

  uploadTLdocs(docformdata) {
    var promise;
    promise = new Promise((resolve, reject) => {
      this.http
        .post(this.apiRoot + 'insert_mul_file?test=test', docformdata, {
          observe: 'response',
          responseType: 'json',
        })
        .toPromise()
        .then(
          (res) => {
            resolve(res.body);
          },
          (err) => {
            reject(err);
          }
        );
    });
    return promise;
  }

  getWardBind() {
    var promise;

    let body = {
      flag: 'getWard',
      spname: 'USP_TRADE_APPLICATION',
    };

    promise = new Promise((resolve, reject) => {
      this.http
        .post(this.apiRoot + 'insert_mul_json', body, {
          observe: 'response',
          responseType: 'json',
        })
        .toPromise()
        .then(
          (res) => {
            resolve(res.body);
          },
          (msg) => {
            reject(msg);
          }
        );
    });

    return promise;
  }

  // not used within trade_establishment
  getIDProffBind(User_Type) {
    var promise;

    let body = {
      flag: 'getIDProffBind',
      json: [{ User_Type: User_Type }],
      spname: 'USP_TRADE_APPLICATION',
    };

    promise = new Promise((resolve, reject) => {
      this.http
        .post(this.apiRoot + 'insert_mul_json', body, {
          observe: 'response',
          responseType: 'json',
        })
        .toPromise()
        .then(
          (res) => {
            resolve(res.body);
          },
          (msg) => {
            reject(msg);
          }
        );
    });

    return promise;
  }

  getRelationLandBind() {
    var promise;

    let body = {
      flag: 'getLandNature',
      spname: 'USP_TRADE_APPLICATION',
    };

    promise = new Promise((resolve, reject) => {
      this.http
        .post(this.apiRoot + 'insert_mul_json', body, {
          observe: 'response',
          responseType: 'json',
        })
        .toPromise()
        .then(
          (res) => {
            resolve(res.body);
          },
          (msg) => {
            reject(msg);
          }
        );
    });

    return promise;
  }
  getTradeType() {
    var promise;

    let body = {
      flag: 'getTradeType',
      spname: 'USP_TRADE_APPLICATION',
    };

    promise = new Promise((resolve, reject) => {
      this.http
        .post(this.apiRoot + 'insert_mul_json', body, {
          observe: 'response',
          responseType: 'json',
        })
        .toPromise()
        .then(
          (res) => {
            console.log('GET TRADE-TYPE MODIFIED: ', res.body);

            resolve(res.body);
          },
          (msg) => {
            reject(msg);
          }
        );
    });

    return promise;
  }
  getTradeNature() {
    var promise;

    let body = {
      flag: 'getTradeNature',
      spname: 'USP_TRADE_APPLICATION',
    };

    promise = new Promise((resolve, reject) => {
      this.http
        .post(this.apiRoot + 'insert_mul_json', body, {
          observe: 'response',
          responseType: 'json',
        })
        .toPromise()
        .then(
          (res) => {
            resolve(res.body);
          },
          (msg) => {
            reject(msg);
          }
        );
    });

    return promise;
  }

  getForFinalcial_yearBind() {
    var promise;

    let body = {
      flag: 'getFINYR',
      spname: 'USP_TRADE_APPLICATION',
    };

    promise = new Promise((resolve, reject) => {
      this.http
        .post(this.apiRoot + 'insert_mul_json', body, {
          observe: 'response',
          responseType: 'json',
        })
        .toPromise()
        .then(
          (res) => {
            resolve(res.body);
          },
          (msg) => {
            reject(msg);
          }
        );
    });

    return promise;
  }

  getTradeTypeBind(Trade_type) {
    var promise;

    let body = {
      flag: 'getIDProffBind',
      json: [{ User_Type: Trade_type }],
      spname: 'USP_TRADE_APPLICATION',
    };

    promise = new Promise((resolve, reject) => {
      this.http
        .post(this.apiRoot + 'insert_mul_json', body, {
          observe: 'response',
          responseType: 'json',
        })
        .toPromise()
        .then(
          (res) => {
            resolve(res.body);
          },
          (msg) => {
            reject(msg);
          }
        );
    });

    return promise;
  }

  // not used with trade_Esatblishment*
  getIDProof_NameBind(IDProof_Name) {
    var promise;

    let body = {
      flag: 'getIDProffBind',
      json: [{ User_Type: IDProof_Name }],
      spname: 'USP_TRADE_APPLICATION',
    };

    promise = new Promise((resolve, reject) => {
      this.http
        .post(this.apiRoot + 'insert_mul_json', body, {
          observe: 'response',
          responseType: 'json',
        })
        .toPromise()
        .then(
          (res) => {
            resolve(res.body);
          },
          (msg) => {
            reject(msg);
          }
        );
    });

    return promise;
  }

  getDocsTypeBind() {
    var promise;

    let body = {
      flag: 'getDoctypes',
      spname: 'USP_TRADE_APPLICATION',
    };

    promise = new Promise((resolve, reject) => {
      this.http
        .post(this.apiRoot + 'insert_mul_json', body, {
          observe: 'response',
          responseType: 'json',
        })
        .toPromise()
        .then(
          (res) => {
            resolve(res.body);
          },
          (msg) => {
            reject(msg);
          }
        );
    });

    return promise;
  }

  tradeInsert(
    jTLApp,
    jTLAppForm,
    jTLAppPayment,
    jTLAppFollowup,
    jTLAppTradeType,
    jTLAppOwner,
    jTlAppDocs
  ) {
    var promise;
    try {
      // kindly ensure from arguments given at order
      // payload to be send with the post request to :: http://localhost:7071/api/insert_mul_json
      let body = {
        flag: 'insertTL_Employee',
        jsonTLApp: jTLApp,
        jsonTLAppForm: jTLAppForm,
        jsonTLAppTradeType: jTLAppTradeType,
        jsonTLAppOwner: jTLAppOwner,
        jsonTLAppPaymentEmp: jTLAppPayment,
        jsonTLAppFollowupEmp: jTLAppFollowup,
        jsonTlAppDocs: jTlAppDocs,
        spname: 'USP_TRADE_APPLICATION_EMP',
      };

      promise = new Promise((resolve, reject) => {
        this.http
          .post(this.apiRoot + 'insert_mul_json', body, {
            observe: 'response',
            responseType: 'json',
          })
          .toPromise()
          .then(
            (res) => {
              // get response & when data comes right use getter so show those data within dashboard by subscribing
              // res.body's data will also be shown on printReports and dashboard component
              console.log('RESPONES FROM TRADE INSERT: ', res.body);
              sessionStorage.setItem('paymentForm', JSON.stringify(res.body));
              resolve(res.body);
            },
            (msg) => {
              reject(msg);
            }
          );
      });
    } catch (error) {
      //;
      console.log('Error from servoice', error);
    }

    return promise;
  }
}
