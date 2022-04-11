import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchService } from '../services/search.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state/app-state';
import { ADD_EXPANDED_POST, CHANGE_FILTER, REMOVE_EXPANDED_POST } from '../app-state/state.reducer';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {
  public readonly ADD_EXPANDED_POST = ADD_EXPANDED_POST;
  public readonly REMOVE_EXPANDED_POST = REMOVE_EXPANDED_POST;

  public posts: Post[];
  public filterTerm: string;
  public isLoading = true;
  private expandedPosts: number[];
  private expandedPosts$: Observable<number[]>;
  private filterText$: Observable<string>;

  constructor(private http: HttpClient, private router: Router, private store: Store<AppState>, private searchService: SearchService) {
    this.expandedPosts$ = this.store.select(state => state.postIds)
    this.filterText$ = this.store.select(state => state.filterText)
  }

  ngOnInit(): void {
    this.filterText$.subscribe(_filterTerm => this.filterTerm = _filterTerm);
    this.expandedPosts$.subscribe(_expandedPosts => this.expandedPosts = _expandedPosts);
    this.searchService.startSearch$.subscribe(() => {
      this.isLoading = true;
      this.posts = [];
    });

    this.searchService.search(this.filterText$).subscribe(posts => {
      this.isLoading = false;
      this.posts = posts;
    });
  }

  public handleExpandedPost(postId: number, actionType: string) {
    this.store.dispatch({ type: actionType, payload: <number>postId })
  }

  public getTogglePosition(postId: number) {
    return this.expandedPosts.includes(postId);
  }

  public filterChange() {
    this.store.dispatch({ type: CHANGE_FILTER, payload: <string>this.filterTerm })
  }

  public clearFilter() {
    this.filterTerm = '';
    this.store.dispatch({ type: CHANGE_FILTER, payload: <string>this.filterTerm })
  }
}
