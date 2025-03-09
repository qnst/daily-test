




// import Basic from "./Basic.Index";
// import T3Svg from "../Hvac.SVG.t2";
// import "./Basic.Text.Index";
import $ from "jquery";
// import SDJS from "../SDJS/SDJS.Index";
// import SDUI from "../SDUI/SDUI.Index";
// import GPP from "../gListManager";
// Basic.Text = {}
import T3Svg from "../Helper/T3Svg";
import Utils1 from "../Helper/Utils1"
import Utils2 from "../Helper/Utils2"
import Utils3 from "../Helper/Utils3"
import ListManager from "../Data/ListManager";
import Creator from './B.Path.Creator'
import GlobalData from '../Data/T3Gv'
import Resources from "../Data/Resources"
import ConstantData from "../Data/ConstantData"

class Edit {

  public parent: any;
  public isActive: boolean;
  public selStart: number;
  public selEnd: number;
  public selAnchor: number;
  public inActiveSel: any;
  public activeSelPos: number;
  public cursorPos: number;
  public cursorLine: any;
  public curHit: any;
  public lastClickTime: number;
  public inWordSelect: boolean;
  public anchorWord: any;
  public savedCursorState: any;
  public TableDrag: boolean;
  public virtualKeyboardHook: any;
  public activateInit: any;
  public lastKeyProcessed: any;
  public textEntryField: any;

  constructor(e) {
    //'use strict';
    this.parent = e,
      this.isActive = !1,
      this.selStart = - 1,
      this.selEnd = - 1,
      this.selAnchor = - 1,
      this.inActiveSel,
      this.activeSelPos = - 1,
      this.cursorPos = - 1,
      this.cursorLine = void 0,
      this.curHit = null,
      this.lastClickTime = 0,
      this.inWordSelect = !1,
      this.anchorWord = null,
      this.savedCursorState = this.parent.cursorState,
      this.TableDrag = !1
  }

  BeginTableDrag() {
    this.TableDrag = !0,
      this.DeactivateCursor(),
      this.ClearSelection(),
      this.parent.SetSelectionVisible(!1),
      this.parent.ClearDataFieldHilites(),
      this.curHit = null,
      this.isActive = !1
  }

  SetVirtualKeyboardHook(e, t) {
    this.virtualKeyboardHook = e,
      this.InitTextEntry(t)
  }

  Activate(e, t) {
    console.log('Basic.Text.Edit.prototype.Activate e, t=>', e, t);
    //'use strict';
    this.isActive = !0,
      this.inActiveSel = !1,
      this.lastClickTime = 0,
      this.selStart = - 1,
      this.selEnd = - 1,
      this.selAnchor = - 1,
      this.parent.decorationAreaElem.attr('pointer-events', /*Element.EventBehavior.NONE*/ConstantData.EventBehavior.NONE),
      this.parent.clickAreaElem.attr('pointer-events', /*Element.EventBehavior.HIDDEN_ALL*/ConstantData.EventBehavior.HIDDEN_ALL),
      this.parent.CallEditCallback('activate'),
      this.savedCursorState = this.parent.cursorState,
      this.parent.cursorState = ConstantData.CursorState.NONE,
      this.activateInit = !0,
      this.lastKeyProcessed = !1;
    var a = this;
    setTimeout((function () {
      a.activateInit = !1
    }), 10),
      this.textEntryField &&
      this.InitTextEntry(this.textEntryField),
      e ? (
        e.gesture = {
          center: {
            clientX: e.clientX,
            clientY: e.clientY
          }
        },
        this.HandleMouseDown(e),
        t ? this.parent.DoSpellCheck() : this.HandleMouseUp(e),
        this.virtualKeyboardHook &&
        this.virtualKeyboardHook(this.parent, !0)
      ) : (
        this.SetInsertPos(this.parent.GetTextLength()),
        this.virtualKeyboardHook &&
        this.virtualKeyboardHook(this.parent, !0),
        this.parent.DoSpellCheck()
      ),
      this.parent.SetCursorState(/*ConstantData.CursorState.EDITLINK*/2),
      this.UpdateTextEntryField(!1),
      this.parent.RenderDataFieldHilites()
  }

  Deactivate(e) {
    //'use strict';
    this.isActive = !1,
      this.inActiveSel = !1,
      this.selStart = - 1,
      this.selEnd = - 1,
      this.selAnchor = - 1,
      this.activateInit = !1,
      e ||
      (this.parent.DoSpellCheck(), this.parent.UpdateTextObject()),
      this.parent.clickAreaElem.node.removeAttribute('pointer-events'),
      this.parent.cursorState === /*ConstantData.CursorState.EDITLINK*/2 &&
      this.parent.SetCursorState(this.savedCursorState),
      this.savedCursorState = this.parent.cursorState,
      this.DeactivateCursor(),
      this.ClearSelection(),
      this.parent.ClearDataFieldHilites(),
      this.parent.CallEditCallback('deactivate'),
      this.virtualKeyboardHook &&
      this.virtualKeyboardHook(this.parent, !1),
      this.textEntryField &&
      this.textEntryField.off('input')
  }

  IsActive() {
    //'use strict';
    return this.isActive
  }

  SetSelection(e, t, a, r, i) {
    //'use strict';
    e >= 0 &&
      e === t ? this.SetInsertPos(e, {
        rLine: a
      }) : (
      this.selStart = e,
      this.selEnd = t,
      void 0 === r &&
      (r = e),
      this.selAnchor = r,
      this.UpdateSelection()
    ),
      i ||
      this.UpdateTextEntryField(!0)
  }

  ClearSelection() {
    //'use strict';
    this.selStart = - 1,
      this.selEnd = - 1,
      this.selAnchor = - 1,
      this.UpdateSelection()
  }

  GetSelection() {
    //'use strict';
    return {
      start: this.selStart,
      end: this.selEnd,
      line: this.cursorLine,
      anchor: this.selAnchor
    }
  }

  SetInsertPos(e, t, a) {
    //'use strict';
    this.selStart = e,
      this.selEnd = e,
      this.selAnchor = e,
      this.UpdateSelection(),
      this.cursorPos = e,
      this.cursorLine = t ? t.rLine : void 0,
      this.UpdateCursor(),
      a ||
      this.UpdateTextEntryField(!0),
      this.parent.CallEditCallback('select')
  }

  UpdateSelection() {
    //'use strict';
    var e,
      t,
      a,
      // r = new Basic.Path.Creator;
      r = new Creator();
    if (
      this.DeactivateCursor(),
      this.selStart < 0 ||
      this.selEnd < 0 ||
      this.selStart === this.selEnd
    ) this.parent.HideSelection();
    else if (
      (
        e = this.parent.formatter.GetRenderedRange(this.selStart, this.selEnd)
      ).length
    ) {
      for (t = 0; t < e.length; t++) r.MoveTo(e[t].left, e[t].top),
        r.LineTo(e[t].right, e[t].top),
        r.LineTo(e[t].right, e[t].bottom),
        r.LineTo(e[t].left, e[t].bottom),
        r.ClosePath();
      a = r.ToString(),
        this.parent.ShowSelection(a)
    } else this.parent.HideSelection()
  }

  DeactivateCursor() {
    //'use strict';
    this.parent.HideInputCursor(),
      this.cursorPos = - 1,
      this.cursorLine = void 0
  }

  UpdateCursor() {
    //'use strict'; console.log('Basic.Text.Edit.prototype.UpdateCursor=>', this.cursorPos);
    var e;
    this.cursorPos < 0 ? this.DeactivateCursor() : (
      e = this.parent.formatter.GetRenderedCharInfo(this.cursorPos, this.cursorLine),
      this.parent.ShowInputCursor(e.left, e.top, e.bottom)
    )
  }

  HandleMouseDown(e) {
    console.log('Basic.Text.Edit.prototype.HandleMouseDown=>', e);
    //'use strict';
    var t,
      a,
      r,
      i,
      n = e &&
        (
          e.shiftKey ||
          e.gesture &&
          e.gesture.srcEvent &&
          e.gesture.srcEvent.shiftKey
        ),
      o = T3Gv.optManager.IsRightClick(e),
      s = Date.now();
    if (this.activateInit = !1, this.isActive && !o) {
      var l,
        S = e.gesture.center.clientX,
        c = e.gesture.center.clientY;
      return i = this.parent.doc.ConvertWindowToElemCoords(S, c, this.parent.textElem.node),
        this.parent.linksDisabled ||
          this.parent.cursorState !== /*ConstantData.CursorState.EDITLINK*/2 &&
          this.parent.cursorState !== /*ConstantData.CursorState.LINKONLY*/3 ||
          !(r = this.parent.formatter.GetHyperlinkAtPoint(i)) ? (
          t = this.parent.formatter.GetHitInfo(i),
          this.DeactivateCursor(),
          this.parent.activeEditStyle = - 1,
          this.inActiveSel = !0,
          this.activeSelPos = t.index,
          this.selStart >= 0 &&
            this.selAnchor >= 0 &&
            n ? (
            this.HandleMouseMove(e),
            this.parent.CallEditCallback('click'),
            !1
          ) : (
            this.selStart = t.index,
            this.selEnd = t.index,
            this.selAnchor = t.index,
            this.curHit = t,
            this.lastClickTime + 300 < s ? (this.inWordSelect = !1, this.anchorWord = null) : (a = this.parent.formatter.GetWordAtIndex(t.index)).end > a.start &&
              (
                this.inWordSelect = !0,
                this.anchorWord = a,
                this.selStart = a.start,
                this.selEnd = a.end,
                this.selAnchor = a.start
              ),
            this.inWordSelect ? (
              (l = this.parent.formatter.GetDataField(this.selStart)) &&
              (this.selStart = l.startPos, this.selAnchor = l.startPos),
              (l = this.parent.formatter.GetDataField(this.selEnd)) &&
              (this.selEnd = l.endPos)
            ) : (l = this.parent.formatter.GetDataField(this.selStart)) &&
            l.startPos != this.selStart &&
            (
              this.selStart = l.startPos,
              this.selEnd = l.endPos,
              this.selAnchor = l.startPos
            ),
            this.lastClickTime = s,
            this.SetSelection(this.selStart, this.selEnd, void 0, this.selAnchor),
            this.parent.CallEditCallback('click'),
            !1
          )
        ) : (this.parent.CallEditCallback('hyperlink', r.url), !1)
    }
  }

  HandleMouseMove(e) {
    console.log('Basic.Text.Edit.prototype.HandleMouseMove=>', e);
    //'use strict';
    var t,
      a,
      r,
      i = {};
    if (this.inActiveSel) {
      this.activateInit = !1;
      var n = e.gesture.center.clientX,
        o = e.gesture.center.clientY;
      r = this.parent.doc.ConvertWindowToElemCoords(n, o, this.parent.textElem.node),
        i.x = r.x,
        i.y = r.y;
      var s = this.parent.textElem.trans.x,
        l = this.parent.textElem.trans.y;
      i.x += s,
        i.y += l;
      var S = this.parent.GetPos();
      if (
        i.x < 0 ||
        i.x > this.parent.geometryBBox.width ||
        i.y < 0 ||
        i.y > this.parent.geometryBBox.height
      ) {
        var c = {
          x: S.x + i.x,
          y: S.y + i.y
        };
        this.parent.CallEditCallback('dragoutside', c)
      }
      t = this.parent.formatter.GetHitInfo(r),
        this.curHit = t,
        this.activeSelPos = Math.max(t.index, 0),
        this.inWordSelect ? (
          a = this.parent.formatter.GetWordAtIndex(this.activeSelPos),
          this.activeSelPos >= this.anchorWord.start ? (this.selStart = this.anchorWord.start, this.selEnd = a.end) : (this.selStart = a.start, this.selEnd = this.anchorWord.end)
        ) : this.selAnchor <= this.activeSelPos ? (this.selStart = this.selAnchor, this.selEnd = this.activeSelPos) : (this.selStart = this.activeSelPos, this.selEnd = this.selAnchor);
      var u = this.parent.formatter.GetDataField(this.selStart);
      return u &&
        (this.selStart = u.startPos),
        (u = this.parent.formatter.GetDataField(this.selEnd)) &&
        u.startPos != this.selEnd &&
        (this.selEnd = u.endPos),
        this.SetSelection(this.selStart, this.selEnd, void 0, this.selAnchor),
        !1
    }
  }

  HandleMouseUp(e) {
    console.log('Basic.Text.Edit.prototype.HandleMouseUp=>', e);
    //'use strict';
    if (this.inActiveSel) return this.activateInit = !1,
      this.TableDrag ? (
        this.TableDrag = !1,
        this.inActiveSel = !1,
        this.parent.CallEditCallback('dragoutside_mouseup'),
        !1
      ) : (
        this.inActiveSel = !1,
        this.selStart === this.selEnd ? (
          this.SetInsertPos(this.selStart, this.curHit),
          this.parent.DoSpellCheck()
        ) : (
          this.parent.CallEditCallback('select'),
          this.parent.CallEditCallback('selectrange')
        ),
        this.curHit = null,
        !1
      )
  }

  HandleKeyPress(e) {
    //'use strict';
    var t = e.charCode ? e.charCode : e.keyCode,
      a = String.fromCharCode(t),
      r = e &&
        (
          e.shiftKey ||
          e.gesture &&
          e.gesture.srcEvent &&
          e.gesture.srcEvent.shiftKey
        ),
      i = e &&
        (
          e.ctrlKey ||
          e.gesture &&
          e.gesture.srcEvent &&
          e.gesture.srcEvent.ctrlKey
        ),
      n = {
        keyCode: a,
        shiftKey: r,
        ctrlKey: i
      },
      o = this.activateInit;
    if (
      this.activateInit = !1,
      this.lastKeyProcessed = !1,
      a != e.key &&
      e.key &&
      1 == e.key.length &&
      (a = e.key),
      '\t' === a
    ) return this.parent.CallEditCallback('keyend', n),
      this.lastKeyProcessed = !0,
      !0;
    if ('\r' === a || '\n' === a) {
      if (
        n.keyCode = Resources.Keys.Enter,
        this.parent.CallEditCallback('keyend', n)
      ) return this.lastKeyProcessed = !0,
        !0;
      if (!o) return !!i &&
        (this.lastKeyProcessed = !0, this.parent.Paste(a, !1), !0)
    }
    return !1 === this.parent.CallEditCallback('charfilter', a) ? (this.lastKeyProcessed = !0, !0) : !!o &&
      (this.lastKeyProcessed = !0, this.parent.Paste(a, !1), !0)
  }

  HandleKeyDown(e) {
    //'use strict';
    var t = e &&
      (
        e.shiftKey ||
        e.gesture &&
        e.gesture.srcEvent &&
        e.gesture.srcEvent.shiftKey
      ),
      a = e &&
        (
          e.ctrlKey ||
          e.gesture &&
          e.gesture.srcEvent &&
          e.gesture.srcEvent.ctrlKey
        );
    switch (this.activateInit = !1, this.lastKeyProcessed = !1, e.keyCode) {
      case 8:
      case 46:
        this.lastKeyProcessed = !0,
          this.HandleDeleteKey(e.keyCode);
        break;
      case 9:
      case 35:
      case 36:
      case 37:
      case 38:
      case 39:
      case 40:
        this.lastKeyProcessed = !0,
          this.HandleCursorKey(e.keyCode, t, a);
        break;
      case 13:
      case 32:
        return this.HandleKeyPress(e);
      default:
        return !1
    }
    return !0
  }

  HandleDeleteKey(e) {
    //'use strict';
    var t = this.selStart,
      a = this.selEnd - this.selStart;
    t < 0 ||
      (
        a > 0 ? this.parent.Delete() : 46 === e ? t < this.parent.GetTextLength() &&
          (this.selEnd = t + 1, this.parent.Delete()) : 8 === e &&
          t > 0 &&
        (this.selStart--, this.parent.Delete())
      )
  }

  HandleCursorKey(e, t, a) {
    //'use strict';
    var r = {},
      i = - 1,
      n = !1,
      o = this.selStart != this.selEnd,
      s = {
        keyCode: e,
        shiftKey: t,
        ctrlKey: a
      };
    switch (
    t &&
      !this.inWordSelect ? i = this.selAnchor == this.selStart ? this.selEnd : this.selStart : (
      i = this.selEnd,
      this.selAnchor = this.selStart,
      this.inWordSelect = !1
    ),
    e
    ) {
      case Resources.Keys.Tab:
        r.index = - 1;
        break;
      case Resources.Keys.End:
        r = this.parent.formatter.GetAdjacentChar(i, this.cursorLine, 'end', s),
          n = !0;
        break;
      case Resources.Keys.Home:
        r = this.parent.formatter.GetAdjacentChar(i, this.cursorLine, 'home', s),
          n = !0;
        break;
      case Resources.Keys.Left_Arrow:
        o &&
          !t &&
          (i = this.selStart),
          !o ||
            t ||
            a ? r = this.parent.formatter.GetAdjacentChar(i, this.cursorLine, 'prev', s) : r.index = i;
        break;
      case Resources.Keys.Up_Arrow:
        o &&
          !t &&
          (i = this.selStart),
          r = this.parent.formatter.GetAdjacentChar(i, this.cursorLine, 'up', s);
        break;
      case Resources.Keys.Right_Arrow:
        o &&
          !t &&
          (i = this.selEnd),
          !o ||
            t ||
            a ? r = this.parent.formatter.GetAdjacentChar(i, this.cursorLine, 'next', s) : r.index = i;
        break;
      case Resources.Keys.Down_Arrow:
        o &&
          !t &&
          (i = this.selEnd),
          r = this.parent.formatter.GetAdjacentChar(i, this.cursorLine, 'down', s);
        break;
      default:
        return
    }
    r.index != i ||
      n ||
      o ||
      (r.index = - 1),
      r.index < 0 ? this.parent.CallEditCallback('keyend', s) : (
        t ? (
          i == this.selStart ? this.selStart = r.index : this.selEnd = r.index,
          this.selStart > this.selEnd &&
          (
            r.index = this.selStart,
            this.selStart = this.selEnd,
            this.selEnd = r.index
          )
        ) : (
          this.selStart = r.index,
          this.selEnd = r.index,
          this.selAnchor = r.index
        ),
        this.parent.activeEditStyle = - 1,
        this.SetSelection(this.selStart, this.selEnd, r.line, this.selAnchor),
        this.parent.CallEditCallback('select'),
        this.parent.DoSpellCheck()
      )
  }

  InitTextEntry(e) {
    this.textEntryField = $(e),
      this.textEntrySelStart = 0,
      this.textEntrySelEnd = 0,
      this.textEntryField.off('input'),
      this.textEntryField.on(
        'input',
        this,
        (
          function (e) {
            var t = e.data;
            return t &&
              t.HandleTextEntryFieldUpdate(),
              !1
          }
        )
      ),
      this.ResetTextEntry()
  }

  ResetTextEntry() {
    if (
      this.isActive &&
      this.textEntryField &&
      'hidden' != this.textEntryField.css('visibility')
    ) {
      if (null == this.inputFocusTimer) {
        var e = this;
        this.inputFocusTimer = setInterval((function () {
          e.ResetTextEntry()
        }), 10)
      }
      if (!this.textEntryField.is(':focus')) {
        var t = document.activeElement;
        null != t &&
          t != document.body &&
          t != window &&
          t != document &&
          t != $('#_clipboardInput')[0] &&
          t != $('#_IEclipboardDiv')[0] ||
          this.textEntryField.focus()
      }
    } else null != this.inputFocusTimer &&
      (
        clearInterval(this.inputFocusTimer),
        this.inputFocusTimer = void 0
      )
  }

  static SetInputSelection(e, t, a) {
    e.selectionStart = t,
      e.selectionEnd = a,
      e.selectionStart != t ||
      e.selectionEnd
  }

  UpdateTextEntryField(e) {
    if (
      this.isActive &&
      this.textEntryField &&
      void 0 !== this.textEntryField[0]
    ) {
      var t = this.textEntryField[0];
      this.ResetTextEntry(),
        e ||
        t.value == this.parent.formatter.rtData.text ||
        this.textEntryField.val(this.parent.formatter.rtData.text);
      var a = t.value.length,
        r = Math.min(Math.max(this.selStart, 0), a),
        i = Math.min(Math.max(this.selEnd, r), a);
      t.selectionStart == r &&
        t.selectionEnd == i ||
        Basic.Text.Edit.SetInputSelection(t, r, i),
        this.textEntrySelStart = r,
        this.textEntrySelEnd = i
    }
  }

  ValidateEdit(e, t, a) {
    var r = this.selStart,
      i = this.selEnd - this.selStart,
      n = '',
      o = '',
      s = '';
    return r >= t.length ? n = t + e : (r > 0 && (o = t.slice(0, r)), r + i < t.length && (s = t.slice(r + i)), n = o + e + s),
      n == a
  }

  HandleTextEntryFieldUpdate() {
    if (this.isActive && this.textEntryField) if (this.activateInit = !1, this.lastKeyProcessed) this.UpdateTextEntryField();
    else {
      var e = this.textEntryField[0],
        t = e.value,
        a = this.parent.formatter.rtData.text,
        r = e.selectionStart,
        i = e.selectionEnd,
        n = '';
      this.selStart = this.textEntrySelStart,
        this.selEnd = this.textEntrySelEnd,
        r = Math.min(r, t.length),
        (i = Math.min(i, t.length)) > 0 &&
        (n = i > this.selStart ? t.slice(this.selStart, i) : t.slice(i - 1, i));
      var o = null;
      if (
        this.ValidateEdit(n, a, t) ||
        (
          o = Basic.Text.DiffStrings(a, t),
          this.selStart = o.pos,
          this.selEnd = o.pos + o.replace,
          n = o.str
        ),
        n
      ) {
        if (!1 === this.parent.CallEditCallback('charfilter', n)) return e.value != this.parent.formatter.rtData.text &&
          this.textEntryField.val(this.parent.formatter.rtData.text),
          void (
            e.selectionStart == this.textEntrySelStart &&
            e.selectionEnd == this.textEntrySelEnd ||
            Basic.Text.Edit.SetInputSelection(e, this.textEntrySelStart, this.textEntrySelEnd)
          );
        this.parent.Paste(n, !1, !0)
      } else o &&
        o.replace &&
        this.parent.Delete(!0);
      this.SetSelection(i, i, void 0, i, !0),
        Basic.Text.Edit.SetInputSelection(e, r, i),
        this.textEntrySelStart = r,
        this.textEntrySelEnd = i
    }
  }

}

export default Edit;

// export default Basic.Text;
