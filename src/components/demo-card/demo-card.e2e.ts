import { newE2EPage } from '@stencil/core/testing';
import { TEST_IDS } from './demo-card.constants';

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
      '<demo-card card-title="E2E Test" subtitle="Testing description"></demo-card>'
    );

    const component = await page.find('demo-card');
    await expect(component).toBeTruthy();

    const title = await page.find(`demo-card >>> [data-testid="${TEST_IDS.CARD_TITLE}"]`);
    await expect(title).toBeTruthy();
  });

  it('responds to click events', async () => {
    const page = await newE2EPage();
    const mockFn = jest.fn();
    await page.exposeFunction('mockFn', mockFn);
    await page.setContent(`<demo-card><button onClick="mockFn()">Click me</button></demo-card>`);

    const button = await page.find('demo-card > button');

    expect(mockFn).not.toHaveBeenCalled();

    await expect(button).toBeTruthy();
    await button.click();
    await page.waitForChanges();

    expect(mockFn).toHaveBeenCalled();
  });
});
