import { TestBed } from "@angular/core/testing";
import { Alarm, TimeProvider } from '../alarm';
import { Temporal } from "@js-temporal/polyfill";
import {AlarmMother} from "./alarm-mother";

describe('Alarm', () => {

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should create object', () => {
        //Arrange & Act
        let sut = AlarmMother.withCount(2, vi.fn());

        //Assert
        expect(sut).toBeTruthy();
        expect(sut.intervals.length).toBe(2);
        expect(sut.scheduledTime.toString()).toBe("09:00:00");
        expect(sut.intervals[0].value.toString()).toBe("08:55:00");
        expect(sut.intervals[1].value.toString()).toBe("08:50:00");
        expect(sut.timeLeft.toLocaleString()).toBe("10 min");
    });

    it('should add new interval', () => {
        //Arrange & Act
        let sut = AlarmMother.withCount(2, vi.fn());

        //Act
        sut.addInterval();

        //Assert
        expect(sut.numberOfIntervals).toBe(3);
        expect(sut.intervals.length).toBe(3);
        expect(sut.intervals[1].value.toString()).toBe("08:50:00");
        expect(sut.intervals[2].value.toString()).toBe("08:45:00");
    });

    it('should delete last interval added', () => {
       //Arrange & Act
        let sut = AlarmMother.withCount(2, vi.fn());

        //Act
        sut.deleteInterval();

        //Assert
        expect(sut.numberOfIntervals).toBe(1);
        expect(sut.intervals.length).toBe(1);
        expect(sut.intervals[0].value.toString()).toBe("08:55:00");
    });

    it('should ignore deletion of a non-existent interval', () => {
       //Arrange & Act
        let sut = AlarmMother.withCount(0, vi.fn());

        //Act
        sut.deleteInterval();

        //Assert
        expect(sut.numberOfIntervals).toBe(0);
        expect(sut.intervals.length).toBe(0);
    });

    it("should call onTimeout event once per number of intervals", async () => {
        //Arrange
        vi.useFakeTimers();
        const mockCallback = vi.fn();
       
        //Act
        let sut = AlarmMother.withCount(1, mockCallback);

        await vi.advanceTimersByTimeAsync(5 * 60 * 1000);

        //Assert
        expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it("should delete interval when onTimeout is triggered", async () => {
        //Arrange
        vi.useFakeTimers();
        const mockCallback = vi.fn();
        const mockedTimeProvider: TimeProvider = {
            now: Temporal.PlainDateTime.from(
                {
                    year: 2026,
                    month: 4,
                    day: 1,
                    hour: 8,
                    minute: 50,
                    second: 0
                }
            )
        };

        //Act
        let sut = new Alarm(new Temporal.PlainTime(9), { count: 1, timeBetween: 5 }, mockCallback, mockedTimeProvider);
       
        await vi.advanceTimersByTime(5 * 60 * 1000 );

        //Assert
        expect(sut.numberOfIntervals).toBe(0);
        expect(sut.intervals.length).toBe(0);
    });

});