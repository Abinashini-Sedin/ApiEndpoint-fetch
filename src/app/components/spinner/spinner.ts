import { Component, inject } from '@angular/core';
import { LoadingService } from '../../service/loading-service';

@Component({
  selector: 'app-spinner',
  imports: [],
  templateUrl: './spinner.html',
  styleUrl: './spinner.css',
})
export class Spinner {
  loader=inject(LoadingService);
}
