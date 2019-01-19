import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user.model";
import { ApiService } from '../../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  users: User[];
  constructor(private router: Router, private route: ActivatedRoute,private apiservice: ApiService) { }

  ngOnInit() {
    this.apiservice
    .getUsers()
    .subscribe((data: User[]) => {
      console.log(data)
    this.users = data;
    
  });
  }
  addUser(){
    this.router.navigate(['/create']);
  }
  deleteUser(id){
    this.apiservice.deleteUser(id)
    .subscribe(res => {
      this.apiservice
      .getUsers()
      .subscribe((data: User[]) => {
        console.log(data)
      this.users = data;
      
    });
      }, (err) => {
        console.log(err);
      }
    );
  }

}
