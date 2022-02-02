export default class QBicUIBase extends HTMLElement {
	constructor() {
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
		`;

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.append(style);
	}

	connectedCallback() {}
	disconnectedCallback() {}
	
	static get observedAttributes() {
		return [];
	}
	
	attributeChangedCallback(attr, oldValue, newValue) {}
}