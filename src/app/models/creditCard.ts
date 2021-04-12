export interface CreditCard{
    id?:number;
    customerId:number;
    fullName:string;
    cardNumber:string;
    expirationDate:string;
    CVV:number;
    amount?:number;
}