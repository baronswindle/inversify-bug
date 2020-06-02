import "reflect-metadata";

import { decorate, injectable, inject, Container } from "inversify";

const TYPES = {
  KATANA: Symbol("Katana"),
  SHURIKEN: Symbol("Shuriken"),
  WARRIOR: Symbol("Warrior"),
};

interface IKatana {
  hit(): void;
}

interface IShuriken {
  throw(): void;
}

interface IWarrior {
  fight(): void;
  sneak(): void;
}

class Katana implements IKatana {
  hit() {
    console.log("Katana Hit");
  }
}

class Shuriken implements IShuriken {
  throw() {
    console.log("Shuriken Throw");
  }
}

class Ninja implements IWarrior {
  private _katana: IKatana;
  private _shuriken: IShuriken;

  constructor(katana: IKatana, shuriken: IShuriken) {
    this._katana = katana;
    this._shuriken = shuriken;
  }

  fight() {
    this._katana.hit();
  }

  sneak() {
    this._shuriken.throw();
  }
}

decorate(injectable(), Katana);
decorate(injectable(), Shuriken);
decorate(injectable(), Ninja);
decorate(inject(TYPES.KATANA), Ninja, 0);
decorate(inject(TYPES.SHURIKEN), Ninja, 1);

const container = new Container();
container.bind<IWarrior>(TYPES.WARRIOR).to(Ninja);
container.bind<IKatana>(TYPES.KATANA).to(Katana);
container.bind<IShuriken>(TYPES.SHURIKEN).to(Shuriken);

const warrior = container.get<IWarrior>(TYPES.WARRIOR);
warrior.fight();
warrior.sneak();
