import { Component, OnInit, ViewChild ,NgZone} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService) { }

  ngOnInit(): void {
  }
 
  imgFile: any;
  loginForm= new FormGroup({
    file: new FormControl('', [Validators.required]),
    Description:new FormControl('',[Validators.required]),
    product_type : new FormControl('',[Validators.required]),
    material_type : new FormControl('',[Validators.required]),
    
    id: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required]),
    cost:new FormControl('', [Validators.required]),
    imgSrc:new FormControl('', [Validators.required]),
  });
  get uf(){
    return this.loginForm.controls;
  }
  onImageChange(e:any) {
    const reader = new FileReader();
    
    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.loginForm.patchValue({
          imgSrc: reader.result
        });
   
      };
    }
  }
 add()
   {
     console.log(this.loginForm.value);
     this.apiService.admin_upload(this.loginForm.value).subscribe(
      (res) => {
        console.log(res);
        if(res.code==1)
          {
            alert("Product added successfully");
          }
      }, (error) => {
        console.log(error);
      });
   }
}
