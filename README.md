# 1. 概要

**プロジェクト名:** pf-pro-portal

**自己紹介:**  
氏名: 大山陽和太  
得意な技術: React, Next.js, TypeScript

**ポートフォリオ概要:**  
このアプリは、マルチモーダルなポータルシステムです。`Next.js` と `TypeScript` を利用して構築され、ユーザー認証、ダッシュボード、ワークスペース管理、タスク管理など、多彩な機能を提供します。レスポンシブなデザインで、各種デバイスに最適化されています。

**URL:** https://pf-pro-portal.vercel.app/

# 2. 開発技術

**使用技術:**  
- `HTML`
- `CSS`
- `TypeScript`

**ライブラリ/フレームワーク:**  
- `React`
- `Next.js`
- `Tailwind CSS`
- `Shadcn UI`
- `Prisma`

**その他ツール:**  
- `Vercel`
- `Supabase`

# 3. ポートフォリオ詳細

**概要:**  
このプロジェクトは、効率的なポータル管理を実現するために設計されました。ユーザー認証、ワークスペースおよびタスク管理、リアルタイムチャットなどの機能を備え、最新の Next.js 機能を活用しています。

**開発期間:**  
1週間

**機能:**
- **OAuth, Email認証**
- **theme, workspace設定**
- **リアルタイムチャット**
- **マインドマップ**
- **タスク**
- **カレンダー（実装予定）**
- **ポモドーロ（実装予定）**
- **招待（実装予定）**
- **アサイン（実装予定）**
- **お気に入り、ブックマーク（実装予定）**

**フォルダ構成:**
- **`prisma/`**  
  データベーススキーマやマイグレーションファイル（[`schema.prisma`](prisma/schema.prisma)）を管理。
- **`public/`**  
  静的ファイルや画像を配置。
- **`src/`**
  - **`app/`**  
    Next.js のルーティングページやレイアウトファイルを配置。
  - **`features/`**  
    ダッシュボード、タスク管理、ワークスペース管理などの機能別コンポーネントを配置。
  - **`components/`**  
    共通UIコンポーネントを配置。
  - **`constants/`**  
    プロジェクト内で利用する定数や設定値を管理します。
  - **`hooks/`**  
    カスタム React フックをまとめています。各種ビジネスロジックやデータ取得ロジックをシンプルにするために利用されます。
  - **`lib/`**  
    ユーティリティ関数やヘルパー関数、外部ライブラリのラッパーなど、再利用可能なライブラリ群を管理します。
  - **`messages/`**  
    国際化対応用の翻訳ファイル（例: `en.json`, `ja.json`）を配置しています。
  - **`providers/`**  
    React コンテキストや状態管理のプロバイダー（例: 認証プロバイダー、テーマプロバイダー等）を配置します。
  - **`store/`**  
    グローバルな状態管理（Redux や Zustand などを利用している場合）の設定やスライスを配置します。
  - **`types/`**  
    TypeScript の型定義やインターフェース、カスタム型をまとめたディレクトリです。
