export interface CreditCard{
    id?:number;
    customerId:number;
    fullName:string;
    cardNumber:string;
    expirationDate:string;
    cvv:string;
    amount:number;
}