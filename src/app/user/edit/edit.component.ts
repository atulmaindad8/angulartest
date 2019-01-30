import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {User} from "../../model/user.model";
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  user: any;
  // cities = ['Mumbai', 'Pune', 'Thane'];
  // skills = ['C#', '.net', 'Angularjs', 'Reactjs'];
  cityData: any;
  cities = [];
  skillData: any;
  skills = [];
  userSelectedSkills = [];
  formData = new FormData();
  fileUpload: File = null;
  constructor(private router: Router, private route: ActivatedRoute,private apiservice: ApiService) { }

  ngOnInit() {
  this.apiservice.getUser(this.route.snapshot.params['email'])
  .subscribe(data => {
    console.log(data);
    this.user = data[0];
    console.log(this.user.skills.split(","));
    if(this.user.skills !==""){
      this.userSelectedSkills = this.user.skills.split(",");
    }
   
  });

  this.apiservice
  .getCities()
  .subscribe((data) => {
    console.log(data)
    this.cityData = data;
    this.cities = this.cityData && this.cityData.map((ele) => {
      return ele.name;
    });
    console.log(this.cities)
  });

this.apiservice
  .getSkills()
  .subscribe((data) => {
    console.log(data)
    this.skillData = data;
    this.skills = this.skillData && this.skillData.map((ele) => {
      return ele.name;
    });
    console.log(this.skills)
  });




  }

  checkboxClick(ev) {
    console.log(ev.target.value);
    if (ev.target.checked) {
      this.userSelectedSkills.push(ev.target.value)
    }
    else {
      this.userSelectedSkills = this.userSelectedSkills && this.userSelectedSkills.filter(function (value, index, arr) {
        return value != ev.target.value;
      });
    }
    console.log(this.userSelectedSkills);
  }

  onSubmit() {
    console.log("Form Submitted!", this.user);
    this.user.skills = this.userSelectedSkills.toString();
    this.user.pictureUrl = "";
   

    if (this.user.name == "" || this.user.name == undefined) 
    {
        alert('Please enter name');
        return false;
    }
 
    this.formData.append('user', JSON.stringify(this.user));
    if(this.fileUpload){
      this.formData.append('file', this.fileUpload)
    }

    this.apiservice.updateUser(this.user._id,this.formData)
      .subscribe(res => {
       if(res.error){
         alert(res.error);
         return;
       }
        this.router.navigate(['/']);
      }, (err) => {
        console.log(err);
      });

  }

  handleFileInput(files: any) {
    this.fileUpload = files.files[0];
    console.log(files.files[0]);
}

}
