import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
    })
export class GlobalService{
    constructor(private http: HttpClient,private router:Router){}

    login(cred:any){
        const headers:HttpHeaders=new HttpHeaders({
            'Content-Type': 'application/json'
        });
       return this.http.post("https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp",cred,{headers:headers});
    }

    getCustomers(){
        return this.http.get(' https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list',{headers:this.getHeadersForPost()});
    }

    deleteCustomer(id:string){
        return this.http.post(' https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=delete&uuid='+id,null,{headers:this.getHeadersForPost()});
    }

    addCustomer(customer:any){
        return this.http.post(' https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=create',customer,{headers:this.getHeadersForPost()});
    }

    updateCustomer(id:string,customer:any){
        return this.http.post(' https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=update&uuid='+id,customer,{headers:this.getHeadersForPost()});
    }

    saveToLocal(key:string,value:string){
        localStorage.setItem(key,value);
    }

    getFromLocal(key:string){
        return localStorage.getItem(key);
    }
    clearFromLocal(key:string){
        localStorage.removeItem(key);
    }

    reloadCurrentRoute() {
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
        });
    }

    getHeadersForPost(){
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this.getFromLocal('token')
        });
    }
}