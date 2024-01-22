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

      const linkBox = (s) => `<a href="#${s}" class="box">${t(s)}</a>`;

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
          ar.map(linkBox).join("") +
          `</div>
          </div>`
        );
      };

      let title = t(this.pokemonType);
      if (title !== this.pokemonType) {
        title += ` (${this.pokemonType})`;
      }

      this.innerHTML = `
        <pokemon-card-tmpl id="${this.pokemonType}">
          <span slot="type">${title}</span>
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

    onLangChanged(e) {
      this.render();
    }

    connectedCallback() {
      document.addEventListener("i18n", this.onLangChanged.bind(this), {
        passive: true,
      });
      if (this.isConnected) {
        this.render();
      }
    }

    disconnectedCallback() {
      document.removeEventListener("i18n", this.onLangChanged);
    }

    render() {
      const ar = [];
      for (const type in Resistances) {
        ar.push(`<pokemon-card type="${type}"></pokemon-card>`);
      }
      this.innerHTML = ar.join("");
    }
  }
);
