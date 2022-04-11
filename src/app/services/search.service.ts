import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable()
export class SearchService {
  public startSearch$: Subject<void> = new Subject<void>();
  private readonly DEBOUNCE_TIME = 300;
  private readonly SEARCH_ENDPOINT = 'https://jsonplaceholder.typicode.com/posts?q=';

  constructor(private http: HttpClient) {
  }

  public search(terms: Observable<string>): Observable<Post[]> {
    return terms.pipe(
      debounceTime(this.DEBOUNCE_TIME),
      distinctUntilChanged(),
      switchMap(filter => {
        this.startSearch$.next();
        return this.fetchPosts(filter)
      })
    );
  }

  public fetchPosts(filter: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.SEARCH_ENDPOINT}${filter}`);
  }

}
