import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductComponent } from './product/product.component';
import { PhoneComponent } from './phone/phone.component';
import { SuccessComponent } from './success/success.component';
const routes: Routes = [
  { path: 'products', component: ProductComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: PhoneComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'result', component: SuccessComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
