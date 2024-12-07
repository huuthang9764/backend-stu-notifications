const cheerio = require('cheerio');

const scrapeNotificationsPage = (html) => {
    const $ = cheerio.load(html);
    const notifications = [];

    // Duyệt qua các thẻ <li> bên trong <div class="blog-post">
    $('div.blog-post ul li').each((_, element) => {
        const title = $(element).find('a').text().trim(); // Lấy tiêu đề từ thẻ <a>
        const link = $(element).find('a').attr('href');  // Lấy link từ thuộc tính href
        const publishDate = $(element).find('span').text().trim(); // Lấy ngày tháng nếu có trong <span>

        // Thêm thông báo vào mảng nếu có tiêu đề và link
        if (title && link) {
            notifications.push({
                title,
                link,
                publishDate: publishDate || 'N/A', // Gán 'N/A' nếu không có ngày tháng
            });
        }
    });

    return notifications;
};

module.exports = scrapeNotificationsPage;
