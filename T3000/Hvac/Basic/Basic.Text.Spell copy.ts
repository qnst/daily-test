

// import Basic from "./Basic.Index";
import './Basic.Text';
// import "./Basic.Text.Index";
// Basic.Text = {}
import Utils1 from "../Helper/Utils1"
import Utils2 from "../Helper/Utils2"
import Utils3 from "../Helper/Utils3"
import $ from "jquery";
// import SDJS from "../SDJS/SDJS.Index";
// import SDUI from "../SDUI/SDUI.Index";
import Commands from '../Opt/Business/Commands'

import ConstantData from "../Data/ConstantData"


class Spell {

  public doc: any;
  public isActive: boolean;
  public isInitialized: boolean;
  public inProcessSpellList: any;
  public inProcessCallback: any;
  public spellMenuRequest: any;
  public spellMenuData: any;
  public wordCache: any;
  public userDict: any;
  public ignoreList: any;
  public userSpell: any;
  public curDict: any;
  public inAsyncSpellCheck: boolean;
  public bIgnoreAllCaps: boolean;
  public bIgnoreInitCaps: boolean;
  public bIgnoreMixedCaps: boolean;
  public bIgnoreMixedAlphaNum: boolean;
  public bAutoCorrect: boolean;

  constructor(e) {
    //'use strict';
    this.doc = e,
      this.isActive = !1,
      this.isInitialized = !1,
      this.inProcessSpellList = null,
      this.inProcessCallback = null,
      this.spellMenuRequest = null,
      this.spellMenuData = null,
      this.wordCache = {},
      this.userDict = [],
      this.ignoreList = [],
      this.userSpell = null,
      this.curDict = Spell.DictMap.en,
      this.inAsyncSpellCheck = !1,
      this.bIgnoreAllCaps = !1,
      this.bIgnoreInitCaps = !1,
      this.bIgnoreMixedCaps = !1,
      this.bIgnoreMixedAlphaNum = !1,
      this.bAutoCorrect = !1
  }

  Initialize() {
    //'use strict';
    this.curDict = Spell.FindDefaultDictionary(),
      Spell.ServerInit(this.curDict),
      this.isInitialized = !0
  }

  UserInitialize() {
    //'use strict';
    this.LoadUserDict()
  }

  SetActive(e) {
    //'use strict';
    this.isActive = e
  }

  GetActive() {
    //'use strict';
    return this.isInitialized &&
      this.isActive
  }

  InAsyncSpellCheck() {
    //'use strict';
    return this.inAsyncSpellCheck
  }

  ClearAsyncSpellCheck() {
    //'use strict';
    this.inAsyncSpellCheck = !1
  }

  CheckSpellingForTextObj(e, t) {
    //'use strict';
    if (!this.GetActive() || !e.GetSpellCheck()) return !1;
    var a = e.GetSpellCheckList();
    if (t) for (var r = 0; r < a.list.length; r++) a.list[r].status = Spell.WordState.NOTPROCESSED;
    return this.ProcessSpellingMain(a, e),
      !0
  }

  CheckAllSpelling(e) {
    //'use strict';
    if (!this.GetActive()) return this.ClearTextObjects(),
      void (e && e());
    var t = this.doc;
    this.inProcessSpellList = [],
      this.inProcessCallback = e ||
      null,
      this.GetTextList(this.inProcessSpellList, t),
      this.ProcessSpellList()
  }

  ClearTextObjects() {
    //'use strict';
    var e,
      t = this.doc,
      a = [];
    for (this.GetTextList(a, t), e = 0; e < a.length; e++) a[e].textObj.UpdateSpellCheck(null)
  }

  AddWord(e) {
    //'use strict';
    this.AddToUserDict(e)
  }

  IgnoreWord(e) {
    //'use strict';
    this.AddWordToCache(e, !0),
      this.ignoreList.indexOf(e) < 0 &&
      this.ignoreList.push(e)
  }

  GetIgnoreList() {
    //'use strict';
    return this.ignoreList
  }

  SetIgnoreList(e) {
    //'use strict';
    var t = this;
    this.ignoreList = e ? e.slice(0) : [],
      this.ignoreList.forEach((function (e) {
        t.AddWordToCache(e, !0)
      }))
  }

  SetCurrentDictionary(e) {
    //'use strict';
    e instanceof String ||
      (e = String(e)),
      Spell.DictMap[e] ||
      (e = Spell.FindDefaultDictionary()),
      this.curDict = e,
      this.ClearCache()
  }

  GetCurrentDictionary() {
    //'use strict';
    return this.curDict
  }

  SetSpellFlags(e) {
    //'use strict';
    this.bIgnoreAllCaps = 0 != (e & Globals.SpellFlags.IgnoreAllCaps),
      this.bIgnoreInitCaps = 0 != (e & Globals.SpellFlags.IgnoreInitCaps),
      this.bIgnoreMixedCaps = 0 != (e & Globals.SpellFlags.IgnoreMixedCase),
      this.bIgnoreMixedAlphaNum = 0 != (e & Globals.SpellFlags.IgnoreMixedAlphaNum),
      this.ClearCache()
  }

  GetSpellFlags() {
    //'use strict';
    var e = 0;
    return this.bIgnoreAllCaps &&
      (e |= Globals.SpellFlags.IgnoreAllCaps),
      this.bIgnoreInitCaps &&
      (e |= Globals.SpellFlags.IgnoreInitCaps),
      this.bIgnoreMixedCaps &&
      (e |= Globals.SpellFlags.IgnoreMixedCase),
      this.bIgnoreMixedAlphaNum &&
      (e |= Globals.SpellFlags.IgnoreMixedAlphaNum),
      e
  }

  ShowSpellMenu(e, t, a, r) {
    //'use strict';
    this.spellMenuRequest = {
      textID: e.GetInternalID(),
      charIndex: t,
      clientX: a,
      clientY: r
    },
      this.ProcessSpellMenuRequest(e, !0) ||
      this.CheckSpellingForTextObj(e)
  }

  LoadUserDict() {
    //'use strict';
    Spell.ServerGetCustomDict(
      (
        function (e, t) {
          e &&
            GlobalData.docHandler.svgDoc.GetSpellCheck().SetUserDictFromSource(t)
        }
      )
    )
  }

  SetUserDictFromSource(e) {
    //'use strict';
    this.userDict = [],
      e &&
      e.length &&
      (this.userDict = e.split(String.fromCharCode(1))),
      this.AddUserDictToCache(),
      this.userSpell = new FuzzySet(this.userDict)
  }

  SaveUserDict() {
    //'use strict';
    var e = this.userDict.join(String.fromCharCode(1));
    e = JSON.stringify(e),
      Spell.ServerStoreCustomDict(e, (function (e) {
      }))
  }

  AddUserDictToCache() {
    //'use strict';
    var e;
    for (e = 0; e < this.userDict.length; e++) this.AddWordToCache(this.userDict[e], !0)
  }

  AddToUserDict(e) {
    //'use strict';
    this.AddWordToCache(e, !0),
      this.userDict.indexOf(e) >= 0 ||
      (
        this.userDict.push(e),
        this.userDict.sort((function (e, t) {
          return e.localeCompare(t)
        })),
        this.userSpell = new FuzzySet(this.userDict),
        this.SaveUserDict()
      )
  }

  RemoveFromUserDict(e) {
    //'use strict';
    var t = this.userDict.indexOf(e);
    t < 0 ||
      (
        this.wordCache[e] = void 0,
        this.userDict.splice(t, 1),
        this.userSpell = new FuzzySet(this.userDict),
        this.SaveUserDict()
      )
  }

  ClearUserDict() {
    //'use strict';
    var e,
      t;
    for (e = 0; e < this.userDict.length; e++) t = this.userDict[e],
      this.wordCache[t] = void 0;
    this.userDict = [],
      this.userSpell = new FuzzySet(this.userDict),
      this.SaveUserDict()
  }

  GetUserDictSuggestions(e) {
    //'use strict';
    var t,
      a,
      r = null,
      i = [];
    if (this.userSpell && (r = this.userSpell.get(e)), !r || !r.length) return [];
    for (t = 0; t < r.length; t++) 2 == (a = r[t]).length &&
      a[0] > 0.4 &&
      i.push(a[1]);
    return i
  }

  ProcessSpellMenuRequest(e, t) {
    //'use strict';
    if (!this.spellMenuRequest || !e) return !1;
    var a = this.FindTextObj(this.spellMenuRequest.textID),
      r = this.spellMenuRequest.charIndex,
      i = this.spellMenuRequest.clientX,
      n = this.spellMenuRequest.clientY;
    if (
      t ||
      (this.spellMenuRequest = null),
      !a ||
      a.GetInternalID() != e.GetInternalID()
    ) return !1;
    var o = e.GetSpellCheckList(),
      s = a.GetInternalID(),
      l = this.FindWordInWordList(o, r);
    if (
      l < 0 ||
      o.list[l].status == Spell.WordState.NOTPROCESSED
    ) return !1;
    var S = this;
    return this.LoadCacheSuggest(
      o.list[l].word,
      (
        function (e, t) {
          e &&
            (
              o.list[l].suggestions = t,
              S.ProcessSpellMenu(s, o, l, i, n),
              S.spellMenuRequest = null
            )
        }
      )
    ),
      !0
  }

  ProcessSpellMenu(e, t, a, r, i) {
    //'use strict';
    if (
      !(a < 0 || a >= t.list.length) &&
      t.list[a].status == Spell.WordState.WRONG
    ) {
      this.spellMenuData = {
        wordInfo: $.extend(!0, {
        }, t.list[a]),
        textID: e
      },
        this.spellMenuData.wordInfo.suggestions ||
        (this.spellMenuData.wordInfo.suggestions = []);
      var n = this.GetUserDictSuggestions(this.spellMenuData.wordInfo.word);
      if (
        n &&
        n.length &&
        (
          this.spellMenuData.wordInfo.suggestions = n.concat(this.spellMenuData.wordInfo.suggestions)
        ),
        this.IsInitUpper(this.spellMenuData.wordInfo.word)
      ) {
        var o,
          s = this.spellMenuData.wordInfo.suggestions.length;
        for (o = 0; o < s; o++) this.IsAllLower(this.spellMenuData.wordInfo.suggestions[o]) &&
          (
            this.spellMenuData.wordInfo.suggestions[o] = this.MakeInitUpper(this.spellMenuData.wordInfo.suggestions[o])
          )
      }
      Commands.MainController.ShowContextualMenu(Resources.Controls.Dropdowns.SpellingSuggest.Id, r, i)
    }
  }

  HandleMenu_Add() {
    //'use strict';
    if (this.spellMenuData) {
      var e = this.spellMenuData.wordInfo.word;
      this.FindTextObj(this.spellMenuData.textID) &&
        this.AddWord(e),
        this.spellMenuData = null
    }
  }

  HandleMenu_Ignore() {
    //'use strict';
    if (this.spellMenuData) {
      var e = this.spellMenuData.wordInfo.word;
      this.FindTextObj(this.spellMenuData.textID) &&
        this.IgnoreWord(e),
        this.spellMenuData = null
    }
  }

  HandleMenu_Suggest(e) {
    //'use strict';
    if (
      !(
        !this.spellMenuData ||
        !this.spellMenuData.wordInfo.suggestions ||
        e < 0 ||
        e >= this.spellMenuData.wordInfo.suggestions.length
      )
    ) {
      var t = this.spellMenuData.wordInfo.suggestions[e],
        a = this.spellMenuData.wordInfo.start,
        r = this.spellMenuData.wordInfo.end,
        i = this.FindTextObj(this.spellMenuData.textID);
      this.IsAllLower(t) &&
        this.IsInitUpper(this.spellMenuData.wordInfo.word) &&
        (t = this.MakeInitUpper(t)),
        i &&
        (i.SetSelectedRange(a, r), i.Paste(t, !1)),
        this.spellMenuData = null
    }
  }

  GetMenuSuggestions() {
    //'use strict';
    return this.spellMenuData &&
      this.spellMenuData.wordInfo.suggestions ? this.spellMenuData.wordInfo.suggestions : null
  }

  GetTextList(e, t) {
    //'use strict';
    var a,
      r,
      i = t.ElementCount();
    for (a = 0; a < i; a++) (r = t.GetElementByIndex(a)) instanceof Text &&
      r.GetSpellCheck() ? e.push({
        id: r.GetInternalID(),
        textObj: r
      }) : (r instanceof Group || r instanceof Layer) &&
    this.GetTextList(e, r)
  }

  ProcessSpellList() {
    //'use strict';
    if (
      this.inProcessSpellList &&
      !this.inProcessSpellList.length &&
      (
        this.inProcessSpellList = null,
        this.inProcessCallback &&
        this.inProcessCallback(),
        this.inProcessCallback = null
      ),
      this.inProcessSpellList
    ) {
      this.inAsyncSpellCheck = !0;
      var e = this.inProcessSpellList.pop(),
        t = this.FindTextObj(e.id);
      t &&
        this.CheckSpellingForTextObj(t, !0) ||
        this.ProcessSpellList()
    } else this.inAsyncSpellCheck = !1
  }

  AsyncProcessSpellList() {
    //'use strict';
    var e = this;
    setTimeout((function () {
      e.ProcessSpellList()
    }), 1)
  }

  GetWordFromCache(e) {
    //'use strict';
    var t = this.wordCache[e];
    return t &&
      'function' != typeof t ? t : null
  }

  LoadCacheSuggest(e, t) {
    //'use strict';
    var a = this.GetWordFromCache(e);
    a ? a.needSuggest ? Spell.ProcessGetSuggest(
      e,
      this.curDict,
      (
        function (e, r) {
          e ? (a.suggest = r, a.needSuggest = !1, t && t(!0, a.suggest)) : t &&
            t(!1)
        }
      )
    ) : t &&
    t(!0, a.suggest) : t &&
    t(!1)
  }

  AddWordToCache(e, t, a, r) {
    //'use strict';
    var i = a ||
      [],
      n = !a &&
        !t;
    this.wordCache[e] = {
      check: t,
      suggest: i,
      auto: r,
      needSuggest: n
    }
  }

  ClearCache() {
    //'use strict';
    this.wordCache = {},
      this.AddUserDictToCache()
  }

  ProcessSpellingMain(e, t) {
    //'use strict';
    this.ProcessSpellingLocal(e, t, !1) ? (
      this.AsyncProcessSpellList(),
      this.ProcessSpellMenuRequest(t, !1)
    ) : this.ProcessSpellingRemote(e, 0)
  }

  ProcessSpellingLocal(e, t, a) {
    //'use strict';
    var r,
      i,
      n = e.list.length,
      o = !0,
      s = !1;
    for (r = 0; r < n; r++) e.list[r].status == Spell.WordState.NOTPROCESSED &&
      (
        (i = this.GetWordFromCache(e.list[r].word)) ? (
          e.list[r].status = i.check ? Spell.WordState.CORRECT : Spell.WordState.WRONG,
          e.list[r].suggestions = i.suggest,
          e.list[r].needSuggest = i.needSuggest,
          e.list[r].auto = i.auto,
          s = !0
        ) : e.list[r].word.length > Spell.Globals.MaxWordSize ? (
          this.AddWordToCache(e.list[r].word, !1),
          e.list[r].status = Spell.WordState.WRONG,
          e.list[r].needSuggest = !1,
          e.list[r].suggestions = [],
          s = !0
        ) : this.bIgnoreAllCaps &&
          this.IsAllUpper(e.list[r].word) ||
          this.bIgnoreInitCaps &&
          this.IsInitUpper(e.list[r].word) ||
          this.bIgnoreMixedAlphaNum &&
          this.HasNumber(e.list[r].word) ? (
          e.list[r].status = Spell.WordState.CORRECT,
          e.list[r].needSuggest = !1,
          e.list[r].suggestions = [],
          s = !0
        ) : o = !1
      );
    return t &&
      s &&
      (!a || o) &&
      t.UpdateSpellCheck(e),
      o
  }

  ProcessSpellingRemote(e, t) {
    //'use strict';
    var a,
      r = [],
      i = 0,
      n = 0,
      o = this,
      s = e.list.length;
    for (a = t; a < s; a++) if (
      e.list[a].status == Spell.WordState.NOTPROCESSED &&
      r.indexOf(e.list[a].word) < 0
    ) {
      if (
        i += e.list[a].word.length + 1,
        r.length &&
        i > Spell.Globals.MaxServerListSize
      ) {
        n = a;
        break
      }
      r.push(e.list[a].word)
    }
    r.length ? (
      this.inAsyncSpellCheck = !0,
      Spell.ProcessCheckText(
        r,
        this.curDict,
        (function (t, a) {
          t &&
            o.RemoteSpellingCallback(a, e, n)
        })
      )
    ) : this.AsyncProcessSpellList()
  }

  RemoteSpellingCallback(e, t, a) {
    //'use strict';
    var r,
      i,
      n = e.length;
    for (i = this.FindTextObj(t.textID), r = 0; r < n; r++) this.AddWordToCache(e[r].word, e[r].check, e[r].suggest, e[r].auto);
    a > 0 &&
      a < t.list.length ? this.ProcessSpellingLocal(t, i, !0) ||
    this.ProcessSpellingRemote(t, a) : (
      i &&
      (
        this.ProcessSpellingLocal(t, i, !1),
        this.ProcessSpellMenuRequest(i, !1)
      ),
      this.AsyncProcessSpellList()
    )
  }

  FindTextObj(e, t) {
    //'use strict';
    t ||
      (t = this.doc);
    var a,
      r,
      i = t.ElementCount();
    for (a = 0; a < i; a++) if ((r = t.GetElementByIndex(a)) instanceof Text) {
      if (r.GetInternalID() == e) return r
    } else if (
      (r instanceof Group || r instanceof Layer) &&
      (r = this.FindTextObj(e, r))
    ) return r;
    return null
  }

  FindWordInWordList(e, t) {
    //'use strict';
    var a,
      r = e ? e.list.length : 0;
    for (a = 0; a < r; a++) if (t >= e.list[a].start && t < e.list[a].end) return a;
    return - 1
  }

  IsAllUpper(e) {
    //'use strict';
    return e == e.toUpperCase()
  }

  IsAllLower(e) {
    //'use strict';
    return e == e.toLowerCase()
  }

  IsInitUpper(e) {
    //'use strict';
    return e == this.MakeInitUpper(e)
  }

  HasNumber(e) {
    //'use strict';
    return e.search(/\d/) >= 0
  }

  MakeInitUpper(e) {
    //'use strict';
    return e.length ? e.charAt(0).toUpperCase() + e.slice(1).toLowerCase() : e
  }

  static FindDefaultDictionary() {
    //'use strict';
    var e,
      t = 'en',
      a = null;
    return navigator &&
      navigator.language &&
      navigator.language.length &&
      (t = navigator.language.toLowerCase()),
      e = t.substr(0, 2),
      Spell.DictMap[t] &&
      (a = t),
      !a &&
      Spell.DictMap[e] &&
      (a = e),
      a ||
      (a = 'en'),
      a
  }

  static MapServerDictID(e) {
    var t = Spell.DictMap[e];
    return t ||
      (
        e = Spell.FindDefaultDictionary(),
        t = Spell.DictMap[e]
      ),
      t
  }



  static WordState = {
    WRONG: 0,
    CORRECT: 1,
    NOTPROCESSED: 2
  }

  // Object.freeze(Spell.WordState),
  static Globals = {
    MaxWordSize: 100,
    MaxServerListSize: 1400
  }

  // Object.freeze(Spell.Globals),
  static DictMap = {
    en: '24941',
    'en-gb': '25202',
    'en-ca': '25441',
    'pt-br': '28770',
    da: '25697',
    nl: '25717',
    fi: '26217',
    fr: '26226',
    de: '26469',
    it: '26996',
    legal: '27745',
    medical: '28001',
    no: '25442',
    pt: '28783',
    es: '29552',
    sv: '29559'
  }


}

export default Spell;

// export default Text.Spell;
