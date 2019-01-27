import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { FakeDataService } from '../fake-data.service';

@Component({
    selector: 'app-some-list',
    templateUrl: './some-list.component.html',
    styleUrls: ['./some-list.component.less'],
})
export class SomeListComponent implements OnInit, OnDestroy {
    public fakeData: {};

    private cancelableRequestSubject$: Subject<any> = new Subject<any>();
    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private fakeDataService: FakeDataService) {}

    public ngOnInit(): void {
        this.cancelableRequestSubject$
            .pipe(
                takeUntil(this.destroy$),
                switchMap(() => this.fakeDataService.fetch())
            )
            .subscribe((fakeData: {}) => (this.fakeData = fakeData));
    }

    public fetch(): void {
        this.cancelableRequestSubject$.next();
    }

    public ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
