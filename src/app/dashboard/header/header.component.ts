import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user;

  constructor(
    private accountSrv: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.accountSrv.usuarioValue.username;
  }

  logout() {
    this.accountSrv.logout();
    this.router.navigate(['/login']);
  }
}
