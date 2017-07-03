import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  template: `
    <p>
      {{comment?.author}} <i>by {{comment?.text}}</i>
    </p>
  `
})
export class CommentComponent {
  @Input() comment: any;
}
