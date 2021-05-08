import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
 
  loginForm: FormGroup = this.fb.group({
    image: ['', [Validators.required]],
    material: ['', [Validators.required]],
    id: ['', [Validators.required]],
    stock: ['', [Validators.required]],
    cost: ['', [Validators.required]]
  })
 add()
   {
     console.log(this.loginForm.value);
   }
}
