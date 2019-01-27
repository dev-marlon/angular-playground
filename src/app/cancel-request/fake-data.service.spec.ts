import { TestBed } from '@angular/core/testing';

import { FakeDataService } from './fake-data.service';

describe('FakeDataService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: FakeDataService = TestBed.get(FakeDataService);
        expect(service).toBeTruthy();
    });
});
