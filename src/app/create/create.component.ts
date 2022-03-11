import { Component, OnInit } from '@angular/core';
import {ItemModel} from 'src/app/ItemModel'

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
    toname:'',
    toaddress:'',
    subtotal:0,
    taxpercent:0,
    taxamount:0,
    total:0,
    amountpaid:0,
    amountdue:0,
    note:'',
    orderdate:'',
    items: [{
      itemId:1,
      itemNo:'',
      itemName:'',
      itemQuantity:'',
      itemPrice:'',
      itemTotal:''
    }]
  }

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['itemNo', 'itemName', 'itemQuantity', 'itemPrice', 'total'];

  dataSource = ELEMENT_DATA;
  addMoreItems() {
    this.calculateTotal();
    this.createform.items.push({
      itemId:this.createform.items.length+1,
      itemNo:'',
      itemName:'',
      itemQuantity:'',
      itemPrice:'',
      itemTotal:''
    });
  }

  calculateTotal() {
    for (let i=0; i<this.createform.items.length; i++) {
      // console.log('(this.createform.items[i].itemQuantity)', (this.createform.items[i].itemQuantity));
      // console.log('(this.createform.items[i].itemQuantity)', typeof(this.createform.items[i].itemQuantity));
      
      if ((this.createform.items[i].itemQuantity)!=='' && this.createform.items[i].itemPrice!=='')
        this.createform.items[i].itemTotal = (parseFloat(this.createform.items[i].itemQuantity)*parseFloat(this.createform.items[i].itemPrice)).toString();
    }
    this.calculateSubtotal();
  }

  calculateSubtotal() {
    this.createform.subtotal=0;
    for (let i=0; i<this.createform.items.length; i++) {
      // console.log('this.createform.items[i].itemTotal ', typeof this.createform.items[i].itemTotal);
      if (this.createform.items[i].itemTotal !== 'NaN' && this.createform.items[i].itemTotal !== '')
        this.createform.subtotal += parseFloat(this.createform.items[i].itemTotal);
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
    this.createform.taxamount = this.createform.subtotal * (this.createform.taxpercent/100);
    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    console.log('this.createform.total ', this.createform.total);
    
    this.createform.total = +this.createform.subtotal + +this.createform.taxamount;
    console.log('this.createform.total ', this.createform.total);

  }

  getAmountDue() {
    this.createform.amountdue = this.createform.total - this.createform.amountpaid;
  }

  saveNewInvoice() {
    this.seeData();
  }

  seeData() {
    console.log(this.createform);
  }
}
