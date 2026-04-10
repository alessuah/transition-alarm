import { TestBed } from "@angular/core/testing";
import {Alarm} from './alarm';
import { Temporal } from "@js-temporal/polyfill";

describe('Alarm', () => {

    // it.each(
    //     [[new Temporal.PlainTime(9), new Temporal.PlainTime(9)],
    //     [new Temporal.PlainTime(8), new Temporal.PlainTime(8)]])
    //     ('should create object', (n, expected) => {
    //         let sut = new Alarm(n)
            
    //         expect(sut.scheduledTime).toStrictEqual(expected);
    //     })

    it('should create object' , () => {
        //Arrange & Act
        let sut = new Alarm(new Temporal.PlainTime(9), 2 , 5);
        
        //Assert
        expect(sut).toBeTruthy();
        expect(sut.intervals.length).toBe(2);
        expect(sut.intervals[0].toString()).toBe("08:55:00");
        expect(sut.intervals[1].toString()).toBe("08:50:00");
    });

});