import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }


  getAuthToken() {
    return localStorage.getItem('token');
  }
  getAuthKey() {
    return localStorage.getItem('apikey');
  }

  getAllDataZabbix(param, url) {
    return this.http.get<any[]>(`${environment.apiZabbixUrl + url}?apikey=${this.getAuthKey()}&${param}`);
  }

}
