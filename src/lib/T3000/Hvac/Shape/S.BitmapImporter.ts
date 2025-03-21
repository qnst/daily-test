

import T3Gv from '../Data/T3Gv'
import T3Util from '../Util/T3Util';

/**
 * A utility class for importing and processing bitmap images with specified dimensions and resolution.
 * Handles different image formats including JPEG, PNG, SVG, and other formats.
 *
 * The class processes images differently based on their format:
 * - For JPEG/PNG: Reads the file as a data URL and stores metadata in T3Gv.opt
 * - For SVG and other formats: Converts the file to an object URL and passes it to the callback
 *
 * @example
 * // Create an instance of BitmapImporter
 * const importer = new BitmapImporter();
 *
 * // Import an image file with specified dimensions and resolution
 * importer.ImportBitmap(
 *   fileInput.files[0], // File object from an input element
 *   800, // Target width in pixels
 *   600, // Target height in pixels
 *   300, // Resolution in DPI
 *   (result, blob, byteArray) => {
 *     // Handle the imported image
 *     const imageElement = document.createElement('img');
 *     imageElement.src = result;
 *     document.body.appendChild(imageElement);
 *   }
 * );
 *
 * @remarks
 * The class stores import parameters in global settings via T3Gv.opt.
 */
class BitmapImporter {

  /**
   * Imports and processes a bitmap image file with specified dimensions and resolution
   * @param imageFile - The image file to import
   * @param targetWidth - The desired width of the imported image
   * @param targetHeight - The desired height of the imported image
   * @param resolution - The resolution in DPI (dots per inch)
   * @param onCompleteCallback - Function to call when import is complete
   */
  ImportBitmap(imageFile: File, targetWidth: number, targetHeight: number, resolution: number, onCompleteCallback: Function) {
    T3Util.Log("S.BitmapImporter - Input:", { imageFile, targetWidth, targetHeight, resolution });

    if (!imageFile || !onCompleteCallback || resolution <= 0) {
      return;
    }

    // Save import parameters to global settings
    T3Gv.opt.bitmapImportDestWidth = targetWidth;
    T3Gv.opt.bitmapImportDestHeight = targetHeight;
    T3Gv.opt.bitmapImportDPI = resolution;

    const imageType = imageFile.type;
    T3Gv.opt.bitmapImportMimeType = imageType;

    if (!(imageFile instanceof File)) {
      return;
    }

    // Handle JPEG/PNG files differently from SVG and other formats
    if (imageType === 'image/jpeg' || imageType === 'image/png') {
      T3Gv.opt.bitmapImportOriginalSize = imageFile.size;
      T3Gv.opt.scaledBitmapCallback = onCompleteCallback;

      const fileReader = new FileReader();
      fileReader.onload = function (event) {
        T3Gv.opt.bitmapImportEXIFdata = null;
        T3Gv.opt.bitmapImportFile = imageFile;
        T3Gv.opt.bitmapImportResult = event.target.result;
        T3Util.Log("S.BitmapImporter - Output (JPEG/PNG):", { result: event.target.result });
        // EXIF.getData(imageFile, GotEXIF);
      };
      fileReader.readAsDataURL(imageFile);
    } else {
      // Handle SVG and other file types
      const fileReader = new FileReader();
      fileReader.onload = function () {
        const blob = new Blob([this.result], { type: imageType });
        const byteArray = new Uint8Array(this.result as ArrayBuffer);
        const urlCreator = window.URL || window.webkitURL;

        if (urlCreator && urlCreator.createObjectURL) {
          const objectUrl = urlCreator.createObjectURL(blob);
          T3Util.Log(`S.BitmapImporter - Output (${imageType === 'image/svg+xml' ? 'SVG' : 'Other'}):`,
            { objectUrl, blob, byteArray });
          onCompleteCallback(objectUrl, blob, byteArray);
        }
      };
      fileReader.readAsArrayBuffer(imageFile);
    }
  }
}

export default BitmapImporter



