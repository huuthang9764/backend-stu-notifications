const express = require('express');
const cors = require('cors');
const fetchHTML = require('./src/util/fetchHTML');
const scrapeFeaturedNews = require('./src/scrapers/scrapeFeaturedNews');
const scrapeNotificationsPage = require('./src/scrapers/scrapeNotificationsPage');

const app = express();
const PORT = 5000;

app.use(cors()); // Cho phép mọi nguồn truy cập (hoặc giới hạn theo domain)
app.use(express.json());

// Route 1: Lấy dữ liệu từ `http://stu.edu.vn`
app.get('/api/featured-news', async (req, res) => {
    const url = 'http://stu.edu.vn';
    try {
        const html = await fetchHTML(url);
        const data = scrapeFeaturedNews(html);
        res.json({ status: 'success', data });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Route 2: Lấy dữ liệu từ `https://stu.edu.vn/vi/:pageId/thong-bao.html`
app.get('/api/notifications/:pageId', async (req, res) => {
    const { pageId } = req.params;
    const url = `https://stu.edu.vn/vi/${pageId}/thong-bao.html`;
    try {
        const html = await fetchHTML(url);
        const data = scrapeNotificationsPage(html);
        res.json({ status: 'success', data });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
