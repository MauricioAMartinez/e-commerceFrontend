import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  url = 'http://localhost/e-commerceBackend/public/api/'

  getProduct():Observable<any>{
    return this.http.get<any>(this.url+'listProduct')
  }

}
