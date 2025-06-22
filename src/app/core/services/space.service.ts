import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';

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
  constructor(private http: HttpClient) {}

  getSpaces(): Observable<{ member: Space[] }> {
    return this.http.get<{ member: Space[] }>('/api/spaces');
  }

  getSpace(id: number): Observable<Space> {
    return this.http.get<Space>(`/api/spaces/${id}`);
  }

  createSpace(space: Partial<Space>): Observable<Space> {
    return this.http.post<Space>('/api/spaces', space, {
      headers: { 'Content-Type': 'application/ld+json' }
    });
  }

  updateSpace(id: number, space: Partial<Space>): Observable<Space> {
    return this.http.patch<Space>(`/api/spaces/${id}`, space, {
      headers: { 'Content-Type': 'application/merge-patch+json' }
    });
  }

  deleteSpace(id: number): Observable<void> {
    return this.http.delete<void>(`/api/spaces/${id}`);
  }

  async getEnrichedSpaces(): Promise<Space[]> {
    const data = await lastValueFrom(this.getSpaces());

    const enrichedSpaces = await Promise.all(
      data.member.map(async (space: any) => {
        const reservations: Reservation[] = [];

        for (const resIri of space.reservations || []) {
          try {
            const res = await lastValueFrom(this.http.get<Reservation>(resIri));
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
