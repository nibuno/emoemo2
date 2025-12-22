# emoemo リリースTODO

## 完了済み
- [x] OGPタグの追加
- [x] meta descriptionの追加
- [x] タイトルを「emoemo - かんたんemojiメーカー」に変更
- [x] lang属性を「ja」に変更
- [x] Twitter Cardタグの追加

## 必須（リリース前）
- [ ] **OGP画像の作成・設定**
  - 推奨サイズ: 1200x630px
  - `index.html`のコメントアウトを解除してURLを設定
- [ ] **faviconの作成・設定**
  - 現在はViteのデフォルト（vite.svg）
  - emoemo用のアイコンを作成して差し替え

## 推奨
- [ ] **モバイル対応の確認**
  - スマホでの表示・操作確認
  - 必要に応じてレスポンシブ調整
- [ ] **フッターの追加**（任意）
  - 作者情報
  - GitHubリンク

## あると良い
- [ ] **アナリティクス導入**（任意）
  - Google Analytics または Plausible など
- [ ] **エラーハンドリング**
  - Canvas非対応ブラウザへの対応など

## OGP画像について
SNSでシェアされた時に表示される画像。以下を含めると良い：
- 「emoemo」ロゴ
- 「かんたんemojiメーカー」のキャッチコピー
- アプリのスクリーンショットや作成例

設定方法：
1. 画像を作成（1200x630px推奨）
2. `public/`フォルダに配置（例: `public/ogp.png`）
3. `index.html`の以下のコメントを解除してパスを設定：
```html
<meta property="og:image" content="https://nibuno.github.io/emoemo2/ogp.png" />
<meta name="twitter:image" content="https://nibuno.github.io/emoemo2/ogp.png" />
```

## faviconについて
ブラウザのタブに表示されるアイコン。

設定方法：
1. アイコン画像を作成（32x32px または SVG）
2. `public/`フォルダに配置
3. `index.html`の`<link rel="icon">`を更新
