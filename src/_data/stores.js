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
    {
      // ===== URL/識別 =====
      region: "tokyo",
      slug: "asakusa-kominka",
      // ===== 店名 =====
      name_full_en: "Asakusa Restaurant Wagyu (Halal) Steak Hamburger & Ramen (Japanese food) Godaime 1962",
      name_short: "Godaime 1962",
      name_cn: "五代目 1962",
      name_meta: "Asakusa Halal Wagyu Burger · Godaime 1962",
      // ===== 立地 =====
      city: "Asakusa",
      station_en: "Asakusa Station",
      station_jp: "浅草駅",
      address_en: "2F, Kominka, 3-27-6 Asakusa, Taito-ku, Tokyo",
      address_postal: "111-0032",
      // ===== 連絡先 =====
      tel_display: "090-5607-3945",
      tel_raw: "819056073945",
      email: "",
      // ===== 営業 =====
      hours: "11:00 – 23:00",
      hours_short: "11–23",
      hours_note: "L.O. 22:45",
      hours_special: "",
      // ===== 席・施設 =====
      seats: "15 seats",
      seats_note: "No private rooms",
      facilities_main: "Halal-friendly menu · Takeout available · Prayer room",
      facilities_sub: "Child-friendly · Stroller accessible · Cashless only",
      payment_note: "Cashless only — credit cards and mobile payments accepted",
      // ===== 予約・SNS =====
      tablecheck_url: "https://www.tablecheck.com/shops/halal-omakase-asakusa/reserve",
      instagram_url: "",
      instagram_handle: "",
      // ===== 評価 =====
      rating: "4.8",
      rating_count: "1,200+",
      // ===== Maps =====
      maps_embed: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3682.2149510444647!2d139.797575!3d35.717933!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188f62d00bb699%3A0xa8daec37fe3cc7a5!2sAsakusa%20Restaurant%20Wagyu%20(Halal)%20Steak%20Hamburger%20%26%20Ramen%20(Japanese%20food)%20Godaime%201962!5e1!3m2!1sja!2sus!4v1779275302115!5m2!1sja!2sus",
      maps_link: "https://maps.app.goo.gl/?q=Asakusa+Restaurant+Wagyu+Halal+Godaime+1962"
    }
    // ===== 2店舗目を追加するときはこの下にもう1つ { ... } を書くだけ =====
    // {
    //   region: "shibuya",
    //   slug: "halal-wagyu-shibuya",
    //   ...
    // }
  ]
};
