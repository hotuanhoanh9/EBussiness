import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductComponent } from './product/product.component';
import { PhoneComponent } from './phone/phone.component';
import { SuccessComponent } from './success/success.component';
import { AddProductComponent } from './add-product/add-product.component';
import { RegisterComponent } from './register/register.component';
import { AllProductComponent } from './all-product/all-product.component';
import { PaymentComponent } from './payment/payment.component';
const routes: Routes = [
  { path: 'all-product', component: AllProductComponent },
  { path: 'products', component: ProductComponent },
  { path: 'home', component: HomeComponent },
  { path: 'add-product/:id', component: AddProductComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'login', component: PhoneComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'result', component: SuccessComponent },
  { path: 'payment', component: PaymentComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
