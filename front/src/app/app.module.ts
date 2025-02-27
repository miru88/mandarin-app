import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { ScrollingModule } from '@angular/cdk/scrolling'; // For virtual scrolling
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminVocabularyListComponentComponent } from '../components/admin/vocabulary/admin-vocabulary-list-component.component';
import { AdminVocabularyDetailComponentComponent } from '../components/admin/vocabulary/admin-vocabulary-detail-component.component';
import { HanziComponentComponent } from '../components/common/hanzi-component.component'

@NgModule({
  declarations: [
    AppComponent,
    AdminVocabularyListComponentComponent,
    AdminVocabularyDetailComponentComponent,
    HanziComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    MatCardModule,
    ScrollingModule,
    MatPaginatorModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
