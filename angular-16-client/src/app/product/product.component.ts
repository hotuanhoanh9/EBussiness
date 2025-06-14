import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { ProductService } from '../_services/product.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  currentUser: any;
  products: any;
  content: any;
  total: any = 0;
  phone: string = '';
  constructor(private storageService: StorageService,
    public productService: ProductService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.phone = params['phone']; 
  });
    this.productService.getProducts().subscribe({
      next: data => {
        this.products = JSON.parse(data).products;
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
        "title": "San pham 1",
        "price": 1000,
        "img": "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
        "quantity": 0
      },
      {
        "ID": 2,
        "title": "San pham 2",
        "price": 2000,
        "img": "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
        "quantity": 0
      }
    ]
  }
  decreaseQuantity(id: string){
    for(let i = 0; i< this.products.length; i++){
      if(this.products[i]._id == id && this.products[i].quantity > 0) {
        this.products[i].quantity -= 1;
        this.total -= this.products[i].price;
      };
    }
  }
  increaseQuantity(id: string){
    for(let i = 0; i< this.products.length; i++){
      if(this.products[i]._id == id) {
        this.products[i].quantity += 1;
        this.total += this.products[i].price;
      }
    }
  }
  navigateToQRPage(product: any){
    
    localStorage.setItem("product", JSON.stringify(product));
    localStorage.setItem("phone", this.phone);
    window.location.href = '/home';
  }
}
