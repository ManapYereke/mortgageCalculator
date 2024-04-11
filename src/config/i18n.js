import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      kk: {
        translation: {
          'title': 'Ипотекалық калькулятор',
          'article': '  Ипотекалық калькулятор – тұрғын үйге қатысты несие бойынша төлемдер мен артық төлемді есептеуге мүмкіндік беретін әмбебап құрал. Ай сайынғы төлемдердің болжамды мөлшерін алдын-ала есептеу және сіздің қаржылық мүмкіндіктеріңізді бағалау арқылы банктен несие алу тиімді әрі ыңғайлы. Ипотекалық калькулятор арқылы несие беру бағдарламалары мен жылдық сыйақы мөлшерлемелерін салыстырып, несие шарттарын алдын-ала бағалай аласыз.',
          'price': 'Жылжымайтын мүліктің құны(тг):',
          "programm": "Бағдарлама",
          "without_programm": "Бағдарламасыз",
          "jastar": "Жастар",
          "jas_otbasy": "Жас отбасы",
          "otau": "Отау",
          'initialFee': 'Бастапқы жарна(тг):',
          'term': 'Ипотека мерзімі: ',
          'month': 'ай',
          "year": "ж",
          'interest rate': 'Пайыздық мөлшерлеме(%):',
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
          'caption': 'Төлемдер кестесі',
          'stage': 'Кезең',
          'main debt': 'Негізгі қарыз',
          'percently part': 'Есептелген пайыз',
          'remaning amount': 'Негізгі қарыздың қалғаны',
          'total': 'Жалпы',
          'month_warning {{programm}} {{minMonth}} {{maxMonth}}': '"{{programm}}" бағдарламасы бойынша ипотека мерзімі {{minMonth}} айдан {{maxMonth}} айға дейін болуы керек',
          'percent_warning {{programm}} {{minInitialFeePercent}}': '"{{programm}}" бағдарламасы бойынша бастапқы жарна {{minInitialFeePercent}} пайыздан артық болу керек',
          'credit_warning {{programm}} {{maxCreditSum}}': '"{{programm}}" бағдарламасы бойынша максималды қарыз сомасы {{maxCreditSum}} теңгеден аспауы керек'
        }
      },
      ru: {
        translation: {
          'title': 'Калькулятор ипотеки',
          'article': '  Ипотечный калькулятор – универсальный инструмент, позволяющий рассчитать платежи и переплаты по жилищному кредиту. Получить кредит в банке выгодно и удобно, предварительно рассчитав предполагаемую сумму ежемесячных платежей и оценив свои финансовые возможности. С помощью ипотечного калькулятора вы можете сравнить кредитные программы и годовые процентные ставки, а также заранее оценить условия кредита.',
          'price': 'Стоимость недвижимости(тг):',
          "programm": "Программа",
          "without_programm": "Без программы",
          "jastar": "Жастар",
          "jas_otbasy": "Жас отбасы",
          "otau": "Отау",
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
          'warning': 'Расчет является примерным, основывается на введенных вами данных и юридической силы не имеет',
          'caption': 'Таблица платежей',
          'stage': 'Этап',
          'main debt': 'Основная часть',
          'percently part': 'Процентная часть',
          'remaning amount': 'Остаток основного долга',
          'total': 'Итого',
          'month_warning {{programm}} {{minMonth}} {{maxMonth}}': 'По программе "{{programm}}" срок ипотеки должен составить от {{minMonth}} месяцев до {{minMonth}} месяцев',
          'percent_warning {{programm}} {{minInitialFeePercent}}': 'По программе "{{programm}}" первоначальный взнос должен составить больше {{minInitialFeePercent}} процентов',
          'credit_warning {{programm}} {{maxCreditSum}}': 'По программе "{{programm}}" сумма кредита не должна превышать {{maxCreditSum}} тенге'
        }
      },
      en: {
        translation: {
          'title': 'Mortgage calculator',
          'article': '  A mortgage calculator is a universal tool that allows you to calculate payments and overpayments on a home loan. It is profitable and convenient to get a loan from a bank by first calculating the expected amount of monthly payments and assessing your financial capabilities. Using a mortgage calculator, you can compare loan programs and annual interest rates, as well as evaluate loan terms in advance.',
          'price': 'Property cost (tg):',
          "programm": "Programm",
          "without_programm": "Without programm",
          "jastar": "Jastar",
          "jas_otbasy": "Jas otbasy",
          "otau": "Otau",
          'initialFee': 'Down payment(tg):',
          'term': 'Mortgage term: ',
          'month': 'month',
          "year": "y",
          'interest rate': 'Interest rate(%)',
          'payment type': 'Payment type: ',
          'annuity': "annuity",
          "differentiated": "differentiated",
          'calculate': 'Calculate',
          'result': 'Calculation results',
          'credit sum': 'Amount of credit:',
          'monthly payment': 'Monthly payment:',
          'to return': 'To return:',
          'over payment': 'Overpayment amount:',
          'tenge': 'tenge',
          'warning': 'The calculation is approximate, based on the data you entered and has no legal force',
          'caption': 'Payment table',
          'stage': 'Stage',
          'main debt': 'Main part',
          'percently part': 'Percentage part',
          'remaning amount': 'Principal balance',
          'total': 'Total',
          'month_warning {{programm}} {{minMonth}} {{maxMonth}}': 'According to the "{{programm}}" program, the mortgage term should be from {{minMonth}} months to {{minMonth}} months',
          'percent_warning {{programm}} {{minInitialFeePercent}}': 'According to the program "{{programm}}" the initial payment must be more than {{minInitialFeePercent}} percent',
          'credit_warning {{programm}} {{maxCreditSum}}': 'According to the program "{{programm}}" the loan amount should not exceed {{maxCreditSum}} tenge'
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
