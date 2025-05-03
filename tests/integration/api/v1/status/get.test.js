test("Get to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody.dependencies).toBeDefined();
  expect(responseBody.dependencies.database).toBeDefined();
  expect(responseBody.dependencies.database.max_connection).toBeDefined();
  expect(responseBody.dependencies.database.opened_connections).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toBe(parsedUpdatedAt);

  const database = responseBody.dependencies.database;

  const versionRegex = /([1-9](\d*))+/;
  expect(versionRegex.test(database.version)).toBe(true);

  expect(database.version).toBe("16.8");

  expect(database.max_connection).not.toBe(NaN);
  expect(database.max_connection).toEqual(100);

  expect(database.opened_connections).not.toBe(NaN);
  expect(database.opened_connections).toEqual(1);

  expect(database.max_connection > 0).toBe(true);

  expect(parseInt(database.opened_connections) < database.max_connection).toBe(
    true,
  );
});

// test.only("SQL Injection Test", async () => {
//   const response = await fetch(
//     "http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4); --",
//   );
// });
