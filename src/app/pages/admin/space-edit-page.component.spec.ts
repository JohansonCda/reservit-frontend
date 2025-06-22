import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceEditPageComponent } from './space-edit-page.component';

describe('SpaceEditPageComponent', () => {
  let component: SpaceEditPageComponent;
  let fixture: ComponentFixture<SpaceEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceEditPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
