import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Subscription } from 'rxjs';
import { WebsocketService } from "../../app/websocket.service";
import { ChatService } from "../../app/chat.service";
import { SocketioService } from '../socketio.service';
import { HomeService } from '../_services/home.service';
import { FirebaseDataService } from './../_services/firebase-data.service';

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
}

