import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  @ViewChild('username') username!: ElementRef
  constructor() { }

  ngOnInit(): void {
  }

  startTest() {
    localStorage.setItem("username", this.username.nativeElement.value)
  }

}
