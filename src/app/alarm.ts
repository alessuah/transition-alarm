import { Injectable } from "@angular/core";
import { Temporal } from "@js-temporal/polyfill";

export class Alarm{
   
    //Crear constructor que pase el numbero de alarmas y el tiempo 
    //que habrá entre ellas.
    //Por ejemplo, 3 alarmas antes del tiempo establecido con 
    //5 mins de diferencia entre ellas
    // scheduledTime: 05:00:00, 2 intervalos, 5 mins
    //Crearía -> scheduledTime: :05:00:00 y [04:55:00, 04:50:00] 
    
    constructor(
        scheduledTime: Temporal.PlainTime,
        numberOfIntervals: number,
        timeBetweenIntervals: number
    )
    {
        this._scheduledTime = scheduledTime;
        this._numberOfIntervals = numberOfIntervals;
        this._timeBetweenIntervals = timeBetweenIntervals;
        this.buildIntervals()
    }

    private _scheduledTime : Temporal.PlainTime;
    public get scheduledTime() : Temporal.PlainTime {
        return this._scheduledTime;
    }

    private _numberOfIntervals: number;
    public get numberOfIntervals() : number
    {
        return this._numberOfIntervals;
    }

    
    private _timeBetweenIntervals : number;
    public get timeBetweenIntervals(): number {
        return this._timeBetweenIntervals;
    }

    private _intervals: Array<Temporal.PlainTime> = [];
    public get intervals(): ReadonlyArray<Temporal.PlainTime>
    {
        return this._intervals;
    }

    private buildIntervals()
    {
        let difference = 0;
        for(let i = 0; i < this.numberOfIntervals; i++)
        {
            this._intervals.push(this.scheduledTime.subtract({minutes:this._timeBetweenIntervals + difference}));
            difference += this._timeBetweenIntervals;
        }
    }
}
