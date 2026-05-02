import { Alarm, OnTimeoutDelegate, TimeProvider } from "../alarm";
import { Temporal } from "@js-temporal/polyfill";

export class AlarmMother{

    static default(onTimeout: OnTimeoutDelegate): Alarm {
        return new Alarm(
            new Temporal.PlainTime(9),
            { count: 1, timeBetween: 5 },
            onTimeout,
            AlarmMother.defaultTimeProvider()
        );
    }

    static withCount(count: number, onTimeout: OnTimeoutDelegate): Alarm {
        return new Alarm(
            new Temporal.PlainTime(9),
            { count, timeBetween: 5 },
            onTimeout,
            AlarmMother.defaultTimeProvider()
        );
    }

    static defaultTimeProvider(): TimeProvider {
        return {
            now: Temporal.PlainDateTime.from({ year: 2026, month: 4, day: 1, hour: 8, minute: 50, second: 0 })
        };
    }

}