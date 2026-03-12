require('dotenv').config();
const { Client } = require('pg');

// Render의 환경변수(DATABASE_URL)를 사용합니다.
const connectionString = process.env.DATABASE_URL;

const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false // Neon(PostgreSQL) 연결 시 SSL 설정이 필요합니다.
  }
});

async function getTestData() {
  try {
    await client.connect();
    console.log("✅ 데이터베이스에 성공적으로 연결되었습니다.");

    // test 테이블에서 레코드 하나만 조회 (가장 최근 혹은 첫 번째 데이터)
    const res = await client.query('SELECT name FROM test LIMIT 1');

    if (res.rows.length > 0) {
      const name = res.rows[0].name;
      console.log(`-----------------------`);
      console.log(`HELLO ${name}`);
      console.log(`-----------------------`);
    } else {
      console.log("데이터가 없습니다. 테이블에 레코드를 추가해 주세요.");
    }
  } catch (err) {
    console.error("❌ 에러 발생:", err.stack);
  } finally {
    await client.end();
  }
}

getTestData();
