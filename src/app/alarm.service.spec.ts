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

    it('should schedule a time', () => {
        service.schedule("09:00:00");
        expect(service.scheduledTime).toBe('09:00:00');
    })

});