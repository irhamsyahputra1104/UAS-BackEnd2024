// import Model News
import News from '../models/News.js';

// buat class NewsController
class NewsController {
  async index(req, res) {
    const news = await News.index();
    res.status(news.error ? 500 : 200).json(news);
  }

  async store(req, res) {
    const data = req.body;
    const news = await News.store(data);
    res.status(news.error ? 400 : 201).json(news);
  }

  async update(req, res) {
    const id = req.params.id;
    const data = req.body;
    const news = await News.update(id, data);
    res.status(news.error ? 400 : 200).json(news);
  }

  async destroy(req, res) {
    const id = req.params.id;
    const news = await News.delete(id); // Sebelumnya `News.destroy()`, harusnya `News.delete()`
    res.status(news.error ? 400 : 200).json(news);
  }

  async show(req, res) {
    const id = req.params.id;
    const news = await News.show(id);
    res.status(news.error ? 400 : 200).json(news);
  }

  async search(req, res) {
    const query = req.query.q; // Sebelumnya `req.query`, harusnya `req.query.q`
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }
    const news = await News.search(query);
    res.status(news.error ? 400 : 200).json(news);
  }

  async category(req, res) {
    const category = req.params.category;
    const news = await News.category(category);
    res.status(news.error ? 400 : 200).json(news);
  }
}

// membuat object NewsController
const object = new NewsController();

// export object NewsController
export default object;
