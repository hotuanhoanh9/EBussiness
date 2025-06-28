import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { ProductService } from '../_services/product.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {
  currentUser: any;
  products: any;
  content: any;
  total: any = 0;
  phone: string = '';
  username: string = '';
  password: string = '';
  err1: boolean = false;
  err2: boolean = false
  registrationMessage: string = '';
  isSuccess: boolean = false;

  constructor(private storageService: StorageService,
    public productService: ProductService,
  private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: data => {
        this.products = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
    this.products = [
      {
        "ID": 1,
        "name": "San pham 1",
        "price": 1000,
        "img": "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
        "quantity": 0
      },
      {
        "ID": 2,
        "name": "San pham 2",
        "price": 2000,
        "img": "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
        "quantity": 0
      }
    ]
  }
  decreaseQuantity(id: string){
    for(let i = 0; i< this.products.length; i++){
      if(this.products[i].ID == id && this.products[i].quantity > 0) {
        this.products[i].quantity -= 1;
        this.total -= this.products[i].price;
      };
    }
  }
  increaseQuantity(id: string){
    for(let i = 0; i< this.products.length; i++){
      if(this.products[i].ID == id) {
        this.products[i].quantity += 1;
        this.total += this.products[i].price;
      }
    }
  }
  navigateToProductPage(){
    if(this.username == ''){
      this.err1 = true;
    }
    if(this.password == ''){
      this.err2 = true;     
    }
    if(this.username == '' && this.password == '') return;
    window.location.href = '/products';
  }
  onSubmit(): void {
    if (this.username && this.password) {
      // Form hợp lệ, lấy dữ liệu
      this.authService.login(this.username, this.password)
        .subscribe({
          next: (response) => {
            // Handle successful registration/login (token is already saved by the service)
            this.registrationMessage = 'Đăng nhập thành công';
            localStorage.setItem('token', response.token)
            // Optional: Redirect user after successful registration
            this.router.navigate(['/home']); //
          },
          error: (error) => {
            // Handle registration/login errors from the API
            console.error('Đăng nhập thất bại:', error);
            this.registrationMessage = 'Đăng nhập thất bại. Vui lòng thử lại.';
            if (error.error && error.error.message) {
              this.registrationMessage += ` Lỗi: ${error.error.message}`;
            }
            this.isSuccess = false;
          }
        });

      // Hiển thị thông báo thành công
      this.registrationMessage = 'Đăng ký thành công!.';
      this.isSuccess = true;
      
    } else {
      // Form không hợp lệ, hiển thị thông báo lỗi
      this.registrationMessage = 'Vui lòng kiểm tra lại thông tin. Form chưa hợp lệ.';
      this.isSuccess = false;
      
    }
  }
}
