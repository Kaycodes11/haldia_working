import { Component, OnInit } from "@angular/core";
import { SvTradeRegistrationService } from "../../page-service/trade-reg/sv-trade-registration.service";

@Component({
  selector: "app-grid-button-del",
  templateUrl: "./grid-button-del.component.html",
  styleUrls: ["./grid-button-del.component.scss"],
})
export class GridButtonDelComponent implements OnInit {
  params: any;
  data: any;
  constructor(public gridBuffer: SvTradeRegistrationService) {}

  agInit(params) {
    this.params = params;
    this.data = params.value;
  }

  delCart() {
    sessionStorage.setItem("modalOn", "Y");
    this.gridBuffer.nextCart(this.params.data);
  }

  ngOnInit(): void {}
}
