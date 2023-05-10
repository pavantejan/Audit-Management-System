import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth-service';
import { Router } from '@angular/router';
import { SeverityService } from '../service/severity-service';
import { AuditResponse } from '../model/audit-response';


@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css']
})
export class ResponsesComponent implements  OnInit{

  responses: AuditResponse[] = [];
  myData: any[] = [];
  dateString : string = "";

  critical:number=0;
  compliant:number=0;
  unresponsive:number=2;

  criticalPer:number=0;
  compliantPer:number=0;
  unresponsivePer:number=0;




  constructor(
    private authService:AuthService,
    private router:Router,
    private severityService:SeverityService
    
    ){}

  ngOnInit(): void {
    this.authService.authCheck().subscribe(
      (data)=>{
        console.log(data);
      },
      (err) =>{
        console.log("It is in error slide of the responses opt-1");
        this.router.navigate(['error'])},
      ()=>{
        this.severityService.responses().subscribe(
          (data:any)=>{
            console.log("In response data");
            console.log(data);
            // this.myData = data;
            this.responses = data;

            console.log("responses length: "+this.responses.length);
            // this.dateString = this.responses[0].creation_date_and_time;
            // console.log(this.myData);

            // if(this.responses.length === 0){
            //   this.unresponsive = 2;
            // }
            // else 
            if(this.responses.length > 0 ){

              for(let i=0;i<this.responses.length;i++){
                if(this.responses[i].project_execution_status === 'GREEN'){
                  this.compliant += 1;
                  this.unresponsive -=this.compliant;
                }
                else if(this.responses[i].project_execution_status === 'RED'){
                  this.critical += 1;
                  this.unresponsive -= this.critical;
                }
              }
            }


            this.criticalPer = this.getPercentage(this.critical);
            this.compliantPer = this.getPercentage(this.compliant);
            
            if(this.responses.length === 0){
              this.unresponsivePer = 100;
            }else if(this.responses.length === 1){
              this.unresponsivePer = 50;
            }
            else{
              this.unresponsivePer = 0;
            }

          },

          (err) =>{
            console.log("It is in error slide of the responses opt-1");
            this.router.navigate(['error'])}
        );
      }
  );
}


getPercentage(x:number){
  console.log(x/2);
  if( x/2 === 1 ){
    return 100;
  }
  else if( x/2 === 0.5){
    return 50;
  }
  return 0;
}


}
