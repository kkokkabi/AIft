require('dotenv').config();
const { Client } = require('pg');
const express = require('express'); // Express 추가
const app = express();
const port = process.env.PORT || 3000; // Render는 PORT 환경변수를 자동으로 부여합니다.

const connectionString = process.env.DATABASE_URL;

app.get('/', async (req, res) => {
  const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    const result = await client.query('SELECT name FROM test LIMIT 1');
    const name = result.rows.length > 0 ? result.rows[0].name : "데이터 없음";
    
    res.send(`<h1>HELLO ${name}</h1>`); // 웹 브라우저에 결과 출력
  } catch (err) {
    res.status(500).send("에러 발생: " + err.message);
  } finally {
    await client.end();
  }
});

// 서버를 계속 켜두는 부분
app.listen(port, () => {
  console.log(`🚀 서버가 포트 ${port}에서 실행 중입니다.`);
});
