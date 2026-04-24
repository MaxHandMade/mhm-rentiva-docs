---
id: test-suite
title: Test Suite & Infrastructure
sidebar_label: Testing Tools
sidebar_position: 2
---

![Version](https://img.shields.io/github/v/release/MaxHandMade/mhm-rentiva?style=flat-square&label=version&color=blue) ![Docs](https://img.shields.io/badge/docs-premium_standard-0f766e?style=flat-square) ![Updated](https://img.shields.io/github/release-date/MaxHandMade/mhm-rentiva?style=flat-square&label=last%20updated&color=orange)

:::info Purpose
This page explains Rentiva's test ecosystem — PHPUnit configuration, CI matrix, Docker wrappers, and the custom Listener structure — to developers.
:::

# Test Suite Architecture

Rentiva uses a **PHPUnit 9.6** infrastructure customized for WordPress. This infrastructure is reinforced with custom tooling that guarantees both test speed and database cleanup quality.

---

## Current Test Baseline

| Version | Tests | Assertions | Skipped | Date |
|---|---|---|---|---|
| **v4.23.0** (current) | **567** | **2036** | 4 | 26.03.2026 |
| v4.22.2 | 562 | 2024 | 4 | 25.03.2026 |
| v4.22.0 (T8+T9 milestone) | 563 | 2022 | — | 24.03.2026 |
| v4.21.27+T8 | 517 | 1963 | — | 24.03.2026 |
| v4.21.27 | 463 | 1901 | — | — |
| v4.20.0 (initial locked baseline) | 268 | 1379 | — | — |

---

## Test Categories

### Shortcode Render Tests
13 shortcode render test files validate the output of all shortcodes. These tests cover the CAM pipeline end-to-end: `AllowlistRegistry` -> `CanonicalAttributeMapper` -> shortcode `render()`.

### SettingsSanitizer Tests
4 SettingsSanitizer test files test the sanitization and validation of settings values.

### AllowlistRegistry Tests
199 unique attribute keys, 19 TAG_MAPPING entries, and consistency of enum values are verified.

### KeyNormalizer Tests
27 tests, 32 assertions — camelCase/snake_case conversion, alias resolution, and edge cases.

---

## CI Matrix

The CI pipeline runs on the following matrix:

| | PHP 8.1 | PHP 8.2 | PHP 8.3 |
|---|---|---|---|
| **WP 6.7** | PHPUnit | PHPUnit | PHPUnit |
| **WP latest** | PHPUnit | PHPUnit + PHPCS | PHPUnit |

- **Total:** 6 parallel jobs (PHP 8.1/8.2/8.3 x WP 6.7/latest)
- **PHPCS gate:** Runs via `composer phpcs` on PHP 8.2 and is a mandatory gate
- Merging is not allowed until all jobs pass

---

## Core Components

### 1. PHPUnit Configuration (`phpunit.xml`)
The test process bootstraps the WordPress test environment via `tests/bootstrap.php`.
- **Coverage:** Tracks the `./src/` directory with a target of 100% coverage.
- **Multisite:** Set to `0` (false) by default.

### 2. MHM Test Listener (`MHM_Test_Listener`)
A custom listener that applies the "Hybrid Reset" strategy.
- **Purpose:** Automatically cleans up temporary tables (with `wptests_` prefix) created during isolated test runs (`MHM_TEST_IS_ISOLATED`).
- **Safety:** Only deletes tables matching a controlled pattern (`DROP TABLE IF EXISTS`).

---

## Docker and CLI Usage

Tests run inside an isolated **Docker** container regardless of the host OS (Windows/macOS/Linux).

```bash
# Run all tests
npm run test

# Run only a specific group
docker exec -it mhm-container vendor/bin/phpunit --group financial

# PHPCS check (CI gate)
composer phpcs
```

---

## Code Coverage Report

The system enforces strict coverage rules for critical financial and core modules.
- **HTML Report:** Generated in the `build/coverage` directory.
- **Critical Modules:** `src/Core/Financial` and `src/Core/Security` modules are always audited.

---

## Test Fixtures

Test data is kept in the `tests/fixtures` directory.
- **Idempotency:** Because the database is cleaned before each test suite, tests are independent of each other.
- **Isolation:** Thanks to `MHM_Test_Listener`, data does not collide during parallel test runs.

## Section Summary
- The test infrastructure is built on **PHPUnit 9.6**.
- **567 tests, 2036 assertions** (v4.23.0 baseline).
- CI matrix: **6 jobs** (PHP 8.1/8.2/8.3 x WP 6.7/latest) + PHPCS gate.
- Database pollution is prevented with the **Hybrid Reset** strategy.
- During development, `npm run test` is the primary validation command.

## Changelog
| Date | Version | Note |
|---|---|---|
| 23.04.2026 | 4.27.2 | English translation added. |
| 27.03.2026 | 4.23.0 | Test baseline v4.23.0 (567/2036/4), CI matrix (6 jobs + PHPCS), test categories (shortcode render, sanitizer, allowlist, key normalizer) added. |
| 19.03.2026 | 4.21.2 | PHPUnit 9.6 and MHM_Test_Listener documentation added. |
