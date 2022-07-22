import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzListModule } from 'ng-zorro-antd/list';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NzTableModule,
    NzSpinModule,
    NzListModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListComponent,
      },
      {
        path: ':id',
        component: DetailComponent,
      }
    ]),
  ]
})
export class EventTrackingModule { }
