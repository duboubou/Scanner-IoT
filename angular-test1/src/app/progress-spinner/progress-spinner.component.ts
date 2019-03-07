import {Component, OnInit} from '@angular/core';

/**
 * @title Configurable progress spinner
 */
@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss'],
})
export class ProgressSpinnerComponent implements OnInit {
  color = 'primary';
  mode = 'determinate';
  value = 50;

  constructor() { }

    ngOnInit() {
    }
}
