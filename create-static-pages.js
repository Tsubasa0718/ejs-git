import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 必要なデータを設定
// menuデータ
const Items = ['About','Service','Recruit','Contact'];
const Links = { About: '#about', Service: '#service', Recruit: '#recruit', Contact: '#contact' };
// tableデータ
const jobData = {
    title: 'WEBデザイナー',
    details: [
        { label: '雇用形態', value: '正社員' },
        { label: '給与', value: '400万円〜600万円（経験・能力を考慮のうえ優遇）' },
        { label: '仕事内容', value: 'Webサイトの制作。サイトのデザインとコーディングを担当していただきます。' },
        { label: '勤務時間', value: '10:00 〜 19:00（実働8時間、休憩1時間）' },
        {
          label: '応募資格',
          value: `<p>PhotoshopやXDなどのデザインツールの使い方を理解し、コーディングの基礎スキルがある方。実務未経験でも学校や独学で学習した方を歓迎します。</p><ul class="c-table__td-list"><li class="c-table__td-item">デザインやコーディングを楽しめる方</li><li class="c-table__td-item">常にアンテナを張って積極的にトレンドや最新の技術を取り入れる方</li><li class="c-table__td-item">お客様と一緒に楽しみながら高い目的を目指せる方</li></ul>`
        }
    ],
    applyLink: '#',
    note: '求人サイトへ遷移します'
};

// formデータ
const formData = [
    {
        type: 'radio',
        name: 'type',
        label: 'お問い合わせ種別',
        required: true,
        options: [
            {id:'type1', value:'お仕事のご相談・ご依頼', label:'お仕事のご相談・ご依頼'},
            {id:'type2', value:'お見積りのご依頼', label:'お見積りのご依頼'},
            {id:'type3', value:'採用について', label:'採用について'},
            {id:'type4', value:'その他', label:'その他'},
        ]
    },
    {
        type:'text',
        name:'name',
        label: 'お名前',
        required: true
    },
    {
        type:'text',
        name:'company',
        label: '会社名',
        required: true
    },
    {
        type:'email',
        name:'email',
        label: 'メールアドレス',
        required: true
    },
    {
        type:'tel',
        name:'tel',
        label: '電話番号',
        note: '(半角数字ハイフンなし)',
        required: true
    },
    {
        type:'textarea',
        name:'comment',
        label: 'お問い合わせ内容',
        required: false,
        placeholder: 'お問い合わせ内容を具体的にご記入くださいませ',
    },
    {
        type: 'select',
        name: 'job',
        label: 'サイトをどちらでお知りになりましたか？',
        required: true,
        options: [
            {value:'', label:'選択してください'},
            {value:'Google/Yahoo検索', label:'Google/Yahoo検索'},
            {value:'SNS', label:'SNS'},
            {value:'知人', label:'知人'},
            {value:'ブログ', label:'ブログ'},
            {value:'その他', label:'その他'},
        ]
    },
];

const renderEJS = (templatePath, data, outputPath) => {
    ejs.renderFile(templatePath, data, {}, (err, str) => {
        if (err) {
            console.error('EJS render error:', err);
            return;
        }
        fs.writeFileSync(outputPath, str);
        console.log(`Rendered and saved: ${outputPath}`);
    });
};

const viewsDir = path.join(__dirname, 'views');
const outputDir = path.join(__dirname, 'dist');

// 出力ディレクトリが存在しない場合は作成
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const data = { MetaData, Items, Links, jobData, formData };
const templatePath = path.join(viewsDir, 'index.ejs');
const outputPath = path.join(outputDir, 'index.html');

renderEJS(templatePath, data, outputPath);
