import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  Product } from '../models/product.model';

@Injectable()
export class ApiService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + 'products');
  }

}
