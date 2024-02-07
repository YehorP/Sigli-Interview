import {  QuotableQuotes } from './../models/quotable-quote.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, race } from 'rxjs';
import { Quote } from '../models/quote.model';
import { environment } from '../../environments/environment.development';
import { DummyQuotes } from '../models/dummy-quotes.model';
import { QuotesGardenQuotes } from '../models/quotes-garden-quotes.model';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(private __httpClient: HttpClient) { }

  getDummyQuotes(): Observable<Quote[]> {
    return this.__httpClient.get<DummyQuotes>(environment.dummyQuotesUrl).pipe(map(response => response.quotes.map(quote => ({quote: quote.quote, author: quote.author}))));
  }

  getQuotesGardeQuote(): Observable<Quote[]> {
    return this.__httpClient.get<QuotesGardenQuotes>(environment.quotesGardenUrl).pipe(map(response => response.data.map(quote => ({quote: quote.quoteText, author: quote.quoteAuthor}))));
  }

  getQuotableQuotes(): Observable<Quote[]> {
    return this.__httpClient.get<QuotableQuotes>(environment.quotableUrl).pipe(map(response => response.results.map(quote => ({quote: quote.content, author: quote.author}))));
  }

  getAllQuotes(): Observable<Quote[]> {
    return race(this.getDummyQuotes(), this.getQuotesGardeQuote(), this.getQuotableQuotes());
  }

  getQuoteOfTheDay(quotes: Quote[]): Quote {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

}
