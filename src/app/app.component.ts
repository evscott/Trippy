import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messages = this.http.get<any[]>('http://localhost:4201');

  constructor(public http: HttpClient) {}

  post() {
    const response = this.http.post('http://localhost:4201/users', {username: 'Eliot', password: 'Scott'}).subscribe(next => console.log(next));
  }
}
