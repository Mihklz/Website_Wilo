import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Motor {
  id: number;
  name: string;
  powerKw: number;
  currentA: number;
  speedRpm: number;
  description: string;
  priceRub: number;

  // Добавляем список связанных насосов
  pumps?: {
    id: number;
    name: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class MotorService {
  private apiUrl = 'https://wilo-backend.onrender.com/api/motors';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Motor[]> {
    return this.http.get<Motor[]>(this.apiUrl);
  }

  getById(id: number): Observable<Motor> {
    return this.http.get<Motor>(`${this.apiUrl}/${id}`);
  }

  create(motor: Motor): Observable<Motor> {
    return this.http.post<Motor>(this.apiUrl, motor);
  }

  update(id: number, motor: Motor): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, motor);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
