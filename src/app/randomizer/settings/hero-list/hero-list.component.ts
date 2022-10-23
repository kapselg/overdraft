import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { heroesList, heroesArr } from 'src/utils/heroInfo';
import { Hero } from 'src/utils/types';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {
  heroesList = heroesList;
  show = false;

  constructor() {
    const formControls: {[key: string]: FormControl} = {};
    Object.entries(heroesArr(heroesList)).forEach(([key, value]) => {
      formControls[value.shortName] = new FormControl(value.defaultOn);
    });
    this.form = new FormGroup(formControls);
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(changes => console.log(Object.keys(changes).filter(key => !!changes[key])))
  }
  roles: ['tank', 'dps', 'support'] = ['tank', 'dps', 'support'];
  rolesDisplay = {
    tank: 'Tanks:',
    dps: 'Attackers:',
    support: 'Healers:'
  }

  form: FormGroup;
}
