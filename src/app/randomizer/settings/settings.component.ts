import { Component, OnInit } from '@angular/core';
import { RandomizerService } from '../randomizer.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(public randomService: RandomizerService) { }

  ngOnInit(): void {
  }

}
