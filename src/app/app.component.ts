import { Component,OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  v=0;
  user:any;
  log($event:any)
   {
     this.v=1;
     this.user = $event.firstname;
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
