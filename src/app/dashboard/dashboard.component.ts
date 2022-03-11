import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceDetails } from '../invoiceDetails';

const DummyInvoiceData: InvoiceDetails[] = [
  {order_id: 1, user_id: 382, order_date: '10/03/2022 12:27', order_receiver_name: 'aditya', order_receiver_address: 'shahpur', order_total_before_tax:80000, order_tax_per:'938', order_amount_paid:20000, order_total_amount_due:60000, actions: true},
  {order_id: 2, user_id: 38, order_date: '10/03/2022 12:27', order_receiver_name: 'aditya', order_receiver_address: 'shahpur', order_total_before_tax:80000, order_tax_per:'938', order_amount_paid:20000, order_total_amount_due:60000, actions: true},
  {order_id: 3, user_id: 3823, order_date: '10/03/2022 12:27', order_receiver_name: 'aditya', order_receiver_address: 'shahpur', order_total_before_tax:80000, order_tax_per:'938', order_amount_paid:20000, order_total_amount_due:60000, actions: true},
]

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['order_id', 'order_receiver_name', 'order_date', 'order_amount_paid', 'order_total_amount_due', 'actions'];
  dataSource = DummyInvoiceData;

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
}
