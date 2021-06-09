import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RADNICI_PO_SEKTORU_URL, RADNICI_URL } from '../app.constants';
import { Radnik } from '../models/radnik';

@Injectable({
  providedIn: 'root'
})
export class RadnikService {

  constructor(private httpClient: HttpClient) { }

  public getAllRadniciPoSektoru(idSektora: number): Observable<any> {
    return this.httpClient.get(`${RADNICI_PO_SEKTORU_URL}/${idSektora}`);
  }

  public addRadnika(radnik: Radnik): Observable<any> {
    radnik.id = 0;
    return this.httpClient.post(`${RADNICI_URL}`, radnik);
  }

  public updateRadnika (radnik: Radnik): Observable<any> {
    return this.httpClient.put(`${RADNICI_URL}`, radnik);
  }
    
  public deleteRadnika(id: number): Observable<any> {
    return this.httpClient.delete(`${RADNICI_URL}/${id}`);
  }
  
}
