import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './card/main/main.component';
import { BioComponent } from './card/bio/bio.component';
import { ProjectsComponent } from './card/projects/projects.component';
import { NotFoundComponent } from './card/not-found/not-found.component';

export const router: Routes = [
  {
    path: 'main',
    component: MainComponent,
    data: {
      title: 'Главная'
    }
  },
  {
    path: 'bio',
    component: BioComponent,
    data: {
      title: 'Обо мне'
    }
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: {
      title: 'Мои проекты'
    }
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

const extraOptions: ExtraOptions = {
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'top',
};

@NgModule({
  imports: [RouterModule.forRoot(router, extraOptions)],
  exports: [RouterModule],
})
export class AppRouterModule {}
