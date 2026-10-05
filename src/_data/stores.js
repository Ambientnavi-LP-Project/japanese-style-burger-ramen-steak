/**
 * 店舗データ定義
 * 新しい店舗を追加するときは、この配列に store オブジェクトを追加するだけ。
 * Eleventy が自動で /{region}/{slug}/index.html を生成します。
 */
module.exports = {
  brand: {
    // 業態(サブドメイン)レベルの共通設定
    domain: "japanese-burger.halal-food-wagyu.com",
    ga4_id: "G-28KWYTRD4Q",
    brand_name: "Japanese Burger",
    brand_slug: "japanese-burger"
  },
  stores: [
    // ===== 2店舗目を追加するときはこの下にもう1つ { ... } を書くだけ =====
    // {
    //   region: "shibuya",
    //   slug: "halal-wagyu-shibuya",
    //   ...
    // }
  ]
};
