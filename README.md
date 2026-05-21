# Japanese Burger LP (Halal Wagyu)

業態: **Japanese Burger** (Halal Wagyu)
ドメイン: `japanese-burger.halal-food-wagyu.com`
GA4測定ID: `G-28KWYTRD4Q`

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

## GA4の計測内容

すべてのイベントに以下のカスタムパラメータを付与している:

- `store_name`(例: `halal-wagyu-godaime`)
- `store_area`(例: `asakusa`)
- `brand`(例: `japanese-burger`)

これにより、業態GA4プロパティ内で店舗別/エリア別の集計ができる。

### 自動で計測されるイベント

- `page_view`(自動)
- `scroll`(GA4の標準: 90%スクロール時に自動)
- `outbound_click`(TableCheck等の外部リンク、GA4の拡張計測で自動)

### カスタムイベント(`data-ga-event`属性で発火)

| イベント名 | 発火元 | event_label(location) |
|---|---|---|
| `reserve_click` | ナビ右上「Reserve」 | `nav` |
| `reserve_click` | Hero「Reserve a Table」 | `hero` |
| `reserve_click` | Reviews下「Reserve a Table」 | `reviews` |
| `reserve_click` | Reserveセクション「Reserve Online」 | `reserve_section` |
| `reserve_click` | 右下フローティング「Check Availability」 | `fab` |
| `reserve_click` | 22秒後ダイアログ「Reserve Now」 | `dialog` |
| `tel_click` | 電話番号タップ(Reserveセクション、Accessセクション) | — |

新しいトラッキングを追加するときは、HTML要素に
`data-ga-event="reserve_click" data-ga-location="..."` を付ければ自動で発火する。

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
