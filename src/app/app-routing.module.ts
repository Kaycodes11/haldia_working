import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SvAuthGuardService } from './modules/auth/auth-services/login/sv-auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'members',
    loadChildren: () =>
      import('./modules/pages/pages.module').then((m) => m.PagesModule),
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  // {
  //   path: 'payment',
  //   loadChildren: () =>
  //     import('./modules/printreports/printreports.module').then(
  //       (m) => m.PrintreportsModule
  //     ),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
