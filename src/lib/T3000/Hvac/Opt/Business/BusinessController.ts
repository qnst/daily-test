
import ConstantData from '../../Data/ConstantData'

// DO NOT USER THIS CLASS
class BusinessController {

  static Collab_RecordMessage = function (e, t, a, r, i) {
    if (
      !(e instanceof Business.LineDraw && i) &&
      Collab.AllowMessage()
    ) {
      null == t &&
        (t = Business.GetTargetShape(!0));
      var n = SDJS_Business_GetModuleName(e);
      if (null == n && (n = ''), null != n) {
        // Collab.BeginSecondaryEdit();
        var o = ConstantData.CollabMessages.ActionButton;
        r &&
          (o = r);
        var s = {
          BlockID: t,
          Direction: a,
          SelectionManagerName: n,
          CreateList: []
        },
          l = gListManager.GetObjectPtr(gListManager.theSEDSessionBlockID, !1);
        return s.def = Utils1.DeepCopy(l.def),
          s.symbolID = SDUI.Commands.MainController.Symbols.CurrentSymbol,
          Collab.BuildMessage(o, s, !0, !0)
      }
    }
  }

  static AddRight = function (e, t, a) {
    try {
      if (null != t && (t = T3Gv.optManager.SD_GetVisioTextParent(t)), a) var r = a;
      else r = Business.GetSelectionBusinessManager(t);
      if (null == r && (r = T3Gv.gBusinessManager), r && r.AddLeftRight) if (null == t && (t = r.GetTargetShape(!0)), t >= 0) {
        if (r.AllowAdd(t, ConstantData.ActionArrow.RIGHT)) {
          var i = Collab.AreMessagesLocked();
          Collab.LockMessages();
          var n = this.Collab_RecordMessage(r, t, ConstantData.ActionArrow.RIGHT, null, e);
          Collab.IsProcessingMessage() ||
            r.CloseEdit(e),
            r.AddLeftRight(!1, !1, e, t),
            n &&
            (
              Collab.IsSecondary() &&
              Collab.CreateList.length &&
              (
                n.Data.CreateList = n.Data.CreateList.concat(Collab.CreateList)
              ),
              Collab.SendMessage(n)
            ),
            i ||
            (Collab.UnLockMessages(), Collab.UnBlockMessages())
        }
      } else Utils2.Alert(Resources.Strings.NoShape, null)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }


  static AddLeft = function (e, t, a) {
    try {
      if (null != t && (t = T3Gv.optManager.SD_GetVisioTextParent(t)), a) var r = a;
      else r = Business.GetSelectionBusinessManager(t);
      if (null == r && (r = T3Gv.gBusinessManager), r && r.AddLeftRight) if (null == t && (t = r.GetTargetShape(!0)), t >= 0) {
        if (r.AllowAdd(t, ConstantData.ActionArrow.LEFT)) {
          var i = Collab.AreMessagesLocked();
          Collab.LockMessages();
          var n = this.Collab_RecordMessage(r, t, ConstantData.ActionArrow.LEFT, null, e);
          Collab.IsProcessingMessage() ||
            r.CloseEdit(e),
            r.AddLeftRight(!0, !1, e, t),
            n &&
            (
              Collab.IsSecondary() &&
              Collab.CreateList.length &&
              (
                n.Data.CreateList = n.Data.CreateList.concat(Collab.CreateList)
              ),
              Collab.SendMessage(n)
            ),
            i ||
            (Collab.UnLockMessages(), Collab.UnBlockMessages())
        }
      } else Utils2.Alert(Resources.Strings.NoShape, null)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static AddBelow = function (e, t, a) {
    try {
      if (null != t && (t = T3Gv.optManager.SD_GetVisioTextParent(t)), a) var r = a;
      else r = Business.GetSelectionBusinessManager(t);
      if (null == r && (r = T3Gv.gBusinessManager), r && r.AddAboveBelow) if (null == t && (t = r.GetTargetShape(!0)), t >= 0) {
        if (r.AllowAdd(t, ConstantData.ActionArrow.DOWN)) {
          var i = Collab.AreMessagesLocked();
          Collab.LockMessages();
          var n = this.Collab_RecordMessage(r, t, ConstantData.ActionArrow.DOWN, null, e);
          Collab.IsProcessingMessage() ||
            r.CloseEdit(e),
            r.AddAboveBelow(!1, !1, e, t),
            n &&
            (
              Collab.IsSecondary() &&
              Collab.CreateList.length &&
              (
                n.Data.CreateList = n.Data.CreateList.concat(Collab.CreateList)
              ),
              Collab.SendMessage(n)
            ),
            i ||
            (Collab.UnLockMessages(), Collab.UnBlockMessages())
        }
      } else Utils2.Alert(Resources.Strings.NoShape, null)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static AddAbove = function (e, t, a) {
    try {
      if (null != t && (t = T3Gv.optManager.SD_GetVisioTextParent(t)), a) var r = a;
      else r = Business.GetSelectionBusinessManager(t);
      if (null == r && (r = T3Gv.gBusinessManager), r && r.AddAboveBelow) if (null == t && (t = r.GetTargetShape(!0)), t >= 0) {
        if (r.AllowAdd(t, ConstantData.ActionArrow.UP)) {
          var i = Collab.AreMessagesLocked();
          Collab.LockMessages();
          var n = this.Collab_RecordMessage(r, t, ConstantData.ActionArrow.UP, null, e);
          Collab.IsProcessingMessage() ||
            r.CloseEdit(e),
            r.AddAboveBelow(!0, !1, e, t),
            n &&
            (
              Collab.IsSecondary() &&
              Collab.CreateList.length &&
              (
                n.Data.CreateList = n.Data.CreateList.concat(Collab.CreateList)
              ),
              Collab.SendMessage(n)
            ),
            i ||
            (Collab.UnLockMessages(), Collab.UnBlockMessages())
        }
      } else Utils2.Alert(Resources.Strings.NoShape, null)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static AddCustom = function (e, t, a, r) {
    try {
      if (r) var i = r;
      else i = Business.GetSelectionBusinessManager(t);
      if (null == i && (i = T3Gv.gBusinessManager), i && i.AddCustom) {
        var n = Collab.AreMessagesLocked();
        Collab.LockMessages();
        var o = this.Collab_RecordMessage(i, t, ConstantData.ActionArrow.CUSTOM, null, e);
        o &&
          (o.Data.buttonindex = a),
          Collab.IsProcessingMessage() ||
          i.CloseEdit(e),
          i.AddCustom(a, !1, e, t),
          o &&
          (
            Collab.IsSecondary() &&
            Collab.CreateList.length &&
            (
              o.Data.CreateList = o.Data.CreateList.concat(Collab.CreateList)
            ),
            Collab.SendMessage(o)
          ),
          n ||
          (Collab.UnLockMessages(), Collab.UnBlockMessages())
      }
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static AddParents = function (e, t, a) {
    try {
      if (a) var r = a;
      else r = Business.GetSelectionBusinessManager(t);
      if (null == r && (r = T3Gv.gBusinessManager), r && r.AddParents) if (null == t && (t = r.GetTargetShape(!0)), t >= 0) {
        var i = Collab.AreMessagesLocked();
        Collab.LockMessages();
        var n = this.Collab_RecordMessage(r, t, ConstantData.ActionArrow.ADDPARENTS);
        Collab.IsProcessingMessage() ||
          r.CloseEdit(e),
          r.AddParents(t),
          n &&
          (
            Collab.IsSecondary() &&
            Collab.CreateList.length &&
            (
              n.Data.CreateList = n.Data.CreateList.concat(Collab.CreateList)
            ),
            Collab.SendMessage(n)
          ),
          i ||
          (Collab.UnLockMessages(), Collab.UnBlockMessages())
      } else Utils2.Alert(Resources.Strings.NoShape, null);
      else Utils2.Alert(Resources.Strings.OrgChart_NoSelect, null)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static AddDescendants = function (e, t, a) {
    try {
      if (a) var r = a;
      else r = Business.GetSelectionBusinessManager(t);
      if (null == r && (r = T3Gv.gBusinessManager), r && r.AddDescendants) if (null == t && (t = r.GetTargetShape(!0)), t >= 0) {
        var i = Collab.AreMessagesLocked();
        Collab.LockMessages();
        var n = this.Collab_RecordMessage(r, t, ConstantData.ActionArrow.ADDDESCENDANTS);
        Collab.IsProcessingMessage() ||
          r.CloseEdit(e),
          r.AddDescendants(t),
          n &&
          (
            Collab.IsSecondary() &&
            Collab.CreateList.length &&
            (
              n.Data.CreateList = n.Data.CreateList.concat(Collab.CreateList)
            ),
            Collab.SendMessage(n)
          ),
          i ||
          (Collab.UnLockMessages(), Collab.UnBlockMessages())
      } else Utils2.Alert(Resources.Strings.NoShape, null);
      else Utils2.Alert(Resources.Strings.OrgChart_NoSelect, null)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static ActionClick = function (e, t, a, r) {
    try {
      if (r) var i = r;
      else i = Business.GetSelectionBusinessManager(t);
      if (null == i && (i = T3Gv.gBusinessManager), i && i.ActionClick) {
        null == t &&
          (t = i.GetTargetShape());
        var n = Collab.AreMessagesLocked();
        Collab.LockMessages(),
          i.ActionClick(e, t, a),
          n ||
          (Collab.UnLockMessages(), Collab.UnBlockMessages())
      }
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static CompleteAction = function (e, t) {
    try {
      var a = Business.GetSelectionBusinessManager(e);
      null == a &&
        (a = T3Gv.gBusinessManager),
        a &&
        a.CompleteAction &&
        a.CompleteAction(e, t)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static AddLineLabel = function (e) {
    try {
      var t = null,
        a = Business.GetSelectionBusinessManager(e);
      return null == a &&
        (a = T3Gv.gBusinessManager),
        a &&
        a.AddLineLabel &&
        (t = a.AddLineLabel(e)),
        t
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static InsertShape = function (e, t) {
    try {
      var a = Business.GetSelectionBusinessManager(t);
      null == a &&
        (a = T3Gv.gBusinessManager),
        a &&
        a.InsertShape &&
        a.InsertShape(e)
    } catch (e) {
      T3Gv.optManager.ExceptionCleanup(e)
    }
  }

  static StopActionEventPropagation = function (e) {
    try {
      var t = Business.GetSelectionBusinessManager(e);
      return null == t &&
        (t = T3Gv.gBusinessManager),
        !(!t || !t.StopActionEventPropagation) &&
        t.StopActionEventPropagation()
    } catch (e) {
      T3Gv.optManager.ExceptionCleanup(e)
    }
  }

  static CreateActionButton = function (e, t, a, r) {
    try {
      var i = Business.GetSelectionBusinessManager(r);
      return null == i &&
        (i = T3Gv.gBusinessManager),
        i &&
          i.CreateActionButton ? i.CreateActionButton(e, t, a) : null
    } catch (e) {
      T3Gv.optManager.ExceptionCleanup(e)
    }
  }

  static CreateCustomActionButtons = function (e, t, a, r) {
    try {
      var i = Business.GetSelectionBusinessManager(r);
      return null == i &&
        (i = T3Gv.gBusinessManager),
        i &&
          i.CreateCustomActionButtons ? i.CreateCustomActionButtons(e, t, a) : null
    } catch (e) {
      T3Gv.optManager.ExceptionCleanup(e)
    }
  }

  static RotateActionButtons = function () {
    try {
      var e = Business.GetSelectionBusinessManager();
      return null == e &&
        (e = T3Gv.gBusinessManager),
        e &&
          e.RotateActionButtons ? e.RotateActionButtons() : null
    } catch (e) {
      T3Gv.optManager.ExceptionCleanup(e)
    }
  }

  static RemoveStep = function (e) {
    try {
      if (e) var t = e;
      else t = Business.GetSelectionBusinessManager();
      if (null == t && (t = T3Gv.gBusinessManager), t && t.RemoveShape) {
        var a = Collab.AreMessagesLocked();
        Collab.LockMessages(),
          Collab.IsProcessingMessage() ||
          T3Gv.optManager.CloseEdit(),
          t.RemoveShape(),
          a ||
          (Collab.UnLockMessages(), Collab.UnBlockMessages())
      }
    } catch (e) {
      T3Gv.optManager.ExceptionCleanup(e)
    }
  }

  static SplitPathRight = function (e, t) {
    try {
      if (t) var a = t;
      else a = Business.GetSelectionBusinessManager(e);
      if (
        null == a &&
        'FLOWCHART' === gListManager.theContentHeader.BusinessModule &&
        (a = T3Gv.gBusinessManager),
        null == a
      ) this.GrowRight();
      else if (a && a.AddSplitPath) if (null == e && (e = Business.GetTargetShape(!0, !0)), e >= 0) {
        var r = Collab.AreMessagesLocked();
        Collab.LockMessages();
        var i = this.Collab_RecordMessage(
          a,
          e,
          ConstantData.ActionArrow.RIGHT,
          ConstantData.CollabMessages.ActionButton_SplitPath
        );
        Collab.IsProcessingMessage() ||
          T3Gv.optManager.CloseEdit(),
          a.AddSplitPath(!1, !1, e),
          i &&
          (
            Collab.IsSecondary() &&
            Collab.CreateList.length &&
            (
              i.Data.CreateList = i.Data.CreateList.concat(Collab.CreateList)
            ),
            Collab.SendMessage(i)
          ),
          r ||
          (Collab.UnLockMessages(), Collab.UnBlockMessages())
      } else Utils2.Alert(Resources.Strings.NoShape, null);
      else Utils2.Alert(Resources.Strings.NoShape, null)
    } catch (e) {
      T3Gv.optManager.ExceptionCleanup(e)
    }
  }

  static SplitPathLeft = function (e, t) {
    try {
      if (t) var a = t;
      else a = Business.GetSelectionBusinessManager(e);
      if (
        null == a &&
        'FLOWCHART' === T3Gv.optManager.theContentHeader.BusinessModule &&
        (a = T3Gv.gBusinessManager),
        null == a
      ) this.GrowLeft();
      else if (a && a.AddSplitPath) if (null == e && (e = Business.GetTargetShape(!0, !0)), e >= 0) {
        var r = Collab.AreMessagesLocked();
        Collab.LockMessages();
        var i = this.Collab_RecordMessage(
          a,
          e,
          ConstantData.ActionArrow.LEFT,
          ConstantData.CollabMessages.ActionButton_SplitPath
        );
        Collab.IsProcessingMessage() ||
          T3Gv.optManager.CloseEdit(),
          a.AddSplitPath(!0, !1, e),
          i &&
          (
            Collab.IsSecondary() &&
            Collab.CreateList.length &&
            (
              i.Data.CreateList = i.Data.CreateList.concat(Collab.CreateList)
            ),
            Collab.SendMessage(i)
          ),
          r ||
          (Collab.UnLockMessages(), Collab.UnBlockMessages())
      } else Utils2.Alert(Resources.Strings.NoShape, null);
      else Utils2.Alert(Resources.Strings.NoShape, null)
    } catch (e) {
      T3Gv.optManager.ExceptionCleanup(e)
    }
  }

  static SplitPathDown = function (e, t) {
    try {
      if (t) var a = t;
      else a = Business.GetSelectionBusinessManager(e);
      if (
        null == a &&
        'FLOWCHART' === gListManager.theContentHeader.BusinessModule &&
        (a = T3Gv.gBusinessManager),
        null == a
      ) this.GrowDown();
      else if (a && a.AddSplitPath) if (null == e && (e = Business.GetTargetShape(!0, !0)), e >= 0) {
        var r = Collab.AreMessagesLocked();
        Collab.LockMessages();
        var i = this.Collab_RecordMessage(
          a,
          e,
          ConstantData.ActionArrow.DOWN,
          ConstantData.CollabMessages.ActionButton_SplitPath
        );
        Collab.IsProcessingMessage() ||
          gListManager.CloseEdit(),
          a.AddSplitPath(!1, !0, e),
          i &&
          (
            Collab.IsSecondary() &&
            Collab.CreateList.length &&
            (
              i.Data.CreateList = i.Data.CreateList.concat(Collab.CreateList)
            ),
            Collab.SendMessage(i)
          ),
          r ||
          (Collab.UnLockMessages(), Collab.UnBlockMessages())
      } else Utils2.Alert(Resources.Strings.NoShape, null);
      else Utils2.Alert(Resources.Strings.NoShape, null)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static SplitPathUp = function (e, t) {
    try {
      if (t) var a = t;
      else a = Business.GetSelectionBusinessManager(e);
      if (
        null == a &&
        'FLOWCHART' === gListManager.theContentHeader.BusinessModule &&
        (a = gBusinessManager),
        null == a
      ) this.GrowUp();
      else if (a && a.AddSplitPath) if (null == e && (e = Business.GetTargetShape(!0, !0)), e >= 0) {
        var r = Collab.AreMessagesLocked();
        Collab.LockMessages();
        var i = this.Collab_RecordMessage(
          a,
          e,
          ConstantData.ActionArrow.UP,
          ConstantData.CollabMessages.ActionButton_SplitPath
        );
        Collab.IsProcessingMessage() ||
          gListManager.CloseEdit(),
          a.AddSplitPath(!0, !0, e),
          i &&
          (
            Collab.IsSecondary() &&
            Collab.CreateList.length &&
            (
              i.Data.CreateList = i.Data.CreateList.concat(Collab.CreateList)
            ),
            Collab.SendMessage(i)
          ),
          r ||
          (Collab.UnLockMessages(), Collab.UnBlockMessages())
      } else Utils2.Alert(Resources.Strings.NoShape, null);
      else Utils2.Alert(Resources.Strings.NoShape, null)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static JoinPath = function (e, t) {
    try {
      if (t) var a = t;
      else a = Business.GetSelectionBusinessManager(e);
      if (null == a && (a = gBusinessManager), a && a.JoinPath) if (null == e && (e = Business.GetTargetShape(!0, !0)), e >= 0) {
        if (a.JoinPath(e, !1, !0)) {
          var r = Collab.AreMessagesLocked();
          Collab.LockMessages(),
            Collab.IsProcessingMessage() ||
            gListManager.CloseEdit();
          var i = this.Collab_RecordMessage(
            a,
            e,
            ConstantData.ActionArrow.UP,
            ConstantData.CollabMessages.ActionButton_JoinPath
          );
          a.JoinPath(e, !1, !1),
            i &&
            Collab.SendMessage(i)
        }
        r ||
          (Collab.UnLockMessages(), Collab.UnBlockMessages())
      } else Utils2.Alert(Resources.Strings.NoShape, null);
      else Utils2.Alert(Resources.Strings.NoShape, null)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static AddRightPeer = function (e, t, a) {
    try {
      if (t) var r = t;
      else r = Business.GetSelectionBusinessManager(e);
      if (null == r && (r = gBusinessManager), r && r.AddRightPeer) {
        if (null == e) e = Business.GetTargetShape(!0, !0);
        if (e >= 0) {
          var i = Collab.AreMessagesLocked();
          Collab.LockMessages();
          var n = this.Collab_RecordMessage(
            r,
            e,
            ConstantData.ActionArrow.ENTER,
            ConstantData.CollabMessages.ActionButton
          );
          Collab.IsProcessingMessage() ||
            gListManager.CloseEdit();
          var o = r.AddRightPeer(e, a);
          return n &&
            (
              Collab.IsSecondary() &&
              Collab.CreateList.length &&
              (
                n.Data.CreateList = n.Data.CreateList.concat(Collab.CreateList)
              ),
              Collab.SendMessage(n)
            ),
            i ||
            (Collab.UnLockMessages(), Collab.UnBlockMessages()),
            o
        }
        Utils2.Alert(Resources.Strings.NoShape, null)
      } else Utils2.Alert(Resources.Strings.OrgChart_NoSelect, null)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static AddCoManager = function (e, t) {
    try {
      if (t) var a = t;
      else a = Business.GetSelectionBusinessManager(e);
      if (null == a && (a = gBusinessManager), a && a.AddCoManager) if (null == e && (e = Business.GetTargetShape(!0, !0)), e >= 0) {
        if (a.AddCoManager(e, !0)) {
          var r = Collab.AreMessagesLocked();
          Collab.LockMessages();
          var i = this.Collab_RecordMessage(
            a,
            e,
            ConstantData.ActionArrow.COMANAGER,
            ConstantData.CollabMessages.ActionButton
          );
          Collab.IsProcessingMessage() ||
            gListManager.CloseEdit();
          var n = a.AddCoManager(e, !1);
          return i &&
            (
              Collab.IsSecondary() &&
              Collab.CreateList.length &&
              (
                i.Data.CreateList = i.Data.CreateList.concat(Collab.CreateList)
              ),
              Collab.SendMessage(i)
            ),
            r ||
            (Collab.UnLockMessages(), Collab.UnBlockMessages()),
            n
        }
      } else Utils2.Alert(Resources.Strings.NoShape, null)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static AddAssistant = function (e, t) {
    try {
      if (t) var a = t;
      else a = Business.GetSelectionBusinessManager(e);
      if (null == a && (a = gBusinessManager), a && a.AddAssistant) {
        if (
          null == e &&
          (e = Business.GetTargetShape(!0, !0)),
          e >= 0 &&
          a.AddAssistant(e, !0)
        ) {
          var r = Collab.AreMessagesLocked();
          Collab.LockMessages();
          var i = this.Collab_RecordMessage(
            a,
            e,
            ConstantData.ActionArrow.ASSISTANT,
            ConstantData.CollabMessages.ActionButton
          );
          Collab.IsProcessingMessage() ||
            gListManager.CloseEdit();
          var n = a.AddAssistant(e, !1);
          return i &&
            (
              Collab.IsSecondary() &&
              Collab.CreateList.length &&
              (
                i.Data.CreateList = i.Data.CreateList.concat(Collab.CreateList)
              ),
              Collab.SendMessage(i)
            ),
            r ||
            (Collab.UnLockMessages(), Collab.UnBlockMessages()),
            n
        }
        Utils2.Alert(Resources.Strings.NoShape, null)
      }
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static SetDirection = function (e, t, a) {
    try {
      if (a) var r = a;
      else r = Business.GetSelectionBusinessManager(t);
      if (null == r && (r = gBusinessManager), r && r.SetDirection) if (null == t && (t = Business.GetTargetShape(!0, !0)), t >= 0) {
        var i = Collab.AreMessagesLocked();
        Collab.LockMessages();
        var n = this.Collab_RecordMessage(r, t, e, ConstantData.CollabMessages.SetDirection);
        Collab.IsProcessingMessage() ||
          gListManager.CloseEdit();
        var o = r.SetDirection(e, null, t);
        n &&
          o &&
          Collab.SendMessage(n),
          i ||
          (Collab.UnLockMessages(), Collab.UnBlockMessages())
      } else Utils2.Alert(Resources.Strings.OrgChart_NoSelect, null);
      else Utils2.Alert(Resources.Strings.OrgChart_NoSelect, null)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static Tab = function () {
    try {
      var e = Business.GetSelectionBusinessManager();
      if (null == e && (e = gBusinessManager), e && e.Tab) return e.Tab(!1)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static ShiftTab = function () {
    try {
      var e = Business.GetSelectionBusinessManager();
      if (null == e && (e = gBusinessManager), e && e.Tab) return e.Tab(!0)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static NavRight = function () {
    try {
      var e = Business.GetSelectionBusinessManager();
      if (null == e) this.NudgeRight();
      else if (e && e.NavRightLeft) return e.NavRightLeft(!1)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static NavLeft = function () {
    try {
      var e = Business.GetSelectionBusinessManager();
      if (null == e) this.NudgeLeft();
      else if (e && e.NavRightLeft) return e.NavRightLeft(!0)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static NavUp = function () {
    try {
      var e = Business.GetSelectionBusinessManager();
      if (null == e) this.NudgeUp();
      else if (e && e.NavUpDown) return e.NavUpDown(!0)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static NavDown = function () {
    try {
      var e = Business.GetSelectionBusinessManager();
      if (null == e) this.NudgeDown();
      else if (e && e.NavUpDown) return e.NavUpDown(!1)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static NudgeRight = function (e) {
    try {
      if (e) var t = e;
      else t = Business.GetSelectionBusinessManager();
      if (null == t && (t = gBusinessManager), t && t.Nudge) return t.Nudge(1, 0)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static NudgeLeft = function (e) {
    try {
      if (e) var t = e;
      else t = Business.GetSelectionBusinessManager();
      if (null == t && (t = gBusinessManager), t && t.Nudge) return t.Nudge(- 1, 0)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static NudgeUp = function (e) {
    try {
      if (e) var t = e;
      else t = Business.GetSelectionBusinessManager();
      if (null == t && (t = gBusinessManager), t && t.Nudge) return t.Nudge(0, - 1)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static NudgeDown = function (e) {
    try {
      if (e) var t = e;
      else t = Business.GetSelectionBusinessManager();
      if (null == t && (t = gBusinessManager), t && t.Nudge) return t.Nudge(0, 1)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static GrowRight = function () {
    try {
      if (gBusinessManager && gBusinessManager.NudgeGrow) return gBusinessManager.NudgeGrow(1, 0)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static GrowLeft = function () {
    try {
      if (gBusinessManager && gBusinessManager.NudgeGrow) return gBusinessManager.NudgeGrow(- 1, 0)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static GrowDown = function () {
    try {
      if (gBusinessManager && gBusinessManager.NudgeGrow) return gBusinessManager.NudgeGrow(0, 1)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static GrowUp = function () {
    try {
      if (gBusinessManager && gBusinessManager.NudgeGrow) return gBusinessManager.NudgeGrow(0, - 1)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static StopAddingWalls = function (e, t) {
    try {
      if (e) var a = e;
      else a = Business.GetSelectionBusinessManager();
      if (null == a && (a = gBusinessManager), a && a.StopAddingWalls) return a.StopAddingWalls(t)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static SwimlaneAction = function (e, t, a) {
    try {
      if (t) var r = t;
      else r = Business.GetSelectionBusinessManager();
      if (null == r && (r = gBusinessManager), r && r.SwimlaneAction) return r.SwimlaneAction(e, a)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static DeleteCause = function (e) {
    try {
      if (e) var t = e;
      else t = Business.GetSelectionBusinessManager();
      if (null == t && (t = gBusinessManager), t && t.DeleteCause) return t.DeleteCause()
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static DeleteDetail = function (e) {
    try {
      if (e) var t = e;
      else t = Business.GetSelectionBusinessManager();
      if (null == t && (t = gBusinessManager), t && t.DeleteDetail) return t.DeleteDetail()
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static DeletePerson = function (e) {
    try {
      if (e) var t = e;
      else t = Business.GetSelectionBusinessManager();
      if (null == t && (t = gBusinessManager), t && t.DeletePerson) return t.DeletePerson()
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static SetBranchStyle = function (e, t, a) {
    try {
      if (a) var r = a;
      else r = Business.GetSelectionBusinessManager();
      if (null == r && (r = gBusinessManager), r && r.SetBranchStyle) return r.SetBranchStyle(e, t)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static SetChartStyle = function (e, t, a) {
    try {
      if (a) var r = a;
      else r = Business.GetSelectionBusinessManager();
      if (
        null == r &&
        (r = gBusinessManager),
        r &&
        r.SetChartStyle &&
        (null == t && (t = Business.GetTargetShape(!0)), t >= 0)
      ) return r.SetChartStyle(e, t)
    } catch (e) {
      gListManager.ExceptionCleanup(e)
    }
  }

  static ExecuteActionButtons = function (e, t, a) {
    switch (e) {
      case ConstantData.ActionArrow.UP:
        gBusinessController.AddAbove(a, t);
        break;
      case ConstantData.ActionArrow.LEFT:
        gBusinessController.AddLeft(a, t);
        break;
      case ConstantData.ActionArrow.DOWN:
        gBusinessController.AddBelow(a, t);
        break;
      case ConstantData.ActionArrow.RIGHT:
        gBusinessController.AddRight(a, t);
        break;
      default:
        e >= ConstantData.ActionArrow.CUSTOM &&
          gBusinessController.AddCustom(a, t, e - ConstantData.ActionArrow.CUSTOM)
    }
  }
}

export default BusinessController
