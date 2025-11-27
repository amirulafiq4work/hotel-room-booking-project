import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RoomCardComponent } from './components/room-card/room-card.component';
import { BookingModalComponent } from './components/booking-modal/booking-modal.component';

@NgModule({
  declarations: [AppComponent, RoomCardComponent, BookingModalComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
