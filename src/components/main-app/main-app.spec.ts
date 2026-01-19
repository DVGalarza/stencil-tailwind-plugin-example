import { newSpecPage } from '@stencil/core/testing';
import { MainApp } from './main-app';

describe('main-app', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MainApp],
      html: `<main-app></main-app>`,
    });
    expect(page.root).toBeTruthy();
  });

  it('contains all major sections', async () => {
    const page = await newSpecPage({
      components: [MainApp],
      html: `<main-app></main-app>`,
    });
    const content = page.root?.shadowRoot?.innerHTML || '';
    expect(content).toContain('top-nav-bar');
    expect(content).toContain('hero-section');
    expect(content).toContain('demo-section');
    expect(content).toContain('footer-nav');
  });
});
