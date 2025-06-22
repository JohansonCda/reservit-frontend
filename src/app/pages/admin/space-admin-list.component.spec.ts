import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceAdminListComponent } from './space-admin-list.component';

describe('SpaceAdminListComponent', () => {
  let component: SpaceAdminListComponent;
  let fixture: ComponentFixture<SpaceAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceAdminListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
