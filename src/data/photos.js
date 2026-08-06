/**
 * Tarif fotoğrafları.
 *
 * Hepsi Wikimedia Commons'tan, ilgili yemeğin kendi maddesinden alındı — stok
 * aramanın "başlığı doğru, fotoğrafı yanlış" sorunu böylece yok. Lisanslar
 * CC BY / CC BY-SA olduğu için künye zorunlu: tarif sayfasında fotoğrafın
 * altında gösteriliyor.
 */

export const photos = {
  'roast-chicken-lemon-thyme': {
    src: '/img/roast-chicken-lemon-thyme.jpg',
    credit: "Evan Swigart",
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Max%27s_Roasted_Chicken_-_Evan_Swigart.jpg',
  },
  'cacio-e-pepe': {
    src: '/img/cacio-e-pepe.jpg',
    credit: "Popo le Chien",
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Cacio_e_pepe.jpg',
  },
  'mercimek-corbasi': {
    src: '/img/mercimek-corbasi.jpg',
    credit: "Stolbovsky",
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Mercimek_soup_Istanbul.jpg',
  },
  'braised-short-rib': {
    src: '/img/braised-short-rib.jpg',
    credit: "Paul Lowry",
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Slow_Braised_Short_Rib_NYC.jpg',
  },
  'muhammara': {
    src: '/img/muhammara.jpg',
    credit: "Karen and Brad Emerson",
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Muhumarra_w_foccacia_(3967177145).jpg',
  },
  'ribollita': {
    src: '/img/ribollita.jpg',
    credit: "Ta4e Negodue",
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Ribollita_Siena.jpg',
  },
  'sticky-toffee': {
    src: '/img/sticky-toffee.jpg',
    credit: "Sarah Stierch",
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Sticky_toffee_pudding_at_the_Black_Swan_-_Stierch.jpg',
  },
  'pizza-margherita': {
    src: '/img/pizza-margherita.jpg',
    credit: "stu_spivack",
    license: 'CC BY-SA 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Pizza_Margherita_stu_spivack.jpg',
  },
  'gratin-dauphinois': {
    src: '/img/gratin-dauphinois.jpg',
    credit: "Ludovic Péron",
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Gratin_dauphinois.jpg',
  },
  'shakshuka': {
    src: '/img/shakshuka.jpg',
    credit: "Calliopejen1",
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Shakshuka_by_Calliopejen1.jpg',
  },
  'karniyarik': {
    src: '/img/karniyarik.jpg',
    credit: "William Neuheisel",
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Karn%C4%B1yar%C4%B1k_-_Lunch_at_Yanyali_Fehmi_Lokantasi_(6421044715).jpg',
  },
  'lemon-posset': {
    src: '/img/lemon-posset.jpg',
    credit: "jules",
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Lemon_posset_with_almond_bread_(295848437).jpg',
  },
  'panzanella': {
    src: '/img/panzanella.jpg',
    credit: "Heather Katsoulis",
    license: 'CC BY-SA 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Italian_Panzanella.jpg',
  },
  'tarte-tatin': {
    src: '/img/tarte-tatin.jpg',
    credit: "Djenghisz",
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Franse_tarte_tatin.jpg',
  },
}

export const photoFor = (slug) => photos[slug] ?? null
