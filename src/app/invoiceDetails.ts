
export interface InvoiceDetails {
    order_id: number,
    user_id: number,
    order_date: string,
    order_receiver_name: string,
    order_receiver_address: string,
    order_total_before_tax: number,
    order_tax_per: string,
    order_amount_paid: number,
    order_total_amount_due: number,
    actions: boolean
}