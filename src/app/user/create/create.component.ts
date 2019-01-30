import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { User } from '../../model/user.model'
import { ApiService } from '../../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  user: User;
  //cities = ['Mumbai', 'Pune', 'Thane'];
  cityData: any;
  cities = [];
  skillData: any;
  skills = [];
  //skills = ['C#', '.net', 'Angularjs', 'Reactjs'];
  userSelectedSkills = [];
  fileUpload: File = null;
  formData = new FormData();

  constructor(private router: Router, private route: ActivatedRoute, private apiservice: ApiService, private formBuilder: FormBuilder) {
    this.user = new User;
  }

  ngOnInit() {
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


  show(fName: HTMLInputElement) {
    console.log(fName.value);
  }

  onSubmit() {

    console.log("Form Submitted!", this.user);
    this.user.skills = this.userSelectedSkills.toString();
    this.user.profileurl = "";
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (this.user.name == "" || this.user.name == undefined) {
      alert('Please enter name');
      return false;
    }
    else if (reg.test(this.user.email) == false) {
      alert('Invalid Email Address');
      return false;
    }

    this.formData.append('user', JSON.stringify(this.user));
    if (this.fileUpload) {
      this.formData.append('file', this.fileUpload)
    }

    this.apiservice.addUser(this.formData)
      .subscribe(res => {
        if (res.error) {
          alert("Email already exist");
          return;
        }
        this.router.navigate(['/']);
      }, (err) => {
        console.log(err);
      });

  }

  cancel() {
    this.router.navigate(['/users']);
  }
  checkboxClick(ev) {
    console.log(ev.target.value);
    if (ev.target.checked) {
      this.userSelectedSkills.push(ev.target.value);
    }
    else {
      this.userSelectedSkills = this.userSelectedSkills && this.userSelectedSkills.filter(function (value, index, arr) {
        return value != ev.target.value;
      });
    }
    console.log(this.userSelectedSkills);
  }

  handleFileInput(files: any) {
    this.fileUpload = files.files[0];
    console.log(files.files[0]);
  }

  onClickAddCity(newCity) {
    let value = newCity.value.trim();
    if (this.cities.indexOf(value) === -1) {
      this.apiservice.addCity({ cityName: value }).subscribe((res) => {
        this.cities.push(value);
        newCity.value = "";
      })
    }

  }

  onClickAddSkill(newSkill) {
    let value = newSkill.value.trim();
    if (this.skills.indexOf(value) === -1) {
      this.apiservice.addSkill({ skillName: value }).subscribe((res) => {
        this.skills.push(value);
        newSkill.value = "";
      })
    }

  }

}
