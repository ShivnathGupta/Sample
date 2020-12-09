import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {

  constructor() { }
  logger(message,data){
    console.log("["+message+"]",data);

  }
}
