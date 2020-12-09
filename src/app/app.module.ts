import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CancelComponent } from './cancel/cancel.component';
import { ErrorComponent } from './error/error.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { RazorPayComponent } from './razor-pay/razor-pay.component';
import { StripeComponent } from './stripe/stripe.component';
import { PaymentService } from './payment.service';
import {HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { SampleComponent } from './ANGULAR-DECORATOR/sample/sample.component';
import { LoggerService } from './ANGULAR-DECORATOR/logger.service';
import { ChildComponent } from './ANGULAR-DECORATOR/child/child.component';
import { ParentComponent } from './ANGULAR-DECORATOR/parent/parent.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CancelComponent,
    ErrorComponent,
    OrderConfirmationComponent,
    RazorPayComponent,
    StripeComponent,
    SampleComponent,
    ParentComponent,
    ChildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
