'use strict'; //
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AdminUser extends Model {
    static associate(models) {
      this.hasMany(models.Item, { foreignKey: 'adminUserId' });
    }
  }

  AdminUser.init(
    {
      adminUserId: {
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
      nickname: {
        type: DataTypes.STRING(100), // password는 암호화를 하기 떄문에 문자열이 길어진다
        allowNull: false, // "이건 필수다"라는 뜻, 값을 비워도 괜찮겠니? 이런 소리 [필수여부: false-필수, true-필수 X]
      },
    },
    {
      // 다른 모델 옵션은 여기에 있습니다. 예시: charset(문자 인코딩 방식 설정), collate: 'utf8_general_ci'(한글 저장)
      sequelize, // 연결 인스턴스를 통과해야 합니다.
      modelName: 'AdminUser', // 모델명을 선택해야 합니다.
    }
  );

  return AdminUser;
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
