import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import{ GlobalConstants } from '../global'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private fb: FormBuilder,
    ) {
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
   }
}
