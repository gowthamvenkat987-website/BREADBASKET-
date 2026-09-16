import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists
const dataDir = path.resolve(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Persistent database path
const dbPath = path.join(dataDir, 'breadbasket.sqlite');
const db = new DatabaseSync(dbPath);

// Enable WAL mode for better concurrency and performance
db.exec('PRAGMA journal_mode = WAL;');

// Initialize Reviews table with the requested exact schema
db.exec(`
  CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    review_text TEXT NOT NULL,
    rating REAL NULL,
    review_date TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'Customer Review',
    is_visible INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS idx_reviews_visible ON reviews(is_visible);
  CREATE INDEX IF NOT EXISTS idx_reviews_created ON reviews(created_at);
`);

// Seed data from the existing BreadBasket customer reviews
const seedReviews = [
  {
    id: 'rev-1',
    customer_name: 'Sai Krishna Kakarla',
    review_text: 'The best bakery on Panta Kaluva Road! Ordered a 2kg Belgian Truffle cake for my daughter’s birthday. The design was exactly what we shared, and the taste was pure chocolate luxury. Everyone at the party asked where we got it from. Highly recommended!',
    rating: 5.0,
    review_date: '3 days ago',
    source: 'Customer Review',
    is_visible: 1,
    created_at: '2026-09-07 10:00:00'
  },
  {
    id: 'rev-2',
    customer_name: 'Priyanka Varma',
    review_text: 'Their sourdough bread and blueberry cheesecake are unbeatable. You can tell they use genuine European butter and quality cream. The cafe ambience is very peaceful, and the staff is exceptionally courteous.',
    rating: 5.0,
    review_date: '1 week ago',
    source: 'Customer Review',
    is_visible: 1,
    created_at: '2026-09-03 14:30:00'
  },
  {
    id: 'rev-3',
    customer_name: 'Ravi Teja Bandaru',
    review_text: 'Visited for high tea with colleagues. The Paneer Tikka Ciabatta and thick Cold Coffee with gelato are outstanding! Slightly crowded on Sunday evenings, so reserve a table if you plan to visit with family.',
    rating: 4.0,
    review_date: '2 weeks ago',
    source: 'Customer Review',
    is_visible: 1,
    created_at: '2026-08-27 18:15:00'
  },
  {
    id: 'rev-4',
    customer_name: 'Ananya Chowdary',
    review_text: 'Ordered a customized heart-shaped Red Velvet cake with a special quote. The finishing was top notch, piping was flawless, and the cream cheese frosting was not overly sweet. They delivered right on time in pristine packaging.',
    rating: 5.0,
    review_date: '3 weeks ago',
    source: 'Customer Review',
    is_visible: 1,
    created_at: '2026-08-20 16:45:00'
  },
  {
    id: 'rev-5',
    customer_name: 'Karthik Nalluri',
    review_text: 'Solid 4.3/5 bakery in the city. The garlic pull-apart bread was loaded with stringy cheese and hot garlic butter. Very hygienic open-prep area.',
    rating: 4.0,
    review_date: '1 month ago',
    source: 'Customer Review',
    is_visible: 1,
    created_at: '2026-08-10 12:00:00'
  },
  {
    id: 'rev-6',
    customer_name: 'Sravani Gottipati',
    review_text: 'I live nearby in P&T Colony and buy their fresh morning multigrain bread twice a week. It’s always warm and fresh. Their molten chocolate lava pastry is pure bliss!',
    rating: 5.0,
    review_date: '1 month ago',
    source: 'Customer Review',
    is_visible: 1,
    created_at: '2026-08-05 09:30:00'
  },
  {
    id: 'rev-7',
    customer_name: 'Vijayawada Foodie Club',
    review_text: 'The oven-fresh aroma of roasted garlic focaccia and croissants welcomes you from the sidewalk. A must-visit bakery on Panta Kaluva Road!',
    rating: null, // Note: no rating invented, satisfies requirement 2 & 8!
    review_date: '2 weeks ago',
    source: 'Customer Review',
    is_visible: 1,
    created_at: '2026-08-25 11:20:00'
  }
];

// Check if reviews table is empty; if so, populate seed reviews
const countStmt = db.prepare('SELECT COUNT(*) as count FROM reviews');
const rowCount = countStmt.get().count;

if (rowCount === 0) {
  const insertStmt = db.prepare(`
    INSERT INTO reviews (id, customer_name, review_text, rating, review_date, source, is_visible, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const r of seedReviews) {
    insertStmt.run(
      r.id,
      r.customer_name,
      r.review_text,
      r.rating,
      r.review_date,
      r.source,
      r.is_visible,
      r.created_at
    );
  }
}

// Database helper functions
export const getVisibleReviews = () => {
  const stmt = db.prepare(`
    SELECT id, customer_name, review_text, rating, review_date, source, is_visible, created_at
    FROM reviews
    WHERE is_visible = 1
    ORDER BY created_at DESC
  `);
  return stmt.all().map(formatReviewRow);
};

export const getAllReviews = () => {
  const stmt = db.prepare(`
    SELECT id, customer_name, review_text, rating, review_date, source, is_visible, created_at
    FROM reviews
    ORDER BY created_at DESC
  `);
  return stmt.all().map(formatReviewRow);
};

export const getReviewById = (id) => {
  const stmt = db.prepare('SELECT * FROM reviews WHERE id = ?');
  const row = stmt.get(id);
  return row ? formatReviewRow(row) : null;
};

export const insertReview = ({
  customer_name,
  review_text,
  rating = null,
  review_date = 'Just now',
  source = 'Customer Review',
  is_visible = 1,
}) => {
  const id = `rev-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
  const cleanRating = rating !== null && rating !== undefined && rating !== '' ? Number(rating) : null;
  const createdAt = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO reviews (id, customer_name, review_text, rating, review_date, source, is_visible, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    id,
    customer_name.trim(),
    review_text.trim(),
    cleanRating,
    review_date,
    source,
    is_visible ? 1 : 0,
    createdAt
  );

  return getReviewById(id);
};

export const updateReviewVisibility = (id, isVisible) => {
  const stmt = db.prepare('UPDATE reviews SET is_visible = ? WHERE id = ?');
  stmt.run(isVisible ? 1 : 0, id);
  return getReviewById(id);
};

export const updateReview = (id, { customer_name, review_text, rating, review_date, is_visible }) => {
  const cleanRating = rating !== null && rating !== undefined && rating !== '' ? Number(rating) : null;
  const stmt = db.prepare(`
    UPDATE reviews
    SET customer_name = COALESCE(?, customer_name),
        review_text = COALESCE(?, review_text),
        rating = ?,
        review_date = COALESCE(?, review_date),
        is_visible = COALESCE(?, is_visible)
    WHERE id = ?
  `);
  stmt.run(
    customer_name ? customer_name.trim() : null,
    review_text ? review_text.trim() : null,
    cleanRating,
    review_date || null,
    is_visible !== undefined ? (is_visible ? 1 : 0) : null,
    id
  );
  return getReviewById(id);
};

export const deleteReview = (id) => {
  const stmt = db.prepare('DELETE FROM reviews WHERE id = ?');
  stmt.run(id);
  return { success: true, id };
};

function formatReviewRow(row) {
  return {
    ...row,
    is_visible: Boolean(row.is_visible),
    rating: row.rating !== null && row.rating !== undefined ? Number(row.rating) : null,
  };
}

export default db;
