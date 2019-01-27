import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SomeListComponent } from './cancel-request/some-list/some-list.component';

const routes: Routes = [
    {
        path: '',
        component: SomeListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
