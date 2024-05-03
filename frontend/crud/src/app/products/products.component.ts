import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'desc', 'category', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  allP: any;

  constructor(
    private service: ProductsService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getProduct();
  }

  getProduct() {
    this.service.showProduct().subscribe((response: any) => {
      if (response.code == '00') {
        debugger;
        this.allP = response.data;
        this.dataSource.data = this.allP;
        this.toastr.success(response.desc);
      } else {
        this.toastr.success(response.desc);
      }
    });
  }
  deleteProduct(product: any): void {
    debugger;
    this.service.deleteProduct(product).subscribe((response: any) => {
      if ((response.code = '00')) {
        this.toastr.success(response.desc);
        this.getProduct();
      } else {
        this.toastr.success(response.desc);
      }
    });
  }

  editProduct(product: any): void {
    this.service.addEditTitle = 'Edit Product';
    this.service.addEditButton = 'Edit';
    const dialogRef = this.dialog.open(AddEditComponent, {
      width: '30vw',
      height: '60vh',
      disableClose: true,
      data: { product },
    });
    dialogRef.componentInstance.refreshProductList.subscribe(() => {
      this.getProduct();
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  addProduct(): void {
    this.service.addEditTitle = 'Add Product';
    this.service.addEditButton = 'Add';
    const dialogRef = this.dialog.open(AddEditComponent, {
      width: '30vw',
      height: '60vh',
      disableClose: true,
    });
    dialogRef.componentInstance.refreshProductList.subscribe(() => {
      this.getProduct();
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}

export interface PeriodicElement {
  name: string;
  description: string;
  category: string;
}
