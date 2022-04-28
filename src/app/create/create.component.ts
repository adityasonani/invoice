import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ItemModel} from 'src/app/ItemModel'
import { environment } from 'src/environments/environment';
import { LoginService } from '../services/login.service';

const ELEMENT_DATA: ItemModel[] = [];

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createform = {
    fromname:'',
    fromaddress:'',
    orderReceiverName:'',
    orderReceiverAddress:'',
    totalBeforeTax:0,
    taxPercent:0,
    taxamount:0,
    total:0,
    amountPaid:0,
    amountdue:0,
    note:'',
    orderDate:'',
    items: [{
      itemId:1,
      itemNo:'',
      name:'',
      quantity:'',
      price:'',
      itemTotal:''
    }]
  }

  saveDisable=false;

  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) { 
    this.saveDisable=false;
  }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['itemNo', 'name', 'quantity', 'price', 'total'];

  dataSource = ELEMENT_DATA;
  addMoreItems() {
    this.calculateTotal();
    this.createform.items.push({
      itemId:this.createform.items.length+1,
      itemNo:'',
      name:'',
      quantity:'',
      price:'',
      itemTotal:''
    });
  }

  calculateTotal() {
    for (let i=0; i<this.createform.items.length; i++) {
      // console.log('(this.createform.items[i].quantity)', (this.createform.items[i].quantity));
      // console.log('(this.createform.items[i].quantity)', typeof(this.createform.items[i].quantity));
      
      if ((this.createform.items[i].quantity)!=='' && this.createform.items[i].price!=='')
        this.createform.items[i].itemTotal = (parseFloat(this.createform.items[i].quantity)*parseFloat(this.createform.items[i].price)).toString();
    }
    this.calculateSubtotal();
  }

  calculateSubtotal() {
    this.createform.totalBeforeTax=0;
    for (let i=0; i<this.createform.items.length; i++) {
      // console.log('this.createform.items[i].itemTotal ', typeof this.createform.items[i].itemTotal);
      if (this.createform.items[i].itemTotal !== 'NaN' && this.createform.items[i].itemTotal !== '')
        this.createform.totalBeforeTax += parseFloat(this.createform.items[i].itemTotal);
    }
  }

  removeItem(ind: number) {
    this.createform.items.splice(ind,1);
    for (let i=0; i<this.createform.items.length; i++) {
      this.createform.items[i].itemId = i+1;
    }
    this.calculateSubtotal();
  }

  calculateTaxAmount() {
    this.createform.taxamount = this.createform.totalBeforeTax * (this.createform.taxPercent/100);
    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    console.log('this.createform.total ', this.createform.total);
    
    this.createform.total = +this.createform.totalBeforeTax + +this.createform.taxamount;
    console.log('this.createform.total ', this.createform.total);

  }

  getAmountDue() {
    this.createform.amountdue = this.createform.total - this.createform.amountPaid;
  }

  saveNewInvoice() {
    this.saveDisable=true;
    this.seeData();
    // let headers = new HttpHeaders();
    // let token = `Bearer ${localStorage.getItem("Token")}`;
    // headers = headers.set('Authorization', token.toString());
    // // console.log(headers);
    this.loginService.doSaveInvoice(this.createform).subscribe(
      (response)=>{
        console.log("response from /api/invoice is ", response);
        this.navigateToHome();
      }, (error)=>{
        this.saveDisable=false;
        console.log("error from /api/invoice is ", error);
        this.loginService.logoutUser();
        this.router.navigate(['/']);
        location.reload();
      }
    );
  }

  seeData() {
    console.log(this.createform);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
