import { Component, OnInit ,NgZone} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  hide: boolean = false;
  v=0;
  p=2;
  constructor(private fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService) {
  }
  ngOnInit() {
    
  }
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmpassword: ['', [Validators.required, Validators.minLength(6)]]
  })
  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    if(this.loginForm.value.password == this.loginForm.value.confirmpassword)
     {
       this.p = 1;
       this.apiService.createUser(this.loginForm.value).subscribe(
        (res) => {
          
          this.v=1;
          alert("Account created proceed to login");
          this.router.navigateByUrl('/');

        }, (error) => {
          this.v=2;
          console.log(error);
        });
     }
     else
     {
       this.p=0;
       this.v=2;
       console.log("noo");
       this.loginForm.invalid;
     }
    
    
  }
}