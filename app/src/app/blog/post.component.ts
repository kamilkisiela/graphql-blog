import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { Subscription } from 'rxjs/Subscription';

import gql from 'graphql-tag';

const postQuery = gql`
  query getPost($id: Int!) {
    post(id: $id) {
      title
      text
      author
      likes
    }
  }
`

@Component({
  selector: 'app-post',
  template: `
    <p-panel header="{{post?.title}}">
      <p-header>
        <small>
          by {{post?.author}}
        </small>
      </p-header>

      {{post?.text}}

      <p-footer>
        <button (click)="dislike()">-1</button>
        Likes: <strong>{{post?.likes}}</strong>
        <button (click)="like()">+1</button>
      </p-footer>
    </p-panel>
  `
})
export class PostComponent implements OnInit, OnDestroy {
  @Input() id: number;
  post: any;
  post$: ApolloQueryObservable<any>;
  likesSub: Subscription;

  constructor(
    private apollo: Apollo
  ) {}

  ngOnInit() {
    // get the post
    this.post$ = this.apollo.watchQuery({
      query: postQuery,
      variables: {
        id: this.id
      }
    });

    this.post$.subscribe(({data}) => {
      this.post = data.post;
    });

    // listen to likes
    this.likesSub = this.apollo.subscribe({
      query: gql`
        subscription likes($id: Int!) {
          postLike(id: $id) {
            post {
              likes
            }
          }
        }
      `,
      variables: {
        id: this.id
      }
    }).subscribe(({postLike}) => {
      this.post$.updateQuery((prev) => {
        const newPost = Object.assign({}, prev.post, { likes: postLike.post.likes });

        return Object.assign({}, prev, { post: newPost });
      });
    });
  }

  ngOnDestroy() {
    if (this.likesSub) {
      this.likesSub.unsubscribe();
      this.likesSub = undefined;
    }
  }

  like() {
    this.apollo.mutate({
      mutation: gql`
        mutation like($id: Int!) {
          likePost(id: $id) {
            id
            likes
          }
        }
      `,
      variables: {
        id: this.id
      }
    }).subscribe(({data}) => {
      // console.log('liked', data);
    });
  }

  dislike() {
    this.apollo.mutate({
      mutation: gql`
        mutation dislike($id: Int!) {
          dislikePost(id: $id) {
            id
            likes
          }
        }
      `,
      variables: {
        id: this.id
      }
    }).subscribe(({data}) => {
      // console.log('disliked', data);
    });
  }
}
