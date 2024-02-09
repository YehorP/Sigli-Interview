import { Component, Input } from '@angular/core'
import { Quote } from '../../models/quote.model'

@Component({
    selector: 'app-quotes-slider',
    templateUrl: './quotes-slider.component.html',
    styleUrl: './quotes-slider.component.scss',
})
export class QuotesSliderComponent {
    @Input() set quotesList(quotes: Quote[]) {
        if (quotes) {
            this.quotes = quotes
            this.sliderQuoteIndex = quotes.length > 0 ? 0 : -1
            this.interval !== undefined &&
                this.interval !== null &&
                clearInterval(this.interval)
            this.interval = setInterval(() => this.nextQuote(), 8000)
        }
    }

    interval: NodeJS.Timeout
    sliderQuoteIndex: number
    quotes: Quote[]

    nextQuote() {
        this.sliderQuoteIndex =
            this.sliderQuoteIndex + 1 > this.quotes.length - 1
                ? 0
                : this.sliderQuoteIndex + 1
    }

    prevQuote() {
        this.sliderQuoteIndex =
            this.sliderQuoteIndex - 1 < 0
                ? this.quotes.length - 1
                : this.sliderQuoteIndex - 1
    }
}
