import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { heroesList, heroesArr } from 'src/utils/heroInfo';
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
    const formControls: { [key: string]: UntypedFormControl } = {};
    heroesArr(heroesList).forEach(value => {
      formControls[value.shortName] = new UntypedFormControl(
        value.defaultOn
      );
    });
    this.form = new UntypedFormGroup(formControls);
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((changes) =>
      this.settingsService.updateHeroList(
        Object.keys(changes).filter((key) => !!changes[key])
      )
    );
  }

  selectAll(role: string): void {
    const newFormValue: { [key: string]: any } = { ...this.form.value };
    this.heroesList[role].forEach((hero) => {
      newFormValue[hero.shortName] = true;
    });
    this.form.setValue(newFormValue);
  }

  deselectAll(role: string): void {
    const newFormValue: { [key: string]: any } = { ...this.form.value };
    this.heroesList[role].forEach((hero) => {
      newFormValue[hero.shortName] = false;
    });
    this.form.setValue(newFormValue);

  }

  roles: ['tank', 'dps', 'support'] = ['tank', 'dps', 'support'];
  rolesDisplay = {
    tank: 'Tanks:',
    dps: 'Attackers:',
    support: 'Healers:',
  };

  form: UntypedFormGroup;
}
