import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reservation {
  id?: number;
  space: string;
  startTime: string;
  endTime: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  getAllReservations(): Observable<{ member: Reservation[] }> {
    return this.http.get<{ member: Reservation[] }>('/api/reservations');
  }

  getUserReservations(): Observable<{ member: Reservation[] }> {
    return this.http.get<{ member: Reservation[] }>('/api/reservations?user=current');
  }

  createReservation(payload: any): Observable<any> {
    return this.http.post('/api/reservations', payload, {
      headers: { 'Content-Type': 'application/ld+json' }
    });
  }

  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`/api/reservations/${id}`);
  }

  requestCancellation(id: number): Observable<any> {
    return this.http.patch(`/api/reservations/${id}`, {
      status: 'cancel_pending'
    }, {
      headers: { 'Content-Type': 'application/merge-patch+json' }
    });
  }

  getReservationById(id: number): Observable<Reservation> {
      return this.http.get<Reservation>(`/api/reservations/${id}`);
    }

    updateReservation(id: number, payload: any): Observable<any> {
      return this.http.patch(`/api/reservations/${id}`, payload, {
        headers: { 'Content-Type': 'application/merge-patch+json' }
      });
    }
}
