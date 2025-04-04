import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchQuestionComponent } from './search-question.component';

describe('SearchQuestionComponent', () => {
  let component: SearchQuestionComponent;
  let fixture: ComponentFixture<SearchQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
