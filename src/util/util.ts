import fs from 'fs';
import Jimp = require('jimp');

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      // ==== Code from Udacity ===
      console.log('🚀 ~ file: util.ts:16 ~ returnnewPromise ~ inputURL:', inputURL);
      const photo = await Jimp.read(inputURL);
      console.log('🚀 ~ file: util.ts:17 ~ returnnewPromise ~ photo:', photo);
      const outpath = '/tmp/filtered.' + Math.floor(Math.random() * 2000) + '.jpg';
      // === End code from Udacity ===

      // ---- This is Code for testing on Development ---
      // const outpath = '/tmp/filtered/' + inputURL + '.jpg';
      // const photo = await Jimp.read(outpath);
      // console.log('🚀 ~ file: util.ts:18 ~ returnnewPromise ~ outpath:', outpath);
      // --- End Code Testing ---
      await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname + outpath, (img) => {
          resolve(__dirname + outpath);
        });
    } catch (error) {
      console.log('🚀 ~ file: util.ts:27 ~ returnnewPromise ~ error:', error);
      reject(error);
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
