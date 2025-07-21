import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPaymentDialogComponent } from './view-payment-dialog.component';

describe('ViewPaymentDialogComponent', () => {
  let component: ViewPaymentDialogComponent;
  let fixture: ComponentFixture<ViewPaymentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPaymentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
