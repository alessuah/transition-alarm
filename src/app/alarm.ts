import { Temporal } from "@js-temporal/polyfill";

export interface Interval{
    timeoutId: number;
    value: Temporal.PlainTime
}

type OnTimeoutDelegate = () => void;

export class Alarm{
    
    constructor(
        scheduledTime: Temporal.PlainTime,
        numberOfIntervals: number,
        timeBetweenIntervals: number,
        onTimeout: OnTimeoutDelegate,

    )
    {
        this._scheduledTime = scheduledTime;
        this._timeBetweenIntervals = timeBetweenIntervals;
        this._intervals = new Array(numberOfIntervals);
        this._onTimeout = onTimeout;
        this.buildIntervals();
    }

    private _scheduledTime : Temporal.PlainTime;
    public get scheduledTime() : Temporal.PlainTime {
        return this._scheduledTime;
    }

    public get numberOfIntervals() : number
    {
        return this._intervals.length;
    }

    
    private _timeBetweenIntervals : number;
    public get timeBetweenIntervals(): number {
        return this._timeBetweenIntervals;
    }

    private _intervals: Array<Interval>;
    public get intervals(): ReadonlyArray<Interval>
    {
        return this._intervals;
    }

    private _onTimeout: OnTimeoutDelegate;

    private buildIntervals()
    {
        let difference = this.timeBetweenIntervals;
        for(let i = 0; i < this._intervals.length; i++)
        {
            this._intervals[i] = {
                timeoutId: setTimeout(this._onTimeout, 1000),
                value: this.scheduledTime.subtract({minutes:difference})

            };
            difference += this._timeBetweenIntervals;
        }
    }

    public addInterval()
    {
        let lastInterval = this.intervals[this._intervals.length -1];
        this._intervals.push({
            timeoutId: setTimeout(this._onTimeout, 0),
            value: lastInterval.value.subtract({minutes:this.timeBetweenIntervals})});
    }

    public deleteInterval()
    {
        let lastInterval = this._intervals.pop();
        clearTimeout(lastInterval?.timeoutId);
    }
}
