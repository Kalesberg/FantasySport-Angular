import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html'
})
export class ArticlesComponent implements OnInit {

  constructor(private articleService:ArticleService) { }

  categories: Array<any>;
  posts: Array<any>;
  media: Array<any>;

  ngOnInit() {
    this.articleService.fetchCategories().subscribe(
      categories => {
        this.categories = categories;
        // console.log(this.categories);
      }
    );
    this.articleService.fetchPosts().subscribe(
      posts => {
        this.posts = posts;
        // console.log(this.posts);
      }
    );
    this.articleService.fetchMedia().subscribe(
      media => {
        this.media = media;
        // console.log(this.media);
      }
    );
  }

  findPosts(id:number) {
    if(!id || !this.posts) return [];
    var posts = [];
    for(var i=0;i<this.posts.length;i++) {
      var post = this.posts[i];
      if(post.categories.indexOf(id) > -1)
        posts.push(post);
    }

    return posts;
  }
  hasPosts(id:number) {
    var posts = this.findPosts(id);
    return posts.length > 0;
  }

  findMedia(id:number) {
    if(!id || !this.media) return false;
    for(var i=0;i<this.media.length;i++) {
      var media = this.media[i];
      if(media.id == id)
        return media.source_url;
    }
  }

}
