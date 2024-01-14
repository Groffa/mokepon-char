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
      const r = Resistances[this.pokemonType];

      const of = (displayname) => {
        const prop = displayname.split(" ").join("");
        const ar = r[prop];
        if (!ar.length) {
          return "";
        }
        return (
          `<div class="weakness-panel">
            <div class="name">${t(displayname)}</div>
            <div class="list ${prop.toLowerCase()}">` +
          ar.map((s) => `<div class="box">${t(s)}</div>`).join("") +
          `</div>
          </div>`
        );
      };

      this.innerHTML = `
        <pokemon-card-tmpl>
          <span slot="type">${t(this.pokemonType)} (${this.pokemonType})</span>
          <span slot="icon"></span>
          <span slot="superweak">${of("Super Weak")}</span>
          <span slot="noeffect">${of("No Effect")}</span>
          <span slot="notvery">${of("Not Very")}</span>
          <span slot="super">${of("Super")}</span>
        </pokemon-card>
      `;
    }
  }
);

customElements.define(
  "all-pokemon-cards",
  class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      const ar = [];
      for (const type in Resistances) {
        ar.push(`<pokemon-card type="${type}"></pokemon-card>`);
      }
      this.innerHTML = ar.join("");
    }
  }
);
