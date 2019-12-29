import { browser } from 'protractor';
import { mkdir, createWriteStream } from 'fs';

const screnshotsPath = __dirname.replace('tmp\\src\\utilities', 'results');

export const createTestAttachments = (title: string) => {
     return attachScreenshot(title.replace(/\s/g, '_'));
};

function writeScreenShot(data: string, title: string) {
     const path = `${screnshotsPath}\\${title}.png`;

     return new Promise(function (resolve, reject) {
          mkdir(screnshotsPath, { recursive: true }, (err) => {
               if (err) throw err;
          });

          const stream = createWriteStream(path, { flags: 'a+' });

          try {
               stream.write(Buffer.alloc(data.length, data, 'base64'));

               stream.on('finish', () => {
                    resolve(path);
               });
          } catch (e) {
               reject(e);
          } finally {
               stream.end();
          }
     });
}

async function attachScreenshot(title: string) {
     try {
          const png = await browser.takeScreenshot();

          return await writeScreenShot(png, title);
     }
     catch (e) {
          console.log(e);
     }
}