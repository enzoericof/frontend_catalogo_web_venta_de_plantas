import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantaService {

  private apiUrl = 'http://localhost:8080/api/plantas';

  constructor(private http: HttpClient) {}


listar() {
  return this.http.get<any[]>(this.apiUrl);
}

obtenerPorId(id: number) {
  return this.http.get<any>(`${this.apiUrl}/${id}`);
}

}

