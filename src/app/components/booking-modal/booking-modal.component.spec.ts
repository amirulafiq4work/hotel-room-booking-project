import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingModalComponent } from './booking-modal.component';
import { Room } from '../../models/room.model';
import { By } from '@angular/platform-browser';

describe('BookingModalComponent', () => {
  let component: BookingModalComponent;
  let fixture: ComponentFixture<BookingModalComponent>;

  const mockRoom: Room = {
    id: '1',
    name: '101',
    type: 'Single',
    price: 100,
    available: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingModalComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingModalComponent);
    component = fixture.componentInstance;
    component.room = mockRoom;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.bookingForm.value).toEqual({
      guestName: '',
      checkInDate: '',
      checkOutDate: '',
    });
  });

  it('should have required validators on form controls', () => {
    const guestNameControl = component.bookingForm.get('guestName');
    const checkInDateControl = component.bookingForm.get('checkInDate');
    const checkOutDateControl = component.bookingForm.get('checkOutDate');

    guestNameControl?.setValue('');
    checkInDateControl?.setValue('');
    checkOutDateControl?.setValue('');

    expect(guestNameControl?.valid).toBeFalse();
    expect(checkInDateControl?.valid).toBeFalse();
    expect(checkOutDateControl?.valid).toBeFalse();
  });

  it('should emit visibleChange event when close is called', () => {
    spyOn(component.visibleChange, 'emit');

    component.close();

    expect(component.visibleChange.emit).toHaveBeenCalledWith(false);
  });

  it('should emit bookingConfirmed event when form is valid and onSubmit is called', () => {
    spyOn(component.bookingConfirmed, 'emit');

    component.bookingForm.setValue({
      guestName: 'John Doe',
      checkInDate: '2024-12-01',
      checkOutDate: '2024-12-05',
    });

    component.onSubmit();

    expect(component.bookingConfirmed.emit).toHaveBeenCalledWith({
      roomId: '1',
      guestName: 'John Doe',
      checkInDate: '2024-12-01',
      checkOutDate: '2024-12-05',
    });
  });

  it('should not emit bookingConfirmed event when form is invalid', () => {
    spyOn(component.bookingConfirmed, 'emit');

    component.bookingForm.setValue({
      guestName: '',
      checkInDate: '',
      checkOutDate: '',
    });

    component.onSubmit();

    expect(component.bookingConfirmed.emit).not.toHaveBeenCalled();
  });
});
