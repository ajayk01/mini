import { Component, OnInit,Input ,NgZone} from '@angular/core';
import{ GlobalConstants } from '../global'
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  constructor(
    private router: Router,
    private ngZone: NgZone,
    
    private apiService: ApiService) { } 
    c:any={user_id:0}
    product:any;
    tot=0;
  ngOnInit(): void {
    this.tot=0;
    // console.log(GlobalConstants.collection);
    this.apiService.getallcart(this.c).subscribe(
      (res) => {
        this.product =res;
        
        for(let i=0;i<res.length;i++)
         {
            this.tot = this.tot+res[i].cost;
         }
        console.log(this.product[0].product_id);
      }, (error) => {
        console.log(error);
      });
  }
  rem(i:any)
  {
    this.apiService.removecart(this.product[i]).subscribe(
      (res) => {
        this.ngOnInit();
        
      }, (error) => {
        console.log(error);
      });
  }

}
