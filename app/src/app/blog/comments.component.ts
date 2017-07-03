import { Component, Input, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs/Subscription';

import gql from 'graphql-tag';

@Component({
  selector: 'app-comments',
  template: `
    <p-fieldset legend="Comments">
      <app-comment
        [comment]="comment"
        *ngFor="let comment of comments | async | select: 'comments'">
      </app-comment>
    </p-fieldset>
  `
})
export class CommentsComponent implements OnInit {
  @Input() post: number;
  comments: any;
  commentSub: Subscription;

  constructor(
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.comments = this.apollo.watchQuery({
      query: gql`
        query getComments($postId: Int!) {
          comments(postId: $postId) {
            text
            author
          }
        }
      `,
      variables: {
        postId: this.post
      }
    });

    this.commentSub = this.apollo.subscribe({
      query: gql`
        subscription comment($postId: Int) {
          newComment(postId: $postId) {
            text
            author
          }
        }
      `,
      variables: {
        postId: this.post
      }
    }).subscribe(({newComment}) => {
      this.comments.updateQuery((prev) => {
        return Object.assign({}, prev, { comments: [...prev.comments, newComment] });
      });
    });
  }
}
