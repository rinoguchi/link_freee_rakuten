# link_freee_rakuten

This is a script that downloads CSV from Rakuten Bank Personal Business Account and uploads it to Kaikei Freee.

これは、楽天銀行個人ビジネス口座から CSV をダウンロードして、会計 Freee にアップロードするスクリプトです。

## install

```sh
yarn install
```

## setup env

replace xxxxxxxxxx by your actual value

```sh
cat <<EOS > .env
RAKUTEN_ID=xxxxxxxxxx
RAKUTEN_PASSWORD=xxxxxxxxxx
RAKUTEN_LOGIN_URL=https://fes.rakuten-bank.co.jp/MS/main/RbS?CurrentPageID=START&&COMMAND=LOGIN
CSV_PATH=/Users/xxxxxxxxxx/Downloads/RB-torihikimeisai.csv
FREEE_ID=xxxxxxxxxx
FREEE_PASSWORD=xxxxxxxxxx
FREEE_LOGIN_URL=https://secure.freee.co.jp
FREEE_BANK_ACCOUNT_URL=https://secure.freee.co.jp/bank_account/walletables/xxxxxxxxxx
EOS
```

## execute

```sh
yarn execute
```

## disclaimer

The purpose of this repository is to provide information as a sample.
I will not be held liable for any damage that may be caused by using the information.

このリポジトリは、サンプルとして情報を提供することを目的としています。
本情報を利用したことにより生じたいかなる損害についても、私は一切の責任を負いません。
