import { Component, OnInit ,NgZone,Output,EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: boolean = false;
  constructor(private fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    
    private apiService: ApiService) {
  }
  @Output() event = new EventEmitter<JSON>()
  ngOnInit() {
  }
 valid=1;
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })
  onLogin() {
    
    if (!this.loginForm.valid) {
      return;
    }
   
    this.apiService.getUsername(this.loginForm.value).subscribe(
      (res) => {
        console.log('login');
        console.log(res);
        if(this.loginForm.value.password == res.password)
         {
            this.valid=1;
            
            this.router.navigateByUrl('/home');
            this.event.emit(res);
         }
         else
         {
           this.valid=0;
           this.loginForm.invalid;
         }
      }, (error) => {
        console.log(error);
      });
  }
}