import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuotesSliderComponent } from './quotes-slider.component';
import { Quote } from '../../models/quote.model';

describe('QuotesSliderComponent', () => {
  let component: QuotesSliderComponent;
  let fixture: ComponentFixture<QuotesSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuotesSliderComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set quotesList input correctly', () => {
    const quotes: Quote[] = [
      { author: 'Author 1', quote: 'Quote 1' },
      { author: 'Author 2', quote: 'Quote 2' },
      { author: 'Author 3', quote: 'Quote 3' }
    ];
    component.quotesList = quotes;
    expect(component.quotes).toEqual(quotes);
  });

  it('should increment sliderQuoteIndex on nextQuote', () => {
    component.sliderQuoteIndex = 0;
    component.quotes = [
      { author: 'Author 1', quote: 'Quote 1' },
      { author: 'Author 2', quote: 'Quote 2' },
      { author: 'Author 3', quote: 'Quote 3' }
    ];
    component.nextQuote();
    expect(component.sliderQuoteIndex).toBe(1);
  });

  it('should decrement sliderQuoteIndex on prevQuote', () => {
    component.sliderQuoteIndex = 1;
    component.quotes = [
      { author: 'Author 1', quote: 'Quote 1' },
      { author: 'Author 2', quote: 'Quote 2' },
      { author: 'Author 3', quote: 'Quote 3' }
    ];
    component.prevQuote();
    expect(component.sliderQuoteIndex).toBe(0);
  });
});
