# 画像生成アプリ (Image Generator)

Google Geminiを使用したNext.jsベースの画像生成アプリケーションです。

## 機能

- テキストプロンプトから画像を生成
- 認証機能付き
- 生成画像のURL取得とコピー機能
- レスポンシブデザイン

## 技術スタック

- **フレームワーク**: Next.js 15.3.5
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **AI API**: Google Gemini API
- **その他**: React 19

## セットアップ

### 前提条件

- Node.js 18以上
- npm または yarn

### インストール

1. リポジトリをクローン
```bash
git clone <repository-url>
cd image-generator
```

2. 依存関係をインストール
```bash
npm install
```

3. 環境変数を設定
```bash
cp .env.example .env.local
```

Google Gemini APIキーを`.env.local`に設定してください。

### 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)でアプリケーションが起動します。

## 使用方法

1. アプリケーションにアクセス
2. ログイン画面でログイン
3. プロンプトを入力して画像を生成
4. 生成された画像のURLをコピー可能

## プロジェクト構造

```
src/
├── app/
│   ├── api/
│   │   ├── auth/          # 認証API
│   │   └── generate/      # 画像生成API
│   ├── components/
│   │   ├── ImageGenerator.tsx  # メイン画像生成コンポーネント
│   │   └── LoadingAnimation.tsx # ローディングアニメーション
│   ├── lib/
│   │   ├── auth.ts        # 認証ロジック
│   │   └── imagen.ts      # Gemini API統合
│   ├── generate/          # 画像生成ページ
│   ├── login/             # ログインページ
│   └── globals.css        # グローバルスタイル
└── public/
    └── generated/         # 生成された画像の保存場所
```

## スクリプト

- `npm run dev` - 開発サーバーを起動（Turbopack使用）
- `npm run build` - 本番用ビルド
- `npm run start` - 本番サーバーを起動
- `npm run lint` - ESLintでコードをチェック

## 注意事項

- Google Gemini APIキーが必要です
- 画像生成には時間がかかる場合があります
- プロンプトは1000文字以内で入力してください