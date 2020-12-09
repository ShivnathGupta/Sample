import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../payment.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-razor-pay',
  templateUrl: './razor-pay.component.html',
  styleUrls: ['./razor-pay.component.css'],
})
export class RazorPayComponent implements OnInit {
  RazorPay: boolean = false;
  RazorPayForm: FormGroup;

  constructor(
    private PaymentApi: PaymentService,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    this.RazorPayForm = this.fb.group({
      firstName: [],
      lastName: [],
      email: [],
      city: [],
      country: [],
      postalCode: [],
      items: this.fb.array([
        this.fb.group({
          name: [],
          quantity: [, Validators.required],
          price: [, Validators.required],
        }),
      ]),
    });
  }

  get items() {
    return this.RazorPayForm.get('items') as FormArray;
  }

  add() {
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

   _window(): any {
    // return the global native browser window object
    return window;
  }

  get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return this._window();
    }
  }

  loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  __DEV__ = document.domain === 'localhost';

  handleRazorPay = async () => {
    const res = await this.loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );
    if (!res) {
      console.log('Razorpay SDK failed to load. Are you online?');
      return;
    }
    this.PaymentApi.RazorPay(this.RazorPayForm.value).subscribe(
      async (response: any) => {
        console.log(response);

        const resp = await response;
        const data = resp.attributes;
        const options = {
          key: this.__DEV__ ? 'rzp_test_Ur2Ew35u8pSJYg' : 'PRODUCTION_KEY',
          currency: this.RazorPayForm.get('country').value,
          amount: data.amount,
          order_id: data.order_id,
          name: 'Payment',
          description: 'Test Payment',
          handler: function (response) {
            alert();
          },
          prefill: {
            name: 'Shivnath',
            email: 'sdfdsjfh2@ndsfdf.com',
            phone_number: '9899999999',
          },
        };
        const paymentObject = new this.nativeWindow.Razorpay(options);
        paymentObject.open();
      }
    );
  };
}
