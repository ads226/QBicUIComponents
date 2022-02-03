import QBicUIBase from './QBicUIBase.js';
import QBicUIEvent from '../event/QBicUIEvent.js';
import QBicConfig from '../../QBicConfig.js';

export default class QBicUIToggles extends QBicUIBase {
	#items = [];
	
	#length = 0;
	get length() {
		return this.#length;
	}

	#changed = -1;
	get changed() {
		return this.#changed;
	}

	constructor(arrText, arrChecked, arrDisabled) {
		super();

		const style = this.shadowRoot.querySelector('style');
		style.textContent += `
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

			:host .wrapper {
				display: flex;
				justify-content: var(--wrap-justify-content);
				align-items: var(--wrap-align-items);

				width: var(--wrap-width);
				height: var(--wrap-height);
				padding: var(--wrap-padding);
				margin: var(--wrap-margin);
				border: var(--wrap-border);
				background-color: var(--wrap-color);
			}

			:host input {
				display: none;
			}
			:host input + label {
				width: var(--label-width);
				height: var(--label-height);
				padding: var(--label-padding);
				margin: var(--label-margin);
				border: var(--label-border);
				border-radius: var(--label-radius);
				background-color: var(--label-color);
				transition: var(--transition);
			}

			:host input:checked + label {
				font-weight: var(--font-weight-checked);
				color: var(--font-color-checked);
				background-color: var(--label-color-checked);
				border-color: var(--label-color-checked);
			}

			:host input:disabled + label {
				filter: grayscale(100%) opacity(20%);
			}
		`;

		if (arrText != undefined) this.text = arrText;
		if (arrChecked != undefined) this.checked = arrChecked;
		if (arrDisabled != undefined) this.disabled = arrDisabled;
	}

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

	static get observedAttributes() {
		return ['text'];
	}

	attributeChangedCallback(attr, oldValue, newValue) {
		super.attributeChangedCallback(attr, oldValue, newValue);
		
		this.#initItems(this.getAttribute('text').split('|'));

		if (this.hasAttribute('checked')) {
			let arrChecked = this.getAttribute('checked').split('|').map((value) => {
				return parseInt(value);
			});
			
			this.#initChecked(arrChecked);
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
			if (!this.#items[idx]) this.#items[idx] = new ToggleItem();
			const item = this.#items[idx];

			if (!item.wrapper) {
				item.wrapper = document.createElement('div');
				item.wrapper.classList.add('wrapper');
				
				item.input = document.createElement('input');
				item.input.setAttribute('type', 'checkbox');
				item.input.id = '_input_' + idx;
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

	#initChecked(values) {
		this.#items.forEach((item, idx) => {
			item.checked = !!values[idx];
		});
	}

	#initDisabled(values) {
		this.#items.forEach((item, idx) => {
			item.disabled = !!values[idx];
		});
	}

	static get is() {
		return 'qb-ui-toggles';
	}

	static get version() {
		return '1.0.0';
	}
}

class ToggleItem {
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


if (!document.querySelector('head #qb_ui_toggles_style')) {
	const link = document.createElement('link');
	link.id = 'qb_ui_toggles_style';
	link.rel = 'stylesheet';
	link.type ='text/css';
	link.href = QBicConfig.componentsPath + 'css/QBicUIToggles.css';

	document.querySelector('head').append(link);
}