import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private mockRooms: Room[] = [
    { id: '1', name: '101', type: 'Single', price: 100, available: true },
    { id: '2', name: '102', type: 'Double', price: 150, available: true },
    { id: '3', name: '103', type: 'Suite', price: 250, available: false },
    { id: '4', name: '201', type: 'Single', price: 110, available: true },
    { id: '5', name: '202', type: 'Double', price: 160, available: true },
    { id: '6', name: '203', type: 'Suite', price: 280, available: true },
  ];

  getRooms(): Observable<Room[]> {
    return of(this.mockRooms);
  }

  getRoomById(id: string): Observable<Room | undefined> {
    const room = this.mockRooms.find((r) => r.id === id);
    return of(room);
  }
}
