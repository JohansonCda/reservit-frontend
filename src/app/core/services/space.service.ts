import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Type {
  name: string;
}

export interface Reservation {
  id: number;
  startTime: string;
  endTime: string;
}

export interface Space {
  id: number;
  name: string;
  description: string;
  pricePerHour: string;
  capacity: number;
  type: string;
  reservations?: Reservation[];
  isAvailable?: boolean;
  photos?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SpaceService {
  private baseUrl = `${environment.apiUrl}/api/spaces`;

  constructor(private http: HttpClient) {}

  getSpaces(): Observable<{ member: Space[] }> {
    return this.http.get<{ member: Space[] }>(this.baseUrl);
  }

  getSpace(id: number): Observable<Space> {
    return this.http.get<Space>(`${this.baseUrl}/${id}`);
  }

  createSpace(space: Partial<Space>): Observable<Space> {
    return this.http.post<Space>(this.baseUrl, space, {
      headers: { 'Content-Type': 'application/ld+json' }
    });
  }

  updateSpace(id: number, space: Partial<Space>): Observable<Space> {
    return this.http.patch<Space>(`${this.baseUrl}/${id}`, space, {
      headers: { 'Content-Type': 'application/merge-patch+json' }
    });
  }

  deleteSpace(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  async getEnrichedSpaces(): Promise<Space[]> {
    const data = await lastValueFrom(this.getSpaces());

    const enrichedSpaces = await Promise.all(
      data.member.map(async (space: any) => {
        const reservations: Reservation[] = [];

        for (const resIri of space.reservations || []) {
          try {
            const res = await lastValueFrom(this.http.get<Reservation>(`${environment.apiUrl}${resIri}`));
            reservations.push(res);
          } catch (err) {
            console.warn(`No se pudo cargar la reserva ${resIri}`);
          }
        }

        return {
          ...space,
          reservations
        };
      })
    );

    return enrichedSpaces;
  }
}
