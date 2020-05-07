import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../.model/post';
import { PostService } from '../services/post.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() post: Post;
  constructor(private postService: PostService, private alertify: AlertifyService) { }

  ngOnInit() {
   
  }
}
