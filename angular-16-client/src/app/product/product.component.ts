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
  errorMessage: string = '';
  constructor(private storageService: StorageService,
    public productService: ProductService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProducts();
    // this.productService.getProducts().subscribe(data => {
    //   this.products = data; // Gán dữ liệu nhận được vào biến products
    // });
    // this.activatedRoute.queryParams.subscribe(params => {
    //   this.phone = params['phone']; 
    // });
    // this.productService.getProducts().subscribe({
    //   next: data => {
    //     this.products = JSON.parse(data).products;
    //   },
    //   error: err => {
    //     if (err.error) {
    //       try {
    //         const res = JSON.parse(err.error);
    //         this.content = res.message;
    //       } catch {
    //         this.content = `Error with status: ${err.status} - ${err.statusText}`;
    //       }
    //     } else {
    //       this.content = `Error with status: ${err.status}`;
    //     }
    //   }
    // });
    // this.products = [
    //   {
    //     "ID": 1,
    //     "title": "San pham 1",
    //     "price": 1000,
    //     "img": "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
    //     "quantity": 0
    //   },
    //   {
    //     "ID": 2,
    //     "title": "San pham 2",
    //     "price": 2000,
    //     "img": "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
    //     "quantity": 0
    //   }
    // ]
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
  addNewProduct(): void {
    window.location.href = '/add-product';
  }
  formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
  }
  navigateToDetail(id: any){
    window.location.href = "/add-product/"+ id
  }
  getProducts(): void {
    // Call the getProducts method from your service
    this.productService.getProducts().subscribe({
      next: (data: any[]) => {
        // On successful response, assign the data to the products array
        this.products = data;
        this.errorMessage = ''; // Clear any previous errors
        console.log('Products fetched successfully:', this.products);
      },
      error: (error: any) => {
        // Handle errors
        console.error('Error fetching products:', error);
        this.errorMessage = 'Failed to load products. Please try again later.';
        if (error.message) {
            this.errorMessage += ` (${error.message})`;
        }
      }
    });
  }
}
