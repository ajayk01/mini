import { Component,Input,OnInit} from '@angular/core';
import{ GlobalConstants } from './global'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  user:any;
  
  v=0;
  
  log($event:any)
   {
     this.v=1;
     this.user = $event.firstname;
     GlobalConstants.collection=$event;
   }
  c()
  {
    this.v=0;
  }
  s()
  {
    this.v=3;
  }
  l()
  {
    this.v=0;
  }
}
