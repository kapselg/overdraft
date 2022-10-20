import { Component, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Hero, Role } from 'src/utils/types';
import { heroes, roles } from 'src/utils/heroInfo';
import { RandomizerService } from '../randomizer.service';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  constructor(private randomService: RandomizerService) {}

  @Input() hero!: Hero;
  @Input() index!: number;
  configurator!: boolean;
  selectedRole!: Role | null;

  player: string = '';

  roleIcons = {
    tank: 'assets/tank.svg',
    support: 'assets/support.svg',
    dps: 'assets/dps.svg',
    any: 'assets/any.svg',
  };

  handleRoleChange(role: Role){
    this.randomService.changeRole(role, this.index);
    this.selectedRole = role;
  }

  ngOnInit(): void {
    this.player = `P${this.index}`;
    this.randomService.configuratorMode.subscribe(val => {this.configurator = val; if(val) this.selectedRole = 'any'});
  }

}
