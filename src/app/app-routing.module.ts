import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: '../app/login/login.module#LoginModule'
  },
  {
    path: 'admin',
    loadChildren: '../app/students/students.module#StudentsModule',
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
