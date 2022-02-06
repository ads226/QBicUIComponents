import QBicUIEvent from '../event/QBicUIEvent.js';

export default class QBicBaseRadios extends HTMLElement {
	#items = [];
	
	#length = 0;
	get length() {
		return this.#length;
	}

	#changed = -1;
	get changed() {
		return this.#changed;
	}

	constructor(arrText, numChecked, arrDisabled) {
		super();

		const style = document.createElement('style');
		style.textContent = `
			:host * {
				margin: 0;
				padding: 0;
				border: 0;
				box-sizing: border-box;
			}
				
			:host input,
			:host input + label {
				cursor: pointer;
			}
			:host input:disabled,
			:host input:disabled + label {
				cursor: default;
			}

			:host {
				font-size: var(--font-size);
				font-weight: var(--font-weight);
				color: var(--font-color);
	
				display: flex;
				flex-direction: var(--host-direction);
				flex-wrap: var(--host-wrap);
				justify-content: var(--host-justify-content);
				align-items: var(--host-align-items);
				align-content: var(--host-align-content);
				gap: var(--host-gap);
	
				width: var(--host-width);
				height: var(--host-height);
				padding: var(--host-padding);
				margin: var(--host-margin);
				border: var(--host-border);
				background-color: var(--host-color);
			}
		`;

		this.attachShadow({mode: 'open'});
		this.shadowRoot.append(style);

		if (arrText != undefined) this.text = arrText;
		if (numChecked != undefined) this.checked = numChecked;
		if (arrDisabled != undefined) this.disabled = arrDisabled;
	}

	connectedCallback() {}
	disconnectedCallback() {}

	get text() {
		let ret = this.#items.map((item) => {
			return item.text;
		});
		return ret;
	}
	set text(value) {
		this.#initItems(value);
	}

	get checked() {
		this.#items.forEach((item, idx) => {
			if (item.checked == true) return idx;
		});
		return -1;
	}
	set checked(value) {
		if (typeof value == 'number' && value >= 0) {
			value = Math.min(value, this.#items.length - 1);
			this.#items[value].checked = true;
			this.#changed = value;
		} else {
			this.#items.forEach((item) => {
				item.checked = false;
			});
			this.#changed = -1;
		}
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

	static get observedAttributes() {
		return ['text'];
	}

	attributeChangedCallback(attr, oldValue, newValue) {
		this.#initItems(this.getAttribute('text').split('|'));

		if (this.hasAttribute('checked')) {
			this.#initChecked(parseInt(this.getAttribute('checked')));
		}

		if (this.hasAttribute('disabled')) {
			let arrDisabled = this.getAttribute('disabled').split('|').map((value) => {
				return parseInt(value);
			});
			
			this.#initDisabled(arrDisabled);
		}
	}

	#initItems(values) {
		for (let i = this.#items.length - 1; i >= values.length; -- i) {
			this.#items[i].wrapper.remove();
			this.#items.splice(i);
			this[i] = undefined;
		}
		
		values.forEach((text, idx) => {
			if (!this.#items[idx]) this.#items[idx] = new RadioItem();
			const item = this.#items[idx];

			if (!item.wrapper) {
				item.wrapper = document.createElement('div');
				item.wrapper.classList.add('wrapper');
				
				item.input = document.createElement('input');
				item.input.setAttribute('type', 'radio');
				item.input.id = '_input_' + idx;
				item.input.name = '_input';
				item.input.addEventListener('change', this.#onInputChanged.bind(this));

				item.label = document.createElement('label');
				item.label.setAttribute("for", item.input.id);

				item.wrapper.append(item.input, item.label);
			}

			item.idx = idx;
			item.text = text;

			this[idx] = item;
			this.shadowRoot.append(item.wrapper);
		});

		this.#changed = -1;
		this.#length = values.length;
	}

	#onInputChanged(e) {
		this.#changed = e.target.idx;
		this.dispatchEvent(new Event(QBicUIEvent.CHANGE));
	}

	#initChecked(value) {
		this.checked = value;
	}

	#initDisabled(values) {
		this.disabled = values;
	}
}

class RadioItem {
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