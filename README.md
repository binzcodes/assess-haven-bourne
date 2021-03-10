Simply run `docker-compose up`

# Rationale

Simple express app to serve, heavy lifting/data handling in database w/communication via TypeORM.
Data stored in Postgres, cached in redis to tolerate traffic.
Ended up fairly feature-rich.

## Data Store
Postgres
- Overkill, but most datastores would be for this batch
- At this scale serving static would suffice but i don't think that would fit the brief.
  Originally built this serving from file & wired in TypeORM/PG later.
- Figure if I'm going overkill I might as well throw a cache in, so Redis

Of the opinion that RDBMS are preferable to NoSQL store for relational data at any scale
Ideally, I'd run this on FaunaDB for scale.
For this actual batch of data

Redis
- Intended as very-short-term cache to protect PG
- set 30s for demo but would adjust per end-point (with .cache(time))

## TypeORM
First time using, have been looking for an opportunity to try it out!
Plays better with TS than sequelize into a fair few minor bugs that required awkward workarounds.
Perhaps not the best choice to demonstrate prog skills

## Tests

Sadly, I can't get the test suite working. The issue is with setting up DB conn rather than writing the tests.
Apparent issue with hoisting the ORM (typeORM) entities/data model to the connection in the testing environment.

I'm out of time for debugging and didn't get to writing tests properly.

Database is doing all the heavy lifting regarding data shape so little else to test, too.
Have roughed-in basic tests for integration-testing endpoints (which won't run).
Mocking would be a solution but not sure what would benefit.

# More time?
- Resolve issue with testing environment
  - Next steps would be stackoverflow/gitter
  - Meanwhile, mocking could suffice as no DB conn needed
- Improve data loading
  - Had to work around an aparent issue with typeORM
  - Running loader on container build
- Properly setup production environment/security
- Move a few hard-coded opts to config
