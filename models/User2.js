'use strict'; //
const { Model } = require('sequelize');

// 이 코드를 이해하기 위한 참고 사이트(클래스): https://ko.javascript.info/class-inheritance
module.exports = (sequelize, DataTypes) => {
  // User라는 클래스를 정의하고 sequelize 에서 Model 부모 클래스를 상속 받아옴
  class User2 extends Model {
    // "prototype"이 아닌 클래스 함수 자체에 메서드를 설정할 수도 있습니다. 이런 메서드를 정적(static) 메서드라고 부릅니다.
    // (참고: 정적 메서드와 정적 프로퍼티: https://ko.javascript.info/static-properties-methods)
    // (아래) 모델간의 관계를 정의하는 메소드

    // 비슷한 성질을 가진 여러개의 객체를 만들기 위해, 일종의 설계도라고 할 수 있는 생성자 함수(Constructor)를
    // 만들어 찍어내듯 사용하는데 이렇게 생성된 객체를 인스턴스라 부를 수 있다.
    // https://seo-tory.tistory.com/47
    static associate(models) {
      // 모델 간의 관계를 설정하는 associate()라는 정적 메소드를 만들었습니다.
      // 그리고 외부에서 호출한 1:1, 1:N, N;N (oneToMany, belongsTo 등등..) 메소드를 이 안으로 옮겨 클래스 안으로 관련된 코드를 모았습니다.
      // 관계 설정은 여기에서 합니다.
      this.hasOne(models.Cart, { foreignKey: 'userId' }); // 한명의 User는 많은 Bucket을 가질 수 있다.
      this.hasOne(models.WishList, { foreignKey: 'userId' });
      this.hasOne(models.OrderList, { foreignKey: 'userId' });
    }
  }

  // Model 클래스를 확장하면 init()이라는 정적 메소드 사용할 수 있습니다.
  // 스키마 생성을 위해 init() 메소드를 호출하는 코드인데 이걸보면 두 개의 인자를 사용합니다.
  // init({1}, {2})
  // {1}: 테이블의 컬럼 이름과 속성 값을 전달
  // {2}: 테이블 생성에 필요한 기타 값을 전달
  User2.init(
    {
      // 모델 속성은 여기서 정의됩니다. row(행, 가로) 부분임
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(30), // 조건: 이메일 글자 수 30글자 이내
        allowNull: false, // 필수
        unique: true, // 아이디는 중복되면 안되니까 유니크한 값입니다.
      },
      password: {
        type: DataTypes.STRING(100), // password는 암호화를 하기 떄문에 문자열이 길어진다
        allowNull: false, // "이건 필수다"라는 뜻, 값을 비워도 괜찮겠니? 이런 소리 [필수여부: false-필수, true-필수 X]
      },
      firstName: {
        type: DataTypes.STRING, // 문자열 타입, 글자수 제한 없음
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING, // 문자열 타입, 글자수 제한 없음
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING, // 문자열 타입, 글자수 제한 없음
        allowNull: false,
      },
    },
    {
      // 다른 모델 옵션은 여기에 있습니다. 예시: charset(문자 인코딩 방식 설정), collate: 'utf8_general_ci'(한글 저장)
      sequelize, // 연결 인스턴스를 통과해야 합니다.
      modelName: 'User2', // 모델명을 선택해야 합니다.
    }
  );

  return User2;
};

/* 
* [ 관계설정 예시와 설명 ]
static associate(db) {
    db.User.hasMany(db.Post); // 한 사람이 Post(게시글)를 여러개 가질 수 있다(작성자는 한명)
    db.User.hasMany(db.Comment); // 한 사람이 댓글을 여러개 쓸 수 있다(작성자는 한명)
    
    * through: 테이블 이름을 변경, as로 별칭을 정하는 것이 좋다
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }); // 내가 좋아요를 누른 게시물
    
    * foreignKey: column의 key를 변경, 같은 테이블일때 먼저 찾는 것을 정의 (반대로 생각하면 된다)
    * 외래 키(참조하는 키)
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
  }
*/
