import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminVocabularyListComponentComponent } from '../components/admin/vocabulary/admin-vocabulary-list-component.component';
import { AdminVocabularyDetailComponentComponent} from '../components/admin/vocabulary/admin-vocabulary-detail-component.component';
import { AppComponent } from './app.component';




const routes: Routes = [{ path: 'vocabulary/list', component: AdminVocabularyListComponentComponent },
                        { path: 'vocabulary/detail', component: AdminVocabularyDetailComponentComponent },
                        { path: '', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
