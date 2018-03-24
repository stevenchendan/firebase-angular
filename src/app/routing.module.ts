import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  /*  This means that for Urls starting with auth, angulars router will get module file 
   ./auth/auth.module and expect a class AuthModule */
  { path: '', loadChildren: './auth/auth.module#AuthModule' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule { }
