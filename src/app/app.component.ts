import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  constructor(private router:Router,private globalService:GlobalService){
    this.router.events.subscribe(event=>{
      if(!globalService.getFromLocal('token')){
        this.router.navigateByUrl("/login");
      }
    })
  }
}
