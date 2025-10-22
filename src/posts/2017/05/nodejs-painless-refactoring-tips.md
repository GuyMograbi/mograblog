---
title: Organize NodeJS Code in 5 Minutes (No New Tools Required)
published: 2017-05-01T22:30:00.001-07:00
layout: post.pug
keywords: nodejs, refactor, monorepo, local packages
description: Organize your code and still move fast. No learning curve required. Do not compromise your code quality.
cover: /style/images/2017/05/easy_refactoring.jpg
coverTitle: Organized Closet
---

> Move fast without breaking your codebase. This simple technique takes 5 minutes and requires zero new dependencies.

**TL;DR:** Use `file:` protocol in package.json to turn folders into local packages. Eliminates `../../../` hell instantly.

# Easily breaking node project to modules - Overview

The easiest way is to isolate code to a folder. Identify code that is already relatively encapsulated and that will work if you simply move it.

Here is a summary of the method:

 - create a folder named `packages`
 - create another folder named `my-package` (change the name to better describe the package).
 - create a file `packages/my-package/package.json`
   - name the same as the folder (`my-package`)
   - set version to `0.0.0`
   - add all the dependencies your code requires to work.
   - If you need a package from parent project, instead of duplicating the dependency and syncing the version, just use `"peerDependencies"` instead.
 - go back to your project's `package.json` and add a dependency `"my-package": "file:./packages/my-package"`
 - run `npm install` in the root project.
   - you will see a symlink created in `node_modules` to your new isolated package.
   - you can count on the installation to work just like any other package. for example `postinstall` will work just the same.
 - Change all dependencies to the code, remove relative path

## Example: Refactoring a utils folder

Welcome to project `mograblog`. It is a huge project with thousands of files. It's becoming hard to maintain. Moreover, I have a folder named `utils` which is used all over. So a lot of files have a line that looks like `../../../utils`.

```
 + mograblog-project
   + src
     - server.js
     - package.json
     + some-code
     + utils
       - string-utils.js
       - math-utils.js
       - posts-utils.js
       - index.js
     + some-more-code
     ...
```

I notice that all the code in utils is pretty isolated. There are some dependencies to external libraries such as `lodash` and `pad` but no internal dependencies outside `utils`.

I move the files under `packages` and add file `package.json`:

```
+ mograblog-project
  + src
    - server.js
    - package.json
    + some-code
    + packages
      + mograblog-utils
        - package.json
        - string-utils.js
        - math-utils.js
        - posts-utils.js
        - index.js
    + some-more-code
    ...
```

I deliberately add a prefix `mograblog` to `utils` so if a library exists by the name `utils` (and one does exist) - it won't collide.

I modify `package.json` files:

```javascript
// mograblog-project/package.json
{
  "scripts": {
    "postinstall": "ls -ll utils", // this is now redundant.. I will move this soon.
  },
  "dependencies" : {
    "lodash": "4.0.3",
    "mograblog-utils": "file:./packages/mograblog-utils"
  }
}

// mograblog-project/packages/mograblog-utils/package.json
{
  "name": "mograblog-utils",
  "version": "0.0.0",
  "dependencies": {
    "lodash": "4.0.3",
    "pad": "^0.0.0"
  }
}
```

I now notice 2 things:

- `lodash` is used by both projects - I have to make sure both are on version 4.0.3 all the time. The solution would be to use `peerDependencies` instead. Leaving it in dependencies will also work, but one day your team will need to be aware which code uses which `lodash` version.
- The root project has a `postinstall` script which only affects `utils` - this breaks the encapsulation. The solution is to move it to the utils folder.

```javascript
// mograblog-project/packages/mograblog-utils/package.json
{
  "name": "mograblog-utils",
  "version": "0.0.0",
  "scripts": {
    "postinstall": "ls -ll ."
  },
  "dependencies": {
    "pad": "^0.0.0"
  },
  "peerDependencies": {
    "lodash": "4.0.3"
  }
}
```

I also go over all dependencies that look like `require('../../../utils')` and change them to simply `require('mograblog-utils')`

## What about the tests?

You could move the tests under your new package and make them work there. This would require some build changes as well.

## Pros and Cons

**Pros:**
- Straightforward solution with no learning curve
- No build or setup changes required (unless you move tests)
- Extremely quick results
- Gets the job done

**Cons:**
- Code is not reusable outside the `mograblog-project`. If you have a monorepo with multiple projects, this code will only be available to this specific project.
- The technique will not work well with folders outside `mograblog-project`, especially if you are using Docker to build the project.

## Modern Alternative: npm Workspaces

**Note:** This post describes the pre-npm-7 approach using `file:` protocol. Modern npm (7+) has built-in [workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) support which provides similar functionality with better tooling. For new projects, consider using workspaces. For existing projects or teams that can't upgrade npm, this `file:` approach still works perfectly.

## Summary

NodeJS is an amazingly flexible environment which allows you to get fast results especially when it comes to organizing the code. Teams that need to move fast and are unable to put effort in the near future in learning curves and build modifications, do not need to compromise on code organization.
