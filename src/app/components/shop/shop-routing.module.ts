import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductLeftSidebarComponent } from './products/product-left-sidebar/product-left-sidebar.component';
import { HomeTwoComponent } from './home-two/home-two.component';
// import { HomeThreeComponent } from './home-three/home-three.component';
// import { HomeFourComponent } from './home-four/home-four.component';
// import { HomeFiveComponent } from './home-five/home-five.component';


// Routes
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // { path: '', component: HomeComponent },

  // Pour activer un mode d'affiche, renommer le path à '' et changer mode affichage dans main.ts

   { path: '', component: HomeTwoComponent },
  // { path: '', component: HomeThreeComponent },
  // { path: '', component: HomeFourComponent },
  // { path: '', component: HomeFiveComponent },
  { path: 'products/:category', component: ProductLeftSidebarComponent },
  { path: 'product/:id', component: ProductDetailsComponent }


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
