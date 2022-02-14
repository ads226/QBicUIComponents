class QBicUICheckerEvent extends Event {
	constructor(type, init) {
		super(type, init);
	}

	static get version() {
		return '1.0.0'
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
				--input-size: 1em;
				--input-border: thin solid hsl(200, 50%, 10%, 0.5);
				--input-radius: 1px;
				--input-color: none;
				--input-color-checked: hsl(200, 90%, 40%, 1);

				display: flex;
				align-items: center;
				gap: 0.2em;
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
				font-size: inherit;
				display: flex;
				justify-content: center;
				align-items: center;
				width: var(--input-size);
				height: var(--input-size);
				border: var(--input-border);
				border-radius: var(--input-radius);
				background-color: var(--input-color);
				transition: 0.25s;
			}
			:host input::before {
				content: '';
				width: 62%;
				height: 33%;
				border-bottom: calc(var(--input-size) / 7) solid;
				border-left: calc(var(--input-size) / 7) solid;
				border-color: transparent;
				transition: 0.25s;
			}

			:host input:checked {
				background-color: var(--input-color-checked);
				border-color: var(--input-color-checked);
				
			}
			:host input:checked::before {
				border-color: #fff;
				transform: rotate(-45deg);
				margin-bottom: 29.5%;
			}

			:host label {
				line-height: 1.25;
			}

			:host input:disabled,
			:host input:disabled + label {
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


class QBicUIToggle extends QBicUIChecker {
	constructor(inner) {
		super(inner);

		this.shadowRoot.querySelector('style').textContent = `
			:host {
				--label-width: inherit;
				--label-height: inherit;
				--label-padding: 0 6px 1px;
				--label-border: thin solid hsl(200, 50%, 10%, 0.5);
				--label-radius: 4px;
				--label-color: none;
				--label-color-checked: hsl(200, 90%, 40%, 1);
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
				display: none;
			}
			
			:host label {
				line-height: 1.25;
			}
			
			:host input + label {
				width: var(--label-width);
				height: var(--label-height);
				padding: var(--label-padding);
				border: var(--label-border);
				border-radius: var(--label-radius);
				background-color: var(--label-color);
				transition: 0.25s;
			}
			
			:host input:checked + label {
				background-color: var(--label-color-checked);
				border-color: var(--label-color-checked);
				color: #fff;
			}

			:host input:disabled,
			:host input:disabled + label {
				filter: grayscale(100%) opacity(20%);
			}
		`;
	}

	static get is() {
		return 'qb-ui-toggle';
	}

	static get version() {
		return '1.0.0';
	}
}

customElements.define(QBicUIToggle.is, QBicUIToggle);