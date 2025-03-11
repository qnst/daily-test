


// import ShapeController from './ToolOpt'
import BusinessController from './BusinessController'
import ConnectionPointsController from './ConnectionPointsController'
import DocOpt from '../../Doc/DocOpt'
import ActiveSelection from './ActiveSelection'
import T3Gv from '../../Data/T3Gv'
import Resources from '../../Data/Resources'
import Clipboard from '../Business/Clipboard'
import Commands from './ToolOpt'
import $ from 'jquery'
import Utils3 from '../../Helper/Utils3'
import DataOpt from '../../Data/DataOpt'

import ConstantData from '../../Data/ConstantData'
import ConstantData2 from '../../Data/ConstantData2'
import ShapeController from './ShapeController copy'


// Do not use this class
class MainController {

  public Shapes: any;
  public Business: any;
  public ConnectionPoints: any;
  public Document: any;
  public Selection: any;

  constructor() {
    this.Selection = new ActiveSelection();
    this.Shapes = new ShapeController();
    this.Document = new DocOpt();
    this.Business = new BusinessController();
    this.ConnectionPoints = new ConnectionPointsController();
  }

  ShowContextualMenu() {
    console.log('ShowContextualMenu')
  }

  // move this to keyboard util
  HandleKeyDown(e, t, a) {
    // if (!0 !== this.Modals.ModalsVisible()) {
    if (T3Gv.optManager.touchPanStarted && t == ConstantData2.Keys.Space)
      return e.stopPropagation(),
        void e.preventDefault();
    var r, i, n, o = [], s = 0, l = 0, S = (t == ConstantData2.Keys.Left_Arrow ||
      t == ConstantData2.Keys.Right_Arrow || t == ConstantData2.Keys.Up_Arrow ||
      t == ConstantData2.Keys.Down_Arrow) && Resources.DocumentContext &&
      ConstantData.DocumentContext.UserSettings && ConstantData.DocumentContext.UserSettings.DisableCtrlArrowShapeInsert;

    // Double === TODO
    var deferedTextEdit;
    if (1 == a && (67 == t || 99 == t || 88 == t || 120 == t || 86 == t || 118 == t))
      Clipboard.isFF && Clipboard.FocusOnIEclipboardDiv();
    else {
      if (!1,
        i = !1,
        deferedTextEdit = !1,
        null != (r = null/*this.Modals.GetModalContext()*/) && o.push(r),
        n = this.Selection.GetSelectionContext(),
        "titleInput" === e.target.id && (n = Resources.Contexts.Text),
        n instanceof Array)
        for (s = n.length,
          l = 0; l < s; l++)
          o.push(n[l]);
      else
        o.push(n);
      var c = null;// this.SmartPanels.GetSmartPanelContext();
      o.indexOf(c) < 0 && o.push(c),
        o.push(Resources.Contexts.All),
        s = o.length,
        T3Gv.docUtil.IsReadOnly() && ((o = []).push(Resources.Contexts.ReadOnly),
          s = o.length);
      for (var u = 0; u < s; u++) {
        var p = o[u]
          , d = Resources.KeyboardCommand.prototype.GetCommandsInContext(p)
          , D = d.length;
        for (l = 0; l < D; l++) {
          var g = d[l];
          if (g.KeyCode === t && g.ModifierKey === a) {
            if (S && i)
              break;
            if (!g.Execute())
              return e.stopPropagation(),
                e.preventDefault()

            // Double === TODO
            // ,
            // void SDUI.Utils.Logger.LogKeyboardCommand(t, a)
          }
        }
        if (!1 === ConstantData.DocumentContext.CanTypeInWorkArea)
          return void (t === ConstantData2.Keys.Escape && gListManager.Comment_Cancel());
        if (p !== Resources.Contexts.DimensionText && p !== Resources.Contexts.NoteText || (i = !0),
          p === Resources.Contexts.Text && (a === Resources.ModifierKeys.None || a === Resources.ModifierKeys.Shift || a === Resources.ModifierKeys.Ctrl || a === Resources.ModifierKeys.Ctrl_Shift))
          if (!1 === Commands.MainController.Shapes.IsActiveTextEdit() && "titleInput" != e.target.id) {
            if (-1 != ConstantData2.NonTextKeys.indexOf(t))
              continue;
            a != Resources.ModifierKeys.Ctrl && (i = !0)
          } else
            i = !0;
        if (i && a != Resources.ModifierKeys.Ctrl)
          break
      }
      i && (t === ConstantData2.Keys.Escape ? (T3Gv.optManager.DeactivateAllTextEdit(!1),
        T3Gv.optManager.bInNoteEdit && T3Gv.optManager.Note_CloseEdit(),
        T3Gv.optManager.RenderAllSVGSelectionStates(),
        e.stopPropagation(),
        e.preventDefault()) : Commands.MainController.Shapes.HandleKeyDown(e, t, a) && (e.stopPropagation(),
          e.preventDefault()))
    }
    // }
  }


  // SaveAs = function () {



  //   var t = "TestSaveDouble";
  //   var a = ".sdr";
  //   var CredentialID = "-1";
  //   var CurrentFolder = "-1";

  //   T3Gv.optManager.CloseEdit();

  //   // save data to locastorage
  //   DataOpt.SaveToLocal();


  // }


  // move to keyboard util
  HandleKeyPress = function (e, t) {
    var a = !1;
    if (T3Gv.optManager.touchPanStarted && t == ConstantData2.Keys.Space)
      return e.stopPropagation(),
        void e.preventDefault();
    if (true/*!0 !== this.Modals.ModalsVisible()*/)
      if (1 == Utils3.GetModifierKeys(e) && (67 == t || 99 == t || 88 == t || 120 == t || 86 == t || 118 == t))
        Clipboard.isFF && Clipboard.FocusOnIEclipboardDiv();
      else if (!1 !== ConstantData.DocumentContext.CanTypeInWorkArea && !T3Gv.docUtil.IsReadOnly()) {
        var r = this.Selection.GetSelectionContext();
        r instanceof Array && (a = r.indexOf(Resources.Contexts.Text) >= 0),
          (a || r === Resources.Contexts.Text || r === Resources.Contexts.DimensionText ||
            r === Resources.Contexts.NoteText) && Commands.MainController.Shapes.HandleKeyPress(e, t)
          && e.stopPropagation()
      }
  }
}

export default MainController
