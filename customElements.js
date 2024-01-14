customElements.define(
  "pokemon-card-tmpl",
  class extends HTMLElement {
    constructor() {
      super();
      const template = document.getElementById("pokemon-card-template").content;
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(template.cloneNode(true));
    }
  }
);

customElements.define(
  "pokemon-card",
  class extends HTMLElement {
    static observedAttributes = ["type"];

    constructor() {
      super();
    }

    get pokemonType() {
      const s = this.getAttribute("type");
      return s[0].toUpperCase() + s.substring(1).toLowerCase();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      const r = Resistances[this.pokemonType];
      if (!r) {
        throw new Error("Unknown type " + this.pokemonType);
      }
      this.render();
    }

    render() {
      const boxes = (ar) =>
        ar.map((s) => `<div class="box">${s}</div>`).join("");

      const r = Resistances[this.pokemonType];
      this.innerHTML = `
        <pokemon-card-tmpl>
          <span slot="type">${this.pokemonType}</span>
          <span slot="icon"></span>
          <span slot="superweak">${boxes(r.SuperWeak)}</span>
          <span slot="noeffect">${boxes(r.NoEffect)}</span>
          <span slot="notvery">${boxes(r.NotVery)}</span>
          <span slot="super">${boxes(r.Super)}</span>
        </pokemon-card>
      `;
    }
  }
);
