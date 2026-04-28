import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../model/post';

@Injectable()
export class PostData {

    readonly http =  inject(HttpClient);

    getPost(id: number): Observable<Array<Post>> {
        return this.http.get<Array<Post>>('channel/posts', { params: { id:  1} });
    }
}

