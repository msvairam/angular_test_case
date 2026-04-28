import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Config {
    filter: boolean,
    editable: boolean,
    show: boolean,
    label: boolean,
}

@Injectable()
export class configData {
    getConfig(): Observable<Config> {
        return of({
            filter:  true,
            editable: true,
            show : true,
            label: true,
        })
    }
}