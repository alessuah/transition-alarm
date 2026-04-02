import { TestBed } from "@angular/core/testing";
import {AlarmService} from './alarm.service';
import { Temporal } from "@js-temporal/polyfill";

describe('AlarmService', () => {

    it.each(
        [[new Temporal.PlainTime(9), new Temporal.PlainTime(9)],
        [new Temporal.PlainTime(8), new Temporal.PlainTime(8)]])
        ('should schedule a time', (n, expected) => {
            let sut = new AlarmService(n)
            
            expect(sut.scheduledTime).toStrictEqual(expected);
        })

});