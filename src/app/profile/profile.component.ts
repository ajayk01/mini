import { Component, OnInit,NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import{ GlobalConstants } from '../global'
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    
    private apiService: ApiService ) {
  }
  form:any;
  ngOnInit() {
    this.form = GlobalConstants.collection;
    this.loginForm.get("email")?.setValue(this.form.email);
    this.loginForm.get("firstname")?.setValue(this.form.firstname);
    this.loginForm.get("lastname")?.setValue(this.form.lastname);
  }
  loginForm: FormGroup = this.fb.group({
    email: ['', [ Validators.email],[]],
    firstname: ['', []],
    lastname: ['', []],
    password: ['', [Validators.minLength(6)]],
    
  })
   update()
   {
     console.log(this.loginForm.value);
     if(this.loginForm.value.password=="")
      {
        console.log("Please enter the fields to update");
      }
      else
      {
        this.apiService.updateuser({id:GlobalConstants.collection._id,email:this.loginForm.value.email,firstname:this.loginForm.value.firstname,lastname:this.loginForm.value.lastname}).subscribe(
          (res) => {
             alert("Update Successfully to see changes pls logout and login ");
          }, (error) => {
            console.log(error);
          });
      }
   }
}
