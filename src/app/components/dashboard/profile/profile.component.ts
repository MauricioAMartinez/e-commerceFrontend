import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { WishlistService } from 'src/app/services/wishlist.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario: Array<any> = []
  form: FormGroup
  snackbar = false
  user = false
  login = true
  products: Array<any> = []
  stock= false

  user_name= this.cookieService.get('id')
  user_id= this.cookieService.get('username')
  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private snackBar: MatSnackBar,
    private cookieService: CookieService,
    private _wishlistService: WishlistService


  ) {

    this.user_name= this.cookieService.get('id')
    this.user_id = this.cookieService.get('username')
    this.form = this.fb.group({
      user_name: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.user_name= this.cookieService.get('id')
    this.user_id= this.cookieService.get('username')
    this.validationSession()
    this.setWishlist()


  }

  ingresar() {
    const user = {
      user_name: this.form.value.user_name,
      password: this.form.value.password
    }



    this._userService.getUser(user).subscribe((data: any) => {
      this.usuario = data;

      if (this.usuario.length > 0) {


        this.cookieService.set('id', data[0].id, 1, '/');
        this.cookieService.set('username', data[0].user_name, 1, '/');
        this.login = false;
        this.snackbar = true;
        setTimeout(() => {
          this.snackbar = false;
          this.user = true;


        }, 6000);
      } else {
        this.error();
      }
    })



  }

  error() {
    this.snackBar.open('Usuario o contraseña ingresado son invalidos', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  validationSession() {
    if (this.cookieService.check('id')) {

      this.user = true;
      this.login = false;
      this.user_id = this.cookieService.get('id')
      this.user_name = this.cookieService.get('username')

    }
  }
  setWishlist() {
    this._wishlistService.getWishlist(this.user_id).subscribe(data => {

      this.products = [...data]
      for (let index = 0; index < this.products.length; index++) {
        if (this.products[index].stock == 0) {
          this.stock = true
          this.snackbarStock('there are products without stock in your wishlist');
          break
        }else{
          this.snackbarStock('You have products available in your wishlist');
        }
        
      }
    })
  }

  snackbarStock(message:string){
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }


}
