import { Component, OnInit ,NgZone,Output,EventEmitter} from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
  material:any={};
  cost:any;
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
        console.log('collections backend');
       this.material=res;
         
        console.log("printing... ");
        console.log(this.material);
  },(error) => {
    console.log(error);
  });
  }
}
