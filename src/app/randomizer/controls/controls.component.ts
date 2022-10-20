import { Component, OnInit } from '@angular/core';
import { RandomizerService } from '../randomizer.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  constructor(public randomService: RandomizerService) { }

  ngOnInit(): void {
  }

}
