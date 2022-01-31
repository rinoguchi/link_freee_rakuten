# link_freee_rakten

This is a script that downloads CSV from Rakuten Bank and uploads it to Kaikei Freee.

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
