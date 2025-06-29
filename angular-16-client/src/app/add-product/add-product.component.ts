import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Subscription } from 'rxjs';
import { WebsocketService } from "../websocket.service";
import { ChatService } from "../chat.service";
import { SocketioService } from '../socketio.service';
import { HomeService } from '../_services/home.service';
import { FirebaseDataService } from '../_services/firebase-data.service';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [WebsocketService, ChatService, SocketioService]

})
export class AddProductComponent implements OnInit {
  content?: string;
  public myAngularxQrCode: string = '';
  socketID: any;
  isShowQR: boolean = false;
  phone: any;
  product: any;
  magicWord: any;
  file: any;
  err: boolean = false;
  resultImage: any;
  FlgTextToImages = 0;
  selectedButton: string = '';
  hinhSrc: string | null = null;
  resultDataImage : any;
  products: any;
  keys:any;
  productItem: any;
  isAdd: boolean = false;
  categories: any;
  

  // Dữ liệu form sẽ được bind vào đây
  productForm: any = {
    productName: '',
    category: '',
    condition: '',
    location: '',
    contactName: '',
    contactPhone: ''
  };

  selectedFiles: File[] = []; // Mảng chứa các file hình ảnh đã chọn
  imagePreviews: string[] = []; // Mảng chứa URL cho các hình ảnh preview

  productStages: string[] = [
    'Đã đăng ký',
    'Shipper nhận hàng',
    'Sản phẩm về kho',
    'Đang thẩm định',
    'Giá sau thẩm định',
    'Hoàn thành'
  ];
  currentStage: string | null = null;
  updateMessage: string = '';
  productId: string | null = null;
  isEdit = false;
  errorMessage: any;
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if(this.productId != null){
        this.getProduct(this.productId);
        this.isEdit = true;
      }
      
    });
     this.currentStage = this.productStages[0]
  }

  // Xử lý khi người dùng chọn file hình ảnh
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const maxFiles = 5; // Giới hạn tối đa 5 hình ảnh
      const newFiles = Array.from(input.files);

      // Thêm các file mới vào mảng và đảm bảo không vượt quá giới hạn
      this.selectedFiles = [...this.selectedFiles, ...newFiles].slice(0, maxFiles);

      // Tạo URL preview cho các hình ảnh
      this.imagePreviews = []; // Xóa các preview cũ trước khi tạo mới
      this.selectedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result); // Thêm Data URL vào mảng preview
        };
        reader.readAsDataURL(file); // Bắt đầu đọc file như một Data URL
      });
    }
  }

  // Xóa một hình ảnh khỏi danh sách đã chọn và preview
  removeImage(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  // Xử lý khi form được submit
  onSubmit(): void {
    console.log('Dữ liệu form đã gửi:', this.productForm);
    console.log('Các file hình ảnh đã chọn:', this.selectedFiles);

    // Ở đây, bạn sẽ gửi dữ liệu `this.productForm` và `this.selectedFiles`
    // lên server thông qua một Service (ví dụ: HttpClient).
    // Ví dụ:
    // const formData = new FormData();
    // formData.append('productData', JSON.stringify(this.productForm));
    // this.selectedFiles.forEach((file, index) => {
    //   formData.append(`image_${index}`, file, file.name);
    // });
    // this.yourApiService.submitProduct(formData).subscribe(
    //   response => console.log('Đăng ký thành công', response),
    //   error => console.error('Lỗi khi đăng ký', error)
    // );

    alert('Form đã được gửi! (Kiểm tra console để xem dữ liệu)');
    // Bạn có thể reset form sau khi gửi thành công
    // this.productForm = {};
    // this.selectedFiles = [];
    // this.imagePreviews = [];
  }
  updateProductStatus(): void {
    const currentIndex = this.productStages.indexOf(this.currentStage || '');
    if (currentIndex < this.productStages.length - 1) {
      this.currentStage = this.productStages[currentIndex + 1];
      this.updateProduct();
      this.updateMessage = `Trạng thái sản phẩm được cập nhật: ${this.currentStage}!`;
    } else {
      this.updateMessage = 'Giao dịch sản phẩm đã hoàn thành!';
    }

    // Clear the message after a few seconds
    setTimeout(() => {
      this.updateMessage = '';
    }, 3000); // Clear after 3 seconds
  }

  /**
   * Checks if a given stage is completed (i.e., comes before or is the current stage).
   * @param stage The stage name to check.
   * @returns True if the stage is completed, false otherwise.
   */
  isStageCompleted(stage: string): boolean {
    if (!this.currentStage) return false;
    const currentIndex = this.productStages.indexOf(this.currentStage);
    const stageIndex = this.productStages.indexOf(stage);
    return stageIndex <= currentIndex;
  }

  /**
   * Checks if a given stage is the current active stage.
   * @param stage The stage name to check.
   * @returns True if the stage is the current active stage, false otherwise.
   */
  isStageActive(stage: string): boolean {
    return this.currentStage === stage;
  }
  getProduct(id: string): void {
    // Call the getProducts method from your service
    this.productService.getProductById(id).subscribe({
      next: (data: any[]) => {
        // On successful response, assign the data to the products array
        this.product = data;
        this.errorMessage = ''; // Clear any previous errors
        this.currentStage = this.product.imagePath;
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
  updateProduct(){
    var product = this.product;
    product.imagePath = this.currentStage;
    this.productService.addProduct(product).subscribe({
        next: (responseProduct) => {
          // Reset form sau khi thêm thành công
          //this.product = null;
        },
        error: (error: any) => {
          // Xử lý lỗi từ API
          //this.message = 'Có lỗi xảy ra khi thêm sản phẩm. Vui lòng thử lại.';
          console.error('Error adding product:', error);
        }
      });
  }
  navigateToPayment(){
    window.location.href = '/payment'
  }
}

