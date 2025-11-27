export interface Room {
  id: string;
  name: string;
  type: 'Single' | 'Double' | 'Suite';
  price: number;
  available: boolean;
}

export interface Booking {
  id?: string;
  roomId: string;
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
}
