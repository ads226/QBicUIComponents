import QBicBaseCheckers from '../base/QBicBaseCheckers.js';
import QBicConfig from '../../QBicConfig.js';

export default class QBicUISwitches extends QBicBaseCheckers {
    constructor(arrText, arrChecked, arrDisabled) {
        super(arrText, arrChecked, arrDisabled);

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
                flex-direction: var(--wrap-direction);
                justify-content: var(--wrap-justify-content);
                align-items: var(--wrap-align-items);
                gap: var(--wrap-gap);

                width: var(--wrap-width);
                height: var(--wrap-height);
                padding: var(--wrap-padding);
                margin: var(--wrap-margin);
                border: var(--wrap-border);
                background-color: var(--wrap-color);
            }

            :host input {
                appearance: none;
                display: flex;
                width: var(--input-width);
                height: var(--input-height);
                border: var(--input-border);
                border-radius: var(--input-radius);
                background-color: var(--input-color);
                transition: var(--transition);
            }
            :host input::before {
                content: '';
                width: var(--inner-width);
                height: var(--inner-height);
                border: var(--inner-border);
                border-radius: var(--inner-radius);
                background-color: var(--inner-color);
                margin: var(--inner-margin);
                transition: var(--transition);
            }
            :host input + label {
                width: var(--label-width);
                height: var(--label-height);
                padding: var(--label-padding);
                margin: var(--label-margin);
                border: var(--label-border);
                background-color: var(--label-color);
                transition: var(--transition);
            }

            :host input:checked {
                border: var(--input-border-checked);
                background-color: var(--input-color-checked);
            }
            :host input:checked::before {
                border: var(--inner-border-checked);
                background-color: var(--inner-color-checked);
                margin: var(--inner-margin-checked);
            }
            :host input:checked + label {
                font-weight: var(--font-weight-checked);
                color: var(--font-color-checked);
            }

            :host input:disabled,
            :host input:disabled + label {
                filter: grayscale(100%) opacity(20%);
            }
        `;
    }

    static get observedAttributes() {
        return ['text'];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        super.attributeChangedCallback(attr, oldValue, newValue);
    }

    static get is() {
        return 'qb-ui-switches';
    }

    static get version() {
        return '1.0.0';
    }
}

if (!document.querySelector('head #qb_ui_switches_style')) {
    const link = document.createElement('link');
    link.id = 'qb_ui_switches_style';
    link.rel = 'stylesheet';
    link.type ='text/css';
    link.href = QBicConfig.componentsPath + 'css/QBicUISwitches.css';

    document.querySelector('head').append(link);
}