import { Component, OnInit, SkipSelf } from '@angular/core';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  private A="Child";
  constructor(private log:LoggerService) {
    if(log){
      this.log.logger("Data",this.A)
    }
   }

  ngOnInit(): void {

  }

}
