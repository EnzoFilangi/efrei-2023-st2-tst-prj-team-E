import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  // test.skip(({ browserName }) => browserName !== 'chromium', 'Chromium only!');

  test("Open Homepage" , async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto('https://e.hr.dmerej.info');
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("HR DB - HR DB");
  });

  test('Homepage has title and links to add_team page', async ({ page }) => {

    // Go to the starting url before each test.
    await page.goto('https://e.hr.dmerej.info');
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("HR DB - HR DB");
    
    // create a locator
    const getStarted = page.getByRole('link', { name: 'Create new team' });
  
    // Expect an attribute "to be strictly equal" to the value.
    await expect(getStarted).toHaveAttribute('href', '/add_team');
  
    // Click the get started link.
    await getStarted.click();
  
    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*add_team/);
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("HR DB - HR DB - Add Team");
  });
  
});


