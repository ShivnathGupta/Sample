import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from '../environments/environment'
import { catchError } from 'rxjs/operators'
const Routes={
  RazorpayApi:`${environment.BASE_URL}Payment/RazorPay`,
  StripeApi:`${environment.BASE_URL}Payment/Stripe`,
  UpdateOrderApi:`${environment.BASE_URL}Payment/UpdateOrder`
}

@Injectable()
export class PaymentService {
    errorMessage: { status: any; message: string };
    errorMsg: any;
  constructor(private http:HttpClient) { }

  RazorPay(RazorPayData){
    return this.http.post(Routes.RazorpayApi,RazorPayData).pipe(catchError(this.server4xxError));
  }

  Stripe(StripeData){
    return this.http.post(Routes.StripeApi,StripeData).pipe(catchError(this.server4xxError));
  }

  UpdateOrder(UpdateOrderData){
   return this.http.put(Routes.UpdateOrderApi,UpdateOrderData).pipe(catchError(this.server4xxError));
  }


  server4xxError(error: Response | any) {

    if (error.error.status === 0) {
        this.errorMessage = {
            message: 'Please check your internet connection',
            status: error.error.status
        };
    }
    else if (error.error.status === 401) {
        this.errorMessage = {
            message: 'Invalid login credentials',
            status: error.error.status
        };
    }
    else if (error.error.status === 404) {
        this.errorMessage = {
            message: 'Not found',
            status: error.error.status
        };
    }
    else if (
        error.error.status === 401 ||
        error.error.status === 403 ||
        error.error.status === 408
    ) {
        this.errorMessage = {
            message: 'Your login time has been expired, login again',
            status: error.error.status
        };
    }
    else {
        this.errorMessage = {
            message: error.error.title,
            status: error.error.status
        };
    }

    if(error.error.errors["Name"].length > 0){
        let errList = [];
        error.error.errors["Name"].forEach(x => {
            let err = {message: x, status: error.error.status};
            errList.push(err);
        })
        this.errorMsg = Object.assign({}, errList);
    }
    else{
        this.errorMsg = Object.assign({}, this.errorMessage);
    }
    return throwError(this.errorMsg);
}
}
