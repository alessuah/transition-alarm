import { TestBed } from "@angular/core/testing";
import {Alarm} from './alarm';
import { Temporal } from "@js-temporal/polyfill";

describe('Alarm', () => {

    it('should create object' , () => {
        //Arrange & Act
        const mockCallback = vi.fn();
        let sut = new Alarm(new Temporal.PlainTime(9), 2 , 5, mockCallback);
        
        //Assert
        expect(sut).toBeTruthy();
        expect(sut.intervals.length).toBe(2);
        expect(sut.scheduledTime.toString()).toBe("09:00:00");
        expect(sut.intervals[0].value.toString()).toBe("08:55:00");
        expect(sut.intervals[1].value.toString()).toBe("08:50:00");
    });

    it('should add new interval', () => {
        //Arrange
        const mockCallback = vi.fn(); 
        let sut = new Alarm(new Temporal.PlainTime(9), 2, 5, mockCallback);

        //Act
        sut.addInterval();

        //Assert
        expect(sut.numberOfIntervals).toBe(3);
        expect(sut.intervals.length).toBe(3);
        expect(sut.intervals[1].value.toString()).toBe("08:50:00");
        expect(sut.intervals[2].value.toString()).toBe("08:45:00");
    });

    it('should delete last interval added', () => {

        //Arrange
        const mockCallback = vi.fn();
        let sut = new Alarm(new Temporal.PlainTime(9), 2 ,5, mockCallback);

        //Act
        sut.deleteInterval();

        //Assert
        expect(sut.numberOfIntervals).toBe(1);
        expect(sut.intervals.length).toBe(1);
        expect(sut.intervals[0].value.toString()).toBe("08:55:00");
    });

    it('should ignore deletion of a non-existent interval', () =>
    {
        //Arrange
        const mockCallback = vi.fn();
        let sut = new Alarm(new Temporal.PlainTime(9), 0 ,5, mockCallback);

        //Act
        sut.deleteInterval();

        //Assert
        expect(sut.numberOfIntervals).toBe(0);
        expect(sut.intervals.length).toBe(0);
    });

    it("should call onTimeout event once per number of intervals", async () =>
    {    
        //Arrange
        vi.useFakeTimers();
        const mockCallback = vi.fn();
        
        //Act
        let sut = new Alarm(new Temporal.PlainTime(9), 1 ,5, mockCallback);

        await vi.advanceTimersByTimeAsync(1000);
        
        //Assert
        expect(mockCallback).toHaveBeenCalled();

        vi.useRealTimers();
    });
    
});