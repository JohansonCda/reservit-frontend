import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Type {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  constructor(private http: HttpClient) {}

    getTypes(): Observable<{ member: Type[] }> {
    return this.http.get<{ member: Type[] }>('/api/types');
  }
}
