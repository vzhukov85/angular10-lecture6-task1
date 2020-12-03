import { NgModule } from '@angular/core';
import { BioComponent } from './bio/bio.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
  declarations: [
    MainComponent,
    BioComponent,
    ProjectsComponent,
    NotFoundComponent,
  ],
  imports: [],
  exports: [
    MainComponent,
    BioComponent,
    ProjectsComponent,
    NotFoundComponent,
  ],
})
export class CardModule {}
