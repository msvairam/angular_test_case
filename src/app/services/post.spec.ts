import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PostData }  from './post';
import { catchError, firstValueFrom, of } from 'rxjs';
import { httpInterceptor } from '../interceptor/auth.interceptor';

describe('Post Service Validation', () => {
    TestBed.configureTestingModule({
        providers:[PostData, 
            provideHttpClient(),
            provideHttpClientTesting(),
            withInterceptors([httpInterceptor])]
    });

    const httpClient = TestBed.inject(HttpTestingController);
    const service = TestBed.inject(PostData);


   it ('should data coming by id', async () => {

        service.getPost(1).subscribe((data) => {
            expect(data).toStrictEqual([
                {
                    "userId": 1,
                    "id": 1,
                    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                }
                ]);
        });
    
        const req = httpClient.expectOne('channel/posts?id=1');

        expect(req.request.params.get('id')).toBe('1');

        expect(req.request.headers.get('X-Authentication'), 'Validate Authentication Token').toBe('brear Vairam')

         expect(req.request.method).toBe('GET');

        req.flush([
            {
                "userId": 1,
                "id": 1,
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
            }
        ]);


    
    });
/*
    it('should be error',async () => {


        service.getPost(2).subscribe({
    next: () => console.error('should have failed with 404'),
    error: (error) => expect(error.status).toBe(500)
  });
    
        const req1 = httpClient.expectOne('channel/posts?id=2');

        console.log(req1);

        req1.flush('Failed!', {status: 500, statusText: 'Internal Server Error'});
    }); 
*/
    afterEach(() => {
        httpClient.verify();
    })
  
})