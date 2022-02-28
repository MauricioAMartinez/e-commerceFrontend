import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

import { HomeComponent } from './home/home.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path:'',component: DashboardComponent,children:[
    {path:'',component: HomeComponent},
    {path:'home',component: HomeComponent},
    {path:'wishlist',component: WishlistComponent},
    {path:'shoppingcart',component: ShoppingCartComponent},
    {path:'profile',component: ProfileComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
