import { Component, signal, inject } from '@angular/core';
import { Spinner } from '../spinner/spinner';
import { ProductService } from '../../service/product-service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [Spinner],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  private service = inject(ProductService);
  posts =signal<any[]>([]);
  fetchPosts()
{
  this.service.getPosts().subscribe((data:any)=>{
    this.posts.set(data);
  })
  
}
fetchWrongPosts()
{
  this.service.getWrongPosts().subscribe((data:any)=>{
    this.posts.set(data);
  })
}
}

