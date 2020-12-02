import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BioComponent } from './bio/bio.component';
import { MainComponent } from './main/main.component';
import { NavigateComponent } from './navigate/navigate.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
  declarations: [
    MainComponent,
    BioComponent,
    ProjectsComponent,
    NotFoundComponent,
    NavigateComponent,
  ],
  imports: [MatToolbarModule, MatListModule, MatIconModule],
  exports: [
    MainComponent,
    BioComponent,
    ProjectsComponent,
    NotFoundComponent,
    NavigateComponent,
  ],
})
export class CardModule {}
