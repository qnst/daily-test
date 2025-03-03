

const Globals = {
  // StoredObjectType: null,
  StateOperationType: null,
  DocumentToolbarOptions: null,












}

/*
Globals.StoredObjectType = {
  BASE_LM_DRAWING_OBJECT: 'BaseDrawingObject',
  LM_TEXT_OBJECT: 'TextObject',
  LM_NOTES_OBJECT: 'NotesObject',
  SED_SESSION_OBJECT: 'SEDSession',
  TED_SESSION_OBJECT: 'TEDSession',
  SELECTEDLIST_OBJECT: 'SelectedList',
  LINKLIST_OBJECT: 'Links',
  LAYERS_MANAGER_OBJECT: 'LayersManager',
  H_NATIVE_OBJECT: 'hNative',
  H_NATIVEWIN_OBJECT: 'hNativeWindows',
  BLOBBYTES_OBJECT: 'BlobBytes',
  TABLE_OBJECT: 'Table',
  GRAPH_OBJECT: 'Graph',
  SDDATA_OBJECT: 'SDData',
  GANTTINFO_OBJECT: 'GanttInfo',
  EXPANDEDVIEW_OBJECT: 'ExpandedView',
  LM_COMMENT_BLOCK: 'CommentBlock',
  LM_COMMENT_THREAD: 'CommentThread',
  LM_COMMENT_LIST: 'CommentList'
}
*/

Globals.StateOperationType = {
  CREATE: 1,
  UPDATE: 2,
  DELETE: 3
}

Globals.DocumentToolbarOptions = [
  {
    name: 'showRulers',
    description: 'Rulers',
    value: true
  },
  {
    name: 'showGrid',
    description: 'Grid',
    value: true
  },
  {
    name: 'enableSnap',
    description: 'Snap',
    value: true
  },
  {
    name: 'centerSnap',
    description: 'Drag Snap to Center',
    value: true
  },
  {
    name: 'zoom',
    description: 'Zoom',
    value: 2
  },
  {
    name: 'zoomLevels',
    description: 'Zoom Levels',
    value: [
      50,
      75,
      100,
      125,
      150,
      175,
      200
    ]
  },
  {
    name: 'scale',
    description: 'document scale',
    value: 1
  },
  {
    name: 'showPageDivider',
    description: 'Page Dividers',
    value: !1
  },
  {
    name: 'spellCheck',
    description: 'Enable Spell Check',
    value: !0
  },
  {
    name: 'spellDict',
    description: 'Spell Dictionary',
    value: null
  },
  {
    name: 'spellFlags',
    description: 'Spell Flags',
    value: 0
  }
]

export default Globals;
