import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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
  private baseUrl = `${environment.apiUrl}/api/reservations`;

  constructor(private http: HttpClient) {}

  getAllReservations(): Observable<{ member: Reservation[] }> {
    return this.http.get<{ member: Reservation[] }>(this.baseUrl);
  }

  getUserReservations(): Observable<{ member: Reservation[] }> {
    return this.http.get<{ member: Reservation[] }>(`${this.baseUrl}?user=current`);
  }

  createReservation(payload: any): Observable<any> {
    return this.http.post(this.baseUrl, payload, {
      headers: { 'Content-Type': 'application/ld+json' }
    });
  }

  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  requestCancellation(id: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, {
      status: 'cancel_pending'
    }, {
      headers: { 'Content-Type': 'application/merge-patch+json' }
    });
  }

  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseUrl}/${id}`);
  }

  updateReservation(id: number, payload: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, payload, {
      headers: { 'Content-Type': 'application/merge-patch+json' }
    });
  }
}
