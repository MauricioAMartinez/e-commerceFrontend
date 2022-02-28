import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { WishlistService } from '../../../services/wishlist.service';
import { PuenteService } from '../../../services/puente.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  cantidad: any = 0
  cantidadCart: any = 0
  products: Array<any> = []
  cartProducts: Array<any> = []
  user_id = this.cookieService.get('id')
  constructor(
    private cookieService: CookieService,
    private _puenteService:PuenteService,
    private _cartService:CartService,
    private __wishlistService:WishlistService) { }
  
  ngOnInit(): void {
  
this.lengthCart()
this.lengthWishlist()

    this._puenteService.disparadorCart.subscribe(data=>{
      this.cartProducts = [...data]
      this.cantidadCart = this.cartProducts.length
    })

    this._puenteService.disparadorPuente.subscribe(data =>{
      this.products = [...data]
      this.cantidad = this.products.length
    })
  }

  lengthCart(){
    this._cartService.getCart(this.user_id).subscribe(data=>{
      this.cartProducts = [...data]
      this.cantidadCart = this.cartProducts.length
    })
  }

  lengthWishlist(){
    this.__wishlistService.getWishlist(this.user_id).subscribe(data=>{
      this.products = [...data]
      this.cantidad = this.products.length
    })
  }


}
