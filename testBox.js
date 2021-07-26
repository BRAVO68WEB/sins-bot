// const { API, } = require('nhentai-api');
// const log = console.log;

// const api = new API();

// api.getBook(331538).then(book => {
// 	var cover = api.getImageURL(book.cover);
//     api.getImageURL(book.pages[1]);
//     log(cover);
// });

// const { NHentai, NHentaiSort } = require('nhentai.js-api');

// const api = new NHentai();

// const doIt = async () => {
//     const results = await api.search('Teri Terio] Yukinya!', NHentaiSort.all_time);
//     if (results.total > 0) {
//         // 25 hentai max
//         for (const hentai of results.hentai) {
//             // console.log(
//             //     hentai.title,
//             //     hentai.id,
//             //     hentai.url,
//             //     hentai.cover,
//             //     hentai.language
//             // );
//             if (hentai.language === 'english') {
//                 const fullHentai = await hentai.fetch();
//                 console.log(fullHentai.images);
//             }
//         }
    
//         // next page
//         await results.next();
//     }
// }
// doIt()

// const DouAPI = require("dou-api");
// const dou = new DouAPI();

// Get gallery from book ID or book link
// dou.g("14045").then((g) => {
//   console.log(g);
// });

// dou.popular().then((pop) => {
//     console.log(pop);
// });
// dou.search(keyword["catgirl", 1, today]).then((search) => {
//     console.log(search);
// })

const nhentai = require('nhentai-node-api')

nhentai.search('Cat', 'popular-week', 1)
  .then(results => {
    console.log(results);
  })
  .catch(err => console.log(err))