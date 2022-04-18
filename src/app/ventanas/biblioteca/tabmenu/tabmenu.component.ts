import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabmenu',
  templateUrl: './tabmenu.component.html',
  styleUrls: ['./tabmenu.component.scss']
})
export class TabmenuComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {    
    document.getElementById("sidebarbiblioteca").className += " active"
  }

  ngOnDestroy(): void {
    document.getElementById("sidebarbiblioteca").classList.remove("active")
  }

  goTo(url: string) {
    this.router.navigate(['/biblioteca/' + url]);
  }
}
