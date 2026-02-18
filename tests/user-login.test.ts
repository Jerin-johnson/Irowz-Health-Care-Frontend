import { test, expect } from "@playwright/test";

test("User login works and API responds within SLA", async ({ page }) => {
  // Increase timeout for slower environments (optional but safe)
  test.setTimeout(60_000);

  //  Open login page
  await page.goto("/user/login");

  //  Ensure page loaded
  await expect(page.getByText("Login", { exact: true })).toBeVisible();

  //  Enter email
  await page.fill(
    'input[placeholder="Enter your email or mobile"]',
    "patient@gmail.com",
  );

  //  Enter password
  await page.fill('input[type="password"]', "Jerin123@");

  // Start timing BEFORE clicking
  const startTime = Date.now();

  //  Wait for ANY auth POST request (robust matching)
  const loginResponsePromise = page.waitForResponse(
    (res) =>
      res.url().includes("/api/auth") &&
      res.request().method() === "POST" &&
      res.ok(),
  );

  //  Click Login
  await page.getByRole("button", { name: "Login" }).click();

  // Wait for backend response
  const response = await loginResponsePromise;

  //  Measure backend response time
  const responseTime = Date.now() - startTime;

  console.log(`✅ Login API responded in ${responseTime} ms`);

  //  Enforce performance SLA
  expect(responseTime).toBeLessThan(2000);

  //  Wait for UI to complete redirects & API calls
  await page.waitForLoadState("networkidle");

  // Assert login success (not on login page anymore)
  await expect(page).not.toHaveURL("/user/login");

  // (Optional stronger assertion — use what exists in your app)
  // await expect(page.getByText(/doctor|dashboard|profile/i)).toBeVisible();
});
