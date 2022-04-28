import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { InvoiceDetails } from '../invoiceDetails';
import { LoginService } from '../services/login.service';
import { VerifytokenService } from '../services/verifytoken.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  progress=false;

  DummyInvoiceData: InvoiceDetails[] = [
  ];

  dataSource:any[]=[];

  constructor(private router: Router, private http: HttpClient, private loginService: LoginService) { 
    // console.log("const called ");
    this.reloadPage();
  }

  ngOnInit(): void {
    this.progress=true;
    let uri = environment.BASE_URL + '/api/invoice/all';
    this.http.get(uri).subscribe(
      (response:any)=>{
        console.log('response from /invoice/all is ', response);
        this.progress=false;
        this.DummyInvoiceData = response.data;
        console.log("dummy invoice data ", this.DummyInvoiceData);
        this.dataSource = this.DummyInvoiceData;
        console.log("datasource ", this.dataSource);
        console.log(this.dataSource[0].amountPaid.$numberDecimal);
      },
      (error)=>{
        this.progress=false;
        console.log('error from /invoice/all is ', error);
      }
    );
  }
  displayedColumns: string[] = ['order_id', 'order_receiver_name', 'order_date', 'total', 'order_amount_paid', 'order_total_amount_due', 'actions'];

  deleteRecord(id:number) {
    console.log('id to delete is ', id);
    this.dataSource = this.dataSource.filter((item, index)=>
      index!==id
    );
    console.log(this.dataSource);
  }

  editRecord(order_id:number) {
    console.log(order_id);
  }

  reloadPage() {
    if(window.localStorage )
    {
      if(!localStorage.getItem('firstLoad'))
      {
        localStorage['firstLoad'] = true;
        window.location.reload();
      }  
      else
        localStorage.removeItem('firstLoad');
    }
  }
}
