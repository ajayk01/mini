import { Component, OnInit ,NgZone,Output,EventEmitter} from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
  collect:any={};
  l=0;
  c:any={};
  url:any;
  len = 0;
  constructor(private router: Router,
    private ngZone: NgZone,
    
    private apiService: ApiService) {}

  ngOnInit(): void {
    
     this.exe();
  }
  exe()
  {
    this.apiService.getallproducts({}).subscribe(
      (res)=>{
       this.collect=res;
  },(error) => {
    console.log(error);
  });
  }
  cart()
  {
    this.c.material = this.collect[0].material;
    this.c.user_id = 0;
    this.c.product_id = this.collect[0].id;
    this.c.cost = this.collect[0].cost;
    this.c.pic_url =  this.collect[0].pic_url;
    this.apiService.post_cart(this.c).subscribe(
      (res) => {
        console.log("cart added");
      }, (error) => {
       
        console.log(error);
      });
  }
}
