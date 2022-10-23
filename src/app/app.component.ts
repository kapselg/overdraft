import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RandomizerService } from './randomizer/randomizer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
//TODO: add option to disable unique heroes
//TODO: allow selecting multiple roles in configurator
//TODO: routing
//TODO: mobile responsiveness
//TODO: preload with loading bar https://stackblitz.com/edit/angular-preload-images?file=src%2Fapp%2Fapp.component.ts
