import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from './material.service';
import { Motor } from './motor.service';

export interface Pump {
  id: number;
  name: string;
  description: string;
  motorId: number;
  housingMaterialId: number;
  impellerMaterialId: number;
  maxPressureBar: number;
  liquidTemperatureC: number;
  weightKg: number;
  priceRub: number;
  imageUrl: string;

  motor?: Motor;
  housingMaterial?: Material;
  impellerMaterial?: Material;
}

@Injectable({
  providedIn: 'root'
})
export class PumpService {
  private apiUrl = 'https://wilo-backend.onrender.com/api/pumps';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Pump[]> {
    return this.http.get<Pump[]>(this.apiUrl);
  }

  getById(id: number): Observable<Pump> {
    return this.http.get<Pump>(`${this.apiUrl}/${id}`);
  }

  create(pump: Pump): Observable<Pump> {
    return this.http.post<Pump>(this.apiUrl, pump);
  }

  update(id: number, pump: Pump): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, pump);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
