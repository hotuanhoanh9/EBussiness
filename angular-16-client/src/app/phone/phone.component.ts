import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { ProductService } from '../_services/product.service';

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
  constructor(private storageService: StorageService,
    public productService: ProductService) { }

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
}
