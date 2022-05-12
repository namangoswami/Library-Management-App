import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostIssueComponent } from './post-issue.component';

describe('PostIssueComponent', () => {
  let component: PostIssueComponent;
  let fixture: ComponentFixture<PostIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
