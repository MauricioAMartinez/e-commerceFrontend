import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  user_id = ''
  constructor(private http:HttpClient,
    private cookieService:CookieService) {
    this.user_id =   this.cookieService.get('id')
   }


  

  url = 'http://localhost/e-commerceBackend/public/api/'

  getCart(id:string):Observable<any>{
    return this.http.get<any>(this.url+'collectioncart/'+id)
  }

  addCart(idProduct:any):Observable<any>{
    return this.http.get<any>(this.url+'addproductcart/'+this.user_id+'/'+idProduct)
  }

  deleteCart(idProduct:any):Observable<any>{
    return this.http.get<any>(this.url+'deleteproductcart/'+idProduct)
  }
}
