import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { ResultsComponent } from './results/results.component';
import { IndexComponent } from './index/index.component';

const HomeRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'results', component: ResultsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(HomeRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
