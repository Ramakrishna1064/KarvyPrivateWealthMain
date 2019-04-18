import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  @ViewChild('snav') input: ElementRef;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  sideNavToggle(sideNav: any) {
    sideNav.toggle();
  }

  signOut(event: any) {
    console.log("your now here");
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
