import { describe, expect, test } from '@jest/globals';
import type { Meta, StoryFn } from '@storybook/react';
import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import * as glob from 'glob';
import path from 'path';

type StoryFile = {
  default: Meta;
  [name: string]: StoryFn | Meta;
};

const compose = (entry: StoryFile): ReturnType<typeof composeStories<StoryFile>> => {
  try {
    return composeStories(entry);
  } catch (e) {
    throw new Error(
      `There was an issue composing stories for the module: ${JSON.stringify(entry)}, ${e}`
    );
  }
};

function getAllStoryFiles() {
  const storyFiles = glob.sync(path.join(__dirname, `../src/**/*.stories.{js,jsx,mjs,ts,tsx}`));

  return storyFiles.map((filePath) => {
    const storyFile = require(filePath);
    return { filePath, storyFile };
  });
}

const options = {
  suite: 'Storybook Tests',
  storyKindRegex: /^.*?DontTest$/,
  storyNameRegex: /UNSET/,
  snapshotExtension: '.storyshot',
};

describe(options.suite, () => {
  // @ts-expect-error - componentName is not defined in the type, but we use it to identify the component.
  getAllStoryFiles().forEach(({ storyFile, componentName }) => {
    const meta = storyFile.default;
    const title = meta.title || componentName;

    if (options.storyKindRegex.test(title) || meta.parameters?.storyshots?.disable) {
      // Skip component tests if they are disabled
      return;
    }

    describe(title, () => {
      const stories = Object.entries(compose(storyFile))
        .map(([name, story]) => ({ name, story }))
        .filter(({ name, story }) => {
          // Implements a filtering mechanism to avoid running stories that are disabled via parameters or that match a specific regex mirroring the default behavior of Storyshots.
          return !options.storyNameRegex.test(name) && !story.parameters.storyshots?.disable;
        });

      if (stories.length <= 0) {
        throw new Error(
          `No stories found for this module: ${title}. Make sure there is at least one valid story for this module, without a disable parameter, or add parameters.storyshots.disable in the default export of this file.`
        );
      }

      stories.forEach(({ name, story }) => {
        // Instead of not running the test, you can create logic to skip it, flagging it accordingly in the test results.
        const testFn = story.parameters.storyshots?.skip ? test.skip : test;

        testFn(name, async () => {
          const mounted = render(story());
          // Ensures a consistent snapshot by waiting for the component to render by adding a delay of 1 ms before taking the snapshot.
          await new Promise((resolve) => setTimeout(resolve, 1));
          expect(mounted.container).toMatchSnapshot();
        });
      });
    });
  });
});
