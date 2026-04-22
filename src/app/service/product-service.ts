import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API='https://jsonplaceholder.typicode.com/posts';
  private cache =new Map<string,any>();
  private capacity =3;
  constructor (private http:HttpClient){}
  getPosts(){
    const key=this.API;
    if (this.cache.has(key)){
      const value =this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key,value);
      return of(value);
    }
    return this.http.get(this.API).pipe(
      tap((data) => {
        if (this.cache.size >=this.capacity){
          const firstKey = this.cache.keys().next().value;
          if (typeof firstKey === 'string') {
            this.cache.delete(firstKey);
          }
        }
        this.cache.set(key,data);
      })
    );
  }
  getWrongPosts(){
    const wrongAPI='https://jsonplaceholder.typicode.com/invalid-endpoint';
    return this.http.get(wrongAPI);
  }
}
