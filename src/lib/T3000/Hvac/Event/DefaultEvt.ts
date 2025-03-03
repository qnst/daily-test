

// Initialize = () => {
//   this.docHandler = new DocHandler();
//   const defaultWorkArea = { svgAreaID: 'svg-area', documentWidth: 1000, documentHeight: 750, documentDPI: 100 };
//   this.docHandler.InitializeWorkArea(defaultWorkArea);

//   this.optHandler = new OptHandler();
//   this.optHandler.svgDoc = this.docHandler.svgDoc;
//   this.optHandler.docHandler = this.docHandler;

//   this.optHandler.Initialize();
//   this.docHandler.optHandler = this.optHandler;

//   window.oncontextmenu = function (event) {
//     event.preventDefault()
//   };

//   window.addEventListener("mousemove", this.LM_MouseMove);
//   window.addEventListener("resize", this.docHandler.HandleResizeEvent);
//   document.getElementById("svg-area").addEventListener("scroll", this.docHandler.HandleScrollEvent);
//   document.getElementById("document-area").addEventListener("wheel", this.LM_WorkAreaMouseWheel);
//   document.getElementById("svg-area").addEventListener("wheel", this.LM_WorkAreaMouseWheel);

//   document.getElementById('svg-area').addEventListener('mousedown', this.LM_WorkAreaDragStart);
//   // document.getElementById('svg-area').addEventListener('mousedown', this.optHandler.DrawTest);
//   document.getElementById('svg-area').addEventListener('mousemove', this.LM_RubberBandDrag);
//   document.getElementById('svg-area').addEventListener('mouseup', this.LM_RubberBandDragEnd);

//   this.SetZoomSlider();
// }

// SetZoomSlider = () => {
// }

// LM_MouseMove = (event) => {
//   const { clientX, clientY } = event;
//   const { dispX, dispY, dispWidth, dispHeight } = this.optHandler.svgDoc.docInfo;
//   const check = clientX >= dispX && clientY >= dispY && clientX < dispX + dispWidth && clientY < dispY + dispHeight;

//   if (check) {
//     const docCoords = this.docHandler.svgDoc.ConvertWindowToDocCoords(clientX, clientY);
//     this.optHandler.ShowXY(true);
//     this.optHandler.UpdateDisplayCoordinates(null, docCoords, null, null);
//   } else {
//     this.optHandler.ShowXY(true);
//   }
// }

// LM_WorkAreaMouseWheel = (event) => {
//   if (event.ctrlKey) {
//     Utils.StopPropagationAndDefaults(event);

//     const clientX = event.clientX;
//     const clientY = event.clientY;
//     const docCoords = this.optHandler.svgDoc.ConvertWindowToDocCoords(clientX, clientY);

//     if (event.deltaY > 0) {
//       this.docHandler.ZoomInandOut(false, true);
//     }

//     if (event.deltaY < 0) {
//       this.docHandler.ZoomInandOut(true, true);
//     }

//     const windowCoords = this.optHandler.svgDoc.ConvertDocToWindowCoords(docCoords.x, docCoords.y);
//     const offsetX = clientX - windowCoords.x;
//     const offsetY = clientY - windowCoords.y;

//     const svgArea = document.getElementById('svg-area');
//     const scrollLeft = svgArea.scrollLeft;
//     const scrollTop = svgArea.scrollTop;

//     this.docHandler.SetScroll(scrollLeft - offsetX, scrollTop - offsetY);
//   }
// }

// LM_WorkAreaHammerDragStart = (event) => {
//   console.log('LM_WorkAreaHammerDragStart');
//   const svgArea = document.getElementById("svg-area");
//   const offset = svgArea.getBoundingClientRect();
//   const clientX = event.clientX - offset.left;
//   const clientY = event.clientY - offset.top;
//   const clientWidth = svgArea.clientWidth;
//   const clientHeight = svgArea.clientHeight;
//   this.optHandler.StartRubberBandSelect(event);
// }

// LM_WorkAreaDragStart = (e) => {

//   const svgArea = document.getElementById("svg-area");
//   const offset = svgArea.getBoundingClientRect();
//   const clientX = e.clientX - offset.left;
//   const clientY = e.clientY - offset.top;
//   const clientWidth = svgArea.clientWidth;
//   const clientHeight = svgArea.clientHeight;

//   if (clientX < clientWidth && clientY < clientHeight) {
//     this.optHandler.StartRubberBandSelect(e);
//   }
// }


// LM_RubberBandDrag = (e) => {
//   // Utils.StopPropagationAndDefaults(e);

//   if (!this.optHandler.AutoScrollCommon(e, !1, "RubberBandSelectDoAutoScroll"))
//     return;

//   var a = this.optHandler.svgDoc.ConvertWindowToDocCoords(
//     e.clientX,
//     e.clientY
//   );

//   this.optHandler.RubberBandSelectMoveCommon(a.x, a.y);
// }

// LM_RubberBandDragEnd = (e) => {
//   // Utils.StopPropagationAndDefaults(e);

//   this.optHandler.ResetAutoScrollTimer();
//   var t = this.optHandler.theRubberBandFrame;

//   if (this.optHandler.theRubberBand != null) {
//     this.optHandler.svgOverlayLayer.RemoveElement(this.optHandler.theRubberBand);
//   }
//   this.optHandler.theRubberBand = null;
//   this.optHandler.theRubberBandStartX = 0;
//   this.optHandler.theRubberBandStartY = 0;
//   this.optHandler.theRubberBandFrame = {
//     x: 0,
//     y: 0,
//     width: 0,
//     height: 0,
//   };
// }


import GlobalData from '../Data/GlobalData';
import Utils2 from '../Helper/Utils2';
import Commands from '../Opt/Business/Commands';
import $ from 'jquery';
import Resources from '../Data/Resources';
import ListManager from '../Data/ListManager';
// import Collab from '../Data/Collab'
// import ShapeContainer from '../Shape/Shape.ShapeContainer'
import BaseDrawingObject from '../Shape/Shape.BaseDrawingObject'
import Instance from '../Data/Instance/Instance'
import ConstantData from '../Data/ConstantData'
import RightClickData from '../Model/RightClickData'
import ConstantData2 from '../Data/ConstantData2'

const DefaultEvt = {
  Evt_MouseMove: null,
  Evt_WorkAreaHammerTap: null,
  Evt_WorkAreaMouseWheel: null,
  Evt_WorkAreaHammerDragStart: null,
  Evt_RubberBandDrag: null,
  Evt_RubberBandDragEnd: null,
  Evt_WorkAreaHammerDrawStart: null,
  Evt_DrawTrackHandlerFactory: null,
  Evt_DrawReleaseHandlerFactory: null,
  Evt_ShapeTapFactory: null,
  Evt_ShapeDragStartFactory: null,
  Evt_ShapeHoldFactory: null,
  Evt_ShapeDoubleTapFactory: null,
  Evt_ShapeDrag: null,
  Evt_ShapeDragEnd: null,
  Evt_ActionTrackHandlerFactory: null,
  Evt_ActionReleaseHandlerFactory: null,
  Evt_StampObjectDragEndFactory: null,
  Evt_StampObjectDrag: null,
  Evt_ActionTriggerTap: null,
  Evt_WorkAreaHammerPinchIn: null,
  Evt_WorkAreaHammerPinchOut: null,
  Evt_WorkAreaHammerPinchEnd: null,
  Evt_MouseStampObjectMove: null,
  Evt_MouseStampObjectDoneFactory: null,
  Evt_DimensionTextKeyboardLifter: null,
  Evt_DimensionTextDoubleTapFactory: null,
  Evt_DimensionTextTapFactory: null,
  Evt_PolyLineDrawExtendHandlerFactory: null,
  Evt_PolyLineDrawDragStart: null,
  Evt_DrawExtendHandler: null,
  Evt_WorkAreaHammerPan: null,
  Evt_WorkAreaHammerPanEnd: null,
}

DefaultEvt.Evt_MouseMove = function (e) {
  if (
    e.clientX >= GlobalData.optManager.svgDoc.docInfo.dispX &&
    e.clientY >= GlobalData.optManager.svgDoc.docInfo.dispY &&
    e.clientX < GlobalData.optManager.svgDoc.docInfo.dispX + GlobalData.optManager.svgDoc.docInfo.dispWidth &&
    e.clientY < GlobalData.optManager.svgDoc.docInfo.dispY + GlobalData.optManager.svgDoc.docInfo.dispHeight
  ) {
    var t = GlobalData.optManager.svgDoc.ConvertWindowToDocCoords(e.clientX, e.clientY);
    GlobalData.optManager.ShowXY(!0),
      GlobalData.optManager.UpdateDisplayCoordinates(null, t, null, null)
  } else GlobalData.optManager.ShowXY(!1)
}

DefaultEvt.Evt_WorkAreaHammerTap = function (e) {
  // debugger

  console.log('7 ======== Evt_WorkAreaHammerTap ============= 1', e);

  // if (!0 === SDUI.AppSettings.ReadOnly) return !1;
  Utils2.StopPropagationAndDefaults(e),
    GlobalData.optManager.SetUIAdaptation(e);
  var t = GlobalData.optManager.IsRightClick(e);
  return t ||
    (
      // SDUI.Commands.MainController.Dropdowns.HideAllDropdowns(),
      GlobalData.optManager.ClearSelectionClick()
    ),
    ConstantData.DocumentContext.CanTypeInWorkArea = !0,
    t &&
    (
      GlobalData.optManager.RightClickParams = new RightClickData,
      GlobalData.optManager.RightClickParams.HitPt = GlobalData.optManager.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY)

      ,
      Commands.MainController.ShowContextualMenu(
        Resources.Controls.ContextMenus.WorkArea.Id.toLowerCase(),
        e.gesture.center.clientX,
        e.gesture.center.clientY
      )
    ),
    !1
}

// DefaultEvt.Evt_WorkAreaHammerTap = function (e) {

//   console.log('7 ======== Evt_WorkAreaHammerTap ============= 1', e);

//   // if (!0 === SDUI.AppSettings.ReadOnly) return !1;
//   Utils2.StopPropagationAndDefaults(e),
//     GlobalData.optManager.SetUIAdaptation(e);
//   var t = GlobalData.optManager.IsRightClick(e);
//   return t ||
//     (
//       // SDUI.Commands.MainController.Dropdowns.HideAllDropdowns(),
//       GlobalData.optManager.ClearSelectionClick()
//     ),
//     // ConstantData.DocumentContext.CanTypeInWorkArea = !0,
//     // t &&
//     // (
//     //   GlobalData.optManager.RightClickParams = new RightClickData,
//     //   GlobalData.optManager.RightClickParams.HitPt = GlobalData.optManager.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY),
//     //   Commands.MainController.ShowContextualMenu(
//     //     Resources.Controls.ContextMenus.WorkArea.Id.toLowerCase(),
//     //     e.gesture.center.clientX,
//     //     e.gesture.center.clientY
//     //   )
//     // ),
//     !1
// }

DefaultEvt.Evt_WorkAreaMouseWheel = function (e) {
  if (e.ctrlKey) {
    var t = e.clientX,
      a = e.clientY,
      r = GlobalData.optManager.svgDoc.ConvertWindowToDocCoords(t, a);
    e.deltaY > 0 ? Commands.MainController.Document.ZoomInandOut(!1, !0) : e.deltaY < 0 &&
      Commands.MainController.Document.ZoomInandOut(!0, !0),
      Utils2.StopPropagationAndDefaults(e);
    var i = GlobalData.optManager.svgDoc.ConvertDocToWindowCoords(r.x, r.y),
      n = t - i.x,
      o = a - i.y,
      s = $('#svg-area'),
      l = s.scrollLeft(),
      S = s.scrollTop();
    GlobalData.docHandler.SetScroll(l - n, S - o)
  }
}

DefaultEvt.Evt_WorkAreaHammerPanEnd = function (e) {
  // debugger;
  console.log('SDJS_LM_WorkAreaHammerPanEnd', e);

  return (
    (GlobalData.optManager.bTouchPanStarted = !1),
    GlobalData.optManager.WorkAreaHammer.off("drag"),
    GlobalData.optManager.WorkAreaHammer.off("dragend"),
    GlobalData.optManager.SetEditMode(ConstantData.EditState.DEFAULT),
    !1
  );
};

DefaultEvt.Evt_WorkAreaHammerDragStart = function (e) {
  var t = $('#svg-area'),
    a = t.offset(),
    r = e.gesture.center.clientX - a.left,
    i = e.gesture.center.clientY - a.top,
    n = t[0].clientWidth,
    o = t[0].clientHeight;
  if (!(r >= n || i >= o)) return GlobalData.optManager.isMobilePlatform ||
    GlobalData.optManager.IsWheelClick(e) ||
    ConstantData.DocumentContext.SpacebarDown ? (
    GlobalData.optManager.bTouchPanStarted ||
    (
      GlobalData.optManager.bTouchPanStarted = !0,
      GlobalData.optManager.touchPanX = e.gesture.center.clientX,
      GlobalData.optManager.touchPanY = e.gesture.center.clientY,

      // Origin event
      // GlobalData.optManager.WorkAreaHammer.on('drag', HV_LM_WorkAreaHammerPan),
      GlobalData.optManager.WorkAreaHammer.on('mousemove', DefaultEvt.Evt_WorkAreaHammerPan),
      GlobalData.optManager.WorkAreaHammer.on('dragend', DefaultEvt.Evt_WorkAreaHammerPanEnd),
      Utils2.StopPropagationAndDefaults(e)
    ),
    !1
  ) : (
    GlobalData.optManager.bTouchPanStarted &&
    DefaultEvt.Evt_WorkAreaHammerPanEnd(),
    Utils2.StopPropagationAndDefaults(e),
    GlobalData.optManager.SetUIAdaptation(e),
    GlobalData.optManager.IsRightClick(e) ? (e.preventDefault(), e.stopPropagation(), !1) : (
      // SDUI.Commands.MainController.Dropdowns.HideAllDropdowns(),
      GlobalData.optManager.StartRubberBandSelect(e),
      !1
    )
  )
}

DefaultEvt.Evt_RubberBandDrag = function (e) {

  /*
  console.log('222222 Evt_RubberBandDrag ============= 1', e);
  console.log(' 222222 Evt_RubberBandDrag ============= 2', GlobalData.optManager);
  Utils2.StopPropagationAndDefaults(e);
  var t = ConstantData2.ModalOperations;
  try {
    switch (GlobalData.optManager.currentModalOperation) {
      case t.ADDCORNER:
      case t.SPLITWALL:
        GlobalData.gFloorplanManager.AddCornerCancel()
    }
    if (
      !GlobalData.optManager.AutoScrollCommon(e, !1, 'RubberBandSelectDoAutoScroll')
    ) return;
    var a = GlobalData.optManager.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY);
    GlobalData.optManager.RubberBandSelectMoveCommon(a.x, a.y)
  } catch (e) {

    console.log('Evt_RubberBandDrag === Exception', e);

    GlobalData.optManager.RubberBandSelectExceptionCleanup(e),
      GlobalData.optManager.ExceptionCleanup(e)
  }
      */

  Utils2.StopPropagationAndDefaults(e);
  var modalOperations = ConstantData2.ModalOperations;

  try {
    switch (GlobalData.optManager.currentModalOperation) {
      case modalOperations.ADDCORNER:
      case modalOperations.SPLITWALL:
        GlobalData.gFloorplanManager.AddCornerCancel();
    }

    if (!GlobalData.optManager.AutoScrollCommon(e, false, 'RubberBandSelectDoAutoScroll')) return;

    var coords = GlobalData.optManager.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY);

    console.log('222222 Evt_RubberBandDrag ============= coords', coords);
    console.log('222222 Evt_RubberBandDrag ============= GlobalData.optManager', GlobalData.optManager);
    console.log('222222 Evt_RubberBandDrag ============= GlobalData.optManager.theRubberBand', GlobalData.optManager.theRubberBand);



    GlobalData.optManager.RubberBandSelectMoveCommon(coords.x, coords.y);
  } catch (error) {
    // console.error('Evt_RubberBandDrag Exception:', error);
    GlobalData.optManager.RubberBandSelectExceptionCleanup(error);
    GlobalData.optManager.ExceptionCleanup(error);
    throw error;
  }
}

DefaultEvt.Evt_RubberBandDragEnd = function (e) {

  /*
  Utils2.StopPropagationAndDefaults(e);
  try {
    GlobalData.optManager.unbindRubberBandHammerEvents(),
      GlobalData.optManager.ResetAutoScrollTimer();
    var t = GlobalData.optManager.theRubberBandFrame;
    GlobalData.optManager.SelectAllInRect(t, e.gesture.srcEvent.shiftKey),
      GlobalData.optManager.svgOverlayLayer.RemoveElement(GlobalData.optManager.theRubberBand),
      GlobalData.optManager.theRubberBand = null,
      GlobalData.optManager.theRubberBandStartX = 0,
      GlobalData.optManager.theRubberBandStartY = 0,
      GlobalData.optManager.theRubberBandFrame = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      Collab.UnBlockMessages()
  } catch (e) {
    GlobalData.optManager.RubberBandSelectExceptionCleanup(e),
      GlobalData.optManager.ExceptionCleanup(e)
  }
      */

  Utils2.StopPropagationAndDefaults(e);

  try {
    GlobalData.optManager.UnbindRubberBandHammerEvents();
    GlobalData.optManager.ResetAutoScrollTimer();

    const rubberBandFrame = GlobalData.optManager.theRubberBandFrame;
    GlobalData.optManager.SelectAllInRect(rubberBandFrame, e.gesture.srcEvent.shiftKey);

    GlobalData.optManager.svgOverlayLayer.RemoveElement(GlobalData.optManager.theRubberBand);

    console.log('theRubberBand ============= Evt_RubberBandDragEnd to set to null', GlobalData.optManager.theRubberBand);
    GlobalData.optManager.theRubberBand = null;

    GlobalData.optManager.theRubberBandStartX = 0;
    GlobalData.optManager.theRubberBandStartY = 0;
    GlobalData.optManager.theRubberBandFrame = { x: 0, y: 0, width: 0, height: 0 };

    // Collab.UnBlockMessages();
  } catch (error) {
    GlobalData.optManager.RubberBandSelectExceptionCleanup(error);
    GlobalData.optManager.ExceptionCleanup(error);
    throw error;
  }
}

DefaultEvt.Evt_WorkAreaHammerDrawStart = function (event) {

  console.log('= Evt WorkAreaHammerDrawStart', event);

  /*
  return e.stopPropagation(),
    e.preventDefault(),
    GlobalData.optManager.IsRightClick(e) ||
    (
      GlobalData.optManager.SetUIAdaptation(e),
      GlobalData.optManager.StartNewObjectDraw(e)
    ),
    !1
    */

  // Double ===
  event.stopPropagation();
  event.preventDefault();

  const isRightClick = GlobalData.optManager.IsRightClick(event);

  if (!isRightClick) {
    GlobalData.optManager.SetUIAdaptation(event);
    GlobalData.optManager.StartNewObjectDraw(event);
  }

  return false;
}

DefaultEvt.Evt_DrawTrackHandlerFactory = function (e) {
  return function (t) {
    try {
      e.LM_DrawTrack(t)
    } catch (t) {
      e.LM_DrawClick_ExceptionCleanup(t);
      GlobalData.optManager.ExceptionCleanup(t);
      throw t;
    }
  }
}

DefaultEvt.Evt_DrawReleaseHandlerFactory = function (e) {
  return function (t) {
    try {
      e.LM_DrawRelease(t)
    } catch (t) {
      GlobalData.optManager.CancelModalOperation();
      e.LM_DrawClick_ExceptionCleanup(t);
      GlobalData.optManager.ExceptionCleanup(t);
      throw t;
    }
  }
}

DefaultEvt.Evt_ShapeTapFactory = function (e) {
  var t;
  return function (a) {
    Utils2.StopPropagationAndDefaults(a),
      GlobalData.optManager.SetUIAdaptation(a);
    var r = GlobalData.optManager.IsRightClick(a);
    if (GlobalData.docHandler.IsReadOnly()) {
      if (r) return e.RightClick(a),
        !1
    } else if (r) return e.RightClick(a),
      !1;
    switch (GlobalData.optManager.currentModalOperation) {
      case ConstantData2.ModalOperations.NONE:
        return GlobalData.optManager.CheckTextHyperlinkHit(e, a) ||
          (
            GlobalData.optManager.LM_TestIconClick(a),
            GlobalData.optManager.GetUIAdaptation(a) &&
            (
              GlobalData.docHandler.IsReadOnly() ||
              (
                t = GlobalData.optManager.svgObjectLayer.GetElementByID(e.tag),
                e.SetRolloverActions(GlobalData.optManager.svgDoc, t)
              )
            )
          ),
          !1;
      case ConstantData2.ModalOperations.DRAW:
      case ConstantData2.ModalOperations.POLYLINEDRAW:
        return !1;
      case ConstantData2.ModalOperations.STAMPTEXTONTAP:
        return GlobalData.optManager.stampSticky ||
          GlobalData.optManager.CancelObjectStampTextOnTap(!0),
          e.AllowTextEdit() &&
          (
            t = GlobalData.optManager.svgObjectLayer.GetElementByID(e.tag),
            GlobalData.optManager.ActivateTextEdit(t.svgObj.SDGObj, a, !1)
          ),
          !1
    }
  }
}

DefaultEvt.Evt_ShapeDragStartFactory = function (e) {
  return function (e) {
    if (
      GlobalData.optManager.currentModalOperation == ConstantData2.ModalOperations.DRAW
    ) return !1;
    if (
      GlobalData.optManager.currentModalOperation == ConstantData2.ModalOperations.STAMP
    ) return e.stopPropagation(),
      e.gesture.stopPropagation(),
      !1;
    if (GlobalData.optManager.SetUIAdaptation(e), GlobalData.optManager.IsRightClick(e)) return e.preventDefault(),
      e.stopPropagation(),
      e.gesture.preventDefault(),
      e.gesture.stopPropagation(),
      !1;
    switch (
    // SDUI.Commands.MainController.Dropdowns.HideAllDropdowns(),
    GlobalData.optManager.currentModalOperation
    ) {
      case ConstantData2.ModalOperations.NONE:
      case ConstantData2.ModalOperations.FORMATPAINTER:
        return Utils2.StopPropagationAndDefaults(e),
          GlobalData.optManager.LM_MoveClick(e),
          !1;
      case ConstantData2.ModalOperations.DRAW:
        return DefaultEvt.Evt_WorkAreaHammerDrawStart(e);
      case ConstantData2.ModalOperations.POLYLINEDRAW:
      case ConstantData2.ModalOperations.STAMPTEXTONTAP:
        return !1
    }
  }
}

DefaultEvt.Evt_ShapeHoldFactory = function (e) {
  return function (t) {
    switch (GlobalData.optManager.currentModalOperation) {
      case ConstantData2.ModalOperations.NONE:
        t.gesture.stopDetect(),
          Utils2.StopPropagationAndDefaults(t),
          e.RightClick(t);
        try {
          GlobalData.optManager.LM_MoveRelease(t)
        } catch (e) {
          GlobalData.optManager.LM_Move_ExceptionCleanup(e);
          GlobalData.optManager.ExceptionCleanup(e);
          throw e;
        }
        return !1;
      case ConstantData2.ModalOperations.DRAW:
      case ConstantData2.ModalOperations.POLYLINEDRAW:
      case ConstantData2.ModalOperations.STAMPTEXTONTAP:
        return !1
    }
  }
}

DefaultEvt.Evt_ShapeDoubleTapFactory = function (e) {
  return function (t) {
    var a = e.BlockID,
      r = GlobalData.optManager.GetObjectPtr(a, !1);
    if (!(r && r instanceof BaseDrawingObject)) return !1;
    switch (
    GlobalData.optManager.SetUIAdaptation(t),
    // SDUI.Commands.MainController.Dropdowns.HideAllDropdowns(),
    GlobalData.optManager.currentModalOperation
    ) {
      case ConstantData2.ModalOperations.NONE:
        if (GlobalData.optManager.bInNoteEdit) return !1;
        var i = e.GetTable(!1),
          n = e.GetGraph(!1);
        if (e.objecttype === ConstantData.ObjectTypes.SD_OBJT_D3SYMBOL) switch (e.codeLibID) {
          case 'RadialGauge':
          case 'LinearGauge':
            return GlobalData.optManager.EditGauge(),
              !1;
          case 'BarChart':
          case 'PieChart':
          case 'LineChart':
          case 'SankeyChart':
            return GlobalData.optManager.EditGraph(),
              !1
        } else if (
          // e instanceof ShapeContainer
          // Double === TODO
          // e instanceof GlobalDataShape.ShapeContainer
          e instanceof Instance.Shape.ShapeContainer
        ) return e.DoubleClick(t),
          !1;
        if (i) return GlobalData.optManager.Table_SetupAction(t, e.BlockID, ConstantData.Defines.TableCellHit, - 1),
          !1;
        if (n) return GlobalData.optManager.Graph_SetupAction(t, e.BlockID, ConstantData.Defines.GraphTextHit, - 1),
          !1;
        var o = GlobalData.optManager.svgObjectLayer.GetElementByID(e.tag);
        return GlobalData.optManager.ActivateTextEdit(o.svgObj.SDGObj, t),
          !1;
      case ConstantData2.ModalOperations.DRAW:
      case ConstantData2.ModalOperations.POLYLINEDRAW:
      case ConstantData2.ModalOperations.STAMPTEXTONTAP:
        return !1
    }
  }
}


DefaultEvt.Evt_ShapeDrag = function (e) {
  Utils2.StopPropagationAndDefaults(e);
  try {
    let isOverCustomLibrary = GlobalData.optManager.CheckDragIsOverCustomLibrary(e);


    GlobalData.optManager.LM_MoveTrack(e, isOverCustomLibrary);

  } catch (error) {
    GlobalData.optManager.LM_Move_ExceptionCleanup(error);
    GlobalData.optManager.ExceptionCleanup(error);
    throw error;
  }
}

DefaultEvt.Evt_ShapeDragEnd = function (e) {

  Utils2.StopPropagationAndDefaults(e);
  try {
    GlobalData.optManager.LM_MoveRelease(e);

  } catch (error) {
    GlobalData.optManager.LM_Move_ExceptionCleanup(error);
    GlobalData.optManager.ExceptionCleanup(error);
    throw error;
  }
}

DefaultEvt.Evt_ActionTrackHandlerFactory = function (e) {
  return function (t) {
    return e.LM_ActionTrack(t),
      !1
  }
}

DefaultEvt.Evt_ActionReleaseHandlerFactory = function (e) {
  return function (t) {
    return e.LM_ActionRelease(t),
      !1
  }
}

DefaultEvt.Evt_StampObjectDragEndFactory = function (e) {
  // debugger

  console.log('Evt_StampObjectDragEndFactory ============= 1', e);


  return function (t) {
    return GlobalData.optManager.DragDropObjectDone(t, e),
      !0
  }

  /*
  return function (event) {
    GlobalData.optManager.DragDropObjectDone(event, e);
    return true;
  }
  */

  /*
  const fun = function (t) {
    debugger
    GlobalData.optManager.DragDropObjectDone(t, e);
    return true;
  }
  */

  // GlobalData.optManager.DragDropObjectDone(event, e);
  // return true;

  // return fun;

}

DefaultEvt.Evt_StampObjectDrag = function (e) {
  return GlobalData.optManager.StampObjectMove(e),
    !0
}

DefaultEvt.Evt_MouseStampObjectMove = function (e) {

  // debugger;
  console.log('Evt_MouseStampObjectMove', e);

  GlobalData.optManager.MouseStampObjectMove(e);
}

DefaultEvt.Evt_MouseStampObjectDoneFactory = function (e) {
  return function (t) {
    return GlobalData.optManager.MouseStampObjectDone(t, e), !0;
  }
}

DefaultEvt.Evt_ActionTriggerTap = function (e) {
  return e.preventDefault(),
    e.gesture.stopPropagation(),
    e.stopPropagation(),
    !1
}

DefaultEvt.Evt_WorkAreaHammerPinchIn = function (e) {
  if (e.gesture.scale > 0.666) return GlobalData.optManager.bTouchPanStarted ? DefaultEvt.Evt_WorkAreaHammerPan(e) : (
    GlobalData.optManager.bTouchPanStarted = !0,
    GlobalData.optManager.touchPanX = e.gesture.center.clientX,
    GlobalData.optManager.touchPanY = e.gesture.center.clientY
  ),
    !1;
  GlobalData.optManager.bTouchPanStarted = !1,
    GlobalData.optManager.touchPanX = e.gesture.center.clientX,
    GlobalData.optManager.touchPanY = e.gesture.center.clientY,
    Utils2.StopPropagationAndDefaults(e),
    e.gesture.stopDetect(),
    GlobalData.optManager.RubberBandSelect_Cancel(),
    GlobalData.optManager.theMoveList &&
    GlobalData.optManager.theMoveList.length &&
    GlobalData.optManager.LM_MoveRelease(e);
  GlobalData.docHandler.svgDoc.GetWorkArea();
  var t = e.gesture.center.clientX,
    a = e.gesture.center.clientY,
    r = GlobalData.optManager.svgDoc.ConvertWindowToDocCoords(t, a),
    i = Math.round(100 * GlobalData.docHandler.GetZoomFactor());
  if (i > 50) {
    i = Math.max(50, i - 50),
      GlobalData.docHandler.SetZoomFactor(i / 100);
    var n = GlobalData.optManager.svgDoc.ConvertDocToWindowCoords(r.x, r.y),
      o = t - n.x,
      s = a - n.y,
      l = $('#svgarea'),
      S = l.scrollLeft(),
      c = l.scrollTop();
    GlobalData.docHandler.SetScroll(S - o, c - s)
  }
  return !1
}

DefaultEvt.Evt_WorkAreaHammerPan = function (e) {
  GlobalData.optManager.RubberBandSelect_Cancel(),
    GlobalData.optManager.theMoveList &&
    GlobalData.optManager.theMoveList.length &&
    GlobalData.optManager.LM_MoveRelease(e),
    GlobalData.optManager.SetEditMode(ConstantData.EditState.GRAB),
    Utils2.StopPropagationAndDefaults(e);
  GlobalData.docHandler.svgDoc.GetWorkArea();
  var t = e.gesture.center.clientX,
    a = e.gesture.center.clientY,
    r = t - GlobalData.optManager.touchPanX,
    i = a - GlobalData.optManager.touchPanY,
    n = $("#svgarea"),
    o = n.scrollLeft(),
    s = n.scrollTop();
  return (
    GlobalData.docHandler.SetScroll(o - r, s - i),
    (GlobalData.optManager.touchPanX = e.gesture.center.clientX),
    (GlobalData.optManager.touchPanY = e.gesture.center.clientY),
    !1
  );
};

DefaultEvt.Evt_WorkAreaHammerPinchOut = function (e) {
  if (e.gesture.scale < 1.333) return GlobalData.optManager.bTouchPanStarted ? DefaultEvt.Evt_WorkAreaHammerPan(e) : (
    GlobalData.optManager.bTouchPanStarted = !0,
    GlobalData.optManager.touchPanX = e.gesture.center.clientX,
    GlobalData.optManager.touchPanY = e.gesture.center.clientY
  ),
    !1;
  GlobalData.optManager.bTouchPanStarted = !1,
    GlobalData.optManager.touchPanX = e.gesture.center.clientX,
    GlobalData.optManager.touchPanY = e.gesture.center.clientY,
    Utils2.StopPropagationAndDefaults(e),
    e.gesture.stopDetect(),
    GlobalData.optManager.RubberBandSelect_Cancel(),
    GlobalData.optManager.theMoveList &&
    GlobalData.optManager.theMoveList.length &&
    GlobalData.optManager.LM_MoveRelease(e);
  GlobalData.docHandler.svgDoc.GetWorkArea();
  var t = e.gesture.center.clientX,
    a = e.gesture.center.clientY,
    r = GlobalData.optManager.svgDoc.ConvertWindowToDocCoords(t, a),
    i = Math.round(100 * GlobalData.docHandler.GetZoomFactor());
  if (i < 400) {
    i = Math.min(400, i + 50),
      GlobalData.docHandler.SetZoomFactor(i / 100);
    var n = GlobalData.optManager.svgDoc.ConvertDocToWindowCoords(r.x, r.y),
      o = t - n.x,
      s = a - n.y,
      l = $('#svgarea'),
      S = l.scrollLeft(),
      c = l.scrollTop();
    GlobalData.docHandler.SetScroll(S - o, c - s)
  }
  return !1
}

DefaultEvt.Evt_WorkAreaHammerPinchEnd = function (e) {
  GlobalData.optManager.bTouchPanStarted = !1
}

DefaultEvt.Evt_DimensionTextKeyboardLifter = function (e, t) {
  GlobalData.optManager.VirtualKeyboardLifter(e, t)
}

DefaultEvt.Evt_DimensionTextDoubleTapFactory = function (e, t) {
  return function (a) {
    var r,
      i;
    if (
      GlobalData.optManager.currentModalOperation == ConstantData.ModalOperations.NONE
    ) {
      var n = GlobalData.optManager.svgObjectLayer.GetElementByID(e.BlockID);
      if (null != n) {
        i = n.ElementCount();
        for (var o = 0; o < i; ++o) if (
          (r = n.GetElementByIndex(o)).GetID() == ConstantData.SVGElementClass.DIMENSIONTEXT &&
          r.GetUserData() == t
        ) return GlobalData.optManager.bInDimensionEdit = !0,
          GlobalData.optManager.UpdateSelectionAttributes(null),
          a.gesture ? GlobalData.optManager.TERegisterEvents(r.svgObj.SDGObj, a.gesture.srcEvent) : GlobalData.optManager.TERegisterEvents(r.svgObj.SDGObj, a),
          a.stopPropagation(),
          !1
      }
      return !1
    }
    return !1
  }
}

DefaultEvt.Evt_DimensionTextTapFactory = function (e, t, a) {
  return function (r) {
    var i;
    if (
      GlobalData.optManager.currentModalOperation == ConstantData.ModalOperations.NONE
    ) {
      var n = GlobalData.optManager.svgObjectLayer.GetElementByID(e.BlockID);
      if (null != n) for (var o = 0; o < n.ElementCount(); ++o) if (
        (i = n.GetElementByIndex(o)).GetID() == ConstantData.SVGElementClass.DIMENSIONTEXT &&
        i.GetUserData() == t
      ) return GlobalData.optManager.bInDimensionEdit &&
        GlobalData.optManager.svgDoc.GetActiveEdit() == i ? (a && r.stopPropagation(), !1) : (
        GlobalData.optManager.CloseEdit(!1, !0),
        GlobalData.optManager.bInDimensionEdit = !0,
        GlobalData.optManager.UpdateSelectionAttributes(null),
        r.gesture ? GlobalData.optManager.TERegisterEvents(i, r.gesture.srcEvent) : GlobalData.optManager.TERegisterEvents(i, r),
        r.stopPropagation(),
        !1
      );
      return !1
    }
    return !1
  }
}

DefaultEvt.Evt_PolyLineDrawExtendHandlerFactory = function (elem) {
  return function (t) {
    try {
      elem.LM_DrawExtend(t);
    } catch (t) {
      GlobalData.optManager.CancelModalOperation();
      elem.LM_DrawClick_ExceptionCleanup(t);
      GlobalData.optManager.ExceptionCleanup(t);
    }
  }
}

DefaultEvt.Evt_DrawExtendHandler = null

DefaultEvt.Evt_PolyLineDrawDragStart = function (e) {
  return false
}

export default DefaultEvt;
