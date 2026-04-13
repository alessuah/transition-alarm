import { Injectable } from "@angular/core";
import { Temporal } from "@js-temporal/polyfill";

export class Alarm{
      
    constructor(
        scheduledTime: Temporal.PlainTime,
        numberOfIntervals: number,
        timeBetweenIntervals: number
    )
    {
        this._scheduledTime = scheduledTime;
        this._numberOfIntervals = numberOfIntervals;
        this._timeBetweenIntervals = timeBetweenIntervals;
        this._intervals = new Array(numberOfIntervals);
        this.buildIntervals();
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
        let difference = this.timeBetweenIntervals;
        for(let i = 0; i < this._intervals.length; i++)
        {
            this._intervals[i] = this.scheduledTime.subtract({minutes:difference});
            difference += this._timeBetweenIntervals;
        }
    }

    public addInterval()
    {
        this._numberOfIntervals++;
        let lastInterval = this.intervals[this._intervals.length -1];
        this._intervals.push(lastInterval.subtract({minutes:this.timeBetweenIntervals}));
    }
}
