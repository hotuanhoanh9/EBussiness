import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const API_URL = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: any[] = [
    { id: 1, name: "Điện thoại di động", price: 7990000, description: "Điện thoại thông minh đời mới nhất với camera 108MP." },
    { id: 2, name: "Máy tính xách tay Gaming", price: 22500000, description: "Laptop hiệu năng cao, card đồ họa RTX 4070, màn hình 144Hz." },
    { id: 3, name: "Tai nghe không dây Bluetooth", price: 1200000, description: "Âm thanh sống động, khử tiếng ồn chủ động, thời lượng pin 30 giờ." },
    { id: 4, name: "Bàn phím cơ RGB", price: 1500000, description: "Bàn phím cơ cao cấp với đèn nền RGB tùy chỉnh, switch Cherry MX." },
    { id: 5, name: "Chuột Gaming không dây", price: 850000, description: "Chuột nhẹ, cảm biến quang học chính xác, pin sạc nhanh." },
    { id: 6, name: "Màn hình cong 27 inch", price: 6800000, description: "Màn hình cong độ phân giải 2K, tần số quét 165Hz." }
  ];
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    //return this.http.get(API_URL + 'products', { responseType: 'text' });
    return of(this.products)
  }

  
}
