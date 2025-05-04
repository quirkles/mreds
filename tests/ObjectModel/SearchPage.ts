import { Page } from '@playwright/test';

export class SearchPage {
  private page: Page;

  // Locators
  private searchInput = 'input[name="Search Team"]';
  constructor(page: Page) {
    this.page = page;
  }

  // Method to navigate to the login page
  async goto() {
    await this.page.goto('/'); // Replace with your login URL
  }

  // Method to fill in the login form
  async fillSearchInput(teamName: string) {
    await this.page.fill(this.searchInput, teamName);
  }
}
