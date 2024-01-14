"use strict";

const T = {
  Grass: "Grass",
  Fire: "Fire",
  Water: "Water",
  Electric: "Electric",
  Flying: "Flying",
  Bug: "Bug",
  Fighting: "Fighting",
  Rock: "Rock",
  Ground: "Ground",
  Normal: "Normal",
  Poison: "Poison",
  Psychic: "Psychic",
  Ghost: "Ghost",
  Ice: "Ice",
  Dragon: "Dragon",
  Dark: "Dark",
  Steel: "Steel",
  Fairy: "Fairy",
};

//
// Note: missing piece of information is what types are super effective _against_ a type
// (e.g. in its own information block), but that is calculated in addMissingPiece()
//
const Resistances = {
  [T.Grass]: {
    NoEffect: [],
    NotVery: [T.Grass, T.Fire, T.Flying, T.Bug, T.Poison, T.Dragon, T.Steel],
    Super: [T.Water, T.Rock, T.Ground],
  },
  [T.Fire]: {
    NoEffect: [],
    NotVery: [T.Fire, T.Water, T.Rock, T.Dragon],
    Super: [T.Grass, T.Bug, T.Ice, T.Steel],
  },
  [T.Water]: {
    NoEffect: [],
    NotVery: [T.Grass, T.Water, T.Dragon],
    Super: [T.Fire, T.Ground, T.Rock],
  },
  [T.Electric]: {
    NoEffect: [T.Ground],
    NotVery: [T.Grass, T.Electric, T.Dragon],
    Super: [T.Water, T.Flying],
  },
  [T.Flying]: {
    NoEffect: [],
    NotVery: [T.Electric, T.Rock, T.Steel],
    Super: [T.Grass, T.Bug, T.Fighting],
  },
  [T.Bug]: {
    NoEffect: [],
    NotVery: [
      T.Fire,
      T.Flying,
      T.Fighting,
      T.Poison,
      T.Ghost,
      T.Steel,
      T.Fairy,
    ],
    Super: [T.Grass, T.Psychic, T.Dark],
  },
  [T.Fighting]: {
    NoEffect: [T.Ghost],
    NotVery: [T.Flying, T.Bug, T.Poison, T.Psychic, T.Fairy],
    Super: [T.Rock, T.Normal, T.Dark, T.Ice, T.Steel],
  },
  [T.Rock]: {
    NoEffect: [],
    NotVery: [T.Fighting, T.Ground, T.Steel],
    Super: [T.Fire, T.Flying, T.Bug, T.Ice],
  },
  [T.Ground]: {
    NoEffect: [T.Flying],
    NotVery: [T.Grass, T.Bug],
    Super: [T.Fire, T.Electric, T.Rock, T.Poison, T.Steel],
  },
  [T.Normal]: {
    NoEffect: [T.Ghost],
    NotVery: [T.Rock, T.Steel],
    Super: [],
  },
  [T.Poison]: {
    NoEffect: [T.Steel],
    NotVery: [T.Rock, T.Ground, T.Poison, T.Ghost],
    Super: [T.Grass, T.Fairy],
  },
  [T.Psychic]: {
    NoEffect: [T.Dark],
    NotVery: [T.Psychic, T.Steel],
    Super: [T.Fighting, T.Poison],
  },
  [T.Ghost]: {
    NoEffect: [T.Normal],
    NotVery: [T.Dark],
    Super: [T.Psychic, T.Ghost],
  },
  [T.Ice]: {
    NoEffect: [],
    NotVery: [T.Fire, T.Water, T.Ice, T.Steel],
    Super: [T.Grass, T.Flying, T.Ground, T.Dragon],
  },
  [T.Dragon]: {
    NoEffect: [T.Fairy],
    NotVery: [T.Steel],
    Super: [T.Dragon],
  },
  [T.Dark]: {
    NoEffect: [],
    NotVery: [T.Fighting, T.Dark, T.Fairy],
    Super: [T.Psychic, T.Ghost],
  },
  [T.Steel]: {
    NoEffect: [],
    NotVery: [T.Fire, T.Water, T.Electric, T.Steel],
    Super: [T.Rock, T.Ice, T.Fairy],
  },
  [T.Fairy]: {
    NoEffect: [],
    NotVery: [T.Fire, T.Poison, T.Normal],
    Super: [T.Fighting, T.Dragon, T.Dark],
  },
};

const othersAreSuperEffectiveAgainstThis = (type) => {
  const result = new Set();
  for (const pokemonType in Resistances) {
    const Other = Resistances[pokemonType];
    if (Other.Super.some((item) => item === type)) {
      result.add(pokemonType);
    }
  }
  return [...result];
};

const addMissingPiece = () => {
  for (const pokemonType in Resistances) {
    Resistances[pokemonType].SuperWeak =
      othersAreSuperEffectiveAgainstThis(pokemonType);
  }
};

//
// Below: verify typed-in information
//

const verifyTypeArray = (ar) => {
  ar.forEach((item) => {
    if (!T[item]) {
      throw new TypeError('Pokemon type "' + item + '" not recognized');
    }
  });
};

const verifyEntry = ({ NoEffect, NotVery, Super }) => {
  [NoEffect, NotVery, Super].every(verifyTypeArray);
};

const verify = () => {
  for (const pokemonType in Resistances) {
    try {
      verifyEntry(Resistances[pokemonType]);
    } catch (e) {
      console.error(
        "Pokemon type",
        pokemonType,
        "has faulty entry:",
        e.message
      );
    }
  }
};

verify();
addMissingPiece();
