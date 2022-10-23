import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { heroesArr, heroesList } from 'src/utils/heroInfo';
import { Hero, Layout, Role } from 'src/utils/types';

@Injectable({
  providedIn: 'root',
})
export class RandomizerService {
  constructor() {}

  heroes = new Subject<Hero[]>();
  roles: Role[] = [];

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
    this.heroes.next(new Array(5).fill(''));
    this.configuratorMode.next(true);
  }

  runConfigurator() {
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
          Object.values(heroesArr(heroesList)).filter((hero) => checkAlreadyUsed(hero))
        );
      } else {
        //otherwise pick from desired role
        result = this.randomHero(
          [...heroesList[desiredRole]].filter((hero) => checkAlreadyUsed(hero))
        );
      }
      alreadyUsedHeroes.push(result);
      return result;
    });
    this.configuratorMode.next(false);
    this.heroes.next(newHeroes);
  }

  changeRole(role: Role, index: number) {
    this.roles[index] = role;
  }

  //simple generation logic

  generateOne() {
    this.clear();
    const newHeroes = new Array();

    newHeroes[0] = this.randomHero(heroesArr(heroesList));

    this.heroes.next(newHeroes);
  }

  generateDeck() {
    this.clear();
    const result: Hero[] = new Array();

    result[0] = this.randomHero(heroesList.tank);
    result[1] = this.randomHero(heroesList.dps);
    result[2] = this.randomHero(
      [...heroesList.dps].filter((hero) => hero.name !== result[1].name)
    );
    result[3] = this.randomHero(heroesList.support);
    result[4] = this.randomHero(
      [...heroesList.support].filter((hero) => hero.name !== result[3].name)
    );

    this.heroes.next(result);
  }
}
