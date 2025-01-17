// import NewsController
import NewsController from '../controllers/NewsController.js';

// import express
import express from 'express'

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */
router.get('/', (req, res) => {
  res.send('Hello News API Express');
});

// Membuat routing news
router.get('/news', NewsController.index)
router.post('/news', NewsController.store)
router.put('/news/:id', NewsController.update)
router.delete('/news/:id', NewsController.destroy)
router.get('/news/:id', NewsController.show)
router.get('/news/search/:query', NewsController.search)
router.get('/news/category/:category', NewsController.category)

// export router
export default router;
