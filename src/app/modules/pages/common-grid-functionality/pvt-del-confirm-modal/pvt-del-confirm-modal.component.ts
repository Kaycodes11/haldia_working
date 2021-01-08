import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from "@angular/core";
import { SvTradeRegistrationService } from "../../page-service/trade-reg/sv-trade-registration.service";
declare var $;

@Component({
  selector: "app-pvt-del-confirm-modal",
  templateUrl: "./pvt-del-confirm-modal.component.html",
  styleUrls: ["./pvt-del-confirm-modal.component.scss"],
})
export class PvtDelConfirmModalComponent implements OnInit, OnChanges {
  messagebody = "";
  rowNodeId = 0;

  constructor(private svtradeRegistrationService: SvTradeRegistrationService) {}

  ngOnInit(): void {
    this.svtradeRegistrationService.getPvtLtdModalObservableData().subscribe({
      next: ({ messagebody, rowNodeId, shouldModalOpen }) => {
        console.log(messagebody, rowNodeId);
        console.log(
          "this.svtradeRegistrationService.getPvtLtdModalObservableData()"
        );
        this.messagebody = messagebody;
        this.rowNodeId = rowNodeId;

        if (shouldModalOpen) {
          $("#deleteCartPvtLtdModal").modal("show");
        }
      },
      error: (error) => {},
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes", changes);
  }

  onDeleteConfirm() {
    $("#deleteCartPvtLtdModal").modal("hide");
    this.svtradeRegistrationService.setTradeEnlishmentData(this.rowNodeId);
  }
}
