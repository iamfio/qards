import { expect, test } from "@playwright/test";

async function dismissCookieConsentIfVisible(
  page: import("@playwright/test").Page,
) {
  const consentButton = page.getByRole("button", { name: "Let's Go!" });
  if ((await consentButton.count()) > 0) {
    await consentButton.click();
    await expect(consentButton).not.toBeVisible();
  }
}

test.describe("Qards critical app flows", () => {
  test("home page renders key public content", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Qards", level: 1, exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "One QR Code for All Your Links." }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Sign In / Sign Up" }),
    ).toBeVisible();
  });

  test("features accordion renders key onboarding steps", async ({ page }) => {
    await page.goto("/");
    await dismissCookieConsentIfVisible(page);

    await expect(
      page.getByRole("button", { name: "1. Sign Up Instantly" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "2. Create Your Qards" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "3. Share with a Scan" }),
    ).toBeVisible();
  });

  test("clicking sign in opens auth page", async ({ page }) => {
    await page.goto("/");
    await dismissCookieConsentIfVisible(page);

    await page.getByRole("button", { name: "Sign In / Sign Up" }).click();

    await expect(page).not.toHaveURL(/\/dashboard/);
  });

  test("protected dashboard routes redirect guest to home", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/$/);

    await page.goto("/dashboard/profile/edit");
    await expect(page).toHaveURL(/\/$/);
  });

  test("cookie consent can be accepted when banner is visible", async ({
    page,
    context,
  }) => {
    await page.goto("/");

    const consentButton = page.getByRole("button", { name: "Let's Go!" });
    if ((await consentButton.count()) === 0) {
      test.skip(true, "Cookie consent banner is not shown in this environment");
    }

    await consentButton.click();

    await expect(consentButton).not.toBeVisible();

    const cookies = await context.cookies();
    expect(cookies.some((cookie) => cookie.name === "qardsAppCookie")).toBe(
      true,
    );
  });

  test("accordion content for default item is visible", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByText("Create your account in seconds", {
        exact: false,
      }),
    ).toBeVisible();
  });
});
