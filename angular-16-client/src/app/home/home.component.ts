import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Subscription } from 'rxjs';
import { WebsocketService } from "../websocket.service";
import { ChatService } from "../chat.service";
import { SocketioService } from '../socketio.service';
import { HomeService } from '../_services/home.service';
import { FirebaseDataService } from '../_services/firebase-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [WebsocketService, ChatService, SocketioService]

})
export class HomeComponent implements OnInit {
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
  constructor(

    private userService: UserService,
    private chatService: ChatService,
    private socketService: SocketioService,
    public homeService: HomeService,
    public firebaseDataService: FirebaseDataService,
  ) {
    // chatService.messages.subscribe(msg => {
    //   console.log("Response from websocket: " + msg);
    // });
    
    this.myAngularxQrCode = 'Your QR code data string';
  }

  async ngOnInit(): Promise<void> {
    // this.products = this.firebaseDataService.getProducts();
    this.initCategory();
    this.initializeProducts();
    
    this.firebaseDataService.getProducts().subscribe({
      next: data => {
        this.products = data;
        console.log("this.products", this.products);
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

    


  }
  ngOnDestroy() {
    this.socketService.disconnect();
  }

  private message = {
    author: "",
    message: "this is a test message"
  };
  createQRCode() {
    let data = {
      "phone": this.phone,
      "productID": this.product._id,
      "amout": this.product.price,
      "position": this.product.position,
      "receiverId": localStorage.getItem('socketID')
    }
    // console.log("data", data);

    this.myAngularxQrCode = JSON.stringify(data);
    this.isShowQR = true;
  }
  sendMsg() {
    // console.log("new message from client to websocket: ", this.message);
    // this.chatService.messages.next(this.message);
    // this.message.message = "";


    this.socketService.sendMsg('my message', this.myAngularxQrCode);
  }

  

  clickSlectTextToImage() {
    this.hinhSrc = null
    this.selectedButton = 'textToImage';
    this.FlgTextToImages = 0;
    this.resultImage = null;
  }

  clickSlectImageToText() {
    this.selectedButton = 'imageToText';
    this.resultImage = null;
    this.FlgTextToImages = 1;
  }
  getItem(id: string){
    this.isAdd = false;
    this.firebaseDataService.getItemById(id).subscribe({
      next: data => {
        this.productItem = data;
        
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
  }
  generateGUIDWithCustomFunction(): string {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    const guid = s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
    console.log('Generated GUID with custom function:', guid);
    return guid;
  }
  onAdd(){
    let body = {
      productId: this.generateGUIDWithCustomFunction(),
      name: this.productItem.name,
      price: this.productItem.price
    }
    this.firebaseDataService.addItem(body)
  }
  onUpdate(id: string){
    let body = {
      name: this.productItem.name,
      price: this.productItem.price
    }
    this.firebaseDataService.updateItemById(id, body)
      .then(() => {
        console.log('Item updated successfully');
      })
      .catch(error => {
        console.error('Error updating item:', error);
      });
  }
  onDelete(id: string){
    this.firebaseDataService.removeItem(id)
  }
  
  openAddForm(){
    this.isAdd = true;
    this.productItem = {
      name: "",
      price: 0
    }
  }
  initializeProducts() {
    this.products = [
        {
            id: 'PROD001',
            name: 'Wireless Bluetooth 5.0 Earbuds',
            description: 'High-fidelity sound with active noise cancellation.',
            price: 1250000, // VND
            imageUrl: '/assets/image/earbud.jpg',
            category: 'Electronics',
            stock: 150,
            rating: 4.5,
            reviewsCount: 1234,
            location: 'Hồ Chí Minh'
        },
        {
            id: 'PROD002',
            name: 'Smartwatch X1',
            description: 'Fitness tracker with heart rate monitor, GPS, and notifications.',
            price: 2800000, // VND
            imageUrl: '/assets/image/smartwatch.jpg',
            category: 'Wearables',
            stock: 75,
            rating: 4.8,
            reviewsCount: 987,
            location: 'Hà Nội'
        },
        {
            id: 'PROD003',
            name: 'Mini Portable USB Rechargeable Blender',
            description: 'Perfect for shakes and smoothies on the go. 300ml capacity.',
            price: 450000, // VND
            imageUrl: '/assets/image/usb.png',
            category: 'Home Appliances',
            stock: 200,
            rating: 3.9,
            reviewsCount: 543,
            location: 'Đà Nẵng'
        },
        {
            id: 'PROD004',
            name: 'RGB Gaming Mouse',
            description: 'High-precision gaming mouse with customizable RGB lighting and macros.',
            price: 890000, // VND
            imageUrl: '/assets/image/smartwatch.jpg',
            category: 'Gaming',
            stock: 120,
            rating: 5.0,
            reviewsCount: 2500,
            location: 'Cần Thơ'
        },
        {
            id: 'PROD005',
            name: '8-in-1 USB-C Hub',
            description: 'Multi-port adapter with HDMI, USB 3.0, SD/TF card readers, and PD charging.',
            price: 720000, // VND
            imageUrl: '/assets/image/smartwatch.jpg',
            category: 'Accessories',
            stock: 90,
            rating: 4.2,
            reviewsCount: 789,
            location: 'Hồ Chí Minh'
        }
    ];
  }
  formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
  }

  getStarArray(count: number): number[] {
    return Array(count).fill(0).map((_, i) => i + 1);
  }

  // Helper to round rating for display (e.g., 4.3 becomes 4, 4.7 becomes 5)
  getRoundedRating(rating: number | undefined): number {
    return Math.round(rating || 0);
  }
  initCategory(){
    this.categories = [
      { id: 'CAT001', name: 'Điện tử', iconUrl: '/assets/image/gray-circle.jpg' },
      { id: 'CAT002', name: 'Thời trang', iconUrl: '/assets/image/gray-circle.jpg' },
      { id: 'CAT003', name: 'Thức ăn', iconUrl: '/assets/image/gray-circle.jpg' },
      { id: 'CAT004', name: 'Tái chế', iconUrl: '/assets/image/recycle.png', link: '/products' },
      { id: 'CAT005', name: 'Sách', iconUrl: '/assets/image/gray-circle.jpg' },
      { id: 'CAT006', name: 'Sức khỏe', iconUrl: '/assets/image/gray-circle.jpg' },
      { id: 'CAT007', name: 'Trẻ em', iconUrl: '/assets/image/gray-circle.jpg' },
    ];
  }
}

