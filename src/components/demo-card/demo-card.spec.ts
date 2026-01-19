import { newSpecPage } from '@stencil/core/testing';
import { DemoCard } from './demo-card';

describe('demo-card', () => {
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
      html: `<demo-card title="Test Title" description="Test Description"></demo-card>`,
    });
    const title = page.root?.shadowRoot?.querySelector('h3');
    expect(title?.textContent).toBe('Test Title');
  });

  it('applies hover styles correctly', async () => {
    const page = await newSpecPage({
      components: [DemoCard],
      html: `<demo-card></demo-card>`,
    });
    const card = page.root?.shadowRoot?.querySelector('.demo-card');
    expect(card?.classList.contains('hover:shadow-lg')).toBe(true);
  });
});
