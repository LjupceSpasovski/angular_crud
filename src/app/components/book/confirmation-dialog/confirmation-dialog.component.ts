import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  @Input() bookTitle: string = '';
  @Input() action: string = '';
  @Output() comfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  confirm(value: boolean){
    this.comfirmed.emit(value)
  }
}
