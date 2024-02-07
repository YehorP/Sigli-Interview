import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { QuotesService } from './services/quotes.service';
import { NetworkStatusService } from './services/network-status.service';
import { of } from 'rxjs';
import { Quote } from './models/quote.model';
import { QuotesSliderComponent } from './components/quotes-slider/quotes-slider.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let quotesService: QuotesService;
  let networkStatusService: NetworkStatusService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, QuotesSliderComponent],
      providers: [
        { provide: QuotesService, useValue: { getQuoteOfTheDay: jest.fn(), getAllQuotes: jest.fn() } },
        { provide: NetworkStatusService, useValue: { checkNetworkStatus: jest.fn().mockReturnValue(of(true)) } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    quotesService = TestBed.inject(QuotesService);
    networkStatusService = TestBed.inject(NetworkStatusService);
  });

  afterEach(() => {
    component.destroy$.next();
    component.destroy$.complete();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should get quote of the day on initialization', () => {
    const quote: Quote = { author: 'Test Author', quote: 'Test quote' };
    const getQuoteOfTheDaySpy = jest.spyOn(quotesService, 'getQuoteOfTheDay').mockReturnValue(quote);
    const checkNetworkStatusSpy = jest.spyOn(networkStatusService, 'checkNetworkStatus').mockReturnValue(of(true));
    const getAllQuotesSpy = jest.spyOn(quotesService, 'getAllQuotes').mockReturnValue(of([]));

    component.ngOnInit();

    expect(checkNetworkStatusSpy).toHaveBeenCalled();
    expect(getAllQuotesSpy).toHaveBeenCalled();
    expect(getQuoteOfTheDaySpy).toHaveBeenCalled();
    expect(component.quoteOfTheDay).toEqual(quote);
  });

  it('should get all quotes on initialization', () => {
    const quotes: Quote[] = [
      { author: 'Author 1', quote: 'Test quote 1' },
      { author: 'Author 2', quote: 'Test quote 2' }
    ];
    const getAllQuotesSpy = jest.spyOn(quotesService, 'getAllQuotes').mockReturnValue(of(quotes));

    component.ngOnInit();

    expect(getAllQuotesSpy).toHaveBeenCalled();
    expect(component.quotesList).toEqual(quotes);
  });

  it('should unsubscribe from observables on component destruction', () => {
    const unsubscribeSpy = jest.spyOn(component.destroy$, 'next');
    const completeSpy = jest.spyOn(component.destroy$, 'complete');

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should fetch quote of the day', () => {
    const quote: Quote = { author: 'Test Author', quote: 'Test quote' };
    const getQuoteOfTheDaySpy = jest.spyOn(quotesService, 'getQuoteOfTheDay').mockReturnValue(quote);

    component.getQuoteOfTheDay();

    expect(getQuoteOfTheDaySpy).toHaveBeenCalled();
    expect(component.quoteOfTheDay).toEqual(quote);
  });

  it('should fetch all quotes', () => {
    const quotes: Quote[] = [
      { author: 'Author 1', quote: 'Test quote 1' },
      { author: 'Author 2', quote: 'Test quote 2' }
    ];
    const getAllQuotesSpy = jest.spyOn(quotesService, 'getAllQuotes').mockReturnValue(of(quotes));

    component.getAllQuotes();

    expect(getAllQuotesSpy).toHaveBeenCalled();
    expect(component.quotesList).toEqual(quotes);
  });
});
