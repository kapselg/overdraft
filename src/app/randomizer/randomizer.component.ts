import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/utils/types';
import { RandomizerService } from './randomizer.service';

@Component({
  selector: 'app-randomizer',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.scss']
})
export class RandomizerComponent implements OnInit {

  constructor(private randomService: RandomizerService) { }
  multiple = this.randomService.singleMode;
  heroes!: Hero[];
  ngOnInit(): void {
    this.randomService.pickedHeroes.subscribe(heroes => this.heroes = heroes);
    this.randomService.generateOne();
  }

}
