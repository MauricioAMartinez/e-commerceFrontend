import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  user_id = '1'
  constructor(private http:HttpClient,
    private cookieService:CookieService) {
      this.user_id =   this.cookieService.get('id')
     }
  


  url = 'http://localhost/e-commerceBackend/public/api/'

  getWishlist(id:string):Observable<any>{
    return this.http.get<any>(this.url+'collection/'+id)
  }

  addWishlist(idProduct:any):Observable<any>{
    return this.http.get<any>(this.url+'addproductwish/'+this.user_id+'/'+idProduct)
  }

  deleteWishlist(idProduct:any):Observable<any>{
    return this.http.get<any>(this.url+'deleteproduct/'+this.user_id+'/'+idProduct)
  }
}
