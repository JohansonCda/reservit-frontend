import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Type {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private baseUrl = `${environment.apiUrl}/api/types`;

  constructor(private http: HttpClient) {}

  getTypes(): Observable<{ member: Type[] }> {
    return this.http.get<{ member: Type[] }>(this.baseUrl);
  }
}
