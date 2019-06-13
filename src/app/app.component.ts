import { Component,OnInit } from '@angular/core';
declare var jQuery: any;
declare var $:any;
import {FormGroup,FormControl, Validators} from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
const now = new Date();//today date
const tomorrow =  new Date(Date.now() + 24*1000*60*60);//tomarrow date

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appinessworld';
  userform;
  user_data:any=[];
  user_data_exit;
  today:number=Date.now();//today
  model: NgbDateStruct= {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};//today
  date: {year: number, month: number};
  minDate:NgbDateStruct = {year: tomorrow.getFullYear(), month: tomorrow.getMonth() + 1, day: tomorrow.getDate()};//tomarrow
  todayMinDate=new Date(tomorrow.getFullYear(), tomorrow.getMonth() + 1, tomorrow.getDate());//
  constructor() { }

  ngOnInit() {
    /**********************Add user****************************/
    this.userform=new FormGroup({
      option_custom:new FormControl("",Validators.compose([
        Validators.required,
      ])),
      namecustom:new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(2),
      ])),
      emailcustom: new FormControl("",Validators.compose([
        Validators.required,
      ])),
      Phone_custom: new FormControl("",Validators.compose([
        Validators.required,
      ])),
      address: new FormControl("",Validators.compose([
        Validators.required,
      ])),
      date: new FormControl("",Validators.compose([
        Validators.required,
      ])),
      url: new FormControl("",Validators.compose([
        Validators.required,
      ])),
    });

    
    if(this.getInsetedData()){
      this.user_data=this.user_data.concat(JSON.parse(localStorage.getItem("userdata").toString()));
      this.user_data_exit=true;
    }else{
      this.user_data_exit=false;
    }

    var resetthis=this;
      $("#exampleModal").on("hidden.bs.modal", function () {
        resetthis.userform.reset(); // model filed reset
      });

  }

  addUser(){
    $("#exampleModal").modal();
  }

  userData(user){
      this.userform.controls['option_custom'].markAsTouched()
      this.userform.controls['namecustom'].markAsTouched()
      this.userform.controls['emailcustom'].markAsTouched()
      this.userform.controls['Phone_custom'].markAsTouched()
      this.userform.controls['address'].markAsTouched()
      this.userform.controls['url'].markAsTouched()
      this.userform.controls['date'].markAsTouched()
      if (this.userform.valid && user.date!="") {
              this.user_data.push({"id":this.user_data.length+1,"name":user.namecustom,"email":user.emailcustom,"ph_no":user.Phone_custom,"address":user.address,"url":user.url, "qul":user.option_custom,"dob":this.userform.value.date.year+'-'+this.userform.value.date.month+'-'+this.userform.value.date.day});
              localStorage.setItem('userdata',JSON.stringify(this.user_data));
              $('#exampleModal').modal('hide');
              this.userform.reset(); // model filed reset
      }
  }

  getInsetedData(){
    if(localStorage.getItem("userdata")!=null){
      return true;
    }
    return false;
  }
}



