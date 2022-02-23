class QBicUICheckerEvent extends Event {
	constructor(type, init) {
		super(type, init);
	}

	static get CHANGE() {
		return 'onChanged';
	}

	static get CLICK() {
		return 'onClicked';
	}
}


class QBicUICheckerBase extends HTMLElement {
	constructor(inner) {
		super();

		const shadow = this.attachShadow({mode: 'open'});

		const style = document.createElement('style');
		style.textContent = `
			:host {

			}

			:host * {
				border: 0;
				padding: 0;
				margin: 0;
				box-sizing: border-box;
				user-select: none;
			}

			:host input,
			:host input + label {
				cursor: pointer;
			}
			:host input:disabled,
			:host input:disabled + label {
				cursor: default;
				filter: grayscale(100%) opacity(20%);
			}
		`;

		const input = document.createElement('input');
		input.setAttribute('type', 'checkbox');
		input.id = 'ui-checker';
		input.addEventListener('change', (e) => {
			this.dispatchEvent(new QBicUICheckerEvent(QBicUICheckerEvent.CHANGE));
		});

		const label = document.createElement('label');
		label.setAttribute('for', input.id);
		label.addEventListener('click', (e) => {
			e.preventDefault();
		});

		const slot = document.createElement('slot');
		if (inner != undefined) slot.innerHTML = inner;
		label.append(slot);

		shadow.append(style, input, label);
	}

	get checked() {
		return this.shadowRoot.querySelector('input').checked;
	}
	set checked(value) {
		this.shadowRoot.querySelector('input').checked = value;
	}

	get disabled() {
		return this.shadowRoot.querySelector('input').disabled;
	}
	set disabled(value) {
		this.shadowRoot.querySelector('input').disabled = value;
	}

	static get observedAttributes() {
		return ['checked', 'disabled'];
	}

	attributeChangedCallback(attr, oldValue, newValue) {
		const input = this.shadowRoot.querySelector('input');
		
		if (this.hasAttribute(attr)) {
			input.setAttribute(attr, '');
		} else {
			input.removeAttribute(attr);
		}
	}
}


class QBicUIChecker extends QBicUICheckerBase {
	constructor(inner) {
		super(inner);

		this.shadowRoot.querySelector('style').textContent += `
			:host input {
				display: none;
			}
		`;

		const symbol = document.createElement('div');
		symbol.innerHTML = '<svg viewBox="0 0 40 40"><polygon points="2,20 16,34 38,11 33,6 16,24 7,15 "/></svg>';

		const label = this.shadowRoot.querySelector('label');
		label.insertBefore(symbol, label.firstChild);
	}

	static get is() {
		return 'qb-ui-checker';
	}

	static get version() {
		return '1.0.0';
	}
}
customElements.define(QBicUIChecker.is, QBicUIChecker);


class QBicUIToggle extends QBicUICheckerBase {
	constructor(inner) {
		super(inner);

		this.shadowRoot.querySelector('style').textContent += ``;
	}

	static get is() {
		return 'qb-ui-toggle';
	}

	static get version() {
		return '1.0.0';
	}
}
customElements.define(QBicUIToggle.is, QBicUIToggle);