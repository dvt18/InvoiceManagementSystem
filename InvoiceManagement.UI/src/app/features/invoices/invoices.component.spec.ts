import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceComponent } from './invoices.component';

describe('InvoicesComponent', () => {
  let component: InvoiceComponent;
  let fixture: ComponentFixture<InvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
