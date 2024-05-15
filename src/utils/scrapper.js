const puppeteer = require("puppeteer");
const fs = require("fs");

const listPortatiles = [];

const scrapper = async (url) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  repeatProcess(page);
};

const repeatProcess = async (page, browser) => {
  const arrayDivPortatil = await page.$$(".product-card");
  for (const portatilDiv of arrayDivPortatil) {
    let img = await portatilDiv.$eval("img", (el) => el.src);
    let title = await portatilDiv.$eval(".product-card__title", (el) => el.textContent);
    let price;
    //console.log(title);
    //console.log(img);
    try {
      price = await portatilDiv.$eval(".product-card__price-container", (el) => {
        const precios = el.querySelectorAll("span");
        for (const precio of precios) {
          const precioTexto = precio.innerText.trim();
          if (!isNaN(parseFloat(precioTexto))) {
            return precioTexto;
          };
        };
        return "Error en precio";
      });
      //console.log(price);
      const portatil = {
        img,
        title,
        price
      };
      listPortatiles.push(portatil);
    } catch (error) {
      console.log(error.message);
    };
  };

  try {
    await page.$eval("[aria-label='Página siguiente']", (el) => el.click());
    await page.waitForNavigation();
    repeatProcess(page, browser);
  } catch (error) {
    write(listPortatiles);
    await browser.close();
  };
};

const write = (listPortatiles) => {
  fs.writeFileSync("products.json", JSON.stringify(listPortatiles), () => {
    console.log("Escritura completada");
  });
}

module.exports = { scrapper };


