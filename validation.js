//* validation.spec.js
// const { isEmail } = require('./validation');

// test('입력한 이메일 주소에는 "@" 문자가 1개만 있어야 이메일 형식이다.', () => {
//   expect(isEmail('my-email@domain.com')).toEqual(true); // 1개만 있는 상황
//   expect(isEmail('my-email@@@@domain.com')).toEqual(false); // 여러개 있는 상황
//   expect(isEmail('my-emaildomain.com')).toEqual(false); // 하나도 없는 상황
// });

// test('입력한 이메일 주소에 공백(스페이스)이 존재하면 이메일 형식이 아니다.', () => {
//   expect(isEmail('myemail@domain.com')).toEqual(true);
//   expect(isEmail('my email@domain.com')).toEqual(false);
// });

// test('입력한 이메일 주소 맨 앞에 하이픈(-)이 있으면 이메일 형식이 아니다.', () => {
//   expect(isEmail('e-m-a-i-l@domain.com')).toEqual(true);
//   expect(isEmail('-email@domain.com')).toEqual(false);
// });

/*
* expect 결과값 검증하기
? .toBe(value)
입력받은 결과값과 동일한지 비교합니다.
만약 [Instance]를 비교하려 한다면,
[Instance]의 [ID]까지 비교하므로'엄격하게' 동일한지 검증합니다.
? .toEqual(value)
입력받은 결과값과 동일한지 비교합니다.
? .toMatch(regexp | string)
입력받은 결과값과 문자열이 같은지 검증합니다.
[String] 또는 [정규표현식]으로 검증할 수 있습니다.
? .toBeTruthy()
결과값이 `True`인지 검증합니다.
? .toBeInstanceOf(Class)
입력받은 값과 [Class]가 동일한 [Instance]인지 검증합니다.
[Error]를 검증할 때 주로 사용합니다.
? .toHaveProperty(keyPath, value?)
입력받은 객체의 [Key]와 [Value]가 일치하는지 검증합니다.
? .toMatchObject(object)
결과값의 객체와 입력받은 객체가 일치하는지 검증합니다.
만약 입력받은 객체에서 없는 속성이 있더라도 일치하게끔 연결합니다.
*/

/*
*[Global Jest 문법]
? afterAll(fn, timeout)
- 모든 `test()`가 [완료된 이후]에 수행됩니다.
- 테스트가 완료된 이후 DB에 변경된 데이터를 삭제하거나 Mock을 초기화 하기 위해 사용됩니다.
? afterEach(fn, timeout)
- `test()`가 [완료된 이후]에 수행됩니다.
- 테스트코드가 완료된 이후 Mock 또는 변경된 전역 변수를 초기화할 때 사용됩니다.
? beforeAll(fn, timeout)
- [테스트 코드]가 [실행되기 전] 가장 처음 수행됩니다.
- DB의 데이터를 초기화하거나 전역 Mock을 초기화할 때 사용됩니다.
? beforeEach(fn, timeout)
- `test()`가 [실행되기 전]에 수행됩니다.
- 테스트가 실행되기 전, 동일한 설정을 반복해야할 때 사용됩니다.
*/

/*
* Global Jest 문법의 실행 순서에 대해 더욱 자세히 알고싶어요!
- `before`과 `after`가 실행되는 순서가 정리되어있어요.
아래의 출력된 내용을 바탕으로 코드가 실행되는 순서를 확인해보세요.
*/

//* before-after-grammars.spec.js
/*
- [테스트 코드]가 [실행되기 전] 가장 처음 수행됩니다.
- DB의 데이터를 초기화하거나 전역 Mock을 초기화할 때 사용됩니다.
beforeAll(() => console.log('1 - beforeAll'));
- 모든 `test()`가 [완료된 이후]에 수행됩니다.
- 테스트가 완료된 이후 DB에 변경된 데이터를 삭제하거나 Mock을 초기화 하기 위해 사용됩니다.
afterAll(() => console.log('1 - afterAll'));
- `test()`가 [실행되기 전]에 수행됩니다.
- 테스트가 실행되기 전, 동일한 설정을 반복해야할 때 사용됩니다.
beforeEach(() => console.log('1 - beforeEach'));
- `test()`가 [완료된 이후]에 수행됩니다.
- 테스트코드가 완료된 이후 Mock 또는 변경된 전역 변수를 초기화할 때 사용됩니다.
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));
- 테스트 파일에 많은 수의 테스트 함수가 작성되어 있는 경우,
- 연관된 테스트 함수들끼리 그룹화해놓으면 코드를 읽기가 좋습니다.
* Jest의 describe() 함수를 통해 여러 개의 테스트 함수를 묶는 것이 가능합니다.
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2.1 - test'));
  test('', () => console.log('2.2 - test'));
});
*/

/** Print
 *
 *     1 - beforeAll
 *       at Object.<anonymous> (test/jest-grammars/before-after.spec.test.js:1:45)
 *
 *     1 - beforeEach
 *       at Object.log (test/jest-grammars/before-after.spec.test.js:3:26)
 *
 *     1 - test
 *       at Object.log (test/jest-grammars/before-after.spec.test.js:6:24)
 *
 *     1 - afterEach
 *       at Object.log (test/jest-grammars/before-after.spec.test.js:4:25)
 *
 *     2 - beforeAll
 *       at Object.log (test/jest-grammars/before-after.spec.test.js:9:27)
 *
 *     1 - beforeEach
 *       at Object.log (test/jest-grammars/before-after.spec.test.js:3:26)
 *
 *     2 - beforeEach
 *       at Object.log (test/jest-grammars/before-after.spec.test.js:11:28)
 *
 *     2.1 - test
 *       at Object.log (test/jest-grammars/before-after.spec.test.js:14:26)
 *
 *     2 - afterEach
 *       at Object.log (test/jest-grammars/before-after.spec.test.js:12:27)
 *
 *     1 - afterEach
 *       at Object.log (test/jest-grammars/before-after.spec.test.js:4:25)
 *
 *     1 - beforeEach
 *       at Object.log (test/jest-grammars/before-after.spec.test.js:3:26)
 *
 *     2 - beforeEach
 *       at Object.log (test/jest-grammars/before-after.spec.test.js:11:28)
 *
 *     2.2 - test
 *       at Object.log (test/jest-grammars/before-after.spec.test.js:16:26)
 *
 *     2 - afterEach
 *       at Object.log (test/jest-grammars/before-after.spec.test.js:12:27)
 *
 *     1 - afterEach
 *       at Object.log (test/jest-grammars/before-after.spec.test.js:4:25)
 *
 *     2 - afterAll
 *       at Object.log (test/jest-grammars/before-after.spec.test.js:10:26)
 *
 *     1 - afterAll
 *       at Object.log (test/jest-grammars/before-after.spec.test.js:2:24)
 * **/
