import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sideNavtoogle = new EventEmitter();
  @Output() logout = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  sideNavToggle() {
    this.sideNavtoogle.emit("sample");
  }

  signOut() {
    this.logout.emit("sample");
  }
}
