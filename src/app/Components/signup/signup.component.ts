import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalStoreService } from 'src/app/Services/global-store.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private service: GlobalStoreService, private router: Router) {}
  username = new FormControl('');
  password = new FormControl('');
  role = new FormControl('');
  ngOnInit(): void {}
  switchNav() {
    this.router.navigateByUrl('/login');
  }
  onSubmit() {
    this.service
      .signup(this.username.value, this.password.value, this.role.value)
      .subscribe((res: any) => {
        this.service.setUser(res.username, res.role, res.token, res.id);
        this.router.navigateByUrl('/books');
      });
    return false;
  }
}
