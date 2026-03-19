import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NovedadesService {
  private apiUrl = 'http://localhost:8080/api/novedades';

  constructor(private http: HttpClient) {}

  registrar(payload: { email?: string; whatsapp?: string }) {
    return this.http.post<{ mensaje: string; creada: boolean }>(this.apiUrl, payload);
  }
}
