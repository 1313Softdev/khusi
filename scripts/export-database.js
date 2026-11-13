const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function exportDatabase() {
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'khushinder_db',
    charset: 'utf8mb4',
  });

  console.log('Connected to MySQL. Generating complete database export...');

  let sqlOutput = `-- =====================================================================
-- Sardar Khushinder Singh Jand Sahib - Official Portal Database Dump
-- Compatible with Hostinger MySQL / MariaDB & phpMyAdmin
-- Generated on: ${new Date().toISOString()}
-- Charset: utf8mb4
-- =====================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET NAMES utf8mb4;
SET time_zone = "+00:00";

-- ---------------------------------------------------------------------
-- Database: khushinder_db
-- ---------------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS \`khushinder_db\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`khushinder_db\`;

`;

  // Get list of tables
  const [tablesResult] = await connection.query('SHOW TABLES');
  const tableNames = tablesResult.map((row) => Object.values(row)[0]);

  console.log(`Found ${tableNames.length} tables in khushinder_db`);

  for (const table of tableNames) {
    console.log(`Exporting table: ${table}`);
    sqlOutput += `-- ---------------------------------------------------------------------\n`;
    sqlOutput += `-- Table structure for table \`${table}\`\n`;
    sqlOutput += `-- ---------------------------------------------------------------------\n`;
    sqlOutput += `DROP TABLE IF EXISTS \`${table}\`;\n`;

    const [createTableResult] = await connection.query(`SHOW CREATE TABLE \`${table}\``);
    const createTableSql = createTableResult[0]['Create Table'];
    sqlOutput += `${createTableSql};\n\n`;

    // Fetch data
    const [rows] = await connection.query(`SELECT * FROM \`${table}\``);
    if (rows.length > 0) {
      sqlOutput += `-- Dumping data for table \`${table}\` (${rows.length} rows)\n`;
      const columns = Object.keys(rows[0]).map((c) => `\`${c}\``).join(', ');

      const batchSize = 50;
      for (let i = 0; i < rows.length; i += batchSize) {
        const batch = rows.slice(i, i + batchSize);
        const valueStrings = batch.map((row) => {
          const vals = Object.values(row).map((v) => {
            if (v === null || v === undefined) return 'NULL';
            if (typeof v === 'number') return v;
            if (typeof v === 'boolean') return v ? 1 : 0;
            if (v instanceof Date) {
              return `'${v.toISOString().slice(0, 19).replace('T', ' ')}'`;
            }
            if (Buffer.isBuffer(v)) {
              return `X'${v.toString('hex')}'`;
            }
            // String escaping
            const str = String(v)
              .replace(/\\/g, '\\\\')
              .replace(/'/g, "\\'")
              .replace(/\r/g, '\\r')
              .replace(/\n/g, '\\n')
              .replace(/\0/g, '\\0');
            return `'${str}'`;
          });
          return `(${vals.join(', ')})`;
        });

        sqlOutput += `INSERT INTO \`${table}\` (${columns}) VALUES\n${valueStrings.join(',\n')};\n\n`;
      }
    }
  }

  sqlOutput += `SET FOREIGN_KEY_CHECKS = 1;\n-- Export completed successfully.\n`;

  const outputPath = path.join(__dirname, '..', 'khushinder_db_export.sql');
  fs.writeFileSync(outputPath, sqlOutput, 'utf8');

  const stats = fs.statSync(outputPath);
  console.log(`✓ Database export saved to ${outputPath} (${(stats.size / 1024).toFixed(2)} KB)`);

  await connection.end();
}

exportDatabase().catch((err) => {
  console.error('Export failed:', err);
  process.exit(1);
});
