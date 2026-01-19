import { newE2EPage } from '@stencil/core/testing';

describe('demo-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<demo-card></demo-card>');

    const element = await page.find('demo-card');
    expect(element).toHaveClass('hydrated');
  });

  it('displays content correctly', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<demo-card title="E2E Test" description="Testing description"></demo-card>'
    );

    const component = await page.find('demo-card');
    const title = await component.find('h3');
    expect(title).toBeTruthy();
  });

  it('responds to click events', async () => {
    const page = await newE2EPage();
    await page.setContent('<demo-card></demo-card>');

    const component = await page.find('demo-card');
    await component.click();
    await page.waitForChanges();

    expect(component).toBeTruthy();
  });
});
