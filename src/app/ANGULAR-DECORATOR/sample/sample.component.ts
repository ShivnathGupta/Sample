import { Component, OnInit, Optional, Self, SkipSelf } from '@angular/core';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css'],
  providers:[LoggerService]
})
export class SampleComponent implements OnInit {

  private A:string="Sample"
  constructor(@Optional() @SkipSelf() private log:LoggerService) {
    if(log){
      this.log.logger("Data",this.A)
    }

   }

  ngOnInit(): void {

  }

}
