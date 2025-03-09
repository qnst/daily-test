

import T3Gv from "../../Data/T3Gv";
import Instance from "../../Data/Instance/Instance";
import ConstantData from '../../Data/ConstantData'

class Business {

  static GetSelectionBusinessManager(e, t) {

    console.log('Business.GetSelectionBusinessManager e,t', e, t);

    return T3Gv.gBusinessManager;


  }

  /**
   * Finds the top element of a tree structure in the drawing hierarchy
   * @param drawingObject - The drawing object to evaluate
   * @param setLinkFlag - Whether to set link flags during traversal
   * @param result - Object to store the results of the tree traversal
   * @returns Boolean indicating whether a tree structure was found
   */
  static FindTreeTop(drawingObject, setLinkFlag, result) {
    if (!drawingObject) {
      return result.foundtree;
    }

    // Skip line objects
    if (drawingObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE) {
      return false;
    }

    // Process based on object type
    if (drawingObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR) {
      result.topconnector = drawingObject.BlockID;
      result.foundtree = true;

      if (setLinkFlag) {
        T3Gv.optManager.SetLinkFlag(drawingObject.BlockID, setLinkFlag);
      }
    } else {
      result.topshape = drawingObject.BlockID;

      if (result.level != null) {
        result.level++;
      }

      if (setLinkFlag) {
        T3Gv.optManager.SetLinkFlag(drawingObject.BlockID, setLinkFlag);
      }
    }

    // Process hooks if available
    if (drawingObject.hooks.length) {
      // Handle self-referencing hooks
      if (drawingObject.hooks[0].objid === drawingObject.BlockID) {
        drawingObject.hooks.splice(0, 1);
      } else {
        const childObject = T3Gv.optManager.GetObjectPtr(drawingObject.hooks[0].objid, false);
        if (childObject) {
          this.FindTreeTop(childObject, setLinkFlag, result);
        }
      }
    } else if (result.foundtree) {
      // Handle connector objects after tree is found
      if (drawingObject.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR) {
        const childArrayId = T3Gv.optManager.FindChildArray(result.topshape, -1);
        if (childArrayId >= 0) {
          result.secondconnector = childArrayId;
        }
      }
    } else {
      // Find child arrays if tree not yet found
      const childArrayId = T3Gv.optManager.FindChildArray(drawingObject.BlockID, -1);
      if (childArrayId >= 0) {
        result.topconnector = childArrayId;
        result.foundtree = true;

        if (setLinkFlag) {
          T3Gv.optManager.SetLinkFlag(childArrayId, setLinkFlag);
        }
      }
    }

    return result.foundtree;
  }

  static SelectContainerParent(e) {
    var t = T3Gv.optManager.GetObjectPtr(e, !1);
    return t &&
      t instanceof Instance.Shape.ShapeContainer &&
      t.hooks.length &&
      null != t.hooks[0].cellid ? t.hooks[0].objid : e
  }

  static ShapeCannotHaveActionButtons(e) {
    return !!e.IsSwimlane()
  }


  static GetNextSelect() {
    var e, t, a, r, i, n, o, s, l = T3Gv.optManager.GetTargetSelect(),
      S = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.theSelectedListBlockID, !1);
    if (l >= 0) {
      if ((e = T3Gv.optManager.GetObjectPtr(l, !1)) && e.hooks.length) {
        if (t = e.hooks[0].objid,
          (a = T3Gv.optManager.GetObjectPtr(t, !1)) && a.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR) {
          if (a._IsFlowChartConnector())
            return -1;
          if (e.hooks[0].connect.x < 0 && a.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_BRANCH)
            a.hooks.length && (o = T3Gv.optManager.GetObjectPtr(a.hooks[0].objid, !1)) && o.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR && (l = a.BlockID,
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
      if ((s = T3Gv.optManager.FindChildArray(l, -1)) >= 0 && (a = T3Gv.optManager.GetObjectPtr(s, !1)).objecttype === ConstantData.ObjectTypes.SD_OBJT_GENOGRAM_BRANCH)
        return n = gGenogramManager.GetNextSelect()
    }
    return n
  }

  static GetParentConnector(e, t) {
    var a, r, i, n = -1;
    return (a = T3Gv.optManager.GetObjectPtr(e, !1)) && a.hooks.length && (i = a.hooks[0].objid) >= 0 &&
      (r = T3Gv.optManager.GetObjectPtr(i, !1)) &&
      r.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR && (n = i,
        t && (t.x = a.hooks[0].connect.x,
          t.y = a.hooks[0].connect.y)),
      n
  }

  static HasContainerParent(e) {
    if (e && e.hooks.length) {
      var t = e.hooks[0].objid
        , a = T3Gv.optManager.GetObjectPtr(t, !1);
      if (a && a instanceof Instance.Shape.ShapeContainer)
        return t
    }
    return !1
  }
}

export default Business
