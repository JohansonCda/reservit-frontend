import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceCreatePageComponent } from './space-create-page.component';

describe('SpaceCreatePageComponent', () => {
  let component: SpaceCreatePageComponent;
  let fixture: ComponentFixture<SpaceCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceCreatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
