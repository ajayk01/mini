import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
  }
  loginForm: FormGroup = this.fb.group({
    email: ['', [ Validators.email,Validators.required]]
    
    
  })

}
