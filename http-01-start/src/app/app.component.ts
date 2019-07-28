import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, reduce} from 'rxjs/operators';
import {PostsService} from './posts.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private subscription: Subscription;

  constructor(private http: HttpClient,
              private postService: PostsService) {
  }

  ngOnInit() {
    this.subscription = this.postService.error$
      .subscribe(err => this.error = err);
    this.fetchPosts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    this.postService.clearPosts()
      .subscribe(() => {
        this.loadedPosts = [];
      });
  }

  private fetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts()
      .subscribe(
        posts => {
          this.isFetching = false;
          this.loadedPosts = posts;
          this.error = null;
        },
        err => {
          console.log(err);
          this.error = err.error.error;
          this.isFetching = false;
        });
  }

  onHandleError() {
    this.error = null;
  }
}
