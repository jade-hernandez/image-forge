// import { waitForPageReady } from "@storybook/test-runner";
import { checkA11y, injectAxe } from "axe-playwright";
import { toMatchImageSnapshot } from "jest-image-snapshot";

const viewports = {
  iPhone5: {
    width: 320,
    height: 568,
  },
  iPhone8p: {
    width: 414,
    height: 736,
  },
  iPad: {
    width: 768,
    height: 1024,
  },
  iPad12p: {
    width: 1024,
    height: 1366,
  },
  desktop720p: {
    width: 1280,
    height: 720,
  },
  desktop1080p: {
    width: 1920,
    height: 1080,
  },
};

const config = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },

  async preVisit(page, context) {
    // Runs before each story is visited, equivalent to the previous preRender
    try {
      await injectAxe(page);

      // Set __TEST__ environment variable to true to enable test mode in the component
      await page.evaluate(() => {
        window.__TEST__ = true;
      });
    } catch (error) {
      console.error("Error injecting Axe for accessibility tests:", error);
    }
  },
  async postVisit(page, context) {
    // Runs after each story is visited, equivalent to the previous postRender
    try {
      await checkA11y(page, "#storybook-root", {
        detailedReport: true,
        detailedReportOptions: { html: true },
      });
      const accessibilityTree = await page.accessibility.snapshot();
      expect(accessibilityTree).toMatchSnapshot();

      // Waits for the page to be ready before taking a screenshot to ensure consistent results
      // This is commented out because waitForPageReady is relying on the networkidle state which is not working as of now.
      // await waitForPageReady(page);
      // await page.waitForLoadState("networkidle");
      await page.waitForLoadState("domcontentloaded");
      await page.waitForLoadState("load");
      await page.waitForFunction(
        () =>
          document.readyState === "complete" &&
          document.fonts.ready &&
          // naturalWidth will be zero if image file is not yet loaded.
          ![...document.images].some(
            ({ naturalWidth, loading }) => !naturalWidth && loading !== "lazy"
          )
      );

      // Iterate over each viewport and take a screenshot
      for (const [viewportName, size] of Object.entries(viewports)) {
        await page.setViewportSize(size);
        // You might need to wait for any responsive layouts/animations to settle
        await page.waitForTimeout(500); // Adjust the timeout as necessary

        // the #storybook-root element wraps the story. In Storybook 6.x, the selector is #root
        const elementHandler = await page.$("#storybook-root");
        const innerHTML = await elementHandler.innerHTML();
        expect(innerHTML).toMatchSnapshot();

        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot({
          customSnapshotIdentifier: `${context.id}-${viewportName}`,
        });
      }
    } catch (error) {
      console.error("Error during accessibility checks:", error);
    }
  },
};

export default config;
