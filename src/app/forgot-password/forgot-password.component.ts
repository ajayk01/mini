import { Component, OnInit,NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder,
      private router: Router,
      private ngZone: NgZone,
      
      private apiService: ApiService) { }

  ngOnInit(): void {
  }
  loginForm: FormGroup = this.fb.group({
    email: ['', [ Validators.email,Validators.required]]
    
  })
 user:any;
 send()
 {
   this.apiService.forgot_pass({email:this.user.email,password:this.user.password}).subscribe(
     (res) => {
       console.log(res);
        alert("The password is send to your Email id if not recevied try again or check your Internet Connectivity");
       }, (error) => {
       console.log(error);
     });
 }
  submit()
  {       
    this.apiService.getUsername(this.loginForm.value).subscribe(
      (res) => {
        if(res==0)
          {
            alert("Enter the valid Email ID");
          }
         else
         { 
        this.user = res;
        
        this.send();

         }
        }, (error) => {
        console.log(error);
      });
      
     
  }
 
}
