import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private fb: FormBuilder,)
   { }

  ngOnInit(): void {
  }
  loginForm: FormGroup = this.fb.group({
    phno:['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    address: ['', [Validators.required]],
    pincode: ['', [Validators.required]]
    
  })

}
