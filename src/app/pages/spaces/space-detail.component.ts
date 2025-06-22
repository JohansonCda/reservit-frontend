import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../../core/services/reservation.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-space-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './space-detail.component.html',
  styleUrls: ['./space-detail.component.scss']
})
export class SpaceDetailComponent implements OnInit {
  space: any;
  loading = true;
  error = '';

  reservation = {
    date: null as Date | null,
    startTime: '',
    endTime: '',
    name: ''
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private reservationService: ReservationService,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`/api/spaces/${id}`).subscribe({
      next: (data) => {
        this.space = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el detalle del espacio.';
        this.loading = false;
      }
    });
  }

  makeReservation() {
    const { name, date, startTime, endTime } = this.reservation;

    if (!date || !startTime || !endTime || !name) {
      this.notification.error('Debes completar todos los campos');
      return;
    }

    const startDateTime = new Date(date);
    const [startH, startM] = startTime.split(':');
    startDateTime.setHours(+startH, +startM, 0, 0);

    const endDateTime = new Date(date);
    const [endH, endM] = endTime.split(':');
    endDateTime.setHours(+endH, +endM, 0, 0);

    const payload = {
      name: this.reservation.name,
      space: this.space['@id'],
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString()
    };

    this.reservationService.createReservation(payload).subscribe({
      next: () => {
        this.notification.success('Reserva realizada con éxito');
        //this.router.navigate(['/reservations']);
      },
      error: (err) => {
        console.error(err.error.detail);
        let msg = err?.error?.detail || 'Error al realizar la reserva';

        if(err?.error?.detail == 'Reservation already exists in that time range.'){
          msg = 'Ya existe una reserva en esta fecha.';
        }

        this.notification.error(msg);
      }
    });
  }

  goBack() {
    this.router.navigate(['/spaces']);
  }
}
