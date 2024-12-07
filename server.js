import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// ejsモジュールをインポート
import ejs from 'ejs';
import { type } from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hostname = '127.0.0.1';
const port = 3000;

// metaデータ
const MetaData = {
  title: 'EJS',
  description: 'これはEJSというテンプレートエンジンを使ってコーディングしたWEBサイトです。',
  type: 'website',
  ogUrl: 'https://ejs-sample.netlify.app/',
  ogImage: 'https://ejs-sample.netlify.app/img/OGP.png',
};

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

const server = http.createServer((req, res) => {
    const serveFile = (filePath, contentType) => {
        fs.readFile(filePath, (err, content) => {
            if (err) {
                console.error(`File read error: ${filePath}`, err);  // ファイル読み取りエラーの詳細なログ
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Error');
                return;
            }
            console.log(`Serving file: ${filePath}`);  // 提供するファイルのパスをログに表示
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        });
    };

    if (req.url === '/') {
        const filePath = path.join(__dirname, 'views', 'index.ejs');  // EJSテンプレートのパス
        fs.readFile(filePath, 'utf-8', (err, content) => {
            if (err) {
                console.error('File read error:', err);  // ファイル読み取りエラーのログ
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Error');
                return;
            }
            try {
                const data = { MetaData, Items, Links, jobData, formData };
                const rendered = ejs.render(content, data, { views: [path.join(__dirname, 'views')] });  // EJSテンプレートのレンダリング
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(rendered);
            } catch (ejsErr) {
                console.error('EJS render error:', ejsErr);  // EJSレンダリングエラーのログ
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Error');
            }
        });
    } else if (req.url === '/css/style.css') {
        const cssPath = path.join(__dirname, 'css', 'style.css');
        serveFile(cssPath, 'text/css');  // CSSファイルを提供
    } else if (req.url === '/js/index.js') {
        const jsPath = path.join(__dirname, 'js', 'index.js');
        serveFile(jsPath, 'application/javascript');  // JavaScriptファイルを提供
    } else if (req.url === '/img/favicon.ico') { // ファビコンファイルの提供
        const iconPath = path.join(__dirname, 'img', 'favicon.ico');
        serveFile(iconPath, 'image/x-icon');
    } else if (req.url.startsWith('/img/')) { // imgフォルダ内のファイル提供
        const imgPath = path.join(__dirname, req.url);
        serveFile(imgPath, 'image/jpg'); // 画像ファイルのタイプを適切に設定
    }else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');  // 404エラーメッセージを返す
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);  // サーバー起動メッセージ
});
