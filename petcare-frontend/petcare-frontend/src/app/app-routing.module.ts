import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetListComponent } from './pet-list/pet-list.component';
import { PetFormComponent } from './pet-form/pet-form.component';
import { PetDetailComponent } from './pet-detail/pet-detail.component';
import { LoginComponent } from './login/login.component';  // Import the login component
import { AuthGuard } from './auth.guard';  // Import the AuthGuard

const routes: Routes = [
  { path: '', redirectTo: '/pets', pathMatch: 'full' },
  { path: 'pets', component: PetListComponent, canActivate: [AuthGuard] }, // Protect with AuthGuard
  { path: 'edit/:id', component: PetFormComponent, canActivate: [AuthGuard] }, // Protect with AuthGuard
  { path: 'pet-detail/:id', component: PetDetailComponent, canActivate: [AuthGuard] }, // Protect with AuthGuard
  { path: 'login', component: LoginComponent },  // Login route
  { path: '**', redirectTo: '/pets' }  // Wildcard route to redirect to pets
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
