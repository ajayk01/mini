import { Component, OnInit ,NgZone,Output,EventEmitter} from '@angular/core';
import{ GlobalConstants } from '../global'
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
  cart(i:any)
  {
    console.log(this.collect[i])
    
    this.c.user_id = GlobalConstants.collection._id;
    this.c.product_id = this.collect[i]._id;
    this.c.cost = this.collect[i].cost;
    this.c.produt_type = this.collect[i].product_type;
    this.c.material_type = this.collect[i].material_type;
    this.c.pic_url =  this.collect[i].pic_url;
    this.c.stock = this.collect[i].stock;
    this.apiService.post_cart(this.c).subscribe(
      (res) => {
        console.log("cart added");
      }, (error) => {
       
        console.log(error);
      });
  }
}
