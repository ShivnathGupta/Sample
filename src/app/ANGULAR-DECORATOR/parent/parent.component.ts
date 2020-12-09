import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
  // providers:[LoggerService]
})
export class ParentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
