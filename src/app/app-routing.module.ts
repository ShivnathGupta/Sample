import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampleComponent } from './ANGULAR-DECORATOR/sample/sample.component';
import { HomeComponent } from './home/home.component';
import { RazorPayComponent } from './razor-pay/razor-pay.component';
import { StripeComponent } from './stripe/stripe.component';
export function extract(s: string) {
  return s;
}
const routes: Routes = [
  {
    path:'Decorator',
    component:SampleComponent,
  },
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'StripePayment',
    component:StripeComponent
  },

  {
    path:'RazorPay',
    component:RazorPayComponent,
    data: { title: extract('Draft Contract') },
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
