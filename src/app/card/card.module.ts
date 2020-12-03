import { NgModule } from '@angular/core';
import { BioComponent } from './bio/bio.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjectsComponent } from './projects/projects.component';
import { GrabUtmComponent } from './grab-utm/grab-utm.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    BioComponent,
    ProjectsComponent,
    NotFoundComponent,
    GrabUtmComponent,
    HomeComponent,
  ],
  imports: [],
  exports: [
    BioComponent,
    ProjectsComponent,
    NotFoundComponent,
    GrabUtmComponent,
    HomeComponent,
  ],
})
export class CardModule {}
