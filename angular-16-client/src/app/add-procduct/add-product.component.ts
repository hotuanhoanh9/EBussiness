import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Subscription } from 'rxjs';
import { WebsocketService } from "../websocket.service";
import { ChatService } from "../chat.service";
import { SocketioService } from '../socketio.service';
import { HomeService } from '../_services/home.service';
import { FirebaseDataService } from '../_services/firebase-data.service';

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

  constructor() { }

  ngOnInit(): void {
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
}

