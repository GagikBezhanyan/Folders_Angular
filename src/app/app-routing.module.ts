import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'folders', loadComponent: () => import('./components/desktop/desktop.component').then(c => c.DesktopComponent) },
  { path: '', pathMatch: 'full', redirectTo: 'folders' },
  { path: '**', redirectTo: 'folders' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
