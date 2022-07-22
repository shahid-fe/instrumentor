import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'instrumentor';

  constructor(private router: Router) {}

  public ngOnInit(): void {
  }

  public onHomeClick(): void {
    this.router.navigate(['/event']);
  }
}
