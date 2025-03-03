

// import Basic from "./Basic.Index";
// import "./Basic.Text.Index";
import HvacSVG from "../Helper/SVG.t2"
import $ from "jquery";
// import SDJS from "../SDJS/SDJS.Index";
// import SDUI from "../SDUI/SDUI.Index";
// import './Basic.Text.Formatter';
// import BasicTextFormatter from './Basic.Text.Formatter';
// import './Basic.Element';

import Element from "./Basic.Element"
import Formatter from "./Basic.Text.Formatter";
import Edit from "./Basic.Text.Edit";

import Global from "./Basic.Global";
import Utils1 from "../Helper/Utils1"
import Utils2 from "../Helper/Utils2"
import Utils3 from "../Helper/Utils3"

import ConstantData from "../Data/ConstantData"



class Text extends Element {

  public formatter: Formatter;
  public editor: Edit;
  public textElem: any;
  public selectElem: any;
  public cursorElem: any;
  public clickAreaElem: any;
  public decorationAreaElem: any;
  public cursorTimer: any;
  public cursorPos: any;
  public cursorState: any;
  public minHeight: any;
  public vAlign: any;
  public textElemOffset: any;
  public activeEditStyle: any;
  public selectHidden: any;
  public linksDisabled: any;
  public editCallback: any;
  public editCallbackData: any;
  public dataTableID: any;
  public dataRecordID: any;
  public dataStyleOverride: any;
  public lastFmtSize: any;

  constructor() {
    super()
  }

  // GetInstanceName(){
  //   return "Text";
  // }

  // Basic.Text = function () { }

  // Basic.Text.Formatter = function (e) { }

  // Basic.Text.prototype = new Basic.Element
  // Basic.Text.prototype.constructor = Basic.Text

  CreateElement(e, t) {
    // debugger
    //'use strict';
    return this.formatter = new Formatter(this),/*new Basic.Text.Formatter(this),*/
      this.editor = new Edit(this),
      this.svgObj = new HvacSVG.Container(HvacSVG.create('g')),
      this.InitElement(e, t),
      this.textElem = new HvacSVG.Container(HvacSVG.create('text')),
      this.selectElem = new HvacSVG.Path,
      this.cursorElem = new HvacSVG.Line,
      this.clickAreaElem = new HvacSVG.Rect,
      this.decorationAreaElem = new HvacSVG.Container(HvacSVG.create('g')),
      this.cursorTimer = void 0,
      this.cursorPos = void 0,
      this.cursorState = ConstantData.CursorState.LINKONLY,
      this.clickAreaElem.attr('stroke-width', 0),
      this.clickAreaElem.attr('fill', 'none'),
      this.clickAreaElem.attr('visibility', 'hidden'),
      this.clickAreaElem.node.setAttribute('no-export', '1'),
      this.selectElem.node.setAttribute('no-export', '1'),
      this.cursorElem.node.setAttribute('no-export', '1'),
      this.svgObj.add(this.clickAreaElem),
      this.svgObj.add(this.textElem),
      this.svgObj.add(this.decorationAreaElem),
      this.minHeight = 0,
      this.vAlign = 'top',
      this.textElemOffset = 0,
      this.activeEditStyle = - 1,
      this.selectHidden = !1,
      this.linksDisabled = !1,
      this.editCallback = null,
      this.editCallbackData = null,
      this.dataTableID = - 1,
      this.dataRecordID = - 1,
      this.dataStyleOverride = null,
      this.lastFmtSize = {
        width: 0,
        height: 0
      },
      this.SetText(''),
      this.svgObj
  }

  SetText(e, t, a, r, i) {
    //'use strict';
    var n = a ||
      0,
      o = e.length;
    this.editor.IsActive() &&
      this.editor.ClearSelection(),
      !t &&
      this.activeEditStyle >= 0 &&
      (t = this.activeEditStyle),
      this.activeEditStyle = - 1,
      this.formatter.SetText(e, t, a, r),
      this.UpdateTextObject(),
      this.editor.IsActive() &&
      (
        i ||
        this.editor.UpdateTextEntryField(!1),
        this.editor.SetInsertPos(n + o, null, i)
      )
  }

  GetText(e, t) {
    //'use strict';
    return this.formatter.GetText(e, t)
  }

  GetTextLength() {
    //'use strict';
    return this.formatter.GetTextLength()
  }

  SetRuntimeText(e, t, a, r, i) {
    //'use strict';
    var n = t ||
      0,
      o = e.text.length;
    this.editor.IsActive() &&
      this.editor.ClearSelection(),
      this.activeEditStyle = - 1,
      this.formatter.SetRuntimeText(e, t, a, r),
      this.UpdateTextObject(),
      this.editor.IsActive() &&
      (
        i ||
        this.editor.UpdateTextEntryField(!1),
        this.editor.SetInsertPos(n + o, null, i)
      )
  }

  GetRuntimeText(e, t) {
    //'use strict';
    return this.formatter.GetRuntimeText(e, t)
  }

  DeleteText(e, t, a) {
    //'use strict';
    e = e ||
      0;
    this.editor.IsActive() &&
      this.editor.ClearSelection();
    var r = this.formatter.GetDataField(e);
    if (r && (e = r.startPos), t) {
      var i = e + t;
      (r = this.formatter.GetDataField(i)) &&
        r.startPos != i &&
        (i = r.endPos),
        t = i - e
    }
    this.activeEditStyle = - 1,
      this.formatter.DeleteText(e, t),
      this.UpdateTextObject(),
      this.editor.IsActive() &&
      (
        a ||
        this.editor.UpdateTextEntryField(!1),
        this.editor.SetInsertPos(e, null, a)
      )
  }

  Copy(e) {
    //'use strict';
    var t,
      a,
      r;
    if (this.editor.IsActive()) {
      if ((r = this.editor.GetSelection()).start === r.end) return null;
      r.start >= 0 &&
        r.end > r.start &&
        (t = r.start, a = r.end - r.start)
    }
    return e ? this.GetRuntimeText(t, a) : this.GetText(t, a)
  }

  Paste(e, t, a) {
    //'use strict';
    var r,
      i,
      n;
    if (
      this.editor.IsActive() &&
      (n = this.editor.GetSelection()).start >= 0 &&
      (r = n.start, i = n.end - n.start),
      t
    ) if (
        this.SetRuntimeText(e, r, i, !0, a),
        this.dataTableID > 0 &&
        this.dataRecordID > 0
      ) {
        var o = this.formatter.GetTextLength();
        this.UpdateFromData();
        var s = this.formatter.GetTextLength();
        if (
          this.editor.IsActive() &&
          (this.editor.UpdateTextEntryField(!1), o != s)
        ) {
          var l = this.editor.selStart + (s - o);
          this.editor.SetInsertPos(l)
        }
      } else this.formatter.ClearDataFieldRun(),
        this.UpdateTextObject();
    else this.SetText(e, null, r, i, a);
    this.CallEditCallback('edit')
  }

  Delete(e) {
    //'use strict';
    var t,
      a,
      r;
    this.editor.IsActive() &&
      (r = this.editor.GetSelection()).start >= 0 &&
      (t = r.start, a = r.end - r.start),
      this.DeleteText(t, a, e),
      this.CallEditCallback('edit')
  }

  SetSelectedFormat(e) {
    //'use strict';
    var t,
      a,
      r;
    this.editor.IsActive() &&
      (r = this.editor.GetSelection()).start >= 0 &&
      (t = r.start, a = r.end - r.start),
      this.SetFormat(e, t, a),
      this.CallEditCallback('edit')
  }

  GetSelectedFormat() {
    //'use strict';
    var e,
      t,
      a;
    return this.editor.IsActive() &&
      (a = this.editor.GetSelection()).start >= 0 &&
      (e = a.start, t = a.end - a.start),
      this.GetFormat(e, t)
  }

  SetSelectedAlignment(e) {
    //'use strict';
    var t,
      a,
      r;
    this.editor.IsActive() &&
      (r = this.editor.GetSelection()).start >= 0 &&
      (t = r.start, a = r.end - r.start),
      this.SetParagraphAlignment(e, t, a),
      this.CallEditCallback('edit')
  }

  GetSelectedAlignment() {
    //'use strict';
    var e,
      t = 0;
    return this.editor.IsActive() &&
      (e = this.editor.GetSelection()).start >= 0 &&
      (t = e.start),
      this.GetParagraphAlignment(t)
  }

  SetSelectedParagraphStyle(e) {
    //'use strict';
    var t,
      a,
      r;
    this.editor.IsActive() &&
      (r = this.editor.GetSelection()).start >= 0 &&
      (t = r.start, a = r.end - r.start),
      this.SetParagraphStyle(e, t, a),
      this.CallEditCallback('edit')
  }

  GetSelectedParagraphStyle() {
    //'use strict';
    var e,
      t = 0;
    return this.editor.IsActive() &&
      (e = this.editor.GetSelection()).start >= 0 &&
      (t = e.start),
      this.GetParagraphStyle(t)
  }

  SetSelectedHyperlink(e) {
    //'use strict';
    var t,
      a = 0,
      r = this.GetTextLength();
    this.editor.IsActive() &&
      (t = this.editor.GetSelection()).start >= 0 &&
      (a = t.start, r = t.end - t.start),
      this.SetHyperlink(e, a, r),
      this.CallEditCallback('edit')
  }

  GetSelectedHyperlink() {
    //'use strict';
    var e,
      t = 0;
    return this.editor.IsActive() &&
      (e = this.editor.GetSelection()).start >= 0 &&
      (t = e.start),
      this.GetHyperlink(t)
  }

  DeleteSelectedHyperlink() {
    //'use strict';
    var e,
      t = 0;
    this.editor.IsActive() &&
      (e = this.editor.GetSelection()).start >= 0 &&
      (t = e.start),
      this.DeleteHyperlink(t),
      this.CallEditCallback('edit')
  }

  SetFormat(e, t, a) {
    //'use strict';
    this.activeEditStyle = this.formatter.SetFormat(e, t, a),
      this.UpdateTextObject()
  }

  GetFormat(e, t) {
    //'use strict';
    var a;
    return a = this.activeEditStyle,
      0 === t &&
        a >= 0 ? this.formatter.GetFormatByID(a) : this.formatter.GetCommonFormatForRange(e, t)
  }

  SetVerticalAlignment(e) {
    //'use strict';
    this.vAlign = e,
      this.UpdateTextObject()
  }

  GetVerticalAlignment() {
    //'use strict';
    return this.vAlign
  }

  SetParagraphAlignment(e, t, a) {
    //'use strict';
    this.SetParagraphStyle({
      just: e
    }, t, a)
  }

  GetParagraphAlignment(e) {
    //'use strict';
    return this.GetParagraphStyle(e).just
  }

  SetParagraphStyle(e, t, a) {
    //'use strict';
    this.formatter.SetParagraphStyle(e, t, a),
      this.UpdateTextObject()
  }

  GetParagraphStyle(e) {
    //'use strict';
    return this.formatter.GetParagraphStyle(e)
  }

  GetParagraphCount() {
    //'use strict';
    return this.formatter.GetParagraphCount()
  }

  GetParagraphPosition(e) {
    //'use strict';
    return this.formatter.GetParagraphPosition(e)
  }

  SetHyperlink(e, t, a) {
    //'use strict';
    e &&
      e.length ? (this.formatter.SetHyperlink(e, t, a), this.UpdateTextObject()) : this.DeleteHyperlink(t)
  }

  GetHyperlink(e) {
    //'use strict';
    var t = this.formatter.GetHyperlinkAtOffset(e);
    return t ? t.url : null
  }

  DeleteHyperlink(e) {
    //'use strict';
    this.formatter.ClearHyperlink(e),
      this.UpdateTextObject()
  }

  GetHyperlinkAtLocation(e) {
    //'use strict';
    var t,
      a,
      r = e.gesture.center.clientX,
      i = e.gesture.center.clientY + $(window).scrollTop();
    return a = this.doc.ConvertWindowToElemCoords(r, i, this.textElem.node),
      (t = this.formatter.GetHyperlinkAtPoint(a)) ? t.url : null
  }

  SetConstraints(e, t, a) {
    //'use strict';
    void 0 === e &&
      void 0 === t ||
      this.formatter.SetLimits({
        maxWidth: e,
        minWidth: t
      }),
      void 0 !== a &&
      (this.minHeight = a),
      this.UpdateTextObject()
  }

  SetEditCallback(e, t) {
    //'use strict';
    this.editCallback = e,
      this.editCallbackData = t
  }

  CallEditCallback(e, t) {
    //'use strict';
    if (this.editCallback) return this.editCallback(e, t, this, this.editCallbackData)
  }

  GetTextSize() {
    //'use strict';
    var e = this.formatter.GetTextFormatSize();
    return e.height = Math.max(e.height, this.minHeight),
      e
  }

  GetTextMinDimensions() {
    // //'use strict';
    return this.formatter.GetFormatTextMinDimensions()
  }

  SetSize(e, t) {
    //'use strict';
    this.SetConstraints(e, e, t)
  }

  CalcTextFit(e) {
    //'use strict';
    return this.formatter.CalcTextFit(e)
  }

  CalcTextWrap(e) {
    //'use strict';
    return this.formatter.CalcTextWrap(e)
  }

  CalcFormatChange(e) {
    //'use strict';
    return this.formatter.CalcFormatChange(e)
  }

  SetRenderingEnabled(e) {
    //'use strict';
    var t = this.formatter.deferredRenderNeeded;
    void 0 === e &&
      (e = !0),
      this.formatter.renderingEnabled !== e &&
      (
        this.formatter.SetRenderingEnabled(e),
        e &&
        t &&
        this.UpdateTextObject()
      )
  }

  IsRenderingEnabled(e) {
    //'use strict';
    return this.formatter.renderingEnabled
  }

  GetContentVersion() {
    //'use strict';
    return this.formatter.GetContentVersion()
  }

  GetSpellCheck() {
    //'use strict';
    return this.formatter.GetSpellCheck()
  }

  SetSpellCheck(e, t) {
    //'use strict';
    this.formatter.SetSpellCheck(e),
      t &&
      (
        e ? this.doc.spellChecker &&
          this.doc.spellChecker.CheckSpellingForTextObj(this) : this.UpdateTextObject()
      )
  }

  UpdateSpellCheck(e) {
    //'use strict';
    this.formatter.UpdateSpellCheck(e),
      this.UpdateTextObject()
  }

  GetSpellCheckList() {
    //'use strict';
    return this.formatter.GetWordList()
  }

  DoSpellCheck() {
    //'use strict';
    this.formatter.SpellCheckValid() ? this.doc.spellChecker.CheckSpellingForTextObj(this) : this.formatter.UpdateSpellCheckFormatting()
  }

  GetSpellAtLocation(e, t) {
    //'use strict';
    var a;
    return t += $(window).scrollTop(),
      a = this.doc.ConvertWindowToElemCoords(e, t, this.textElem.node),
      this.formatter.GetSpellAtPoint(a)
  }

  UpdateTextObject() {
    //'use strict';
    var e,
      t,
      a = this.formatter.GetTextFormatSize(),
      r = !1,
      i = 0;
    if (this.formatter.renderingEnabled) {
      switch (t = Math.max(a.height, this.minHeight), this.vAlign) {
        case 'top':
          i = 0;
          break;
        case 'middle':
          i = (t - a.height) / 2;
          break;
        case 'bottom':
          i = t - a.height
      }(e = {
        width: a.width,
        height: t
      }).width == this.lastFmtSize.width &&
        e.height == this.lastFmtSize.height ||
        (this.CallEditCallback('willresize', e), r = !0),
        this.svgObj.size(a.width, t),
        this.clickAreaElem.transform({
          x: 0,
          y: 0
        }),
        this.clickAreaElem.size(a.width, t),
        this.textElem.size(a.width, a.height),
        this.textElem.transform({
          x: 0,
          y: i
        }),
        this.decorationAreaElem.size(a.width, a.height),
        this.decorationAreaElem.transform({
          x: 0,
          y: i
        }),
        this.textElemOffset = i,
        this.geometryBBox.width = a.width,
        this.geometryBBox.height = t,
        this.RefreshPaint(),
        this.formatter.RenderFormattedText(this.textElem, this.decorationAreaElem),
        this.linksDisabled ||
        this.cursorState !== ConstantData.CursorState.EDITLINK &&
        this.cursorState !== ConstantData.CursorState.LINKONLY ||
        this.formatter.SetHyperlinkCursor(),
        this.editor.IsActive() &&
        (
          this.editor.cursorPos >= 0 ? this.editor.UpdateCursor() : this.editor.selStart >= 0 &&
            this.editor.UpdateSelection()
        ),
        r &&
        (
          e = {
            width: a.width,
            height: t
          },
          this.CallEditCallback('didresize', e)
        ),
        this.lastFmtSize = e
    }
  }

  Activate(e, t) {
    //'use strict';
    this.activeEditStyle = - 1,
      this.selectHidden = !1,
      this.doc.SetActiveEdit(this),
      this.editor.Activate(e, t)
  }

  Deactivate(e) {
    //'use strict';
    this.activeEditStyle = - 1,
      this.doc.activeEdit = null,
      this.editor.Deactivate(e)
  }

  IsActive() {
    //'use strict';
    return this.editor.IsActive()
  }

  SetVirtualKeyboardHook(e, t) {
    this.editor.SetVirtualKeyboardHook(e, t)
  }

  GetSelectedRange() {
    //'use strict';
    var e = {
      start: - 1,
      end: - 1
    };
    return this.editor.IsActive() &&
      (e = this.editor.GetSelection()),
      e
  }

  SetSelectedRange(e, t, a, r) {
    //'use strict';
    e < 0 ||
      !this.editor.IsActive() ||
      (
        e != t &&
        (this.activeEditStyle = - 1),
        this.editor.SetSelection(e, t, a, r),
        this.CallEditCallback('select')
      )
  }

  HandleKeyPressEvent(e) {
    //'use strict';
    return !!this.editor.IsActive() &&
      this.editor.HandleKeyPress(e)
  }

  HandleKeyDownEvent(e) {
    //'use strict';
    return !!this.editor.IsActive() &&
      this.editor.HandleKeyDown(e)
  }

  HideSelection() {
    //'use strict';
    this.selectElem.plot(),
      this.svgObj.remove(this.selectElem)
  }

  ShowSelection(e) {
    //'use strict';
    this.selectElem.attr('fill', '#8888FF'),
      this.selectElem.attr('stroke-width', 0),
      this.selectElem.attr('fill-opacity', 0.4),
      this.selectElem.attr('pointer-events', 'none'),
      this.selectElem.transform({
        y: this.textElemOffset
      }),
      this.selectHidden ? this.selectElem.attr('visibility', 'hidden') : this.selectElem.attr('visibility', 'visible'),
      e &&
      this.selectElem.plot(e),
      this.svgObj.add(this.selectElem)
  }

  SetSelectionVisible(e) {
    //'use strict';
    this.selectHidden = !e,
      this.IsActive() &&
      (
        this.selectHidden ? (
          this.cursorElem.attr('visibility', 'hidden'),
          this.selectElem.attr('visibility', 'hidden')
        ) : (
          this.cursorElem.attr('visibility', 'visible'),
          this.selectElem.attr('visibility', 'visible')
        )
      )
  }

  HideInputCursor() {
    //'use strict';
    void 0 !== this.cursorTimer &&
      (clearInterval(this.cursorTimer), this.cursorTimer = void 0),
      this.cursorElem.attr('visibility', 'hidden'),
      this.svgObj.remove(this.cursorElem),
      this.cursorPos = void 0
  }

  ShowInputCursor(e, t, a) {
    //'use strict';
    var r = this.doc.ConverWindowToDocLength(1);
    void 0 !== this.cursorTimer &&
      clearInterval(this.cursorTimer),
      this.cursorElem.attr('fill', 'none'),
      this.cursorElem.attr('stroke-width', r),
      this.cursorElem.attr('stroke', '#000'),
      this.cursorElem.attr('pointer-events', 'none'),
      this.cursorElem.attr({
        x1: e,
        y1: t + this.textElemOffset,
        x2: e,
        y2: a + this.textElemOffset
      }),
      this.selectHidden ? this.cursorElem.attr('visibility', 'hidden') : this.cursorElem.attr('visibility', 'visible'),
      this.svgObj.add(this.cursorElem),
      this.cursorPos = {
        x: e,
        y1: t + this.textElemOffset,
        y2: a + this.textElemOffset
      },
      this.cursorTimer = setInterval(
        (
          function (e) {
            e.cursorElem.attr('visibility', 'hidden'),
              setTimeout(
                (
                  function (e) {
                    e.selectHidden ||
                      e.cursorElem.attr('visibility', 'visible')
                  }
                ),
                250,
                e
              )
          }
        ),
        1000,
        this
      ),
      this.editor.IsActive() &&
      this.editor.virtualKeyboardHook &&
      this.editor.virtualKeyboardHook(this, !0)
  }

  GetInputCursorPos() {
    //'use strict';
    var e,
      t;
    this.cursorPos;
    if (this.cursorPos) return e = this.doc.ConvertElemToWindowCoords(this.cursorPos.x, this.cursorPos.y1, this.svgObj.node),
      t = this.doc.ConvertElemToWindowCoords(this.cursorPos.x, this.cursorPos.y2, this.svgObj.node),
    {
      x1: e.x,
      y1: e.y,
      x2: t.x,
      y2: t.y
    }
  }

  SetCursorState(e) {
    //'use strict';
    this.cursorState = e,
      this.ClearAllCursors(),
      e !== ConstantData.CursorState.EDITONLY &&
      e !== ConstantData.CursorState.EDITLINK ||
      this.SetCursor(Element.CursorType.TEXT),
      this.linksDisabled ||
      e !== ConstantData.CursorState.EDITLINK &&
      e !== ConstantData.CursorState.LINKONLY ||
      this.formatter.SetHyperlinkCursor()
  }

  GetCursorState() {
    //'use strict';
    return this.cursorState
  }

  DisableHyperlinks(e) {
    //'use strict';
    this.linksDisabled = e,
      this.SetCursorState(this.cursorState),
      this.UpdateTextObject()
  }

  InitDataSettings(e, t, a) {
    //'use strict';
    this.dataTableID = e,
      this.dataRecordID = t,
      this.dataStyleOverride = a
  }

  IsDataInitted() {
    //'use strict';
    return this.dataTableID > 0 &&
      this.dataRecordID > 0
  }

  GetDataField(e) {
    //'use strict';
    return this.formatter.GetDataField(e)
  }

  InsertDataField(e, t, a) {
    //'use strict';
    var r = this.GetDataText(e, this.formatter.GetDataNameDisplay()),
      i = {
        dataField: /*Basic.Text.Formatter*/BasicTextFormatter.FormatDataFieldID(e, !0)
      };
    this.SetText(r, i, t, a)
  }

  PasteDataField(e) {
    //'use strict';
    var t,
      a,
      r;
    this.editor.IsActive() &&
      (r = this.editor.GetSelection()).start >= 0 &&
      (t = r.start, a = r.end - r.start),
      this.InsertDataField(e, t, a),
      this.CallEditCallback('edit')
  }

  HasDataFields() {
    //'use strict';
    return this.formatter.HasDataFields()
  }

  HasDataField(e) {
    //'use strict';
    return this.formatter.HasDataField(e)
  }

  UpdateFromData(e, t) {
    //'use strict';
    void 0 !== e &&
      void 0 !== t &&
      (
        e == this.dataTableID &&
        t == this.dataRecordID ||
        (this.dataStyleOverride = null),
        this.InitDataSettings(e, t, this.dataStyleOverride)
      ),
      this.formatter.RebuildFromData(),
      this.UpdateTextObject()
  }

  SetDataNameDisplay(e) {
    //'use strict';
    this.formatter.SetDataNameDisplay(e),
      this.UpdateFromData(this.dataTableID, this.dataRecordID)
  }

  GetDataNameDisplay() {
    //'use strict';
    return this.formatter.GetDataNameDisplay()
  }

  GetDataText(e, t) {
    //'use strict';
    var a,
      r = ' ';
    return this.dataTableID < 0 ||
      this.dataRecordID < 0 ||
      (
        e = /*Basic.Text.Formatter*/BasicTextFormatter.FormatDataFieldID(e, !1),
        t ? r = ListManager.SDData.FieldedDataGetFieldName(this.dataTableID, e) : (
          r = ListManager.SDData.FieldedDataGetFieldValue(this.dataTableID, this.dataRecordID, e),
          a = ListManager.SDData.FieldedDataGetFieldType(this.dataTableID, e),
          r = gListManager.ModifyFieldDataForDisplay(r, a)
        ),
        r &&
        '' != r ||
        (r = ' ')
      ),
      r
  }

  GetDataStyle(e) {
    //'use strict';
    var t = [];
    if (this.dataTableID < 0 || this.dataRecordID < 0) return t;
    e = /*Basic.Text.Formatter*/BasicTextFormatter.FormatDataFieldID(e, !1);
    var a = ListManager.SDData.FieldedDataGetFieldStyle(this.dataTableID, this.dataRecordID, e);
    return a &&
      (t = ListManager.SDData.FieldedDataParseStyle(a)),
      t
  }

  CheckDataExists(e) {
    //'use strict';
    return !(this.dataTableID < 0 || this.dataRecordID < 0) &&
      (
        e = /*Basic.Text.Formatter*/BasicTextFormatter.FormatDataFieldID(e, !1),
        !!ListManager.SDData.FieldedDataGetRecord(this.dataTableID, this.dataRecordID)[e]
      )
  }

  RenderDataFieldHilites() {
    //'use strict';
    this.formatter.RenderDataFieldHilites(this.decorationAreaElem)
  }

  ClearDataFieldHilites() {
    //'use strict';
    this.formatter.ClearDataFieldHilites(this.decorationAreaElem)
  }

  RemapDataFields(e) {
    //'use strict';
    this.HasDataFields() &&
      this.formatter.RemapDataFields(e)
  }


  static RemapDataFieldsInRuntimeText(e, t) {
    //'use strict';
    var a,
      r,
      i = function (e) {
        var a,
          r = (e = e.split('_'))[0],
          i = e[1];
        for (a = 0; a < t.length; a++) t[a].srcFieldID == r &&
          (r = t[a].dstFieldID);
        return r += '_' + i
      };
    for (a = 0; a < e.styles.length; a++) (r = e.styles[a].dataField) &&
      (e.styles[a].dataField = i(r))
  }

  static CursorState = {
    NONE: 0,
    EDITONLY: 1,
    EDITLINK: 2,
    LINKONLY: 3
  }

  // Object.freeze(Text.CursorState),
  static ParagraphFormat() {
    this.just = 'center',
      this.bullet = 'none',
      this.spacing = 0,
      this.lindent = 0,
      this.rindent = 0,
      this.pindent = 0,
      this.tabspace = 0,
      this.vjust = 'middle'
  }


}

export default Text


// export default Basic.Text;
