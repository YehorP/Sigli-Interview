import { TestBed } from '@angular/core/testing'
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing'
import { QuotesService } from './quotes.service'
import { Quote } from '../models/quote.model'
import { environment } from '../../environments/environment.development'

describe('QuotesService', () => {
    let service: QuotesService
    let httpMock: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [QuotesService],
        })
        service = TestBed.inject(QuotesService)
        httpMock = TestBed.inject(HttpTestingController)
    })

    afterEach(() => {
        httpMock.verify()
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('should get dummy quotes', () => {
        const dummyQuotes: Quote[] = [
            { author: 'Author 1', quote: 'Dummy Quote 1' },
            { author: 'Author 2', quote: 'Dummy Quote 2' },
        ]

        service.getDummyQuotes().subscribe((quotes) => {
            expect(quotes).toEqual(dummyQuotes)
        })

        const req = httpMock.expectOne(environment.dummyQuotesUrl)
        expect(req.request.method).toBe('GET')
        req.flush(dummyQuotes)
    })

    it('should get quotes from Quotes Garden', () => {
        const quotesGardenQuotes: Quote[] = [
            { author: 'Author 1', quote: 'Quotes Garden Quote 1' },
            { author: 'Author 2', quote: 'Quotes Garden Quote 2' },
        ]

        service.getQuotesGardeQuote().subscribe((quotes) => {
            expect(quotes).toEqual(quotesGardenQuotes)
        })

        const req = httpMock.expectOne(environment.quotesGardenUrl)
        expect(req.request.method).toBe('GET')
        req.flush(quotesGardenQuotes)
    })

    it('should get quotable quotes', () => {
        const quotableQuotes: Quote[] = [
            { author: 'Author 1', quote: 'Quotable Quote 1' },
            { author: 'Author 2', quote: 'Quotable Quote 2' },
        ]

        service.getQuotableQuotes().subscribe((quotes) => {
            expect(quotes).toEqual(quotableQuotes)
        })

        const req = httpMock.expectOne(environment.quotableUrl)
        expect(req.request.method).toBe('GET')
        req.flush(quotableQuotes)
    })

    it('should get quote of the day', () => {
        const quotes: Quote[] = [
            { author: 'Author 1', quote: 'Quote 1' },
            { author: 'Author 2', quote: 'Quote 2' },
        ]

        const quoteOfTheDay: Quote = service.getQuoteOfTheDay(quotes)

        expect(quoteOfTheDay).toBeDefined()
        expect(quotes).toContain(quoteOfTheDay)
    })

    // Add more test cases for other methods...
})
