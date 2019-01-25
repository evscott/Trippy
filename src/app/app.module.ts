// Angular components
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Redux components
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/login/auth.effects';
import { reducers } from './store/login/auth.state';

// Service components
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';

// App components
import { HomeViewComponent } from './components/home-view/home-view.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    LogInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        component: HomeViewComponent
      },
      {
        path: 'log-in',
        component: LogInComponent
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      }
    ])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
