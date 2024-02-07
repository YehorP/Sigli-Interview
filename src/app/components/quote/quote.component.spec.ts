import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { QuoteComponent } from './quote.component';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('QuoteComponent', () => {
  let component: QuoteComponent;
  let fixture: ComponentFixture<QuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuoteComponent],
      imports: [    
        MatIconModule,
        MatFormFieldModule, 
        MatSelectModule, 
        MatInputModule, 
        ReactiveFormsModule,
        NoopAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a quote input', () => {
    const quote = { quote: 'Test quote', author: 'Test author', rating: 5 };
    component.quote = quote;
    fixture.detectChanges();
    expect(component.quote).toEqual(quote);
  });

  it('should have a rateForm with rate control', () => {
    expect(component.rateForm.get('rate')).toBeTruthy();
  });

  it('should require rate field to be filled', () => {
    const rateControl = component.rateForm.get('rate');
    rateControl?.setValue(null);
    expect(rateControl?.valid).toBeFalsy();
    rateControl?.setValue(5);
    expect(rateControl?.valid).toBeTruthy();
  });

  it('should call handleSubmit method on form submission', () => {
    const quote = { quote: 'Test quote', author: 'Test author'};
    component.handleSubmit = jest.fn();
    component.quote = quote;
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    expect(component.handleSubmit).toHaveBeenCalled();
  });

  it('should call shareQuote method on share button click', () => {
    const quote = { quote: 'Test quote', author: 'Test author' };
    component.quote = quote;
    component.shareQuote = jest.fn();
    fixture.detectChanges();
    const shareButton = fixture.nativeElement.querySelector('.share-button');
    shareButton.click();
    expect(component.shareQuote).toHaveBeenCalled();
  });
});
