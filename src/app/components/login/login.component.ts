import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

     username: string = "";
     password: string = "";

    constructor(private service: GlobalService, private router: Router) {

    }

    login() {
        console.log(this.username, this.password);
        this.service.login({ 'login_id': this.username, 'password': this.password }).subscribe((response: any) => {
            this.service.saveToLocal('token', response['access_token']);
            console.log(response);
            this.router.navigateByUrl("/customer")
        }, (error) => {
            this.service.clearFromLocal('token');
        });
    }
}
