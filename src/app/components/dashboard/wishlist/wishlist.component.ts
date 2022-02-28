import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../services/wishlist.service';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PuenteService } from '../../../services/puente.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  user_id = this.cookieService.get('id')
  products: Array<any> = []
  cookieExists: boolean = this.cookieService.check('id');
  constructor(private _wishlistService: WishlistService,
    private _cartService:CartService,
    private _puenteService:PuenteService,
    private cookieService: CookieService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.setWishlist()

  }

  setWishlist() {
    this._wishlistService.getWishlist(this.user_id).subscribe(data => {

      this.products = [...data]
    })
  }

  deleteProductWish(id: any,productName:any) {
    this._wishlistService.deleteWishlist(id).subscribe(data => {
      this.setWishlist()
      this.lengthWishlist()
    })
    this.deleteSnackBar(productName);

  }

  deleteSnackBar(productName:any) {
    this.snackBar.open(productName+' removed from wishlist', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  lengthWishlist(){
    this._wishlistService.getWishlist(this.user_id).subscribe(data=>{
      this._puenteService.disparadorPuente.emit(data)
    })
  }

  addCart(id:any,productName:any){
    this._cartService.addCart(id).subscribe(data=>{
    
      
    })
    if(this.cookieExists){
      this.sucessSnackbar(productName,' added to cart');
      this.lengthCart()
     
    }else{
      this.sucessSnackbar('',' Debes iniciar sesion para agregar productos');
    }

    
  }
  lengthCart(){
    this._cartService.getCart(this.user_id).subscribe(data=>{
      this._puenteService.disparadorCart.emit(data)
    })
  }
  
  sucessSnackbar(productName:any,message:string) {
    this.snackBar.open(productName+message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
}
