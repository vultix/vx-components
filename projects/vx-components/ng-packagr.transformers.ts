import { NgPackagerHooks, NgPackagerHooksContext } from 'ng-cli-packagr-tasks';
import { join } from 'path';
import { Bundler } from 'scss-bundle';
import * as fs from 'fs';

import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);

const hooks: NgPackagerHooks = {
  writePackage: {
    before: async taskContext => {
      const globalContext = taskContext.context();
      const workspaceRoot = globalContext.builderContext.workspaceRoot;
      // const srcRoot = globalContext.builderConfig.sourceRoot;

      // Builds the scss
      const bundler = new Bundler(undefined, workspaceRoot);

      const result = await bundler.Bundle('./projects/vx-components/src/theming.scss');

      await writeFile(join(workspaceRoot, 'dist/vx-components/theming.scss'), result.bundledContent);
    }
  }
};
module.exports = hooks;
// return hooks;
