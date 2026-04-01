import { TestBed } from "@angular/core/testing";
import {AlarmService} from './alarm.service';

describe('AlarmService', () => {
    let service: AlarmService;

    beforeEach(() => {
        TestBed.configureTestingModule({
        });
        service = TestBed.inject(AlarmService);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it.each([["09:00:00","09:00:00"], ["08:00:00","08:00:00"]])('should schedule a time', (n, expected) => {
        service.schedule(n);
        expect(service.scheduledTime).toBe(expected);
    })

});