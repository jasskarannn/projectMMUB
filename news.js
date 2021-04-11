// pre requisites
require("chromedriver");
let fs = require('fs');
let wd = require("selenium-webdriver");
let chrome = require("selenium-webdriver/chrome");
let browser = new wd.Builder().forBrowser('chrome').build();

// variables and inputs from users
let usrInput = 'iphone 12 pro max';
let usrInput2 = 'redmi note 9';
let eid = 'mikeamg1104@rediffmail.com';
let passkey = '@Webdriver11';
let rcvrid = 'singhjasskaran@gmail.com';
let sub = 'Amazon Tracker Automation';
let maintxt = 'Hi Jasskaran, I did the automated search for you. Took the price and the screenshots.';
let productInfo = [];
let productInfo2 = [];


async function main(){

    //part 1 ie first search
    await browser.get('https://www.amazon.in/');
    await browser.findElement(wd.By.id('twotabsearchtextbox')).sendKeys(usrInput); 
    await browser.findElement(wd.By.id('nav-search-submit-button')).click();

    // shows only the products with maximum stars and reviews
    await browser.findElement(wd.By.id('p_72/1318476031')).click();
    await browser.wait(wd.until.elementLocated(wd.By.css(".a-size-medium.a-color-base.a-text-normal")));
    
    browser.takeScreenshot().then(
        function(data) {
            fs.writeFileSync('img1.png', data, 'base64');
        });
    
    //scrolls till bottom 
    browser.executeScript("window.scrollBy(0, document.body.scrollHeight)");

    //objects created for storing the required information
    let itemNames = await browser.findElements(wd.By.css('.a-size-medium.a-color-base.a-text-normal'));
    let itemPrices = await browser.findElements(wd.By.css('.a-price-whole'));
    
    // top 10 items are stored
    for(let i = 0; i < 10; i++){
        let tempObj = {};
        let tempname = await itemNames[i].getAttribute("innerText");
        let tempprice = await itemPrices[i].getAttribute("innerText");
        tempObj['productName']= tempname;
        tempObj['productPrice'] = tempprice;
        productInfo.push(tempObj);
    }
    console.log(productInfo);

    let finalObject = {};
    finalObject['Info'] = productInfo;
    fs.writeFileSync('Prices.json', JSON.stringify(finalObject), "utf-8");

    // part2 ie second search

    await browser.get('https://www.amazon.in/');
    await browser.findElement(wd.By.id('twotabsearchtextbox')).sendKeys(usrInput2);
    await browser.findElement(wd.By.id('nav-search-submit-button')).click();

    // shows only the products with maximum stars and reviews
    await browser.findElement(wd.By.id('p_72/1318476031')).click();
    await browser.wait(wd.until.elementLocated(wd.By.css(".a-size-medium.a-color-base.a-text-normal")));
    let itemNames2 = await browser.findElements(wd.By.css('.a-size-medium.a-color-base.a-text-normal'));

    browser.takeScreenshot().then(
        function(data) {
            fs.writeFileSync('img2.png', data, 'base64');
        });
    

    browser.executeScript("window.scrollBy(0, document.body.scrollHeight)");
    let itemPrices2 = await browser.findElements(wd.By.css('.a-price-whole'));
    
    // top 10 items are stored
    for(let i = 0; i < 10; i++){
        let tempObj2 = {};
        let tempname2 = await itemNames2[i].getAttribute("innerText");
        let tempprice2 = await itemPrices2[i].getAttribute("innerText");
        tempObj2['productName']= tempname2;
        tempObj2['productPrice'] = tempprice2;
        productInfo2.push(tempObj2);
    }
    console.log(productInfo2);

    let finalObject2 = {};
    finalObject2['EntryLevelInfo'] = productInfo2;
    fs.writeFileSync('Prices2.json', JSON.stringify(finalObject2), "utf-8");

   // rediff mail process login id and password field fill
    
    await browser.get('https://mail.rediff.com/cgi-bin/login.cgi');
    await browser.wait(wd.until.elementLocated(wd.By.id("login1")));
    await browser.findElement(wd.By.id('login1')).sendKeys(eid);

    await browser.wait(wd.until.elementLocated(wd.By.id("password")));
    await browser.findElement(wd.By.id('password')).sendKeys(passkey);

    await browser.findElement(wd.By.css('.signinbtn')).click();
    

    // compose rediff mail

    await browser.findElement(wd.By.css('.rd_write')).click();

    // reciever id content
    await browser.wait(wd.until.elementLocated(wd.By.id("TO_IDcmp2")));
    await browser.findElement(wd.By.id('TO_IDcmp2')).click();
    await browser.findElement(wd.By.id('TO_IDcmp2')).sendKeys(rcvrid);
    await browser.findElement(wd.By.id('TO_IDcmp2')).sendKeys(wd.Key.ENTER);

    //subject content
    await browser.wait(wd.until.elementLocated(wd.By.css(".rd_inp_sub.rd_subject_datacmp2")));
    await browser.findElement(wd.By.css('.rd_inp_sub.rd_subject_datacmp2')).click();
    await browser.findElement(wd.By.css('.rd_inp_sub.rd_subject_datacmp2')).sendKeys(sub);

    //main body content
    await browser.wait(wd.until.elementLocated(wd.By.css(".cke_wysiwyg_frame.cke_reset")));
    await browser.findElement(wd.By.css('.cke_wysiwyg_frame.cke_reset')).click();
    await browser.findElement(wd.By.css('.cke_wysiwyg_frame.cke_reset')).sendKeys(maintxt);
    
    // send button
    await browser.wait(wd.until.elementLocated(wd.By.css(".send_ng_compo.rd_btn_cmp_send")));
    await browser.findElement(wd.By.css('.send_ng_compo.rd_btn_cmp_send')).click();


}

main();
