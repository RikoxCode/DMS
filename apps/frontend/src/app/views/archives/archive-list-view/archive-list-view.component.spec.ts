import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveListViewComponent } from './archive-list-view.component';

describe('ArchiveListViewComponent', () => {
  let component: ArchiveListViewComponent;
  let fixture: ComponentFixture<ArchiveListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveListViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchiveListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
