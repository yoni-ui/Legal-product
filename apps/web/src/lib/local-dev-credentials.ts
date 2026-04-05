/**
 * Premade accounts created by `apps/api/scripts/seed_local_dev.py`.
 * REMOVE from UI and delete users from DB before production.
 */
export type PremadeTestAccount = { email: string; password: string; label: string };

export const PREMADE_TEST_ACCOUNTS: PremadeTestAccount[] = [
  { label: "Dev", email: "dev@local.tebekaye", password: "devlocal123" },
  { label: "QA test", email: "test@tebekaye.local", password: "TestAccount123!" },
];

/** @deprecated use PREMADE_TEST_ACCOUNTS */
export const LOCAL_DEV_EMAIL = PREMADE_TEST_ACCOUNTS[0].email;
/** @deprecated use PREMADE_TEST_ACCOUNTS */
export const LOCAL_DEV_PASSWORD = PREMADE_TEST_ACCOUNTS[0].password;
