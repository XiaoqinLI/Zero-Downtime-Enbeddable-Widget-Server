# The Repo of generator
This generator is written on top of base12 nodeJS principle (pleasee see the notes at the end of this file), the details is as the following directory structure:

```
(assets)                -- place to store assets for project (graphics, src files, etc.)
components            -- place to store components for small piecs of functionality in app
  /physician-card     -- default embeddable widget for demo use.
  (/errors)           -- default component for handling server errors
doc                   -- documentation for widget components.
lib                   -- app specific and non-npm-published node.js libraries
  /balance            -- uses cluster to create and blance multiple processes
  /config-load        -- loads available config files and environment variables
  /ipAddress-wrap     -- get VM/container's ip address.
  /middleware         -- sets up express middleware (stylus, sessions, logs)
  /mongoose           -- connects mongoose to mongodb
  /redis              -- provides app-wide redis connection
public                -- static files are hosted here
scripts               -- scripts (eg admin, deployment, migrations)
test                  -- tests (mocha by default)
tmp                   -- your app can store temporary files here

app.js                -- runs your app
.env                  -- the env variable file that records all environment variables sent in the application
config.default.js     -- default config (no sensative passwords or location specific options)
(config.local.js)     -- local config (ignored by git, you can create it to store sensative information and location specific options)
config.test.js        -- config for running tests
Dockerfile            -- the docker file that build this generator codes in a docker image file.
Makefile              -- automated task makefile
package.json          -- npm package.json
```

```shell
before running any commands below from shell, make sure your current directory is where "app.js" exists.
```
If you want to run generator server directly, simply run: "node app.js" or "nodemon app.js" if you have nodemon installed. It runs in port 3333.

In our deployment, we server generator server using docker containers, you can find more infomation about it in deployment repo.


### Writing new components and libs

All base12 components have the same signature:

```javascript
module.exports = function(app) {
  // ...
  return my_module;
}
```

The component or lib is responsible for supplying the app with the needed interface hooks.  For example, a component might look like:
```javascript
module.exports = function(app) {
  app.get('/dashboard', function(req, res) {
    return res.render(require('path').join(__dirname, 'dashboard'), {
      user: req.session.user
    });
  });
};
```

### Updating constants and config

Application constants (values that do not change from machine to machine) are located in `config.default.js`.
```js
module.exports = {
  port: 3000,
  cluster: true,
  request_timeout: 100000,
  session_secret: "base12secret",
  log_requests: false,
  test: false
};
```

Environment config (values that can change from machine to machine) are located in `config.local.js`, which is not tracked by git.
You can create this file whenever needed and it values will override the defaults if both exist.

```js
module.exports = {
  port: 80,
  mongoose_url: "mongodb://username:passsword@127.0.0.1/base12"
};
```

All system environment variables will also act as local config object and will also override default settings of the same name. This leaves it up to the developer and environment which way they want to specify location dependent settings.


## The 12 Factors

### 1. Codebase

"One codebase tracked in version control, many deploys."

Base12 uses git-based deployments exclusively.

### 2. Dependencies

"Explicitly declare and isolate dependencies."

Base12 uses `npm install` both locally and in deploys to manage dependencies.
Manage your dependencies in `package.json`.

### 3. Config

"Store config in the environment."

Base12 uses the untracked config.local.js file to manage environment config. It will also pull in available environment variables for instant compatibility with cloud providers like Heroku.

### 4. Backing services

"Treat backing services as attached resources."

Backing service configuration is stored in config.local.js or environment variables on each host.

### 5. Build, release, run

"Strictly separate build and run stages."

`make build` builds a base12 app's assetes, while `make run` executes it. `make cycle` watches local files and cycles between build and run phases for rapid development.

### 6. Processes

"Execute the app as one or more stateless processes."

Base12 apps are stateless. The built-in session manager could be backed by redis, and apps can be run as any number of independent processes forked from app.js.
The directory structure provides /tmp for temporary file manipulation, but provides no permanent file storage mechanism since that should be done through a backing service.

### 7. Port binding

"Export services via port binding."

Ultimately, base12 relies on node's built-in http server to field requests. No http container or helper is needed.

### 8. Concurrency

"Scale out via the process model."

Using deployment-specific process managers (eg, upstart), base12 keeps the master node.js process running.
In `make run` base12 uses cluster to spawn and monitor multiple processes on a single machine.

### 9. Disposability

"Maximize robustness with fast startup and graceful shutdown."

Base12 usually uses a crash-only design. Uncaught errors exit the process, triggering the balancer to replace it.
Startup is nearly immediate.

### 10. Dev/prod parity

"Keep development, staging, and production as similar as possible."

We encourage you to keep your config.local.js configurations as similar as possible across machines to maximize parity.

### 11. Logs

"Treat logs as event streams."

Base12 logs events directly to stdout and stderr.

### 12. Admin processes

"Run admin/management tasks as one-off processes."

All admin processes are handled with scripts in the /scripts directory.
