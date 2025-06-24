import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://127.0.0.1:8080/api/';
const httpOptions = {
  headers: new HttpHeaders({  'Access-Control-Allow-Origin':"http://127.0.0.1:8080/*" })
};

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(API_URL + 'products', { responseType: 'text' });
  }
  getProduct(productId: string): Observable<any> {
    return this.http.get(API_URL + 'products/'+ productId);
  }
  editProduct(productId: string, name: string, price: number): Observable<any> {
    let body = {
      name: name,
      price: price
    }
    return this.http.put(API_URL + 'products/'+ productId,body,{
      headers: httpOptions.headers,
    
    } );
  }

}
