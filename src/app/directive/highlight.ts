import { booleanAttribute, Directive, input } from '@angular/core';

@Directive({
    selector: '[highlight]',
    host: {
        '[style.backgroundColor]': `highlight() ? 'red' : 'blue'`,
    }
})
export class Highlight {
    readonly highlight = input.required({transform: booleanAttribute});
}