import { expect } from '@playwright/test';
import { test } from './utils.ts/baseTest';
import { initializeSession } from './utils.ts/browser';

test.beforeEach(async ({ page }) => {
  const { featureFlagsMock } = await initializeSession(page, { showOnBoardingTour: true });
  featureFlagsMock.setFlagsToMock({
    IS_IMPROVED_ONBOARDING_ENABLED: false,
    IS_INFORMATION_ARCHITECTURE_ENABLED: true,
    IS_BILLING_REVERSE_TRIAL_ENABLED: false,
    IS_TEMPLATE_STORE_ENABLED: false,
  });
});

test('should show the start from scratch intro step', async ({ page }) => {
  await page.goto('/workflows/create');

  const scratchWorkflowTooltip = page.getByTestId('scratch-workflow-tooltip');
  await expect(scratchWorkflowTooltip).toBeVisible();

  const scratchWorkflowTooltipTitle = page.getByTestId('scratch-workflow-tooltip-title');
  await expect(scratchWorkflowTooltipTitle).toHaveText('Discover a quick guide');

  const scratchWorkflowTooltipDescription = page.getByTestId('scratch-workflow-tooltip-description');
  await expect(scratchWorkflowTooltipDescription).toHaveText('Four simple tips to become a workflow expert.');

  const scratchWorkflowTooltipSkipButton = page.getByTestId('scratch-workflow-tooltip-skip-button');
  await expect(scratchWorkflowTooltipSkipButton).toHaveText('Watch later');

  const scratchWorkflowTooltipPrimaryButton = page.getByTestId('scratch-workflow-tooltip-primary-button');
  await expect(scratchWorkflowTooltipPrimaryButton).toHaveText('Show me');
});

test('should hide the start from scratch intro step after clicking on watch later', async ({ page }) => {
  await page.goto('/workflows/create');

  const scratchWorkflowTooltip = page.getByTestId('scratch-workflow-tooltip');
  await expect(scratchWorkflowTooltip).toBeVisible();

  const scratchWorkflowTooltipTitle = page.getByTestId('scratch-workflow-tooltip-title');
  await expect(scratchWorkflowTooltipTitle).toHaveText('Discover a quick guide');

  const scratchWorkflowTooltipDescription = page.getByTestId('scratch-workflow-tooltip-description');
  await expect(scratchWorkflowTooltipDescription).toHaveText('Four simple tips to become a workflow expert.');

  const scratchWorkflowTooltipPrimaryButton = page.getByTestId('scratch-workflow-tooltip-primary-button');
  await expect(scratchWorkflowTooltipPrimaryButton).toHaveText('Show me');

  const scratchWorkflowTooltipSkipButton = page.getByTestId('scratch-workflow-tooltip-skip-button');
  await expect(scratchWorkflowTooltipSkipButton).toHaveText('Watch later');
  await scratchWorkflowTooltipSkipButton.click();

  await expect(scratchWorkflowTooltip).not.toBeVisible();
});

test('should show the start from scratch tour hints', async ({ page }) => {
  await page.goto('/workflows/create');

  const scratchWorkflowTooltip = await page.getByTestId('scratch-workflow-tooltip');
  await expect(scratchWorkflowTooltip).toBeVisible();

  const scratchWorkflowTooltipTitle = page.getByTestId('scratch-workflow-tooltip-title');
  await expect(scratchWorkflowTooltipTitle).toHaveText('Discover a quick guide');

  const scratchWorkflowTooltipDescription = page.getByTestId('scratch-workflow-tooltip-description');
  await expect(scratchWorkflowTooltipDescription).toHaveText('Four simple tips to become a workflow expert.');

  const scratchWorkflowTooltipSkipButton = page.getByTestId('scratch-workflow-tooltip-skip-button');
  await expect(scratchWorkflowTooltipSkipButton).toHaveText('Watch later');

  const scratchWorkflowTooltipPrimaryButton = page.getByTestId('scratch-workflow-tooltip-primary-button');
  await expect(scratchWorkflowTooltipPrimaryButton).toHaveText('Show me');
  await scratchWorkflowTooltipPrimaryButton.click();

  const scratchWorkflowTooltipTitle2 = page.getByTestId('scratch-workflow-tooltip-title');
  await expect(scratchWorkflowTooltipTitle2).toHaveText('Click to edit workflow name');

  const scratchWorkflowTooltipDescription2 = page.getByTestId('scratch-workflow-tooltip-description');
  await expect(scratchWorkflowTooltipDescription2).toHaveText(
    'Specify a name for your workflow here or in the workflow settings.'
  );

  const scratchWorkflowTooltipPrimaryButton2 = page.getByTestId('scratch-workflow-tooltip-primary-button');
  await expect(scratchWorkflowTooltipPrimaryButton2).toHaveText('Next');
  await scratchWorkflowTooltipPrimaryButton2.click();

  const scratchWorkflowTooltipTitle3 = page.getByTestId('scratch-workflow-tooltip-title');
  await expect(scratchWorkflowTooltipTitle3).toHaveText('Verify workflow settings');

  const scratchWorkflowTooltipDescription3 = page.getByTestId('scratch-workflow-tooltip-description');
  await expect(scratchWorkflowTooltipDescription3).toHaveText(
    'Manage name, identifier, group and description. Set up channels, active by default.'
  );

  const scratchWorkflowTooltipPrimaryButton3 = page.getByTestId('scratch-workflow-tooltip-primary-button');
  await expect(scratchWorkflowTooltipPrimaryButton3).toHaveText('Next');
  await scratchWorkflowTooltipPrimaryButton3.click();

  const scratchWorkflowTooltipTitle4 = page.getByTestId('scratch-workflow-tooltip-title');
  await expect(scratchWorkflowTooltipTitle4).toHaveText('Build a notification workflow');

  const scratchWorkflowTooltipDescription4 = page.getByTestId('scratch-workflow-tooltip-description');
  await expect(scratchWorkflowTooltipDescription4).toHaveText(
    'Add channels you would like to send notifications to. The channels will be inserted to the trigger snippet.'
  );

  const scratchWorkflowTooltipPrimaryButton4 = page.getByTestId('scratch-workflow-tooltip-primary-button');
  await expect(scratchWorkflowTooltipPrimaryButton4).toHaveText('Next');
  await scratchWorkflowTooltipPrimaryButton4.click();

  const scratchWorkflowTooltipTitle5 = page.getByTestId('scratch-workflow-tooltip-title');
  await expect(scratchWorkflowTooltipTitle5).toHaveText('Run a test or Get Snippet');

  const scratchWorkflowTooltipDescription5 = page.getByTestId('scratch-workflow-tooltip-description');
  await expect(scratchWorkflowTooltipDescription5).toHaveText(
    'Test a trigger as if it was sent from your API. Deploy it to your App by copy/paste trigger snippet.'
  );

  const gotItButton = await page.getByTestId('scratch-workflow-tooltip-primary-button');
  await expect(gotItButton).toHaveText('Got it');
  await gotItButton.click();

  await expect(scratchWorkflowTooltip).not.toBeVisible();
});

test('should show the dots navigation after the intro step', async ({ page }) => {
  await page.goto('/workflows/create');

  const scratchWorkflowTooltip = page.getByTestId('scratch-workflow-tooltip');
  await expect(scratchWorkflowTooltip).toBeVisible();

  const scratchWorkflowTooltipTitle = page.getByTestId('scratch-workflow-tooltip-title');
  await expect(scratchWorkflowTooltipTitle).toHaveText('Discover a quick guide');

  const scratchWorkflowTooltipDescription = page.getByTestId('scratch-workflow-tooltip-description');
  await expect(scratchWorkflowTooltipDescription).toHaveText('Four simple tips to become a workflow expert.');

  const scratchWorkflowTooltipSkipButton = page.getByTestId('scratch-workflow-tooltip-skip-button');
  await expect(scratchWorkflowTooltipSkipButton).toHaveText('Watch later');

  const scratchWorkflowTooltipPrimaryButton = page.getByTestId('scratch-workflow-tooltip-primary-button');
  await expect(scratchWorkflowTooltipPrimaryButton).toHaveText('Show me');
  await scratchWorkflowTooltipPrimaryButton.click();

  const dotsNavigation = page.getByTestId('scratch-workflow-tooltip-dots-navigation');
  await expect(dotsNavigation).toBeVisible();
});

test.skip('should not show the start from scratch tour hints after it is shown twice ', async ({ page }) => {
  await page.goto('/workflows/create');

  let scratchWorkflowTooltip = page.getByTestId('scratch-workflow-tooltip');
  await expect(scratchWorkflowTooltip).toBeVisible();

  const scratchWorkflowTooltipTitle = page.getByTestId('scratch-workflow-tooltip-title');
  await expect(scratchWorkflowTooltipTitle).toHaveText('Discover a quick guide');

  const scratchWorkflowTooltipDescription = page.getByTestId('scratch-workflow-tooltip-description');
  await expect(scratchWorkflowTooltipDescription).toHaveText('Four simple tips to become a workflow expert.');

  const scratchWorkflowTooltipPrimaryButton = page.getByTestId('scratch-workflow-tooltip-primary-button');
  await expect(scratchWorkflowTooltipPrimaryButton).toHaveText('Show me');

  let scratchWorkflowTooltipSkipButton = page.getByTestId('scratch-workflow-tooltip-skip-button');
  await expect(scratchWorkflowTooltipSkipButton).toHaveText('Watch later');
  await scratchWorkflowTooltipSkipButton.click();

  await expect(scratchWorkflowTooltip).not.toBeVisible();

  await page.reload();

  scratchWorkflowTooltip = page.getByTestId('scratch-workflow-tooltip');
  await expect(scratchWorkflowTooltip).toBeVisible();

  scratchWorkflowTooltipSkipButton = page.getByTestId('scratch-workflow-tooltip-skip-button');
  await expect(scratchWorkflowTooltipSkipButton).toHaveText('Watch later');
  await scratchWorkflowTooltipSkipButton.click();

  const scratchWorkflowTooltip2 = page.getByTestId('scratch-workflow-tooltip');
  await expect(scratchWorkflowTooltip2).not.toBeVisible();

  await page.reload();

  scratchWorkflowTooltip = page.getByTestId('scratch-workflow-tooltip');
  await expect(scratchWorkflowTooltip).not.toBeVisible();
});
