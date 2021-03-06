import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Component, OnInit,Input ,NgZone} from '@angular/core';
import{ GlobalConstants } from '../global'
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService)
   { }
   f=false;
   c= {user_id:GlobalConstants.collection._id}
   l:number=0;
   p="";
  name="";
  price = "";
  product_ids:any="";
  m:any="";
  s:any="";
  id:any;
  product:any={};
  order:any={};
  ngOnInit(): void {
    this.name = GlobalConstants.collection.firstname+" "+GlobalConstants.collection.lastname;
    this.price = GlobalConstants.total;
    this.loginForm.get("name")?.setValue(this.name);
    this.loginForm.get("total")?.setValue(this.price);
    this.apiService.getallcart(this.c).subscribe(
      (res) => {
        this.product =res;
        this.l = res.length;
        console.log(res);
        for(let i=0;i<res.length;i++)
          {
            this.product_ids = this.product_ids+","+res[i].product_id;
            this.m = this.m+","+res[i].material_type;
            this.p = this.p+","+res[i].product_type;
            this.s = this.s+","+res[i].stock;
          }
      }, (error) => {
        console.log(error);
      });
  }
  loginForm: FormGroup = this.fb.group({
    name:[],
    total:[],
    phno:['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    address: ['', [Validators.required]],
    pincode: ['', [Validators.required]]
  })
  ord()
  {
    this.apiService.place_order({user_name:GlobalConstants.collection.firstname,user_email:GlobalConstants.collection.email,user_id:GlobalConstants.collection._id,product_id:this.product_ids,cost:this.price,total_q:this.l,product_type:this.p,material_type:this.m,phone_number:this.loginForm.value.phno,address:this.loginForm.value.address,pincode:this.loginForm.value.pincode,stock:this.s}).subscribe(
      (res) => {
        console.log(res);
        this.id= res._id;
                alert("Order placed");
      
              this.f=true;
      }, (error) => {
        console.log(error);
      });
      
  }

}
