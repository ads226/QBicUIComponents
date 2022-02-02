import QBicConfig from '../../QBicConfig.js';
import QBicUIEvent from '../event/QBicUIEvent.js';
import QBicUIBase from './QBicUIBase.js';

export default class QBicUICheckers extends QBicUIBase {
	#items = [];
	
	#length = 0;
	get length() {
		return this.#length;
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
			return item.text;
		});
		return ret;
	}
	set text(value) {
		this.#init(value);
	}

	get checked() {
		let ret = this.#items.map((item) => {
			return item.checked ? 1 : 0;
		});
		return ret;
	}
	set checked(value) {
		if (!Array.isArray(value)) value = new Array(this.#items.length).fill(value);
		
		this.#items.forEach((item, idx) => {
			item.checked = !!value[idx];
		});
	}

	get disabled() {
		let ret = this.#items.map((item) => {
			return item.disabled ? 1 : 0;
		});
		return ret;
	}
	set disabled(value) {
		if (!Array.isArray(value)) value = new Array(this.#items.length).fill(value);
		
		this.#items.forEach((item, idx) => {
			item.disabled = !!value[idx];
		});
	}
	
	#init(values) {
		for (let i = this.#items.length - 1; i >= values.length; -- i) {
			this.#items[i].wrapper.remove();
			this.#items.splice(i);
			this[i] = undefined;
		}

		values.forEach((text, idx) => {
			if (!this.#items[idx]) this.#items[idx] = new Item();
			const item = this.#items[idx];

			if (!item.wrapper) {
				item.wrapper = document.createElement('div');
				item.wrapper.classList.add('wrapper');

				item.input = document.createElement('input');
				item.input.setAttribute('type', 'checkbox');
				item.input.id = '_input_' + idx;
				item.input.addEventListener('change', this.#onInputChange.bind(this));

				item.label = document.createElement('label');
				item.label.setAttribute("for", item.input.id);

				item.wrapper.append(item.input, item.label);
			}

			item.idx = idx;
			item.text = text;

			this[idx] = item;

			this.shadowRoot.append(item.wrapper);
		});

		this.#length = values.length;
		this.#changed = -1;
	}
	
	#onInputChange(e) {
		this.#changed = e.target.idx;
		this.dispatchEvent(new Event(QBicUIEvent.CHANGE));
	}
	
	static get observedAttributes() {
		return ['text', 'checked', 'disabled'];
	}
	
	attributeChangedCallback(attr, oldValue, newValue) {
		super.attributeChangedCallback(attr, oldValue, newValue);
		
		let cnt = this.getAttribute('text').split('|').length;
		let values = newValue.split('|');
		
		switch(attr) {
			case 'text' :
				this.#init(values);
			break;

			case 'checked' :
				for(let i = 0; i < cnt; ++ i) {
					if (!this.#items[i]) this.#items[i] = new Item();
					this.#items[i].checked = !~['false', '0'].indexOf(values[i]);
				}
			break;

			case 'disabled' :
				for(let i = 0; i < cnt; ++ i) {
					if (!this.#items[i]) this.#items[i] = {};
					this.#items[i].disabled = !~['false', '0'].indexOf(values[i]);
				}
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

	get idx() {
		return this.#input.idx;
	}
	set idx(value) {
		this.#input.idx = value;
	}
	
	get checked() {
		return this.#input.checked;
	}
	set checked(value) {
		this.#input.checked = value;
	}

	get disabled() {
		return this.#input.disabled;
	}
	set disabled(value) {
		this.#input.disabled = value;
	}

	#label
	get label() {
		return this.#label;
	}
	set label(value) {
		this.#label = value;
	}

	get text() {
		return this.#label.innerHTML;
	}
	set text(value) {
		this.#label.innerHTML = value;
	}
}

if (!document.querySelector('head #qb_ui_checkers_style')) {
	const link = document.createElement('link');
	link.id = 'qb_ui_checkers_style';
	link.rel = 'stylesheet';
	link.type ='text/css';
	link.href = QBicConfig.componentsPath + 'css/QBicUICheckers.css';

	document.querySelector('head').append(link);
}