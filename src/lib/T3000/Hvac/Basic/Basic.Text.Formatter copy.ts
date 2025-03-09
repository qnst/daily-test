

// import Basic from "./Basic.Index";
// import './Basic.Text.Index';
// import { DefaultFmtText, DefaultStyle, DefaultRuntimeText } from './TextFormatter.Index';
import T3Svg from "../Helper/T3Svg"
import $ from 'jquery';

import Global from "./Basic.Global"
import Utils1 from "../Helper/Utils1"
import Utils2 from "../Helper/Utils2"
import Utils3 from "../Helper/Utils3"
// FormatterDefaultStyle = {}
// Basic.Text = {};
// Basic.Text.Formatter = {};

// Basic.Text = function () {

// }

import Spell from './B.Text.Spell'

import ConstantData from "../Data/ConstantData"
import DefaultFmtText from '../Model/DefaultFmtText'
import DefaultRuntimeText from '../Model/DefaultRuntimeText'
import DefaultStyle from "../Model/DefaultStyle";


class Formatter {

  public parent: any;
  public limits: any;
  public fmtText: any;
  public rtData: any;
  public renderedLines: any;
  public wordList: any;
  public renderingEnabled: boolean;
  public deferredRenderNeeded: boolean;
  public contentVersion: number;
  public spellCheckEnabled: boolean;
  public dataNameEnabled: boolean;

  constructor(parent) {
    // //'use strict';
    this.parent = parent;
    this.limits = { minWidth: 0, maxWidth: 0 };
    this.fmtText = new DefaultFmtText();// new Formatter.DefaultFmtText();//FormatterDefaultFmtText(),
    this.rtData = new DefaultRuntimeText();// new Formatter.DefaultRuntimeText();// FormatterDefaultRuntimeText(),
    this.renderedLines = [];
    this.wordList = null;
    this.renderingEnabled = !0;
    this.deferredRenderNeeded = !1;
    this.contentVersion = 0;
    this.spellCheckEnabled = !1;
    this.dataNameEnabled = !1;
  }

  // static DefaultFmtText = function () {
  //   // //'use strict';
  //   return {
  //     width: 0,
  //     height: 0,
  //     fmtWidth: 0,
  //     text: '',
  //     paragraphs: [],
  //     styles: [],
  //     hyperlinks: []
  //   }
  // }

  // static DefaultStyle = function () {
  //   //'use strict';
  //   return {
  //     font: 'Arial',
  //     type: 'sanserif',
  //     size: 10,
  //     weight: 'normal',
  //     style: 'normal',
  //     baseOffset: 'none',
  //     decoration: 'none',
  //     color: '#000',
  //     colorTrans: 1,
  //     spError: !1,
  //     dataField: null,
  //     hyperlink: - 1
  //   }
  // }



  // static DefaultRuntimeText = function () {
  //   //'use strict';
  //   return {
  //     text: '',
  //     charStyles: [],
  //     styleRuns: [],
  //     styles: [
  //       new Formatter.DefaultStyle()
  //     ],
  //     hyperlinks: []
  //   }
  // }

  // FormatterfmtText = FormatterDefaultFmtText()
  // FormatterrtData = FormatterDefaultRuntimeText()



  SetLimits(e) {
    //'use strict';
    this.limits.minWidth = void 0 !== e.minWidth ? e.minWidth : this.limits.minWidth,
      this.limits.maxWidth = void 0 !== e.maxWidth ? e.maxWidth : this.limits.maxWidth,
      this.fmtText = this.CalcFromRuntime(this.rtData, this.limits)
  }

  SetRenderingEnabled(e) {
    //'use strict';
    var t,
      a = [];
    if (this.renderingEnabled = e, e && this.deferredRenderNeeded) {
      for (t = 0; t < this.rtData.styleRuns.length; t++) a.push({
        pStyle: Utils1.CopyObj(this.rtData.styleRuns[t].pStyle)
      });
      this.BuildRuntimeRuns(this.rtData, a),
        this.fmtText = this.CalcFromRuntime(this.rtData, this.limits),
        this.UpdateSpellCheckFormatting(),
        this.deferredRenderNeeded = !1
    }
  }

  SetText(e, t, a, r, i) {
    //'use strict';
    var n,
      o,
      s,
      l,
      S,
      c,
      u,
      p,
      d,
      D = this.DefaultPStyle(),
      g = [],
      h = !1,
      m = - 1,
      C = '',
      y = '';
    for (
      e = String(e).replace(/(\r\n|\r|\u2028|\u2029)/g, '\n').replace(/([\u0000-\u0008]|[\u000B-\u001F])/g, ''),
      null == a ? a = 0 : (a < 0 || a > this.rtData.text.length) &&
        (a = this.rtData.text.length),
      (null == r || r > this.rtData.text.length - a) &&
      (r = r = this.rtData.text.length - a),
      'number' == typeof t ? n = t : !this.rtData.text.length ||
        a >= this.rtData.text.length - 1 ? (n = Math.max(this.rtData.styles.length - 1, 0), h = !0) : r > 0 ? (
          n = this.GetFormatAtOffset(a).id,
          m = this.GetFormatAtOffset(a + r).id
        ) : (
        n = this.GetFormatAtOffset(a - 1).id,
        m = this.GetFormatAtOffset(a).id
      ),
      0 === a &&
      (h = !0),
      m < 0 &&
      (m = n),
      S = this.GetTextParagraphCount(e),
      (l = this.GetParagraphAtOffset(a)) >= 0 &&
      (D = this.rtData.styleRuns[l].pStyle),
      d = 0;
      d < S;
      d++
    ) g.push({
      // pStyle: Utils1.CopyObj(D)
      // Double
      pStyle: Utils1.CopyObj(D)
    });
    if (
      g = this.MergeParagraphInfo(g, a, r),
      a === this.rtData.text.length ? s = this.rtData.text + e : (
        a > 0 &&
        (C = this.rtData.text.slice(0, a)),
        a + r < this.rtData.text.length &&
        (y = this.rtData.text.slice(a + r)),
        s = C + e + y
      ),
      i ||
      !1 !== this.parent.CallEditCallback('onbeforeinsert', s)
    ) {
      if (
        this.rtData.text = s,
        this.contentVersion++,
        this.rtData.styles.length ||
        (
          this.rtData.styles = [
            new DefaultStyle() // new Formatter.DefaultStyle()/*FormatterDefaultStyle()*/
          ]
        ),
        c = this.GetFormatByID(n),
        u = this.GetFormatByID(m),
        c.hyperlink !== u.hyperlink &&
        (h = !0),
        (c.dataField || h) &&
        (
          (c = Utils1.CopyObj(c)).dataField = null,
          h &&
          (c.hyperlink = - 1),
          n = this.FindAddStyle(c)
        ),
        e.length
      ) {
        for (o = new Array(e.length), d = 0; d < e.length; d++) o[d] = n;
        this.rtData.charStyles.splice.apply(this.rtData.charStyles, [
          a,
          r
        ].concat(o)),
          t &&
          'object' == typeof t &&
          this.SetFormat(t, a, e.length)
      } else r &&
        (
          this.rtData.charStyles.splice(a, r),
          this.rtData.text.length ||
          (
            t &&
            'object' == typeof t &&
            (t.hyperlink = - 1, t.dataField = null, n = this.SetFormat(t, 0, 0)),
            t = this.GetFormatByID(n),
            this.rtData.styles = [
              Utils1.CopyObj(t)
            ]
          )
        );
      (p = this.renderingEnabled) &&
        this.SetRenderingEnabled(!1),
        this.BuildRuntimeRuns(this.rtData, g),
        this.AdjustSpellCheck(e),
        p &&
        this.SetRenderingEnabled(!0)
    }
  }

  GetText(e, t) {
    //'use strict';
    var a = '';
    return this.rtData.text.length ? (
      null == e ? e = 0 : e >= this.rtData.text.length &&
        (e = this.rtData.text.length - 1),
      (!t || e + t > this.rtData.text.length) &&
      (t = this.rtData.text.length - e),
      a = this.rtData.text.substr(e, t)
    ) : a
  }

  SetRuntimeText(e, t, a, r) {
    //'use strict';
    var i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p,
      d,
      D = '',
      g = '',
      h = [];
    if (e.styles && e.styles.length) {
      if (
        null == t ? t = 0 : (t < 0 || t > this.rtData.text.length) &&
          (t = this.rtData.text.length),
        (null == a || a > this.rtData.text.length - t) &&
        (a = this.rtData.text.length - t),
        u = 0 === t &&
        a == this.rtData.text.length,
        t === this.rtData.text.length ? o = this.rtData.text + e.text : (
          t > 0 &&
          (D = this.rtData.text.slice(0, t)),
          t + a < this.rtData.text.length &&
          (g = this.rtData.text.slice(t + a)),
          o = D + e.text + g
        ),
        !1 !== this.parent.CallEditCallback('onbeforeinsert', o)
      ) {
        if (
          this.rtData.text = o,
          this.contentVersion++,
          s = this.MergeParagraphInfo(e.paraInfo, t, a),
          e.hyperlinks.forEach(
            (
              function (e) {
                this.rtData.hyperlinks.push(String(e)),
                  h.push(this.rtData.hyperlinks.length - 1)
              }
            ),
            this
          ),
          e.styles.forEach(
            (
              function (e) {
                e.hyperlink >= 0 &&
                  e.hyperlink < h.length ? e.hyperlink = h[e.hyperlink] : e.hyperlink = - 1
              }
            ),
            this
          ),
          e.text.length
        ) {
          for (
            i = Utils1.CopyObj(e.charStyles),
            n = new Array(e.styles.length),
            d = i.length,
            p = 0;
            p < d;
            p++
          ) void 0 !== n[l = i[p]] ? S = n[l] : l < e.styles.length ? (S = this.FindAddStyle(e.styles[l]), n[l] = S) : (S = 0, n[l] = S),
            i[p] = S;
          this.rtData.charStyles.splice.apply(this.rtData.charStyles, [
            t,
            a
          ].concat(i))
        } else a ? this.rtData.charStyles.splice(t, a) : this.rtData.styles[0] = $.extend(!0, {
        }, e.styles[0]);
        r ||
          (this.parent.vAlign = e.vAlign),
          !this.parent.internalID &&
          e.internalID &&
          (this.parent.internalID = e.internalID),
          u &&
          (this.contentVersion = e.contentVersion),
          (c = this.renderingEnabled) &&
          this.SetRenderingEnabled(!1),
          this.BuildRuntimeRuns(this.rtData, s),
          this.AdjustSpellCheck(),
          c &&
          this.SetRenderingEnabled(!0)
      }
    } else this.SetText(e.text, null, t, a)
  }

  GetRuntimeText(e, t) {
    //'use strict';
    var a,
      r,
      i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p = {
        text: '',
        charStyles: [],
        styles: [],
        hyperlinks: []
      };
    for (
      null == e ? e = 0 : e >= this.rtData.text.length &&
        (e = this.rtData.text.length - 1),
      (!t || e + t > this.rtData.text.length) &&
      (t = this.rtData.text.length - e, r = this.rtData.text.length),
      i = this.GetParagraphAtOffset(e),
      n = this.GetParagraphAtOffset(r),
      this.rtData.styles.forEach((function (e) {
        p.styles.push(Utils1.CopyObj(e))
      }), this),
      p.styles.length ||
      p.styles.push(/*FormatterDefaultStyle()new Formatter.DefaultStyle()*/ new DefaultStyle()),
      this.rtData.hyperlinks.forEach((function (e) {
        p.hyperlinks.push(Utils1.CopyObj(e))
      }), this),
      p.text = this.rtData.text.substr(e, t),
      p.charStyles = this.rtData.charStyles.slice(e, e + t),
      o = Math.max(this.GetBulletIndent(), 8),
      p.paraInfo = [],
      S = i;
      S <= n;
      S++
    ) s = 'none' == (l = Utils1.CopyObj(this.rtData.styleRuns[S].pStyle)).bullet ? 0 : o,
      l.bindent = s,
      p.paraInfo.push({
        pStyle: l,
        offset: this.rtData.styleRuns[S].start
      });
    for (S = 0; S < p.styles.length; S++) if (p.styles[S].spError) if (
      (a = Utils1.CopyObj(p.styles[S])).spError = !1,
      (u = this.FindAddStyle(a, !0)) < 0
    ) p.styles[S].spError = !1;
    else for (c = 0; c < p.charStyles.length; c++) p.charStyles[c] == S &&
      (p.charStyles[c] = u);
    return this.TrimUnusedStyles(p),
      p.vAlign = this.parent.GetVerticalAlignment(),
      p.internalID = this.parent.internalID,
      p.contentVersion = this.contentVersion,
      p
  }

  DeleteText(e, t) {
    //'use strict';
    this.SetText('', null, e, t)
  }

  GetTextLength() {
    //'use strict';
    return this.rtData.text.length
  }

  GetTextFormatSize() {
    //'use strict';
    var e = Math.max(this.fmtText.width, this.limits.minWidth);
    return this.limits.maxWidth &&
      (e = Math.min(e, this.limits.maxWidth)),
    {
      width: e,
      height: this.fmtText.height
    }
  }

  GetContentVersion() {
    //'use strict';
    return this.contentVersion
  }

  GetSpellCheck() {
    //'use strict';
    return this.spellCheckEnabled
  }

  SpellCheckValid() {
    //'use strict';
    return this.spellCheckEnabled &&
      this.parent.doc.spellChecker &&
      this.parent.doc.spellChecker.GetActive() &&
      this.parent.IsActive()
  }

  SetSpellCheck(e) {
    //'use strict';
    this.spellCheckEnabled = e,
      e ||
      this.UpdateSpellCheckFormatting()
  }

  UpdateSpellCheck(e) {
    //'use strict';
    if (!this.SpellCheckValid()) return this.UpdateSpellCheckFormatting(),
      void this.parent.CallEditCallback('spellcheck');
    var t = this.GetWordList();
    this.MergeWordLists(e, t),
      this.UpdateSpellCheckFormatting(),
      this.parent.CallEditCallback('spellcheck')
  }

  UpdateSpellCheckFormatting() {
    //'use strict';
    if (!this.SpellCheckValid()) return this.SetFormat({
      spError: !1
    }),
      void (this.wordList = null);
    var e,
      t,
      a,
      r = this.GetWordList(),
      i = r.list.length;
    for (this.SetFormat({
      spError: !1
    }, null, null, !0), e = 0; e < i; e++) t = r.list[e].start,
      a = r.list[e].end,
      r.list[e].status != Text.Spell.WordState.WRONG ||
      this.IsDataFieldInRange(t, a) ||
      this.SetFormat({
        spError: !0
      }, t, r.list[e].word.length, !0);
    if (this.renderingEnabled) {
      var n = [];
      for (e = 0; e < this.rtData.styleRuns.length; e++) n.push({
        pStyle: Utils1.CopyObj(this.rtData.styleRuns[e].pStyle)
      });
      this.BuildRuntimeRuns(this.rtData, n),
        this.fmtText = this.CalcFromRuntime(this.rtData, this.limits)
    }
  }

  AdjustSpellCheck(e) {
    //'use strict';
    var t,
      a,
      r = e &&
        1 == e.length &&
        e.search(
          /[^\u0000-\u2FFF]|[A-Za-z0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F\u0386-\u04FF\u1E00-\u1FFF]/
        ) >= 0,
      i = !1;
    if (this.SpellCheckValid() && this.parent.IsActive()) {
      if (a = this.GetWordList(), !r) for (t = 0; t < a.list.length; t++) a.list[t].status == Text.Spell.WordState.NOTPROCESSED &&
        (i = !0);
      i ? this.parent.DoSpellCheck() : this.UpdateSpellCheckFormatting()
    } else this.wordList = null
  }

  GetSpellAtPoint(e) {
    //'use strict';
    var t,
      a,
      r,
      i,
      n = null,
      o = null,
      s = null,
      l = - 1;
    if (e.y < 0 || e.y > this.fmtText.height) return - 1;
    for (t = 0; t < this.renderedLines.length; t++) if (
      e.y >= this.renderedLines[t].top &&
      e.y <= this.renderedLines[t].bottom
    ) {
      if (
        e.x < this.renderedLines[t].left ||
        e.x > this.renderedLines[t].right
      ) break;
      for (i = this.renderedLines[t].runs.length, a = 0; a < i; a++) if (e.x <= this.renderedLines[t].runs[a].right) {
        o = this.renderedLines[t],
          s = this.renderedLines[t].runs[a];
        break
      }
      break
    }
    if (o && s) {
      for (
        this.BuildRuntimeCharPos(o, s),
        i = s.charPos.length,
        r = s.left,
        l = s.runRec.dispStart,
        t = 0;
        t < i;
        t++
      ) {
        if (s.charPos[t] > e.x) {
          (r + s.charPos[t]) / 2 < e.x &&
            l++;
          break
        }
        r = s.charPos[t],
          l++
      }
      n = this.GetFormatAtOffset(l)
    }
    return n &&
      n.style &&
      n.style.spError ||
      (l = - 1),
      l
  }

  CalcTextFit(e) {
    //'use strict';
    var t,
      a = {};
    return e &&
      (a.maxWidth = e),
    {
      width: (t = this.CalcFromRuntime(this.rtData, a)).dispMinWidth,
      height: t.height
    }
  }

  CalcTextWrap(e) {
    //'use strict';
    var t,
      a = {};
    e &&
      (a.maxWidth = e),
      t = this.CalcFromRuntime(this.rtData, a);
    var r,
      i,
      n,
      o,
      s = [];
    for (r = 0; r < t.paragraphs.length; r++) for (
      (o = t.paragraphs[r]).lines.length ||
      (n = o.start, s.push(n)),
      i = 0;
      i < o.lines.length;
      i++
    ) n = o.lines[i].start,
      s.push(n);
    return s
  }

  CalcFormatChange(e) {
    //'use strict';
    var t,
      a,
      r,
      i,
      n,
      o,
      s = [];
    for (o = Utils1.CopyObj(this.rtData), a = 0; a < o.styles.length; a++) o.styles[a] = this.MergeStyles(e, o.styles[a]);
    for (a = this.fmtText.paragraphs.length - 1; a >= 0; a--) for (
      r = (i = this.fmtText.paragraphs[a]).lines.length - 1;
      r > 0 &&
      0 !== (n = i.lines[r].start);
      r--
    ) o.text = o.text.slice(0, n) + '\n' + o.text.slice(n),
      o.charStyles.splice(n, 0, o.charStyles[n - 1]);
    for (a = 0; a < this.rtData.styleRuns.length; a++) s.push({
      pStyle: Utils1.CopyObj(this.rtData.styleRuns[a].pStyle)
    });
    return this.BuildRuntimeRuns(o, s),
    {
      width: (t = this.CalcFromRuntime(o, {
        maxWidth: 32000
      })).width,
      height: t.height
    }
  }

  GetHitInfo(e) {
    //'use strict';
    var t,
      a,
      r,
      i,
      n,
      o,
      s,
      l,
      S,
      c = e.x,
      u = e.y,
      p = - 1,
      d = - 1,
      D = {
        index: 0,
        rLine: 0,
        rRun: 0,
        fPara: 0,
        fLine: 0,
        fRun: 0
      };
    if (u < 0) return D;
    if (u > this.fmtText.height) return D.index = this.fmtText.text.length,
      D.rLine = this.renderedLines.length,
      D.fPara = this.fmtText.paragraphs.length,
      D;
    for (n = 0; n < this.renderedLines.length; n++) if (
      u >= this.renderedLines[n].top &&
      u <= this.renderedLines[n].bottom
    ) {
      for (
        p = n,
        d = - 1,
        s = this.renderedLines[n].runs.length,
        o = 0;
        o < s &&
        (d = o, !(c < this.renderedLines[n].runs[o].right));
        o++
      );
      break
    }
    if (p < 0) return D;
    if (
      D.rLine = p,
      D.rRun = d,
      a = (i = this.renderedLines[p]).paraIndex,
      p = i.lineIndex,
      D.fPara = a,
      D.fLine = p,
      d < 0
    ) return D.pRun = 0,
      D.rRun = 0,
      this.fmtText.paragraphs[a].lines[p].runs.length > 0 ? D.index = this.fmtText.paragraphs[a].lines[p].runs[0].dispStart : D.index = this.fmtText.paragraphs[a].lines[p].start,
      this.IsDataFieldAtPos(D.index) &&
      (D.inDataField = !0, D.dataFieldInfo = this.GetDataField(D.index)),
      D;
    if (
      d = (r = i.runs[d]).runIndex,
      D.fRun = d,
      this.BuildRuntimeCharPos(i, r),
      s = r.charPos.length,
      S = this.fmtText.paragraphs[a].lines[p].runs[d],
      c <= r.left
    ) t = S.dispStart;
    else for (t = S.dispStart, l = r.left, n = 0; n < s; n++) {
      if (r.charPos[n] > c) {
        (l + r.charPos[n]) / 2 < c &&
          t++;
        break
      }
      l = r.charPos[n],
        t++
    }
    return D.index = t,
      D
  }

  static FindPrevNextWord(e, t, a) {
    var r,
      i = e.length,
      n = /[ \f\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]/,
      o = /[`~!@#$%\^&?*()_\-+={}\[\]|\\;:'",.<>\/]/,
      s = /[^\s`~!@#$%\^&?*()_\-+={}\[\]|\\;:'",.<>\/]/,
      l = function (e) {
        return n.test(e) ? n : o.test(e) ? o : s.test(e) ? s : null
      };
    if (a && t > 0) {
      for (t--; n.test(e[t]) && t > 0;) t--;
      if ((r = l(e[t])) && t > 0) for (; r.test(e[t - 1]) && t > 0;) t--
    } else if (t < i) {
      if (r = l(e[t])) for (; r.test(e[t]) && t < i;) t++;
      else t < i &&
        t++;
      for (; n.test(e[t]) && t < i;) t++
    }
    return t
  }

  GetAdjacentChar(e, t, a, r) {
    //'use strict';
    var i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p,
      d = !0,
      D = r &&
        r.ctrlKey,
      g = {
        x: 0,
        y: 0
      },
      h = {
        index: e,
        line: t
      };
    if ('prev' == a || 'next' == a) switch (
      S = c = e,
      (i = this.GetRenderedCharInfo(e, t)).rLine >= 0 &&
      (n = this.renderedLines[i.rLine]) &&
      n.runs.length &&
      (
        S = (o = n.runs[0].runRec).dispStart,
        c = (o = n.runs[n.runs.length - 1].runRec).dispStart + o.dispLen
      ),
      a
    ) {
        case 'prev':
          e > 0 &&
            (
              D ? (
                h.index = Formatter.FindPrevNextWord(this.fmtText.text, e, !0),
                h.index < S &&
                h.line--
              ) : h.index--
            ),
            d = !1;
          break;
        case 'next':
          e < this.fmtText.text.length &&
            (
              D ? (
                h.index = Formatter.FindPrevNextWord(this.fmtText.text, e, !1),
                h.index > c &&
                h.line++
              ) : h.index++
            )
      } else if ('home' == a || 'end' == a) if (D) switch (h.line = void 0, a) {
        case 'home':
          h.index = 0,
            d = !1;
          break;
        case 'end':
          h.index = this.fmtText.text.length
      } else {
        if ((i = this.GetRenderedCharInfo(e, t)).rLine < 0) return h;
        if (
          h.line = i.rLine,
          !(n = this.renderedLines[i.rLine]) ||
          !n.runs.length
        ) return h;
        switch (
        S = (o = n.runs[0].runRec).dispStart,
        c = (o = n.runs[n.runs.length - 1].runRec).dispStart + o.dispLen,
        a
        ) {
          case 'home':
            h.index = S,
              d = !1;
            break;
          case 'end':
            h.index = c
        }
      } else {
      if ((i = this.GetRenderedCharInfo(e, t)).rLine < 0) return h;
      switch (
      S = e,
      c = e,
      D &&
      (n = this.renderedLines[i.rLine]) &&
      n.runs.length &&
      (S = (o = n.runs[0].runRec).dispStart, c = o.dispStart + o.dispLen),
      a
      ) {
        case 'up':
          i.rLine > 0 ? (
            n = this.renderedLines[i.rLine - 1],
            D ? S == e ? n.runs.length &&
              (o = n.runs[0].runRec, h.index = o.dispStart, h.line = i.rLine - 1) : (h.index = S, h.line = i.rLine) : (
              s = n.lineRec,
              g.x = i.left,
              g.y = s.yOffset + s.height / 2,
              (l = this.GetHitInfo(g)).index >= 0 &&
              (h.index = l.index, h.line = i.rLine - 1)
            )
          ) : D &&
          (h.index = S, h.line = i.rLine),
            d = !1;
          break;
        case 'down':
          i.rLine < this.renderedLines.length - 1 ? (
            n = this.renderedLines[i.rLine + 1],
            D ? n.runs.length &&
              (o = n.runs[0].runRec, h.index = o.dispStart, h.line = i.rLine + 1) : (
              s = n.lineRec,
              g.x = i.left,
              g.y = s.yOffset + s.height / 2,
              (l = this.GetHitInfo(g)).index >= 0 &&
              (h.index = l.index, h.line = i.rLine + 1)
            )
          ) : D &&
          (h.index = c, h.line = i.rLine)
      }
    }
    return h.index > 0 &&
      h.index < this.fmtText.text.length &&
      (u = this.GetDataField(h.index)) &&
      (
        p = h.index,
        d ? h.index > u.startPos &&
          (h.index = u.endPos) : h.index = u.startPos,
        p != h.index &&
        (i = this.GetRenderedCharInfo(h.index)).rLine >= 0 &&
        (d && i.rLine > h.line || !d && i.rLine < h.line) &&
        (h.line = i.rLine)
      ),
      h
  }

  GetRenderedCharInfo(e, t) {
    //'use strict';
    var a,
      r,
      i,
      n,
      o,
      s = this.GetTextFormatSize(),
      l = {
        rLine: - 1,
        rRun: - 1,
        rChar: - 1,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      };
    if (e < 0) {
      if (void 0 === t) return l;
      l.rLine = t,
        n = (r = this.renderedLines[t]).lineRec
    } else for (
      a = 0;
      a < this.renderedLines.length &&
      (
        l.rLine = a,
        !(e < (n = (r = this.renderedLines[a]).lineRec).start + n.length)
      );
      a++
    );
    if (l.rLine < 0) return l;
    if (
      l.rLine > 0 &&
      e >= 0 &&
      e < r.dispStart &&
      (l.rLine--, n = (r = this.renderedLines[l.rLine]).lineRec),
      (void 0 === t || t < 0) &&
      (t = - 2),
      e === n.start &&
      t === l.rLine - 1 &&
      (l.rLine = t, n = (r = this.renderedLines[l.rLine]).lineRec),
      l.top = Math.max(0, Math.min(s.height, r.top)),
      l.bottom = Math.max(0, Math.min(s.height, r.bottom)),
      e < 0
    ) return l.left = Math.max(0, Math.min(s.width, r.left)),
      l.right = Math.max(0, Math.min(s.width, r.right)),
      l;
    for (
      a = 0;
      a < r.runs.length &&
      (l.rRun = a, !(e < (o = (i = r.runs[a]).runRec).start + o.length));
      a++
    );
    return l.rRun < 0 ? (l.left = r.left, l.right = r.left) : e >= n.start + n.length ? (l.left = r.right, l.right = r.right, l.rChar = n.length) : (
      this.BuildRuntimeCharPos(r, i),
      l.rChar = e - o.dispStart,
      l.rChar < 0 ? (l.rChar = - 1, l.left = i.left, l.right = i.left) : l.rChar >= i.charPos.length ? (
        l.rChar = i.charPos.length,
        l.rChar > 0 ? (l.left = i.charPos[l.rChar - 1], l.right = l.left) : (l.left = i.right, l.right = i.right)
      ) : (
        l.left = i.left,
        l.right = i.charPos[l.rChar],
        l.rChar > 0 &&
        (l.left = i.charPos[l.rChar - 1])
      )
    ),
      l.left = Math.max(0, Math.min(s.width, l.left)),
      l.right = Math.max(0, Math.min(s.width, l.right)),
      l
  }

  GetRenderedRange(e, t) {
    //'use strict';
    var a,
      r,
      i,
      n,
      o,
      s = [];
    if (e > t || e < 0 || t < 0) return s;
    if (
      a = this.GetRenderedCharInfo(e),
      r = this.GetRenderedCharInfo(t),
      a.rLine === r.rLine
    ) s.push({
      left: a.left,
      top: a.top,
      right: r.left,
      bottom: r.bottom
    });
    else for (n = a.rLine; n <= r.rLine; n++) o = {
      left: (i = this.GetRenderedCharInfo(- 1, n)).left,
      top: i.top,
      right: i.right,
      bottom: i.bottom
    },
      n === a.rLine ? o.left = a.left : n === r.rLine &&
        (o.right = r.left),
      s.push(o);
    for (n = 0; n < s.length; n++) s[n].left < 0 &&
      (s[n].left = 0),
      s[n].right < s[n].left &&
      (s[n].right = s[n].left),
      this.limits.maxWidth &&
      s[n].right > this.limits.maxWidth &&
      (s[n].right = this.limits.maxWidth);
    return s
  }

  BuildRuntimeCharPos(e, t) {
    //'use strict';
    var a,
      r,
      i,
      n,
      o = t.elem ? t.elem.node : null,
      s = t.runRec;
    if (void 0 === t.charPos) {
      for (
        t.charPos = [],
        a = t.left,
        t.isTab &&
        e.pStyle.tabspace &&
        (a -= a % e.pStyle.tabspace),
        n = 0;
        o &&
        n < s.dispLen;
        n++
      ) t.isTab ? a += e.pStyle.tabspace : a = t.left + Formatter.GetRunPositionForChar(o, n, !1, t.cache, t.left),
        t.charPos.push(a);
      for (i = s.length - (s.dispStart - s.start), n = t.charPos.length; n < i; n++) {
        if (r = s.dispStart + n, t.isTab) a += e.pStyle.tabspace;
        else {
          if (' ' != this.fmtText.text[r]) break;
          a += s.space
        }
        t.charPos.push(a)
      }
    }
  }

  GetWordAtIndex(e) {
    //'use strict';
    var t,
      a,
      r = {
        start: e,
        end: e
      };
    for (a = this.GetWordList(), t = 0; t < a.list.length; t++) if (e >= a.list[t].start && e < a.list[t].end) {
      r.start = a.list[t].start,
        r.end = a.list[t].end;
      break
    }
    return r
  }

  GetWordList() {
    //'use strict';
    var e;
    return this.wordList &&
      this.wordList.sessionID == this.GetContentVersion() ||
      (
        e = this.wordList,
        this.wordList = this.BuildWordList(),
        e &&
        this.MergeWordLists(e, this.wordList)
      ),
      this.wordList
  }

  MergeWordLists(e, t) {
    //'use strict';
    var a,
      r,
      i;
    for (a = 0; a < e.list.length; a++) for (r = e.list[a], i = 0; i < t.list.length; i++) if (t.list[i].word == r.word) {
      t.list[i].status = r.status,
        t.list[i].auto = r.auto,
        t.list[i].needSuggest = r.needSuggest,
        t.list[i].suggestions = r.suggestions;
      break
    }
  }

  BuildWordList() {
    //'use strict';
    var e,
      t,
      a,
      r = {};
    for (
      r.textID = this.parent.GetInternalID(),
      r.sessionID = this.GetContentVersion(),
      r.list = [],
      t = /(([^\u0000-\u2FFF]|[A-Za-z0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F\u0386-\u04FF\u1E00-\u1FFF])+)(([\u0027\u0060\u2018\u2019\u2032](([^\u0000-\u2FFF]|[A-Za-z0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F\u0386-\u04FF\u1E00-\u1FFF])+))*)/g;
      null != (e = t.exec(this.rtData.text));
    ) a = e[0].replace(/[\u0027\u0060\u2018\u2019\u2032]/g, '\''),
      r.list.push({
        word: a,
        start: e.index,
        end: e.index + e[0].length,
        status: Spell.WordState.NOTPROCESSED,
        auto: !1,
        needSuggest: !0,
        suggestions: null
      });
    return r
  }

  SetFormat(e, t, a, r) {
    //'use strict';
    var i,
      n,
      o,
      s = [],
      l = - 1,
      S = !1;
    if (0 === e.size) return - 1;
    if (
      null == t ? t = 0 : t >= this.rtData.text.length &&
        (t = this.rtData.text.length - 1),
      (null == a || t + a > this.rtData.text.length) &&
      (a = this.rtData.text.length - t),
      e.font &&
      !e.type &&
      (e.type = this.parent.doc.GetFontType(e.font)),
      !(a > 0)
    ) return l = this.SetRuntimeCharFormat(t, e, !1),
      this.rtData.text.length ||
      (n = this.rtData.styles[l], this.rtData.styles = [
        n
      ], l = 0),
      l;
    for (i = 0; i < a; i++) o = i + t,
      this.rtData.charStyles[o] != this.SetRuntimeCharFormat(o, e, !0) &&
      (S = !0);
    if (r || !S) return - 1;
    for (
      l = this.rtData.styles.length - 1,
      i = 0;
      i < this.rtData.charStyles.length;
      i++
    ) if (0 === i) l = this.rtData.charStyles[i];
      else if (this.rtData.charStyles[i] != l) {
        l = - 1;
        break
      }
    if (l >= 0) for (
      n = this.rtData.styles[l],
      this.rtData.styles = [
        n
      ],
      i = 0;
      i < this.rtData.charStyles.length;
      i++
    ) this.rtData.charStyles[i] = 0;
    return this.rtData.styleRuns.forEach((function (e) {
      s.push({
        pStyle: e.pStyle
      })
    }), this),
      this.BuildRuntimeRuns(this.rtData, s),
      this.fmtText = this.CalcFromRuntime(this.rtData, this.limits),
      this.parent.CallEditCallback('select'),
      - 1
  }

  GetFormatAtOffset(e, t) {
    //'use strict';
    var a = 0,
      r = new DefaultStyle();// new Formatter.DefaultStyle()/* FormatterDefaultStyle()*/;
    return e >= (t = t || this.rtData).charStyles.length &&
      (e = t.charStyles.length - 1),
      e < 0 &&
      (e = 0),
      e < t.charStyles.length ? (a = t.charStyles[e]) < t.styles.length &&
        (r = t.styles[a]) : t.styles.length > 0 &&
      (a = t.styles.length - 1, r = t.styles[a]),
    {
      id: a,
      style: r
    }
  }

  GetFormatByID(e) {
    //'use strict';
    var t = new DefaultStyle();// new Formatter.DefaultStyle()/*FormatterDefaultStyle()*/;
    return e >= 0 &&
      e < this.rtData.styles.length &&
      (t = this.rtData.styles[e]),
      t
  }

  SetParagraphStyle(e, t, a) {
    //'use strict';
    var r,
      i,
      n,
      o;
    if (
      null == t ? t = 0 : t > this.rtData.text.length &&
        (t = this.rtData.text.length),
      i = null == a ||
        t + a > this.rtData.text.length ? this.rtData.text.length : t + a,
      n = this.GetParagraphAtOffset(t),
      o = this.GetParagraphAtOffset(i),
      !(n < 0)
    ) {
      for (
        e.bullet &&
        'none' != e.bullet &&
        (e.lindent = 0, e.pindent = 0),
        r = n;
        r <= o;
        r++
      ) void 0 !== e.just &&
        (this.rtData.styleRuns[r].pStyle.just = e.just),
        void 0 !== e.bullet &&
        (this.rtData.styleRuns[r].pStyle.bullet = e.bullet),
        void 0 !== e.spacing &&
        (this.rtData.styleRuns[r].pStyle.spacing = Number(e.spacing)),
        void 0 !== e.pindent &&
        (this.rtData.styleRuns[r].pStyle.pindent = Number(e.pindent)),
        void 0 !== e.lindent &&
        (this.rtData.styleRuns[r].pStyle.lindent = Number(e.lindent)),
        void 0 !== e.rindent &&
        (this.rtData.styleRuns[r].pStyle.rindent = Number(e.rindent)),
        void 0 !== e.tabspace &&
        (this.rtData.styleRuns[r].pStyle.tabspace = Number(e.tabspace));
      this.fmtText = this.CalcFromRuntime(this.rtData, this.limits)
    }
  }

  GetParagraphStyle(e) {
    //'use strict';
    var t,
      a = this.DefaultPStyle();
    return (t = this.GetParagraphAtOffset(e)) >= 0 &&
      (a = Utils1.CopyObj(this.rtData.styleRuns[t].pStyle)),
      a
  }

  GetParagraphAtOffset(e) {
    //'use strict';
    var t;
    for (t = 0; t < this.rtData.styleRuns.length; t++) if (
      e < this.rtData.styleRuns[t].start + this.rtData.styleRuns[t].nChars
    ) return t;
    return this.rtData.styleRuns.length - 1
  }

  GetParagraphCount() {
    //'use strict';
    return this.rtData.styleRuns.length
  }

  GetParagraphPosition(e) {
    //'use strict';
    return e < this.rtData.styleRuns.length ? this.rtData.styleRuns[e].start : - 1
  }

  GetCommonFormatForRange(e, t) {
    //'use strict';
    var a,
      r,
      i,
      n = {};
    if (
      (void 0 === e || e < 0) &&
      (e = 0),
      (void 0 === t || t < 0 || t > this.rtData.charStyles.length - e) &&
      (t = Math.max(this.rtData.charStyles.length - e, 0)),
      !t ||
      e >= this.rtData.charStyles.length
    ) n = Utils1.CopyObj(this.GetFormatAtOffset(e - 1).style);
    else for (
      (r = this.rtData.charStyles[e]) >= 0 &&
      r < this.rtData.styles.length &&
      (n = Utils1.CopyObj(this.rtData.styles[r])),
      i = 1;
      i < t;
      i++
    ) (a = this.rtData.charStyles[e + i]) != r &&
      (r = a, n = this.AndStyles(n, this.rtData.styles[a]));
    return n
  }

  GetFormatRangeAtIndex(e, t) {
    //'use strict';
    var a,
      r,
      i,
      n,
      o,
      s;
    if (!this.IsFormatAtIndex(e, t)) return {
      start: - 1,
      end: - 1
    };
    for (
      i = this.rtData.charStyles.length,
      a = t = Math.max(Math.min(t, i - 1), 0),
      r = t,
      s = - 1,
      n = t - 1;
      n >= 0 &&
      ((o = this.rtData.charStyles[n]) === s || this.IsFormatAtIndex(e, n));
      n--
    ) a = n,
      s = o;
    for (
      s = - 1,
      n = t + 1;
      n < i &&
      ((o = this.rtData.charStyles[n]) === s || this.IsFormatAtIndex(e, n));
      n++
    ) r = n,
      s = o;
    return {
      start: a,
      end: r
    }
  }

  IsFormatAtIndex(e, t) {
    //'use strict';
    var a = this.GetFormatAtOffset(t);
    return this.MatchPartialStyles(a.style, e)
  }

  GetFormatTextMinDimensions() {
    // //'use strict';

    const width = this.fmtText.width;
    const height = this.fmtText.height;

    return { width: width, height: height };
    // return {
    //   width: this.fmtText.width,
    //   height: this.fmtText.height
    // }
  }

  SetHyperlink(e, t, a) {
    //'use strict';
    var r,
      i,
      n,
      o,
      s,
      l,
      S,
      c = !1;
    for (
      null == (s = t) ? s = 0 : s >= this.rtData.text.length &&
        (s = this.rtData.text.length - 1),
      l = null == a ||
        s + a > this.rtData.text.length ? this.rtData.text.length : s + a,
      (n = this.GetHyperlinkAtOffset(s)) &&
      (
        s = (o = this.GetFormatRangeAtIndex({
          hyperlink: n.id
        }, s)).start,
        o.end >= l &&
        (l = o.end + 1, c = !0)
      ),
      l > s + 1 &&
      !c &&
      (n = this.GetHyperlinkAtOffset(l - 1)) &&
      (l = (o = this.GetFormatRangeAtIndex({
        hyperlink: n.id
      }, l - 1)).end + 1),
      s == l &&
      (s = (o = this.GetWordAtIndex(s)).start, l = o.end),
      s == l &&
      l++,
      S = s;
      S < l;
      S++
    ) (r = this.GetFormatAtOffset(S).style).hyperlink >= 0 &&
      this.RemoveHyperlink(r.hyperlink);
    i = this.rtData.hyperlinks.length,
      this.rtData.hyperlinks.push(e),
      a = l - s,
      this.SetFormat({
        hyperlink: i
      }, s, a)
  }

  GetHyperlinkAtOffset(e) {
    //'use strict';
    var t = this.GetFormatAtOffset(e).style;
    return void 0 === t.hyperlink ||
      t.hyperlink < 0 ||
      t.hyperlink >= this.rtData.hyperlinks.length ? null : {
      url: this.rtData.hyperlinks[t.hyperlink],
      id: t.hyperlink
    }
  }

  GetHyperlinkAtPoint(e) {
    //'use strict';
    var t,
      a,
      r,
      i,
      n = - 1;
    if (e.y < 0 || e.y > this.fmtText.height) return null;
    for (t = 0; t < this.renderedLines.length; t++) if (
      e.y >= this.renderedLines[t].top &&
      e.y <= this.renderedLines[t].bottom
    ) {
      if (
        e.x < this.renderedLines[t].left ||
        e.x > this.renderedLines[t].right
      ) break;
      for (i = this.renderedLines[t].runs.length, a = 0; a < i; a++) if (e.x <= this.renderedLines[t].runs[a].right) {
        n = this.renderedLines[t].runs[a].runRec.style;
        break
      }
      break
    }
    return n >= 0 ? void 0 === (r = this.fmtText.styles[n].hyperlink) ||
      r < 0 ||
      r >= this.rtData.hyperlinks.length ? null : {
      url: this.rtData.hyperlinks[r],
      id: r
    }
      : null
  }

  ClearHyperlink(e) {
    //'use strict';
    var t = this.GetHyperlinkAtOffset(e);
    t &&
      (
        this.RemoveHyperlink(t.id),
        this.fmtText = this.CalcFromRuntime(this.rtData, this.limits)
      )
  }

  RemoveHyperlink(e) {
    //'use strict';
    var t;
    if (!(e < 0 && e >= this.rtData.hyperlinks.length)) for (
      this.rtData.hyperlinks.splice(e, 1),
      t = 0;
      t < this.rtData.styles.length;
      t++
    ) this.rtData.styles[t].hyperlink === e ? this.rtData.styles[t].hyperlink = - 1 : this.rtData.styles[t].hyperlink > e &&
      this.rtData.styles[t].hyperlink--
  }

  SetHyperlinkCursor() {
    //'use strict';
    var e,
      t,
      a,
      r;
    for (e = 0; e < this.renderedLines.length; e++) for (t = 0; t < this.renderedLines[e].runs.length; t++) a = this.renderedLines[e].runs[t].runRec.style,
      this.rtData.styles[a].hyperlink >= 0 &&
      (r = this.renderedLines[e].runs[t].elem) &&
      r.node.setAttribute('class', Element.CursorType.POINTER)
  }

  RenderFormattedText(e, t) {
    //'use strict';
    var a,
      r,
      i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p,
      d,
      D = [],
      g = [],
      h = e.parent;
    for (
      h &&
      (d = e.position(), h.remove(e)),
      e.clear(),
      e.attr('xml:space', 'preserve'),
      this.renderedLines = [],
      this.renderedDataFields = [],
      t.clear(),
      this.fmtText.paragraphs.forEach(
        (
          function (d, h) {
            s = null,
              'none' != d.pStyle.bullet &&
              d.bindent &&
              (
                s = {
                  bullet: d.pStyle.bullet,
                  xPos: 0,
                  yPos: d.yOffset,
                  indent: d.bindent,
                  height: d.height,
                  ascent: d.height / 2,
                  hasText: !1,
                  style: this.GetBulletStyle(h)
                }
              ),
              d.lines.forEach(
                (
                  function (t, m) {
                    switch (
                    i = 0,
                    n = t.width + d.bindent,
                    l = this.fmtText.fmtWidth - (t.indent + d.pStyle.rindent),
                    d.pStyle.just
                    ) {
                      case 'center':
                        i = (l - n) / 2;
                        break;
                      case 'right':
                        i = l - n
                    }
                    for (
                      i += t.indent,
                      s &&
                      0 === m &&
                      (s.xPos = i, s.yPos = t.yOffset, s.ascent = t.ascent),
                      i += t.bindent,
                      o = {
                        paraIndex: h,
                        lineIndex: m,
                        lineRec: t,
                        left: i,
                        right: i,
                        top: t.yOffset,
                        bottom: t.yOffset + t.height,
                        dispStart: t.start,
                        pStyle: d.pStyle,
                        runs: []
                      },
                      c = 0;
                      c < t.spErrors.length;
                      c++
                    ) g.push({
                      x: i + t.spErrors[c].startPos,
                      y: t.yOffset + t.ascent,
                      width: t.spErrors[c].endPos - t.spErrors[c].startPos
                    });
                    for (c = 0; c < t.dataFields.length; c++) this.renderedDataFields.push({
                      x: i + t.dataFields[c].startPos,
                      y: t.yOffset,
                      width: t.dataFields[c].endPos - t.dataFields[c].startPos,
                      height: t.height,
                      fieldID: t.dataFields[c].fieldID
                    });
                    t.runs.forEach(
                      (
                        function (n, l) {
                          s &&
                            (s.hasText = n.width > 0),
                            u = null,
                            p = null,
                            a = this.fmtText.styles[n.style],
                            r = this.fmtText.text.substr(n.dispStart, n.dispLen);
                          var c = !1,
                            d = this.parent.dataStyleOverride ||
                            {
                            };
                          d._curFieldDecoration = null,
                            d._curFieldStyle = null,
                            n.dispLen > 0 &&
                            !n.isTab &&
                            (
                              a.dataField &&
                              (d._curFieldStyle = this.parent.GetDataStyle(a.dataField)),
                              (
                                u = Formatter.CreateTextRunElem(r, a, this.parent.doc, this.parent.linksDisabled, d)
                              ).attr('x', Global.RoundCoord(i)),
                              u.attr('text-anchor', 'start'),
                              u.attr(
                                'y',
                                Global.RoundCoord(t.yOffset + t.ascent + n.extraYOffset)
                              ),
                              u.attr('textLength', n.dispWidth),
                              this.parent.linksDisabled ||
                              (
                                this.AttachHyperlinkToRun(u, a) ||
                                (a.hyperlink = - 1),
                                c = a.hyperlink >= 0
                              ),
                              e.add(u),
                              p = this.parent.doc.GetTextRunCache(a, r)
                            ),
                            ('underline' == (d._curFieldDecoration || a.decoration) || c) &&
                            n.extraYOffset <= 0 &&
                            (
                              S = c ? '#0000FF' : a.color,
                              D.push({
                                x: i,
                                y: t.yOffset + t.ascent,
                                width: n.width,
                                color: S
                              })
                            ),
                            o.runs.length ||
                            (o.dispStart = n.dispStart),
                            o.runs.push({
                              runIndex: l,
                              runRec: n,
                              left: i,
                              right: i + n.width,
                              isTab: n.isTab,
                              elem: u,
                              cache: p
                            }),
                            i += n.width
                        }
                      ),
                      this
                    ),
                      o.right = i,
                      this.renderedLines.push(o)
                  }
                ),
                this
              ),
              s &&
              s.hasText &&
              this.RenderBullet(s, t)
          }
        ),
        this
      ),
      c = 0;
      c < D.length;
      c++
    ) this.RenderUnderline(D[c], t);
    if (this.SpellCheckValid()) for (c = 0; c < g.length; c++) this.RenderSpellError(g[c], t);
    this.parent.IsActive() &&
      this.RenderDataFieldHilites(t),
      h &&
      h.add(e, d)
  }

  AttachHyperlinkToRun(e, t) {
    if (
      !(
        void 0 === t.hyperlink ||
        t.hyperlink < 0 ||
        t.hyperlink >= this.fmtText.hyperlinks.length
      )
    ) {
      var a = this.fmtText.hyperlinks[t.hyperlink],
        r = Global.ResolveHyperlinkForDisplay(a);
      return !!(a = Global.ResolveHyperlink(a)) &&
        (
          e.node.setAttribute('_explink_', a),
          Basic.Element.SetTooltipOnElement(e, r),
          !0
        )
    }
  }

  RenderUnderline(e, t) {
    //'use strict';
    var a = new T3Svg.Path;
    a.plot(
      'M' + Global.RoundCoord(e.x) + ',' + (Global.RoundCoord(e.y) + 2) + 'h' + Global.RoundCoord(e.width)
    ),
      a.attr('stroke-width', 1),
      a.attr('stroke', e.color),
      a.attr('fill', 'none'),
      t.add(a)
  }

  RenderSpellError(e, t) {
    //'use strict';
    var a,
      r,
      i,
      n,
      o,
      s = new T3Svg.Path;
    a = e.x,
      r = e.y + 2,
      i = 1,
      o = a + e.width,
      n = 'M' + a + ',' + (r + i);
    do {
      n += 'L' + (a += 2) + ',' + (r + (i = - i))
    } while (a < o);
    s.plot(n),
      s.attr('stroke-width', 1),
      s.attr('stroke-opacity', 0.7),
      s.attr('stroke', '#FF0000'),
      s.attr('fill', 'none'),
      s.node.setAttribute('no-export', '1'),
      t.add(s)
  }

  RenderDataFieldHilites(e) {
    //'use strict';
    var t,
      a,
      r,
      i;
    if (this.renderedDataFields) for (
      this.ClearDataFieldHilites(e),
      t = 0;
      t < this.renderedDataFields.length;
      t++
    ) r = this.renderedDataFields[t],
      i = this.parent.GetDataText(r.fieldID, !0),
      (a = new T3Svg.Container(T3Svg.create('rect'))).move(r.x, r.y),
      a.size(r.width, r.height),
      a.attr('fill', '#A6F8CD'),
      a.attr('stroke-width', 0),
      a.attr('fill-opacity', 0.4),
      a.attr('pointer-events', 'fill'),
      a.node.setAttribute('no-export', '1'),
      Basic.Element.SetTooltipOnElement(a, i),
      e.add(a),
      r.elem = a
  }

  ClearDataFieldHilites(e) {
    //'use strict';
    var t,
      a;
    if (this.renderedDataFields) for (t = 0; t < this.renderedDataFields.length; t++) (a = this.renderedDataFields[t].elem) &&
      (e.remove(a), this.renderedDataFields[t].elem = null)
  }

  RenderBullet(e, t) {
    //'use strict';
    var a,
      r,
      i,
      n = Math.max(4, e.indent / 2),
      o = e.style.color,
      s = !1,
      l = !1,
      S = null;
    switch (e.bullet) {
      case 'hround':
        (
          S = this.parent.doc.CreateShape(Document.CreateShapeType.OVAL)
        ).SetSize(n, n),
          l = !0;
        break;
      case 'sround':
        (
          S = this.parent.doc.CreateShape(Document.CreateShapeType.OVAL)
        ).SetSize(n, n),
          s = !0;
        break;
      case 'hsquare':
        (
          S = this.parent.doc.CreateShape(Document.CreateShapeType.RECT)
        ).SetSize(n, n),
          l = !0;
        break;
      case 'ssquare':
        (
          S = this.parent.doc.CreateShape(Document.CreateShapeType.RECT)
        ).SetSize(n, n),
          s = !0;
        break;
      case 'diamond':
        (
          S = this.parent.doc.CreateShape(Document.CreateShapeType.POLYGON)
        ).SetPoints([{
          x: n / 2,
          y: 0
        },
        {
          x: n,
          y: n / 2
        },
        {
          x: n / 2,
          y: n
        },
        {
          x: 0,
          y: n / 2
        }
        ]),
          s = !0;
        break;
      case 'chevron':
        (
          S = this.parent.doc.CreateShape(Document.CreateShapeType.POLYGON)
        ).SetPoints([{
          x: 0,
          y: 0
        },
        {
          x: n,
          y: n / 2
        },
        {
          x: 0,
          y: n
        },
        {
          x: n / 2,
          y: n / 2
        }
        ]),
          s = !0;
        break;
      case 'check':
        (
          S = this.parent.doc.CreateShape(Document.CreateShapeType.POLYLINE)
        ).SetPoints([{
          x: 0,
          y: n - n / 4
        },
        {
          x: n / 4,
          y: n
        },
        {
          x: n,
          y: 0
        }
        ]),
          l = !0;
        break;
      case 'plus':
        (
          a = (
            S = this.parent.doc.CreateShape(Document.CreateShapeType.PATH)
          ).PathCreator()
        ).MoveTo(0, n / 2),
          a.LineTo(n, n / 2),
          a.MoveTo(n / 2, 0),
          a.LineTo(n / 2, n),
          a.Apply(),
          l = !0
    }
    S &&
      (
        r = (e.indent - n) / 2,
        i = n < e.ascent ? e.ascent - n : n < e.height ? 0 : (e.height - n) / 2,
        S.SetPos(e.xPos + r, e.yPos + i),
        s ? S.SetFillColor(o) : S.SetFillColor('none'),
        l ? (S.SetStrokeColor(o), S.SetStrokeWidth(1)) : (S.SetStrokeColor('none'), S.SetStrokeWidth(0)),
        t.add(S.svgObj)
      )
  }

  SetRuntimeCharFormat(e, t, a) {
    //'use strict';
    var r,
      i;
    return i = this.GetFormatAtOffset(e).style,
      i = this.MergeStyles(t, i),
      r = this.FindAddStyle(i),
      a &&
      (this.rtData.charStyles[e] = r),
      r
  }

  CalcFromRuntime(e, t) {
    //'use strict';
    var a,
      r,
      i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p,
      d,
      D,
      g,
      h,
      m,
      C,
      y,
      f,
      L,
      I,
      T,
      b = new DefaultFmtText(),// new Formatter.DefaultFmtText()/* FormatterDefaultFmtText()*/,
      M = t ? t.maxWidth : 0,
      P = t ? t.minWidth : 0,
      R = 0,
      A = null;
    return b.text = String(e.text),
      e.styles.forEach((function (e) {
        b.styles.push(e)
      }), this),
      b.hyperlinks = Utils1.CopyObj(e.hyperlinks),
      M ||
      (M = 32000),
      b.fmtWidth = P,
      this.renderingEnabled ? (
        n = Math.max(this.GetBulletIndent(), 8),
        b.width = 0,
        b.dispMinWidth = 0,
        e.styleRuns.forEach(
          (
            function (t, P) {
              a = {
                pStyle: Utils1.CopyObj(t.pStyle),
                width: 0,
                height: 0,
                start: t.start,
                length: t.nChars,
                bindent: 0,
                yOffset: R,
                dispMinWidth: 0,
                lines: []
              },
                o = 0,
                a.pStyle.bullet &&
                'none' != a.pStyle.bullet &&
                (o = n),
                l = o / 2 + 2,
                a.bindent = o,
                A ? A.clear() : (
                  (A = new T3Svg.Container(T3Svg.create('text'))).attr('xml:space', 'preserve'),
                  A.attr('fill-opacity', 0),
                  I = this.parent.doc.GetFormattingLayer()
                ),
                h = this.CalcParagraphRunMetrics(e, t, A, I),
                C = null;
              do {
                if (
                  s = a.lines.length ? a.pStyle.lindent : a.pStyle.pindent,
                  o &&
                  (s = 0),
                  y = M - (o + a.pStyle.rindent + s),
                  (m = this.BuildLineForDisplay(h, y, C, a.pStyle)).runs.length
                ) {
                  for (
                    r = {
                      width: 0,
                      height: 0,
                      start: t.start,
                      length: 0,
                      bindent: a.bindent,
                      indent: s,
                      yOffset: R,
                      ascent: 0,
                      descent: 0,
                      dispMinWidth: 0,
                      runs: [],
                      spErrors: [],
                      dataFields: []
                    },
                    s += o,
                    a.lines.length &&
                    (r.start = m.runs[0].start),
                    c = 0;
                    c < m.runs.length;
                    c++
                  ) {
                    if (
                      i = m.runs[c],
                      g = i.source,
                      delete i.source,
                      r.runs.push(i),
                      e.spErrors &&
                      g &&
                      i.extraYOffset <= 0 &&
                      !i.isTab
                    ) for (u = 0; u < e.spErrors.length; u++) f = e.spErrors[u].startIndex,
                      L = e.spErrors[u].startIndex + e.spErrors[u].nChars - 1,
                      f < i.dispStart + i.dispLen &&
                      L >= i.dispStart &&
                      (
                        (d = {}).startIndex = Math.max(f, i.dispStart),
                        d.endIndex = Math.min(L, i.dispStart + i.dispLen - 1),
                        p = d.startIndex - i.start + g.startRunChar,
                        T = Formatter.GetRunPositionForChar(g.runElem.node, p, !0, g.cache),
                        d.startPos = r.width + (T - g.startRunPos),
                        p = d.endIndex - i.start + g.startRunChar,
                        T = Formatter.GetRunPositionForChar(g.runElem.node, p, !1, g.cache),
                        d.endPos = r.width + (T - g.startRunPos),
                        r.spErrors.push(d)
                      );
                    if (e.dataFields && g && !i.isTab) for (u = 0; u < e.dataFields.length; u++) f = e.dataFields[u].startIndex,
                      L = e.dataFields[u].startIndex + e.dataFields[u].nChars - 1,
                      f < i.dispStart + i.dispLen &&
                      L >= i.dispStart &&
                      (
                        (D = {}).fieldID = e.dataFields[u].fieldID,
                        D.startIndex = Math.max(f, i.dispStart),
                        D.endIndex = Math.min(L, i.dispStart + i.dispLen - 1),
                        p = D.startIndex - i.start + g.startRunChar,
                        T = Formatter.GetRunPositionForChar(g.runElem.node, p, !0, g.cache),
                        D.startPos = r.width + (T - g.startRunPos),
                        p = D.endIndex - i.start + g.startRunChar,
                        T = Formatter.GetRunPositionForChar(g.runElem.node, p, !1, g.cache),
                        D.endPos = r.width + (T - g.startRunPos),
                        r.dataFields.push(D)
                      );
                    r.descent < i.descent &&
                      (r.descent = i.descent),
                      r.ascent < i.ascent &&
                      (r.ascent = i.ascent),
                      r.length += i.length,
                      r.width += i.width,
                      c < m.runs.length - 1 ? r.dispMinWidth += i.width : r.dispMinWidth += i.dispMinWidth
                  }
                  if (
                    r.height = r.ascent + r.descent,
                    P < e.styleRuns.length - 1 ||
                    m.nextRunInfo &&
                    m.runs.length
                  ) if (a.pStyle.spacing < 0) {
                    var _ = - a.pStyle.spacing - r.height;
                    _ > 0 &&
                      (r.height += _)
                  } else r.height += r.height * a.pStyle.spacing;
                  a.width < r.width + s &&
                    (a.width = r.width + s),
                    a.dispMinWidth < r.dispMinWidth + s &&
                    (a.dispMinWidth = r.dispMinWidth + s),
                    a.height += r.height,
                    R += r.height,
                    a.lines.push(r)
                }
                C = m.nextRunInfo
              } while (C && m.runs.length);
              I.svgObj.remove(A),
                b.height += a.height,
                o > 0 &&
                a.lines.length &&
                a.height < l &&
                (
                  S = (l - a.height) / 2,
                  a.lines.forEach((function (e) {
                    e.yOffset += S
                  }), this),
                  S = l - a.height,
                  R += S,
                  b.height += S
                ),
                b.paragraphs.push(a),
                b.width < a.width &&
                (b.width = a.width),
                b.dispMinWidth < a.dispMinWidth &&
                (b.dispMinWidth = a.dispMinWidth)
            }
          ),
          this
        ),
        b.fmtWidth < b.width &&
        (b.fmtWidth = b.width),
        b
      ) : (this.deferredRenderNeeded = !0, b)
  }

  BuildLineForDisplay(e, t, a, r) {
    //'use strict';
    var i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p,
      d = 0,
      D = 0,
      g = 0,
      h = 0,
      m = !a;
    if (a) for (
      d = a.curRun ||
      0,
      D = a.curChar ||
      0,
      g = a.curPos ||
      0,
      D < e[d].startDispIndex &&
      (D = e[d].startDispIndex),
      g < e[d].startDispPos &&
      (g = e[d].startDispPos),
      a = null;
      d < e.length &&
      !((o = e[d]).startDispIndex < o.endDispIndex);
    ) d++,
      D = 0,
      g = 0;
    for (
      i = {
        runs: [],
        nextRunInfo: null
      },
      p = t,
      S = {
        runIndex: - 1,
        startChar: 0,
        endChar: 0,
        startPos: 0,
        endPos: 0,
        isRunEnd: !1,
        breakRec: null
      };
      d < e.length &&
      (o = e[d], !((u = Math.max(o.endDispPos - g, 0)) > p));
    ) (
      n = {
        width: Math.min(o.width - g, p),
        height: o.runRT.metrics.height,
        start: o.startIndex + D,
        length: o.nChars - D,
        dispStart: o.startIndex + D,
        dispLen: Math.max(o.endDispIndex - D, 0),
        dispWidth: u,
        dispMinWidth: u,
        space: o.runRT.metrics.width,
        ascent: o.runRT.metrics.ascent,
        descent: o.runRT.metrics.descent,
        extraYOffset: o.runRT.metrics.extraYOffset,
        isTab: o.isTab,
        style: o.runRT.style,
        source: {
          runElem: o.runElem,
          cache: o.cache,
          startRunChar: D,
          startRunPos: g
        }
      }
    ).isTab &&
      r.tabspace > 0 &&
      (s = h - h % r.tabspace, s += r.tabspace * n.length, n.width = s - h),
      o.hasCR &&
      n.length++,
      n.width > 0 &&
      (
        (c = o.breaks.length - 1) >= 0 &&
        o.breaks[c].startIndex >= D &&
        (
          S.runIndex = i.runs.length,
          S.startChar = o.breaks[c].startIndex - D,
          S.endChar = o.breaks[c].endIndex - D,
          S.startPos = o.breaks[c].startPos - g,
          S.endPos = o.breaks[c].endPos - g,
          S.breakRec = o.breaks[c],
          S.rtRunIndex = d,
          S.rtRunPos = g,
          S.rtRunChar = D,
          S.isRunEnd = o.breaks[c].endIndex == o.nChars
        ),
        i.runs.push(n)
      ),
      p -= n.width,
      h += n.width,
      d++,
      g = 0,
      D = 0;
    if (d < e.length) {
      if (a = {
        curRun: d,
        curChar: D,
        curPos: g
      }, p > 0) {
        for (
          c = (o = e[d]).breaks.length - 1,
          n = null;
          c >= 0 &&
          o.breaks[c].endIndex > D;
        ) {
          if (o.breaks[c].startPos - g <= p) {
            a.curChar = o.breaks[c].endIndex,
              a.curPos = o.breaks[c].endPos,
              n = {
                width: Math.min(a.curPos - g, p),
                height: o.runRT.metrics.height,
                start: o.startIndex + D,
                length: a.curChar - D,
                dispStart: o.startIndex + D,
                dispLen: o.breaks[c].startIndex - D,
                dispWidth: o.breaks[c].startPos - g,
                dispMinWidth: o.breaks[c].startPos - g,
                space: o.runRT.metrics.width,
                ascent: o.runRT.metrics.ascent,
                descent: o.runRT.metrics.descent,
                extraYOffset: o.runRT.metrics.extraYOffset,
                isTab: o.isTab,
                style: o.runRT.style,
                source: {
                  runElem: o.runElem,
                  cache: o.cache,
                  startRunChar: D,
                  startRunPos: g
                }
              },
              i.runs.push(n);
            break
          }
          c--
        }
        if (!n) if (S.runIndex >= 0) {
          if (!S.isRunEnd) {
            for (; i.runs.length > S.runIndex + 1;) i.runs.pop();
            (n = i.runs[S.runIndex]).width = S.endPos,
              n.length = S.endChar,
              n.dispLen = S.startChar,
              n.dispWidth = S.startPos,
              n.dispMinWidth = S.startPos,
              a.curRun = S.rtRunIndex,
              a.curChar = S.endChar + S.rtRunChar,
              a.curPos = S.endPos + S.rtRunPos
          }
        } else {
          for (
            n = {
              width: 0,
              height: (o = e[d]).runRT.metrics.height,
              start: o.startIndex + D,
              length: 0,
              dispStart: o.startIndex + D,
              dispLen: 0,
              dispWidth: 0,
              dispMinWidth: 0,
              space: o.runRT.metrics.width,
              ascent: o.runRT.metrics.ascent,
              descent: o.runRT.metrics.descent,
              extraYOffset: o.runRT.metrics.extraYOffset,
              isTab: o.isTab,
              style: o.runRT.style,
              source: {
                runElem: o.runElem,
                cache: o.cache,
                startRunChar: D,
                startRunPos: g
              }
            },
            l = 0;
            D < o.nChars &&
            l < p;
          ) (
            (
              l = Formatter.GetRunPositionForChar(o.runElem.node, D, !1, o.cache) - g
            ) <= p ||
            !i.runs.length &&
            !n.length
          ) &&
            (
              n.width = l,
              n.dispWidth = l,
              n.dispMinWidth = l,
              n.length++,
              n.dispLen++,
              D++,
              a.curChar++,
              a.curPos = g + l
            );
          n.length &&
            i.runs.push(n)
        }
      }
    } else e.length > 0 &&
      !i.runs.length &&
      m &&
      (
        n = {
          width: 0,
          height: (o = e[0]).runRT.metrics.height,
          start: o.startIndex,
          length: 0,
          dispStart: o.startIndex,
          dispLen: 0,
          dispWidth: 0,
          dispMinWidth: 0,
          space: o.runRT.metrics.width,
          ascent: o.runRT.metrics.ascent,
          descent: o.runRT.metrics.descent,
          extraYOffset: o.runRT.metrics.extraYOffset,
          isTab: o.isTab,
          style: o.runRT.style,
          source: {
            runElem: o.runElem,
            cache: o.cache,
            startRunChar: 0,
            startRunPos: 0
          }
        },
        o.hasCR &&
        n.length++,
        i.runs.push(n)
      );
    return i.nextRunInfo = a,
      i
  }

  CalcParagraphRunMetrics(e, t, a, r) {
    //'use strict';
    var i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p,
      d,
      D,
      g,
      h,
      m,
      C,
      y,
      f,
      L,
      I = /(\s+)/g,
      T = /(\t+)/g;
    for (D = [], g = [], o = 0; o < t.runs.length; o++) {
      for (
        S = t.runs[o].start,
        c = t.runs[o].nChars,
        L = t.runs[o].style,
        d = [],
        i = c ? e.text.substr(S, c) : '';
        n = T.exec(i);
      ) d.push({
        start: n.index,
        end: n.index + n[0].length,
        nChars: n[0].length
      });
      if (d.length) for (
        d[0].start > 0 &&
        g.push({
          start: S,
          nChars: d[0].start,
          style: L,
          metrics: t.runs[o].metrics
        }),
        s = 0;
        s < d.length;
        s++
      ) g.push({
        start: S + d[s].start,
        nChars: d[s].nChars,
        style: L,
        metrics: t.runs[o].metrics,
        isTab: !0
      }),
        d[s].end < c &&
        (
          s < d.length - 1 ? g.push({
            start: S + d[s].end,
            nChars: d[s + 1].start - d[s].end,
            style: L,
            metrics: t.runs[o].metrics
          }) : g.push({
            start: S + d[s].end,
            nChars: c - d[s].end,
            style: L,
            metrics: t.runs[o].metrics
          })
        );
      else g.push({
        start: S,
        nChars: c,
        style: L,
        metrics: t.runs[o].metrics
      })
    }
    for (o = 0; o < g.length; o++) {
      for (
        S = g[o].start,
        c = g[o].nChars,
        L = e.styles[g[o].style],
        (f = c && '\n' === e.text[S + c - 1]) &&
        c--,
        i = c ? e.text.substr(S, c) : '',
        u = [];
        n = I.exec(i);
      ) u.push({
        startIndex: n.index,
        endIndex: n.index + n[0].length,
        startPos: 0,
        endPos: 0
      });
      (h = {}).startIndex = S,
        h.endIndex = S + c,
        h.nChars = c,
        h.style = L,
        h.breaks = u,
        h.str = i,
        h.startDispIndex = 0,
        h.endDispIndex = c,
        h.width = 0,
        h.startDispPos = 0,
        h.endDispPos = 0,
        h.hasCR = f,
        h.runRT = g[o],
        h.style = L,
        h.isTab = !0 === g[o].isTab,
        u.length &&
        h &&
        !L.dataField &&
        (
          0 === u[0].startIndex &&
          (h.startDispIndex = u[0].endIndex),
          u[u.length - 1].endIndex == c &&
          (h.endDispIndex = u[u.length - 1].startIndex)
        ),
        m = null,
        C = null,
        c &&
        !h.isTab &&
        (
          i += '.',
          (
            m = Formatter.CreateTextRunElem(i, L, this.parent.doc, this.parent.linksDisabled, null)
          ).attr('x', 0),
          m.attr('text-anchor', 'start'),
          m.attr('y', 0),
          a.add(m),
          C = this.parent.doc.GetTextRunCache(L, i)
        ),
        h.runElem = m,
        h.cache = C,
        D.push(h)
    }
    for (r.svgObj.add(a), o = 0; o < D.length; o++) if (m = (h = D[o]).runElem) for (
      l = h.endIndex - h.startIndex - 1,
      y = Formatter.GetRunPositionForChar(m.node, l, !1, h.cache),
      h.width = y,
      h.endDispPos = h.width,
      s = 0;
      s < h.breaks.length;
      s++
    ) (p = h.breaks[s]).startIndex > 0 &&
      (
        l = p.startIndex,
        y = Formatter.GetRunPositionForChar(m.node, l, !0, h.cache),
        p.startPos = y
      ),
      p.endIndex == h.nChars ? p.endPos = h.width : (
        l = p.endIndex,
        y = Formatter.GetRunPositionForChar(m.node, l, !0, h.cache),
        p.endPos = y
      ),
      0 !== s ||
      0 !== p.startIndex ||
      h.style.dataField ||
      (h.startDispPos = p.endPos),
      s != h.breaks.length - 1 ||
      p.endIndex != h.nChars ||
      h.style.dataField ||
      (h.endDispPos = p.startPos);
    return D
  }
  GetTextParagraphCount(e) {
    //'use strict';
    var t = e.match(/\n/g),
      a = 1;
    return t &&
      (a += t.length),
      a
  }

  MergeParagraphInfo(e, t, a) {
    //'use strict';
    var r,
      i,
      n,
      o,
      s = [];
    for (
      r = this.GetParagraphAtOffset(t),
      i = this.GetParagraphAtOffset(t + a),
      r < 0 &&
      (r = 0, i = 0),
      o = 0;
      o < r;
      o++
    ) s.push({
      pStyle: Utils1.CopyObj(this.rtData.styleRuns[o].pStyle)
    });
    for (
      r < this.rtData.styleRuns.length &&
      (
        !e.length ||
        t != this.rtData.styleRuns[r].start ||
        a < this.rtData.styleRuns[r].nChars - 1 ||
        a < this.rtData.styleRuns[r].nChars &&
        r === this.rtData.styleRuns.length - 1
      ) &&
      (
        n = {
          pStyle: Utils1.CopyObj(this.rtData.styleRuns[r].pStyle)
        }
      ),
      void 0 === n &&
      e.length > 0 &&
      (n = e[0]),
      void 0 !== n &&
      s.push(n),
      o = 1;
      o < e.length;
      o++
    ) s.push(e[o]);
    for (o = i + 1; o < this.rtData.styleRuns.length; o++) s.push({
      pStyle: Utils1.CopyObj(this.rtData.styleRuns[o].pStyle)
    });
    return s
  }

  BuildRuntimeRuns(e, t) {
    //'use strict';
    var a,
      r,
      i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p,
      d,
      D = [],
      g = this.DefaultPStyle();
    for (t = t || [], i = e.text.length, D.push(0), a = 0; a < i; a++) '\n' === e.text[a] &&
      D.push(a + 1);
    if (e.styleRuns = [], e.spErrors = [], e.dataFields = [], this.parent.doc) for (a = 0; a < D.length; a++) {
      if (
        n = D[a],
        o = a < D.length - 1 ? D[a + 1] - n : i - n,
        (S = e.styleRuns.length) < t.length &&
        (g = t[S].pStyle),
        l = {
          pStyle: Utils1.CopyObj(g),
          runs: [],
          start: n,
          nChars: o
        },
        this.renderingEnabled
      ) if (o) for (p = null, c = null, u = null, r = n; r < n + o; r++) d = this.GetFormatAtOffset(r, e),
        p &&
          this.MatchStylesNoSpell(d.style, p.style) ? s.nChars++ : (
          (s = {
            style: d.id,
            start: r,
            nChars: 1
          }).metrics = this.parent.doc.CalcStyleMetrics(d.style),
          l.runs.push(s)
        ),
        p = d,
        d.style.spError ? c ? c.nChars++ : (c = {
          startIndex: r,
          nChars: 1
        }, e.spErrors.push(c)) : c = null,
        d.style.dataField ? u &&
          u.fieldID == d.style.dataField ? u.nChars++ : (
          u = {
            fieldID: d.style.dataField,
            startIndex: r,
            nChars: 1
          },
          e.dataFields.push(u)
        ) : u = null;
        else (
          s = {
            style: (d = this.GetFormatAtOffset(n, e)).id,
            start: n,
            nChars: 0
          }
        ).metrics = this.parent.doc.CalcStyleMetrics(d.style),
          l.runs.push(s);
      else this.deferredRenderNeeded = !0;
      e.styleRuns.push(l)
    }
  }

  static GetRunPositionForChar(e, t, a, r, i) {
    //'use strict';
    if (t < 0) return - 1;
    var n,
      o;
    if (
      i = i ||
      0,
      r &&
      r.startOffsets &&
      r.endOffsets &&
      r.startOffsets.length > t &&
      (n = (o = a ? r.startOffsets : r.endOffsets)[t]),
      void 0 === n
    ) {
      n = - 1;
      try {
        n = (a ? e.getStartPositionOfChar(t) : e.getEndPositionOfChar(t)).x - i,
          o &&
          (o[t] = n)
      } catch (e) {
        throw e
      }
    }
    return n
  }

  static CalcStyleMetrics(e, t) {
    //'use strict';
    var a,
      r,
      i,
      n,
      o,
      s,
      l = null,
      S = {},
      c = !1,
      u = !1,
      p = new T3Svg.Container(T3Svg.create('text'));
    return p.attr('xml:space', 'preserve'),
      p.attr('text-anchor', 'start'),
      a = Formatter.CreateTextRunElem(' .', e, t, !1, null),
      p.add(a),
      p.attr('fill-opacity', 0),
      (i = t.GetFormattingLayer()).svgObj.add(p),
      r = p.node.getExtentOfChar(0),
      i.svgObj.remove(p),
      S.height = r.height,
      S.width = r.width,
      S.ascent = - r.y,
      S.descent = S.height - S.ascent,
      S.extraYOffset = 0,
      e &&
      (c = 'sub' == e.baseOffset, u = 'super' == e.baseOffset),
      (c || u) &&
      (
        (n = Utils1.CopyObj(e)).baseOffset = void 0,
        l = t.CalcStyleMetrics(n),
        u ? (
          (s = (o = l.ascent / 2) + S.ascent + l.descent) > l.height &&
          (l.height = s),
          S.height = l.height,
          S.ascent = l.height - l.descent,
          S.descent = l.descent,
          S.extraYOffset = - o
        ) : (
          o = S.ascent / 2,
          l.descent < S.descent + o &&
          (l.descent = S.descent + o),
          S.height = l.ascent + l.descent,
          S.ascent = l.ascent,
          S.descent = l.descent,
          S.extraYOffset = o
        )
      ),
      S
  }

  static MakeIDFromStyle(e) {
    //'use strict';
    return (e.font + '_' + e.size + '_' + e.weight + '_' + e.style + '_' + e.baseOffset).replace(/ /g, '')
  }

  GetBulletPIndex() {
    //'use strict';
    var e;
    if (this.rtData.styleRuns) for (e = 0; e < this.rtData.styleRuns.length; e++) if (
      this.rtData.styleRuns[e].pStyle &&
      this.rtData.styleRuns[e].pStyle.bullet &&
      'none' != this.rtData.styleRuns[e].pStyle.bullet
    ) return e;
    return 0
  }

  GetBulletIndent() {
    //'use strict';
    var e = 0,
      t = this.GetBulletPIndex();
    return this.rtData.styleRuns &&
      t < this.rtData.styleRuns.length &&
      this.rtData.styleRuns[t].runs &&
      this.rtData.styleRuns[t].runs.length &&
      (e = this.rtData.styleRuns[t].runs[0].metrics.ascent),
      e
  }

  GetBulletStyle(e) {
    //'use strict';
    var t,
      a = new DefaultStyle();// new Formatter.DefaultStyle()/* FormatterDefaultStyle()*/;
    return (
      void 0 === e ||
      e < 0 ||
      this.rtData.styleRuns &&
      e >= this.rtData.styleRuns.length
    ) &&
      (e = this.GetBulletPIndex()),
      this.rtData.styleRuns &&
      e < this.rtData.styleRuns.length &&
      this.rtData.styleRuns[e].runs &&
      this.rtData.styleRuns[e].runs.length &&
      (
        t = this.rtData.styleRuns[e].runs[0].style,
        a = this.rtData.styles[t]
      ),
      a
  }

  static CreateTextRunElem(e, t, a, r, n) {
    var o,
      s = new T3Svg.Container(T3Svg.create('tspan')),
      l = String(e).replace(/\n/g, ''),
      S = 1;
    l.length ||
      (l = '.'),
      s.node.textContent = l.replace(/ /g, ' '),
      s.attr('xml:space', 'preserve'),
      s.attr('text-rendering', 'optimizeSpeed');
    var c = t.color,
      u = t.weight,
      p = t.style,
      d = t.decoration,
      D = t.hyperlink >= 0;
    if (n && (n.textColor && (c = n.textColor), n._curFieldStyle)) {
      var g = n._curFieldStyle;
      for (i = 0; i < g.length; i++) switch (g[i].name) {
        case 'color':
          c = g[i].val;
          break;
        case 'font-weight':
          u = g[i].val;
          break;
        case 'font-style':
          p = g[i].val;
          break;
        case 'text-decoration':
          'underline' == g[i].val ? (n._curFieldDecoration = g[i].val, d = null) : d = g[i].val
      }
    }
    if (t) {
      for (var h in 'sub' != t.baseOffset && 'super' != t.baseOffset || (S = 0.8), t) switch (h) {
        case 'font':
          t.mappedFont ||
            (t.mappedFont = a.MapFont(t.font, t.type)),
            $(s.node).css('font-family', t.mappedFont);
          break;
        case 'size':
          o = t[h],
            isNaN(o) ||
            (o *= S, s.attr('font-size', o));
          break;
        case 'weight':
          s.attr('font-weight', u);
          break;
        case 'style':
          s.attr('font-style', p);
          break;
        case 'decoration':
          d &&
            s.attr('text-decoration', d);
          break;
        case 'color':
          D &&
            !r ||
            s.attr('fill', c);
          break;
        case 'colorTrans':
          s.attr('opacity', t[h])
      }
      D &&
        !r &&
        s.attr('fill', '#0000FF')
    }
    return s
  }

  FindAddStyle(e, t) {
    //'use strict';
    var a,
      r = this.rtData.styles.length,
      i = - 1;
    if (!e) return 0;
    for (a = 0; a < r; a++) if (this.MatchStyles(e, this.rtData.styles[a])) {
      i = a;
      break
    }
    return i < 0 &&
      !t &&
      (this.rtData.styles.push(e), i = r),
      i
  }

  TrimUnusedStyles(e) {
    //'use strict';
    var t,
      a,
      r,
      i,
      n = e.styles.length,
      o = e.charStyles.length,
      s = [];
    if (n) {
      for ((i = new Array(n)).fill(!1), t = 0; t < o; t++) i[r = e.charStyles[t]] = !0;
      for (t = 0; t < n; t++) if (i[t]) for (r = s.length, s.push(e.styles[t]), a = 0; a < o; a++) e.charStyles[a] === t &&
        (e.charStyles[a] = r);
      !s.length &&
        e.styles.length > 0 &&
        s.push(e.styles[e.styles.length - 1]),
        e.styles = s
    }
  }

  MergeStyles(e, t) {
    //'use strict';
    return {
      font: void 0 !== e.font ? e.font : t.font,
      type: void 0 !== e.type ? e.type : t.type,
      size: void 0 !== e.size ? e.size : t.size,
      weight: void 0 !== e.weight ? e.weight : t.weight,
      style: void 0 !== e.style ? e.style : t.style,
      baseOffset: void 0 !== e.baseOffset ? e.baseOffset : t.baseOffset,
      decoration: void 0 !== e.decoration ? e.decoration : t.decoration,
      spError: void 0 !== e.spError ? e.spError : t.spError,
      color: void 0 !== e.color ? e.color : t.color,
      colorTrans: void 0 !== e.colorTrans ? e.colorTrans : t.colorTrans,
      dataField: void 0 !== e.dataField ? e.dataField : t.dataField,
      hyperlink: void 0 !== e.hyperlink ? e.hyperlink : t.hyperlink
    }
  }

  AndStyles(e, t) {
    //'use strict';
    return {
      font: e.font === t.font ? e.font : void 0,
      type: e.type === t.type ? e.type : void 0,
      size: e.size === t.size ? e.size : void 0,
      weight: e.weight === t.weight ? e.weight : void 0,
      style: e.style === t.style ? e.style : void 0,
      baseOffset: e.baseOffset === t.baseOffset ? e.baseOffset : void 0,
      decoration: e.decoration === t.decoration ? e.decoration : void 0,
      spError: e.spError === t.spError ? e.spError : void 0,
      color: e.color === t.color ? e.color : void 0,
      colorTrans: e.colorTrans === t.colorTrans ? e.colorTrans : void 0,
      dataField: e.dataField === t.dataField ? e.dataField : void 0,
      hyperlink: e.hyperlink === t.hyperlink ? e.hyperlink : void 0
    }
  }

  MatchStyles(e, t) {
    //'use strict';
    return e.font === t.font &&
      e.type === t.type &&
      e.size === t.size &&
      e.weight === t.weight &&
      e.style === t.style &&
      e.baseOffset === t.baseOffset &&
      e.decoration === t.decoration &&
      e.spError === t.spError &&
      e.color === t.color &&
      e.colorTrans === t.colorTrans &&
      e.dataField === t.dataField &&
      e.hyperlink === t.hyperlink
  }

  MatchStylesNoSpell(e, t) {
    //'use strict';
    return e.font === t.font &&
      e.type === t.type &&
      e.size === t.size &&
      e.weight === t.weight &&
      e.style === t.style &&
      e.baseOffset === t.baseOffset &&
      e.decoration === t.decoration &&
      e.color === t.color &&
      e.colorTrans === t.colorTrans &&
      e.dataField === t.dataField &&
      e.hyperlink === t.hyperlink
  }

  MatchPartialStyles(e, t) {
    //'use strict';
    return !(
      void 0 !== e.font &&
      void 0 !== t.font &&
      e.font !== t.font ||
      void 0 !== e.type &&
      void 0 !== t.type &&
      e.type !== t.type ||
      void 0 !== e.size &&
      void 0 !== t.size &&
      e.size !== t.size ||
      void 0 !== e.weight &&
      void 0 !== t.weight &&
      e.weight !== t.weight ||
      void 0 !== e.style &&
      void 0 !== t.style &&
      e.style !== t.style ||
      void 0 !== e.baseOffset &&
      void 0 !== t.baseOffset &&
      e.baseOffset !== t.baseOffset ||
      void 0 !== e.decoration &&
      void 0 !== t.decoration &&
      e.decoration !== t.decoration ||
      void 0 !== e.spError &&
      void 0 !== t.spError &&
      e.spError !== t.spError ||
      void 0 !== e.color &&
      void 0 !== t.color &&
      e.color !== t.color ||
      void 0 !== e.colorTrans &&
      void 0 !== t.colorTrans &&
      e.colorTrans !== t.colorTrans ||
      void 0 !== e.dataField &&
      void 0 !== t.dataField &&
      e.dataField !== t.dataField ||
      void 0 !== e.hyperlink &&
      void 0 !== t.hyperlink &&
      e.hyperlink !== t.hyperlink
    )
  }



  DefaultPStyle() {
    //'use strict';
    return {
      just: 'left',
      bullet: 'none',
      spacing: 0,
      pindent: 0,
      lindent: 0,
      rindent: 0,
      tabspace: 0
    }
  }

  SetDataNameDisplay(e) {
    //'use strict';
    this.dataNameEnabled = e
  }

  GetDataNameDisplay() {
    //'use strict';
    return this.dataNameEnabled
  }

  GetDataField(e) {
    //'use strict';
    if (!this.HasDataFields() || !this.IsDataFieldAtPos(e)) return null;
    var t,
      a,
      r = null;
    for (t = 0; t < this.rtData.dataFields.length; t++) if (
      e >= this.rtData.dataFields[t].startIndex &&
      e < (
        a = this.rtData.dataFields[t].startIndex + this.rtData.dataFields[t].nChars
      )
    ) {
      r = {
        fieldID: this.rtData.dataFields[t].fieldID,
        startPos: this.rtData.dataFields[t].startIndex,
        endPos: a
      };
      break
    }
    return r
  }

  IsDataFieldAtPos(e) {
    //'use strict';
    return !!this.GetFormatAtOffset(e).style.dataField
  }

  IsDataFieldInRange(e, t) {
    //'use strict';
    if (!this.HasDataFields()) return !1;
    var a;
    for (a = e; a <= t; a++) if (this.IsDataFieldAtPos(a)) return !0;
    return !1
  }

  HasDataFields() {
    //'use strict';
    return !(!this.rtData.dataFields || !this.rtData.dataFields.length)
  }

  HasDataField(e) {
    //'use strict';
    if (!this.HasDataFields()) return !1;
    var t;
    for (
      e = Formatter.FormatDataFieldID(e, !1),
      t = 0;
      t < this.rtData.dataFields.length;
      t++
    ) if (
        Formatter.FormatDataFieldID(this.rtData.dataFields[t].fieldID, !1) == e
      ) return !0;
    return !1
  }

  ClearDataFieldRun(e) {
    //'use strict';
    var t,
      a,
      r;
    if (this.HasDataFields()) if (e) for (t = 0; t < this.rtData.dataFields.length; t++) Formatter.FormatDataFieldID(this.rtData.dataFields[t].fieldID, !1) == e &&
      (
        a = this.rtData.dataFields[t].startIndex,
        r = this.rtData.dataFields[t].nChars,
        this.SetFormat({
          dataField: null
        }, a, r)
      );
    else this.SetFormat({
      dataField: null
    })
  }

  RebuildFromData() {
    //'use strict';
    if (this.HasDataFields()) {
      var e,
        t,
        a,
        r,
        i,
        n,
        o = Utils1.CopyObj(this.rtData.dataFields);
      for (e = o.length - 1; e >= 0; e--) t = o[e].fieldID,
        a = this.parent.GetDataText(t, this.dataNameEnabled),
        i = o[e].startIndex,
        n = o[e].nChars,
        r = a &&
          a.length ? {
          dataField: t
        }
          : null,
        this.SetText(a, r, i, n, !0)
    }
  }

  static FormatDataFieldID(e, t) {
    //'use strict';
    var a = e,
      r = a.indexOf('_') > 0;
    return t ? r ||
      (a += '_' + SDUI.Utils.MakeShortUniqueID()) : r &&
    (a = a.split('_')[0]),
      a
  }

  RemapDataFields(e) {
    //'use strict';
    if (this.HasDataFields()) {
      var t,
        a = function (t) {
          var a,
            r = (t = t.split('_'))[0],
            i = t[1];
          for (a = 0; a < e.length; a++) e[a].srcFieldID == r &&
            (r = e[a].dstFieldID);
          return r += '_' + i
        };
      if (this.rtData) {
        for (i = 0; i < this.rtData.styles.length; i++) (t = this.rtData.styles[i].dataField) &&
          (this.rtData.styles[i].dataField = a(t));
        for (i = 0; i < this.rtData.dataFields.length; i++) (t = this.rtData.dataFields[i].fieldID) &&
          (this.rtData.dataFields[i].fieldID = a(t))
      }
      if (this.fmtText) {
        for (i = 0; i < this.fmtText.styles.length; i++) (t = this.fmtText.styles[i].dataField) &&
          (this.fmtText.styles[i].dataField = a(t));
        this.fmtText.paragraphs.forEach(
          (
            function (e, r) {
              e.lines.forEach(
                (
                  function (e, r) {
                    for (i = 0; i < e.dataFields.length; i++) (t = e.dataFields[i].fieldID) &&
                      (e.dataFields[i].fieldID = a(t))
                  }
                )
              )
            }
          )
        )
      }
      if (this.renderedDataFields) for (i = 0; i < this.renderedDataFields.length; i++) (t = this.renderedDataFields[i].fieldID) &&
        (this.renderedDataFields[i].fieldID = a(t))
    }
  }



}

export default Formatter;


// export default BasicTextFormatter;
