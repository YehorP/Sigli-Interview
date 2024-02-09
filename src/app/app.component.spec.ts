import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { QuotesService } from './services/quotes.service'
import { NetworkStatusService } from './services/network-status.service'
import { of } from 'rxjs'
import { Quote } from './models/quote.model'

describe('AppComponent', () => {
    let component: AppComponent
    let fixture: ComponentFixture<AppComponent>
    let quotesService: QuotesService

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [
                {
                    provide: QuotesService,
                    useValue: {
                        getAllQuotes: jest.fn(),
                        getQuoteOfTheDay: jest.fn(),
                    },
                },
                {
                    provide: NetworkStatusService,
                    useValue: {
                        checkNetworkStatus: jest.fn().mockReturnValue(of(true)),
                    },
                },
            ],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent)
        component = fixture.componentInstance
        quotesService = TestBed.inject(QuotesService)
    })

    afterEach(() => {
        fixture.destroy()
    })

    it('should create the app', () => {
        expect(component).toBeTruthy()
    })

    it('should fetch quotes on initialization', waitForAsync(() => {
        const quotes: Quote[] = [
            { quote: 'Test Quote 1', author: 'Test Author 1' },
            { quote: 'Test Quote 2', author: 'Test Author 2' },
        ]
        const getQuotesSpy = jest
            .spyOn(quotesService, 'getAllQuotes')
            .mockReturnValue(of(quotes))

        component.ngOnInit()

        fixture.whenStable().then(() => {
            fixture.detectChanges()
            expect(getQuotesSpy).toHaveBeenCalled()
        })
    }))

    it('should set quote of the day', () => {
        const quotes: Quote[] = [
            { quote: 'Test Quote 1', author: 'Test Author 1' },
            { quote: 'Test Quote 2', author: 'Test Author 2' },
        ]
        jest.spyOn(quotesService, 'getAllQuotes').mockReturnValue(of(quotes))
        jest.spyOn(quotesService, 'getQuoteOfTheDay').mockReturnValue(quotes[0])
        component.getQuoteOfTheDay(quotes)

        expect(component.quoteOfTheDay).toEqual(quotes[0])
        expect(quotes).toContain(component.quoteOfTheDay)
    })

    it('should unsubscribe on component destruction', () => {
        const destroySpy = jest.spyOn(component.destroy$, 'next')
        const unsubscribeSpy = jest.spyOn(component.destroy$, 'complete')

        component.ngOnDestroy()

        expect(destroySpy).toHaveBeenCalled()
        expect(unsubscribeSpy).toHaveBeenCalled()
    })
})
