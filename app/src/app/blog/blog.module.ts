import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanelModule, FieldsetModule, InputTextModule, ButtonModule } from 'primeng/primeng';
import { ApolloModule } from 'apollo-angular';

import { provideClient } from './apollo';
import { BlogComponent } from './blog.component';
import { PostComponent } from './post.component';
import { CommentComponent } from './comment.component';
import { CommentsComponent } from './comments.component';
import { NewCommentComponent } from './new-comment.component';

@NgModule({
  declarations: [
    BlogComponent,
    PostComponent,
    CommentComponent,
    CommentsComponent,
    NewCommentComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    PanelModule,
    FieldsetModule,
    InputTextModule,
    ButtonModule,
    ApolloModule.withClient(provideClient)
  ],
  exports: [
    BlogComponent
  ],
  providers: []
})
export class BlogModule { }
