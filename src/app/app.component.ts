import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core'
import { QuotesService } from './services/quotes.service'
import { Quote } from './models/quote.model'
import {
    Observable,
    Subject,
    catchError,
    of,
    switchMap,
    takeUntil,
    tap,
    throwError,
} from 'rxjs'
import { NetworkStatusService } from './services/network-status.service'
import { quotesMock } from './mocks/quotes.mock'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
    quoteOfTheDay: Quote
    quotesList: Observable<Quote[]>
    destroy$: Subject<void> = new Subject<void>()

    constructor(
        private readonly __quotesService: QuotesService,
        private readonly __networkStatusService: NetworkStatusService
    ) {}

    ngOnInit() {
        this.quotesList = this.__networkStatusService.checkNetworkStatus().pipe(
            switchMap((isOnline) =>
                isOnline ? this.__quotesService.getAllQuotes() : of(quotesMock)
            ),
            tap((quotes) => this.getQuoteOfTheDay(quotes)),
            catchError((err) => {
                console.error('Error fetching quotes', err)
                return throwError(() => err)
            }),
            takeUntil(this.destroy$)
        )
    }

    ngOnDestroy(): void {
        this.destroy$.next()
        this.destroy$.complete()
    }

    getQuoteOfTheDay(quotes: Quote[]) {
        this.quoteOfTheDay = this.__quotesService.getQuoteOfTheDay(quotes)
    }
}
