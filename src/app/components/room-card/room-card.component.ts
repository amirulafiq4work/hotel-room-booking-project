import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css'],
})
export class RoomCardComponent {
  @Input() room!: Room;
  @Input() filterType: string = '';
  @Output() bookRoom = new EventEmitter<Room>();

  onBookRoom(): void {
    // Only emit if the room is available
    if (this.room.available) {
      this.bookRoom.emit(this.room);
    }
  }

  shouldShowRoom(): boolean {
    if (!this.filterType) return true;
    return this.room.type.toLowerCase() === this.filterType.toLowerCase();
  }
}
