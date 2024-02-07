import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { QuotesService } from './services/quotes.service';
import { QuotesSliderComponent } from './components/quotes-slider/quotes-slider.component';
import {MatIconModule} from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

@NgModule({
  declarations: [
    AppComponent,
    QuotesSliderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    MatIconModule,
    MatIconModule
  ],
  providers: [QuotesService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }