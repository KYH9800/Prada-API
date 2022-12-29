const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const path = require('path');

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.REGION,
});
//* AWS의 S3란?
// multer-s3는 multer를 통해 S3에 저장하기 위해서 사용하는 라이브러리
module.exports = multer({
  storage: multerS3({
    s3: new AWS.S3(), // config 통해 접근
    bucket: process.env.BUCKET_NAME, // 나의 버킷 이름
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      // original 폴더 안에 업로드한 파일을 넣을 것이다.
      // 이름이 겹치지 않게 파일 이름에 타임스템프를 더해준다.
      // 이렇게 s3 버켓에 저장한다.
      console.log(file);
      const filiname = path.basename(file.originalname).trim(); //sdfhsjgjww_Sfdh235_Sfjshkgks
      console.log('filiname: ', filiname);

      // let newFileName = '';
      // const regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
      // let reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;

      // for (value of filiname) {
      //   if (regExp.test(value)) {
      //     value = '0';
      //   }
      //   newFileName += value;
      // }

      cb(null, `original/${Date.now()}_${newFileName}`);
      // cb(null, `original/${Date.now()}.png`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});
