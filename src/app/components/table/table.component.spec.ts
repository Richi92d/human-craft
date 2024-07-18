import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideStore, Store, StoreModule } from '@ngrx/store';
import { TableComponent } from './table.component';
import { provideEffects } from '@ngrx/effects';
import { consultantReducer } from '../../store/reducer/consultant.reducer';
import { ConsultantEffects } from '../../store/effects/consultant.effect';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent, HttpClientTestingModule, StoreModule, CommonModule, BrowserAnimationsModule],
      providers: [provideStore({ consultant: consultantReducer }),
      provideEffects([ConsultantEffects])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
