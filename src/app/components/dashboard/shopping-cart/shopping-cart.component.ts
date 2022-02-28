import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { PuenteService } from 'src/app/services/puente.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private _wishlistService: WishlistService,
    private _cartService:CartService,
    private _puenteService:PuenteService,
    private cookieService: CookieService,
    private snackBar: MatSnackBar) { }

    user_id = this.cookieService.get('id')
    products: Array<any> = []

  ngOnInit(): void {
    this.setCart();
  }
  setCart() {
    this._cartService.getCart(this.user_id).subscribe(data => {

      this.products = [...data]
      console.log(this.products)

    })
   
  }

  deleteProductCart(id: any,productName:any) {
    this._cartService.deleteCart(id).subscribe(data => {
      this.setCart()
      this.lengthCart()
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

  lengthCart(){
    this._cartService.getCart(this.user_id).subscribe(data=>{
      this._puenteService.disparadorCart.emit(data)
    })
  }
}
