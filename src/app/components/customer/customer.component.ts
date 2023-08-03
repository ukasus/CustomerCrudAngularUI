import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customers:any;
  columns:string[]=[];
  customer:any;
  customerForm:FormGroup;
  submitted:boolean=false;
  loadForm:boolean=false;
  public keepOriginalOrder = (a:any, b:any) => a.key;
  constructor(private globalService:GlobalService,private formBuilder:FormBuilder){
    this.customerForm=this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      street: [''],
      address: [''],
      city: [''],
      state: [''],
      email: [''],
      phone: ['']
  });
  }
  ngOnInit(): void {
   this.globalService.getCustomers().subscribe((response:any)=>{
    this.customers=response;
    this.columns=response?Object.keys(response[0]):[];
    this.columns.push('Actions');
   },(error)=>{
      this.customers=[];
   });

  }

  deleteCustomer(id:string){
    this.globalService.deleteCustomer(id).subscribe((response)=>{
      this.globalService.reloadCurrentRoute();
    },(error)=>{
      console.log(error);
      if(error.status===200)
      this.globalService.reloadCurrentRoute();
      
    })
  }

  editCustomer(customer:any){
    this.customer=customer;
    this.customerForm.patchValue(this.customer);
    this.loadForm=true;
  }

  addCustomer(){
    this.customer=undefined;
    this.loadForm=true;
  }

  onSubmit(){
    this.submitted=true;
    if (this.customerForm.invalid) {
      return;
  }
    let obj=this.customerForm.value;
    if(!this.customer){
      //addCustomer
      console.log("add customer",obj);
      this.globalService.addCustomer(obj).subscribe((response)=>{
          console.log(response);
      },(error)=>{
        console.log(error);
      });
    }else{
      //updateCustomer
      console.log("update customer",obj);
      this.globalService.updateCustomer(this.customer['uuid'],obj).subscribe((response)=>{
        console.log(response);
      },(error)=>{
        console.log(error);
      });
    }
    this.globalService.reloadCurrentRoute();
  }
  get f() { return this.customerForm.controls; }
  back(){
    this.loadForm=false;
  }
}

