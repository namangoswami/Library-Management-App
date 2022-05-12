import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksParentListComponent } from './books-parent-list.component';

describe('BooksParentListComponent', () => {
  let component: BooksParentListComponent;
  let fixture: ComponentFixture<BooksParentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksParentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksParentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
