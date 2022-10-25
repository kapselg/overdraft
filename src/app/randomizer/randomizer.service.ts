import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { heroesArr, heroesList } from 'src/utils/heroInfo';
import { Hero, HeroListType, Layout, Role } from 'src/utils/types';
import { SettingsService } from './settings/settings.service';
const emptyHero: Hero = {
  name: '',
  image: 'assets/any.svg',
  background: '',
  role: 'any',
  shortName: '',
  defaultOn: false
};
@Injectable({
  providedIn: 'root',
})
export class RandomizerService {
  constructor(private settingsService: SettingsService) {
    this.settingsService.selectedHeroes.subscribe(val => this.heroesList = val);
  }

  pickedHeroes = new Subject<(Hero)[]>();
  roles: Role[] = [];

  heroesList: HeroListType = heroesList;

  singleMode = new BehaviorSubject<boolean>(true);
  configuratorMode = new BehaviorSubject<boolean>(false);
  controls = new BehaviorSubject<boolean>(false);

  randomHero(heroArr: Hero[]): Hero {
    return heroArr[Math.floor(Math.random() * heroArr.length)];
  }

  clear() {
    this.configuratorMode.next(false);
    this.controls.next(false);
  }

  //configurator logic
  setupConfigurator() {
    this.controls.next(true);
    this.roles = new Array(5).fill('any');
    this.pickedHeroes.next(new Array(5).fill(''));
    this.configuratorMode.next(true);
  }

  runConfiguration() {
    const alreadyUsedHeroes: Hero[] = [];

    //filtering logic to avoid duplicate heroes
    function checkAlreadyUsed(hero: Hero) {
      for (let alreadyUsedHero of alreadyUsedHeroes) {
        if (alreadyUsedHero.name === hero.name) return false;
      }
      return true;
    }

    const newHeroes = new Array(5).fill('').map((val, index) => {
      let desiredRole = this.roles[index];
      let result;
      if (desiredRole === 'any') {
        //pick from all roles if any
        result = this.randomHero(
          Object.values(heroesArr(this.heroesList)).filter((hero) => checkAlreadyUsed(hero))
        );
      } else {
        //otherwise pick from desired role

        //check if there are any heroes in the role
        if(this.heroesList[desiredRole].length === 0) return emptyHero;
        result = this.randomHero(
          [...this.heroesList[desiredRole]].filter((hero) => checkAlreadyUsed(hero))
        );
      }
      alreadyUsedHeroes.push(result);
      return result;
    });
    this.configuratorMode.next(false);
    this.pickedHeroes.next(newHeroes);
  }

  changeRole(role: Role, index: number) {
    this.roles[index] = role;
  }

  //simple generation logic

  generateOne() {
    this.clear();
    const newHeroes = new Array();

    newHeroes[0] = this.randomHero(heroesArr(this.heroesList));

    this.pickedHeroes.next(newHeroes);
  }

  generateDeck() {
    this.clear();
    const result: Hero[] = new Array();



    result[0] = this.heroesList['tank'].length > 0 ? this.randomHero(this.heroesList['tank']) : emptyHero;

    if(this.heroesList['dps'].length > 0){
      result[1] = this.randomHero(this.heroesList['dps']);
      result[2] = this.randomHero(
        [...this.heroesList['dps']].filter((hero) => hero.name !== result[1].name)
      );
    } else {
      result[1] = result[2] = emptyHero;
    }

    if(this.heroesList['support'].length > 0){
    result[3] = this.randomHero(this.heroesList['support']);
    result[4] = this.randomHero(
      [...this.heroesList['support']].filter((hero) => hero.name !== result[3].name)
    );
    }else {
      result[3] = result[4] = emptyHero;
    }

    this.pickedHeroes.next(result);
  }
}
