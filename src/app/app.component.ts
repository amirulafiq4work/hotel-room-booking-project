import { Component, OnInit } from '@angular/core';
import { RoomService } from './services/room.service';
import { BookingService } from './services/booking.service';
import { Room, Booking } from './models/room.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  rooms: Room[] = [];
  selectedRoom: Room | null = null;
  showModal = false;
  showToast = false;
  filterType = '';

  constructor(
    private roomService: RoomService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.roomService.getRooms().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  openBookingModal(room: Room): void {
    this.selectedRoom = room;
    this.showModal = true;
  }

  onBookingConfirmed(bookingData: any): void {
    this.bookingService.bookRoom(bookingData).subscribe((success) => {
      if (success) {
        this.showToast = true;
        this.loadRooms(); // Refresh room availability
        setTimeout(() => (this.showToast = false), 3000);
      }
    });
  }

  onFilterChange(type: string): void {
    this.filterType = type;
  }
}
