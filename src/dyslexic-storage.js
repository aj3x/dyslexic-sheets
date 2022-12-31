
const CHARACTER_LIST_KEY = '__dyslexic_characters';
const CHARACTER_KEY_PREFIX = '__dyslexic_character_';

export default class DyslexicSettings {
    static #settings = {};
    static get settings() {
        return this.#settings;
    }
    static set settings(x) {
        this.#settings = x;
    }
    static #form = document.forms[0];
    static get CharacterKey() {
        const fd = new FormData(this.#form);
        return fd.get('ancestry') + '-'
            + fd.get('char-background') + '-'
            + fd.get('class');
    }

    static getCharacterFormData() {
        const form = document.forms[0]
        const fd = new FormData(form)
        const save_data = {};

        for (let key of fd.keys()) {
            if (save_data[key])
                console.warn("DuplicateKey", key, fd.getAll(key));
            else
                save_data[key] = fd.get(key);
        }
        return save_data;
    }
    static setCharacterFormData(save_data) {
        const form = document.forms[0]
        const fd = new FormData(form);
        
        for (let key of fd.keys()) {
            document.getElementsByName(key).forEach(element => {
                const savedValue = save_data[key] || "";
                if (savedValue && element.value !== savedValue) {
                    element.value = savedValue;
                    if (savedValue === "on") {
                        element.checked = true;
                    }
                    element.dispatchEvent(new Event('change'))
                }
            });
        }
    }

    /**@type {Record<string, Character>} */

    static characters = JSON.parse(sessionStorage.getItem(CHARACTER_LIST_KEY) || "{}");
    static selected_character = Object.keys(this.characters)[0];

    static create_character() {
        const now = Date.now();
        const character = {
            name: "",
            modified: now,
        }
        this.characters[character.id] = character;
    }
    static list_characters() {
        return Object.values(this.characters);
    }

    static #set_character(item) {
        sessionStorage.setItem(CHARACTER_KEY_PREFIX + this.CharacterKey, JSON.stringify(item));
    }
    static #get_character() {
        return JSON.parse(sessionStorage.getItem(CHARACTER_KEY_PREFIX + this.CharacterKey) || "{}");
    }
    static _get() {
        return this.#get_character();
    }
    static #reset_character() {
        sessionStorage.removeItem(CHARACTER_KEY_PREFIX + this.CharacterKey);
    }
    static save_character() {
        // sessionStorage.setItem(CHARACTER_LIST_KEY, JSON.stringify(this.characters));
        this.#set_character(this.getCharacterFormData());
    }
    static load_character() {
        this.setCharacterFormData(this.#get_character());
    }
    static reset_character() {
        this.#reset_character();
        this.load_character();
    }
}

// class DyslexicCharacter {
//     constructor(stats) {
        
//     }
// }

const character = DyslexicSettings.load_character();
// DyslexicSettings.setCharacterFormData(character);
//setup
const __screen_buttons = document.querySelector('#screen-buttons');
const listAllCharactersButton = document.createElement("button");
listAllCharactersButton.innerText = "Save Character";
listAllCharactersButton.type = "button";
listAllCharactersButton.class="button";
listAllCharactersButton.addEventListener("click", () => {
    DyslexicSettings.save_character();
});
__screen_buttons.appendChild(listAllCharactersButton);
