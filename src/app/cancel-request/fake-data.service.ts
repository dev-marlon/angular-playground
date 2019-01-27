import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FakeDataService {
    constructor(private httpClient: HttpClient) {}

    public fetch(): Observable<{}> {
        return this.httpClient
            .get('https://reqres.in/api/users?delay=3')
            .pipe(map((data: any) => data.data));
    }
}
