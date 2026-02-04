import { newSpecPage } from '@stencil/core/testing';
import { DemoCard } from './demo-card';

describe('demo-card', () => {
  const expectedProps = {
    title: 'Test Title',
    description: 'Test Description',
  };

  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [DemoCard],
      html: `<demo-card></demo-card>`,
    });
    expect(page.root).toBeTruthy();
  });

  it('renders with title and description', async () => {
    const page = await newSpecPage({
      components: [DemoCard],
      html: `<demo-card card-title="${expectedProps.title}" subtitle="${expectedProps.description}"></demo-card>`,
    });

    const title = page.root?.shadowRoot?.querySelector('h3');
    expect(title?.textContent).toBe(expectedProps.title);

    const subtitle = page.root?.shadowRoot?.querySelector('h4');
    expect(subtitle?.textContent).toBe(expectedProps.description);
  });
});
