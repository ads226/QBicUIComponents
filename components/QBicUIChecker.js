class QBicUICheckerEvent extends Event {
	constructor(type, init) {
		super(type, init);
	}

	static get CHANGE() {
		return 'onChanged';
	}
}

class QBicUIChecker extends HTMLElement {
	constructor(inner) {
		super();

		const shadow = this.attachShadow({mode: 'open'});

		const style = document.createElement('style');
		style.textContent = `
			:host {
				--input-size: 1.2em;
				--input-border: thin solid hsl(200, 50%, 10%, 0.5);

				display: flex;
				// font-size: 18pt;
			}
			
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

			:host input {
				appearance: none;
				display: flex;
				font-size: inherit;
				width: var(--input-size);
				height: var(--input-size);
				border: var(--input-border);
				border-radius: var(--input-radius);
				background-color: var(--input-color);
				transition: var(--input-transition);
			}

			:host label {
				
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

	static get is() {
		return 'qb-ui-checker';
	}

	static get version() {
		return '1.0.0';
	}
}

customElements.define(QBicUIChecker.is, QBicUIChecker);