import puppeteer, { Browser } from 'puppeteer';
import 'dotenv/config';
import fs from 'fs';

/** 楽天ビジネス銀行よりCSVダウンロード */
const downloadFromRakuten = async (browser: Browser) => {
  // 既存のCSVファイルがあれば削除
  try {
    fs.unlinkSync(process.env.CSV_PATH as string);
  } catch (error) {
    console.log('csv file is not found.');
  }

  // タブを開く
  const page = await browser.newPage();
  await page.goto(process.env.RAKUTEN_LOGIN_URL as string, { waitUntil: ['load', 'networkidle0'] });

  // ログイン
  await page.type('#LOGIN\\:USER_ID', process.env.RAKUTEN_ID as string);
  await page.type('#LOGIN\\:LOGIN_PASSWORD', process.env.RAKUTEN_PASSWORD as string);
  await Promise.all([page.waitForNavigation({ waitUntil: ['load', 'networkidle0'] }), page.click('#LOGIN\\:_idJsp43')]);

  // 入出金明細へ遷移
  await Promise.all([
    page.waitForNavigation({ waitUntil: ['load', 'networkidle0'] }),
    page.click('#FORM2\\:_idJsp244'),
  ]);

  // CSVダウンロード
  await page.click('#FORM_DOWNLOAD\\:_idJsp581');
  await page.waitForTimeout(5000);
};

/** 会計freeeにCSVアップロード */
const uploadToFreee = async (browser: Browser) => {
  // タブを開く
  const page = await browser.newPage();
  await page.goto(process.env.FREEE_LOGIN_URL as string, { waitUntil: ['load', 'networkidle0'] });

  // ログイン
  await page.type('#user_email', process.env.FREEE_ID as string);
  await page.type('.login-form [name=password]', process.env.FREEE_PASSWORD as string);
  await Promise.all([
    page.waitForNavigation({ waitUntil: ['load', 'networkidle0'] }),
    page.click('.login-form .login-button'),
  ]);

  // 口座画面に直接遷移
  await page.goto(process.env.FREEE_BANK_ACCOUNT_URL as string, { waitUntil: ['load', 'networkidle0'] });

  // 明細アップロードボタンをクリック
  await Promise.all([page.waitForNavigation({ waitUntil: ['load', 'networkidle0'] }), page.click('#wtxns-upload')]);

  // CSVファイルを選択
  const el = await page.$('#ofx');
  if (!el) return;
  await el.uploadFile(process.env.CSV_PATH as string);

  // 次へボタンをクリック
  await Promise.all([
    page.waitForNavigation({ waitUntil: ['load', 'networkidle0'] }),
    page.click('form .btn[type=submit]'),
  ]);

  // 結果をログ出力
  const message = await page.$eval('.notification-message', (item) => {
    return item.textContent;
  });
  console.log(message);
};

// メイン処理
const browser = await puppeteer.launch({ headless: false });
await downloadFromRakuten(browser);
await uploadToFreee(browser);
await browser.close();
