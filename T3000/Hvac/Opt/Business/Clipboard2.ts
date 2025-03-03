
import GlobalData from '../../Data/GlobalData'
import $ from 'jquery'
import ListManager from '../../Data/ListManager'

import ConstantData from '../../Data/ConstantData'


class Clipboard2 {

  static isMobile: boolean;
  static isGestureCapable: boolean;
  static isMac: boolean;
  static isSafari: boolean;
  static isIe: boolean;
  static isFF: boolean;
  static isIOS: boolean;
  static IEclipboardDiv: JQuery<HTMLElement>;
  static clipboardInput: JQuery<HTMLElement>;
  static SDCloudInstance: number;
  static LastCutCopy: number;

  static Init(e) {

    const userAgent = navigator.userAgent.toLowerCase();
    const appVersion = navigator.appVersion;

    Clipboard.isMobile = /mobile|ip(ad|hone|od)|android|silk/i.test(userAgent);
    Clipboard.isGestureCapable = "ontouchstart" in window || ("onpointerdown" in window && navigator.maxTouchPoints > 1);
    Clipboard.isMac = /(mac os x)/i.test(userAgent) && !Clipboard.isMobile;
    Clipboard.isSafari = appVersion.includes("Safari") && !appVersion.includes("Chrome") && !appVersion.includes("CrMo") && !appVersion.includes("CriOS");
    Clipboard.isIe = userAgent.includes("msie") || userAgent.includes("trident");
    Clipboard.isFF = userAgent.includes("firefox");
    Clipboard.isIOS = /ip(ad|hone|od)/i.test(userAgent);
    Clipboard.IEclipboardDiv = $("#_IEclipboardDiv");
    Clipboard.clipboardInput = $("#_clipboardInput");

    if (Clipboard.isMac && Clipboard.isGestureCapable) {
      Clipboard.isMobile = true;
      Clipboard.isSafari = true;
      Clipboard.isIOS = true;
    }

    if (Clipboard.isMobile) {
      Clipboard.clipboardInput.attr("readonly", "readonly");
      const crossTabClipboardDiv = $("#_crossTabClipboardDiv");
      crossTabClipboardDiv.css({ left: "-100px", top: "-100px" });
    }

    Clipboard.SDCloudInstance = Math.random();
    Clipboard.LastCutCopy = -1;

    if (Clipboard.isIe || Clipboard.isFF) {
      document.addEventListener("beforepaste", () => {
        Clipboard.FocusOnIEclipboardDiv();
      });
    }

    ["cut", "copy", "paste"].forEach((eventType) => {
      document.addEventListener(eventType, (event) => {
        if (!GlobalData.docHandler.IsReadOnly()) {
          if (!GlobalData.optManager.isMobilePlatform) {
            const isClipboardInputFocused = $("#_clipboardInput:focus,#_IEclipboardDiv:focus,#SDTS_TouchProxy:focus").length > 0;
            if ((eventType === "cut" || eventType === "copy") && !isClipboardInputFocused) return;
            if (eventType === "paste" && ($("input:focus").length > 0 || $("textarea:focus").length > 0) && !isClipboardInputFocused) return;
          }

          let clipboardData;
          if (event.clipboardData) {
            clipboardData = event.clipboardData;
          } else if (event.originalEvent && event.originalEvent.clipboardData) {
            clipboardData = event.originalEvent.clipboardData;
          } else if (window.clipboardData) {
            clipboardData = window.clipboardData;
          }

          const isTouchProxyFocused = $("#SDTS_TouchProxy:focus").length > 0;

          if (eventType === "cut" || eventType === "copy") {
            const isEmptyClipboard = !Clipboard.GetCutCopyText();
            const canUseAsyncClipboard = Clipboard.CanUseAsyncClipboard();
            if (canUseAsyncClipboard && isEmptyClipboard) {
              Clipboard.GenerateImageInfo().then((imageInfo) => {
                Clipboard.DoCutCopy(event, eventType, canUseAsyncClipboard, clipboardData, imageInfo);
              });
            } else {
              Clipboard.DoCutCopy(event, eventType, canUseAsyncClipboard, clipboardData);
            }
          }

          if (eventType === "paste") {
            Clipboard.PasteFromSystemEvent(clipboardData);
          }

          if (isTouchProxyFocused) {
            event.preventDefault();
          }
        }
      })
    })
  }

  static CanUseAsyncClipboard() {
    return !(Clipboard.isIe || Clipboard.isFF || Clipboard.isSafari) && (!SDUI.AppSettings.Embedded && !SDUI.AppSettings.IsAtlassianConnectorApp())
  }

  static DoCutCopy(event, eventType, canUseAsyncClipboard, clipboardData, imageInfo) {
    // Set the HTML clipboard content
    GlobalData.optManager.theHtmlClipboard = Clipboard.GetCutCopyHTML();

    // Handle cut and copy operations
    if (eventType === "cut") {
      GlobalData.optManager.CutObjects(true);
    } else if (eventType === "copy") {
      GlobalData.optManager.CopyObjects(true);
    }

    // Update the last cut/copy timestamp
    Clipboard.LastCutCopy = new Date().getTime();

    // Handle async clipboard API
    if (canUseAsyncClipboard) {
      if (!Clipboard.ValidateAsyncClipboardApi()) return;

      // Request clipboard write permission
      if (navigator && navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({ name: "clipboard-write" }).then(() => { });
      }

      // Get plain text clipboard content
      const textContent = Clipboard.GetCutCopyText();
      if (textContent) {
        // Create clipboard items for text and HTML
        const clipboardItems = {
          "text/plain": new Blob([textContent], { type: "text/plain" }),
          "text/html": new Blob([Clipboard.GetCutCopyHTML()], { type: "text/html" })
        };
        const clipboardItem = new ClipboardItem(clipboardItems);
        navigator.clipboard.write([clipboardItem]);
        Clipboard.FocusOnClipboardInput();
      } else if (imageInfo) {
        // Create clipboard items for image and HTML
        const imageHtml = `<img src="${imageInfo.base64ImageData}"/>`;
        const clipboardItems = {
          "image/png": imageInfo.imageBlob,
          "text/html": new Blob([Clipboard.GetCutCopyHTML(imageHtml)], { type: "text/html" })
        };
        const clipboardItem = new ClipboardItem(clipboardItems);
        navigator.clipboard.write([clipboardItem]);
      }
      event.preventDefault();
    } else {
      // Handle IE clipboard
      if (Clipboard.isIe) {
        clipboardData.setData("Text", Clipboard.GetCutCopyText());
        Clipboard.IEclipboardDiv.html(Clipboard.GetCutCopyHTML());
        Clipboard.FocusOnIEclipboardDiv();
        setTimeout(() => {
          Clipboard.FocusOnClipboardInput();
          Clipboard.IEclipboardDiv.empty();
        }, 0);
        return;
      }


      // Set clipboard data for text and HTML
      clipboardData.setData("text/plain", Clipboard.GetCutCopyText());
      clipboardData.setData("text/html", Clipboard.GetCutCopyHTML());
      event.preventDefault();
    }
  }

  static GenerateImageInfo() {
    const imageInfo = {};
    const selectedObject = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, false);

    if (selectedObject && selectedObject.length !== 0) {
      return new Promise((resolve) => {
        GlobalData.optManager.GeneratePreviewPNG(selectedObject, Infinity, Infinity, {
          zList: selectedObject,
          fillBackground: true
        }).then((imageBlob) => {
          imageInfo.imageBlob = imageBlob;
          const reader = new FileReader();
          reader.readAsDataURL(imageBlob);
          reader.onloadend = () => {
            imageInfo.base64ImageData = reader.result;
            resolve(imageInfo);
          };
        }).catch(() => {
          resolve(null);
        });
      });
    } else {
      return Promise.resolve(null);
    }
  }

  static ValidateAsyncClipboardApi() {
    return !!navigator.clipboard
  }

  static PlainTextToSDObj(e) {
    if (typeof e !== 'string' || e === null || e.length === 0) {
      return e;
    }
    return {
      text: e,
      charStyles: [],
      hyperlinks: [],
      paraInfo: [],
      styles: [],
      vAlign: 'middle'
    };
  }

  static PasteFromSystemEvent(e) {
    const handlers = [
      { matches: Clipboard.isIe, handler: Clipboard.PasteIE },
      { matches: Clipboard.isFF, handler: Clipboard.PasteFF },
      { matches: Clipboard.isSafari, handler: Clipboard.PasteSafari },
      { matches: true, handler: Clipboard.PasteChrome }
    ];

    Clipboard.ClearInteralClipboard();
    const handler = handlers.find(h => h.matches).handler;
    handler(e);
  }

  static PasteFF(e) {
    GlobalData.optManager.theTextClipboard = Clipboard.PlainTextToSDObj(e.getData('Text'));
    const htmlData = e.getData('text/html');
    if (htmlData) {
      GlobalData.optManager.theHtmlClipboard = htmlData;
    }
    Clipboard.FocusOnIEclipboardDiv();
    setTimeout(() => {
      const htmlContent = Clipboard.IEclipboardDiv.html();
      if (htmlContent.match(/<img src=['"]data/gi)) {
        const imgSrc = $(Clipboard.IEclipboardDiv[0].childNodes[0]).attr('src');
        const [mimeType, base64Data] = imgSrc.split(',');
        const type = mimeType.split(':')[1].split(';')[0];
        const binaryData = atob(base64Data);
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uintArray = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
          uintArray[i] = binaryData.charCodeAt(i);
        }
        GlobalData.optManager.theImageClipboard = new Blob([uintArray], { type });
      }
      Clipboard.Paste();
      Clipboard.IEclipboardDiv.empty();
      Clipboard.FocusOnClipboardInput();
    }, 0);
  }

  static PasteSafari(e) {
    return Clipboard.PasteChrome(e)
  }

  static PasteIE(e) {
    // Convert plain text data to SD object and assign to the clipboard
    GlobalData.optManager.theTextClipboard = Clipboard.PlainTextToSDObj(e.getData('Text'));

    // Iterate through files and assign image files to the clipboard
    const files = e.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.startsWith('image')) {
        GlobalData.optManager.theImageClipboard = files[i].slice(0, files[i].size - 1);
      }
    }

    // Clear the IE clipboard div and set a timeout to handle the paste operation
    Clipboard.IEclipboardDiv.empty();
    setTimeout(() => {
      GlobalData.optManager.theHtmlClipboard = Clipboard.IEclipboardDiv.html();
      Clipboard.Paste();
      Clipboard.IEclipboardDiv.empty();
      Clipboard.FocusOnClipboardInput();
    }, 0);
  }

  static PasteChrome(e) {
    if (e.types && e.types.length > 0) {
      Array.prototype.forEach.call(e.types, (type, index) => {
        if (type.match(/image.*/)) {
          GlobalData.optManager.theImageClipboard = e.items[index].getAsFile();
        } else if (type.match(/text\/plain/)) {
          e.items[index].getAsString((text) => {
            GlobalData.optManager.theTextClipboard = Clipboard.PlainTextToSDObj(text);
          });
        } else if (type.match(/text\/html/)) {
          e.items[index].getAsString((html) => {
            GlobalData.optManager.theHtmlClipboard = html;
          });
        }
      });
    }
    setTimeout(Clipboard.Paste, GlobalData.optManager.isMac ? 500 : 10);
  }

  static ClearInteralClipboard() {
    GlobalData.optManager.theTextClipboard = null;
    GlobalData.optManager.theHtmlClipboard = null;
    GlobalData.optManager.theImageClipboard = null;
  }

  static PasteFromUIaction() {
    /*
    if (Clipboard.isMobile) return void gListManager.PasteObjects();
    if (Clipboard.IsSameSystemPaste()) return void gListManager.PasteObjects();
    Clipboard.ClearInteralClipboard(),
      Clipboard.PasteUsingAsynchClipboardAPI((() => {
      }), (e => {
      }))
    */

    //debugger

    // GlobalData.optManager.PasteObjects();
    // return;

    if (Clipboard.isMobile) {
      GlobalData.optManager.PasteObjects();
      return;
    }

    if (Clipboard.IsSameSystemPaste()) {
      GlobalData.optManager.PasteObjects();
      return;
    }

    Clipboard.ClearInteralClipboard();
    Clipboard.PasteUsingAsynchClipboardAPI(
      () => { },
      (e) => {
        throw e
      }
    );
  }

  static PasteUsingAsynchClipboardAPI(successCallback, errorCallback) {
    if (Clipboard.isFF || Clipboard.isSafari) {
      // const message = GlobalData.optManager.isMac ? 'Use Command-V to paste this information' : 'Use ctrl+v to paste this information';
      // Commands.MainController.ActiveSessionController.UpdateAlertModal(message, 1);
      return false;
    }
    return Clipboard.PasteUsingAsynchClipboardAPIDoPaste(successCallback, errorCallback);
  }

  static PasteUsingAsynchClipboardAPIDoPaste(e, t) {
    const a = [{
      typeRegex: /text\/html/,
      handler: function (e) {
        return e.text().then((e => (GlobalData.optManager.theHtmlClipboard = e,
          !0)))
      }
    }, {
      typeRegex: /text\/plain/,
      handler: function (e) {
        return e.text().then((e => (GlobalData.optManager.theTextClipboard = Clipboard.PlainTextToSDObj(e),
          !0)))
      }
    }, {
      typeRegex: /image.*/,
      handler: function (e) {
        return GlobalData.optManager.theImageClipboard = e,
          !0
      }
    }];
    if (Clipboard.ValidateAsyncClipboardApi()) {


      return navigator.clipboard.read().then((clipboardItems) => {

        console.log('read from clipboardItems', clipboardItems);
        //NotAllowedError: Failed to execute 'read' on 'Clipboard': Document is not focused

        const promises = [];

        for (const item of clipboardItems) {
          for (const type of item.types) {
            const handlerPromise = item.getType(type).then((clipboardItem) => {
              const handler = a.find((h) => type.match(h.typeRegex));
              if (handler) {
                return handler.handler(clipboardItem);
              } else {
                throw new Error(`PasteUsingAsynchClipboardAPIDoPaste: could not find handler for type ${type}`);
              }
            }).catch((error) => t(error));

            promises.push(handlerPromise);
          }
        }

        return Promise.all(promises);
      }).then(() => {
        setTimeout(Clipboard.Paste, 1);
        e(true);
      }).catch((error) => t(error));
    }
  }

  // static PasteUsingAsynchClipboardAPIDoPaste(successCallback, errorCallback) {
  //   const handlers = [
  //     {
  //       typeRegex: /text\/html/,
  //       handler: async (item) => {
  //         const text = item.text().then((text) => text);
  //         GlobalData.optManager.theHtmlClipboard = text;
  //         return true;
  //       }
  //     },
  //     {
  //       typeRegex: /text\/plain/,
  //       handler: async (item) => {
  //         const text = item.text().then((text) => text);
  //         GlobalData.optManager.theTextClipboard = Clipboard.PlainTextToSDObj(text);
  //         return true;
  //       }
  //     },
  //     {
  //       typeRegex: /image.*/,
  //       handler: async (item) => {
  //         GlobalData.optManager.theImageClipboard = item;
  //         return true;
  //       }
  //     }
  //   ];

  //   if (Clipboard.ValidateAsyncClipboardApi()) {
  //     try {
  //       const clipboardItems = navigator.clipboard.read().then((items) => items);
  //       const promises = clipboardItems.flatMap(item =>
  //         item.types.map(async type => {
  //           try {
  //             const clipboardItem = await item.getType(type);
  //             const handler = handlers.find(h => type.match(h.typeRegex));
  //             if (handler) {
  //               return handler.handler(clipboardItem);
  //             } else {
  //               throw new Error(`PasteUsingAsynchClipboardAPIDoPaste: could not find handler for type ${type}`);
  //             }
  //           } catch (error) {
  //             errorCallback(error);
  //           }
  //         })
  //       );
  //       Promise.all(promises).then(() => { });
  //       setTimeout(Clipboard.Paste, 1);
  //       successCallback(true);
  //     } catch (error) {
  //       errorCallback(error);
  //     }
  //   }
  // }

  static FocusOnClipboardInput() {
    if (SDUI.Commands.MainController.Modals.ModalsVisible()) return;
    if (
      SDUI.Commands.MainController.DataPanel &&
      SDUI.Commands.MainController.DataPanel.InDataUpdate()
    ) return;
    const noInputFocused = $('input:focus').length <= 0;
    const noSelectFocused = $('select:focus').length <= 0;
    const noTextareaFocused = $('textarea:focus').length <= 0;
    const isMobilePlatform = gListManager.isMobilePlatform;

    if ((noInputFocused && noSelectFocused && noTextareaFocused) || isMobilePlatform) {
      Clipboard.clipboardInput.val(' ');
      Clipboard.clipboardInput.focus().select();
    }
  }

  static FocusOnIEclipboardDiv() {
    const isMobile = /mobile|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent);
    const modalsVisible = SDUI.Commands.MainController.Modals.ModalsVisible();

    if (!isMobile && !modalsVisible) {
      Clipboard.IEclipboardDiv.focus();
      const range = document.createRange();
      range.selectNodeContents(Clipboard.IEclipboardDiv.get(0));
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  static OnIECBEvent(e, t) {
    const clipboardData = window.clipboardData;

    if (e === 'cut' || e === 'copy') {
      clipboardData.setData('Text', Clipboard.GetCutCopyText());
      Clipboard.IEclipboardDiv.html(Clipboard.GetCutCopyHTML());
      Clipboard.FocusOnIEclipboardDiv();
      setTimeout(() => {
        Clipboard.FocusOnClipboardInput();
        Clipboard.IEclipboardDiv.empty();
      }, 0);
    }

    if (e === 'paste') {
      const textData = clipboardData.getData('Text');
      Clipboard.IEclipboardDiv.empty();
      setTimeout(() => {
        const htmlData = Clipboard.IEclipboardDiv.html();
        Clipboard.Paste(textData, htmlData, GlobalData.optManager.theImageClipboard);
        Clipboard.IEclipboardDiv.empty();
        Clipboard.FocusOnClipboardInput();
      }, 0);
    }
  }

  static OnCBEvent(eventType, event) {
    const clipboardData = event.originalEvent.clipboardData;

    if (eventType === 'cut' || eventType === 'copy') {
      clipboardData.setData('text/plain', Clipboard.GetCutCopyText());
      clipboardData.setData('text/html', Clipboard.GetCutCopyHTML());
    }

    if (eventType === 'paste') {
      const textData = clipboardData.getData('text/plain');
      const htmlData = clipboardData.getData('text/html');
      Clipboard.Paste(textData, htmlData, null);
    }
  }

  static Paste() {
    const isMobile = /mobile|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent);
    const htmlObject = Clipboard.GetHTMLAsObject(GlobalData.optManager.theHtmlClipboard);
    let header = null;

    if (htmlObject) {
      header = Clipboard.GetHeaderFromHTML(htmlObject);
    }

    // if (!htmlObject && GlobalData.optManager.theHtmlClipboard && SDUI.Commands.MainController.JSNFImport && SDUI.Commands.MainController.JSNFImport.HandleJSNFClipboardData(GlobalData.optManager.theHtmlClipboard)) {
    //   return;
    // }

    if (!header) {
      Clipboard.LastCutCopy = -1;
      if (GlobalData.optManager.theImageClipboard && GlobalData.optManager.theImageClipboard.size > 0) {
        GlobalData.optManager.theContentHeader.ClipboardType = ConstantData.ClipboardType.Image;
      } else {
        GlobalData.optManager.theContentHeader.ClipboardType = ConstantData.ClipboardType.Text;
      }
      GlobalData.optManager.theContentHeader.ClipboardBuffer = null;
      GlobalData.optManager.PasteObjects();
      return;
    }

    if (header.sdcloudInstance !== Clipboard.SDCloudInstance) {
      const data = Clipboard.DecodeDataFromHTML(htmlObject, header.clipboardType === ConstantData.ClipboardType.LM);
      GlobalData.optManager.theContentHeader.ClipboardType = header.clipboardType;

      if (header.clipboardType === ConstantData.ClipboardType.Text) {
        GlobalData.optManager.theTextClipboard = Clipboard.PlainTextToSDObj(data);
        GlobalData.optManager.theContentHeader.ClipboardBuffer = null;
      } else if (header.clipboardType === ConstantData.ClipboardType.Table) {
        GlobalData.optManager.theTextClipboard = null;
        GlobalData.optManager.theContentHeader.ClipboardBuffer = data;
      } else if (header.clipboardType === ConstantData.ClipboardType.LM) {
        GlobalData.optManager.theTextClipboard = null;
        GlobalData.optManager.theContentHeader.ClipboardBuffer = data;
      }

      GlobalData.optManager.PasteObjects();
      return;
    }

    GlobalData.optManager.PasteObjects();
  }

  static GetCutCopyText() {
    if (/mobile|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent)) {
      return '';
    }

    if (gListManager.theContentHeader.ClipboardType !== ConstantData.ClipboardType.Text || !gListManager.theTextClipboard) {
      return '';
    }

    return gListManager.theTextClipboard.text || '';
  }

  static GetCutCopyHTML(e) {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /mobile|ip(ad|hone|od)|android|silk/i.test(userAgent);
    let clipboardContent = '';

    if (gListManager.theContentHeader.ClipboardType === ConstantData.ClipboardType.Text && gListManager.theTextClipboard) {
      clipboardContent += gListManager.theTextClipboard ? gListManager.theTextClipboard.text : '';
    }

    const clipboardMetadata = {
      clipboardType: gListManager.theContentHeader.ClipboardType,
      sdcloudInstance: Clipboard.SDCloudInstance,
      timestamp: Clipboard.LastCutCopy
    };

    if (e) {
      clipboardContent += `<div>${e}</div>`;
    }

    clipboardContent += '<div id="SDCloudData" style="display:none">';
    clipboardContent += `<sdclouddata header='${btoa(JSON.stringify(clipboardMetadata))}' data='`;

    if (gListManager.theContentHeader.ClipboardType === ConstantData.ClipboardType.Text) {
      const textClipboardData = JSON.stringify(gListManager.theTextClipboard);
      const textClipboardBytes = new Uint8Array(textClipboardData.length);
      for (let i = 0; i < textClipboardData.length; i++) {
        textClipboardBytes[i] = textClipboardData.charCodeAt(i);
      }
      clipboardContent += base64js.fromByteArray(textClipboardBytes);
    }

    if (gListManager.theContentHeader.ClipboardType === ConstantData.ClipboardType.LM) {
      const lmClipboardBytes = new Uint8Array(gListManager.theContentHeader.ClipboardBuffer);
      clipboardContent += base64js.fromByteArray(lmClipboardBytes);
    }

    if (gListManager.theContentHeader.ClipboardType === ConstantData.ClipboardType.Table) {
      const tableClipboardData = JSON.stringify(gListManager.theContentHeader.ClipboardBuffer);
      const tableClipboardBytes = new Uint8Array(tableClipboardData.length);
      for (let i = 0; i < tableClipboardData.length; i++) {
        tableClipboardBytes[i] = tableClipboardData.charCodeAt(i);
      }
      clipboardContent += base64js.fromByteArray(tableClipboardBytes);
    }

    clipboardContent += "'/></div>";
    return clipboardContent;
  }

  static GetHTMLAsObject(htmlString: string): JQuery<HTMLElement> | null {
    const regex = /<div id=['"]SDCloudData['"](.*?)>(.*?)<\/div>/gi;
    const match = regex.exec(htmlString);

    if (!match || match.length <= 0) {
      return null;
    }

    const cleanedHtml = match[0].replace('<!--', '').replace('-->', '');
    return $('<html><body>' + cleanedHtml + '</body></html>');
  }

  static GetHeaderFromHTML(htmlObject: JQuery<HTMLElement>) {
    if (!htmlObject) return null;
    const headerAttr = htmlObject.find('sdclouddata').attr('header');
    if (!headerAttr) return null;
    return JSON.parse(atob(headerAttr));
  }

  static DecodeDataFromHTML(htmlObject, isBuffer) {
    if (!htmlObject) return null;

    const dataAttr = htmlObject.find('sdclouddata').attr('data');
    if (!dataAttr || dataAttr.length <= 0) return null;

    const byteArray = base64js.toByteArray(dataAttr);
    if (isBuffer) return byteArray.buffer;

    const decodedString = String.fromCharCode.apply(null, byteArray);
    return JSON.parse(decodedString);
  }

  static IsSameSystemPaste() {
    const htmlObject = this.GetHTMLAsObject(GlobalData.optManager.theHtmlClipboard);
    if (!htmlObject) return false;

    const header = this.GetHeaderFromHTML(htmlObject);
    return header && header.sdcloudInstance === Clipboard.SDCloudInstance;
  }
}

export default Clipboard2



