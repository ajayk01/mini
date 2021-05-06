import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private fb: FormBuilder,
    ) {
  }
  ngOnInit() {
    
  }
  loginForm: FormGroup = this.fb.group({
    email: ['', [ Validators.email]],
    firstname: ['', []],
    lastname: ['', []],
    password: ['', [Validators.minLength(6)]],
    
  })

}
