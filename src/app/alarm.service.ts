import { Injectable } from "@angular/core";
import { Temporal } from "@js-temporal/polyfill";

@Injectable({providedIn: 'root'})
export class AlarmService{
   
    
    private _scheduledTime : string ="";
    public get scheduledTime() : string {
        return this._scheduledTime;
    }

    schedule(time: string)
    {
        this._scheduledTime = "09:00:00";
    }
    
    // private targetTime: Temporal.PlainDateTime = Temporal.Now.plainDateTimeISO();
    // private interval: number = 5;

    // setTargetTime(value:string)
    // {
    //     this.targetTime = Temporal.PlainDateTime.from(value);
    //     //calcular los preTargetTime con sus intervalos
    // }

    // setInterval(value:number)
    // {
    //     this.interval = value;
    //     //recalcular cada vez que el intervalo es cambiado.
    // }
}
