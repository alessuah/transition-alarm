import { Injectable } from "@angular/core";
import { Temporal } from "@js-temporal/polyfill";

@Injectable({providedIn: 'root'})
export class AlarmService{
   
    //Crear constructor que pase el numbero de alarmas y el tiempo 
    //que habrá entre ellas.
    //Por ejemplo, 3 alarmas antes del tiempo establecido con 
    //5 mins de diferencia entre ellas
    // scheduledTime: 05:00:00, 2 intervalos, 5 mins
    //Crearía -> scheduledTime: :05:00:00 y [04:55:00, 04:50:00] 
    
    constructor(scheduledTime: Temporal.PlainTime)
    {
        this._scheduledTime = scheduledTime;
    }

    private _scheduledTime : Temporal.PlainTime;
    public get scheduledTime() : Temporal.PlainTime {
        return this._scheduledTime;
    }

    schedule(time: Temporal.PlainTime)
    {
        this._scheduledTime = time;
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
