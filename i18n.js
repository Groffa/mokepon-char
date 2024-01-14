"use strict";

const translations = {
  se: {
    Grass: "Gräs",
    Fire: "Eld",
    Water: "Vatten",
    Electric: "El",
    Flying: "Flyg",
    Bug: "Kryp",
    Fighting: "Strid",
    Rock: "Sten",
    Ground: "Mark",
    Poison: "Gift",
    Psychic: "Psykisk",
    Ghost: "Spök",
    Ice: "Is",
    Dragon: "Drak",
    Dark: "Mörk",
    Steel: "Stål",
    Fairy: "Fé",

    "No Effect": "Ingen effekt",
    "Not Very": "Liten effekt",
    "Super Weak": "Supersvag mot",
    Super: "Supereffektiv mot",
  },
  en: {},
};

let currentDict = translations.se;

const setLang = (langCode) => {
  currentDict = translations[langCode];
  if (!currentDict) {
    throw new Error(
      "unsupported language code " +
        langCode +
        ". Valid: " +
        Object.keys(translations).join()
    );
  }
};

const t = (s) => {
  const translatedS = currentDict[s];
  return translatedS ?? s;
};
