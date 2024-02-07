import { Component, Input } from '@angular/core';
import { Quote } from '../../models/quote.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss'
})
export class QuoteComponent {

  @Input() quote: Quote
  rateForm = new FormGroup({rate: new FormControl<number | null>(null, [Validators.required])});
 
  handleSubmit(): void {
   this.quote.rate = this.rateForm.value.rate as number;
  }


  shareQuote(): void {
    if(navigator.share) {
      navigator.share({
        title: 'Quote',
        text: `${this.quote.quote} - ${this.quote.author}`,
        url: 'https://quotes.com'
      })
    }
  }
}
