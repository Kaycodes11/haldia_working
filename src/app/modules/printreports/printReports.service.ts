import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PrintReportsService {
  // private printData$ = new BehaviorSubject([]);
  // public printData = this.printData$.asObservable();
  baseURI: string = "http://localhost:7071/api/";

  constructor(private http: HttpClient) {}

  // setPrintData(value: any) {
  //   // whaereer value give to this method as argument will be the value of printData$ BS :: so to emit use this method
  //   this.printData$.next(value);
  // }

  // getPrintData() {
  //   // use this method to subscribe within any component or elsewhere as needed
  //   return this.printData;
  // }

  // for now just this get call would be sufficient; so  just subsribe  printReports component to get data from it
  getPrintReports() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.http.get(`${this.baseURI}/users`, httpOptions);
  }
}
