

import $ from 'jquery'
import GlobalData from '../../Data/GlobalData'
import ListManager from '../../Data/ListManager'
import base64js from 'base64-js'

import ConstantData from '../../Data/ConstantData'


class Clipboard {

  static isMobile: any;
  static isGestureCapable: any;
  static isSafari: any;
  static isMac: any;
  static isIe: any;
  static isFF: any;
  static isIOS: any;
  static IEclipboardDiv: any;
  static clipboardInput: any;
  // static SDCloudInstance: any;
  static LastCutCopy: any;

  static Init(e) {

    this.isMobile = /mobile|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent);
    this.isGestureCapable = "ontouchstart" in window || "onpointerdown" in window && navigator.maxTouchPoints && navigator.maxTouchPoints > 1;
    this.isSafari = -1 != navigator.appVersion.search("Safari") && -1 == navigator.appVersion.search("Chrome") && -1 == navigator.appVersion.search("CrMo") && -1 == navigator.appVersion.search("CriOS");
    this.isMac = /(mac os x)/i.test(navigator.userAgent) && !Clipboard.isMobile;
    this.isIe = -1 != navigator.userAgent.toLowerCase().indexOf("msie") || -1 != navigator.userAgent.toLowerCase().indexOf("trident");
    this.isFF = -1 != navigator.userAgent.toLowerCase().indexOf("firefox");
    this.isIOS = /ip(ad|hone|od)/i.test(navigator.userAgent);
    this.IEclipboardDiv = $("#_IEclipboardDiv");
    this.clipboardInput = $("#_clipboardInput");

    if (this.isMac && this.isGestureCapable && this.isMobile == !0 && this.isSafari == !0 && this.isIOS == !0) {
      Clipboard.clipboardInput.attr("readonly", "readonly");
      var t = $("#_crossTabClipboardDiv");
      t.css("left", "-100px");
      t.css("top", "-100px");
    }

    // this.SDCloudInstance = Math.random();

    this.LastCutCopy = -1;

    if (this.isIe || this.isFF) {
      document.addEventListener("beforepaste", () => {
        Clipboard.FocusOnIEclipboardDiv();
      });
    }

    this.clipboardInput[0].addEventListener("input", (e) => {
      this.clipboardInput.val();
      if (this.isSafari) {
        this.clipboardInput.focus();
        setTimeout(this.FocusOnClipboardInput, 0);
      } else {
        this.FocusOnClipboardInput();
      }
    });

    /*
    ["cut", "copy", "paste"].forEach((event) => {
      document.addEventListener(event, (t: any) => {

        console.log("=== Clipboard event: ", event);
        console.log("=== Clipboard t: ", t);

        if (!GlobalData.docHandler.IsReadOnly()) {
          if (!GlobalData.optManager.isMobilePlatform) {
            if ((event === "cut" || event === "copy") &&
              $("#_clipboardInput:focus,#_IEclipboardDiv:focus,#SDTS_TouchProxy:focus").length <= 0) {
              return;
            }
            if (event === "paste" &&
              ($("input:focus").length > 0 || $("textarea:focus").length > 0) &&
              $("#_clipboardInput:focus,#_IEclipboardDiv:focus,#SDTS_TouchProxy:focus").length <= 0) {
              return;
            }
          }

          // debugger

          let clipboardData;
          if (t.clipboardData !== undefined) {
            clipboardData = t.clipboardData;
          } else if (t.originalEvent.clipboardData !== undefined) {
            clipboardData = t.originalEvent.clipboardData;
          } else if (window.clipboardData !== undefined) {
            clipboardData = window.clipboardData;
          }

          const isTouchProxyFocused = $("#SDTS_TouchProxy:focus").length > 0;

          if (event === "cut" || event === "copy") {
            const isEmptyClipboard = !this.GetCutCopyText();
            const canUseAsyncClipboard = Clipboard.CanUseAsyncClipboard();
            if (canUseAsyncClipboard && isEmptyClipboard) {
              Clipboard.GenerateImageInfo().then((imageInfo) => {
                Clipboard.DoCutCopy(t, event, canUseAsyncClipboard, clipboardData, imageInfo);
              });
            } else {
              this.DoCutCopy(t, event, canUseAsyncClipboard, clipboardData);
            }
          }

          if (event === "paste") {
            this.PasteFromSystemEvent(clipboardData);
          }

          if (isTouchProxyFocused) {
            t.preventDefault();
          }
        }
      });
    });
    */


    ["cut", "copy", "paste"].forEach((function (e) {
      document.addEventListener(e, (function (t) {
        if (!GlobalData.docHandler.IsReadOnly()) {
          if (!GlobalData.optManager.isMobilePlatform) {
            if (("cut" == e || "copy" == e) && $("#_clipboardInput:focus,#_IEclipboardDiv:focus,#SDTS_TouchProxy:focus").length <= 0)
              return;
            if ("paste" == e && ($("input:focus").length > 0 || $("textarea:focus").length > 0) && $("#_clipboardInput:focus,#_IEclipboardDiv:focus,#SDTS_TouchProxy:focus").length <= 0)
              return
          }
          var a;
          void 0 !== t.clipboardData ? a = t.clipboardData : void 0 !== t.originalEvent.clipboardData ? a = t.originalEvent.clipboardData : void 0 !== window.clipboardData && (a = window.clipboardData);
          var r = $("#SDTS_TouchProxy:focus").length > 0;
          if ("cut" == e || "copy" == e) {
            const r = !(() => Clipboard.GetCutCopyText())()
              , i = Clipboard.CanUseAsyncClipboard();
            i && r ? Clipboard.GenerateImageInfo().then((r => {
              Clipboard.DoCutCopy(t, e, i, a, r)
            }
            )) : Clipboard.DoCutCopy(t, e, i, a)
          }
          "paste" == e && Clipboard.PasteFromSystemEvent(a),
            r && t.preventDefault()
        }
      }
      ))
    }))

    $(document).mouseup(Clipboard.FocusOnClipboardInput);

    Clipboard.FocusOnClipboardInput();
  }

  static CanUseAsyncClipboard() {
    return !(
      Clipboard.isIe ||
      Clipboard.isFF ||
      Clipboard.isSafari
      // ||
      // SDUI.AppSettings.Embedded ||
      // SDUI.AppSettings.IsAtlassianConnectorApp()
    );
  }

  static DoCutCopy(event, action, canUseAsyncClipboard, clipboardData, imageInfo) {
    //debugger
    // Set the HTML clipboard content
    GlobalData.optManager.theHtmlClipboard = this.GetCutCopyHTML();

    // Handle cut and copy actions
    if (action === "cut") {
      GlobalData.optManager.CutObjects(true);
    } else if (action === "copy") {
      GlobalData.optManager.CopyObjects(true);
    }

    // Update the last cut/copy timestamp
    this.LastCutCopy = new Date().getTime();

    // Handle asynchronous clipboard API
    if (canUseAsyncClipboard) {
      if (!Clipboard.ValidateAsyncClipboardApi()) {
        return;
      }

      // Request clipboard write permission
      if (navigator && navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({ name: "clipboard-write" }).then(() => { });
      }

      // Get plain text content
      const textContent = this.GetCutCopyText();
      if (textContent) {
        // Create clipboard items for text and HTML
        const clipboardItems = {
          "text/plain": new Blob([textContent], { type: "text/plain" }),
          "text/html": new Blob([this.GetCutCopyHTML()], { type: "text/html" })
        };
        const clipboardItem = new ClipboardItem(clipboardItems);
        navigator.clipboard.write([clipboardItem]);
        this.FocusOnClipboardInput();
      } else if (imageInfo) {
        // Create clipboard items for image and HTML
        const imageHTML = `<img src="${imageInfo.base64ImageData}"/>`;
        const clipboardItems = {
          "image/png": imageInfo.imageBlob,
          "text/html": new Blob([this.GetCutCopyHTML(imageHTML)], { type: "text/html" })
        };
        const clipboardItem = new ClipboardItem(clipboardItems);
        navigator.clipboard.write([clipboardItem]);
      }

      event.preventDefault();
    } else {
      // Handle IE-specific clipboard actions
      if (this.isIe) {
        clipboardData.setData("Text", this.GetCutCopyText());
        this.IEclipboardDiv.html(this.GetCutCopyHTML());
        Clipboard.FocusOnIEclipboardDiv();
        setTimeout(() => {
          this.FocusOnClipboardInput();
          this.IEclipboardDiv.empty();
        }, 0);
        return;
      }

      /*
      // Show a message for specific app settings
      if (SDUI.AppSettings.Embedded || SDUI.AppSettings.IsAtlassianConnectorApp) {
        const messageKey = "SDCloudFFCopyMessageSeen";
        const messageSeen = Cookies.get(messageKey);
        if (!messageSeen) {
          const message = 'To copy to applications outside of SmartDraw, click (from the Home ribbon) "Export", then "Export for Office"';
          SDUI.Commands.MainController.ActiveSessionController.UpdateAlertModal(message, 1);
          Cookies.set(messageKey, "1", { expires: 365, domain: ".smartdraw.com" });
        }
      }
      */

      // Set clipboard data for text and HTML
      clipboardData.setData("text/plain", this.GetCutCopyText());
      clipboardData.setData("text/html", this.GetCutCopyHTML());
      event.preventDefault();

      console.log("=== Clipboard data copied to system clipboard and the data is: ", clipboardData);
    }
  }

  static GenerateImageInfo() {

    const e = {}
      , t = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, !1);
    return t && 0 !== t.length ? function (e) {
      return new Promise((t => ((e, t) => GlobalData.optManager.GeneratePreviewPNG(e, 1 / 0, 1 / 0, {
        zList: t,
        fillBackground: !0
      }))(t, e)))
    }(t).then((t => (e.imageBlob = t,
      function (e) {
        const t = new FileReader;
        return t.readAsDataURL(e),
          new Promise((e => {
            t.onloadend = () => e(t.result)
          }
          ))
      }(t)))).then((t => (e.base64ImageData = t,
        e))).catch((e => { throw e; }
        )) : Promise.resolve(null)

    /*
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
        }).catch(() => resolve(null));
      });
    } else {
      return Promise.resolve(null);
    }
    */
  }

  static ValidateAsyncClipboardApi() {
    return !!navigator.clipboard;
  }

  static PlainTextToSDObj(text: string) {
    if (typeof text !== 'string' || text === null || text.length === 0) {
      return text;
    }
    return {
      text: text,
      charStyles: [],
      hyperlinks: [],
      paraInfo: [],
      styles: [],
      vAlign: "middle"
    };
  }

  static PasteFromSystemEvent(e) {
    //debugger
    console.log("Pasting from system event: ", e);
    const handlers = [
      { matches: this.isIe, handler: this.PasteIE },
      { matches: this.isFF, handler: this.PasteFF },
      { matches: this.isSafari, handler: this.PasteSafari },
      { matches: true, handler: this.PasteChrome } // Default handler
    ];

    this.ClearInteralClipboard();
    const handler = handlers.find(h => h.matches) || handlers.find(h => h.default);
    handler.handler(e);
  }

  static PasteFF(e) {
    // debugger
    GlobalData.optManager.theTextClipboard = Clipboard.PlainTextToSDObj(e.getData("Text"));
    const htmlData = e.getData("text/html");
    if (htmlData !== undefined && htmlData !== null && htmlData.length > 0) {
      GlobalData.optManager.theHtmlClipboard = htmlData;
    }
    Clipboard.FocusOnIEclipboardDiv();
    setTimeout(() => {
      if (Clipboard.IEclipboardDiv.html().match(/<img src=['"]data/gi)) {
        const imgSrc = $(Clipboard.IEclipboardDiv[0].childNodes[0]).attr("src");
        const [meta, base64Data] = imgSrc.split(",");
        const mimeType = meta.split(":")[1].split(";")[0];
        const binaryData = atob(base64Data);
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uintArray = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
          uintArray[i] = binaryData.charCodeAt(i);
        }
        GlobalData.optManager.theImageClipboard = new Blob([uintArray], { type: mimeType });
      }
      Clipboard.Paste();
      Clipboard.IEclipboardDiv.empty();
      Clipboard.FocusOnClipboardInput();
    }, 0);
  }

  static PasteSafari(e) {
    return this.PasteChrome(e);
  }

  static PasteIE(e) {
    GlobalData.optManager.theTextClipboard = Clipboard.PlainTextToSDObj(e.getData("Text"));
    const files = e.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.indexOf("image") === 0) {
        GlobalData.optManager.theImageClipboard = files[i].slice(0, files[i].size - 1);
      }
    }
    this.IEclipboardDiv.empty();
    setTimeout(() => {
      GlobalData.optManager.theHtmlClipboard = this.IEclipboardDiv.html();
      this.Paste();
      this.IEclipboardDiv.empty();
      this.FocusOnClipboardInput();
    }, 0);
  }

  static PasteChrome(e) {

    // if (e.types && e.types.length > 0) {
    //   Array.prototype.forEach.call(e.types, (type, index) => {
    //     if (type.match(/image.*/)) {
    //       GlobalData.optManager.theImageClipboard = e.items[index].getAsFile();
    //     } else if (type.match(/text\/plain/)) {
    //       e.items[index].getAsString((text) => {
    //         GlobalData.optManager.theTextClipboard = Clipboard.PlainTextToSDObj(text);
    //       });
    //     } else if (type.match(/text\/html/)) {
    //       e.items[index].getAsString((html) => {
    //         GlobalData.optManager.theHtmlClipboard = html;
    //       });
    //     }
    //   });
    // }
    // setTimeout(this.Paste, GlobalData.optManager.isMac ? 500 : 10);

    // debugger

    void 0 !== e.types && null != e.types && Array.prototype.forEach.call(e.types, (function (t, a) {
      t.match(/image.*/) || void 0 !== e.items && e.items[a].type.match(/image.*/) ?
        GlobalData.optManager.theImageClipboard = e.items[a].getAsFile() :
        t.match(/text\/plain/) || void 0 !== e.items && e.items[a].type.match(/text\/plain/) ?
          e.items[a].getAsString((function (e) {
            GlobalData.optManager.theTextClipboard = Clipboard.PlainTextToSDObj(e)
          }
          )) : (t.match(/text\/html/) || e.items[a].type.match(/text\/html/)) && e.items[a].getAsString((function (e) {
            GlobalData.optManager.theHtmlClipboard = e
          }
          ))
    }
    ))

    setTimeout(Clipboard.Paste, GlobalData.optManager.isMac ? 500 : 10)
  }

  static ClearInteralClipboard() {
    GlobalData.optManager.theTextClipboard = null;
    GlobalData.optManager.theHtmlClipboard = null;
    GlobalData.optManager.theImageClipboard = null;
  }

  static PasteFromUIaction() {
    if (this.isMobile) {
      GlobalData.optManager.PasteObjects();
      return;
    }

    if (this.IsSameSystemPaste()) {
      GlobalData.optManager.PasteObjects();
      return;
    }

    this.ClearInteralClipboard();
    this.PasteUsingAsynchClipboardAPI(() => { }, (error) => { throw error });
  }

  static PasteUsingAsynchClipboardAPI(e, t) {
    if (this.isFF || this.isSafari) {
      const message = GlobalData.optManager.isMac ? "Use Command-V to paste this information" : "Use ctrl+v to paste this information";
      console.log(message);
      return false;
    }
    return this.PasteUsingAsynchClipboardAPIDoPaste(e, t);
  }

  static PasteUsingAsynchClipboardAPIDoPaste(successCallback, errorCallback) {
    const handlers = [
      {
        typeRegex: /text\/html/,
        handler: (item) => item.text().then((text) => {
          GlobalData.optManager.theHtmlClipboard = text;
          return true;
        })
      },
      {
        typeRegex: /text\/plain/,
        handler: (item) => item.text().then((text) => {
          GlobalData.optManager.theTextClipboard = Clipboard.PlainTextToSDObj(text);
          return true;
        })
      },
      {
        typeRegex: /image.*/,
        handler: (item) => {
          GlobalData.optManager.theImageClipboard = item;
          return true;
        }
      }
    ];

    if (Clipboard.ValidateAsyncClipboardApi()) {
      const data = navigator.clipboard.read().then((clipboardItems) => {
        let promises = [];
        for (const clipboardItem of clipboardItems) {
          for (const type of clipboardItem.types) {
            const promise = clipboardItem.getType(type).then((item) => {
              const handler = handlers.find((h) => type.match(h.typeRegex));
              if (handler) {
                return handler.handler(item);
              } else {
                errorCallback(`PasteUsingAsynchClipboardAPIDoPaste: could not find handler for type ${type}`);
              }
            }).catch((error) => errorCallback(error));
            promises.push(promise);
          }
        }
        return Promise.all(promises);
      }).then(() => {
        setTimeout(this.Paste, 1);
        successCallback(true);
      }).catch((error) => errorCallback(error));

      return data;
    }
  }

  static FocusOnClipboardInput() {
    const noInputFocused = $("input:focus").length <= 0;
    const noSelectFocused = $("select:focus").length <= 0;
    const noTextareaFocused = $("textarea:focus").length <= 0;
    const isMobilePlatform = GlobalData.optManager.isMobilePlatform;

    if ((noInputFocused && noSelectFocused && noTextareaFocused) || isMobilePlatform) {
      Clipboard.clipboardInput.val(" ");
      Clipboard.clipboardInput.focus().select();
    }
  }

  static FocusOnIEclipboardDiv() {
    if (/mobile|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent) &&
      !/*SDUI.Commands.MainController.Modals.ModalsVisible()*/0) {
      Clipboard.IEclipboardDiv.focus();
      const range = document.createRange();
      range.selectNodeContents(Clipboard.IEclipboardDiv.get(0));
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  static OnIECBEvent(event, clipboardEvent) {
    const clipboardData = window.clipboardData;

    if (event === "cut" || event === "copy") {
      clipboardData.setData("Text", this.GetCutCopyText());
      this.IEclipboardDiv.html(this.GetCutCopyHTML());
      this.FocusOnIEclipboardDiv();
      setTimeout(() => {
        this.FocusOnClipboardInput();
        this.IEclipboardDiv.empty();
      }, 0);
    }

    if (event === "paste") {
      const textData = clipboardData.getData("Text");
      this.IEclipboardDiv.empty();
      setTimeout(() => {
        const htmlData = this.IEclipboardDiv.html();
        this.Paste(textData, htmlData, GlobalData.optManager.theImageClipboard);
        this.IEclipboardDiv.empty();
        this.FocusOnClipboardInput();
      }, 0);
    }
  }

  static OnCBEvent(event, clipboardEvent) {
    const clipboardData = clipboardEvent.originalEvent.clipboardData;

    if (event === "cut" || event === "copy") {
      clipboardData.setData("text/plain", this.GetCutCopyText());
      clipboardData.setData("text/html", this.GetCutCopyHTML());
    }

    if (event === "paste") {
      const plainText = clipboardData.getData("text/plain");
      const htmlText = clipboardData.getData("text/html");
      this.Paste(plainText, htmlText, null);
    }
  }

  static Paste() {
    //debugger
    /mobile|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent);
    const htmlObject = Clipboard.GetHTMLAsObject(GlobalData.optManager.theHtmlClipboard);
    let header = null;

    if (htmlObject !== null) {
      header = Clipboard.GetHeaderFromHTML(htmlObject);
    }

    if (htmlObject === null && GlobalData.optManager.theHtmlClipboard) {
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

    if (header === null) {
      return;
    }

    // if (header.sdcloudInstance !== this.SDCloudInstance) {
    //   const data = Clipboard.DecodeDataFromHTML(htmlObject, header.clipboardType === ConstantData.ClipboardType.LM);
    //   GlobalData.optManager.theContentHeader.ClipboardType = header.clipboardType;

    //   if (header.clipboardType === ConstantData.ClipboardType.Text) {
    //     GlobalData.optManager.theTextClipboard = Clipboard.PlainTextToSDObj(data);
    //     GlobalData.optManager.theContentHeader.ClipboardBuffer = null;
    //   } else if (header.clipboardType === ConstantData.ClipboardType.Table) {
    //     GlobalData.optManager.theTextClipboard = null;
    //     GlobalData.optManager.theContentHeader.ClipboardBuffer = data;
    //   } else if (header.clipboardType === ConstantData.ClipboardType.LM) {
    //     GlobalData.optManager.theTextClipboard = null;
    //     GlobalData.optManager.theContentHeader.ClipboardBuffer = data;
    //   }

    //   GlobalData.optManager.PasteObjects();
    //   return;
    // }

    GlobalData.optManager.PasteObjects();
  }

  static GetCutCopyText() {
    const isMobile = /mobile|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent);
    const isTextClipboard = GlobalData.optManager.theContentHeader.ClipboardType === ConstantData.ClipboardType.Text;
    const textClipboard = GlobalData.optManager.theTextClipboard;

    if (!isTextClipboard || textClipboard == null) {
      return "";
    }

    return textClipboard.text;
  }

  static GetCutCopyHTML(extraHTML = "") {
    const isMobile = /mobile|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent);
    let clipboardContent = "";

    if (GlobalData.optManager.theContentHeader.ClipboardType === ConstantData.ClipboardType.Text && GlobalData.optManager.theTextClipboard) {
      clipboardContent += GlobalData.optManager.theTextClipboard ? GlobalData.optManager.theTextClipboard.text : "";
    }

    const clipboardHeader = {
      clipboardType: GlobalData.optManager.theContentHeader.ClipboardType,
      // sdcloudInstance: this.SDCloudInstance,
      timestamp: this.LastCutCopy
    };

    if (extraHTML) {
      clipboardContent += `<div>${extraHTML}</div>`;
    }

    // clipboardContent += "<div id='SDCloudData' style='display:none'>";
    // clipboardContent += `<sdclouddata header='${btoa(JSON.stringify(clipboardHeader))}' data='`;

    if (GlobalData.optManager.theContentHeader.ClipboardType === ConstantData.ClipboardType.Text) {
      const textData = JSON.stringify(GlobalData.optManager.theTextClipboard);
      const textBytes = new Uint8Array(textData.length);
      for (let i = 0; i < textData.length; i++) {
        textBytes[i] = textData.charCodeAt(i);
      }
      clipboardContent += base64js.fromByteArray(textBytes);
    }

    if (GlobalData.optManager.theContentHeader.ClipboardType === ConstantData.ClipboardType.LM) {
      const lmBytes = new Uint8Array(GlobalData.optManager.theContentHeader.ClipboardBuffer);
      clipboardContent += base64js.fromByteArray(lmBytes);
    }

    if (GlobalData.optManager.theContentHeader.ClipboardType === ConstantData.ClipboardType.Table) {
      const tableData = JSON.stringify(GlobalData.optManager.theContentHeader.ClipboardBuffer);
      const tableBytes = new Uint8Array(tableData.length);
      for (let i = 0; i < tableData.length; i++) {
        tableBytes[i] = tableData.charCodeAt(i);
      }
      clipboardContent += base64js.fromByteArray(tableBytes);
    }

    clipboardContent += "'/>";
    clipboardContent += "</div>";

    return clipboardContent;
  }

  static GetHTMLAsObject(htmlString: string) {
    // const regex = /<div id=['"]SDCloudData['"](.*?)>(.*?)<\/div>/gi;
    // const match = regex.exec(htmlString);
    // if (match === null || match.length <= 0) {
    //   return null;
    // }
    const cleanedHtml = htmlString.replace("<!--", "").replace("-->", "");
    return $("<html><body>" + cleanedHtml + "</body></html>");
  }

  static GetHeaderFromHTML(htmlObject) {
    // if (htmlObject == null || htmlObject === undefined) {
    //   return null;
    // }
    // const headerData = htmlObject.find("sdclouddata").attr("header");
    // return JSON.parse(atob(headerData));

    return "";
  }

  // static DecodeDataFromHTML(htmlObject, isLMType) {
  //   if (!htmlObject) return null;

  //   const dataAttr = htmlObject.find("sdclouddata").attr("data");
  //   if (dataAttr.length <= 0) return null;

  //   const byteArray = base64js.toByteArray(dataAttr);
  //   if (isLMType) return byteArray.buffer;

  //   const decodedString = String.fromCharCode.apply(null, byteArray);
  //   return JSON.parse(decodedString);
  // }

  static IsSameSystemPaste() {
    // const htmlObject = this.GetHTMLAsObject(GlobalData.optManager.theHtmlClipboard);
    // if (!htmlObject) return false;

    // const header = this.GetHeaderFromHTML(htmlObject);
    // return !!header && header.sdcloudInstance === this.SDCloudInstance;

    return true;
  }
}

export default Clipboard
