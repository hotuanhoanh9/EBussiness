import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { ProductService } from '../_services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  currentUser: any;
  products: any;
  content: any;
  total: any = 0;
  result: string = '';
  constructor(private storageService: StorageService,
    public productService: ProductService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.result = params['success']; 
      if(this.result == "true"){
        this.content = "Giao dịch thành công";
      } else {
        this.content = "Giao dịch thất bại";
      }
  });
    
  }
  
  navigateToProductPage(){
    window.location.href = '/products?phone='+localStorage.getItem("phone");
  }
}
