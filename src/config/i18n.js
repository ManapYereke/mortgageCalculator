import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      kk: {
        translation: {
          'price': 'Жылжымайтын мүліктің құны(тг):',
          'initialFee': 'Бастапқы жарна(тг):',
          'term': 'Ипотека мерзімі: ',
          'month': 'ай',
          "year": "ж",
          'interest rate': 'Пайыздық мөлшерлеме(%)',
          'payment type': 'Төлем түрі: ',
          'annuity': "аннуитеттік",
          "differentiated": "дифференциалдық",
          'calculate': 'Есептеу',
          'result': 'Есептеу нәтижесі',
          'credit sum': 'Қарызға берілетін сома:',
          'monthly payment': 'Ай сайынғы төлем',
          'to return': 'Жалпы төлем:',
          'over payment': 'Артық төлемнің сомасы:',
          'tenge': 'теңге',
          'warning': 'Есептеу шамамен алынған, сіз енгізген деректерге негізделген және заңды күші жоқ',
          'stage': 'Кезең',
          'main debt': 'Негізгі қарыз',
          'percently part': 'Есептелген пайыз',
          'remaning amount': 'Негізгі қарыздың қалғаны'
        }
      },
      ru: {
        translation: {
          'price': 'Стоимость недвижимости(тг):',
          'initialFee': 'Первоначальный взнос(тг):',
          'term': 'Срок ипотеки: ',
          'month': 'мес',
          "year": "л",
          'interest rate': 'Процентная ставка(%)',
          'payment type': 'Вид платежа: ',
          'annuity': "аннуитетная",
          "differentiated": "дифференцированная",
          'calculate': 'Рассчитать',
          'result': 'Результаты расчета',
          'credit sum': 'Сумма кредита:',
          'monthly payment': 'Ежемесячный платеж:',
          'to return': 'К возврату:',
          'over payment': 'Сумма переплаты:',
          'tenge': 'тенге',
          'warning': 'Расчет является примерным, основывается на введенных вами данных и юридической силы не имеет'
        }
      },
      en: {
        translation: {
          'price': 'Жылжымайтын мүліктің құны(тг):',
          'initialFee': 'Бастапқы жарна(тг):',
          'term': 'Ипотека мерзімі: ',
          'month': 'ай',
          'interest rate': 'Пайыздық мөлшерлеме(%)',
          'calculate': 'Есептеу',
          'result': 'Есептеу нәтижесі'
        }
      },
    },
    lng: 'kk', // Установите язык по умолчанию
    fallbackLng: 'kk', // Установите язык, используемый по умолчанию, если перевод не найден
    interpolation: {
      escapeValue: false // Не обязательно, но помогает избежать инъекций XSS
    }
  });

export default i18n;
