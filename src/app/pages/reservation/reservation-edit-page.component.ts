import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { ReservationService } from '../../core/services/reservation.service';

@Component({
  selector: 'app-reservation-edit-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './reservation-edit-page.component.html',
  styleUrls: ['./reservation-edit-page.component.scss']
})
export class ReservationEditPageComponent implements OnInit {
  form;
  loading = true;
  reservationId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private router: Router
  ) {
      this.form = this.fb.group({
        name: ['', Validators.required],
        startTime: [null as Date | null, Validators.required],
        endTime: [null as Date | null, Validators.required]
      });
  }

  ngOnInit(): void {
    this.reservationId = Number(this.route.snapshot.paramMap.get('id'));

    this.reservationService.getReservationById(this.reservationId).subscribe({
      next: (res) => {
        this.form.patchValue({
          startTime: new Date(res.startTime),
          endTime: new Date(res.endTime)
        });
        this.loading = false;
      },
      error: () => {
        alert('Error al cargar la reserva.');
        this.router.navigate(['/my-reservations']);
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const formValue = this.form.value;

    const payload = {
      name: formValue.name,
      startTime: (formValue.startTime as Date).toISOString(),
      endTime: (formValue.endTime as Date).toISOString()
    };

    this.reservationService.updateReservation(this.reservationId, payload).subscribe({
      next: () => this.router.navigate(['/my-reservations']),
      error: () => alert('Error al actualizar la reserva.')
    });
  }

  goBack() {
    this.router.navigate(['/my-reservations']);
  }
}
