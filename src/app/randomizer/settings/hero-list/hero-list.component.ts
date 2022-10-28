import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { heroesList, heroesArr } from 'src/utils/heroInfo';
import { Hero } from 'src/utils/types';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
})
export class HeroListComponent implements OnInit {
  heroesList = heroesList;
  show = false;

  constructor(private settingsService: SettingsService) {
    const formControls: { [key: string]: FormControl } = {};
    Object.values(heroesArr(heroesList)).forEach(value => {
      formControls[value.shortName] = new FormControl(
        value.defaultOn
      );
    });
    this.form = new FormGroup(formControls);
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((changes) =>
      this.settingsService.updateHeroList(
        Object.keys(changes).filter((key) => !!changes[key])
      )
    );
  }

  resetRoles(role: string): void{
    const newFormValue: {[key: string]: any} = {...this.form.value};
    //list of hero names in role
    const freshHeroDefaultList = this.heroesList[role].map(hero => hero.defaultOn);
    //and list of their default state (enabled or disabled)
    const freshHeroNamesList = this.heroesList[role].map(hero => hero.shortName);
    Object.entries(this.form.value).forEach(([key,val])=>{
      //check if hero is in role
      let index = freshHeroNamesList.indexOf(key)
      if(index !== -1) newFormValue[key] = freshHeroDefaultList[index];
    })

    this.form.setValue(newFormValue);
  }

  roles: ['tank', 'dps', 'support'] = ['tank', 'dps', 'support'];
  rolesDisplay = {
    tank: 'Tanks:',
    dps: 'Attackers:',
    support: 'Healers:',
  };

  form: FormGroup;
}
