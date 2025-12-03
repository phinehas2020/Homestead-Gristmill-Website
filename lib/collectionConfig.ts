export type CollectionMapping = {
  category: 'pantry' | 'goods' | 'wheat' | 'corn' | 'rye' | string;
  ids?: string[];
  handles?: string[];
  keywords?: string[];
};

// Central place to manage collection identifiers and friendly names.
// Add new collection IDs/handles/keywords here and the app will pick them up.
export const COLLECTION_MAPPINGS: CollectionMapping[] = [
  {
    category: 'pantry',
    ids: ['468089635058', 'gid://shopify/Collection/468089635058'],
    handles: ['pantry'],
    keywords: ['pantry']
  },
  {
    category: 'goods',
    ids: ['468122468594', 'gid://shopify/Collection/468122468594'],
    handles: ['goods', 'dry-goods', 'dry goods', 'drygoods'],
    keywords: ['goods', 'dry goods', 'dry-goods', 'drygoods']
  },
  {
    category: 'wheat',
    handles: ['wheat'],
    keywords: ['wheat']
  },
  {
    category: 'corn',
    handles: ['corn'],
    keywords: ['corn']
  },
  {
    category: 'rye',
    handles: ['rye'],
    keywords: ['rye']
  }
];

// Used as a fallback list if the Pantry collection is empty/unavailable.
export const FALLBACK_PANTRY_NAMES = [
  "Apple Cider Cake Donut Mix",
  "Stoneground Polenta",
  "Homestead Porridge",
  "Gingerbread Mix",
  "Pancake Mix",
  "Biscuit Mix"
];
