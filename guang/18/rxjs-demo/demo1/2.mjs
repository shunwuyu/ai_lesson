import { from } from 'rxjs';

const stream = from([1,2,3]);

stream.subscribe(v => console.log(v));