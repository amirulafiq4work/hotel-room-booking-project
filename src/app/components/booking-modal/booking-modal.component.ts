import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.css'],
})
export class BookingModalComponent {
  @Input() room!: Room;
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() bookingConfirmed = new EventEmitter<any>();

  bookingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      guestName: ['', [Validators.required, Validators.minLength(2)]],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      const bookingData = {
        roomId: this.room.id,
        ...this.bookingForm.value,
      };
      this.bookingConfirmed.emit(bookingData);
      this.close();
    }
  }

  close(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.bookingForm.reset();
  }
}
