import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { QuotesService } from './services/quotes.service';
import { QuotesSliderComponent } from './components/quotes-slider/quotes-slider.component';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { QuoteComponent } from './components/quote/quote.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    QuotesSliderComponent,
    QuoteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule, 
    ReactiveFormsModule
  ],
  providers: [QuotesService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }