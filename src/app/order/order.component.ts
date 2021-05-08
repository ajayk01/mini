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
   c= {user_id:GlobalConstants.collection._id}
   l:number=0;
  name="";
  price = "";
  product_ids:any="";
  m:any="";
  product:any={};
  order:any={};
  ngOnInit(): void {
    this.name = GlobalConstants.collection.firstname+" "+GlobalConstants.collection.lastname;
    this.price = GlobalConstants.total;
    this.apiService.getallcart(this.c).subscribe(
      (res) => {
        this.product =res;
        this.l = res.length;
        for(let i=0;i<res.length;i++)
          {
            this.product_ids = this.product_ids+","+res[i].product_id;
            this.m = this.m+","+res[i].material;
          }
      }, (error) => {
        console.log(error);
      });
  }
  loginForm: FormGroup = this.fb.group({
    phno:['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    address: ['', [Validators.required]],
    pincode: ['', [Validators.required]]
  })
  ord()
  {
    this.apiService.place_order({user_name:GlobalConstants.collection.firstname,user_email:GlobalConstants.collection.email,user_id:GlobalConstants.collection._id,product_id:this.product_ids,material:this.m,cost:this.price,total_q:this.l,phone_number:this.loginForm.value.phno,address:this.loginForm.value.address,pincode:this.loginForm.value.pincode}).subscribe(
      (res) => {
           alert("Order placed");
           this.router.navigateByUrl('\home');
      }, (error) => {
        console.log(error);
      });
  }

}
