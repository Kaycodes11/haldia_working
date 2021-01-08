import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SvLoginService } from '../../auth/auth-services/login/sv-login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
})
export class ModalHeaderComponent implements OnInit {
  public userName: string;
  constructor(
    public authObj: SvLoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.userName = JSON.parse(sessionStorage.getItem('user'))[0].Name;
  }
  signout() {
    this.authObj.logOut(); // should remove sessionStorage username
    this.toastr.info('You are logged out', 'Employee Portal');
    this.router.navigate(['login']);
  }
}
