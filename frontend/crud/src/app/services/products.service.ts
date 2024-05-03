import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { baseURL } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  addEditTitle: string = "Add Product";
  addEditButton: string = "Add";

  constructor(private http: HttpClient) {}

  //Add new Product
  addProduct(data: any): Observable<any> {
    debugger
    return this.http.post(`${baseURL}product`, data);
  }
  //Display All products
  showProduct(): Observable<any> {
    return this.http.get(`${baseURL}showproducts`);
  }
  //Edit Product
  editProduct(data:any):Observable<any>{
    debugger
    return this.http.put(`${baseURL}edit`,data);
  }

  deleteProduct(data:any):Observable<any>{
    debugger
    return this.http.post(`${baseURL}delete`,data);
  }
  oneProduct(data:any): Observable<any> {
    return this.http.post(`${baseURL}oneproduct`,data);
  }
}
