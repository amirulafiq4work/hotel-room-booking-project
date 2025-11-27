import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Booking } from '../models/room.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookings: Booking[] = [];

  bookRoom(booking: Booking): Observable<boolean> {
    // Simulate API call
    this.bookings.push({ ...booking, id: Date.now().toString() });

    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('hotelBookings', JSON.stringify(this.bookings));
    }

    return of(true);
  }

  getBookings(): Booking[] {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('hotelBookings');
      this.bookings = stored ? JSON.parse(stored) : [];
    }
    return this.bookings;
  }
}
