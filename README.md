# コードタイピング（CODE-TYPING）
コンピュータサイエンスが学べる学習プラットフォーム[Recursion](https://recursionist.io/)のコミュニティ内でチームを組み開発しました。
## Demo
![typing_game](https://user-images.githubusercontent.com/83937097/180911079-35becb33-929c-4e8d-84c0-c0fa8dd1b089.gif)
## Description
プログラミングのコーディングに特化したタイピングアプリです。このアプリでは言語（JavaScript,Java）とレベル（初級・中級・上級）を選択し練習コード決定します。またテキストエリアにコードを貼り付けることでオリジナルの練習コードの指定もできます。ゲーム中は画面上方のコードを見ながらタイプします。画面下方のキーボードは実際にタイプしているキーの色が変わります。タイプ音は正確の音と不正解の音があります。BGMも流せます。ゲーム終了後に時間、スコア、苦手キー、ミスタイプ数、正確率を確認できます。Googleログインかゲストログインで、これまでのゲーム履歴を振り返ることができます。製作期間は１ヶ月。３名で制作しました。

このアプリの詳細ページ： https://www.resume.id/works/98b3ca621d57f5c9
### Tool
- Vue.js(vue3 compositionAPI)
- 状態管理（pinia）
- TypeScript
- Tailwindcss
- Firebase Authentication (Google・匿名ログイン)
- Firestore (DB)
## URL
https://programming-lang-typing-game.netlify.app
## Project Setup

```sh
git clone git@github.com:hata8341/self_typing_game.git
cd self_typing_game/
npm install
npm run dev
```
