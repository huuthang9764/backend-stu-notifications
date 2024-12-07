const cheerio = require('cheerio');

const scrapeFeaturedNews = (html) => {
    const $ = cheerio.load(html);
    const featuredNews = [];

    $('.featuredNewsContainer .list-group li div').each((_, element) => {
        const title = $(element).find('a').text().trim();
        const link = $(element).find('a').attr('href');
        const publishDate = $(element).find('.publish-date').text().trim();
        const isNew = $(element).find('.badge-danger').length > 0;

        if (title && link) {
            featuredNews.push({
                title,
                link,
                publishDate,
                isNew,
            });
        }
    });

    return featuredNews;
};

module.exports = scrapeFeaturedNews;
