import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SomeListComponent } from './some-list.component';

describe('SomeListComponent', () => {
    let component: SomeListComponent;
    let fixture: ComponentFixture<SomeListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SomeListComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SomeListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
