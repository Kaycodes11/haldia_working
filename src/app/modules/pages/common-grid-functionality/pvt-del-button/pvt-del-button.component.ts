import { Component, OnInit } from "@angular/core";
import { SvTradeRegistrationService } from "../../page-service/trade-reg/sv-trade-registration.service";

@Component({
  selector: "app-pvt-del-button",
  templateUrl: "./pvt-del-button.component.html",
  styleUrls: ["./pvt-del-button.component.scss"],
})
export class PvtDelButtonComponent implements OnInit {
  params: any;
  data: any;

  constructor(public svtradeRegistrationService: SvTradeRegistrationService) {}

  ngOnInit(): void {}

  agInit(params) {
    this.params = params;
    this.data = params.value;
  }

  delPvtLtdCart() {
    const selectedRowNodeId = this.params.node.id;
    const { idProofNo } = this.params.data;
    // sessionStorage.setItem("modalOn", "Y");
    // this.gridBuffer.nextCart(this.params.data);
    console.log("Logged delPvtLtdCart");
    this.svtradeRegistrationService.setPvtDeleteModalData({
      messagebody: idProofNo,
      rowNodeId: selectedRowNodeId,
      shouldModalOpen: true,
    });
  }
}
