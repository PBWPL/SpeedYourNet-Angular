import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { IndexComponent } from './index/index.component';
import { BlogComponent } from './blog/blog.component';
import { ResultsComponent } from './results/results.component';
import { HomeRoutingModule } from './home.routing.module';
import { BlogShowDialogComponent } from './blog/show/blog-show-dialog.component';

@NgModule({
  declarations: [
    IndexComponent,
    BlogComponent,
    ResultsComponent,
    BlogShowDialogComponent,
  ],
  imports: [HomeRoutingModule, SharedModule],
})
export class HomeModule {}
