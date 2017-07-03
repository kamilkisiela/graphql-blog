import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  template: `
    <div class="ui-g">
      <div class="ui-g-6">
        <app-post [id]="postId"></app-post>
      </div>

      <div class="ui-g-6">
        <app-comments [post]="postId"></app-comments>
        <app-new-comment [post]="postId"></app-new-comment>
      </div>
    </div>
  `
})
export class BlogComponent {
  postId = 1;
}
