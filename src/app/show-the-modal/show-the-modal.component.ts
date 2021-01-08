import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "app-show-the-modal",
  templateUrl: "./show-the-modal.component.html",
  styleUrls: ["./show-the-modal.component.scss"],
})
export class ShowTheModalComponent implements OnInit, OnChanges {
  @ViewChild("modalOpenBtn") modalOpenBtn: ElementRef;
  @ViewChild("modalCloseElement") modalCloseElement: ElementRef;

  @Input() shouldModalOpen = false;
  @Output() emitter = new EventEmitter();
  @Input() encodeImageObject = { name: "", file: "" };

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes", changes);
    const { shouldModalOpen, encodeImageObject } = changes;
    console.log("SHOW ME: ", this.encodeImageObject);

    if (encodeImageObject && encodeImageObject.currentValue.file) {
      this.encodeImageObject = encodeImageObject.currentValue;
      console.log(this.encodeImageObject);
    }

    if (shouldModalOpen && shouldModalOpen.currentValue) {
      // this gets all formGroup but need to take the spcific one or or filter by the id
      console.log("modalBtnWithinIf: ", this.modalOpenBtn);
      console.log(
        "modalBtnWithinElseNativeIF: ",
        this.modalOpenBtn.nativeElement
      );
      this.modalOpenBtn.nativeElement.click();
    } else {
      console.log("modalBtnWithinElse: ", this.modalCloseElement);
      console.log(
        "modalBtnWithinElseNative: ",
        this.modalCloseElement.nativeElement
      );
      this.modalCloseElement.nativeElement.click();
    }
  }

  closeModal() {
    this.emitter.emit(false);
  }
}
