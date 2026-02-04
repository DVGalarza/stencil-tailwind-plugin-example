import { Component, Host, h, Prop } from '@stencil/core';
import { ELEMENT_IDS, demoCardClasses, TEST_IDS } from './demo-card.constants';

@Component({
  tag: 'demo-card',
  styleUrl: 'demo-card.css',
  shadow: true,
})
export class DemoCard {
  @Prop() cardTitle?: string;
  @Prop() subtitle?: string;

  render() {
    const { cardTitle, subtitle } = this;

    return (
      <Host>
        <section
          aria-labelledby={ELEMENT_IDS.CARD_TITLE}
          class={demoCardClasses.card}
          data-testid={TEST_IDS.CARD}
        >
          <div data-testid={TEST_IDS.CARD_HEADER} class={demoCardClasses.header}>
            <h3
              data-testid={TEST_IDS.CARD_TITLE}
              class={demoCardClasses.title}
              id={ELEMENT_IDS.CARD_TITLE}
            >
              {cardTitle}
            </h3>
            <h4
              data-testid={TEST_IDS.CARD_SUBTITLE}
              class={demoCardClasses.subtitle}
              id={ELEMENT_IDS.CARD_SUBTITLE}
            >
              {subtitle}
            </h4>
          </div>
          <div data-testid={TEST_IDS.CARD_CONTENT} class={demoCardClasses.cardContent}>
            <slot />
          </div>
        </section>
      </Host>
    );
  }
}
