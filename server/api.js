import { 
  getVisibleReviews, 
  getAllReviews, 
  getReviewById, 
  insertReview, 
  updateReviewVisibility, 
  updateReview, 
  deleteReview 
} from './db.js';

const ADMIN_TOKEN = 'breadbasket_admin_secure_token_v1';
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'breadbasket123',
  pin: '1030',
};

// Helper to parse JSON body from incoming Node.js IncomingMessage
export const parseBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      if (!body.trim()) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON payload'));
      }
    });
    req.on('error', reject);
  });
};

// Helper to send JSON responses
export const sendJson = (res, statusCode, data) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.end(JSON.stringify(data));
};

// Check if request is authenticated as admin
const isAuthorizedAdmin = (req) => {
  const authHeader = req.headers['authorization'] || '';
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7) === ADMIN_TOKEN;
  }
  // Check optional x-admin-token header
  return req.headers['x-admin-token'] === ADMIN_TOKEN;
};

// Main API Handler router function
export async function handleApiRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;
  const method = req.method.toUpperCase();

  // Handle CORS Preflight
  if (method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    return res.end();
  }

  try {
    // -------------------------------------------------------------
    // 1. PUBLIC: GET /api/reviews
    // Fetch all visible customer reviews for the public website
    // -------------------------------------------------------------
    if (pathname === '/api/reviews' && method === 'GET') {
      const reviews = getVisibleReviews();
      return sendJson(res, 200, {
        success: true,
        count: reviews.length,
        reviews,
      });
    }

    // -------------------------------------------------------------
    // 2. PUBLIC: POST /api/reviews
    // Allow customers to submit a review
    // -------------------------------------------------------------
    if (pathname === '/api/reviews' && method === 'POST') {
      const body = await parseBody(req);
      const { customer_name, review_text, rating, review_date } = body;

      if (!customer_name || !customer_name.trim()) {
        return sendJson(res, 400, { success: false, error: 'Customer name is required' });
      }
      if (!review_text || !review_text.trim()) {
        return sendJson(res, 400, { success: false, error: 'Review text is required' });
      }

      // Requirement 2: Do NOT invent ratings if not provided!
      let parsedRating = null;
      if (rating !== null && rating !== undefined && rating !== '') {
        const r = Number(rating);
        if (!isNaN(r) && r >= 1 && r <= 5) {
          parsedRating = r;
        }
      }

      const created = insertReview({
        customer_name,
        review_text,
        rating: parsedRating,
        review_date: review_date || 'Just now',
        source: 'Customer Review',
        is_visible: 1, // Visible by default
      });

      return sendJson(res, 201, {
        success: true,
        message: 'Review submitted successfully!',
        review: created,
      });
    }

    // -------------------------------------------------------------
    // 3. ADMIN AUTH: POST /api/admin/login
    // Verify admin credentials and return token
    // -------------------------------------------------------------
    if (pathname === '/api/admin/login' && method === 'POST') {
      const body = await parseBody(req);
      const { username, password, pin } = body;

      const isUserPassValid = username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
      const isPinValid = pin === ADMIN_CREDENTIALS.pin;

      if (isUserPassValid || isPinValid) {
        return sendJson(res, 200, {
          success: true,
          token: ADMIN_TOKEN,
          user: {
            username: 'admin',
            role: 'owner',
            name: 'The Bread Basket Owner',
          },
        });
      } else {
        return sendJson(res, 401, {
          success: false,
          error: 'Invalid credentials. Please enter correct owner password or PIN (1030).',
        });
      }
    }

    // -------------------------------------------------------------
    // ADMIN-ONLY ROUTE GUARD
    // All routes below /api/admin require authentication
    // -------------------------------------------------------------
    if (pathname.startsWith('/api/admin/')) {
      if (!isAuthorizedAdmin(req)) {
        return sendJson(res, 403, {
          success: false,
          error: 'Access denied. You must be an authorized admin/owner to access this resource.',
        });
      }

      // 4. ADMIN: GET /api/admin/reviews (all reviews including hidden)
      if (pathname === '/api/admin/reviews' && method === 'GET') {
        const reviews = getAllReviews();
        return sendJson(res, 200, {
          success: true,
          count: reviews.length,
          reviews,
        });
      }

      // 5. ADMIN: POST /api/admin/reviews (add review as owner)
      if (pathname === '/api/admin/reviews' && method === 'POST') {
        const body = await parseBody(req);
        const { customer_name, review_text, rating, review_date, is_visible } = body;

        if (!customer_name || !customer_name.trim()) {
          return sendJson(res, 400, { success: false, error: 'Customer name is required' });
        }
        if (!review_text || !review_text.trim()) {
          return sendJson(res, 400, { success: false, error: 'Review text is required' });
        }

        let parsedRating = null;
        if (rating !== null && rating !== undefined && rating !== '') {
          const r = Number(rating);
          if (!isNaN(r) && r >= 1 && r <= 5) {
            parsedRating = r;
          }
        }

        const created = insertReview({
          customer_name,
          review_text,
          rating: parsedRating,
          review_date: review_date || 'Just now',
          source: 'Customer Review',
          is_visible: is_visible !== undefined ? (is_visible ? 1 : 0) : 1,
        });

        return sendJson(res, 201, {
          success: true,
          message: 'Review created successfully in database!',
          review: created,
        });
      }

      // 6. ADMIN: PATCH /api/admin/reviews/:id/visibility (toggle show/hide)
      const visibilityMatch = pathname.match(/^\/api\/admin\/reviews\/([^/]+)\/visibility$/);
      if (visibilityMatch && method === 'PATCH') {
        const id = visibilityMatch[1];
        const body = await parseBody(req);
        const existing = getReviewById(id);

        if (!existing) {
          return sendJson(res, 404, { success: false, error: 'Review not found' });
        }

        const newVisibility = body.is_visible !== undefined ? Boolean(body.is_visible) : !existing.is_visible;
        const updated = updateReviewVisibility(id, newVisibility);

        return sendJson(res, 200, {
          success: true,
          message: `Review is now ${newVisibility ? 'visible on website' : 'hidden from website'}`,
          review: updated,
        });
      }

      // 7. ADMIN: DELETE /api/admin/reviews/:id
      const deleteMatch = pathname.match(/^\/api\/admin\/reviews\/([^/]+)$/);
      if (deleteMatch && method === 'DELETE') {
        const id = deleteMatch[1];
        const existing = getReviewById(id);

        if (!existing) {
          return sendJson(res, 404, { success: false, error: 'Review not found' });
        }

        deleteReview(id);
        return sendJson(res, 200, {
          success: true,
          message: `Review #${id} permanently deleted from database`,
          id,
        });
      }

      // 8. ADMIN: PUT /api/admin/reviews/:id (update review)
      const updateMatch = pathname.match(/^\/api\/admin\/reviews\/([^/]+)$/);
      if (updateMatch && method === 'PUT') {
        const id = updateMatch[1];
        const existing = getReviewById(id);

        if (!existing) {
          return sendJson(res, 404, { success: false, error: 'Review not found' });
        }

        const body = await parseBody(req);
        const updated = updateReview(id, body);

        return sendJson(res, 200, {
          success: true,
          message: 'Review updated successfully',
          review: updated,
        });
      }
    }

    // Endpoint not found
    return sendJson(res, 404, { success: false, error: `API route ${method} ${pathname} not found` });
  } catch (err) {
    console.error('API Error:', err);
    return sendJson(res, 500, { success: false, error: err.message || 'Internal server error' });
  }
}
