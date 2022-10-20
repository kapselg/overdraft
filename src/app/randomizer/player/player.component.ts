import { Component, OnInit } from '@angular/core';
import { Hero, Role } from 'src/utils/types';
import { heroes, roles } from 'src/utils/heroInfo';
import { RandomizerService } from '../randomizer.service';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  constructor(private randomService: RandomizerService) {
    this.hero = this.randomService.randomHero(Object.values(heroes));
    this._role = this.hero.role;
  }

  roleIcons = {
    tank: 'assets/tank.svg',
    support: 'assets/support.svg',
    dps: 'assets/dps.svg',
    any: 'assets/any.svg',
  };

  hero!: Hero;
  private _role: Role = 'dps';

  get role(): Role {
    return this._role ? this._role : this.hero.role;
  }

  ngOnInit(): void {}

}
