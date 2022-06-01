import { NgModule } from '@angular/core';
import { PanelRoutingModule } from './panel-routing.module';
import { IndexComponent } from './index/index.component';
import { ServerListComponent } from './servers/list/server-list.component';
import { SharedModule } from '../shared/shared.module';
import { UserListComponent } from './users/list/user-list.component';
import { ArticleListComponent } from './articles/list/article-list.component';
import { ResultListComponent } from './results/list/result-list.component';
import { ArticleModifyDialogComponent } from './articles/modify/article-modify-dialog.component';
import { ServerModifyDialogComponent } from './servers/modify/server-modify-dialog.component';
import { PartialInfoComponent } from './shared/partial-info/partial-info.component';

@NgModule({
  declarations: [
    IndexComponent,
    ServerListComponent,
    UserListComponent,
    ArticleListComponent,
    ResultListComponent,
    ArticleModifyDialogComponent,
    ServerModifyDialogComponent,
    PartialInfoComponent,
  ],
  imports: [PanelRoutingModule, SharedModule],
})
export class PanelModule {}
