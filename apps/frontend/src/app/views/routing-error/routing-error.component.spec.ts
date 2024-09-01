import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingErrorComponent } from './routing-error.component';

describe('RoutingErrorComponent', () => {
  let component: RoutingErrorComponent;
  let fixture: ComponentFixture<RoutingErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutingErrorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoutingErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
