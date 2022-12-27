const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { getCook_, updateHref } = require('./database');

var request = require('request');


function download(uri, filename) {
    return new Promise((resolve, reject) => {
        request.head(uri, function (err, res, body) {
            request(uri).pipe(fs.createWriteStream(filename)).on('close', resolve);
        });
    });
}

const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        (resolve())
    }, 15000)
})

; (async () => {
    console.log(process.argv[2])
    const trues = await getCook_(process.argv[2])
    trues.forEach(async el => {
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.goto(el.href, {   waitUntil: 'networkidle2' });
        
        const urlName = await page.evaluate(() => {
            const url = document.querySelector('.superimg').querySelector('img').src
            return url
        })

        
        const arrax = el.title.replace('{', ' ').replace('}', ' ').split(',').slice(0, 3).join()
        
        let str = arrax.replace('","', "_")
        str = str.replace('","', '_')
        str = str.replace(/\s/g, '')
        console.log(str)
        await p;
    
        page.on('response', async (response) => {
            const matches = /.*\.(jpg|png|svg|gif)$/.exec(response.url());
            if (matches && (matches.length === 2)) {
              const extension = matches[1];
              const buffer = await response.buffer();
              fs.writeFileSync(`${str}.${extension}`, buffer, 'base64');
            }
          });
        await page.goto(urlName, {  waitUntil: 'networkidle2' })
        // await browser.close()
        await p;
        await browser.close()
    })
})()
