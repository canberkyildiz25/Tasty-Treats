/**
 * MISE tarif seti.
 *
 * Adımlar zaman çizelgesinin girdisidir:
 *   minutes  — adımın süresi
 *   hands    — mutfakta durman gerekiyor mu (aktif) yoksa beklemede mi (pasif)
 *   station  — hangi tezgâhta: oven, hob, prep, cold. Aynı istasyonda iki iş
 *              aynı anda yapılamaz; çizelge bunu dikkate alır.
 *
 * Malzemelerdeki `qty` porsiyon başına değil, `serves` değerine göre yazılır;
 * ölçekleyici oranlayarak yeniden hesaplar. `qty: null` olanlar "tadına göre".
 */

export const COURSES = [
  { id: 'starter', label: 'Starters' },
  { id: 'main', label: 'Mains' },
  { id: 'side', label: 'Sides' },
  { id: 'pudding', label: 'Puddings' },
]

export const KITCHENS = [
  { id: 'british', label: 'British' },
  { id: 'italian', label: 'Italian' },
  { id: 'levantine', label: 'Levantine' },
  { id: 'french', label: 'French' },
  { id: 'turkish', label: 'Turkish' },
]

export const recipes = [
  {
    slug: 'roast-chicken-lemon-thyme',
    ticket: 'M-01',
    title: 'Roast Chicken, Lemon and Thyme',
    course: 'main',
    kitchen: 'british',
    serves: 4,
    difficulty: 2,
    short: 'The one worth learning properly. Everything else is a variation.',
    intro:
      'A bird this size wants an hour and twenty in a hot oven and then twenty minutes left alone, which is not optional — carve it straight away and the juice ends up on the board instead of in the meat.',
    ingredients: [
      { qty: 1.6, unit: 'kg', item: 'free-range chicken' },
      { qty: 1, unit: '', item: 'lemon, halved' },
      { qty: 6, unit: 'sprigs', item: 'thyme' },
      { qty: 50, unit: 'g', item: 'butter, softened' },
      { qty: 4, unit: '', item: 'garlic cloves, skin on' },
      { qty: null, unit: '', item: 'salt and black pepper' },
    ],
    steps: [
      { text: 'Salt the chicken all over.', minutes: 5, hands: true, station: 'prep' },
      { text: 'Leave it out of the fridge to lose its chill.', minutes: 25, hands: false, station: 'prep' },
      { text: 'Heat the oven to 200C fan.', minutes: 15, hands: false, station: 'oven' },
      { text: 'Butter the bird, push thyme and lemon into the cavity, tie the legs.', minutes: 8, hands: true, station: 'prep' },
      { text: 'Roast, basting once at the halfway point.', minutes: 80, hands: false, station: 'oven' },
      { text: 'Lift onto a warm plate, cover loosely, and leave it.', minutes: 20, hands: false, station: 'prep' },
      { text: 'Tip the pan juices into the roasting tin, scrape, and reduce.', minutes: 6, hands: true, station: 'hob' },
      { text: 'Carve and serve.', minutes: 5, hands: true, station: 'prep' },
    ],
  },
  {
    slug: 'cacio-e-pepe',
    ticket: 'M-02',
    title: 'Cacio e Pepe',
    course: 'main',
    kitchen: 'italian',
    serves: 2,
    difficulty: 3,
    short: 'Four ingredients and nowhere to hide.',
    intro:
      'The sauce is cheese, pepper and pasta water brought together off the heat. Too hot and it splits into strings; the whole difficulty of the dish is in that one temperature.',
    ingredients: [
      { qty: 200, unit: 'g', item: 'tonnarelli or spaghetti' },
      { qty: 100, unit: 'g', item: 'pecorino romano, finely grated' },
      { qty: 2, unit: 'tsp', item: 'black peppercorns, coarsely cracked' },
      { qty: null, unit: '', item: 'salt for the water' },
    ],
    steps: [
      { text: 'Bring a shallow pan of water to the boil and salt it lightly — the pecorino is salty.', minutes: 10, hands: false, station: 'hob' },
      { text: 'Toast the cracked pepper in a dry pan until it smells of pepper.', minutes: 2, hands: true, station: 'hob' },
      { text: 'Cook the pasta two minutes short of the packet time.', minutes: 8, hands: false, station: 'hob' },
      { text: 'Mix the pecorino with a little warm pasta water into a paste.', minutes: 3, hands: true, station: 'prep' },
      { text: 'Off the heat, toss pasta, pepper and cheese paste until glossy.', minutes: 3, hands: true, station: 'prep' },
    ],
  },
  {
    slug: 'mercimek-corbasi',
    ticket: 'S-01',
    title: 'Mercimek Çorbası',
    course: 'starter',
    kitchen: 'turkish',
    serves: 4,
    difficulty: 1,
    short: 'Red lentil soup, finished with mint butter and lemon.',
    intro:
      'Made in every house and never quite the same twice. What matters is blending it properly smooth and not skipping the mint butter poured over at the table.',
    ingredients: [
      { qty: 250, unit: 'g', item: 'red lentils, rinsed' },
      { qty: 1, unit: '', item: 'onion, chopped' },
      { qty: 1, unit: '', item: 'carrot, chopped' },
      { qty: 1, unit: 'tbsp', item: 'tomato paste' },
      { qty: 1.2, unit: 'l', item: 'chicken or vegetable stock' },
      { qty: 40, unit: 'g', item: 'butter' },
      { qty: 1, unit: 'tsp', item: 'dried mint' },
      { qty: 1, unit: 'tsp', item: 'pul biber' },
      { qty: 1, unit: '', item: 'lemon, in wedges' },
    ],
    steps: [
      { text: 'Soften the onion and carrot in butter without colouring them.', minutes: 8, hands: true, station: 'hob' },
      { text: 'Stir in the tomato paste and cook it out for a minute.', minutes: 2, hands: true, station: 'hob' },
      { text: 'Add lentils and stock, bring to a simmer.', minutes: 5, hands: true, station: 'hob' },
      { text: 'Simmer until the lentils collapse.', minutes: 25, hands: false, station: 'hob' },
      { text: 'Blend completely smooth, then season.', minutes: 5, hands: true, station: 'prep' },
      { text: 'Melt butter with mint and pul biber; pour over at the table with lemon.', minutes: 4, hands: true, station: 'hob' },
    ],
  },
  {
    slug: 'braised-short-rib',
    ticket: 'M-03',
    title: 'Braised Short Rib',
    course: 'main',
    kitchen: 'french',
    serves: 4,
    difficulty: 3,
    short: 'Four hours in the oven, most of it unattended.',
    intro:
      'A long braise that asks for twenty minutes of work at the start and then nothing until you skim the fat. Better made a day ahead — it improves overnight and the fat lifts off solid.',
    ingredients: [
      { qty: 1.5, unit: 'kg', item: 'beef short rib, on the bone' },
      { qty: 1, unit: '', item: 'onion, quartered' },
      { qty: 2, unit: '', item: 'carrots, in chunks' },
      { qty: 500, unit: 'ml', item: 'red wine' },
      { qty: 500, unit: 'ml', item: 'beef stock' },
      { qty: 2, unit: 'tbsp', item: 'tomato paste' },
      { qty: 3, unit: 'sprigs', item: 'rosemary' },
    ],
    steps: [
      { text: 'Heat the oven to 150C fan.', minutes: 15, hands: false, station: 'oven' },
      { text: 'Brown the ribs hard on every side in batches.', minutes: 15, hands: true, station: 'hob' },
      { text: 'Colour the vegetables in the same pan, add tomato paste.', minutes: 8, hands: true, station: 'hob' },
      { text: 'Pour in wine, reduce by half, then add stock and the ribs.', minutes: 12, hands: true, station: 'hob' },
      { text: 'Cover and braise until the meat gives to a spoon.', minutes: 240, hands: false, station: 'oven' },
      { text: 'Skim the fat, reduce the liquor until it coats a spoon.', minutes: 15, hands: true, station: 'hob' },
    ],
  },
  {
    slug: 'muhammara',
    ticket: 'S-02',
    title: 'Muhammara',
    course: 'starter',
    kitchen: 'levantine',
    serves: 6,
    difficulty: 1,
    short: 'Roasted pepper and walnut, sharp with pomegranate molasses.',
    intro:
      'No cooking beyond the peppers, and it wants to sit for an hour before you eat it. Make it in the morning and it is better by supper.',
    ingredients: [
      { qty: 4, unit: '', item: 'red peppers' },
      { qty: 150, unit: 'g', item: 'walnuts, lightly toasted' },
      { qty: 60, unit: 'g', item: 'breadcrumbs' },
      { qty: 2, unit: 'tbsp', item: 'pomegranate molasses' },
      { qty: 1, unit: 'tsp', item: 'ground cumin' },
      { qty: 1, unit: 'tsp', item: 'pul biber' },
      { qty: 3, unit: 'tbsp', item: 'olive oil' },
    ],
    steps: [
      { text: 'Heat the oven to 220C fan.', minutes: 15, hands: false, station: 'oven' },
      { text: 'Roast the peppers until blistered and black in places.', minutes: 30, hands: false, station: 'oven' },
      { text: 'Cover them and let the skins loosen in their own steam.', minutes: 10, hands: false, station: 'prep' },
      { text: 'Peel and seed the peppers.', minutes: 8, hands: true, station: 'prep' },
      { text: 'Blitz everything to a coarse paste — it should not be smooth.', minutes: 6, hands: true, station: 'prep' },
      { text: 'Rest at room temperature so the flavours settle.', minutes: 60, hands: false, station: 'cold' },
    ],
  },
  {
    slug: 'ribollita',
    ticket: 'M-04',
    title: 'Ribollita',
    course: 'main',
    kitchen: 'italian',
    serves: 6,
    difficulty: 2,
    short: 'Bread soup, thick enough to stand a spoon in.',
    intro:
      'Built on stale bread and cavolo nero. The name means re-boiled, which tells you it is meant to be made today and eaten tomorrow.',
    ingredients: [
      { qty: 400, unit: 'g', item: 'cannellini beans, cooked' },
      { qty: 300, unit: 'g', item: 'cavolo nero, shredded' },
      { qty: 200, unit: 'g', item: 'stale sourdough, torn' },
      { qty: 1, unit: '', item: 'onion, diced' },
      { qty: 2, unit: '', item: 'carrots, diced' },
      { qty: 2, unit: '', item: 'celery sticks, diced' },
      { qty: 400, unit: 'g', item: 'tinned tomatoes' },
      { qty: 1, unit: 'l', item: 'vegetable stock' },
    ],
    steps: [
      { text: 'Dice the onion, carrot and celery; strip and shred the cavolo nero.', minutes: 14, hands: true, station: 'prep' },
      { text: 'Sweat the onion, carrot and celery slowly until sweet.', minutes: 20, hands: false, station: 'hob' },
      { text: 'Add tomatoes and cook down.', minutes: 10, hands: false, station: 'hob' },
      { text: 'Add stock, beans and cavolo nero; simmer.', minutes: 30, hands: false, station: 'hob' },
      { text: 'Tear in the stale bread and stir it through.', minutes: 5, hands: true, station: 'hob' },
      { text: 'Let it collapse into the soup.', minutes: 10, hands: false, station: 'hob' },
      { text: 'Rest off the heat, then finish with olive oil.', minutes: 10, hands: false, station: 'prep' },
    ],
  },
  {
    slug: 'sticky-toffee',
    ticket: 'P-01',
    title: 'Sticky Toffee Pudding',
    course: 'pudding',
    kitchen: 'british',
    serves: 6,
    difficulty: 2,
    short: 'Dates, dark sugar, and more sauce than seems reasonable.',
    intro:
      'The dates need soaking in boiling water with bicarbonate — that is what makes the sponge black and soft rather than merely brown.',
    ingredients: [
      { qty: 200, unit: 'g', item: 'medjool dates, stoned' },
      { qty: 300, unit: 'ml', item: 'boiling water' },
      { qty: 1, unit: 'tsp', item: 'bicarbonate of soda' },
      { qty: 175, unit: 'g', item: 'self-raising flour' },
      { qty: 150, unit: 'g', item: 'dark muscovado sugar' },
      { qty: 75, unit: 'g', item: 'butter' },
      { qty: 2, unit: '', item: 'eggs' },
      { qty: 300, unit: 'ml', item: 'double cream, for the sauce' },
    ],
    steps: [
      { text: 'Heat the oven to 160C fan and butter a tin.', minutes: 15, hands: false, station: 'oven' },
      { text: 'Soak the dates in boiling water with the bicarbonate.', minutes: 20, hands: false, station: 'prep' },
      { text: 'Cream butter and sugar, beat in the eggs, fold in flour.', minutes: 10, hands: true, station: 'prep' },
      { text: 'Blitz the dates and fold them through the batter.', minutes: 5, hands: true, station: 'prep' },
      { text: 'Bake until it springs back.', minutes: 35, hands: false, station: 'oven' },
      { text: 'Make the toffee sauce while it bakes.', minutes: 12, hands: true, station: 'hob' },
      { text: 'Pour over half the sauce and let it soak in.', minutes: 10, hands: false, station: 'prep' },
    ],
  },
  {
    slug: 'pizza-margherita',
    ticket: 'M-05',
    title: 'Pizza Margherita',
    course: 'main',
    kitchen: 'italian',
    serves: 2,
    difficulty: 3,
    short: 'A two-day dough and the hottest oven you own.',
    intro:
      'Domestic ovens do not reach pizzeria temperatures, so the fix is a steel left to heat for a full hour. The dough is made the day before and cold-fermented.',
    ingredients: [
      { qty: 300, unit: 'g', item: '00 flour' },
      { qty: 195, unit: 'ml', item: 'water' },
      { qty: 8, unit: 'g', item: 'salt' },
      { qty: 1, unit: 'g', item: 'fresh yeast' },
      { qty: 200, unit: 'g', item: 'San Marzano tomatoes, crushed' },
      { qty: 150, unit: 'g', item: 'fior di latte, torn and drained' },
      { qty: null, unit: '', item: 'basil and olive oil' },
    ],
    steps: [
      { text: 'Mix and knead the dough until it is smooth and tight.', minutes: 12, hands: true, station: 'prep' },
      { text: 'Leave it to prove at room temperature.', minutes: 108, hands: false, station: 'prep' },
      { text: 'Divide and ball the dough.', minutes: 6, hands: true, station: 'prep' },
      { text: 'Refrigerate overnight.', minutes: 714, hands: false, station: 'cold' },
      { text: 'Take the dough out and let it come up to room temperature.', minutes: 90, hands: false, station: 'prep' },
      { text: 'Heat the oven and steel as hot as it goes.', minutes: 60, hands: false, station: 'oven' },
      { text: 'Stretch, top sparingly, and bake one at a time.', minutes: 8, hands: true, station: 'oven' },
    ],
  },
  {
    slug: 'gratin-dauphinois',
    ticket: 'D-01',
    title: 'Gratin Dauphinois',
    course: 'side',
    kitchen: 'french',
    serves: 6,
    difficulty: 2,
    short: 'Potatoes, cream, garlic. No cheese — that is a different dish.',
    intro:
      'Slice the potatoes thin enough to see through and do not rinse them; the starch is what thickens the cream.',
    ingredients: [
      { qty: 1, unit: 'kg', item: 'waxy potatoes, sliced 2mm' },
      { qty: 400, unit: 'ml', item: 'double cream' },
      { qty: 200, unit: 'ml', item: 'whole milk' },
      { qty: 2, unit: '', item: 'garlic cloves' },
      { qty: null, unit: '', item: 'nutmeg, salt, pepper' },
    ],
    steps: [
      { text: 'Heat the oven to 150C fan and rub a dish with garlic.', minutes: 15, hands: false, station: 'oven' },
      { text: 'Warm the cream and milk with garlic and nutmeg.', minutes: 8, hands: true, station: 'hob' },
      { text: 'Slice the potatoes thin and layer them, seasoning as you go.', minutes: 15, hands: true, station: 'prep' },
      { text: 'Pour over the cream and bake until a knife slides through.', minutes: 90, hands: false, station: 'oven' },
      { text: 'Rest before cutting or it will slump.', minutes: 15, hands: false, station: 'prep' },
    ],
  },
  {
    slug: 'shakshuka',
    ticket: 'M-06',
    title: 'Shakshuka',
    course: 'main',
    kitchen: 'levantine',
    serves: 2,
    difficulty: 1,
    short: 'Eggs poached in pepper and tomato, straight from the pan.',
    intro:
      'The sauce should be thick before the eggs go in — if it is loose they will spread and boil rather than set in place.',
    ingredients: [
      { qty: 4, unit: '', item: 'eggs' },
      { qty: 2, unit: '', item: 'red peppers, sliced' },
      { qty: 1, unit: '', item: 'onion, sliced' },
      { qty: 400, unit: 'g', item: 'tinned tomatoes' },
      { qty: 1, unit: 'tsp', item: 'ground cumin' },
      { qty: 1, unit: 'tsp', item: 'sweet paprika' },
      { qty: null, unit: '', item: 'parsley and bread to serve' },
    ],
    steps: [
      { text: 'Slice the onion and peppers.', minutes: 7, hands: true, station: 'prep' },
      { text: 'Soften the onion and peppers until they give.', minutes: 12, hands: false, station: 'hob' },
      { text: 'Add the spices, then the tomatoes, and reduce until thick.', minutes: 15, hands: false, station: 'hob' },
      { text: 'Make wells and break in the eggs.', minutes: 3, hands: true, station: 'hob' },
      { text: 'Cover and cook until the whites set but the yolks do not.', minutes: 7, hands: false, station: 'hob' },
    ],
  },
  {
    slug: 'karniyarik',
    ticket: 'M-07',
    title: 'Karnıyarık',
    course: 'main',
    kitchen: 'turkish',
    serves: 4,
    difficulty: 2,
    short: 'Split aubergines filled with spiced lamb, baked in tomato.',
    intro:
      'Salting the aubergines first is not about bitterness, it is about them drinking less oil when they fry. Twenty minutes is enough.',
    ingredients: [
      { qty: 4, unit: '', item: 'aubergines' },
      { qty: 400, unit: 'g', item: 'minced lamb' },
      { qty: 2, unit: '', item: 'onions, diced' },
      { qty: 3, unit: '', item: 'tomatoes, chopped' },
      { qty: 2, unit: '', item: 'green peppers' },
      { qty: 1, unit: 'tbsp', item: 'tomato paste' },
      { qty: null, unit: '', item: 'olive oil for frying' },
    ],
    steps: [
      { text: 'Peel the aubergines in stripes and salt them.', minutes: 8, hands: true, station: 'prep' },
      { text: 'Leave them to sit and give up their water.', minutes: 12, hands: false, station: 'prep' },
      { text: 'Heat the oven to 190C fan.', minutes: 15, hands: false, station: 'oven' },
      { text: 'Fry the aubergines until golden, then drain.', minutes: 15, hands: true, station: 'hob' },
      { text: 'Cook the lamb with onion, then tomatoes and paste.', minutes: 18, hands: true, station: 'hob' },
      { text: 'Split, fill, top with pepper and tomato, add a little water.', minutes: 10, hands: true, station: 'prep' },
      { text: 'Bake until the tops colour.', minutes: 35, hands: false, station: 'oven' },
    ],
  },
  {
    slug: 'lemon-posset',
    ticket: 'P-02',
    title: 'Lemon Posset',
    course: 'pudding',
    kitchen: 'british',
    serves: 4,
    difficulty: 1,
    short: 'Three ingredients, set by acid alone.',
    intro:
      'No gelatine, no eggs. The lemon juice sets the cream on its own, which still feels like a trick the fourth time you make it.',
    ingredients: [
      { qty: 600, unit: 'ml', item: 'double cream' },
      { qty: 150, unit: 'g', item: 'caster sugar' },
      { qty: 3, unit: '', item: 'lemons, juiced and zested' },
    ],
    steps: [
      { text: 'Bring cream and sugar to a boil and hold it there.', minutes: 6, hands: true, station: 'hob' },
      { text: 'Off the heat, stir in the lemon juice and zest.', minutes: 3, hands: true, station: 'prep' },
      { text: 'Pour into glasses and cool to room temperature.', minutes: 30, hands: false, station: 'prep' },
      { text: 'Chill until set.', minutes: 180, hands: false, station: 'cold' },
    ],
  },
  {
    slug: 'panzanella',
    ticket: 'D-02',
    title: 'Panzanella',
    course: 'side',
    kitchen: 'italian',
    serves: 4,
    difficulty: 1,
    short: 'Only worth making in the two months tomatoes are good.',
    intro:
      'Salt the tomatoes and catch what comes out of them — that liquid, with vinegar and oil, is the dressing. Nothing else needed.',
    ingredients: [
      { qty: 600, unit: 'g', item: 'ripe tomatoes, torn' },
      { qty: 250, unit: 'g', item: 'stale sourdough, torn' },
      { qty: 1, unit: '', item: 'red onion, sliced thin' },
      { qty: 2, unit: 'tbsp', item: 'red wine vinegar' },
      { qty: 5, unit: 'tbsp', item: 'olive oil' },
      { qty: null, unit: '', item: 'basil' },
    ],
    steps: [
      { text: 'Tear the tomatoes and salt them in a colander over a bowl.', minutes: 8, hands: true, station: 'prep' },
      { text: 'Leave them to give up their liquid — that is the dressing.', minutes: 22, hands: false, station: 'prep' },
      { text: 'Slice the onion thin and drop it into the vinegar.', minutes: 3, hands: true, station: 'prep' },
      { text: 'Leave it to soak and take the edge off.', minutes: 17, hands: false, station: 'prep' },
      { text: 'Toast or dry the bread if it is not stale enough.', minutes: 10, hands: false, station: 'oven' },
      { text: 'Toss everything with the tomato liquid and oil.', minutes: 6, hands: true, station: 'prep' },
      { text: 'Leave it to sit so the bread drinks the dressing.', minutes: 20, hands: false, station: 'prep' },
    ],
  },
  {
    slug: 'tarte-tatin',
    ticket: 'P-03',
    title: 'Tarte Tatin',
    course: 'pudding',
    kitchen: 'french',
    serves: 6,
    difficulty: 3,
    short: 'Caramel first, and you cannot rescue it once it is dark.',
    intro:
      'The caramel goes in the pan before anything else and it will turn from amber to burnt in about fifteen seconds, so stand there and watch it.',
    ingredients: [
      { qty: 6, unit: '', item: 'firm apples, halved' },
      { qty: 150, unit: 'g', item: 'caster sugar' },
      { qty: 80, unit: 'g', item: 'butter' },
      { qty: 320, unit: 'g', item: 'all-butter puff pastry' },
    ],
    steps: [
      { text: 'Heat the oven to 190C fan.', minutes: 15, hands: false, station: 'oven' },
      { text: 'Peel and halve the apples.', minutes: 12, hands: true, station: 'prep' },
      { text: 'Make the caramel in the pan and watch it the whole time.', minutes: 8, hands: true, station: 'hob' },
      { text: 'Pack in the apples cut side up, tight against each other.', minutes: 5, hands: true, station: 'hob' },
      { text: 'Cook on the hob until they soften into the caramel.', minutes: 10, hands: false, station: 'hob' },
      { text: 'Lay the pastry over and tuck it down the sides.', minutes: 4, hands: true, station: 'prep' },
      { text: 'Bake until the pastry is deep gold.', minutes: 26, hands: false, station: 'oven' },
      { text: 'Rest five minutes, then turn out — any longer and it sticks.', minutes: 5, hands: false, station: 'prep' },
    ],
  },
]

export const findRecipe = (slug) => recipes.find((r) => r.slug === slug)

export const STATIONS = {
  oven: { label: 'Oven', short: 'OVN' },
  hob: { label: 'Hob', short: 'HOB' },
  prep: { label: 'Bench', short: 'PRP' },
  cold: { label: 'Fridge', short: 'CLD' },
}

/** Toplam süre = adımların toplamı (çizelge paralelleştirmeyi ayrıca hesaplar). */
export const totalMinutes = (recipe) =>
  recipe.steps.reduce((sum, s) => sum + s.minutes, 0)

export const activeMinutes = (recipe) =>
  recipe.steps.filter((s) => s.hands).reduce((sum, s) => sum + s.minutes, 0)

/** 95 → "1 sa 35 dk" yerine İngilizce kısa biçim. */
export const formatDuration = (mins) => {
  if (mins < 60) return `${mins} min`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m === 0 ? `${h} hr` : `${h} hr ${m}`
}

/** Porsiyon ölçekleme — 1/4, 1/2, 3/4 gibi kesirleri okunur yazar. */
export const scaleQuantity = (qty, fromServes, toServes) => {
  if (qty === null) return null
  const scaled = (qty * toServes) / fromServes
  if (scaled >= 10) return Math.round(scaled)
  if (Number.isInteger(scaled)) return scaled
  const rounded = Math.round(scaled * 4) / 4
  return rounded
}

export const formatQuantity = (qty) => {
  if (qty === null) return ''
  const whole = Math.floor(qty)
  const frac = qty - whole
  const fracLabel = { 0.25: '¼', 0.5: '½', 0.75: '¾' }[frac]
  if (!fracLabel) return String(Math.round(qty * 10) / 10)
  return whole > 0 ? `${whole}${fracLabel}` : fracLabel
}
