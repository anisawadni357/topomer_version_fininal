import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpXsrfTokenExtractor,HttpHeaders } from '@angular/common/http';
const baseUrl = '/assets/country';
@Injectable({
  providedIn: 'root'
})
export class AllpaysService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> { 
 
    return this.http.get(`${baseUrl}/liste.json`);
  }

}
