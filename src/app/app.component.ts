import { Component, OnDestroy } from '@angular/core';
import { QuotesService } from './services/quotes.service';
import { Quote } from './models/quote.model';
import { Subject, takeUntil } from 'rxjs';
import { NetworkStatusService } from './services/network-status.service';
import { quotesMock } from './mocks/quotes.mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  quoteOfTheDay: Quote;
  quotesList: Quote[];
  destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly __quotesService: QuotesService, private readonly __networkStatusService: NetworkStatusService) {}

  ngOnInit() {
    this.__networkStatusService.checkNetworkStatus().pipe(takeUntil(this.destroy$)).subscribe((isOnline) => {
      if(isOnline) {
        this.getAllQuotes();
        return;
      }
      this.quotesList = quotesMock;
      this.quoteOfTheDay = this.__quotesService.getQuoteOfTheDay(this.quotesList);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getQuoteOfTheDay() {
    this.quoteOfTheDay = this.__quotesService.getQuoteOfTheDay(this.quotesList);
  }

  getAllQuotes() {
    this.__quotesService.getAllQuotes()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      {
        next: (quotes: Quote[]) => {
          this.quotesList = quotes;
          this.quoteOfTheDay = this.__quotesService.getQuoteOfTheDay(quotes);
        },
        error: (error) => {
          console.error('Error fetching quotes', error);
        }
      }
    );
  }
}
