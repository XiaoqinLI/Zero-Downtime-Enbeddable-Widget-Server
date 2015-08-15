## The deployment contains three environments:
### dev: port 88;
### qa: port 90;
### prod: port 92;

## Directory stucture:

```
shared                -- place to store nginx configuration template and all abstract docker compose yml files to which other environents need to extend.
  /nginx              -- place to store nginx configuration template
  gen.yml             -- abstact yml for node generator container
  nginx.yml           -- abstact yml for nginx container
  watchman.yml        -- abstact yml for watchman container
dev                   -- develop environment for deployment
  docker-compose-gen.yml  -- yml file for node generator container
  docker-compose.yml      -- yml file for nginx and watchman(docker-gen) container
  lastest_tag         -- save lastest tag number
  running_tag         -- save current running tag number
  run.sh              -- the shell script that start server deployment
  update.sh           -- the shell script that update the server 
prod                  -- production environment for deployment
qa                    -- QA environment for deployment
```

### how to deploy:

Git Tag is used to control the version of deployment. Please add a new tag ( a better automated way may be figured out soon ) to the repo before a pull request to master branch gets approved and merged.

Whenever a pull request gets approved and merged to Master branch of generator repo, it would trigger a Bamboo build with dev branch. If this is the first time（meaning that there is no nginx docker container serving the generator application）that generator servers are going to launch on VM, "run.sh" will be excuted, if not, then "update.sh" will run to update the server. If the build on dev succeeds, it will trigger another build in qa branch, which runs a browserstack test together with the same version of code as the dev branch has.

If QA build succeeds, then the prod branch is ready to run or update, only manually.

To manually start the server in dev at your local or VM, please run bash script "run.sh" in dev