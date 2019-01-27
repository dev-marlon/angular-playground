import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FakeDataService } from './fake-data.service';
import { SomeListComponent } from './some-list/some-list.component';

@NgModule({
    declarations: [SomeListComponent],
    imports: [CommonModule, HttpClientModule],
    providers: [FakeDataService],
})
export class CancelRequestModule {}
