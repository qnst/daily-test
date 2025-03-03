import RRect from "../Basic/Basic.RRect";


const GlobalData = {
  stateManagerPrimary: null,
  objectStorePrimary: null,
  clipboardManager: null,
  CURRENT_SEQ_OBJECT_ID: null,
  docHandler: null,
  optManager: null,
  gBusinessManager: null,
  gMaxUndoStates: null,

  ///////////////////////////////////////////////////////////////
  stateManager: null,
  objectStore: null,
  bIsPrimaryStateManager: null,
  CURRENT_SEQ_OBJECT_ID_Primary: null,

  /////////
  gBaseManager: null,
  gFlowChartManager: null,
  gFloorplanManager: null,
  // gFloorplanWallManager: null,
  gLineDrawManager: null,
  gBusinessController: null,

  ///
  Evt_ShapeDragStart: null,
  SDJS_LM_ShapeHold: null,
  SDJS_LM_ShapeDoubleTap: null,
  Evt_StampObjectDragEnd: null,
  SDJS_LM_MouseStampObjectDone: null,
}

GlobalData.gMaxUndoStates = 25;

export default GlobalData;
