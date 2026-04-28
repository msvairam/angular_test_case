import { TestBed } from '@angular/core/testing';
import { configData } from './config';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';

describe('config Service',async () => {

    TestBed.configureTestingModule({
        providers: [configData, provideHttpClient(), provideHttpClientTesting ]
    });

    //const httpTesting = TestBed.inject(HttpTestingController);
it('should be config value', async () => {
    const service = TestBed.inject(configData);
    const config$ = service.getConfig();

    const configPromise = firstValueFrom(config$);

    expect(await configPromise).toStrictEqual({
            filter:  true,
            editable: true,
            show : true,
            label: true,
        });

        })
})