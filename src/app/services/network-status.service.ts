import { Injectable } from '@angular/core'
import { Observable, fromEvent, map, merge, of } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class NetworkStatusService {
    constructor() {}

    checkNetworkStatus(): Observable<boolean> {
        return merge(
            of(null),
            fromEvent(window, 'online'),
            fromEvent(window, 'offline')
        ).pipe(map(() => navigator.onLine))
    }
}
