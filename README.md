# Japanese Burger LP (Halal Wagyu)

業態: **Japanese Burger** (Halal Wagyu)
ドメイン: `japanese-burger.halal-food-wagyu.com`
GTMコンテナID: `GTM-5DGT9H6L`（GA4への送信はGTM側で設定）

Eleventy(11ty)製の静的サイト。1つのテンプレ + 店舗データから、全店舗ページを自動生成する。

---

## ディレクトリ

```
.
├── .eleventy.js              ← Eleventy設定
├── package.json
├── vercel.json               ← Vercel設定
├── src/
│   ├── _data/
│   │   └── stores.js         ← 業態設定と店舗データ
│   ├── store.njk             ← 全店舗共通のページテンプレ
│   └── image/                ← 画像・動画(配信)
└── _site/                    ← ビルド成果物(git無視)
```

---

## ローカルで動かす

```bash
# 1) 依存をインストール(初回のみ)
npm install

# 2) ローカル起動
npm run dev
# → http://localhost:8080/asakusa/halal-wagyu-godaime/

# 3) 本番ビルド
npm run build
# → _site/asakusa/halal-wagyu-godaime/index.html
```

---

## Vercelへデプロイ

1. GitHubにこのリポジトリをpush
2. Vercel → New Project → このリポジトリをImport
3. Framework Preset は **Other** のままでOK(`vercel.json` が設定を持つ)
4. Deploy → 自動でビルドされる
5. Settings → Domains で `japanese-burger.halal-food-wagyu.com` を追加
6. ドメインのDNSにVercelのレコードを追加(Vercelに案内が出る)

---

## 店舗を追加する手順

`src/_data/stores.js` の `stores` 配列に1つオブジェクトを追加するだけ。

```js
stores: [
  { region: "asakusa", slug: "halal-wagyu-godaime", ... },
  // ↓ これを追加
  {
    region: "shibuya",
    slug: "halal-wagyu-shibuya",
    name_full_en: "Shibuya Restaurant Wagyu ...",
    name_short: "Shibuya Halal Wagyu",
    city: "Shibuya",
    station_en: "Shibuya Station",
    address_en: "...",
    tel_display: "03-xxxx-xxxx",
    tel_raw: "813xxxxxxxx",
    tablecheck_url: "https://www.tablecheck.com/...",
    maps_embed: "https://www.google.com/maps/embed?pb=...",
    rating: "4.7",
    rating_count: "800+",
    // ... 他のフィールドも埋める
  }
]
```

`git push` するとVercelが自動でビルドし、
`https://japanese-burger.halal-food-wagyu.com/shibuya/halal-wagyu-shibuya/` が生成される。

---

## 計測イベント一覧

このLPで実際に実装しているイベント。
計測は **GTM コンテナ `GTM-5DGT9H6L`** 1本に集約している。

| イベント名 | 発火する場所 | 実装 |
|---|---|---|
| `reserve_click` | Reserveセクション「Reserve Online」／右下フローティングボタン／22秒後ダイアログ「Reserve Now」（いずれも TableCheck への外部リンク） | `data-ga-event="reserve_click"` |
| `tel_click` | アクセス欄／Reserveセクションの電話番号リンク | `data-ga-event="tel_click"` |
| `scroll_depth` | ページのスクロール到達率 | GTM組み込みトリガー（コード実装なし） |

### 仕組み

計測方式は **1つだけ**。計測したい要素に `data-ga-event="イベント名"` を付けると、
ページ末尾の委譲リスナー1本が `dataLayer` に push する。

```js
window.dataLayer.push({ event: el.getAttribute('data-ga-event') });
```

店舗名・エリアなどの**パラメータはコード側で組み立てない**。
GTM 側で URL（ホスト名／パス）から解決する。
そのため `stores.js` に店舗を追加しても、計測用の設定を書き足す必要はない。

### 実装していないもの

- **ページ内リンク**（ナビ右上「Reserve」、Hero・Reviews下の「Reserve a Table」）は
  計測していない。これらは予約画面を開くのではなく、ページ下部の Reserve セクションへ
  スクロールするだけのリンクで、着地先の「Reserve Online」と二重に数えてしまうため。
- **`map_click`**：このLPには Googleマップへの外部リンクがない。地図は iframe 埋め込みのみで、
  ブラウザの仕様上 iframe 内部のクリックは親ページの JavaScript では検知できない。
  （`stores.js` には `maps_link` の値が入っているが、テンプレート側で使っていない）
- `outbound_click` は外部SNSリンク用だが、このLPには Instagram 等のリンクがない。
- `reservation_form_submit` / `final_check_view` は自社予約フォームを使うLP用。このLPは対象外。
- `course_select` はコース選択UIがあるLP用。このLPにはコース選択UIがない。

---

## UTMパラメータ運用(他業態と同じルール)

ページURL自体は変えず、後ろに `?` 以降を付ける。

**Googleマップのプロフィール用:**
```
{店舗ページURL}?utm_source=google-maps-hp&utm_medium=organic&utm_campaign=profile
```

**Google広告のウェブサイトボタン用:**
```
{店舗ページURL}?utm_source=google-ads-website&utm_medium=cpc&utm_campaign=store
```

**浅草店の例:**
- ページURL: `https://japanese-burger.halal-food-wagyu.com/asakusa/halal-wagyu-godaime/`
- GBP用: `https://japanese-burger.halal-food-wagyu.com/asakusa/halal-wagyu-godaime/?utm_source=google-maps-hp&utm_medium=organic&utm_campaign=profile`
- 広告用: `https://japanese-burger.halal-food-wagyu.com/asakusa/halal-wagyu-godaime/?utm_source=google-ads-website&utm_medium=cpc&utm_campaign=store`

`utm_campaign` は店舗ごとに変えない(`profile` / `store` で固定)。店舗識別はGA4のカスタムパラメータ `store_name` で行う。

---

## 画像の置き場所

`src/image/` に置いたファイルが、ビルド時に `/image/...` で配信される。

必要なファイル一覧:
- `burger1.jpg` — Wagyu Cheese Burger
- `steak2.jpg` — Seared Wagyu Steak
- `ramen3.jpg` — Wagyu Ramen
- `steakrice1.png` — Wagyu Rice Bowl
- `steak3.jpg` — Story section
- `interior1.jpg` ~ `interior4.jpg` — Interior slideshow (4枚)
- `cow.png` — Hero cow silhouette (黒シルエット、CSSで白反転)
- `japanese_style.mp4` — Hero background video (9:16縦)

店舗ごとに違う画像にしたい場合は、フォルダを分けてstoreデータでパス指定するように改修する(将来対応)。

## 計測要件

LPの作成・デザイン変更・テンプレート追加を行う際は、必ず以下を参照すること。
CTAの書き方やTableCheckのURL指定を誤ると、広告のコンバージョン計測が停止する。

https://github.com/Ambientnavi-LP-Project/omakase/blob/main/docs/LP%E4%BD%9C%E6%88%90%E3%83%97%E3%83%AD%E3%83%B3%E3%83%97%E3%83%88.md
