import { createI18n } from "vue-i18n";
import en from '@/i18n/en.json'
import ko from '@/i18n/ko.json'
import es from '@/i18n/es.json' /// 자바 스크립트에서 import는 내가 쓰고싶은 이름을 쓴다. 변수느낌. from에서가져온 파일을 이렇게 부르겠다.  파이썬은 모듈을 import하는거임 

const i18n = createI18n({
    locale: 'en', // 기본언어. 웹 화면에 나타날 기본적인 언어
    fallbackLocale:'ko', // 대체언어가 없을 때 나와야 하는 언어.
    messages: {
        en,
        ko,
        es,
    }
})

export default i18n;