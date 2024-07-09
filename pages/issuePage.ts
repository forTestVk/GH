import { Page, expect } from '@playwright/test';

export class issuePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openRepo(repoName: string) {
    await this.page.click(`a[href="/${repoName}"]`);
  }

  async openIssues() {
    await this.page.getByRole('link', { name: 'Issues Issues' }).click(); 
  }

  async newIssue() {
    await this.page.getByRole('link', { name: 'New issue' }).click();
  }

  async fillIssue(title: string, description: string, assignee: string) {
    await this.page.fill('input[name="issue[title]"]', title);
    await this.page.fill('textarea[name="issue[body]"]', description);
    await this.page.getByRole('button', { name: 'Assignees' }).click();
    await this.page.getByRole('menuitemcheckbox').click();
    await this.page.getByRole('menuitemcheckbox').press('Escape');
    await this.page.getByRole('button', { name: 'Labels' }).click();
    await this.page.getByText('bug').click();
    await this.page.getByPlaceholder('Filter labels').press('Escape');   
  }

  async submitIssue() {
    await this.page.getByRole('button', { name: 'Submit new issue' }).click();
  }

  async checkIssue(title: string, description: string, label: string, assignee: string) {
    const issueTitle = this.page.locator('a[data-hovercard-type="issue"]').filter({ hasText: title });
    await expect(issueTitle).toBeVisible();

    const issueDescription = this.page.getByRole('cell', { name: description });
    await expect(issueDescription).toBeVisible();

    const issueLabel = this.page.locator('#partial-discussion-sidebar').getByRole('link', { name: label });
    await expect(issueLabel).toBeVisible();

    const issueAssignee = this.page.locator(`a[aria-label="${assignee}"]`);
    await expect(issueAssignee).toBeVisible();
  }

  async deleteIssue(title: string) {
    await this.page.locator('a[data-hovercard-type="issue"]').filter({ hasText: title }).first().click();
    await this.page.getByRole('button', { name: 'Delete issue' }).click();
    await this.page.getByRole('button', { name: 'Delete this issue' }).click();
  }

  async checkIssueNotExists(title: string) {
    const issueTitle = this.page.locator('a[data-hovercard-type="issue"]').filter({ hasText: title });
    await expect(issueTitle).toHaveCount(0);
  }
}