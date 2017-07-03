import { Component, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';

import gql from 'graphql-tag';

@Component({
  selector: 'app-new-comment',
  template: `
    <p>
      <input type="text" pInputText [(ngModel)]="text" placeholder="comment"/>
      by
      <input type="text" pInputText [(ngModel)]="author" placeholder="author"/>
    </p>
    <p>
      <button pButton type="button" label="Submit" (click)="submit()"></button>
    </p>
  `
})
export class NewCommentComponent {
  @Input() post: number;
  text: string;
  author: string;

  constructor(
    private apollo: Apollo
  ) {}

  submit() {
    this.apollo.mutate({
      mutation: gql`
        mutation newComment($postId: Int!, $text: String!, $author: String!) {
          submitComment(postId: $postId, text: $text, author: $author) {
            id
          }
        }
      `,
      variables: {
        postId: this.post,
        text: this.text,
        author: this.author
      }
    }).subscribe();
  }
}
