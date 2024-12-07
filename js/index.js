'use strict';

// fadeIn関数
const FadeIn = (selector, duration = 1000) => {
    const target = document.querySelector(selector);
    target.style.display = 'block';
    const animation = target.animate(
        [
            { opacity: 0 },
            { opacity: 1 }
        ],
        {
            duration: duration,
            fill: 'forwards'
        }
    );
};

// fadeOut関数
const FadeOut = (selector, duration = 1000) => {
    const target = document.querySelector(selector);
    target.style.display = 'block';
    const animation = target.animate(
        [
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: duration,
            fill: 'forwards'
        }
    );
    animation.onfinish = () => {
        target.style.display = 'none';
    };
};

// fadeToggle関数
const FadeToggle = (selector, duration = 1000) => {
    const target = document.querySelector(selector);
    const currentOpacity = window.getComputedStyle(target).opacity;
    const currentDisplay = window.getComputedStyle(target).display;
    if (currentOpacity === '0' || currentDisplay === 'none' || target.style.display === 'none') {
        FadeIn(selector, duration);
    } else {
        FadeOut(selector, duration);
    }
};

// ハンバーガーメニュー
const MenuBtn = document.getElementById('js-menubtn');
MenuBtn.addEventListener('click', () => {
    MenuBtn.classList.toggle('active');
    FadeToggle('#js-nav', 500);
});

const Form = document.getElementById('js-form');
const fields = [
    { id: 'name', errorMessage: '※名前を入力してください', regex:/^[\u3040-\u30ff\u4e00-\u9faf]+(?:[\u3000\s]+[\u3040-\u30ff\u4e00-\u9faf]+)*$/, formatErrorMessage:'※名前はひらがな、カタカナ、漢字で入力してください' },
    { id: 'company', errorMessage: '※会社名を入力してください' },
    { id: 'email', errorMessage: '※メールアドレスを入力してください', regex: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/,formatErrorMessage:'※正しいメールアドレス形式で入力してください (例: example@example.com)' },
    { id: 'tel', errorMessage: '※電話番号を入力してください', regex: /^0\d{1,3}-\d{1,4}-\d{4}$|^\d{10,11}$/,formatErrorMessage:'※正しい電話番号形式で入力してください (例: 090-1234-5678)' },
    { id: 'job', errorMessage: '※選択してください' },
];

Form.addEventListener('submit', (e) => {
    e.preventDefault();

 let formIsValid = true; fields.forEach((field) => {
  const inputElement = document.getElementById(field.id);
  const errorElement = inputElement.nextElementSibling;

  if (inputElement.value.trim() === '') {
       errorElement.textContent = field.errorMessage;
       errorElement.classList.add('c-error');
       formIsValid = false;
    }else if (field.regex && !field.regex.test(inputElement.value.trim())) {
       errorElement.textContent = field.formatErrorMessage;
       errorElement.classList.add('c-error');
       formIsValid = false;
     } else {
       errorElement.textContent = '';
       errorElement.classList.remove('c-error');
     }
    });

       // ラジオボタンのバリデーション
       const radioButtons = document.querySelectorAll('input[type="radio"]');
       const radioError = document.getElementById('js-radio-error');

       let radioSelected = false;

       radioButtons.forEach((radio) => {
        if (radio.checked) {
         radioSelected = true;
        } });

        if (!radioSelected) {
            radioError.textContent = '※選択してください';
            radioError.classList.add('c-error');
            formIsValid = false;
        } else {
            radioError.textContent = '';
            radioError.classList.remove('c-error');
          } if (formIsValid) {
             console.log('フォームは有効です。送信します。');
        // フォームが有効な場合の送信処理をここに追加
         } else { console.error('フォームにエラーがあります。');

         }
         });

