import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Material {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private apiUrl = 'https://wilo-backend.onrender.com/api/materials';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Material[]> {
    return this.http.get<Material[]>(this.apiUrl);
  }

  getById(id: number): Observable<Material> {
    return this.http.get<Material>(`${this.apiUrl}/${id}`);
  }

  create(material: Material): Observable<Material> {
    return this.http.post<Material>(this.apiUrl, material);
  }

  update(id: number, material: Material): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, material);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
