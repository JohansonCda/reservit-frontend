import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MyReservationsPageComponent } from './my-reservations-page.component';
import { ReservationService } from '../../core/services/reservation.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../core/services/auth.service';
import { SpaceService } from '../../core/services/space.service';

fdescribe('MyReservationsPageComponent', () => {
  let component: MyReservationsPageComponent;
  let fixture: ComponentFixture<MyReservationsPageComponent>;
  let mockReservationService: any;
  let mockAuthService: any;
  let mockSpaceService: any;

  beforeEach(waitForAsync(() => {
    mockReservationService = {
      getUserReservations: jasmine.createSpy().and.returnValue(of({ member: [] }))
    };
    mockAuthService = {
      isAdmin: jasmine.createSpy().and.returnValue(false)
    };
    mockSpaceService = {
      getSpace: jasmine.createSpy().and.callFake((id: number) =>
        of({ id, name: 'Espacio de prueba' })
      )
    };

    TestBed.configureTestingModule({
      imports: [MyReservationsPageComponent, RouterTestingModule],
      providers: [
        { provide: ReservationService, useValue: mockReservationService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: SpaceService, useValue: mockSpaceService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReservationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente la reserva', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar las reservas del usuario al iniciar', () => {
    expect(mockReservationService.getUserReservations).toHaveBeenCalled();
  });
});
