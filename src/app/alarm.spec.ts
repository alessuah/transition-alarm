import { TestBed } from "@angular/core/testing";
import {Alarm} from './alarm';
import { Temporal } from "@js-temporal/polyfill";

describe('Alarm', () => {

    it('should create object' , () => {
        //Arrange & Act
        let sut = new Alarm(new Temporal.PlainTime(9), 2 , 5);
        
        //Assert
        expect(sut).toBeTruthy();
        expect(sut.intervals.length).toBe(2);
        expect(sut.scheduledTime.toString()).toBe("09:00:00");
        expect(sut.intervals[0].toString()).toBe("08:55:00");
        expect(sut.intervals[1].toString()).toBe("08:50:00");
    });

    it('should add new interval', () => {
        //Arrange 
        let sut = new Alarm(new Temporal.PlainTime(9), 2, 5);

        //Act
        sut.addInterval();

        //Assert
        expect(sut.numberOfIntervals).toBe(3);
        expect(sut.intervals.length).toBe(3);
    });

});