import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomCardComponent } from './room-card.component';
import { Room } from '../../models/room.model';
import { By } from '@angular/platform-browser';

describe('RoomCardComponent', () => {
  let component: RoomCardComponent;
  let fixture: ComponentFixture<RoomCardComponent>;

  const mockRoom: Room = {
    id: '1',
    name: '101',
    type: 'Single',
    price: 100,
    available: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomCardComponent);
    component = fixture.componentInstance;
    component.room = mockRoom;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display room information correctly', () => {
    const roomName = fixture.debugElement.query(
      By.css('.card-title')
    ).nativeElement;
    const roomType = fixture.debugElement.query(By.css('.badge')).nativeElement;
    const roomPrice = fixture.debugElement.query(
      By.css('strong')
    ).nativeElement;
    const availability = fixture.debugElement.query(
      By.css('.text-success')
    ).nativeElement;

    expect(roomName.textContent).toContain('Room 101');
    expect(roomType.textContent).toContain('Single');
    expect(roomPrice.textContent).toContain('$100');
    expect(availability.textContent).toContain('Available');
  });

  it('should show room as booked when not available', () => {
    const bookedRoom: Room = { ...mockRoom, available: false };
    component.room = bookedRoom;
    fixture.detectChanges();

    const availability = fixture.debugElement.query(
      By.css('.text-danger')
    ).nativeElement;
    const button = fixture.debugElement.query(By.css('button')).nativeElement;

    expect(availability.textContent).toContain('Booked');
    expect(button.disabled).toBeTrue();
    expect(button.textContent).toContain('Unavailable');
  });

  it('should emit bookRoom event when book button is clicked', () => {
    spyOn(component.bookRoom, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(component.bookRoom.emit).toHaveBeenCalledWith(mockRoom);
  });

  it('should not emit bookRoom event when room is not available', () => {
    const bookedRoom: Room = { ...mockRoom, available: false };
    component.room = bookedRoom;
    fixture.detectChanges();

    spyOn(component.bookRoom, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(component.bookRoom.emit).not.toHaveBeenCalled();
  });

  it('should show room when no filter is applied', () => {
    component.filterType = '';
    fixture.detectChanges();

    expect(component.shouldShowRoom()).toBeTrue();
  });

  it('should show room when filter matches room type', () => {
    component.filterType = 'single';
    fixture.detectChanges();

    expect(component.shouldShowRoom()).toBeTrue();
  });

  it('should not show room when filter does not match room type', () => {
    component.filterType = 'double';
    fixture.detectChanges();

    expect(component.shouldShowRoom()).toBeFalse();
  });
});
