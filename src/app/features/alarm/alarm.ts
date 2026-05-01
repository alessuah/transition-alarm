import { Temporal } from "@js-temporal/polyfill";
import { timeout } from "rxjs";

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

export type OnTimeoutDelegate = () => void;

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
            this._intervals[i] = this.createInterval(intervalTime);
            difference += this._timeBetweenIntervals;
        }
    }

    public addInterval(): void
    {
        const baseTime = this._intervals.length === 0 ? this.scheduledTime : this.intervals[this._intervals.length - 1].value;
        const value = baseTime.subtract({ minutes: this.timeBetweenIntervals });

        this._intervals.push(this.createInterval(value));
    }

    private createInterval(time: Temporal.PlainTime): Interval
    {
        return {
            timeoutId: setTimeout(() => {this.handleTimeout()}, this.timeoutDifference(time)),
            value: time,
        };
    }

    private handleTimeout(): void
    {
        this._intervals.shift();
        this._onTimeout();
    }

    public deleteInterval()
    {
        let lastInterval = this._intervals.pop();
        if(lastInterval !== undefined)
        {
            clearTimeout(lastInterval?.timeoutId);
        }
    }

    private timeoutDifference(time: Temporal.PlainTime): number
    {
        const intervalDateTime = this._timeProvider.now.toPlainDate().toPlainDateTime(time);
        return this._timeProvider.now.until(intervalDateTime).total({ unit: "milliseconds" });
    }

    //Falta añadir el timeout para scheduledTime, poder modificarlo
    // en cualquier momento y recalcular sus intervalos.
    //Para ello tocaría hacer clearTimeout's de sus interval's
}
