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
};

const VerifyEntry = ({ NoEffect, NotVery, Super }) => {};
