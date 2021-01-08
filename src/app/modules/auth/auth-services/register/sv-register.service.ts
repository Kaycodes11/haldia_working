import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Iuser } from "../../models/iuser";
import * as bcrypt from "bcryptjs";

@Injectable({
  providedIn: "root",
})
export class SvRegisterService {
  apiRoot: string = "http://localhost:7071/api/";

  passwordPossible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  hashmapPossible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]=-)(*&^%$#@!~`";
  otpPossible = "1234567890";

  constructor(private http: HttpClient) {}

  getUniqueUsername(email) {
    var promise;

    let body = {
      flag: "duplicatemail",
      json: [{ email: email }],
      spname: "USP_LOGIN",
    };

    promise = new Promise((resolve, reject) => {
      this.http
        .post(this.apiRoot + "insert_mul_json", body, {
          observe: "response",
          responseType: "json",
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

  registeruser(userObj: Iuser) {
    //
    let hashMap = this.makeRandom(12, this.hashmapPossible);
    let password = this.makeRandom(8, this.passwordPossible);
    let otp = this.makeRandom(4, this.otpPossible);

    //Hasging the password with salt
    //
    const salt = bcrypt.genSaltSync(10);
    let pass = bcrypt.hashSync(password, salt);
    //let compareRes = bcrypt.compareSync(password, pass);
    console.log("Password after hashed", pass);
    sessionStorage.setItem("passnothashed", password);

    let body = {
      flag: "registeruser",
      json: [
        {
          User_Type: userObj.UserType,
          CompanyName: userObj.CompanyName,
          Name: userObj.Name,
          EmailId: userObj.EmailId,
          MobileNo: userObj.MobileNo,
          Password: pass,
          HashMap: hashMap,
          OTP: otp,
        },
      ],
      spname: "USP_LOGIN",
    };

    // let body = {
    //       "FirstName": userObj.FirstName,
    //       "MiddleName": userObj.MiddleName,
    //       "LastName": userObj.LastName,
    //       "FullName": userObj.FullName,
    //       "EmailId": userObj.EmailId,
    //       "MobileNo": userObj.MobileNo,
    //       "Password": password,
    //       "HashMap": hashMap,
    //       "OTP": otp
    // };

    return new Promise((resolve, reject) => {
      this.http
        .post(this.apiRoot + "insert_mul_json", body, {
          observe: "response",
          responseType: "json",
        })
        .toPromise()
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    let i;
    for (i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
      if (text.length === lengthOfCode) {
        break;
      }
      i = 0;
      continue;
    }

    return text;
  }
}
