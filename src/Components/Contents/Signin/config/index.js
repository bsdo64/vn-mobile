/**
 * Created by dobyeongsu on 2016. 6. 27..
 */

exports.signinFormValidate = {
  email: {
    identifier: 'signinEmail',
    rules: [
      {
        type: 'empty',
        prompt: '이메일을 입력해주세요'
      },
      {
        type: 'email',
        prompt: 'Email 형식을 입력해 주세요.'
      }
    ]
  },
  password: {
    identifier: 'password',
    rules: [
      {
        type: 'regExp[/^[A-Za-z0-9_-`!@#~$%^&*()+=]{4,16}$/]',
        prompt: '비밀번호는 영문자, 특수문자 포함 4-16자 이내로 입력해주세요'
      }
    ]
  },
  password_re: {
    identifier: 'password_re',
    rules: [
      {
        type: 'match[password]',
        prompt: '입력한 비밀번호가 서로 다릅니다.'
      }
    ]
  },
  nick: {
    identifier: 'signinNick',
    rules: [
      {
        type: 'empty',
        prompt: '닉네임을 입력해주세요'
      },
      {
        type: 'regExp[/^[a-z가-힣A-Z0-9_]+( [a-z가-힣A-Z0-9_]+)*$/]',
        prompt: '한칸 이상 공백은 허용하지 않습니다'
      }
    ]
  },
  sex: {
    identifier: 'sex',
    rules: [
      {
        type: 'minCount[1]',
        prompt: '성별을 선택해주세요'
      }
    ]
  },
  year: {
    identifier: 'year',
    rules: [
      {
        type: 'exactCount[1]',
        prompt: '태어난 연도를 선택해 주세요'
      }
    ]
  },
  month: {
    identifier: 'month',
    rules: [
      {
        type: 'exactCount[1]',
        prompt: '태어난 월을 선택해 주세요'
      }
    ]
  },
  day: {
    identifier: 'day',
    rules: [
      {
        type: 'exactCount[1]',
        prompt: '태어난 일을 선택해 주세요'
      }
    ]
  }
};
