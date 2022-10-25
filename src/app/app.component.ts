import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AppService } from './app.service';
import { RandomizerService } from './randomizer/randomizer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
}
//TODO: allow selecting multiple roles in configurator
//TODO: routing
//TODO: mobile responsiveness
//TODO: preload with loading bar https://stackblitz.com/edit/angular-preload-images?file=src%2Fapp%2Fapp.component.ts
