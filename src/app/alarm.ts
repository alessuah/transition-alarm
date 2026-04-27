import { Temporal } from "@js-temporal/polyfill";

export interface TimeProvider
{
    now: Temporal.PlainDateTime;
}

export interface Interval{
    timeoutId: number;
    value: Temporal.PlainTime
}

export interface IntervalConfiguration{
    count: number,
    timeBetween: number,
}

type OnTimeoutDelegate = () => void;

export class Alarm{
    
    constructor(
        scheduledTime: Temporal.PlainTime,
        intervalConfiguration: IntervalConfiguration,
        onTimeout: OnTimeoutDelegate,
        timeProvider: TimeProvider

    )
    {
        this._scheduledTime = scheduledTime;
        this._timeBetweenIntervals = intervalConfiguration.timeBetween;
        this._intervals = new Array(intervalConfiguration.count);
        this._onTimeout = onTimeout;
        this._timeProvider = timeProvider;
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

    public get timeLeft(): Temporal.Duration
    {
        return this._timeProvider.now.until(
            this._timeProvider.now.with(
                {
                    hour: this.scheduledTime.hour,
                    minute: this.scheduledTime.minute,
                    second: this.scheduledTime.second
                }
            )
        );
    }

    private _onTimeout: OnTimeoutDelegate;
    private _timeProvider: TimeProvider;

    private buildIntervals()
    {
        let difference = this.timeBetweenIntervals;
        for(let i = 0; i < this._intervals.length; i++)
        {
            let intervalTime = this.scheduledTime.subtract({minutes:difference})

            this._intervals[i] = {
                timeoutId: setTimeout(() => this.handleTimeout(), this.timeoutDiference(intervalTime)),
                value: intervalTime

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

    private handleTimeout(): void
    {
        this._intervals.shift();
        this._onTimeout();
    }

    public deleteInterval()
    {
        //Hay que comprobar si lastInterval es indefinido si no al hacer clearTimeout epxlota seguro.
        let lastInterval = this._intervals.pop();
        clearTimeout(lastInterval?.timeoutId);
    }

    private timeoutDiference(time: Temporal.PlainTime): number
    {
        return time.until(this._timeProvider.now).milliseconds;
        
    }
}
