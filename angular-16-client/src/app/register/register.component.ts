import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { ProductService } from '../_services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
interface UserRegistration {
  username: string;
  password: string;
  accountName: string;
  bankName: string;
  bankNumber: string;
  budget: number;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup; // ! để bỏ qua lỗi khởi tạo ban đầu, sẽ được khởi tạo trong ngOnInit
  registrationMessage: string = '';
  isSuccess: boolean = false;

  // Tiêm FormBuilder vào constructor để dễ dàng tạo FormGroup
  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    // Khởi tạo FormGroup với các FormControl và Validators
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]], // Ví dụ: mật khẩu tối thiểu 6 ký tự
      accountName: ['', Validators.required],
      bankName: ['', Validators.required],
      bankNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]], // Chỉ cho phép số
      //budget: [0, [Validators.required, Validators.min(0)]] // Ngân sách tối thiểu là 0
    });
  }

  // Phương thức xử lý khi form được submit
  onSubmit(): void {
    if (this.registerForm.valid) {
      // Form hợp lệ, lấy dữ liệu
      const userData: UserRegistration = this.registerForm.value;
      this.authService.register(userData)
        .subscribe({
          next: (response) => {
            // Handle successful registration/login (token is already saved by the service)
            this.registrationMessage = 'Đăng ký thành công và đăng nhập!';

            // Optional: Redirect user after successful registration
            this.router.navigate(['/login']); //
          },
          error: (error) => {
            // Handle registration/login errors from the API
            console.error('Đăng ký thất bại:', error);
            this.registrationMessage = 'Đăng ký thất bại. Vui lòng thử lại.';
            if (error.error && error.error.message) {
              this.registrationMessage += ` Lỗi: ${error.error.message}`;
            }
            this.isSuccess = false;
          }
        });

      // Hiển thị thông báo thành công
      this.registrationMessage = 'Đăng ký thành công!.';
      this.isSuccess = true;
      this.registerForm.reset(); // Đặt lại form và giữ giá trị budget mặc định là 0
    } else {
      // Form không hợp lệ, hiển thị thông báo lỗi
      this.registrationMessage = 'Vui lòng kiểm tra lại thông tin. Form chưa hợp lệ.';
      this.isSuccess = false;
      // Tùy chọn: Đánh dấu tất cả các trường là 'touched' để hiển thị lỗi
      this.registerForm.markAllAsTouched();
    }
  }
}
