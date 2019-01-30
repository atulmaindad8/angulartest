import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {User} from "../../model/user.model";
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
user:any
  constructor(private router: Router, private route: ActivatedRoute,private apiservice: ApiService) { }

  ngOnInit() {
    this.apiservice.getUser(this.route.snapshot.params['email'])
    .subscribe(data => {
      console.log(data);
      this.user = data[0];
    });
  }

}
