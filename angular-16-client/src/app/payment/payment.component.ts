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
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [WebsocketService, ChatService, SocketioService]

})
export class PaymentComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
  }

  
}

