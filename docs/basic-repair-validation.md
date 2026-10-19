# Basic reliability repairs

These changes preserve the basic Laravel/React application. They do not introduce AI-Murshid's new curriculum or certify existing explanations as scholar-approved content.

## Validate locally or in staging

Use PHP 8.2+ with the required Composer extensions and PDO SQLite for the test suite. Keep testing isolated from production.

```sh
composer install
npm ci
npm run build
php artisan test
```

The new regression tests cover fresh migrations, preservation of legacy theme/explanation mappings, seeding safeguards, matching/ranking, guidance ordering, paired verse-text caching, upstream failures and reference mismatch rejection. They use synthetic text fixtures, not new religious content.

Also test migration behavior against an isolated copy of the actual MySQL schema before deploying schema changes. SQLite tests do not establish MySQL deployment compatibility.

## Migration and data handling

- Take a verified database backup and record `php artisan migrate:status` before deployment.
- Do not use `migrate:fresh`, `db:wipe`, demo seeders, or migrations with `--seed` on a live database.
- The repaired historical migrations apply only where they are still pending. Already-applied migrations must not be rerun or deleted from the migration history to force these changes.
- The legacy pivot migration now copies associations and explanations before dropping their source columns. Conflicting content stops migration for manual review.
- These repairs cannot recover data already removed by an earlier migration/seeder. Recover that data from a verified backup when available.
- Rolling back the many-to-many content migration is intentionally blocked: flattening it into a single theme would lose information. Plan recovery using a tested backup/restore procedure rather than assuming `migrate:rollback` is safe.

## Behavior changes

- Unknown text returns a clear no-match response rather than silently selecting Hope. Matching respects word boundaries and classifier score order. Existing mobile topic presets are recognized.
- Guidance uses a stable verse order. Arabic and English text are requested together, checked for the requested reference/edition, and cached for seven days. Upstream/cache failures fall back to stored text; upstream failures back off briefly. This checks transport identity, not scholarly approval or redistribution rights.
- Stored text may contain existing excerpts. Canonical text/source review remains separate work; no seed verse/explanation has been rewritten by this change.
- External search results remain browsable but no longer link to nonexistent local reflection records. External pagination begins with page one.
- Logout clears the browser token even when the logout API fails. Asset diagnostics are restricted to CLI use.

## Manual smoke checks

Check guest theme browsing, local verse detail, external search/pagination, no-match guidance, all mobile topic presets, repeat guidance, upstream outage fallback, browser login/logout with a network failure, and existing-user journal access. Verify diagnostics return 404 over HTTP. Confirm an actual device can connect to the intended development/staging API and check signup/login in the companion mobile PR.
