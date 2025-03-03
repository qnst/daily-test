

import GlobalData from "../../Data/GlobalData";
import ListManager from "../../Data/ListManager";
import Instance from "../../Data/Instance/Instance";
import ConstantData from '../../Data/ConstantData'

class Business {

  static GetSelectionBusinessManager(e, t) {

    console.log('Business.GetSelectionBusinessManager e,t', e, t);

    return GlobalData.gBusinessManager;


  }

  static FindTreeTop(e, t, a) {
    var r,
      i;
    if (e) {
      if (
        e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE
      ) return !1;
      e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR ? (
        a.topconnector = e.BlockID,
        a.foundtree = !0,
        t &&
        GlobalData.optManager.SetLinkFlag(e.BlockID, t)
      ) : (
        a.topshape = e.BlockID,
        null != a.level &&
        a.level++,
        t &&
        GlobalData.optManager.SetLinkFlag(e.BlockID, t)
      ),
        e.hooks.length ? e.hooks[0].objid === e.BlockID ? e.hooks.splice(0, 1) : (r = GlobalData.optManager.GetObjectPtr(e.hooks[0].objid, !1)) &&
          this.FindTreeTop(r, t, a) : a.foundtree ? e.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR &&
            (i = GlobalData.optManager.FindChildArray(a.topshape, - 1)) >= 0 &&
            (a.secondconnector = i) : (i = GlobalData.optManager.FindChildArray(e.BlockID, - 1)) >= 0 &&
        (
          a.topconnector = i,
          a.foundtree = !0,
          t &&
          GlobalData.optManager.SetLinkFlag(i, t)
        )
    }
    return a.foundtree
  }

  static SelectContainerParent(e) {
    var t = GlobalData.optManager.GetObjectPtr(e, !1);
    return t &&
      // t instanceof ShapeContainer &&
      // Double === TODO
      // t instanceof GlobalDataShape.ShapeContainer &&
      t instanceof Instance.Shape.ShapeContainer &&
      t.hooks.length &&
      null != t.hooks[0].cellid ? t.hooks[0].objid : e
  }

  static ShapeCannotHaveActionButtons(e) {
    return !!e.IsSwimlane()
  }


  static GetNextSelect() {
    var e, t, a, r, i, n, o, s, l = GlobalData.optManager.GetTargetSelect(),
      S = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, !1);
    if (l >= 0) {
      if ((e = GlobalData.optManager.GetObjectPtr(l, !1)) && e.hooks.length) {
        if (t = e.hooks[0].objid,
          (a = GlobalData.optManager.GetObjectPtr(t, !1)) && a.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR) {
          if (a._IsFlowChartConnector())
            return -1;
          if (e.hooks[0].connect.x < 0 && a.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_BRANCH)
            a.hooks.length && (o = GlobalData.optManager.GetObjectPtr(a.hooks[0].objid, !1)) && o.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR && (l = a.BlockID,
              a = o);
          else if (a.objecttype === ConstantData.ObjectTypes.SD_OBJT_GENOGRAM_BRANCH)
            return n = gGenogramManager.GetNextSelect();
          n = Business.GetConnectorNextSelect(a, l, S)
        } else if (a &&
          // a instanceof GlobalDataShape.ShapeContainer
          a instanceof Instance.Shape.ShapeContainer
          /*SDJS.ListManager.ShapeContainer*/) {
          var c = a.ContainerList
            , u = c.List
            , p = c.flags & ConstantData.ContainerListFlags.Sparse;
          i = u.length;
          var d = -1;
          for (n = -1,
            r = 0; r < i; r++)
            if (u[r].id === l) {
              d = r;
              break
            }
          if (p) {
            if ((n = gContainerManager.NavUpDown(!0, !0)) < 0 && (n = gContainerManager.NavUpDown(!1, !0)),
              n >= 0)
              return n;
            if (n < 0) {
              for (r = d - 1; r >= 0;) {
                if (u[r].id >= 0)
                  return u[r].id;
                r--
              }
              for (r = d + 1; r < i;) {
                if (u[r].id >= 0)
                  return u[r].id;
                r++
              }
            }
          } else
            d >= 0 && (d > 0 ? n = u[--d].id : i > 1 && (n = u[++d].id))
        }
        return n
      }
      if ((s = GlobalData.optManager.FindChildArray(l, -1)) >= 0 && (a = GlobalData.optManager.GetObjectPtr(s, !1)).objecttype === ConstantData.ObjectTypes.SD_OBJT_GENOGRAM_BRANCH)
        return n = gGenogramManager.GetNextSelect()
    }
    return n
  }

  static GetParentConnector(e, t) {
    var a, r, i, n = -1;
    return (a = GlobalData.optManager.GetObjectPtr(e, !1)) && a.hooks.length && (i = a.hooks[0].objid) >= 0 &&
      (r = GlobalData.optManager.GetObjectPtr(i, !1)) &&
      r.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR && (n = i,
        t && (t.x = a.hooks[0].connect.x,
          t.y = a.hooks[0].connect.y)),
      n
  }

  static HasContainerParent(e) {
    if (e && e.hooks.length) {
      var t = e.hooks[0].objid
        , a = GlobalData.optManager.GetObjectPtr(t, !1);
      if (a && a instanceof /*SDJS.ListManager.ShapeContainer*/ GlobalDataShape.ShapeContainer)
        return t
    }
    return !1
  }
}

export default Business;
