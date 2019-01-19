import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  cities = ['Mumbai', 'Pune', 'Thane'];
  skills = ['C#', '.net', 'Angularjs', 'Reactjs'];
  userSelectedSkills = [];
  constructor(private router: Router, private route: ActivatedRoute, private apiservice: ApiService) {
    this.user = new User;
  }

  ngOnInit() {

  }

  onSubmit() {
    console.log("Form Submitted!", this.user);
    this.user.skills = this.userSelectedSkills.toString();
    this.user.pictureUrl = "";
    this.apiservice.addUser(this.user);

    this.apiservice.addUser(this.user)
      .subscribe(res => {
       if(res.error){
         alert("Email already exist");
         return;
       }
        this.router.navigate(['/']);
      }, (err) => {
        console.log(err);
      });

  }

  cancel() {
    this.router.navigate(['/']);
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

}
