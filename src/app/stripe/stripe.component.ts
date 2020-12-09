import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../payment.service';
import { loadStripe } from '@stripe/stripe-js';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})
export class StripeComponent implements OnInit {
  Stripe:boolean=false;
  StripeForm:FormGroup;

  constructor(
    private PaymentApi:PaymentService,
    private fb:FormBuilder
    ) { }

  ngOnInit(): void {
    this.StripeForm=this.fb.group({
      firstName:[],
      lastName:[],
      email:[],
      city:[],
      country:[],
      postalCode:[],
      items: this.fb.array([
        this.fb.group({
          name: [],
          quantity: [, Validators.required],
          price: [, Validators.required],
        })
      ])
    })
  }

  get items() {
    return this.StripeForm.get('items') as FormArray;
  }

  add() {
    const length = this.items.length;
    const newItem = this.fb.group({
      name: [],
      quantity: [, Validators.required],
      price: [, Validators.required],
    });

    this.items.push(newItem);
  }
  RemoveItem(index: any) {
    return this.items.removeAt(index);
  }

  handleStripe=async()=>{
    this.Stripe=true;
    const stripePromise = loadStripe("pk_test_51HjKScAtD32VDdwtqJmzoCs4qzlna3KWwbhTQv32QkEBvXhmG2jsqA1W3GJLFO54087h6nwPe6xxaTwAtPEZnwLX00Bgqx6roi");
    await this.PaymentApi.Stripe(this.StripeForm.value).subscribe(async (response:any)=>{
      this.Stripe=false;
      (await stripePromise).redirectToCheckout({ sessionId: response.sessionId })
    },(error)=>{
      this.Stripe=false;
      console.log(error);
    })
  }

}
