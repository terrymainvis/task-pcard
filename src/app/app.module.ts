import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPostsComponent } from './list-posts/list-posts.component';
import { PostComponent } from './post/post.component';
import { SearchService } from './services/search.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { changeExpandedPostReducer, changeFilterPostReducer } from './app-state/state.reducer';
import { StoreModule } from '@ngrx/store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

let appReducers: any = {
  postIds: changeExpandedPostReducer,
  filterText: changeFilterPostReducer}

@NgModule({
  declarations: [
    AppComponent,
    ListPostsComponent,
    PostComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    PerfectScrollbarModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
