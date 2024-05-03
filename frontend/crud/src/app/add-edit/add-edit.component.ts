import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from '../services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent {
  form: FormGroup;
  categories = [
    { name: 'Electronics'},
    { name: 'Clothing'},
    { name: 'Books'},
    { name: 'Other'}
  ];

  @Output() refreshProductList: EventEmitter<any> = new EventEmitter();
  constructor(
    private dialogRef: MatDialogRef<AddEditComponent>,
    private fb: FormBuilder,
    public service: ProductsService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      category: ['', Validators.required]
    });

debugger
    if (this.data) {
      this.form.patchValue(this.data.product);
    }
  }

  onSubmit(): void {
    if(this.service.addEditButton=="Add"){
    if (this.form.valid) {
      this.service.addProduct(this.form.value).subscribe((response:any)=>{
        if(response.code=="00"){
          debugger
          this.toastr.success(response.desc);
          this.dialogRef.close(this.form.value);
          this.refreshProductList.emit();
        }else{
          this.toastr.success(response.desc);
        }
      })
    }
  }else{
    if (this.form.valid) {
      const model = {
        id: this.data.product.id,
        form: this.form.value
      }
      this.service.editProduct(model).subscribe((response:any)=>{
        if(response.code=="00"){
          debugger
          this.toastr.success(response.desc);
          this.dialogRef.close(this.form.value);
          this.refreshProductList.emit();
        }else{
          this.toastr.success(response.desc);
        }
      })
    }
  }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
