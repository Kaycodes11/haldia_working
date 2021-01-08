import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { SvTradeRegistrationService } from "../../page-service/trade-reg/sv-trade-registration.service";

@Component({
  selector: "app-del-confirm-modal",
  templateUrl: "./del-confirm-modal.component.html",
  styleUrls: ["./del-confirm-modal.component.scss"],
})
export class DelConfirmModalComponent implements OnInit {
  @Output() delFromCart: EventEmitter<any> = new EventEmitter<any>();

  cartData: any;
  messagebody: string; // just this property used within the template
  constructor(public proObj1: SvTradeRegistrationService) {}

  ngOnInit(): void {
    this.proObj1.getCartBuffer().subscribe((data) => {
      console.log("get cart buffer data from del-confirm modal: ", data);

      //dynamically get the Keys of Object
      var keys = [];
      for (var key in data) {
        keys.push(key);
      }
      console.log("From service", data[keys[1]]);

      this.cartData = data;
      this.messagebody = data[keys[1]];

      if (sessionStorage.getItem("modalOn") === "Y") {
        let element: HTMLElement = document.getElementById(
          "btnModalClick"
        ) as HTMLElement;
        element.click();

        sessionStorage.setItem("modalOn", "N");
      }
    });
  }

  onDeleteConfirm() {
    console.log("emmiting data", this.cartData);
    this.delFromCart.emit(this.cartData);
  }
}
