import { from, map } from 'rxjs';

from([1,2,3])
  .pipe(
    map(x => x * 2)
  )
  .subscribe(console.log);