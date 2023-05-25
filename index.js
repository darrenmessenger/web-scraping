const axios = require('axios')
const cheerio = require('cheerio')

const urlArray = ['https://www.airbnb.co.uk/',
                'https://www.airbnb.co.uk/rooms/20669368?source_impression_id=p3_1685001582_eLTZWe%2FB%2BZ5p30MW',
                'https://www.airbnb.co.uk/rooms/50633275?source_impression_id=p3_1685001619_3%2BwdAKnfH7C%2BAJVC'];

const getData = async (url) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const dataArray = [];

        // find each title and retrieve the text
        $('title').each((index,el) => {
            title = $(el).text();

            dataArray.push({title});
        })

        return dataArray;
        
    } catch (err) {
        console.error(err);
    }
}

// Loop through each url and retrieve some data.
urlArray.forEach( (url) => {
    getData(url).then(dataArray => console.log('dataArray: ', dataArray));
});
