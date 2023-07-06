import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { SearchComponent } from './views/search/search.component';
import { NotificationFormComponent } from './views/notification-form/notification-form.component';

const routes: Routes = [
  {
    path: "",
    component: SearchComponent
  },
  {
    path: "search",
    component: HomeComponent
  },
  {
    path: "notification",
    component: NotificationFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
