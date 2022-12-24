const express = require('express');
const app = express();
const port = 3000; // 사용할 Port

// morgan: 로깅을 위한 라이브러리, winston도 있습니다. 참고: (winston과 morgan 결합 사용: https://for-development.tistory.com/51)
const morgan = require('morgan');
// CORS: Cross Orgin Resourse Sharing (참고: https://velog.io/@cptkuk91/Node.js-CORS-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0)
const cors = require('cors');

// db 연결
const db = require('./models');
// router
const routes = require('./routes');

// db 연결 확인
db.sequelize
  .sync()
  .then(() => {
    console.log('database 연결 성공');
  })
  .catch(console.error);

// sequelize model sync(), 테이블 수정 적용 여부
// https://medium.com/@smallbee/how-to-use-sequelize-sync-without-difficulties-4645a8d96841
db.sequelize.sync({
  force: false, // default가 false, force: true -> 테이블을 생성하고 이미 존재하는 경우 먼저 삭제합니다. (공식문서 참고: https://sequelize.org/docs/v6/core-concepts/model-basics/#model-synchronization)
});

// .json()과 .urlencoded()를 사용 이유(참고: https://kirkim.github.io/javascript/2021/10/16/body_parser.html)
// 클라이언트로 부터 받은 http 요청 메시지 형식에서 body데이터를 해석하기 위해 사용
// “body-parser” 미들웨어는 현재 express페키지 안에 포함되어 있습니다. 즉, app.use(require('body-parser').json())과 같은 것

app.use(express.json()); // JSON형태의 데이터를 해석해줍니다.
app.use(express.urlencoded({ extended: false })); // x-www-form-urlencoded(contentType이 urlencoded type의 경우) 형태의 데이터를 해석해준다.

app.use(morgan('combined')); // 로깅 상세 조회, morgan('dev'): 간단 조회

// Cross Origin Resource Sharing
// credentials란? 쿠키, 인증헤더, TLS(전송 계층 보안) client certificates(증명서)를 말함. (TSL: https://support.google.com/a/answer/100181?hl=ko)
// credentials가 있는 CORS 요청은 Client와 Server 둘다 Credentials를 사용하겠다는 속성을 설정해줘야 통신이 가능
app.use(
  cors({
    origin: true, // 요청을 주는 origin 전체 허용, 실제 서비스에서는 엄격하게 설정하는 것이 좋습니다.
    credentials: true, // default: false
  })
);

app.use('/', routes);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
