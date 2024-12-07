const axios = require('axios');

const fetchHTML = async (url) => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.error('Error fetching HTML:', error.message);
        throw new Error('Cannot fetch the HTML');
    }
};

module.exports = fetchHTML;
