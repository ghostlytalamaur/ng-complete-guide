import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  shouldShowDetails = false;
  logs: string[] = [];

  onShowDetails() {
    this.shouldShowDetails = !this.shouldShowDetails;
    const msg = this.shouldShowDetails ? 'Showing details' : 'Hiding details';
    this.logs.push(`[${Date.now()}] ${msg}`);
  }
}
