import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetQuestionsByUseridComponent } from './get-questions-by-userid.component';

describe('GetQuestionsByUseridComponent', () => {
  let component: GetQuestionsByUseridComponent;
  let fixture: ComponentFixture<GetQuestionsByUseridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetQuestionsByUseridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetQuestionsByUseridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
