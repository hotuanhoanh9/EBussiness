import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {

  constructor(private db: AngularFireDatabase,
    
  ) {
  }

  // Fetch a list of products from the 'products' node
  getProducts(): Observable<any[]> {
    return this.db.list('products', ref => 
        ref.orderByKey().limitToLast(10) // Order by key and limit to the last 10 items
      ).valueChanges();
  }
  getItemById(id: string): Observable<any> {
    return this.db.object(`products/${id}`).valueChanges();
  }
  // Add a new item to the 'products' node
  addItem(item: any): void {
    this.db.list('products').push(item);
  }

  // Update an item in the 'products' node
  updateItemById(id: string, data: any): Promise<void> {
    return this.db.object(`products/${id}`).update(data);
  }

  // Remove an item from the 'products' node
  removeItem(key: string): void {
    this.db.object(`products/${key}`).remove();
  }
}