# Prada-API

## 라이브러리 (WHY)
```js
"dependencies": {
    "aws-sdk": "^2.1282.0",
    "bcrypt": "^5.1.0", // 비밀번호 해싱을 통한 암호화를 위해 사용
    "cors": "^2.8.5", // 리소스 교차 출처 정책으로 인한 CORS 문제 해결을 위해 사용 (허용할 도메인 설정)
    "dotenv": "^16.0.3", // 보안상 노출되면 안돼는 환경변수 설정을 위한 사용
    "express": "^4.18.2", // 웹 프레임워크로 서버를 생산성있게 구축하기 위해 사용
    "joi": "^17.7.0", // 검증 라이브러리로 직관적임, 협업간 생산성을 위해 사용
    "jsonwebtoken": "^9.0.0", // JWT 방식의 로그인을 구현하기 위해 사용
    "morgan": "^1.10.0", // 실시간 로그 확인을 위해 사용
    "multer": "^1.4.5-lts.1", // 이미지 업로드를 위한 라이브러리
    "multer-s3": "^2.10.0", // 이미지를 S3에 업로드하기 위해 사용
    "mysql2": "^2.3.3", // mysql 드라이버 역할
    "nodemon": "^2.0.20", // 새로운 코드를 저장 시 자동으로 서버를 재시작해준다
    "pm2": "^5.2.2" // 무중단 서비스를 위해 적용
  },
  "devDependencies": {
    "jest": "^29.3.1", // 테스트 코드를 작성하기 위해 사용 (사용 편리, 직관적, 생산성)
    "prettier": "^2.8.1", // 협업간 코드 포메터로 코드 스타일을 맞추기 위해 사용
    "sequelize": "^6.28.0", // Node의 ORM으로 DB를 다루기 위해 사용(생산성을 위함)
    "sequelize-cli": "^6.5.2",
    "supertest": "^6.3.3"
  },
```

## [API 명세서](https://planet-aletopelta-fbc.notion.site/da308a52ddc04dac86d38b4a1dfbc7a6?v=26e4e278cce0482b936cbef5def5b9a0)
Notion 링크 참고
<br>

## 🛠 ERD(***Entity Relationship Diagram***)

1차 작업: 정규화 전
![image](https://user-images.githubusercontent.com/61128538/218357160-7dbc7977-8ba4-4975-98d7-0251c6f9c34e.png)


2차 작업: 정규화 및 역정규화를 통한 반정규화 상태 / 최종
![image](https://user-images.githubusercontent.com/61128538/218357214-162ea1cf-8a47-4ad7-bd77-ed25bfeabfa3.png)

