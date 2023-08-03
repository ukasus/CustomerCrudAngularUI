import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  constructor(private router:Router,private globalService:GlobalService){
    this.router.events.subscribe(event=>{
      if(!globalService.getFromLocal('token') && (event instanceof NavigationStart) && !event.url.includes("login")){
        this.router.navigateByUrl("/login");
      }
    });
  }
}
