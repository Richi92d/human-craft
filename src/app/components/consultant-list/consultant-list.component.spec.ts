import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConsultantListComponent } from './consultant-list.component';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { ConsultantEffects } from '../../store/effects/consultant.effect';
import { consultantReducer } from '../../store/reducer/consultant.reducer';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ConsultantListComponent', () => {
  let component: ConsultantListComponent;
  let fixture: ComponentFixture<ConsultantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultantListComponent, HttpClientTestingModule, CommonModule, BrowserAnimationsModule],
      providers: [provideStore({ consultant: consultantReducer }),
      provideEffects([ConsultantEffects])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConsultantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
