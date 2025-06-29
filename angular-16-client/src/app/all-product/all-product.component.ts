import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { ProductService } from '../_services/product.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  currentUser: any;
  products: any;
  content: any;
  total: any = 0;
  phone: string = '';
  errorMessage: string = '';
  showConditionPopup: boolean = false;
  selectedCondition: string = 'activated';
  product: any;
  pricePredict: any;
  selectedProductId: any;
  message: any;
  constructor(private storageService: StorageService,
    public productService: ProductService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.products = [
  {
    id: 'ip13pm128',
    name: 'iPhone 13 Pro Max 128',
    storage: '128',
    imageUrl: '/assets/image/iphone13.jpg',
    oldPrice: 10237500,
    subsidyPrice: 500000,
    displayOldPrice: '10.237.500đ',
    displaySubsidyPrice: '500.000đ',
    activated: '10.237.500đ',
    type1:' 9.750.000đ',
    type2:'8.750.000đ',
    type3: '7.750.000đ',
    type4: '1.000.000đ'
  },
  {
    id: 'ip13pm256',
    name: 'iPhone 13 Pro Max 256',
    storage: '256',
    imageUrl: '/assets/image/iphone13.jpg',
    oldPrice: 11287500,
    subsidyPrice: 500000,
    displayOldPrice: '11.287.500đ',
    displaySubsidyPrice: '500.000đ',
    activated: '10.237.500đ',
    type1:' 9.750.000đ',
    type2:'8.750.000đ',
    type3: '7.750.000đ',
    type4: '1.000.000đ'
  },
  {
    id: 'ip13p128',
    name: 'iPhone 13 Pro 128',
    storage: '128',
    imageUrl: '/assets/image/iphone13.jpg',
    oldPrice: 7927500,
    subsidyPrice: 396000,
    displayOldPrice: '7.927.500đ',
    displaySubsidyPrice: '396.000đ',
    activated: '10.237.500đ',
    type1:' 9.750.000đ',
    type2:'8.750.000đ',
    type3: '7.750.000đ',
    type4: '1.000.000đ'
  },
  {
    id: 'ip13p256',
    name: 'iPhone 13 Pro 256',
    storage: '256',
    imageUrl: '/assets/image/iphone13.jpg',
    oldPrice: 8977500,
    subsidyPrice: 449000,
    displayOldPrice: '8.977.500đ',
    displaySubsidyPrice: '449.000đ',
    activated: '10.237.500đ',
    type1:' 9.750.000đ',
    type2:'8.750.000đ',
    type3: '7.750.000đ',
    type4: '1.000.000đ'
  },
  {
    id: 'ip12pm128',
    name: 'iPhone 12 Pro Max 128',
    storage: '128',
    imageUrl: '/assets/image/iphone13.jpg',
    oldPrice: 8452500,
    subsidyPrice: 423000,
    displayOldPrice: '8.452.500đ',
    displaySubsidyPrice: '423.000đ',
    activated: '10.237.500đ',
    type1:' 9.750.000đ',
    type2:'8.750.000đ',
    type3: '7.750.000đ',
    type4: '1.000.000đ'
  },
  {
    id: 'ip12pm256',
    name: 'iPhone 12 Pro Max 256',
    storage: '256',
    imageUrl: '/assets/image/iphone13.jpg',
    oldPrice: 9292500,
    subsidyPrice: 465000,
    displayOldPrice: '9.292.500đ',
    displaySubsidyPrice: '465.000đ',
    activated: '10.237.500đ',
    type1:' 9.750.000đ',
    type2:'8.750.000đ',
    type3: '7.750.000đ',
    type4: '1.000.000đ'
  },
  {
    id: 'ip12_128',
    name: 'iPhone 12 128',
    storage: '128',
    imageUrl: '/assets/image/iphone13.jpg',
    oldPrice: 5827500,
    subsidyPrice: 291000,
    displayOldPrice: '5.827.500đ',
    displaySubsidyPrice: '291.000đ',
    activated: '10.237.500đ',
    type1:' 9.750.000đ',
    type2:'8.750.000đ',
    type3: '7.750.000đ',
    type4: '1.000.000đ'
  },
  {
    id: 'ip12_256',
    name: 'iPhone 12 256',
    storage: '256',
    imageUrl: '/assets/image/iphone13.jpg',
    oldPrice: 6667500,
    subsidyPrice: 333000,
    displayOldPrice: '6.667.500đ',
    displaySubsidyPrice: '333.000đ',
    activated: '10.237.500đ',
    type1:' 9.750.000đ',
    type2:'8.750.000đ',
    type3: '7.750.000đ',
    type4: '1.000.000đ'
  },
  {
    id: 'ip16pm1tb',
    name: 'APPLE IPHONE 16 PRO MAX 1TB',
    storage: '1TB',
    imageUrl: '/assets/image/iphone13.jpg',
    oldPrice: 28402500,
    subsidyPrice: 500000,
    displayOldPrice: '28.402.500đ',
    displaySubsidyPrice: '500.000đ',
    activated: '10.237.500đ',
    type1:' 9.750.000đ',
    type2:'8.750.000đ',
    type3: '7.750.000đ',
    type4: '1.000.000đ'
  },
  {
    id: 'ip16pm512gb',
    name: 'APPLE IPHONE 16 PRO MAX 512GB',
    storage: '512GB',
    imageUrl: '/assets/image/iphone13.jpg',
    oldPrice: 27602500,
    subsidyPrice: 500000,
    displayOldPrice: '27.602.500đ',
    displaySubsidyPrice: '500.000đ',
    activated: '10.237.500đ',
    type1:' 9.750.000đ',
    type2:'8.750.000đ',
    type3: '7.750.000đ',
    type4: '1.000.000đ'
  },
];
    
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
  addProduct(){
    var product = {
      name: this.product.name,
      price: this.pricePredict != null ? parseFloat(this.pricePredict.replace('đ', '').replace(/\./g, '')): 0,
      tinhTrangMay: this.selectedCondition,
      imageUrl: 'Đã đăng ký',
      accountID: '1'
    }
    this.productService.addProduct(product).subscribe({
        next: (responseProduct) => {
          // Xử lý khi API trả về thành công
          this.message = `Sản phẩm "${responseProduct.name}" đã được thêm thành công với ID: ${responseProduct.id}`;
          console.log('Product added successfully:', responseProduct);
          // Reset form sau khi thêm thành công
          this.product = null;
        },
        error: (error: any) => {
          // Xử lý lỗi từ API
          //this.message = 'Có lỗi xảy ra khi thêm sản phẩm. Vui lòng thử lại.';
          console.error('Error adding product:', error);
        }
      });
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
  openConditionPopup(product: any): void {
    this.showConditionPopup = true;
    this.product = product;
  }

  closeConditionPopup(): void {
    this.showConditionPopup = false;
  }

  selectCondition(conditionType: string): void {
    this.selectedCondition = conditionType;
    this.pricePredict = this.product[conditionType]
  }
  navigateToMyProduct(): void {
    window.location.href = '/products';
  }
}
