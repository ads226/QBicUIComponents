import QBicUIBase from './QBicUIBase.js';

export default class QBicUICheckers extends QBicUIBase {
	#items = [];
	get items() {
		return this.#items;
	}
	
	#changed = -1;
	get changed() {
		return this.#changed;
	}
	
	constructor() {
		super();
	}

	connectedCallback() {
		super.connectedCallback();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
	}
	
	get text() {
		let ret = this.#items.map((item) => {
			return item.label.innerHTML;
		});
		return ret;
	}
	set text(value) {
		this.#init(value);
	}

	get checked() {
		let ret = this.#items.map((item) => {
			return item.input.checked ? 1 : 0;
		});
		return ret;
	}
	set checked(value) {
		if (!Array.isArray(value)) value = new Array(this.#items.length).fill(value);
		
		this.#items.forEach((item, idx) => {
			item.checked = !!value[idx];
			item.input.checked = item.checked;
		});
	}

	get disabled() {
		let ret = this.#items.map((item) => {
			return item.input.disabled ? 1 : 0;
		});
		return ret;
	}
	set disabled(value) {
		if (!Array.isArray(value)) value = new Array(this.#items.length).fill(value);
		
		this.#items.forEach((item, idx) => {
			item.disabled = !!value[idx];
			item.input.disabled = item.disabled;
		});
	}
	
	#init(texts) {
		this.#changed = -1;

		for (let i = this.#items.length - 1; i >= texts.length; -- i) {
			this.#items[i].wrapper.remove();
			this.#items.splice(i);
		}

		texts.forEach((text, idx) => {
			let item = this.#items[idx] || {};

			if (!item.wrapper) {
				item.wrapper = document.createElement('div');
				item.wrapper.classList.add('wrapper');

				item.input = document.createElement('input');
				item.input.setAttribute('type', 'checkbox');
				item.input.id = '_input_' + idx;
				item.input.addEventListener('change', this.#onInputChange);

				item.label = document.createElement('label');
				item.label.setAttribute("for", item.input.id);

				item.wrapper.append(item.input, item.label);
			}

			item.input.idx = idx;
			item.label.innerHTML = text;

			this.#items[idx] = item;
			this[idx] = item;
			this.shadowRoot.append(item.wrapper);
		});
	}
	
	#refreshItems() {
		this.#items.forEach((item) => {
			item.input.checked = item.checked;
			item.input.disabled = item.disabled;
		});
	}
	
	#onInputChange(e) {
		console.log('onInputChange');
		console.log(e.target.idx);

	}
	
	static get observedAttributes() {
		return ['text', 'checked', 'disabled'];
	}
	
	attributeChangedCallback(attr, oldValue, newValue) {
		super.attributeChangedCallback(attr, oldValue, newValue);
		
		let itemCnt = this.getAttribute('text').split('|').length;
		let values = newValue.split('|');
		
		switch(attr) {
			case 'text' :
				this.#init(values);
			break;

			case 'checked' :
				for(let i = 0; i < itemCnt; ++ i) {
					if (!this.#items[i]) this.#items[i] = {};
					this.#items[i].checked = !~['false', '0'].indexOf(values[i]);
				}

				this.#refreshItems();
			break;

			case 'disabled' :
				for(let i = 0; i < itemCnt; ++ i) {
					if (!this.#items[i]) this.#items[i] = {};
					this.#items[i].disabled = !~['false', '0'].indexOf(values[i]);
				}
	
				this.#refreshItems();
			break;

			default :
			break;
		}
	}

	static get is() {
		return 'qb-ui-checkers';
	}

	static get version() {
		return '1.0.0';
	}
}

class Item {
	#wrapper
	get wrapper() {
		return this.#wrapper;
	}
	set wrapper(value) {
		this.#wrapper = value;
	}

	#input
	get input() {
		return this.#input;
	}
	set input(value) {
		this.#input = value;
	}

	#checked
	get checked() {
		return this.#checked;
	}
	set checked(value) {
		this.#checked = value;
	}

	#disabled
	get disabled() {
		return this.#disabled;
	}
	set disabled(value) {
		this.#disabled = value;
	}

	#label
	get label() {
		return this.#label;
	}
	set label(value) {
		this.#label = value;
	}

	#text
	get text() {
		return this.#text;
	}
	set text(value) {
		this.#text = value;
	}
}