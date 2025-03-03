

import GlobalData from '../Data/GlobalData'
import Element from '../Basic/Basic.Element'

class BitmapImporter {

  ImportBitmap(file: File, destWidth: number, destHeight: number, dpi: number, callback: Function) {
    console.log("S.BitmapImporter - Input:", { file, destWidth, destHeight, dpi });

    let fileReader: FileReader;
    if (file && callback && dpi > 0) {
      GlobalData.optManager.bitmapImportDestWidth = destWidth;
      GlobalData.optManager.bitmapImportDestHeight = destHeight;
      GlobalData.optManager.bitmapImportDPI = dpi;
      const mimeType = file.type;
      GlobalData.optManager.bitmapImportMimeType = mimeType;

      if (file instanceof File) {
        if (mimeType === 'image/jpeg' || mimeType === 'image/png') {
          GlobalData.optManager.bitmapImportOriginalSize = file.size;
          GlobalData.optManager.scaledBitmapCallback = callback;
          fileReader = new FileReader();
          fileReader.onload = function (event) {
            GlobalData.optManager.bitmapImportEXIFdata = null;
            GlobalData.optManager.bitmapImportFile = file;
            GlobalData.optManager.bitmapImportResult = event.target.result;
            console.log("S.BitmapImporter - Output (JPEG/PNG):", { result: event.target.result });
            EXIF.getData(file, GotEXIF);
          };
          fileReader.readAsDataURL(file);

        } else if (mimeType === 'image/svg+xml') {
          fileReader = new FileReader();
          fileReader.onload = function () {
            const blob = new Blob([this.result], { type: mimeType });
            const byteArray = new Uint8Array(this.result as ArrayBuffer);
            const urlCreator = window.URL || window.webkitURL;
            let objectUrl = '';
            if (urlCreator && urlCreator.createObjectURL) {
              objectUrl = urlCreator.createObjectURL(blob);
              console.log("S.BitmapImporter - Output (SVG):", { objectUrl, blob, byteArray });
              callback(objectUrl, blob, byteArray);
            }
          };
          fileReader.readAsArrayBuffer(file);

        } else {
          fileReader = new FileReader();
          fileReader.onload = function () {
            const blob = new Blob([this.result], { type: mimeType });
            const byteArray = new Uint8Array(this.result as ArrayBuffer);
            const urlCreator = window.URL || window.webkitURL;
            let objectUrl = '';
            if (urlCreator && urlCreator.createObjectURL) {
              objectUrl = urlCreator.createObjectURL(blob);
              console.log("S.BitmapImporter - Output (Other):", { objectUrl, blob, byteArray });
              callback(objectUrl, blob, byteArray);
            }
          };
          fileReader.readAsArrayBuffer(file);
        }
      }
    }
  }

}

export default BitmapImporter



