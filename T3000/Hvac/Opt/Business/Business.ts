

import GlobalData from "../../Data/GlobalData";
import ListManager from "../../Data/ListManager";
import Instance from "../../Data/Instance/Instance";
import ConstantData from '../../Data/ConstantData'

class Business {

  static GetSelectionBusinessManager(e, t) {

    console.log('Business.GetSelectionBusinessManager e,t', e, t);

    return GlobalData.gBusinessManager;

    // console.log('Business.GetSelectionBusinessManager e,t', e, t);
    // console.log('Business.GetSelectionBusinessManager a', ListManager.ObjectTypes);


    /*
    var a,
      r,
      i,
      n,
      o,
      s = null,
      l = function (e, t) {
        var a = ListManager.ObjectTypes;
        switch (t) {
          case a.SD_OBJT_SWIMLANE_COLS:
          case a.SD_OBJT_SWIMLANE_ROWS:
          case a.SD_OBJT_SWIMLANE_GRIDS:
          case a.SD_OBJT_FRAME_CONTAINER:
            if (e.BusinessName && '' !== e.BusinessName) return SDJS_Business_NameToController(e.BusinessName);
            break;
          case a.SD_OBJT_FLOORPLAN_WALL:
            return GlobalData.gBusinessManager === GlobalData.gFloorplanManager ? GlobalData.gFloorplanManager : GlobalData.gFloorplanWallManager;
          case a.SD_OBJT_MINDMAP_MAIN:
            return c(e);
          case a.SD_OBJT_NG_EVENT:
          case a.SD_OBJT_NG_EVENT_LABEL:
          case a.SD_OBJT_NG_TIMELINE:
            return gTimelineManager;
          case a.SD_OBJT_GANTT_CHART:
          case a.SD_OBJT_GANTT_BAR:
            return gProjectChartManager;
          case a.SD_OBJT_UIELEMENT:
            return gUIElementManager;
          case a.SD_OBJT_SHAPECONTAINER:
            return gContainerManager;
          case a.SD_OBJT_TABLE_WITH_SHAPECONTAINER:
            return gContainerTableManager;
          case a.SD_OBJT_BPMN_ACTIVITY:
            return gLineDrawBPMNTaskManager;
          case a.SD_OBJT_BPMN_EVENT_START:
          case a.SD_OBJT_BPMN_EVENT_INTERMEDIATE:
          case a.SD_OBJT_BPMN_EVENT_END:
          case a.SD_OBJT_BPMN_EVENT_START_NI:
          case a.SD_OBJT_BPMN_EVENT_INTERMEDIATE_NI:
          case a.SD_OBJT_BPMN_EVENT_INTERMEDIATE_THROW:
            return gLineDrawBPMNEventManager;
          case a.SD_OBJT_BPMN_GATEWAY:
            return gLineDrawBPMNGatewayManager;
          case a.SD_OBJT_BPMN_DATAOBJECT:
            return gLineDrawBPMNDataManager;
          case a.SD_OBJT_BPMN_CHOREOGRAPHY:
            return gLineDrawBPMNChoreographyManager;
          case a.SD_OBJT_BPMN_POOL:
            return gLineDrawBPMNPoolManager;
          case a.SD_OBJT_BUSLOGIC_TABLE:
            return gTableManager;
          case a.SD_OBJT_BUSLOGIC_TABLEROW:
            return gTableRowManager;
          case a.SD_OBJT_BUSLOGIC_LINEDRAW:
            return S(e.subtype);
          case a.SD_OBJT_JIRA_ISSUES_CONTAINER_ISSUE:
            return gJiraIssuesContainerManager;
          case a.SD_OBJT_JIRA_BLOCKINGISSUE:
            return gJiraBlockingIssueManager;
          case a.SD_OBJT_JIRA_EPICDEPENDENCY:
            return gJiraEpicDependencyManager;
          case a.SD_OBJT_JIRA_PRODUCTROADMAP:
            return gJiraProductRoadmapManager;
          case a.SD_OBJT_AZUREDEVOPS_ITEM_CARD:
            return gAzureDevOpsItemContainerManager;
          case a.SD_OBJT_JIRA_PIBOARD:
            return gJiraPIBoardManager;
          case a.SD_OBJT_BUSLOGIC_AZURE:
            return gLineDrawAzureManager;
          case a.SD_OBJT_BUSLOGIC_AWS:
            return gLineDrawAWSManager;
          case a.SD_OBJT_D3SYMBOL:
            switch (e.codeLibID) {
              case 'RadialGauge':
              case 'LinearGauge':
                return gGaugeManager;
              case 'BarChart':
              case 'PieChart':
              case 'LineChart':
              case 'SankeyChart':
                return gGraphManager
            }
        }
        return null
      },
      S = function (e) {
        var t = ListManager.ObjectSubTypes;
        switch (e) {
          case t.SD_SUBT_BPMN_LINE:
            return gLineDrawBPMNManager;
          case t.SD_SUBT_ERD_LINE:
            return gLineDrawERDManager;
          case t.SD_SUBT_UML_LINE:
            return gLineDrawUMLManager;
          case t.SD_SUBT_UMLCLASS_LINE:
            return gLineDrawUMLClassManager;
          case t.SD_SUBT_UMLCOMPONENT_LINE:
            return gLineDrawUMLComponentManager;
          case t.SD_SUBT_LINEDRAW_SWIMLANE:
            return gLineDrawSwimlaneManager
        }
        return GlobalData.gBusinessManager instanceof Business.LineDraw ? GlobalData.gBusinessManager : GlobalDatagLineDrawManager
      },
      c = function (e) {
        var t = ListManager.ObjectSubTypes;
        switch (e.subtype) {
          case t.SD_SUBT_TASKMAP:
          case t.SD_SUBT_TASK:
            return gTaskMapManager;
          case t.SD_SUBT_HUBMAP:
          case t.SD_SUBT_HUBNODE:
            return gMindMapManager
        }
      };
    if (
      null != e &&
      (r = GlobalData.optManager.GetObjectPtr(e, !1)) &&
      r instanceof ListManager.BaseDrawingObject
    ) {
      if (u = l(r, r.objecttype)) return u;
      r &&
        (
          r.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE ||
          t
        ) &&
        (a = e)
    }
    if (null == a && (a = Business.GetTargetShape(!0, !0)), a >= 0) {
      var u;
      if (u = l(r = GlobalData.optManager.GetObjectPtr(a, !1), r.objecttype)) return u;
      if (
        r.ParentFrameID >= 0 &&
        (n = GlobalData.optManager.GetObjectPtr(r.ParentFrameID, !1)) &&
        n.BusinessName &&
        (s = SDJS_Business_NameToController(n.BusinessName)),
        !r ||
        !r.hooks.length
      ) {
        var p = GlobalData.optManager.FindChildArray(a, - 1);
        return (n = GlobalData.optManager.GetObjectPtr(p, !1)) &&
          n.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR ? n._IsFlowChartConnector() ? n.objecttype === ConstantData.ObjectTypes.SD_OBJT_STEPCHARTH_BRANCH ? gStepChartHManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_STEPCHARTV_BRANCH ? gStepChartVManager : gFlowChartManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_MINDMAP_CONNECTOR ? c(n) : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_DECISIONTREE_CONNECTOR ? gDecisionTreeManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_PEDIGREE_CONNECTOR ? gPedigreeManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_DESCENDANT_CONNECTOR ? gDescendantManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_BRANCH ||
            n.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_MAIN ? gCauseAndEffectManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_GENOGRAM_BRANCH ? gGenogramManager : gOrgChartManager : function (e) {
              var t = GlobalData.optManager.FindAllChildObjects(e, ConstantData.DrawingObjectBaseClass.LINE, null);
              if (t.length > 0) {
                var a = t[0],
                  r = GlobalData.optManager.GetObjectPtr(a, !1);
                if (
                  r &&
                  r.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE &&
                  r.objecttype === ConstantData.ObjectTypes.SD_OBJT_BUSLOGIC_LINEDRAW
                ) return S(r.subtype)
              }
              return s
            }(a)
      }
      if (
        i = r.hooks[0].objid,
        (n = GlobalData.optManager.GetObjectPtr(i, !1)) &&
        n.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR
      ) {
        if (n._IsFlowChartConnector()) {
          var d = GlobalData.optManager.FindChildArray(a, - 1);
          return null == (o = GlobalData.optManager.GetObjectPtr(d, !1)) &&
            (o = n),
            n.objecttype === ConstantData.ObjectTypes.SD_OBJT_STEPCHARTH_BRANCH ||
              o.objecttype === ConstantData.ObjectTypes.SD_OBJT_STEPCHARTH_BRANCH ? gStepChartHManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_STEPCHARTV_BRANCH ||
                o.objecttype === ConstantData.ObjectTypes.SD_OBJT_STEPCHARTV_BRANCH ? gStepChartVManager : gFlowChartManager
        }
        if (
          n.objecttype !== ConstantData.ObjectTypes.SD_OBJT_MINDMAP_CONNECTOR
        ) return n.objecttype === ConstantData.ObjectTypes.SD_OBJT_DECISIONTREE_CONNECTOR ? gDecisionTreeManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_PEDIGREE_CONNECTOR ? gPedigreeManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_DESCENDANT_CONNECTOR ? gDescendantManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_BRANCH ||
          n.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_MAIN ? gCauseAndEffectManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_GENOGRAM_BRANCH ? gGenogramManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_STEPCHARTH_BRANCH ? gStepChartHManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_STEPCHARTV_BRANCH ? gStepChartVManager : gOrgChartManager;
        var D = {
          topconnector: - 1,
          topshape: - 1,
          foundtree: !1
        };
        if (
          this.FindTreeTop(r, 0, D) &&
          D.topshape >= 0 &&
          (o = GlobalData.optManager.GetObjectPtr(D.topshape, !1)).objecttype === ConstantData.ObjectTypes.SD_OBJT_MINDMAP_MAIN
        ) return c(o)
      } else if (n && n instanceof ListManager.ShapeContainer) {
        if (n.hooks.length) {
          var g = GlobalData.optManager.GetObjectPtr(n.hooks[0].objid, !1);
          if (
            g &&
            g.objecttype === ConstantData.ObjectTypes.SD_OBJT_TABLE_WITH_SHAPECONTAINER
          ) return gContainerTableManager
        }
        return gContainerManager
      }
    }
    return s


    */


    // let a: any,
    //   r: any,
    //   i: any,
    //   n: any,
    //   o: any,
    //   s: any = null;

    // const l = (e: any, t: any) => {
    //   const a = ListManager.ObjectTypes;
    //   switch (t) {
    //     case a.SD_OBJT_SWIMLANE_COLS:
    //     case a.SD_OBJT_SWIMLANE_ROWS:
    //     case a.SD_OBJT_SWIMLANE_GRIDS:
    //     case a.SD_OBJT_FRAME_CONTAINER:
    //       if (e.BusinessName && e.BusinessName !== '') return SDJS_Business_NameToController(e.BusinessName);
    //       break;
    //     case a.SD_OBJT_FLOORPLAN_WALL:
    //       return GlobalData.gBusinessManager === GlobalData.gFloorplanManager ? GlobalData.gFloorplanManager : GlobalData.gFloorplanWallManager;
    //     case a.SD_OBJT_MINDMAP_MAIN:
    //       return c(e);
    //     case a.SD_OBJT_NG_EVENT:
    //     case a.SD_OBJT_NG_EVENT_LABEL:
    //     case a.SD_OBJT_NG_TIMELINE:
    //       return GlobalDatagTimelineManager;
    //     case a.SD_OBJT_GANTT_CHART:
    //     case a.SD_OBJT_GANTT_BAR:
    //       return GlobalDatagProjectChartManager;
    //     case a.SD_OBJT_UIELEMENT:
    //       return GlobalDatagUIElementManager;
    //     case a.SD_OBJT_SHAPECONTAINER:
    //       return GlobalDatagContainerManager;
    //     case a.SD_OBJT_TABLE_WITH_SHAPECONTAINER:
    //       return GlobalDatagContainerTableManager;
    //     case a.SD_OBJT_BPMN_ACTIVITY:
    //       return GlobalDatagLineDrawBPMNTaskManager;
    //     case a.SD_OBJT_BPMN_EVENT_START:
    //     case a.SD_OBJT_BPMN_EVENT_INTERMEDIATE:
    //     case a.SD_OBJT_BPMN_EVENT_END:
    //     case a.SD_OBJT_BPMN_EVENT_START_NI:
    //     case a.SD_OBJT_BPMN_EVENT_INTERMEDIATE_NI:
    //     case a.SD_OBJT_BPMN_EVENT_INTERMEDIATE_THROW:
    //       return GlobalDatagLineDrawBPMNEventManager;
    //     case a.SD_OBJT_BPMN_GATEWAY:
    //       return GlobalDatagLineDrawBPMNGatewayManager;
    //     case a.SD_OBJT_BPMN_DATAOBJECT:
    //       return GlobalDatagLineDrawBPMNDataManager;
    //     case a.SD_OBJT_BPMN_CHOREOGRAPHY:
    //       return GlobalDatagLineDrawBPMNChoreographyManager;
    //     case a.SD_OBJT_BPMN_POOL:
    //       return GlobalDatagLineDrawBPMNPoolManager;
    //     case a.SD_OBJT_BUSLOGIC_TABLE:
    //       return GlobalDatagTableManager;
    //     case a.SD_OBJT_BUSLOGIC_TABLEROW:
    //       return GlobalDatagTableRowManager;
    //     case a.SD_OBJT_BUSLOGIC_LINEDRAW:
    //       return S(e.subtype);
    //     case a.SD_OBJT_JIRA_ISSUES_CONTAINER_ISSUE:
    //       return GlobalDatagJiraIssuesContainerManager;
    //     case a.SD_OBJT_JIRA_BLOCKINGISSUE:
    //       return GlobalDatagJiraBlockingIssueManager;
    //     case a.SD_OBJT_JIRA_EPICDEPENDENCY:
    //       return GlobalDatagJiraEpicDependencyManager;
    //     case a.SD_OBJT_JIRA_PRODUCTROADMAP:
    //       return GlobalDatagJiraProductRoadmapManager;
    //     case a.SD_OBJT_AZUREDEVOPS_ITEM_CARD:
    //       return GlobalDatagAzureDevOpsItemContainerManager;
    //     case a.SD_OBJT_JIRA_PIBOARD:
    //       return GlobalDatagJiraPIBoardManager;
    //     case a.SD_OBJT_BUSLOGIC_AZURE:
    //       return GlobalDatagLineDrawAzureManager;
    //     case a.SD_OBJT_BUSLOGIC_AWS:
    //       return GlobalDatagLineDrawAWSManager;
    //     case a.SD_OBJT_D3SYMBOL:
    //       switch (e.codeLibID) {
    //         case 'RadialGauge':
    //         case 'LinearGauge':
    //           return GlobalDatagGaugeManager;
    //         case 'BarChart':
    //         case 'PieChart':
    //         case 'LineChart':
    //         case 'SankeyChart':
    //           return GlobalDatagGraphManager;
    //       }
    //   }
    //   return null;
    // };

    // const S = (e: any) => {
    //   const t = ListManager.ObjectSubTypes;
    //   switch (e) {
    //     case t.SD_SUBT_BPMN_LINE:
    //       return GlobalDatagLineDrawBPMNManager;
    //     case t.SD_SUBT_ERD_LINE:
    //       return GlobalDatagLineDrawERDManager;
    //     case t.SD_SUBT_UML_LINE:
    //       return GlobalDatagLineDrawUMLManager;
    //     case t.SD_SUBT_UMLCLASS_LINE:
    //       return GlobalDatagLineDrawUMLClassManager;
    //     case t.SD_SUBT_UMLCOMPONENT_LINE:
    //       return GlobalDatagLineDrawUMLComponentManager;
    //     case t.SD_SUBT_LINEDRAW_SWIMLANE:
    //       return GlobalDatagLineDrawSwimlaneManager;
    //   }
    //   return GlobalData.gBusinessManager instanceof Business.LineDraw ? GlobalData.gBusinessManager : GlobalDatagLineDrawManager;
    // };

    // const c = (e: any) => {
    //   const t = ListManager.ObjectSubTypes;
    //   switch (e.subtype) {
    //     case t.SD_SUBT_TASKMAP:
    //     case t.SD_SUBT_TASK:
    //       return GlobalDatagTaskMapManager;
    //     case t.SD_SUBT_HUBMAP:
    //     case t.SD_SUBT_HUBNODE:
    //       return GlobalDatagMindMapManager;
    //   }
    // };

    // if (e != null && (r = GlobalData.optManager.GetObjectPtr(e, false)) && r instanceof ListManager.BaseDrawingObject) {
    //   if (u = l(r, r.objecttype)) return u;
    //   if (r && (r.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.SHAPE || t)) a = e;
    // }

    // if (a == null && (a = Business.GetTargetShape(true, true)), a >= 0) {
    //   let u;
    //   if (u = l(r = GlobalData.optManager.GetObjectPtr(a, false), r.objecttype)) return u;
    //   if (r.ParentFrameID >= 0 && (n = GlobalData.optManager.GetObjectPtr(r.ParentFrameID, false)) && n.BusinessName && (s = SDJS_Business_NameToController(n.BusinessName)), !r || !r.hooks.length) {
    //     const p = GlobalData.optManager.FindChildArray(a, -1);
    //     return (n = GlobalData.optManager.GetObjectPtr(p, false)) && n.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR ? n._IsFlowChartConnector() ? n.objecttype === ConstantData.ObjectTypes.SD_OBJT_STEPCHARTH_BRANCH ? gStepChartHManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_STEPCHARTV_BRANCH ? gStepChartVManager : gFlowChartManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_MINDMAP_CONNECTOR ? c(n) : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_DECISIONTREE_CONNECTOR ? gDecisionTreeManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_PEDIGREE_CONNECTOR ? gPedigreeManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_DESCENDANT_CONNECTOR ? gDescendantManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_BRANCH || n.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_MAIN ? gCauseAndEffectManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_GENOGRAM_BRANCH ? gGenogramManager : gOrgChartManager : (e: any) => {
    //       const t = GlobalData.optManager.FindAllChildObjects(e, ConstantData.DrawingObjectBaseClass.LINE, null);
    //       if (t.length > 0) {
    //         const a = t[0],
    //           r = GlobalData.optManager.GetObjectPtr(a, false);
    //         if (r && r.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.LINE && r.objecttype === ConstantData.ObjectTypes.SD_OBJT_BUSLOGIC_LINEDRAW) return S(r.subtype);
    //       }
    //       return s;
    //     }(a);
    //   }
    //   if (i = r.hooks[0].objid, (n = GlobalData.optManager.GetObjectPtr(i, false)) && n.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR) {
    //     if (n._IsFlowChartConnector()) {
    //       const d = GlobalData.optManager.FindChildArray(a, -1);
    //       return (o = GlobalData.optManager.GetObjectPtr(d, false)) == null && (o = n), n.objecttype === ConstantData.ObjectTypes.SD_OBJT_STEPCHARTH_BRANCH || o.objecttype === ConstantData.ObjectTypes.SD_OBJT_STEPCHARTH_BRANCH ? gStepChartHManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_STEPCHARTV_BRANCH || o.objecttype === ConstantData.ObjectTypes.SD_OBJT_STEPCHARTV_BRANCH ? gStepChartVManager : gFlowChartManager;
    //     }
    //     if (n.objecttype !== ConstantData.ObjectTypes.SD_OBJT_MINDMAP_CONNECTOR) return n.objecttype === ConstantData.ObjectTypes.SD_OBJT_DECISIONTREE_CONNECTOR ? gDecisionTreeManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_PEDIGREE_CONNECTOR ? gPedigreeManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_DESCENDANT_CONNECTOR ? gDescendantManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_BRANCH || n.objecttype === ConstantData.ObjectTypes.SD_OBJT_CAUSEEFFECT_MAIN ? gCauseAndEffectManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_GENOGRAM_BRANCH ? gGenogramManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_STEPCHARTH_BRANCH ? gStepChartHManager : n.objecttype === ConstantData.ObjectTypes.SD_OBJT_STEPCHARTV_BRANCH ? gStepChartVManager : gOrgChartManager;
    //     const D = {
    //       topconnector: -1,
    //       topshape: -1,
    //       foundtree: false
    //     };
    //     if (this.FindTreeTop(r, 0, D) && D.topshape >= 0 && (o = GlobalData.optManager.GetObjectPtr(D.topshape, false)).objecttype === ConstantData.ObjectTypes.SD_OBJT_MINDMAP_MAIN) return c(o);
    //   } else if (n && n instanceof ListManager.ShapeContainer) {
    //     if (n.hooks.length) {
    //       const g = GlobalData.optManager.GetObjectPtr(n.hooks[0].objid, false);
    //       if (g && g.objecttype === ConstantData.ObjectTypes.SD_OBJT_TABLE_WITH_SHAPECONTAINER) return GlobalDatagContainerTableManager;
    //     }
    //     return GlobalDatagContainerManager;
    //   }
    // }
    // return s;
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
