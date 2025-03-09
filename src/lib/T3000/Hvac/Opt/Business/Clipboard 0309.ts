

import $ from 'jquery'
import T3Gv from '../../Data/T3Gv'
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

    ["cut", "copy", "paste"].forEach((function (e) {
      document.addEventListener(e, (function (t) {
        if (!T3Gv.docUtil.IsReadOnly()) {
          if (!T3Gv.optManager.isMobilePlatform) {
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
    );
  }

  static DoCutCopy(event, action, canUseAsyncClipboard, clipboardData, imageInfo) {
    // Set the HTML clipboard content
    T3Gv.optManager.theHtmlClipboard = this.GetCutCopyHTML();

    // Handle cut and copy actions
    if (action === "cut") {
      T3Gv.optManager.CutObjects(true);
    } else if (action === "copy") {
      T3Gv.optManager.CopyObjects(true);
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

      // Set clipboard data for text and HTML
      clipboardData.setData("text/plain", this.GetCutCopyText());
      clipboardData.setData("text/html", this.GetCutCopyHTML());
      event.preventDefault();

      console.log("=== Clipboard data copied to system clipboard and the data is: ", clipboardData);
    }
  }

  static GenerateImageInfo() {

    const e = {}
      , t = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSelectedListBlockID, !1);
    return t && 0 !== t.length ? function (e) {
      return new Promise((t => ((e, t) => T3Gv.optManager.GeneratePreviewPNG(e, 1 / 0, 1 / 0, {
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
    T3Gv.optManager.theTextClipboard = Clipboard.PlainTextToSDObj(e.getData("Text"));
    const htmlData = e.getData("text/html");
    if (htmlData !== undefined && htmlData !== null && htmlData.length > 0) {
      T3Gv.optManager.theHtmlClipboard = htmlData;
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
        T3Gv.optManager.theImageClipboard = new Blob([uintArray], { type: mimeType });
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
    T3Gv.optManager.theTextClipboard = Clipboard.PlainTextToSDObj(e.getData("Text"));
    const files = e.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.indexOf("image") === 0) {
        T3Gv.optManager.theImageClipboard = files[i].slice(0, files[i].size - 1);
      }
    }
    this.IEclipboardDiv.empty();
    setTimeout(() => {
      T3Gv.optManager.theHtmlClipboard = this.IEclipboardDiv.html();
      this.Paste();
      this.IEclipboardDiv.empty();
      this.FocusOnClipboardInput();
    }, 0);
  }

  static PasteChrome(e) {
    void 0 !== e.types && null != e.types && Array.prototype.forEach.call(e.types, (function (t, a) {
      t.match(/image.*/) || void 0 !== e.items && e.items[a].type.match(/image.*/) ?
        T3Gv.optManager.theImageClipboard = e.items[a].getAsFile() :
        t.match(/text\/plain/) || void 0 !== e.items && e.items[a].type.match(/text\/plain/) ?
          e.items[a].getAsString((function (e) {
            T3Gv.optManager.theTextClipboard = Clipboard.PlainTextToSDObj(e)
          }
          )) : (t.match(/text\/html/) || e.items[a].type.match(/text\/html/)) && e.items[a].getAsString((function (e) {
            T3Gv.optManager.theHtmlClipboard = e
          }
          ))
    }
    ))

    setTimeout(Clipboard.Paste, T3Gv.optManager.isMac ? 500 : 10)
  }

  static ClearInteralClipboard() {
    T3Gv.optManager.theTextClipboard = null;
    T3Gv.optManager.theHtmlClipboard = null;
    T3Gv.optManager.theImageClipboard = null;
  }

  static PasteFromUIaction() {
    if (this.isMobile) {
      T3Gv.optManager.PasteObjects();
      return;
    }

    if (this.IsSameSystemPaste()) {
      T3Gv.optManager.PasteObjects();
      return;
    }

    this.ClearInteralClipboard();
    this.PasteUsingAsynchClipboardAPI(() => { }, (error) => { throw error });
  }

  static PasteUsingAsynchClipboardAPI(e, t) {
    if (this.isFF || this.isSafari) {
      const message = T3Gv.optManager.isMac ? "Use Command-V to paste this information" : "Use ctrl+v to paste this information";
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
          T3Gv.optManager.theHtmlClipboard = text;
          return true;
        })
      },
      {
        typeRegex: /text\/plain/,
        handler: (item) => item.text().then((text) => {
          T3Gv.optManager.theTextClipboard = Clipboard.PlainTextToSDObj(text);
          return true;
        })
      },
      {
        typeRegex: /image.*/,
        handler: (item) => {
          T3Gv.optManager.theImageClipboard = item;
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
    const isMobilePlatform = T3Gv.optManager.isMobilePlatform;

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
        this.Paste(textData, htmlData, T3Gv.optManager.theImageClipboard);
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
    const htmlObject = Clipboard.GetHTMLAsObject(T3Gv.optManager.theHtmlClipboard);
    let header = null;

    if (htmlObject !== null) {
      header = Clipboard.GetHeaderFromHTML(htmlObject);
    }

    if (htmlObject === null && T3Gv.optManager.theHtmlClipboard) {
      Clipboard.LastCutCopy = -1;
      if (T3Gv.optManager.theImageClipboard && T3Gv.optManager.theImageClipboard.size > 0) {
        T3Gv.optManager.theContentHeader.ClipboardType = ConstantData.ClipboardType.Image;
      } else {
        T3Gv.optManager.theContentHeader.ClipboardType = ConstantData.ClipboardType.Text;
      }
      T3Gv.optManager.theContentHeader.ClipboardBuffer = null;
      T3Gv.optManager.PasteObjects();
      return;
    }

    if (header === null) {
      return;
    }

    T3Gv.optManager.PasteObjects();
  }

  static GetCutCopyText() {
    const isMobile = /mobile|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent);
    const isTextClipboard = T3Gv.optManager.theContentHeader.ClipboardType === ConstantData.ClipboardType.Text;
    const textClipboard = T3Gv.optManager.theTextClipboard;

    if (!isTextClipboard || textClipboard == null) {
      return "";
    }

    return textClipboard.text;
  }

  static GetCutCopyHTML(extraHTML = "") {
    const isMobile = /mobile|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent);
    let clipboardContent = "";

    if (T3Gv.optManager.theContentHeader.ClipboardType === ConstantData.ClipboardType.Text && T3Gv.optManager.theTextClipboard) {
      clipboardContent += T3Gv.optManager.theTextClipboard ? T3Gv.optManager.theTextClipboard.text : "";
    }

    const clipboardHeader = {
      clipboardType: T3Gv.optManager.theContentHeader.ClipboardType,
      timestamp: this.LastCutCopy
    };

    if (extraHTML) {
      clipboardContent += `<div>${extraHTML}</div>`;
    }

    if (T3Gv.optManager.theContentHeader.ClipboardType === ConstantData.ClipboardType.Text) {
      const textData = JSON.stringify(T3Gv.optManager.theTextClipboard);
      const textBytes = new Uint8Array(textData.length);
      for (let i = 0; i < textData.length; i++) {
        textBytes[i] = textData.charCodeAt(i);
      }
      clipboardContent += base64js.fromByteArray(textBytes);
    }

    if (T3Gv.optManager.theContentHeader.ClipboardType === ConstantData.ClipboardType.LM) {
      const lmBytes = new Uint8Array(T3Gv.optManager.theContentHeader.ClipboardBuffer);
      clipboardContent += base64js.fromByteArray(lmBytes);
    }

    if (T3Gv.optManager.theContentHeader.ClipboardType === ConstantData.ClipboardType.Table) {
      const tableData = JSON.stringify(T3Gv.optManager.theContentHeader.ClipboardBuffer);
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
    const cleanedHtml = htmlString.replace("<!--", "").replace("-->", "");
    return $("<html><body>" + cleanedHtml + "</body></html>");
  }

  static GetHeaderFromHTML(htmlObject) {
    return "";
  }

  static IsSameSystemPaste() {

    return true;
  }
}

export default Clipboard
