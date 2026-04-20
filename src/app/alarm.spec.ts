import { TestBed } from "@angular/core/testing";
import { Alarm, TimeProvider } from './alarm';
import { Temporal } from "@js-temporal/polyfill";

describe('Alarm', () => {

    it('should create object', () => {
        //Arrange & Act
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
        let sut = new Alarm(new Temporal.PlainTime(9), { count: 2, timeBetween: 5 }, mockCallback, mockedTimeProvider);

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
        let sut = new Alarm(new Temporal.PlainTime(9), { count: 2, timeBetween: 5 }, mockCallback,mockedTimeProvider);

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
        
        let sut = new Alarm(new Temporal.PlainTime(9), { count: 2, timeBetween: 5 }, mockCallback, mockedTimeProvider);

        //Act
        sut.deleteInterval();

        //Assert
        expect(sut.numberOfIntervals).toBe(1);
        expect(sut.intervals.length).toBe(1);
        expect(sut.intervals[0].value.toString()).toBe("08:55:00");
    });

    it('should ignore deletion of a non-existent interval', () => {
        //Arrange
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
        let sut = new Alarm(new Temporal.PlainTime(9), { count: 0, timeBetween: 5 }, mockCallback, mockedTimeProvider);

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

        await vi.advanceTimersByTimeAsync(1000);

        //Assert
        expect(mockCallback).toHaveBeenCalled();

        vi.useRealTimers();
    });

});