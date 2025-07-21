import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceViewDialogComponent } from './invoice-view-dialog.component';

describe('InvoiceViewDialogComponent', () => {
  let component: InvoiceViewDialogComponent;
  let fixture: ComponentFixture<InvoiceViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceViewDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
