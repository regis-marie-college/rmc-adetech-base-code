// database/migrate.js
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const migrationName = process.argv[2];

if (!migrationName) {
  console.error("❌ Please provide a migration name.");
  console.error("   Example: npm run migrate create_users_table");
  process.exit(1);
}

const migrationPath = path.join(__dirname, `${migrationName}.js`);

let migrationFn;
try {
  migrationFn = require(migrationPath);
} catch (err) {
  console.error(`❌ Migration file '${migrationName}.js' not found.`);
  process.exit(1);
}

const dbPath = path.join(__dirname, "..", "app.db");
const db = new sqlite3.Database(dbPath);

console.log("📦 Running migration:", migrationName);

migrationFn(db)
  .then(() => {
    console.log("✅ Migration completed!");
    db.close();
  })
  .catch((err) => {
    console.error("❌ Migration error:", err);
    db.close();
  });
