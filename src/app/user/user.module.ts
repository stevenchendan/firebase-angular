import { NgModule } from '@angular/core';

import { UserService } from './user.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { ListItemComponent } from './list-item/list-item.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes  = [
  { path: 'me', component: DashboardComponent, data: { title: 'My Dashboard'}},
  { path: 'users', component: UserListComponent, data: { title: 'Users'}},
  { path: 'profile', component: UserDetailComponent, data: { title: 'My profile'}},
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [ListItemComponent],
  declarations: [DashboardComponent, UserDetailComponent, UserListComponent, ListItemComponent],
  providers: [UserService]
})
export class UserModule { }
