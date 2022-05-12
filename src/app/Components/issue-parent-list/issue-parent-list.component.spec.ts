import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueParentListComponent } from './issue-parent-list.component';

describe('IssueParentListComponent', () => {
  let component: IssueParentListComponent;
  let fixture: ComponentFixture<IssueParentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueParentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueParentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
