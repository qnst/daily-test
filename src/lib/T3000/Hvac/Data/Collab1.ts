


// import Utils1 from '../Helper/Utils1';
// import ConstantData from './ConstantData';
// import T3Gv from './T3Gv';


// const Collab = {}

// Collab.TestBlockList = []
// Collab.Allow = false
// Collab.ProcessMessage = !1
// Collab.ProcessUIOperation = !1
// Collab.LockMessage = !1
// Collab.NoRedrawFromSameEditor = !1
// Collab.WaitingForTheReturnMessage = !1
// Collab.Colors = [
//   '#FFBE36',
//   '#1F6CF9',
//   '#8bc53f',
//   '#253858',
//   '#ff6633',
//   '#cc3333',
//   '#d8df21',
//   '#99ccff',
//   '#5748E2'
// ]
// Collab.TextColors = [
//   '#444444',
//   '#FFFFFF',
//   '#444444',
//   '#FFFFFF',
//   '#FFFFFF',
//   '#FFFFFF',
//   '#444444',
//   '#444444',
//   '#FFFFFF'
// ]
// Collab.ColorIndex = 0
// Collab.CreateList = []
// Collab.ProcessCreateList = !1
// Collab.MoveTimestamp = 0
// Collab.MoveDelay = 100
// Collab.ClientMessageQueue = []
// Collab.SecondarySelection = {}
// Collab.IsCollaborating = function () {
//   return Collab.Allow
// }
// Collab.AllowSelectionChange = function (e) {
//   return !Collab.ProcessMessage
// }

// Collab.IsPrimary = function () {
//   return Collab.IsCollaborating() &&
//     !Collab.IsSecondary()
// }

// Collab.IsProcessingMessage = function () {
//   // return Collab.ProcessMessage
//   return false;
// }

// Collab.AllowMessage = function () {
//   return Collab.Allow &&
//     !Collab.ProcessMessage
// }

// Collab.Editor = function (e, t) {
//   this.EditorID = e,
//     this.UserID = t,
//     this.NewBlockMap = {},
//     this.NewDataTableMap = []
// }

// Collab.EditorList = [],
//   Collab.GetEditorListEntry = function (e) {
//     var t,
//       a,
//       r = Collab.EditorList.length;
//     for (t = 0; t < r; t++) if ((a = Collab.EditorList[t]).EditorID === e) return a;
//     return null
//   }

// Collab.AddEditor = function (e, t) {
//   var a = Collab.GetEditorListEntry(e);
//   return a ||
//     (
//       a = new Collab.Editor(e, t),
//       Collab.EditorList.push(a),
//       a
//     )
// }

// Collab.objectStore = null,
//   Collab.stateManager = null,
//   Collab.CURRENT_SEQ_OBJECT_ID = 0,
//   Collab.ContentHeader = null,
//   Collab.NewBlockIDs = [],
//   Collab.NewDataTableIDs = [],
//   Collab.Secondary = !1,
//   Collab.EditorID = 0,
//   Collab.SetSecondary = function (e) {
//     Collab.Secondary = !!e
//   }

// Collab.IsSecondary = function () {
//   return Collab.Secondary
// }

// Collab.AddNewBlockToSecondary = function (e) {
//   Collab.Secondary &&
//     (
//       Collab.ProcessMessage ||
//       Collab.NewBlockIDs.indexOf(e) < 0 &&
//       Collab.NewBlockIDs.push(e)
//     )
// }

// Collab.AddNewDataTableToSecondary = function (e) {
//   Collab.Secondary &&
//     Collab.NewDataTableIDs.indexOf(e) < 0 &&
//     Collab.NewDataTableIDs.push(e)
// }

// Collab.AllowUndo = function () {
//   return gListManager.currentModalOperation == ListManager.ModalOperations.NONE &&
//     (
//       null != Collab.objectStore ? !(Collab.T3Gv.stateManager.CurrentStateID <= 0) : !(T3Gv.stateManager.CurrentStateID <= 0)
//     )
// }

// Collab.AllowRedo = function () {
//   return null != Collab.objectStore ? !(
//     Collab.T3Gv.stateManager.CurrentStateID + 1 >= Collab.T3Gv.stateManager.States.length
//   ) : !(T3Gv.stateManager.CurrentStateID + 1 >= T3Gv.stateManager.States.length)
// }

// Collab.BeginSecondaryEdit = function () {
//   console.log('=== BeginSecondaryEdit ===')

//   /*
//   if (Collab.BlockMessages(),
//     Collab.IsSecondary() && !Collab.IsProcessingMessage() && null == Collab.objectStore) {
//     Collab.objectStore = objectStore,
//       Collab.stateManager = stateManager,
//       Collab.CURRENT_SEQ_OBJECT_ID = CURRENT_SEQ_OBJECT_ID,
//       Collab.ContentHeader = SDJS.Editor.DeepCopy(gListManager.contentHeader),
//       Collab.CreateList = [],
//       Collab.ContentHeader.ClipboardBuffer = gListManager.contentHeader.ClipboardBuffer;
//     var e = new SDJS.Editor.BaseStateManager
//       , t = new SDJS.Editor.ObjectStore;
//     stateManager = e,
//       objectStore = t,
//       SDJS_clone_object_store(Collab.objectStore, t)
//   }
//   */

//   // debugger

//   /*
//   var check1 = Collab.BlockMessages();
//   var check2 = Collab.IsSecondary() && !Collab.IsProcessingMessage() && null == Collab.objectStore;

//   if (check1, check2) {
//     Collab.objectStore = objectStore,
//       Collab.stateManager = stateManager,
//       Collab.CURRENT_SEQ_OBJECT_ID = CURRENT_SEQ_OBJECT_ID,
//       Collab.ContentHeader = SDJS.Editor.DeepCopy(gListManager.contentHeader),
//       Collab.CreateList = [],
//       Collab.ContentHeader.ClipboardBuffer = gListManager.contentHeader.ClipboardBuffer;
//     var e = new Editor.BaseStateManager
//       , t = new Editor.ObjectStore;
//     stateManager = e,
//       objectStore = t,
//       SDJS_clone_object_store(Collab.objectStore, t)
//   }
//   */

//   // Collab.BlockMessages(),

//   var check = Collab.IsSecondary() && !Collab.IsProcessingMessage() && Collab.objectStore == null;
//   if (check) {
//     Collab.objectStore = objectStore;
//     Collab.stateManager = stateManager;
//     Collab.CURRENT_SEQ_OBJECT_ID = CURRENT_SEQ_OBJECT_ID;
//     Collab.ContentHeader = SDJS.Editor.DeepCopy(gListManager.contentHeader);
//     Collab.CreateList = [];
//     Collab.ContentHeader.ClipboardBuffer = gListManager.contentHeader.ClipboardBuffer;

//     var newStateManager = new SDJS.Editor.BaseStateManager();
//     var newObjectStore = new SDJS.Editor.ObjectStore();

//     stateManager = newStateManager;
//     objectStore = newObjectStore;

//     SDJS_clone_object_store(Collab.objectStore, newObjectStore);
//   }

// }

// Collab.GetUndoState = function () {
//   var e = T3Gv.stateManager.GetUndoState();
//   return null != Collab.stateManager &&
//     (e = Collab.T3Gv.stateManager.GetUndoState()),
//     e
// }

// Collab.CloseSecondaryEdit = function (e) {
//   if (Collab.IsSecondary()) {
//     if (null != Collab.objectStore) {
//       var t = gListManager.GetObjectPtr(gListManager.sedSessionBlockId, !1),
//         a = t.tselect,
//         r = T3Gv.objectStore.GetObject(gListManager.theSelectedListBlockID),
//         i = Utils1.DeepCopy(r.Data),
//         n = T3Gv.objectStore.GetObject(gListManager.tedSessionBlockId),
//         o = Utils1.DeepCopy(n.Data),
//         s = Utils1.DeepCopy(t.def),
//         l = t.d_sarrow,
//         S = t.d_earrow,
//         c = t.d_sarrowdisp,
//         u = t.d_earrowdisp,
//         p = t.d_arrowsize;
//       if (
//         stateManager = Collab.stateManager,
//         objectStore = Collab.objectStore,
//         CURRENT_SEQ_OBJECT_ID = Collab.CURRENT_SEQ_OBJECT_ID,
//         Collab.objectStore = null,
//         Collab.stateManager = null,
//         (
//           t = gListManager.GetObjectPtr(gListManager.sedSessionBlockId, !1)
//         ).def = s,
//         t.d_sarrow = l,
//         t.d_earrow = S,
//         t.d_sarrowdisp = c,
//         t.d_earrowdisp = u,
//         t.d_arrowsize = p,
//         a > CURRENT_SEQ_OBJECT_ID
//       ) {
//         if (e) {
//           if (
//             Collab.SecondarySelection.complete = !1,
//             Collab.SecondarySelection.tselect = a,
//             Collab.SecondarySelection.selectedList = i,
//             Collab.SecondarySelection.TEDSession = o,
//             o.theActiveTextEditObjectID >= 0
//           ) {
//             var d = gListManager.svgDoc.GetActiveEdit();
//             d &&
//               (
//                 Collab.SecondarySelection.theSelectedRange = Utils1.DeepCopy(d.GetSelectedRange()),
//                 gListManager.TEUnregisterEvents()
//               ),
//               (n = T3Gv.objectStore.GetObject(gListManager.tedSessionBlockId)).Data.theActiveTextEditObjectID = - 1
//           }
//           o.theActiveTableObjectID >= 0 &&
//             (
//               (n = T3Gv.objectStore.GetObject(gListManager.tedSessionBlockId)).Data.theActiveTableObjectID = - 1,
//               Collab.SecondarySelection.theActiveTableObjectID = - 1
//             )
//         }
//       } else t.tselect = a,
//         (r = T3Gv.objectStore.GetObject(gListManager.theSelectedListBlockID)).Data = i,
//         (n = T3Gv.objectStore.GetObject(gListManager.tedSessionBlockId)).Data = o;
//       gListManager.contentHeader = Collab.ContentHeader
//     }
//     Collab.NewBlockIDs = [],
//       Collab.NewDataTableIDs = []
//   }
// }

// Collab.MessageQueue = [],
//   Collab.AllowPlay = !1,
//   Collab.Timer = null,
//   Collab.Delay = 0,
//   Collab.PrimaryDelay = 0,
//   Collab.SecondaryDelay = 500,
//   Collab.Message = function (e, t, a) {
//     var r;
//     if (
//       this.MessageType = e,
//       this.Data = t,
//       this.EditorID = Collab.EditorID,
//       this.UserID = ConstantData.DocumentContext.UserId,
//       this.hasNewBlocks = !1,
//       this.hasNewData = !1,
//       this.HistoryState = - 1,
//       Collab.NewBlockIDs.length &&
//       (this.hasNewBlocks = !0),
//       Collab.NewDataTableIDs.length &&
//       (this.hasNewDataTables = !0),
//       a &&
//       (
//         this.selectedList = Utils1.DeepCopy(
//           T3Gv.objectStore.GetObject(gListManager.theSelectedListBlockID).Data
//         ),
//         r = gListManager.GetObjectPtr(gListManager.sedSessionBlockId, !1),
//         this.tselect = r.tselect,
//         this.ActiveTableID = gListManager.Table_GetActiveID(),
//         this.ActiveTableID >= 0
//       )
//     ) {
//       obj = gListManager.GetObjectPtr(this.ActiveTableID, !1);
//       var i,
//         n,
//         o = obj.GetTable(!1),
//         s = o.cells.length,
//         l = ListManager.Table.CellFlags.SDT_F_Select;
//       for (
//         this.selectedCells = [],
//         this.selectedRows = [],
//         this.selectedCols = [],
//         o.select >= 0 ? this.tableselect = o.cells[o.select].uniqueid : this.tableselect = o.select,
//         i = 0;
//         i < s;
//         i++
//       ) (n = o.cells[i]).flags & l &&
//         this.selectedCells.push({
//           uniqueid: n.uniqueid
//         });
//       var S = o.rows.length;
//       for (i = 0; i < S; i++) o.rows[i].selected &&
//         this.selectedRows.push(i);
//       var c = o.cols.length;
//       for (i = 0; i < c; i++) o.cols[i].selected &&
//         this.selectedCols.push(i)
//     }
//     this.Actions = []
//   }

// Collab.MessageAction = function (e, t) {
//   this.ActionType = e
// }

// Collab.AddToCreateList = function (e, t) {
//   (
//     Collab.IsSecondary() &&
//     !Collab.IsProcessingMessage() ||
//     Collab.ProcessCreateList
//   ) &&
//     (
//       e ? Collab.CreateList.push(e) : t &&
//         (Collab.CreateList = Collab.CreateList.concat(t))
//     )
// }

// Collab.ClearCreateList = function () {
//   Collab.CreateList = []
// }

// Collab.BufferToString = function (e) {
//   var t,
//     a,
//     r,
//     i = new Uint8Array(e),
//     n = '';
//   for (a = i.length, t = 0; t < a; t++) (r = i[t].toString(16)).length < 2 &&
//     (r = '0' + r),
//     n += r;
//   return n
// }

// Collab.StringToBuffer = function (e) {
//   var t,
//     a,
//     r,
//     i = e.length / 2,
//     n = new ArrayBuffer(i),
//     o = new Uint8Array(n),
//     s = 0;
//   for (t = 0; t < i; t++) a = e.charAt(s),
//     s++,
//     r = a + e.charAt(s),
//     s++,
//     o[t] = parseInt(r, 16);
//   return n
// }

// Collab.SendMessage = function (e) {
//   if (SDUI.AppSettings.UseBackplane) {
//     Collab.IsSecondary() &&
//       (Collab.WaitingForTheReturnMessage = !0),
//       e.HistoryState = T3Gv.stateManager.HistoryState,
//       // Editor.IsStateOpen() &&
//       Utils1.IsStateOpen() &&
//       e.HistoryState++;
//     var t = Collab.DeepCopyMessage(e);
//     let a = JSON.stringify(t);
//     SDUI.SDBackplane.Collaboration.SendMessage(a)
//   } else Collab.MessageQueue.push(e)
// }

// Collab.BuildMessage = function (e, t, a, r) {
//   // if (Collab.AllowMessage()) {
//   //   var i = new Collab.Message(e, t, a);
//   //   if (r) return i;
//   //   Collab.SendMessage(i)
//   // }

//   //Double ===
// }

// Collab.AddToRemapList = function (e, t, a, r) {
//   if (null != t && !Collab.IsSecondary()) {
//     var i = Collab.AddEditor(e.EditorID);
//     if (i) {
//       var n,
//         o,
//         s = 0;
//       for (o = t.length, n = 0; n < o; n++) null == i.NewBlockMap[t[n].toString()] &&
//         (i.NewBlockMap[t[n].toString()] = a[s + r], s++);
//       e.Data.NewBlockMap = Utils1.DeepCopy(i.NewBlockMap)
//     }
//   }
// }

// Collab.AddToDataRemapList = function (e, t, a) {
//   if (!Collab.IsSecondary()) {
//     var r = Collab.AddEditor(e);
//     r &&
//       (r.NewDataTableMap[t] = a)
//   }
// }

// Collab.GetRemappedDataTableID = function (e, t) {
//   if (Collab.IsSecondary()) return t;
//   var a = Collab.AddEditor(e.EditorID),
//     r = null;
//   return a &&
//     (r = a.NewDataTableMap[t]),
//     null == r &&
//     (r = t),
//     null == ListManager.SDData.GetFieldedDataTable(r) &&
//     (r = - 1),
//     r
// }

// Collab.GetRemappedID = function (e, t) {
//   if (t < 0) return t;
//   var a = e[t.toString()];
//   return null == a ? t : a
// }

// Collab.GetRemapList = function (e) {
//   if (!Collab.IsSecondary()) {
//     var t = Collab.AddEditor(e.EditorID),
//       a = null;
//     return t &&
//       Object.keys(t.NewBlockMap).length > 0 &&
//       (a = t.NewBlockMap),
//       a
//   }
// }

// Collab.ValidateShapeID = function (e, t) {
//   var a = gListManager.ActiveVisibleZList();
//   return t &&
//     (a = t),
//     Collab.ValidateEditID(e, a)
// }

// Collab.ValidateShapeExistsID = function (e) {
//   return null == gListManager.GetObjectPtr(e, !1) ? - 1 : e
// }

// Collab.ValidateEditID = function (e, t, a) {
//   var r = !0;
//   if (a) {
//     var i = gListManager.GetObjectPtr(e, !1);
//     i &&
//       i instanceof BaseDrawingObject &&
//       i.objecttype === ConstantData.ObjectTypes.SD_OBJT_ANNOTATION &&
//       (r = !1)
//   }
//   return r &&
//     t.indexOf(e) < 0 ||
//     null == (i = gListManager.GetObjectPtr(e, !1)) ||
//     i instanceof BaseDrawingObject &&
//     i.flags & ConstantData.ObjFlags.SEDO_NotVisible ? - 1 : e
// }

// Collab.AddLine = function (e) {
//   var t = null,
//     a = SDUI.Commands.MainController.Shapes.DrawNewLineShape(e.Data.LineTool, !1, !0, e);
//   return a &&
//     (t = gListManager.AddNewObject(a, !1, !0)),
//     t
// }

// Collab.AddWall = function (e) {
//   var t = null,
//     a = gFloorplanManager.AddWall(!0, e);
//   return a &&
//     (t = gListManager.AddNewObject(a, !1, !0)),
//     t
// }

// Collab.AddShape = function (e) {
//   //debugger
//   var t,
//     a = null;
//   switch (e.ShapeType) {
//     case ConstantData.ShapeType.RECT:
//       t = new ListManager.Rect(e.attributes);
//       break;
//     case ConstantData.ShapeType.RRECT:
//       t = new ListManager.RRect(e.attributes);
//       break;
//     case ConstantData.ShapeType.OVAL:
//       t = new ListManager.Oval(e.attributes);
//       break;
//     default:
//       (t = new ListManager.Polygon(e.attributes)).dataclass = e.attributes.dataclass
//   }
//   return t &&
//     (a = gListManager.AddNewObject(t, !1, !0)),
//     a
// }

// Collab.ActionButtons = function (e) {
//   var t = e.Data.BlockID;
//   if (t >= 0) {
//     var a = Collab.GetRemapList(e);
//     if (
//       a &&
//       (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//       (t = Collab.ValidateShapeID(t)) < 0
//     ) return
//   }
//   var r = SDJS_Business_NameToController(e.Data.SelectionManagerName);
//   if (r) {
//     var i = sdp.def;
//     if (sdp.def = e.Data.def, e.Data.symbolID) {
//       var n = SDUI.Commands.MainController.Symbols.CurrentSymbol;
//       SDUI.Commands.MainController.Symbols.CurrentSymbol = e.Data.symbolID
//     }
//     switch (
//     e.Data.CreateList &&
//     e.Data.CreateList.length &&
//     (Collab.CreateList = [], Collab.ProcessCreateList = !0),
//     e.Data.Direction
//     ) {
//       case ConstantData.ActionArrow.RIGHT:
//         gBusinessController.AddRight(null, t, r);
//         break;
//       case ConstantData.ActionArrow.LEFT:
//         gBusinessController.AddLeft(null, t, r);
//         break;
//       case ConstantData.ActionArrow.UP:
//         gBusinessController.AddAbove(null, t, r);
//         break;
//       case ConstantData.ActionArrow.DOWN:
//         gBusinessController.AddBelow(null, t, r);
//         break;
//       case ConstantData.ActionArrow.ENTER:
//         gBusinessController.AddRightPeer(t, r);
//         break;
//       case ConstantData.ActionArrow.CUSTOM:
//         gBusinessController.AddCustom(null, t, e.Data.buttonindex, r);
//         break;
//       case ConstantData.ActionArrow.COMANAGER:
//         gBusinessController.AddCoManager(t, r);
//         break;
//       case ConstantData.ActionArrow.ASSISTANT:
//         gBusinessController.AddAssistant(t, r);
//         break;
//       case ConstantData.ActionArrow.ADDPARENTS:
//         gBusinessController.AddParents(null, t, r);
//         break;
//       case ConstantData.ActionArrow.ADDDESCENDANTS:
//         gBusinessController.AddDescendants(null, t, r);
//         break;
//       case ConstantData.ActionArrow.ACTIONCLICK:
//         gBusinessController.ActionClick(null, t, e.Data.Direction, r)
//     }
//     e.Data.CreateList &&
//       e.Data.CreateList.length &&
//       Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//       Collab.ProcessCreateList = !1,
//       Collab.CreateList = [],
//       sdp.def = i,
//       e.Data.symbolID &&
//       (SDUI.Commands.MainController.Symbols.CurrentSymbol = n)
//   }
// }

// Collab.ActionButton_SplitPath = function (e) {
//   var t = e.Data.BlockID;
//   if (t >= 0) {
//     var a = Collab.GetRemapList(e);
//     if (
//       a &&
//       (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//       (t = Collab.ValidateShapeID(t)) < 0
//     ) return
//   }
//   Collab.CreateList = [],
//     Collab.ProcessCreateList = !0;
//   var r = SDJS_Business_NameToController(e.Data.SelectionManagerName);
//   if (r) {
//     var i = sdp.def;
//     if (sdp.def = e.Data.def, e.Data.symbolID) {
//       var n = SDUI.Commands.MainController.Symbols.CurrentSymbol;
//       SDUI.Commands.MainController.Symbols.CurrentSymbol = e.Data.symbolID
//     }
//     switch (e.Data.Direction) {
//       case ConstantData.ActionArrow.RIGHT:
//         gBusinessController.SplitPathRight(t, r);
//         break;
//       case ConstantData.ActionArrow.LEFT:
//         gBusinessController.SplitPathLeft(t, r);
//         break;
//       case ConstantData.ActionArrow.UP:
//         gBusinessController.SplitPathUp(t, r);
//         break;
//       case ConstantData.ActionArrow.DOWN:
//         gBusinessController.SplitPathDown(t, r)
//     }
//     sdp.def = i,
//       e.Data.symbolID &&
//       (SDUI.Commands.MainController.Symbols.CurrentSymbol = n),
//       e.Data.CreateList &&
//       Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0)
//   }
//   Collab.ProcessCreateList = !1,
//     Collab.CreateList = []
// }

// Collab.Pr_InsertSymbol = function (e) {
//   var t = e.Data.BlockID;
//   if (t >= 0) {
//     var a = Collab.GetRemapList(e);
//     if (
//       a &&
//       (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//       (t = Collab.ValidateShapeID(t)) < 0
//     ) return
//   }
//   var r = e.Data.lineid;
//   if (
//     !(
//       r >= 0 &&
//       (
//         a &&
//         (r = Collab.GetRemappedID(a, r), e.Data.lineid = r),
//         (r = Collab.ValidateShapeID(r)) < 0
//       )
//     )
//   ) {
//     var i = e.Data.shapeid;
//     if (
//       !(
//         i >= 0 &&
//         (
//           a &&
//           (i = Collab.GetRemappedID(a, i), e.Data.shapeid = i),
//           (i = Collab.ValidateShapeID(i)) < 0
//         )
//       )
//     ) {
//       var n = sdp.def;
//       sdp.def = e.Data.Def;
//       var o = e.Data;
//       gLineDrawManager.Pr_InsertSymbol(o.symbolID, o.ArrowID, t, r, i, o.EndPoint, o.StartPoint, o.connect),
//         sdp.def = n
//     }
//   }
// }

// Collab.LineDraw_InsertShape = function (e) {
//   var t = e.Data.lineDrawId,
//     a = Collab.GetRemapList(e);
//   if (
//     a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.lineDrawId = t),
//     !((t = Collab.ValidateShapeID(t)) < 0)
//   ) {
//     Collab.CreateList = [],
//       Collab.ProcessCreateList = !0;
//     var r = sdp.def.style;
//     sdp.def.style = e.Data.StyleRecord;
//     var i = gListManager.lineDrawId;
//     gListManager.lineDrawId = t,
//       gLineDrawManager.InsertShape(0, e.Data.symbolID),
//       gListManager.lineDrawId = i,
//       sdp.def.style = r,
//       e.Data.CreateList &&
//       Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//       Collab.ProcessCreateList = !1,
//       Collab.CreateList = []
//   }
// }

// Collab.JoinPath = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   if (
//     a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     !((t = Collab.ValidateShapeID(t)) < 0)
//   ) {
//     var r = SDJS_Business_NameToController(e.Data.SelectionManagerName);
//     r &&
//       r.JoinPath(t, r)
//   }
// }

// Collab.SetChartStyle = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   if (
//     a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     !((t = Collab.ValidateShapeID(t)) < 0)
//   ) {
//     var r = SDJS_Business_NameToController(e.Data.SelectionManagerName);
//     r &&
//       r.SetChartStyle(e.Data.styleflags, t, r)
//   }
// }

// Collab.SetBranchStyle = function (e) {
//   var t = SDJS_Business_NameToController(e.Data.SelectionManagerName);
//   t &&
//     t.SetBranchStyle(e.Data.styleflags)
// }

// Collab.SetDirection = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   if (
//     a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     !((t = Collab.ValidateShapeID(t)) < 0)
//   ) {
//     var r = SDJS_Business_NameToController(e.Data.SelectionManagerName);
//     r &&
//       r.SetDirection(e.Data.Direction, null, t)
//   }
// }

// Collab.SetSpacing = function (e) {
//   var t = SDJS_Business_NameToController(e.Data.SelectionManagerName);
//   t &&
//     t.SetConnectorSpacing(e.Data.vertical, e.Data.spacing, !1)
// }

// Collab.MakeUniformSize = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   if (
//     a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     !((t = Collab.ValidateShapeID(t)) < 0)
//   ) {
//     var r = SDJS_Business_NameToController(e.Data.SelectionManagerName);
//     r &&
//       r.MakeUniformSize(t)
//   }
// }

// Collab.AddSelectedSymbol = function (e) {
//   Collab.CreateList = [],
//     Collab.ProcessCreateList = !0,
//     SDUI.Commands.MainController.Shapes.AddSelectedSymbol(e.Data.symbolID, e),
//     e.Data.CreateList &&
//     Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//     Collab.ProcessCreateList = !1,
//     Collab.CreateList = []
// }

// Collab.AddAnnotationLayer = function (e) {
//   Collab.CreateList = [],
//     Collab.ProcessCreateList = !0,
//     gListManager.AddAnnotationLayer(e),
//     e.Data.CreateList &&
//     Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//     Collab.ProcessCreateList = !1,
//     Collab.CreateList = []
// }

// Collab.InsertSDONFromImport = function (e) {
//   Collab.CreateList = [],
//     Collab.ProcessCreateList = !0;
//   var t = gListManager.ImportContext,
//     a = null,
//     r = null;
//   e.Data.ImportContext &&
//     (gListManager.ImportContext = e.Data.ImportContext),
//     e.Data.pastepos &&
//     (gListManager.PastePos = Utils1.DeepCopy(e.Data.pastepos)),
//     e.Data.SelectionManagerName &&
//     (
//       a = SDJS_Business_NameToController(e.Data.SelectionManagerName)
//     ),
//     e.Data.importType === ListManager.ImportTypes.Stickynotes &&
//     (r = API.ReadTextFile_CompleteSticky),
//     gListManager.InsertSDONFromImport(e.Data.SDONStr, e.Data.append, r, a),
//     e.Data.CreateList &&
//     Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//     Collab.ProcessCreateList = !1,
//     Collab.CreateList = [],
//     gListManager.ImportContext = t,
//     gListManager.PastePos = null,
//     // Editor.IsStateOpen() &&
//     Utils1.IsStateOpen() &&
//     gListManager.CompleteOperation()
// }

// Collab.AddMultiplicity = function (e) {
//   Collab.CreateList = [],
//     Collab.ProcessCreateList = !0,
//     gListManager.AddMultiplicity(!1),
//     e.Data.CreateList &&
//     Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//     Collab.ProcessCreateList = !1,
//     Collab.CreateList = []
// }

// Collab.CreateTableFromReport = function (e) {
//   Collab.CreateList = [],
//     Collab.ProcessCreateList = !0,
//     SDUI.Commands.MainController.DataPanel.CreateTableFromReport(e.Data.dataReport),
//     e.Data.CreateList &&
//     Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//     Collab.ProcessCreateList = !1,
//     Collab.CreateList = []
// }

// Collab.Jira_CreateShapesForIssues = function (e) {
//   Collab.CreateList = [],
//     Collab.ProcessCreateList = !0;
//   var t = gListManager.ImportContext;
//   e.Data.ImportContext ? gListManager.ImportContext = e.Data.ImportContext : gListManager.ImportContext = null,
//     SDUI.Commands.MainController.JiraController.CreateShapesForIssues(e.Data.issueInfo, e),
//     e.Data.CreateList &&
//     Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//     Collab.ProcessCreateList = !1,
//     Collab.CreateList = [],
//     gListManager.ImportContext = t
// }

// Collab.UpdateObjectWithIntegrationCardItemInformation = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   if (
//     a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     !((t = Collab.ValidateShapeID(t)) < 0)
//   ) {
//     var r = gListManager.GetObjectPtr(t, !0);
//     r &&
//       (
//         SDUI.Commands.MainController.IntegrationsCardsController.HasIntegration(
//           SDUI.Commands.MainController.IntegrationsCardsController.Integrations.AzureDevOps
//         ) ||
//         SDUI.AzureDevOpsIntegrationCardsController.AddIntegration(),
//         SDUI.Commands.MainController.IntegrationsCardsController.UpdateShapeForItem(e.Data.integrationId, r, e.Data.itemInfo)
//       )
//   }
// }

// Collab.CreateShapesForIntegrationCardItems = function (e) {
//   SDUI.Commands.MainController.IntegrationsCardsController.HasIntegration(
//     SDUI.Commands.MainController.IntegrationsCardsController.Integrations.AzureDevOps
//   ) ||
//     SDUI.AzureDevOpsIntegrationCardsController.AddIntegration(),
//     Collab.CreateList = [],
//     Collab.ProcessCreateList = !0;
//   var t = gListManager.ImportContext;
//   gListManager.ImportContext = e.Data.ImportContext ? e.Data.ImportContext : null,
//     SDUI.Commands.MainController.IntegrationsCardsController.CreateShapesForItems(e.Data.integrationId, e.Data.itemInfoList, !0),
//     e.Data.CreateList &&
//     Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//     gListManager.ImportContext = t
// }

// Collab.UpdateObjectWithIntegrationCardItemInformation = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   if (
//     a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     !((t = Collab.ValidateShapeID(t)) < 0)
//   ) {
//     var r = gListManager.GetObjectPtr(t, !0);
//     r &&
//       (
//         SDUI.Commands.MainController.IntegrationsCardsController.HasIntegration(
//           SDUI.Commands.MainController.IntegrationsCardsController.Integrations.AzureDevOps
//         ) ||
//         SDUI.AzureDevOpsIntegrationCardsController.AddIntegration(),
//         SDUI.Commands.MainController.IntegrationsCardsController.UpdateShapeForItem(e.Data.integrationId, r, e.Data.itemInfo)
//       )
//   }
// }

// Collab.CreateShapesForIntegrationCardItems = function (e) {
//   SDUI.Commands.MainController.IntegrationsCardsController.HasIntegration(
//     SDUI.Commands.MainController.IntegrationsCardsController.Integrations.AzureDevOps
//   ) ||
//     SDUI.AzureDevOpsIntegrationCardsController.AddIntegration(),
//     Collab.CreateList = [],
//     Collab.ProcessCreateList = !0;
//   var t = gListManager.ImportContext;
//   gListManager.ImportContext = e.Data.ImportContext ? e.Data.ImportContext : null,
//     SDUI.Commands.MainController.IntegrationsCardsController.CreateShapesForItems(e.Data.integrationId, e.Data.itemInfoList, !0),
//     e.Data.CreateList &&
//     Collab.AddToRemapList(e.EditorID, e.Data.CreateList, Collab.CreateList, 0),
//     Collab.ProcessCreateList = !1,
//     Collab.CreateList = [],
//     gListManager.ImportContext = t
// }

// Collab.UpdateSelectedShapeFromJiraInformation = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   a &&
//     (t = Collab.GetRemappedID(a, t)),
//     (t = Collab.ValidateShapeID(t)) < 0 ||
//     SDUI.Commands.MainController.JiraController.UpdateSelectedShapeFromJiraInformation(e.Data.issueInfo, t)
// }

// Collab.Multiplicity_SwitchSides = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     (t = Collab.ValidateShapeID(t)) < 0 ||
//     gListManager.Multiplicity_SwitchSides(t, !1)
// }

// Collab.HitAreaClick = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     (t = Collab.ValidateShapeExistsID(t)) < 0 ||
//     gListManager.LM_HitAreaClick(t, e.Data.theHitAreaID)
// }

// Collab.Table_FillSwimlane = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     (t = Collab.ValidateShapeID(t)) < 0 ||
//     gListManager.Table_FillSwimlane(t, e.Data.context, e.Data.Fill, e.Data.cellindex)
// }

// Collab.SwimLane_Operation = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     (t = Collab.ValidateShapeID(t)) < 0 ||
//     gListManager.SwimLane_Operation(t, e.Data.action, e.Data.row, e.Data.col, !0)
// }

// Collab.DeSelect = function (e) {
// }

// Collab.Jira_ProductRoadMap = function (e) {
//   Collab.CreateList = [],
//     Collab.ProcessCreateList = !0,
//     SDUI.Commands.MainController.JiraProductRoadmapDialogController.DialogOK(null, e),
//     e.Data.CreateList &&
//     Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//     Collab.ProcessCreateList = !1,
//     Collab.CreateList = []
// }

// Collab.InsertFrameContainer = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   if (
//     a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     !((t = Collab.ValidateShapeID(t)) < 0)
//   ) {
//     var r = gListManager.InsertFrameContainer(t, !1, e.Data.group, e);
//     if (null != r && e.Data.CreateList) {
//       var i = [];
//       i.push(r),
//         Collab.AddToRemapList(e, e.Data.CreateList, i, 0)
//     }
//   }
// }

// Collab.InsertSwimlane = function (e) {
//   var t = gListManager.InsertSwimlane(
//     e.Data.swimlanetype,
//     e.Data.tabledim,
//     e.Data.tabledim2,
//     e,
//     e.Data.rotate
//   );
//   if (null != t && e.Data.CreateList) {
//     var a = [];
//     a.push(t),
//       Collab.AddToRemapList(e, e.Data.CreateList, a, 0)
//   }
// }

// Collab.GroupSelectedShapes = function (e) {
//   var t = gListManager.GroupSelectedShapes(!1, null, !1, !1, !1);
//   if (null != t && e.Data.CreateList) {
//     var a = [];
//     a.push(t),
//       Collab.AddToRemapList(e, e.Data.CreateList, a, 0)
//   }
// }

// Collab.UngroupSelectedShapes = function (e) {
//   Collab.CreateList = [],
//     Collab.ProcessCreateList = !0,
//     gListManager.UngroupSelectedShapes(),
//     e.Data.CreateList &&
//     Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//     Collab.ProcessCreateList = !1,
//     Collab.CreateList = []
// }

// Collab.LayerTabClick = function (e) {
//   Collab.CreateList = [],
//     Collab.ProcessCreateList = !0,
//     SDUI.Commands.MainController.Document.LayerTabClick(2, e),
//     e.Data.CreateList &&
//     Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//     Collab.ProcessCreateList = !1,
//     Collab.CreateList = []
// }

// Collab.Lock = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     (t = Collab.ValidateShapeID(t)) < 0 ||
//     gListManager.Lock(t, !0)
// }

// Collab.OpenShapeEdit = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     (t = Collab.ValidateShapeID(t)) < 0 ||
//     (
//       gListManager.OpenShapeEdit(t, e),
//       gListManager.CompleteOperation()
//     )
// }

// Collab.CloseShapeEdit = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     (t = Collab.ValidateShapeID(t)) < 0 ||
//     gListManager.CloseShapeEdit(!1, e, t)
// }

// Collab.Action_Shape = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   if (
//     a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     !((t = Collab.ValidateShapeID(t)) < 0)
//   ) {
//     var r = gListManager.actionStoredObjectId,
//       i = gListManager.actionTriggerId,
//       n = gListManager.actionTriggerData,
//       o = gListManager.theActionTable,
//       s = gListManager.rotateEndRotation,
//       l = gListManager.actionSvgObject,
//       S = Utils1.DeepCopy(gListManager.actionNewBBox),
//       c = gListManager.GetObjectPtr(t, !0),
//       u = c.GetTable(!0);
//     if (u) switch (
//       gListManager.theActionTable = Utils1.DeepCopy(u),
//       e.Data.ActionTriggerID
//     ) {
//         case ConstantData.ActionTriggerType.TABLE_ROW:
//           var p = gListManager.Table_GetRowAndSegment(e.Data.ActionData),
//             d = e.Data.Frame.height - c.Frame.height;
//           gListManager.Table_GrowRow(u, p.row, d, !1);
//           break;
//         case ConstantData.ActionTriggerType.TABLE_COL:
//           var D = gListManager.Table_GetColumnAndSegment(e.Data.ActionData);
//           c.objecttype === ConstantData.ObjectTypes.SD_OBJT_SWIMLANE_COLS &&
//             c.RotationAngle &&
//             D.column++;
//           var g = u.cols[D.column].x;
//           D.column > 0 &&
//             (g -= u.cols[D.column - 1].x);
//           var h = e.Data.ColumnWidth - g;
//           gListManager.Table_GrowColumn(c, u, D.column, h, c.TextGrow, !1, !1, !1, c.IsSwimlane())
//       }
//     switch (e.Data.ActionTriggerID) {
//       case ConstantData.ActionTriggerType.MOVEPOLYSEG:
//         e.Data.polylist &&
//           (c.polylist = Utils1.DeepCopy(e.Data.polylist)),
//           e.Data.VertexArray &&
//           (c.VertexArray = Utils1.DeepCopy(e.Data.VertexArray)),
//           c.tindent = Utils1.DeepCopy(e.Data.tindent),
//           c.left_sindent = e.Data.left_sindent,
//           c.right_sindent = e.Data.right_sindent,
//           c.top_sindent = e.Data.top_sindent,
//           c.bottom_sindent = e.Data.bottom_sindent;
//         break;
//       case ConstantData.ActionTriggerType.DIMENSION_LINE_ADJ:
//         c.DimensionLineDeflectionAdjust(
//           gListManager.actionSvgObject,
//           newX,
//           newY,
//           gListManager.actionTriggerId,
//           gListManager.actionTriggerData
//         )
//     }
//     if (
//       gListManager.actionStoredObjectId = e.Data.BlockID,
//       gListManager.actionTriggerId = e.Data.ActionTriggerID,
//       gListManager.actionTriggerData = e.Data.ActionData,
//       gListManager.rotateEndRotation = e.Data.rotateEndRotation,
//       gListManager.actionNewBBox = Utils1.DeepCopy(e.Data.Frame),
//       e.EditorID,
//       Collab.EditorID,
//       gListManager.actionSvgObject = gListManager.svgObjectLayer.GetElementByID(e.Data.BlockID),
//       null != e.Data.actionTableLastY &&
//       (gListManager.actionTableLastY = e.Data.actionTableLastY),
//       e.Data.ActionTriggerID === ConstantData.ActionTriggerType.DIMENSION_LINE_ADJ
//     ) c.dimensionDeflectionH = e.Data.dimensionDeflectionH,
//       c.dimensionDeflectionV = e.Data.dimensionDeflectionV;
//     c.HandleActionTriggerCallResize(e.Data.Frame, e.Data.ActionTriggerID, null, e.Data.Frame),
//       gListManager.AddToDirtyList(t),
//       c.LM_ActionRelease(null, e),
//       gListManager.actionStoredObjectId = r,
//       gListManager.actionTriggerId = i,
//       gListManager.actionTriggerData = n,
//       gListManager.theActionTable = o,
//       gListManager.rotateEndRotation = s,
//       gListManager.actionSvgObject = l,
//       gListManager.actionNewBBox = S
//   }
// }

// Collab.Action_Line = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   if (
//     a &&
//     (
//       t = Collab.GetRemappedID(a, t),
//       e.Data.BlockID = t,
//       e.Data.linkParams &&
//       (
//         e.Data.linkParams.ConnectIndex = Collab.GetRemappedID(a, e.Data.linkParams.ConnectIndex),
//         e.Data.linkParams.SConnectIndex = Collab.GetRemappedID(a, e.Data.linkParams.SConnectIndex),
//         e.Data.linkParams.JoinIndex = Collab.GetRemappedID(a, e.Data.linkParams.JoinIndex),
//         e.Data.linkParams.SJoinIndex = Collab.GetRemappedID(a, e.Data.linkParams.SJoinIndex)
//       )
//     ),
//     !((t = Collab.ValidateShapeID(t)) < 0)
//   ) {
//     e.Data.CreateList &&
//       (Collab.CreateList = [], Collab.ProcessCreateList = !0),
//       e.Data.linkParams &&
//       (
//         e.Data.linkParams.ConnectIndex = Collab.ValidateShapeID(e.Data.linkParams.ConnectIndex),
//         e.Data.linkParams.SConnectIndex = Collab.ValidateShapeID(e.Data.linkParams.SConnectIndex),
//         e.Data.linkParams.JoinIndex = Collab.ValidateShapeID(e.Data.linkParams.JoinIndex),
//         e.Data.linkParams.SJoinIndex = Collab.ValidateShapeID(e.Data.linkParams.SJoinIndex)
//       );
//     var r = gListManager.actionStoredObjectId,
//       i = gListManager.actionTriggerId,
//       n = gListManager.linkParams,
//       o = gListManager.ob,
//       s = gListManager.GetObjectPtr(t, !0),
//       l = gListManager.rotateStartRotation,
//       S = gListManager.rotateEndRotation,
//       c = gListManager.rotatePivotX,
//       u = gListManager.rotatePivotY,
//       p = gListManager.rotateStartPoint,
//       d = gListManager.actionTriggerData;
//     gListManager.rotateStartRotation = 0,
//       gListManager.rotateEndRotation = e.Data.rotateEndRotation,
//       gListManager.rotatePivotX = e.Data.rotatePivotX,
//       gListManager.rotatePivotY = e.Data.rotatePivotY,
//       gListManager.rotateStartPoint = e.Data.rotateStartPoint,
//       gListManager.actionStoredObjectId = e.Data.BlockID,
//       gListManager.actionTriggerId = e.Data.actionTriggerId,
//       gListManager.linkParams = e.Data.linkParams,
//       gListManager.actionTriggerData = {},
//       gListManager.actionTriggerData.hitSegment = e.Data.hitSegment,
//       gListManager.actionTriggerData.moveAngle = e.Data.moveAngle;
//     o = Utils1.DeepCopy(s);
//     if (
//       e.Data.ob &&
//       (
//         o.StartPoint = Utils1.DeepCopy(e.Data.ob.StartPoint),
//         o.EndPoint = Utils1.DeepCopy(e.Data.ob.EndPoint),
//         o.Frame = Utils1.DeepCopy(e.Data.ob.Frame),
//         o.CurveAdjust = e.Data.ob.CurveAdjust,
//         o.IsReversed = e.Data.ob.IsReversed
//       ),
//       gListManager.ob = o,
//       e.Data.actionTriggerId === ConstantData.ActionTriggerType.DIMENSION_LINE_ADJ
//     ) s.dimensionDeflectionH = e.Data.dimensionDeflectionH,
//       s.dimensionDeflectionV = e.Data.dimensionDeflectionV;
//     else s.StartPoint = Utils1.DeepCopy(e.Data.StartPoint),
//       s.EndPoint = Utils1.DeepCopy(e.Data.EndPoint),
//       s.Frame = Utils1.DeepCopy(e.Data.Frame),
//       null != e.Data.CurveAdjust &&
//       (
//         s.CurveAdjust = e.Data.CurveAdjust,
//         s.IsReversed = e.Data.IsReversed
//       ),
//       e.Data.segl &&
//       (s.segl = Utils1.DeepCopy(e.Data.segl)),
//       e.Data.polylist &&
//       (s.polylist = Utils1.DeepCopy(e.Data.polylist)),
//       e.Data.pointlist &&
//       (s.pointlist = Utils1.DeepCopy(e.Data.pointlist)),
//       s.CalcFrame();
//     gListManager.AddToDirtyList(t),
//       s.LM_ActionRelease(null, e),
//       e.Data.CreateList &&
//       e.Data.CreateList.length &&
//       Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//       Collab.ProcessCreateList = !1,
//       Collab.CreateList = [],
//       gListManager.rotateStartRotation = l,
//       gListManager.rotateEndRotation = S,
//       gListManager.rotatePivotX = c,
//       gListManager.rotatePivotY = u,
//       gListManager.rotateStartPoint = p,
//       gListManager.actionStoredObjectId = r,
//       gListManager.linkParams = n,
//       gListManager.actionTriggerId = i,
//       gListManager.actionTriggerData = d,
//       gListManager.ob = o
//   }
// }

// Collab.Action_Connector = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   if (
//     a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     !((t = Collab.ValidateShapeID(t)) < 0)
//   ) {
//     var r = gListManager.actionStoredObjectId,
//       i = gListManager.actionTriggerId,
//       n = gListManager.GetObjectPtr(t, !0);
//     gListManager.actionStoredObjectId = e.Data.BlockID,
//       gListManager.actionTriggerId = e.Data.actionTriggerId,
//       n.Frame = Utils1.DeepCopy(e.Data.Frame),
//       n.StartPoint = Utils1.DeepCopy(e.Data.StartPoint),
//       n.EndPoint = Utils1.DeepCopy(e.Data.EndPoint),
//       n.arraylist = Utils1.DeepCopy(e.Data.arraylist),
//       gListManager.AddToDirtyList(t),
//       n.LM_ActionRelease(null, e),
//       gListManager.actionStoredObjectId = r,
//       gListManager.actionTriggerId = i
//   }
// }

// Collab.MoveObjects = function (e) {
//   var t,
//     a;
//   t = e.Data.moveList.length;
//   var r = Collab.GetRemapList(e),
//     i = [];
//   if (r) for (a = 0; a < t; a++) e.Data.moveList[a] = Collab.GetRemappedID(r, e.Data.moveList[a]);
//   for (a = 0; a < t; a++) e.Data.moveList[a] = Collab.ValidateShapeID(e.Data.moveList[a]),
//     e.Data.moveList[a] >= 0 &&
//     i.push(e.Data.moveList[a]);
//   if (0 !== i.length) {
//     var n = gListManager.moveList,
//       o = gListManager.linkParams,
//       s = gListManager.dragTargetId;
//     if (
//       gListManager.moveList = i,
//       gListManager.linkParams = e.Data.linkParams,
//       gListManager.dragTargetId = i[0],
//       e.Data.MoveDuplicated &&
//       (Collab.NoRedrawFromSameEditor = !1),
//       e.Data.CreateList &&
//       (Collab.CreateList = [], Collab.ProcessCreateList = !0),
//       e.Data.linkParams.AutoHealID >= 0
//     ) {
//       var l = e.Data.linkParams.AutoHealID;
//       if (r) {
//         l = Collab.GetRemappedID(r, e.Data.linkParams.AutoHealID);
//         e.Data.linkParams.AutoHealID = l
//       }
//       var S = [];
//       if ((l = Collab.ValidateShapeID(l)) >= 0) {
//         var c = gListManager.GetObjectPtr(l, !1),
//           u = gListManager.HealLine(c, !1, S);
//         u >= 0 &&
//           (S.push(u), gListManager.DeleteObjects(S, !1))
//       }
//     }
//     gListManager.LM_MoveRelease(null, e),
//       gListManager.moveList = n,
//       gListManager.linkParams = o,
//       gListManager.dragTargetId = s,
//       e.Data.CreateList &&
//       e.Data.CreateList.length &&
//       Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//       Collab.ProcessCreateList = !1,
//       Collab.CreateList = []
//   }
// }

// Collab.DeleteObjects = function (e) {
//   var t,
//     a;
//   t = e.Data.listtodelete.length;
//   var r = Collab.GetRemapList(e),
//     i = [];
//   if (r) for (a = 0; a < t; a++) e.Data.listtodelete[a] = Collab.GetRemappedID(r, e.Data.listtodelete[a]);
//   for (a = 0; a < t; a++) e.Data.listtodelete[a] = Collab.ValidateShapeID(e.Data.listtodelete[a]),
//     e.Data.listtodelete[a] >= 0 &&
//     i.push(e.Data.listtodelete[a]);
//   gListManager.DeleteSelectedObjectsCommon(i, !1, e)
// }

// Collab.CreateSubProcess = function (e) {
//   Collab.IsPrimary() ? SDUI.BackplaneEditorMainController.BackplanePages.UI_CreateSubProcess(e) : e.IgnoreTest = !0
// }

// Collab.SubProcess_UpdateParent = function (e) {
//   var t,
//     a,
//     r;
//   t = e.Data.listtodelete.length;
//   var i = Collab.GetRemapList(e),
//     n = [],
//     o = [],
//     s = e.Data.BlockID;
//   if (
//     i &&
//     (s = Collab.GetRemappedID(i, s), e.Data.BlockID = s),
//     !((s = Collab.ValidateShapeID(s)) < 0)
//   ) {
//     if (i) for (a = 0; a < t; a++) e.Data.listtodelete[a] = Collab.GetRemappedID(i, e.Data.listtodelete[a]);
//     for (a = 0; a < t; a++) e.Data.listtodelete[a] = Collab.ValidateShapeID(e.Data.listtodelete[a]),
//       e.Data.listtodelete[a] >= 0 &&
//       n.push(e.Data.listtodelete[a]);
//     if (r = gListManager.GetObjectPtr(s, !0)) {
//       var l = r,
//         S = gListManager.SD_GetVisioTextChild(s);
//       S >= 0 &&
//         (l = gListManager.GetObjectPtr(S)),
//         l.HyperlinkText = '/#' + e.Data.pageName,
//         gListManager.AddToDirtyList(l.BlockID)
//     }
//     for (t = n.length, a = 0; a < t; a++) (r = gListManager.GetObjectPtr(n[a], !1)).IsSwimlane() &&
//       r.moreflags & ConstantData.ObjMoreFlags.SED_MF_Frame_Group &&
//       (
//         o[r.BlockID] = r.moreflags,
//         r.moreflags = Utils.SetFlag(
//           r.moreflags,
//           ConstantData.ObjMoreFlags.SED_MF_Frame_Group,
//           !1
//         )
//       );
//     for (
//       gListManager.DeleteSelectedObjectsCommon(n, !0, !0, !0),
//       a = 0;
//       a < t;
//       a++
//     ) null != o[a] &&
//       ((r = gListManager.GetObjectPtr(a, !1)).moreflags = o[a]);
//     gListManager.CompleteOperation()
//   }
// }

// Collab.Table_DeleteCellContent = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     (t = Collab.ValidateShapeID(t)) < 0 ||
//     gListManager.Table_DeleteCellContent(t, e.Data.dorow, !1, !1, e)
// }

// Collab.PolyLSetSegmentType = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     (t = Collab.ValidateShapeID(t)) < 0 ||
//     gListManager.PolyLSetSegmentType(t, e.Data.targetseg, e.Data.LineTypeStr)
// }

// Collab.Duplicate = function (e) {
//   var t = gListManager.DuplicateObjects(e.Data.fromMove, e);
//   Collab.AddToRemapList(e, e.Data.CreateList, t, 0),
//     e.Data.fromMove &&
//     Collab.IsSecondary() &&
//     (e.IgnoreTest = !0)
// }

// Collab.GanttAddTask = function (e) {
//   var t = gListManager.GanttAddTask(e.Data.milestone, !0);
//   if (null != t && e.Data.CreateList) {
//     var a = [];
//     a.push(t),
//       Collab.AddToRemapList(e, e.Data.CreateList, a, 0)
//   }
// }

// Collab.GanttAddDependency = function (e) {
//   Collab.ProcessCreateList = !0,
//     gListManager.GanttAddDependency(),
//     null != e.Data.CreateList &&
//     Collab.IsPrimary() &&
//     Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//     Collab.ProcessCreateList = !1,
//     Collab.CreateList = []
// }

// Collab.PasteObjects = function (e) {
//   var t = Collab.StringToBuffer(e.Data.ClipboardString);
//   gListManager.PastePoint = e.Data.pastepos;
//   var a = gListManager.PasteLM(t);
//   Collab.AddToRemapList(e, e.Data.CreateList, a, 0)
// }

// Collab.Table_PasteCellContent = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     (t = Collab.ValidateShapeID(t)) < 0 ||
//     gListManager.Table_PasteCellContent(t, e)
// }

// Collab.PolyLRemoveNodes = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     (t = Collab.ValidateShapeID(t)) < 0 ||
//     gListManager.PolyLRemoveNodes(t, e.Data.targetseg)
// }

// Collab.PolyLAddNode = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     (t = Collab.ValidateShapeID(t)) < 0 ||
//     gListManager.PolyLAddNode(t, e.Data.targetseg, e.Data.HitPt, !0)
// }

// Collab.PolyLSplit = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     (t = Collab.ValidateShapeID(t)) < 0 ||
//     (
//       e.Data.CreateList &&
//       (Collab.CreateList = [], Collab.ProcessCreateList = !0),
//       gListManager.PolyLSplit(t, e.Data.targetseg, e.Data.recursiveCall),
//       e.Data.CreateList &&
//       e.Data.CreateList.length &&
//       Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//       Collab.ProcessCreateList = !1,
//       Collab.CreateList = []
//     )
// }

// Collab.Table_DeleteRows = function (e) {
//   var t = e.Data.BlockID;
//   if (null != t) {
//     var a = Collab.GetRemapList(e);
//     if (
//       a &&
//       (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//       (t = Collab.ValidateShapeID(t)) < 0
//     ) return
//   }
//   gListManager.Table_DeleteRows(t)
// }

// Collab.Table_DeleteColumns = function (e) {
//   var t = e.Data.BlockID;
//   if (null != t) {
//     var a = Collab.GetRemapList(e);
//     if (
//       a &&
//       (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//       (t = Collab.ValidateShapeID(t)) < 0
//     ) return
//   }
//   gListManager.Table_DeleteColumns(t)
// }

// Collab.Table_InsertRows = function (e) {
//   var t = e.Data.BlockID;
//   if (null != t) {
//     var a = Collab.GetRemapList(e);
//     if (
//       a &&
//       (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//       (t = Collab.ValidateShapeID(t)) < 0
//     ) return
//   }
//   gListManager.Table_InsertRows(e.Data.above, t, e.Data.addrowheader, !1)
// }

// Collab.Table_InsertColumns = function (e) {
//   var t = e.Data.BlockID;
//   if (null != t) {
//     var a = Collab.GetRemapList(e);
//     if (
//       a &&
//       (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//       (t = Collab.ValidateShapeID(t)) < 0
//     ) return
//   }
//   gListManager.Table_InsertColumns(e.Data.left, t, e.Data.addcolheader, !1)
// }

// Collab.Table_InsertDeleteGroupCols = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     (t = Collab.ValidateShapeID(t)) < 0 ||
//     (
//       e.Data.CreateList &&
//       (Collab.CreateList = [], Collab.ProcessCreateList = !0),
//       gListManager.Table_InsertDeleteGroupCols(e.Data.left, t, e.Data.insert, !1),
//       e.Data.CreateList &&
//       e.Data.CreateList.length &&
//       Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//       Collab.ProcessCreateList = !1,
//       Collab.CreateList = []
//     )
// }

// Collab.Table_InsertDeleteGroupRows = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     (t = Collab.ValidateShapeID(t)) < 0 ||
//     (
//       e.Data.CreateList &&
//       (Collab.CreateList = [], Collab.ProcessCreateList = !0),
//       gListManager.Table_InsertDeleteGroupRows(e.Data.above, t, e.Data.insert, !1),
//       e.Data.CreateList &&
//       e.Data.CreateList.length &&
//       Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//       Collab.ProcessCreateList = !1,
//       Collab.CreateList = []
//     )
// }

// Collab.HandleIconClick = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   if (
//     a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     !((t = Collab.ValidateShapeID(t)) < 0)
//   ) {
//     var r = gListManager.GetObjectPtr(t, !1),
//       i = r.GetTable(!1);
//     if (r && i) 0 != gUIElementManager.HandleIconClick(r, i, e.Data.cellindex, null) &&
//       (e.EditorID, Collab.EditorID),
//       gListManager.AddToDirtyList(t),
//       gListManager.CompleteOperation()
//   }
// }

// Collab.AddCorner = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   (
//     a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     (t = Collab.ValidateShapeID(t)) < 0
//   ) ||
//     (
//       Collab.CreateList = [],
//       Collab.ProcessCreateList = !0,
//       gListManager.GetObjectPtr(t, !0).AddCorner(null, e.Data.point),
//       e.Data.CreateList &&
//       e.Data.CreateList.length &&
//       Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//       Collab.ProcessCreateList = !1,
//       Collab.CreateList = []
//     )
// }

// Collab.SD_GanttExpandContract = function (e) {
//   var t = gListManager.GetObjectPtr(e.Data.ganttID, !1);
//   if (t) {
//     var a = t.IsNoteCell(e.Data.userData);
//     gListManager.SD_GanttExpandContract(e.Data.ganttID, a, e.Data.expand, e.Data.userData)
//   }
// }

// Collab.Dialog_Options = function (e) {
//   var t = gListManager.GetObjectPtr(gListManager.sedSessionBlockId, !0);
//   t.flags = Utils.SetFlag(
//     t.flags,
//     ListManager.SessionFlags.SEDS_LLink,
//     (e.Data.flags & ListManager.SessionFlags.SEDS_LLink) > 0
//   ),
//     t.flags = Utils.SetFlag(
//       t.flags,
//       ListManager.SessionFlags.SEDS_AttLink,
//       (e.Data.flags & ListManager.SessionFlags.SEDS_AttLink) > 0
//     ),
//     t.flags = Utils.SetFlag(
//       t.flags,
//       ListManager.SessionFlags.SEDS_FreeHand,
//       (e.Data.flags & ListManager.SessionFlags.SEDS_FreeHand) > 0
//     ),
//     gListManager.CompleteOperation()
// }

// Collab.FieldedDataImportFromFile = function (e) {
//   var t = ListManager.SDData.FieldedDataImportFromCSV(e.Data.name, e.Data.TextStr);
//   t.tableID &&
//     (
//       null != e.Data.DataTableID &&
//       Collab.AddToDataRemapList(e.EditorID, e.Data.DataTableID, t.tableID),
//       ListManager.SDData.SetFieldedDataSetting(
//         t.tableID,
//         ListManager.SDData.FieldedDataTableSettings.SOURCETYPE,
//         ListManager.SDData.FieldedDataSourceTypes.FILE
//       ),
//       SDUI.Commands.MainController.DataPanel.UpdateData(!0)
//     )
// }

// Collab.FieldedDataImportFromURL = function (e) {
//   var t = ListManager.SDData.FieldedDataImportFromCSV(e.Data.name, e.Data.data);
//   t.tableID &&
//     (
//       null != e.Data.DataTableID &&
//       Collab.AddToDataRemapList(e.EditorID, e.Data.DataTableID, t.tableID),
//       ListManager.SDData.SetFieldedDataSetting(
//         t.tableID,
//         ListManager.SDData.FieldedDataTableSettings.SOURCETYPE,
//         ListManager.SDData.FieldedDataSourceTypes.WEB
//       ),
//       ListManager.SDData.SetFieldedDataSetting(
//         t.tableID,
//         ListManager.SDData.FieldedDataTableSettings.SOURCEINFO,
//         e.Data.srcInfo
//       ),
//       ListManager.SDData.SetFieldedDataAutoUpdate(t.tableID, e.Data.autoUpdate),
//       ListManager.SDData.SetFieldedDataOption(
//         t.tableID,
//         ListManager.SDData.FieldedDataOptions.NeedProxy,
//         e.Data.needProxy
//       ),
//       SDUI.Commands.MainController.DataPanel.UpdateData(!0)
//     )
// }

// Collab.FieldedDataUpdateFromFile = function (e) {
//   var t = e.Data.TableID;
//   t >= 0 &&
//     (t = Collab.GetRemappedDataTableID(e, t)),
//     t < 0 ||
//     (
//       ListManager.SDData.FieldedDataUpdateFromCSV(e.Data.TextStr, t, e.Data.matchFieldID),
//       ListManager.SDData.SetFieldedDataSetting(
//         t,
//         ListManager.SDData.FieldedDataTableSettings.SOURCETYPE,
//         ListManager.SDData.FieldedDataSourceTypes.FILE
//       ),
//       ListManager.SDData.SetFieldedDataSetting(
//         t,
//         ListManager.SDData.FieldedDataTableSettings.SOURCEINFO,
//         ''
//       ),
//       ListManager.SDData.SetFieldedDataAutoUpdate(t, !1),
//       SDUI.Commands.MainController.DataPanel.UpdateData(!0)
//     )
// }

// Collab.FieldedDataUpdateFromURL = function (e) {
//   var t = e.Data.TableID;
//   t >= 0 &&
//     (t = Collab.GetRemappedDataTableID(e, t)),
//     t < 0 ||
//     (
//       ListManager.SDData.FieldedDataUpdateFromCSV(e.Data.data, t, e.Data.matchFieldID),
//       ListManager.SDData.SetFieldedDataSetting(
//         t,
//         ListManager.SDData.FieldedDataTableSettings.SOURCETYPE,
//         ListManager.SDData.FieldedDataSourceTypes.WEB
//       ),
//       ListManager.SDData.SetFieldedDataSetting(
//         t,
//         ListManager.SDData.FieldedDataTableSettings.SOURCEINFO,
//         e.Data.srcInfo
//       ),
//       ListManager.SDData.SetFieldedDataAutoUpdate(t, e.Data.autoUpdate),
//       SDUI.Commands.MainController.DataPanel.UpdateData(!0)
//     )
// }

// Collab.DataFieldDeleteTable = function (e) {
//   var t = e.Data.TableID;
//   t >= 0 &&
//     (t = Collab.GetRemappedDataTableID(e, t)),
//     t >= 0 &&
//     (
//       ListManager.SDData.DeleteFieldedDataTable(t),
//       gListManager.ClearShapesFieldData(t),
//       SDUI.Commands.MainController.DataPanel.UpdateData(!0)
//     )
// }

// Collab.CMD_NewDataTable = function (e) {
//   var t = ListManager.SDData.NewFieldedDataTable(e.Data.name);
//   ListManager.SDData.FieldedDataAddColumn(t, Resources.Strings.NewFieldName + '1', 'string'),
//     null != e.Data.DataTableID &&
//     Collab.AddToDataRemapList(e.EditorID, e.Data.DataTableID, t),
//     SDUI.Commands.MainController.DataPanel.UpdateData(!0)
// }

// Collab.CMD_DataFieldAdd = function (e) {
//   var t = e.Data.TableID;
//   t >= 0 &&
//     (t = Collab.GetRemappedDataTableID(e, t)),
//     t < 0 ||
//     (
//       ListManager.SDData.FieldedDataAddColumn(t, e.Data.fieldName, e.Data.fieldType),
//       SDUI.Commands.MainController.DataPanel.UpdateData(!0)
//     )
// }

// Collab.CMD_DataFieldLabelChange = function (e) {
//   var t = e.Data.TableID;
//   t >= 0 &&
//     (t = Collab.GetRemappedDataTableID(e, t)),
//     t < 0 ||
//     (
//       ListManager.SDData.FieldedDataSetFieldName(t, e.Data.fieldID, e.Data.fieldName),
//       SDUI.Commands.MainController.DataPanel.UpdateData(!0)
//     )
// }

// Collab.CMD_DataFieldTypeSelect = function (e) {
//   var t = e.Data.TableID;
//   t >= 0 &&
//     (t = Collab.GetRemappedDataTableID(e, t)),
//     t < 0 ||
//     (
//       ListManager.SDData.FieldedDataSetFieldType(t, e.Data.fieldID, e.Data.fieldType),
//       gListManager.UpdateShapeTextWithFieldData(t),
//       SDUI.Commands.MainController.DataPanel.UpdateData(!0)
//     )
// }

// Collab.CMD_DataFieldMoveUp = function (e) {
//   var t = e.Data.TableID;
//   t >= 0 &&
//     (t = Collab.GetRemappedDataTableID(e, t)),
//     t < 0 ||
//     (
//       ListManager.SDData.FieldedDataUpdateFieldOrder(t, e.Data.fieldID, e.Data.fieldOrder),
//       SDUI.Commands.MainController.DataPanel.UpdateData(!0)
//     )
// }

// Collab.CMD_DataFieldMoveDown = function (e) {
//   var t = e.Data.TableID;
//   t >= 0 &&
//     (t = Collab.GetRemappedDataTableID(e, t)),
//     t < 0 ||
//     (
//       ListManager.SDData.FieldedDataUpdateFieldOrder(t, e.Data.fieldID, e.Data.fieldOrder),
//       SDUI.Commands.MainController.DataPanel.UpdateData(!0)
//     )
// }

// Collab.FieldedDataSetFieldPresetList = function (e) {
//   var t = e.Data.TableID;
//   t >= 0 &&
//     (t = Collab.GetRemappedDataTableID(e, t)),
//     t < 0 ||
//     (
//       ListManager.SDData.FieldedDataSetFieldPresetList(t, e.Data.fieldID, e.Data.presets, e.Data.noManualInput),
//       SDUI.Commands.MainController.DataPanel.UpdateData(!0)
//     )
// }

// Collab.FieldedDataClearFieldPresetList = function (e) {
//   var t = e.Data.TableID;
//   t >= 0 &&
//     (t = Collab.GetRemappedDataTableID(e, t)),
//     t < 0 ||
//     (
//       ListManager.SDData.FieldedDataClearFieldPresetList(t, e.Data.fieldID),
//       SDUI.Commands.MainController.DataPanel.UpdateData(!0)
//     )
// }

// Collab.CMD_DataFieldRenameTable = function (e) {
//   var t = e.Data.TableID;
//   t >= 0 &&
//     (t = Collab.GetRemappedDataTableID(e, t)),
//     t < 0 ||
//     (
//       ListManager.SDData.RenameFieldedDataTable(t, e.Data.name),
//       SDUI.Commands.MainController.DataPanel.UpdateData(!0)
//     )
// }

// Collab.CMD_DataFieldDelete = function (e) {
//   var t = e.Data.TableID;
//   t >= 0 &&
//     (t = Collab.GetRemappedDataTableID(e, t)),
//     t < 0 ||
//     (
//       SDUI.Commands.MainController.DataPanel._curTableID === t &&
//       SDUI.Commands.MainController.SmartPanels.GetLeftPanelMode() === Resources.LeftPanelMode.LEFTPANELMODE_DATA &&
//       SDUI.Commands.MainController.DataPanel.ProcessActiveEdit(),
//       ListManager.SDData.FieldedDataDelColumn(t, e.Data.fieldID),
//       SDUI.Commands.MainController.DataPanel._curTableID === t &&
//       SDUI.Commands.MainController.DataPanel._curFieldSelect--,
//       gListManager.UpdateShapeTextWithFieldData(t),
//       SDUI.Commands.MainController.DataPanel.UpdateData(!0)
//     )
// }

// Collab.CMD_HandleDataChange = function (e) {
//   var t = e.Data.TableID;
//   if (t >= 0 && (t = Collab.GetRemappedDataTableID(e, t)), !(t < 0)) {
//     if (a >= 0) {
//       var a = e.Data.BlockID,
//         r = Collab.GetRemapList(e);
//       if (
//         r &&
//         (a = Collab.GetRemappedID(r, a), e.Data.BlockID = a),
//         (a = Collab.ValidateShapeID(a)) < 0
//       ) return
//     }
//     SDUI.Commands.MainController.DataPanel.CMD_HandleDataChange(
//       a,
//       e.Data.fieldID,
//       e.Data.dataType,
//       e.Data.value,
//       t,
//       e.Data.RecordID,
//       !0
//     ),
//       e.EditorID !== Collab.EditorID &&
//       gListManager.UpdateTooltipFromMessage(a, e.Data.fieldID, e.Data.dataType, e.Data.value)
//   }
// }

// Collab.HandleDataRecordAdd = function (e) {
//   var t = e.Data.TableID;
//   if (t >= 0 && (t = Collab.GetRemappedDataTableID(e, t)), !(t < 0)) {
//     var a = e.Data.BlockID;
//     if (a >= 0) {
//       var r = Collab.GetRemapList(e);
//       if (
//         r &&
//         (a = Collab.GetRemappedID(r, a), e.Data.BlockID = a),
//         (a = Collab.ValidateShapeID(a)) < 0
//       ) return
//     }
//     SDUI.Commands.MainController.DataPanel.HandleDataRecordAdd(a, t, !0)
//   }
// }

// Collab.UpdateFieldedDataTooltipItem = function (e) {
//   var t = e.Data.TableID;
//   if (t >= 0 && (t = Collab.GetRemappedDataTableID(e, t)), !(t < 0)) {
//     var a = e.Data.BlockID,
//       r = Collab.GetRemapList(e);
//     r &&
//       (a = Collab.GetRemappedID(r, a), e.Data.BlockID = a),
//       (a = Collab.ValidateShapeID(a)) < 0 ||
//       (
//         gListManager.UpdateFieldedDataTooltipItem(a, e.Data.fieldID, e.Data.dataType, e.Data.value, !0),
//         SDUI.Commands.MainController.DataPanel.UpdateData(!0)
//       )
//   }
// }

// Collab.AddDataRule = function (e) {
//   var t = e.Data.TableID;
//   if (t >= 0 && (t = Collab.GetRemappedDataTableID(e, t)), !(t < 0)) {
//     var a = e.Data.BlockID;
//     if (a > 0) {
//       var r = Collab.GetRemapList(e);
//       if (
//         r &&
//         (a = Collab.GetRemappedID(r, a), e.Data.BlockID = a),
//         (a = Collab.ValidateShapeID(a)) < 0
//       ) return
//     }
//     SDUI.Commands.MainController.DataPanel.AddDataRule(
//       e.Data.ruleName,
//       e.Data.ruleRec,
//       e.Data.addToShape,
//       t,
//       e.Data.tableRow,
//       a
//     )
//   }
// }

// Collab.UpdateDataRule = function (e) {
//   var t = e.Data.TableID;
//   t >= 0 &&
//     (t = Collab.GetRemappedDataTableID(e, t)),
//     t < 0 ||
//     SDUI.Commands.MainController.DataPanel.UpdateDataRule(e.Data.ruleID, e.Data.ruleName, e.Data.ruleRec, t)
// }

// Collab.DeleteDataRule = function (e) {
//   var t = e.Data.TableID;
//   t >= 0 &&
//     (t = Collab.GetRemappedDataTableID(e, t)),
//     t < 0 ||
//     SDUI.Commands.MainController.DataPanel.DeleteDataRule(e.Data.ruleID, t)
// }

// Collab.CMD_SelectDataRule = function (e) {
//   var t = e.Data.TableID;
//   if (t >= 0 && (t = Collab.GetRemappedDataTableID(e, t)), !(t < 0)) {
//     var a = e.Data.BlockID;
//     if (a > 0) {
//       var r = Collab.GetRemapList(e);
//       if (
//         r &&
//         (a = Collab.GetRemappedID(r, a), e.Data.BlockID = a),
//         (a = Collab.ValidateShapeID(a)) < 0
//       ) return
//     }
//     SDUI.Commands.MainController.DataPanel.ToggleDataRule(e.Data.ruleID, t, e.Data.tableRow, a, !1)
//   }
// }

// Collab.HandleDataDrop = function (e) {
//   var t = e.Data.TableID;
//   if (t >= 0 && (t = Collab.GetRemappedDataTableID(e, t)), !(t < 0)) {
//     var a = e.Data.BlockID;
//     if (a > 0) {
//       var r = Collab.GetRemapList(e);
//       if (
//         r &&
//         (a = Collab.GetRemappedID(r, a), e.Data.BlockID = a),
//         (a = Collab.ValidateShapeID(a)) < 0
//       ) return
//     }
//     SDUI.Commands.MainController.DataPanel.HandleDataDrop(a, null, !0, t, e.Data.rowID)
//   }
// }

// Collab.AttachRowToShape = function (e) {
//   var t = e.Data.TableID;
//   if (t >= 0 && (t = Collab.GetRemappedDataTableID(e, t)), !(t < 0)) {
//     var a = e.Data.BlockID,
//       r = Collab.GetRemapList(e);
//     if (
//       r &&
//       (a = Collab.GetRemappedID(r, a), e.Data.BlockID = a),
//       !((a = Collab.ValidateShapeID(a)) < 0)
//     ) gListManager.GetObjectPtr(a, !0).SetFieldDataRecord(t, e.Data.tableRow),
//       SDUI.Commands.MainController.DataPanel.UpdateData(!0)
//   }
// }

// Collab.CMD_DataFieldUnlinkShape = function (e) {
//   var t = e.Data.TableID;
//   if (t >= 0 && (t = Collab.GetRemappedDataTableID(e, t)), !(t < 0)) {
//     var a = e.Data.BlockID,
//       r = Collab.GetRemapList(e);
//     if (
//       r &&
//       (a = Collab.GetRemappedID(r, a), e.Data.BlockID = a),
//       !((a = Collab.ValidateShapeID(a)) < 0)
//     ) {
//       var i = gListManager.GetObjectPtr(a, !0);
//       i.RemoveFieldData(!1),
//         i.RefreshFromFieldData(),
//         SDUI.Commands.MainController.DataPanel.UpdateData(!0)
//     }
//   }
// }

// Collab.CMD_DataFieldDeleteData_NoShape = function (e) {
//   var t = e.Data.TableID;
//   t >= 0 &&
//     (t = Collab.GetRemappedDataTableID(e, t)),
//     t < 0 ||
//     (
//       ListManager.SDData.FieldedDataDelRecord(t, e.Data.tableRow),
//       SDUI.Commands.MainController.DataPanel.UpdateData(!0)
//     )
// }

// Collab.CMD_DataFieldDeleteData = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   if (
//     a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     !((t = Collab.ValidateShapeID(t)) < 0)
//   ) {
//     var r = gListManager.GetObjectPtr(t, !0);
//     r.RemoveFieldData(!0),
//       r.RefreshFromFieldData(),
//       SDUI.Commands.MainController.DataPanel.UpdateData(!0)
//   }
// }

// Collab.NudgeSelectedObjects = function (e) {
//   var t = gListManager.nudgeOpen,
//     a = gListManager.nudgeX,
//     r = gListManager.nudgeY,
//     i = gListManager.nudgeGrowX,
//     n = gListManager.nudgeGrowY;
//   0 === e.Data.growX &&
//     0 === e.Data.growY ||
//     gListManager.NudgeSelectedObjects(e.Data.growX, e.Data.growY, !0),
//     0 === e.Data.deltaX &&
//     0 === e.Data.deltaY ||
//     gListManager.NudgeSelectedObjects(e.Data.deltaX, e.Data.deltaY, !1),
//     gListManager.nudgeOpen = t,
//     gListManager.nudgeX = a,
//     gListManager.nudgeY = r,
//     gListManager.nudgeGrowX = i,
//     gListManager.nudgeGrowY = n,
//     gListManager.CompleteOperation()
// }

// Collab.ClearImage = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     (t = Collab.ValidateShapeID(t)) < 0 ||
//     gListManager.ClearImage(t, !0, !1, !1, null)
// }

// Collab.SetShapeMoreFlags = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     (t = Collab.ValidateShapeID(t)) < 0 ||
//     gListManager.SetShapeMoreFlags(t, e.Data.flag, e.Data.value)
// }

// Collab.Table_ImportPicture = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   if (
//     a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     !((t = Collab.ValidateShapeID(t)) < 0)
//   ) {
//     var r = Collab.StringToBuffer(e.Data.bytes),
//       i = new Uint8Array(r),
//       n = FileParser.GetImageBlobType(e.Data.ImageDir),
//       o = gListManager.MakeURL(i, null, n);
//     Result = {
//       index: 0
//     };
//     var s = gListManager.GetObjectPtr(t, !1);
//     if (s) {
//       var l = s.GetTable(!1);
//       gListManager.Table_GetCellWithID(l, e.Data.uniqueid, Result) &&
//         gListManager.Table_ImportPicture(t, o, e.Data.ImageDir, i, e.Data.SVGDim, Result.index)
//     }
//   }
// }

// Collab.OrgAddPicture = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   if (
//     a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     (t = Collab.ValidateShapeID(t)) < 0
//   ) return;
//   var r = Collab.StringToBuffer(e.Data.bytes);
//   let i = new Uint8Array(r);
//   var n = FileParser.GetImageBlobType(e.Data.ImageDir),
//     o = gListManager.MakeURL(i, null, n);
//   e.Data.url = o,
//     e.Data.blob = new Blob(i, {
//       type: n
//     }),
//     e.Data.Bytes = i,
//     gOrgChartManager.AddPicture(null, t, e)
// }

// Collab.Shape_ImportPicture = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   if (
//     a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     !((t = Collab.ValidateShapeID(t)) < 0)
//   ) {
//     var r = Collab.StringToBuffer(e.Data.bytes),
//       i = new Uint8Array(r),
//       n = FileParser.GetImageBlobType(e.Data.ImageDir),
//       o = gListManager.MakeURL(i, null, n);
//     e.Data.url = o,
//       e.Data.blob = new Blob(i, {
//         type: n
//       }),
//       e.Data.Bytes = i,
//       gListManager.SetBackgroundImage(null, !1, e)
//   }
// }

// Collab.AddShape_ImportPicture = function (e) {
//   Collab.CreateList = [],
//     Collab.ProcessCreateList = !0;
//   var t = Collab.StringToBuffer(e.Data.bytes),
//     a = new Uint8Array(t),
//     r = FileParser.GetImageBlobType(e.Data.ImageDir),
//     i = gListManager.MakeURL(a, null, r);
//   e.Data.url = i,
//     e.Data.blob = new Blob(a, {
//       type: r
//     }),
//     e.Data.Bytes = a,
//     e.Data.background ? gListManager.ImportBackgroundLayerImage(null, e) : gListManager.SetBackgroundImage(null, !1, e),
//     e.Data.CreateList &&
//     e.Data.CreateList.length &&
//     Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//     Collab.ProcessCreateList = !1,
//     Collab.CreateList = []
// }

// Collab.InsertGraph = function (e) {
//   e.Data.Graph &&
//     (
//       e.Data.Graph.ImportDataTableID = Collab.GetRemappedDataTableID(e, e.Data.Graph.ImportDataTableID)
//     ),
//     Collab.ProcessCreateList = !0;
//   var t = new ListManager.Rect(e.Data.attributes),
//     a = gListManager.AddNewObject(t, !0, !0),
//     r = gListManager.GetObjectPtr(a, !0),
//     i = Resources.FindStyle(ConstantData.Defines.D3Style);
//   i &&
//     (r.StyleRecord = Utils1.DeepCopy(i)),
//     gListManager.AddGraphToShape(r, null, e.Data.Graph),
//     gListManager.CompleteOperation(),
//     null != e.Data.CreateList &&
//     Collab.IsPrimary() &&
//     Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//     Collab.ProcessCreateList = !1,
//     Collab.CreateList = []
// }

// Collab.ContainerDoubleClick = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   (
//     a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     (t = Collab.ValidateShapeID(t)) < 0
//   ) ||
//     (
//       Collab.ProcessCreateList = !0,
//       gListManager.GetObjectPtr(t, !0).DoubleClick(null, e),
//       null != e.Data.CreateList &&
//       Collab.IsPrimary() &&
//       Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//       Collab.ProcessCreateList = !1,
//       Collab.CreateList = []
//     )
// }

// Collab.UpdateDimensionFromTextObj = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   (
//     a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     (t = Collab.ValidateShapeID(t)) < 0
//   ) ||
//     gListManager.GetObjectPtr(t, !1).UpdateDimensionFromTextObj(null, e.Data)
// }

// Collab.InsertGauge = function (e) {
//   Collab.ProcessCreateList = !0;
//   var t = new ListManager.Rect(e.Data.attributes),
//     a = gListManager.AddNewObject(t, !0, !0),
//     r = gListManager.GetObjectPtr(a, !0);
//   gListManager.AddGaugeToShape(r, {
//   }, e.Data.Gauge),
//     gListManager.CompleteOperation(),
//     null != e.Data.CreateList &&
//     Collab.IsPrimary() &&
//     Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//     Collab.ProcessCreateList = !1,
//     Collab.CreateList = []
// }

// Collab.InsertTable = function (e) {
//   Collab.ProcessCreateList = !0;
//   var t = gListManager.GetObjectPtr(gListManager.sedSessionBlockId, !1),
//     a = t.def.style;
//   t.def.style = e.Data.StyleRecord,
//     gListManager.InsertTable(!1, e.Data.nrows, e.Data.ncols),
//     null != e.Data.CreateList &&
//     Collab.IsPrimary() &&
//     Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//     t.def.style = a,
//     Collab.ProcessCreateList = !1,
//     Collab.CreateList = []
// }

// Collab.Edit_Note = function (e) {
//   var t,
//     a = e.Data.BlockID,
//     r = Collab.GetRemapList(e),
//     i = null;
//   if (
//     r &&
//     (a = Collab.GetRemappedID(r, a), e.Data.BlockID = a),
//     !((a = Collab.ValidateShapeID(a)) < 0)
//   ) {
//     var n = gListManager.GetObjectPtr(a, !1);
//     if (t = n, e.Data.CellID >= 0 && n) {
//       var o = n.GetTable(!1);
//       if (o) {
//         if (null == (i = gListManager.Table_GetCellWithID(o, e.Data.CellID))) return;
//         t = i
//       }
//     }
//     var s = gListManager.GetObjectPtr(t.NoteID, !0),
//       l = '' === e.Data.runtimeText.text;
//     if (
//       (t.NoteID < 0 || null == s) &&
//       !l &&
//       gListManager.AddObjectNote(n, i, !0),
//       t.NoteID >= 0
//     ) {
//       if (o = (n = gListManager.GetObjectPtr(a, !0)).GetTable(!0), l) {
//         var S = T3Gv.objectStore.GetObject(t.NoteID);
//         t.NoteID = - 1,
//           S &&
//           S.Delete()
//       } else (s = gListManager.GetObjectPtr(t.NoteID, !0)).runtimeText = e.Data.runtimeText;
//       gListManager.AddToDirtyList(a),
//         gListManager.CompleteOperation()
//     }
//   }
// }

// Collab.Comment_Add = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e),
//     r = '';
//   if (
//     a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     !((t = Collab.ValidateShapeID(t)) < 0)
//   ) {
//     var i = gListManager.GetObjectPtr(t, !1),
//       n = SDUI.Commands.MainController.Dropdowns.IsDropdownVisible(Resources.Controls.Dropdowns.CommentPopup.Id) &&
//         ConstantData.CommentParams.CommentID === i.CommentID;
//     n &&
//       (r = ConstantData.CommentParams.DropDownTextArea[0].value);
//     var o = ConstantData.CommentParams.CommentID;
//     ConstantData.CommentParams.CommentID = i.CommentID,
//       gListManager.CommentEnter(e.Data.comment, !1, t, !n, e),
//       ConstantData.CommentParams.CommentID = o,
//       n &&
//       (ConstantData.CommentParams.DropDownTextArea[0].value = r)
//   }
// }

// Collab.FormatPainter = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   if (
//     a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     !((t = Collab.ValidateShapeID(t)) < 0)
//   ) {
//     var r = gListManager.formatPainterMode,
//       i = gListManager.formatPainterText,
//       n = gListManager.formatPainterStyle,
//       o = gListManager.formatPainterParaFormat,
//       s = gListManager.formatPainterArrows,
//       l = gListManager.formatPainterSticky;
//     gListManager.formatPainterMode = e.Data.formatPainterMode,
//       gListManager.formatPainterText = e.Data.formatPainterText,
//       gListManager.formatPainterStyle = e.Data.formatPainterStyle,
//       gListManager.formatPainterParaFormat = e.Data.formatPainterParaFormat,
//       gListManager.formatPainterArrows = e.Data.formatPainterArrows,
//       gListManager.formatPainterSticky = !1,
//       gListManager.FormatPainterClick(t, null, e),
//       gListManager.formatPainterMode = r,
//       gListManager.formatPainterText = i,
//       gListManager.formatPainterStyle = n,
//       gListManager.formatPainterParaFormat = o,
//       gListManager.formatPainterArrows = s,
//       gListManager.formatPainterSticky = l
//   }
// }

// Collab.Table_PasteFormat = function (e) {
//   var t = e.Data.BlockID,
//     a = Collab.GetRemapList(e);
//   if (
//     a &&
//     (t = Collab.GetRemappedID(a, t), e.Data.BlockID = t),
//     !((t = Collab.ValidateShapeID(t)) < 0)
//   ) {
//     var r = gListManager.formatPainterMode,
//       i = gListManager.formatPainterText,
//       n = gListManager.formatPainterStyle,
//       o = gListManager.formatPainterParaFormat,
//       s = gListManager.formatPainterSticky;
//     gListManager.formatPainterMode = e.Data.formatPainterMode,
//       gListManager.formatPainterText = e.Data.formatPainterText,
//       gListManager.formatPainterStyle = e.Data.formatPainterStyle,
//       gListManager.formatPainterParaFormat = e.Data.formatPainterParaFormat,
//       gListManager.formatPainterArrows = e.Data.formatPainterArrows,
//       gListManager.formatPainterSticky = !1,
//       gListManager.Table_PasteFormat(t, gListManager.formatPainterStyle, !0),
//       gListManager.formatPainterMode = r,
//       gListManager.formatPainterText = i,
//       gListManager.formatPainterStyle = n,
//       gListManager.formatPainterParaFormat = o,
//       gListManager.formatPainterSticky = s
//   }
// }

// Collab.Text_Init = function (e) {
//   if (e.Data.BlockID >= 0) {
//     var t = Collab.GetRemapList(e);
//     t &&
//       (e.Data.BlockID = Collab.GetRemappedID(t, e.Data.BlockID));
//     var a = gListManager.ActiveVisibleZList();
//     if (
//       e.Data.BlockID = Collab.ValidateEditID(e.Data.BlockID, a, !0),
//       e.Data.BlockID < 0
//     ) return;
//     var r = gListManager.GetObjectPtr(e.Data.BlockID, !1);
//     if (null != e.Data.TableSelect) {
//       var i,
//         n = (
//           i = e.EditorID === Collab.EditorID ? r.GetTable(!1) : r.GetTable(!0)
//         ).select,
//         o = null,
//         s = {};
//       e.Data.TableSelect >= 0 &&
//         (o = gListManager.Table_GetCellWithID(i, e.Data.TableSelect, s)),
//         i.select = null == o ? e.Data.TableSelect : s.index;
//       var l = r.DataID
//     } else if (r && r instanceof Connector) {
//       l = r.DataID;
//       var S = r.arraylist.lasttexthook,
//         c = Utils1.DeepCopy(r.trect)
//     }
//     var u = gListManager.svgObjectLayer.GetElementByID(e.Data.BlockID);
//     if (
//       u &&
//       gListManager.ActivateTextEdit(u, null, null, e),
//       null != e.Data.TableSelect
//     ) {
//       if (e.EditorID === Collab.EditorID) return !0;
//       i.select = n,
//         r.DataID = l
//     } else r &&
//       r instanceof Connector &&
//       e.EditorID !== Collab.EditorID &&
//       (
//         r.DataID = l,
//         r.arraylist.lasttexthook = S,
//         r.trect = Utils1.DeepCopy(c)
//       );
//     return !1
//   }
// }

// Collab.Text_Edit = function (e, t) {
//   if (e.Data.BlockID >= 0) {
//     var a = Collab.GetRemapList(e);
//     a &&
//       (e.Data.BlockID = Collab.GetRemappedID(a, e.Data.BlockID));
//     var r = gListManager.ActiveVisibleZList();
//     if (
//       e.Data.BlockID = Collab.ValidateEditID(e.Data.BlockID, r, !0),
//       e.Data.BlockID < 0
//     ) return;
//     var i = gListManager.GetObjectPtr(e.Data.BlockID, !1);
//     if (null != e.Data.TableSelect) var n = i.GetTable(!1);
//     var o = i.DataID;
//     if (null != e.Data.TableSelect) {
//       var s,
//         l = n.select,
//         S = null,
//         c = {};
//       e.Data.TableSelect >= 0 &&
//         (S = gListManager.Table_GetCellWithID(n, e.Data.TableSelect, c)),
//         s = null == S ? e.Data.TableSelect : c.index;
//       var u = i.DataID;
//       s >= 0 &&
//         n.cells[s].DataID >= 0 &&
//         (o = n.cells[s].DataID),
//         e.EditorID === Collab.EditorID &&
//         (n.select = s, l = s)
//     } else if (i && i instanceof Connector) {
//       u = i.DataID,
//         o = e.Data.DataID;
//       var p = i.arraylist.lasttexthook
//     }
//     var d = gListManager.GetObjectPtr(o, !0);
//     if (null == d) return;
//     if (
//       (
//         n = (i = gListManager.GetObjectPtr(e.Data.BlockID, !0)).GetTable(!0)
//       ) &&
//       (n.select = s),
//       i.DataID = o,
//       gListManager.PreserveUndoState(!1),
//       d
//     ) {
//       var D = e.Data.runtimeText.text.length - d.runtimeText.text.length;
//       d.runtimeText = Utils1.DeepCopy(e.Data.runtimeText),
//         d.selrange = Utils1.DeepCopy(e.Data.selrange);
//       var g = gListManager.svgObjectLayer.GetElementByID(i.BlockID),
//         h = g.textElem;
//       if (
//         (null == h || h.formatter.fmtText.text !== e.Data.runtimeText) &&
//         (Collab.NoRedrawFromSameEditor = !1),
//         gListManager.dirtyList.push(e.Data.BlockID),
//         gListManager.RenderDirtySVGObjects(),
//         h = (g = gListManager.svgObjectLayer.GetElementByID(i.BlockID)).textElem,
//         i instanceof BaseShape &&
//         h.SetConstraints(e.Data.maxWidth, e.Data.minWidth, e.Data.minHeight),
//         gListManager.TextResizeCommon(e.Data.BlockID, null, !1, null, !0),
//         Collab.SecondarySelection.complete &&
//         Collab.SecondarySelection.TEDSession.theActiveTextEditObjectID === i.BlockID &&
//         (
//           t.start = Collab.SecondarySelection.theSelectedRange.start,
//           t.end = Collab.SecondarySelection.theSelectedRange.end
//         ),
//         t &&
//         D &&
//         e.EditorID !== Collab.EditorID
//       ) {
//         var m = e.Data.selrange.start - D;
//         m < t.start ? (
//           t.start += D,
//           t.end += D,
//           t.start < 0 &&
//           (t.start = 0),
//           t.end < 0 &&
//           (t.end = 0)
//         ) : m < t.end &&
//         (t.end += D, t.end < t.start && (t.end = t.start))
//       }
//     }
//     null != e.Data.TableSelect ? (n.select = l, i.DataID = u) : i &&
//       i instanceof Connector &&
//       (i.DataID = u, i.arraylist.lasttexthook = p)
//   }
// }

// Collab.Text_End = function (e) {
//   if (e.Data.BlockID >= 0) {
//     var t = - 1,
//       a = - 1,
//       r = Collab.GetRemapList(e);
//     r &&
//       (e.Data.BlockID = Collab.GetRemappedID(r, e.Data.BlockID));
//     var i = gListManager.ActiveVisibleZList();
//     if (
//       e.Data.BlockID = Collab.ValidateEditID(e.Data.BlockID, i, !0),
//       e.Data.BlockID < 0
//     ) return;
//     var n = gListManager.GetObjectPtr(e.Data.BlockID, !0);
//     if (null != e.Data.TableSelect) {
//       e.EditorID,
//         Collab.EditorID,
//         theTable = n.GetTable(!0),
//         a = theTable.select;
//       var o = null,
//         s = {};
//       if (
//         e.Data.TableSelect >= 0 &&
//         (
//           o = gListManager.Table_GetCellWithID(theTable, e.Data.TableSelect, s)
//         ),
//         theTable.select = null == o ? - 1 : s.index,
//         t = n.DataID,
//         theTable.select >= 0
//       ) {
//         theTable.cells[theTable.select].DataID >= 0 &&
//           (n.DataID = theTable.cells[theTable.select].DataID);
//         var l = theTable.cells[theTable.select].flags
//       }
//     } else if (n && n instanceof Connector) {
//       t = n.DataID,
//         n.DataID = e.Data.DataID;
//       var S = n.arraylist.lasttexthook
//     }
//     if (e.EditorID === Collab.EditorID) {
//       var c = gListManager.GetObjectPtr(gListManager.tedSessionBlockId, !1);
//       c.theActiveTextEditObjectID = e.Data.BlockID,
//         null != e.Data.TableSelect &&
//         (c.theActiveTableObjectID = e.Data.BlockID),
//         (
//           c = gListManager.GetObjectPtr(gListManager.tedSessionBlockId, !0)
//         ).theActiveTextEditObjectID = - 1,
//         l = - 1
//     }
//     e.Data.theTEWasResized &&
//       (
//         gListManager.SetLinkFlag(n.BlockID, ConstantData.LinkFlags.SED_L_MOVE),
//         n.hooks.length &&
//         gListManager.SetLinkFlag(n.hooks[0].objid, ConstantData.LinkFlags.SED_L_MOVE)
//       );
//     var u = gListManager.GetObjectPtr(n.DataID, !0);
//     if (u) {
//       if (e.Data.empty) {
//         var p = T3Gv.objectStore.GetObject(n.DataID);
//         t === n.DataID &&
//           (t = - 1, a = - 1),
//           n.SetTextObject(- 1),
//           p &&
//           p.Delete(),
//           e.Data.isTextLabel &&
//           gListManager.DeleteObjects([n.BlockID], !1),
//           n.IsSwimlane() &&
//           (Collab.NoRedrawFromSameEditor = !1)
//       } else e.Data.runtimeText.text !== u.runtimeText.text &&
//         (
//           u.runtimeText = Utils1.DeepCopy(e.Data.runtimeText),
//           gListManager.AddToDirtyList(n.BlockID)
//         );
//       if (theTable = n.GetTable(!0), theTable) gListManager.Table_DeActivateText(n, theTable),
//         n.DataID = - 1,
//         e.EditorID === Collab.EditorID &&
//         (t = - 1),
//         null != e.Data.TableSelect &&
//         theTable.select >= 0 &&
//         - 1 !== l &&
//         (theTable.cells[theTable.select].flags = l);
//       else {
//         var d = Business.GetSelectionBusinessManager(n.BlockID);
//         if (d) {
//           var D = gListManager.svgObjectLayer.GetElementByID(n.BlockID).GetElementByID(ConstantData.SVGElementClass.TEXT);
//           D &&
//             d.ShapeSaveData(n, D)
//         }
//       }
//       null != e.Data.TableSelect ? (theTable.select = a, n.DataID = t) : n &&
//         n instanceof Connector &&
//         (
//           e.EditorID === Collab.EditorID &&
//           (t = - 1),
//           n.DataID = t,
//           n.arraylist.lasttexthook = S
//         );
//       var g = gListManager.GetObjectPtr(gListManager.sedSessionBlockId, !1),
//         h = g.tselect;
//       e.Data.closetable &&
//         e.EditorID === Collab.EditorID &&
//         (gListManager.Table_Release(!1), g.tselect = h),
//         gListManager.CompleteOperation()
//     }
//   }
// }

// Collab.ExecuteActions = function (e) {
//   var t,
//     a = ConstantData.CollabMessageActions,
//     r = e.Data.Actions;
//   if (null != r) {
//     var i,
//       n,
//       o,
//       s = e.Data,
//       l = r.length;
//     for (
//       Collab.CreateList = [],
//       Collab.ProcessCreateList = !0,
//       i = 0;
//       i < l;
//       i++
//     ) switch (r[i].ActionType) {
//       case a.CreateSymbol:
//         s.symbolID;
//         var S = gListManager.GetObjectPtr(gListManager.sedSessionBlockId, !1),
//           c = S.def.style;
//         if (
//           S.def.style = s.StyleRecord,
//           n = gBaseManager.AddSymbol(s.symbolID, s.AllowMany),
//           gListManager.AddToDirtyList(n),
//           gListManager.SetLinkFlagsOnFilledClosedPolylines(),
//           S.def.style = c,
//           s.ReplaceSpecialObjectID > 0
//         ) {
//           var u = gListManager.ZListPreserve(),
//             p = gListManager.GetObjectPtr(n, !0),
//             d = gListManager.ReplaceSpecialObject(p, n, u, p.objecttype);
//           if (d >= 0) {
//             var D = [
//               d
//             ];
//             gListManager.DeleteObjects(D, !1)
//           }
//         }
//         break;
//       case a.CreateShape:
//         n = Collab.AddShape(s);
//         break;
//       case a.CreateLine:
//         n = e.Data.UsingWallTool ? Collab.AddWall(e) : Collab.AddLine(e);
//         break;
//       case a.MoveObject:
//         if (s.FrameList) {
//           var g = Collab.CreateList.length;
//           for (t = 0; t < g; t++) (p = gListManager.GetObjectPtr(Collab.CreateList[t], !0)) &&
//             (
//               o = s.FrameList[t],
//               p.SetShapeOrigin(o.x, o.y),
//               p.UpdateFrame(o),
//               gListManager.AddToDirtyList(Collab.CreateList[t])
//             )
//         }
//         break;
//       case a.LinkObject:
//         if (null == s.linkParams) break;
//         if (p = gListManager.GetObjectPtr(n, !0)) {
//           var h = Collab.GetRemapList(e);
//           h &&
//             (
//               s.linkParams.ConnectIndex = Collab.GetRemappedID(h, s.linkParams.ConnectIndex),
//               s.linkParams.InitialHook = Collab.GetRemappedID(h, s.linkParams.InitialHook),
//               s.linkParams.SConnectIndex = Collab.GetRemappedID(h, s.linkParams.SConnectIndex),
//               s.linkParams.JoinIndex = Collab.GetRemappedID(h, s.linkParams.JoinIndex),
//               s.linkParams.SJoinIndex = Collab.GetRemappedID(h, s.linkParams.SJoinIndex)
//             ),
//             s.linkParams.ConnectIndex = Collab.ValidateShapeID(s.linkParams.ConnectIndex),
//             s.linkParams.InitialHook = Collab.ValidateShapeID(s.linkParams.InitialHook),
//             s.linkParams.SConnectIndex = Collab.ValidateShapeID(s.linkParams.SConnectIndex),
//             s.linkParams.JoinIndex = Collab.ValidateShapeID(s.linkParams.JoinIndex),
//             s.linkParams.SJoinIndex = Collab.ValidateShapeID(s.linkParams.SJoinIndex);
//           var m = gListManager.actionStoredObjectId;
//           switch (
//           gListManager.actionStoredObjectId = n,
//           gListManager.linkParams = s.linkParams,
//           s.linkParams.AutoInsert &&
//           null != s.RotationAngle &&
//           p.RotationAngle !== s.RotationAngle &&
//           (p.RotationAngle = s.RotationAngle),
//           p.DrawingObjectBaseClass
//           ) {
//             case ConstantData.DrawingObjectBaseClass.LINE:
//               p.LM_DrawPostRelease(n);
//               break;
//             case ConstantData.DrawingObjectBaseClass.SHAPE:
//               gListManager.LM_StampPostRelease(!0)
//           }
//           gListManager.actionStoredObjectId = m
//         }
//         break;
//       case a.AddLabel:
//         if (null == s.label) break;
//         if (0 == s.label.length) break;
//         if (p = gListManager.GetObjectPtr(n, !0)) {
//           var C = gListManager.CreateTextBlock(p, s.label);
//           p.SetTextObject(C)
//         }
//     }
//     e.Data.CreateList &&
//       e.Data.CreateList.length &&
//       Collab.AddToRemapList(e, e.Data.CreateList, Collab.CreateList, 0),
//       Collab.ProcessCreateList = !1,
//       Collab.CreateList = [],
//       gListManager.moveList = null
//   }
// }

// Collab.SymbolTimer = null,
//   Collab.Load_Symbol = function (e, t) {
//     var a = null,
//       r = ConstantData.CollabMessages;
//     if (null != e) switch (e.MessageType) {
//       case r.ActionButton:
//       case r.ActionButton_SplitPath:
//       case r.AddSymbol:
//       case r.LineDraw_InsertShape:
//       case r.ChangeToSymbol:
//       case r.BPMN_SwitchSymbol:
//       case r.AddSelectedSymbol:
//       case r.Pr_InsertSymbol:
//         a = e.Data.symbolID;
//         break;
//       case r.InsertSDONFromImport:
//         a = function (e) {
//           var t = JSON.parse(e.Data.SDONStr);
//           if (t.Symbols) {
//             var a = t.Symbols[0].ID;
//             return API.SymbolList = t.Symbols,
//               delete t.Symbols,
//               t.LoadedSymbols = API.SymbolList,
//               e.Data.SDONStr = JSON.stringify(t),
//               a
//           }
//           return null
//         }(e)
//     }
//     if (null == a) return t(e),
//       !1;
//     null != Collab.SymbolTimer &&
//       (
//         clearTimeout(Collab.SymbolTimer),
//         Collab.SymbolTimer = null
//       );
//     var i = SDUI.Commands.MainController.Symbols.GetLMObject(a);
//     if (
//       null == i &&
//       (i = gListManager.BuildSymbolObject(a, - 1, e)),
//       i.SymbolData.HasNative
//     ) {
//       if (null == i.nativeDataArrayBuffer) return Collab.SymbolTimer = setTimeout((function () {
//         Collab.Load_Symbol(e, t)
//       }), 10),
//         !0;
//       t(e)
//     } else {
//       var n = gListManager.GetSymbolFormat(i.SymbolData),
//         o = Globals.SymbolFormats;
//       switch (n) {
//         case o.EMF:
//         case o.PNG:
//         case o.JPG:
//           if (null == i.EMFBuffer) return Collab.SymbolTimer = setTimeout((function () {
//             Collab.Load_Symbol(e, t)
//           }), 10),
//             !0;
//           t(e);
//           break;
//         default:
//           t(e)
//       }
//     }
//     return !1
//   }

// Collab.Table_GetCell = function (e, t) {
//   var a,
//     r,
//     i;
//   for (r = e.cells.length, a = 0; a < r; a++) if ((i = e.cells[a]).uniqueid === t.uniqueid) return i;
//   return null
// }

// Collab.GetTableSelect = function (e, t) {
//   if (t < 0) return t;
//   var a = {};
//   return gListManager.Table_GetCellWithID(e, t, a) ? a.index : - 1
// }

// Collab.SetTableSelect = function (e) {
//   return e.select < 0 ? - 1 : e.cells[e.select].uniqueid
// }

// Collab.ReceiveMessage = function (e) {
//   var t = ConstantData.CollabMessages,
//     a = null;
//   e.EditorID === Collab.EditorID ? Collab.WaitingForTheReturnMessage &&
//     (Collab.NoRedrawFromSameEditor = !0) : (
//     Collab.WaitingForTheReturnMessage = !1,
//     Collab.NoRedrawFromSameEditor = !1
//   );
//   var r,
//     i,
//     n,
//     o = !1,
//     s = [],
//     l = [],
//     S = [],
//     c = !1;
//   tableselect = - 1;
//   var u,
//     p,
//     d = !1,
//     D = !1,
//     g = function (e) {
//       var t,
//         a,
//         u = Collab.GetRemapList(e),
//         p = ListManager.Table.CellFlags.SDT_F_Select;
//       u &&
//         (e.tselect = Collab.GetRemappedID(u, e.tselect)),
//         e.tselect = Collab.ValidateShapeID(e.tselect);
//       var d = gListManager.GetObjectPtr(gListManager.sedSessionBlockId, !1);
//       r = d.tselect;
//       var D = T3Gv.objectStore.GetObject(gListManager.theSelectedListBlockID);
//       i = Utils1.DeepCopy(D.Data);
//       var g = gListManager.GetObjectPtr(gListManager.tedSessionBlockId, !1);
//       if (n = g.theActiveTableObjectID, g.theActiveTableObjectID = - 1, n >= 0) {
//         var h = gListManager.GetObjectPtr(n, !1);
//         if (h && h.GetTable) var m = h.GetTable(!1);
//         if (m) {
//           var C,
//             y,
//             f,
//             L,
//             I,
//             T,
//             b = m.cells.length;
//           for (tableselect = Collab.SetTableSelect(m), a = 0; a < b; a++) T = m.cells[a],
//             (I = {}).flags = T.flags & p,
//             I.uniqueid = T.uniqueid,
//             s.push(I),
//             T.flags = Utils.SetFlag(T.flags, p, !1);
//           for (y = m.rows.length, a = 0; a < y; a++) f = m.rows[a],
//             l[a] = f.selected,
//             f.selected = !1;
//           for (C = m.cols.length, a = 0; a < C; a++) L = m.cols[a],
//             S[a] = L.selected,
//             L.selected = !1
//         }
//       }
//       if (
//         d.tselect !== e.tselect &&
//         (d.tselect = e.tselect),
//         t = e.selectedList.length,
//         e.selectedList &&
//         u
//       ) for (a = 0; a < t; a++) e.selectedList[a] = Collab.GetRemappedID(u, e.selectedList[a]);
//       var M = [];
//       if (e.selectedList) for (a = 0; a < t; a++) e.selectedList[a] = Collab.ValidateShapeID(e.selectedList[a]),
//         e.selectedList[a] >= 0 &&
//         M.push(e.selectedList[a]);
//       if (
//         D.Data = M,
//         e.ActiveTableID >= 0 &&
//         (
//           u &&
//           (e.ActiveTableID = Collab.GetRemappedID(u, e.ActiveTableID)),
//           e.ActiveTableID = Collab.ValidateShapeID(e.ActiveTableID),
//           e.ActiveTableID >= 0 &&
//           e.selectedCells
//         )
//       ) {
//         for (
//           g.theActiveTableObjectID = e.ActiveTableID,
//           m = (h = gListManager.GetObjectPtr(e.ActiveTableID, !1)).GetTable(!1),
//           c = !0,
//           m.select = Collab.GetTableSelect(m, e.tableselect),
//           b = e.selectedCells.length,
//           a = 0;
//           a < b;
//           a++
//         ) (T = Collab.Table_GetCell(m, e.selectedCells[a])) &&
//           (T.flags = Utils.SetFlag(T.flags, p, !0));
//         for (y = e.selectedRows.length, a = 0; a < y; a++) (f = m.rows[e.selectedRows[a]]).selected = !0;
//         for (C = e.selectedCols.length, a = 0; a < C; a++) (L = m.cols[e.selectedCols[a]]).selected = !0
//       }
//       o = !0
//     },
//     h = function (e, t) {
//       if (
//         e.EditorID === Collab.EditorID &&
//         e.Data &&
//         null != e.Data.NewBlockMap &&
//         !1 === Collab.SecondarySelection.complete
//       ) {
//         var a = e.Data.NewBlockMap[Collab.SecondarySelection.tselect];
//         if (null != a) {
//           var n,
//             o,
//             s = a,
//             l = [];
//           for (
//             n = Collab.SecondarySelection.selectedList.length,
//             o = 0;
//             o < n;
//             o++
//           ) null != (
//             a = e.Data.NewBlockMap[Collab.SecondarySelection.selectedList[o]]
//           ) &&
//             l.push(a);
//           if (
//             Collab.SecondarySelection.TEDSession.theActiveTextEditObjectID >= 0 &&
//             (
//               Collab.SecondarySelection.TEDSession.theActiveTextEditObjectID = s
//             ),
//             Collab.SecondarySelection.TEDSession.theActiveTableObjectID >= 0 &&
//             (
//               Collab.SecondarySelection.TEDSession.theActiveTableObjectID = s,
//               Collab.SecondarySelection.theActiveTableObjectID = s
//             ),
//             t
//           ) i = l,
//             r = s;
//           else gListManager.GetObjectPtr(gListManager.sedSessionBlockId, !1).tselect = s,
//             T3Gv.objectStore.GetObject(gListManager.theSelectedListBlockID).Data = l,
//             gListManager.ClearSVGOverlayLayer(),
//             gListManager.RenderAllSVGSelectionStates();
//           Collab.Animation_BuildMessage(
//             0,
//             0,
//             ConstantData.Collab_AnimationMessages.ChangeSelection,
//             l
//           ),
//             Collab.SecondarySelection.complete = !0
//         }
//       }
//     },
//     m = function () {
//       var t = T3Gv.objectStore.GetObject(gListManager.theSelectedListBlockID),
//         o = t.Data,
//         u = ListManager.Table.CellFlags.SDT_F_Select;
//       h(e, !0),
//         gListManager.SetDimensionVisibility(o, !1);
//       var p = gListManager.GetObjectPtr(gListManager.sedSessionBlockId, !1);
//       p.tselect !== r &&
//         (p.tselect = r),
//         t.Data = i,
//         a = gListManager.ActiveVisibleZList(),
//         e.ActiveTableID = Collab.ValidateEditID(e.ActiveTableID, a, !0);
//       var d = gListManager.GetObjectPtr(gListManager.tedSessionBlockId, !1);
//       if (e.ActiveTableID >= 0 && e.selectedCells) {
//         d.theActiveTableObjectID = - 1;
//         var D,
//           g,
//           m,
//           C,
//           y,
//           f,
//           L = gListManager.GetObjectPtr(e.ActiveTableID, !1),
//           I = L.GetTable(!1),
//           T = I.cells.length;
//         for (D = 0; D < T; D++) cell = I.cells[D],
//           cell.flags = Utils.SetFlag(cell.flags, u, !1);
//         for (m = I.rows.length, D = 0; D < m; D++) (g = I.rows[D]).selected = !1;
//         for (y = I.cols.length, D = 0; D < y; D++) (C = I.cols[D]).selected = !1;
//         I.select = - 1,
//           gListManager.AddToDirtyList(e.ActiveTableID)
//       } else c = !1;
//       if (
//         n >= 0 &&
//         (
//           d.theActiveTableObjectID = n,
//           (I = (L = gListManager.GetObjectPtr(n, !1)).GetTable(!1)).select = Collab.GetTableSelect(I, tableselect),
//           s.length
//         )
//       ) {
//         for (f = s.length, D = 0; D < f; D++) cell = Collab.Table_GetCell(I, s[D]),
//           cell &&
//           (cell.flags = Utils.SetFlag(cell.flags, u, s[D].flags > 0));
//         for (m = I.rows.length, D = 0; D < m; D++) g = I.rows[D],
//           null != l[D] &&
//           (g.selected = l[D]);
//         for (y = I.cols.length, D = 0; D < y; D++) C = I.cols[D],
//           null != S[D] &&
//           (C.selected = S[D]);
//         gListManager.AddToDirtyList(n)
//       }
//       c ? gListManager.CompleteOperation(null, !1, !1, !0) : (
//         gListManager.ClearSVGOverlayLayer(),
//         gListManager.RenderAllSVGSelectionStates()
//       )
//     },
//     C = function (e, a) {
//       switch (e.MessageType) {
//         case t.Undo:
//         case t.Redo:
//           var r,
//             i,
//             n = T3Gv.stateManager.States[T3Gv.stateManager.CurrentStateID];
//           for (i = n.StoredObjects.length, r = 0; r < i; r++) if (n.StoredObjects[r].ID === a.theActiveTextEditObjectID) {
//             d = !0,
//               u = null;
//             break
//           }
//       }
//     };
//   (null != e.tselect && g(e), 1 != e.hasNewBlocks) &&
//     (
//       (p = Collab.AddEditor(e.EditorID, e.UserID)) &&
//       (p.NewBlockMap = {})
//     );
//   1 != e.hasNewDataTables &&
//     (
//       (p = Collab.AddEditor(e.EditorID, e.UserID)) &&
//       (p.NewDataTableMap = [])
//     );
//   var y = gListManager.GetObjectPtr(gListManager.tedSessionBlockId, !1),
//     f = gListManager.svgDoc.GetActiveEdit();
//   switch (
//   - 1 != y.theActiveTextEditObjectID &&
//   f &&
//   (
//     !function (t, a) {
//       t &&
//         (u = Utils1.DeepCopy(t.GetSelectedRange()), C(e, a))
//     }(f, y),
//     gListManager.TEUnregisterEvents()
//   ),
//   e.MessageType
//   ) {
//     case t.SetStyleAttributes:
//       var L = Utils1.DeepCopy(e.Data.attributes);
//       gListManager.SetSelectedObjectAttributes(L, !0, c);
//       break;
//     case t.SetTextAttributes:
//       gListManager.ChangeSelectedTextAttributes(
//         e.Data.theTEStyle,
//         e.Data.theSEDStyle,
//         e.Data.theParagraphAlignment,
//         e.Data.theParagraphStyle,
//         c
//       );
//       break;
//     case t.SetTextDirection:
//       gListManager.ChangeTextDirection(e.Data.textDirection, e);
//       break;
//     case t.ChangeWidth:
//       gListManager.ChangeWidth(e.Data.widthStr);
//       break;
//     case t.ChangeHeight:
//       gListManager.ChangeHeight(e.Data.heightStr);
//       break;
//     case t.SetTopLeft:
//       gListManager.SetTopLeft(e.Data.Str, e.Data.left);
//       break;
//     case t.AlignShapes:
//       gListManager.AlignShapes(e.Data.shapeAlign);
//       break;
//     case t.RotateShapes:
//       gListManager.RotateShapes(e.Data.angle);
//       break;
//     case t.FlipShapes:
//       gListManager.FlipShapes(e.Data.flip);
//       break;
//     case t.GroupSelectedShapes:
//       Collab.GroupSelectedShapes(e);
//       break;
//     case t.BringToFrontOfSpecificLayer:
//       gListManager.BringToFrontOfSpecificLayer(e.Data.theTargetLayer, !0);
//       break;
//     case t.SendToBackOfSpecificLayer:
//       gListManager.SendToBackOfSpecificLayer(e.Data.theTargetLayer, !0);
//       break;
//     case t.UngroupSelectedShapes:
//       Collab.UngroupSelectedShapes(e);
//       break;
//     case t.SpaceEvenly:
//       gListManager.SpaceEvenly(e.Data.spaceEvenlyOption);
//       break;
//     case t.MakeSameSize:
//       gListManager.MakeSameSize(e.Data.makeSameSizeOption);
//       break;
//     case t.ChangeShape:
//       gListManager.ChangeShape(e.Data.shapeType);
//       break;
//     case t.ChangeLineType:
//       gListManager.ChangeLineType(
//         e.Data.LineType,
//         e.Data.ShortRef,
//         e.Data.firstdir,
//         e.Data.lastdir
//       );
//       break;
//     case t.ChangeToSymbol:
//       gListManager.ChangeToSymbol(e.Data.symbolID);
//       break;
//     case t.BPMN_SwitchSymbol:
//       gListManager.BPMN_SwitchSymbol(e.Data.objecttype, e.Data.subtype, e.Data.symbolID);
//       break;
//     case t.BPMN_SwitchIcon:
//       SDUI.Commands.MainController.Shapes.BPMN_SwitchIcon(
//         e.Data.objecttype,
//         e.Data.cellindex,
//         e.Data.iconid,
//         e.Data.cellindex2,
//         e.Data.iconid2,
//         e.Data.toggle
//       );
//       break;
//     case t.BPMN_AddRemoveParticipant:
//       SDUI.Commands.MainController.Shapes.BPMN_AddRemoveParticipant(e.Data.objecttype, e.Data.remove);
//       break;
//     case t.OpenShapeEdit:
//       Collab.OpenShapeEdit(e);
//       break;
//     case t.CloseShapeEdit:
//       Collab.CloseShapeEdit(e);
//       break;
//     case t.AddSymbol:
//     case t.AddLine:
//       Collab.ExecuteActions(e),
//         gListManager.CompleteOperation();
//       break;
//     case t.Text_Init:
//       D = Collab.Text_Init(e);
//       break;
//     case t.Text_Edit:
//       Collab.Text_Edit(e, u);
//       break;
//     case t.Text_End:
//       Collab.Text_End(e);
//       break;
//     case t.ActionButton:
//       Collab.ActionButtons(e);
//       break;
//     case t.ActionButton_SplitPath:
//       Collab.ActionButton_SplitPath(e);
//       break;
//     case t.ActionButton_JoinPath:
//       Collab.JoinPath(e);
//       break;
//     case t.LineDraw_InsertShape:
//       Collab.LineDraw_InsertShape(e);
//       break;
//     case t.MoveObjects:
//       Collab.MoveObjects(e);
//       break;
//     case t.Dialog_Dimensions:
//       SDUI.Commands.MainController.DimensionsDialog.Dialog_OK(e.Data.Dimensions);
//       break;
//     case t.SetTargetConnectionPoints:
//       gListManager.SetTargetConnectionPoints(e.Data.flag, e.Data.custompoints, e.Data.AttachPoint);
//       break;
//     case t.SetShapeProperties:
//       gListManager.SetShapeProperties(e.Data.properties, e, e.Data.all);
//       break;
//     case t.SetColorFilter:
//       gListManager.SetColorFilter(null, e.Data.colorfilter);
//       break;
//     case t.Lock:
//       Collab.Lock(e);
//       break;
//     case t.SetObjectHyperlink:
//       e.tselect >= 0 &&
//         (
//           T = gListManager.GetObjectPtr(e.tselect, !1),
//           gListManager.SetObjectHyperlink(T, e.Data.hyperlinkText, !0)
//         );
//       break;
//     case t.Action_Shape:
//       Collab.Action_Shape(e);
//       break;
//     case t.Action_Line:
//       Collab.Action_Line(e);
//       break;
//     case t.Action_Connector:
//       Collab.Action_Connector(e);
//       break;
//     case t.PolyLSetSegmentType:
//       Collab.PolyLSetSegmentType(e);
//       break;
//     case t.PolyLRemoveNodes:
//       Collab.PolyLRemoveNodes(e);
//       break;
//     case t.PolyLAddNode:
//       Collab.PolyLAddNode(e);
//       break;
//     case t.PolyLSplit:
//       Collab.PolyLSplit(e);
//       break;
//     case t.Duplicate:
//       null != e.Data.tselect &&
//         g(e.Data),
//         Collab.Duplicate(e),
//         m();
//       break;
//     case t.DeleteObjects:
//       Collab.DeleteObjects(e);
//       break;
//     case t.Table_DeleteCellContent:
//       Collab.Table_DeleteCellContent(e);
//       break;
//     case t.PasteObjects:
//       Collab.PasteObjects(e);
//       break;
//     case t.Table_PasteCellContent:
//       Collab.Table_PasteCellContent(e);
//       break;
//     case t.Undo:
//       gListManager.Undo(!1, e);
//       break;
//     case t.Redo:
//       gListManager.Redo(e);
//       break;
//     case t.FormatPainter:
//       Collab.FormatPainter(e);
//       break;
//     case t.Table_PasteFormat:
//       Collab.Table_PasteFormat(e);
//       break;
//     case t.Edit_Note:
//       Collab.Edit_Note(e);
//       break;
//     case t.Comment_Add:
//       Collab.Comment_Add(e);
//       break;
//     case t.Dialog_Options:
//       Collab.Dialog_Options(e);
//       break;
//     case t.FieldedDataImportFromFile:
//       Collab.FieldedDataImportFromFile(e);
//       break;
//     case t.DataFieldDeleteTable:
//       Collab.DataFieldDeleteTable(e);
//       break;
//     case t.InsertGraph:
//       Collab.InsertGraph(e);
//       break;
//     case t.InsertGauge:
//       Collab.InsertGauge(e);
//       break;
//     case t.SetBackgroundColor:
//       SDUI.Commands.MainController.Shapes.SetBackgroundColor(e.Data.color);
//       break;
//     case t.SetBackgroundGradient:
//       SDUI.Commands.MainController.Shapes.SetBackgroundGradient(e.Data.color, e.Data.endColor, e.Data.gradientFlags);
//       break;
//     case t.ResetBackgroundGradient:
//       SDUI.Commands.MainController.Shapes.ResetBackgroundGradient();
//       break;
//     case t.SetBackgroundTexture:
//       SDUI.Commands.MainController.Shapes.SetBackgroundTexture(e.Data.textureIndex, e.Data.textureScale);
//       break;
//     case t.SetPageOrientation:
//       T3Gv.docUtil.SetPageOrientation(e.Data.orientation);
//       break;
//     case t.SetPageMargins:
//       T3Gv.docUtil.SetPageMargins(e.Data.margin);
//       break;
//     case t.SetCustomPageMargins:
//       T3Gv.docUtil.SetCustomPageMargins(e.Data.left, e.Data.top, e.Data.right, e.Data.bottom);
//       break;
//     case t.AddNewLayer:
//       T3Gv.optManager.AddNewLayer(e.Data.layerName, e.Data.bIsVisible, e.Data.bIsClickable),
//         SDUI.Commands.MainController.Document.SetLayerTabsOffset(0);
//       break;
//     case t.SetLayers:
//       T3Gv.optManager.SetLayers(e.Data.layers, e.Data.activelayer),
//         e.Data.activelayer - 3 > 0 ? SDUI.Commands.MainController.Document.SetLayerTabsOffset(e.Data.activelayer - 3) : SDUI.Commands.MainController.Document.SetLayerTabsOffset(0);
//       break;
//     case t.ShowAllLayers:
//       T3Gv.optManager.ShowAllLayers();
//       break;
//     case t.LayerTabClick:
//       Collab.LayerTabClick(e);
//       break;
//     case t.SetWorkArea:
//       T3Gv.optManager.SetWorkArea(
//         e.Data.thePagesAcross,
//         e.Data.thePagesDown,
//         e.Data.theInchesAcross,
//         e.Data.theInchesDown,
//         e.Data.theFixImageSizeInInches,
//         e.Data.theAutoGrow
//       );
//       break;
//     case t.CenterOnPage:
//       T3Gv.optManager.CenterOnPage();
//       break;
//     case t.SetScalePreset:
//       SDUI.Commands.MainController.Document.SetScalePreset(e.Data.scaletype, e.Data.preset, !0, e);
//       break;
//     case t.ScaleDialog:
//       T3Gv.docUtil.SetRulers(e.Data.rulerConfig),
//         T3Gv.optManager.ScaleDrawing(e.Data.oldruler, e.Data.rulerConfig);
//       break;
//     case t.InsertTable:
//       Collab.InsertTable(e);
//       break;
//     case t.RemoveTables:
//       T3Gv.optManager.RemoveTables(e);
//       break;
//     case t.SetTableProperties:
//       T3Gv.optManager.SetTableProperties(!1, e.Data.nrows, e.Data.ncols);
//       break;
//     case t.Table_DeleteRows:
//       Collab.Table_DeleteRows(e);
//       break;
//     case t.Table_DeleteColumns:
//       Collab.Table_DeleteColumns(e);
//       break;
//     case t.Table_InsertRows:
//       Collab.Table_InsertRows(e);
//       break;
//     case t.Table_InsertColumns:
//       Collab.Table_InsertColumns(e);
//       break;
//     case t.Table_InsertDeleteGroupCols:
//       Collab.Table_InsertDeleteGroupCols(e);
//       break;
//     case t.Table_InsertDeleteGroupRows:
//       Collab.Table_InsertDeleteGroupRows(e);
//       break;
//     case t.Table_JoinCells:
//       T3Gv.optManager.Table_JoinCells(!1, !1, e);
//       break;
//     case t.Table_SplitCells:
//       T3Gv.optManager.Table_SplitCells(!1);
//       break;
//     case t.Table_DistributeRowandCols:
//       T3Gv.optManager.Table_DistributeRowandCols(e.Data.dorow, !1);
//       break;
//     case t.Table_SetCellFlags:
//       T3Gv.optManager.Table_SetCellFlags(e.Data.flag, e.Data.on);
//       break;
//     case t.SetSDPFlag:
//       T3Gv.gBaseManager.SetSDPFlag(e.Data.flag, e.Data.use);
//       break;
//     case t.SetSDPMoreFlag:
//       T3Gv.gBaseManager.SetSDPMoreFlag(e.Data.flag, e.Data.use);
//       break;
//     case t.InsertSDONFromImport:
//       Collab.InsertSDONFromImport(e);
//       break;
//     case t.ApplyLineHopDialog:
//       T3Gv.optManager.ApplyLineHopDialog(
//         e.Data.lineHopsSize,
//         e.Data.bGlobalLineHops,
//         e.Data.bLineHopsStyle,
//         e.Data.bHopableLineSelected,
//         e.Data.bLineHopsThisLine
//       );
//       break;
//     case t.AddCorner:
//       Collab.AddCorner(e);
//       break;
//     case t.AddAnnotationLayer:
//       Collab.AddAnnotationLayer(e);
//       break;
//     case t.RemoveAnnotationLayer:
//       T3Gv.optManager.RemoveAnnotationLayer();
//       break;
//     case t.ShowDimensions:
//       T3Gv.gBaseManager.ShowDimensions();
//       break;
//     case t.SetBranchStyle:
//       Collab.SetBranchStyle(e);
//       break;
//     case t.SetChartStyle:
//       Collab.SetChartStyle(e);
//       break;
//     case t.UpdateGraph:
//       T3Gv.optManager.UpdateGraph(e.Data.d3Settings, e.Data.DataRowID, null, null, !1, e);
//       break;
//     case t.UpdateGauge:
//       T3Gv.optManager.UpdateGauge(
//         e.Data.d3Settings,
//         e.Data.theStyle,
//         e.Data.shapeWidth,
//         e.Data.shapeHeight,
//         e
//       );
//       break;
//     case t.SetDirection:
//       Collab.SetDirection(e);
//       break;
//     case t.ConnectorSetSpacing:
//       Collab.SetSpacing(e);
//       break;
//     case t.SetLineCornerRadiusAll:
//       T3Gv.optManager.SetLineCornerRadiusAll(null, e);
//       break;
//     case t.OrgSetTable:
//       GlobalDatagOrgChartManager.SetTable(e.Data.name, !1, !1, e);
//       break;
//     case t.OrgAddPicture:
//       Collab.OrgAddPicture(e);
//       break;
//     case t.MindMapSetTable:
//       GlobalDatagTaskMapManager.SetTable(e.Data.name, !1);
//       break;
//     case t.MindMapAddIcon:
//       SDJS_Business_NameToController(e.Data.SelectionManagerName).AddIcon(e.Data.iconid, !1, !1, e);
//       break;
//     case t.ReadJSONAPI:
//       var I = JSON.parse(e.Data.SDONStr);
//       T3Gv.gBusinessManager.ReadJSONAPI(I, e.Data.UseSelect);
//       break;
//     case t.GanttAddTask:
//       Collab.GanttAddTask(e);
//       break;
//     case t.GanttAddDependency:
//       Collab.GanttAddDependency(e);
//       break;
//     case t.GanttRemoveDependency:
//       T3Gv.optManager.GanttRemoveDependency();
//       break;
//     case t.GanttIndent:
//       T3Gv.optManager.GanttIndent(e.Data.indent, !0);
//       break;
//     case t.GanttSortTasks:
//       T3Gv.optManager.GanttSortTasks(e.Data.resource, e.Data.personName, !0);
//       break;
//     case t.SD_GanttExpandContract:
//       Collab.SD_GanttExpandContract(e);
//       break;
//     case t.GanttSetTimeScale:
//       T3Gv.optManager.GanttSetTimeScale(null, e.Data.iNewTimeScale);
//       break;
//     case t.UpdateProjectOptions:
//       T3Gv.optManager.UpdateProjectOptions(
//         e.Data.columnMask,
//         e.Data.workingdaysMask,
//         e.Data.countryEntryMask,
//         !0
//       );
//       break;
//     case t.UpdateProjectTimeframe:
//       T3Gv.optManager.UpdateProjectTimeframe(
//         e.Data.range,
//         e.Data.taskStartDateSecs,
//         e.Data.changedStartDate,
//         !0
//       );
//       break;
//     case t.InsertSwimlane:
//       Collab.InsertSwimlane(e);
//       break;
//     case t.MakeUniformSize:
//       Collab.MakeUniformSize(e);
//       break;
//     case t.ReverseArrowheads:
//       T3Gv.optManager.ReverseArrowheads();
//       break;
//     case t.AddMultiplicity:
//       Collab.AddMultiplicity(e);
//       break;
//     case t.UIElementAction:
//       GlobalDatagUIElementManager.UIElementAction(e.Data.action, e.Data.value, !0);
//       break;
//     case t.HandleIconClick:
//       Collab.HandleIconClick(e);
//       break;
//     case t.CMD_NewDataTable:
//       Collab.CMD_NewDataTable(e);
//       break;
//     case t.CMD_DataFieldAdd:
//       Collab.CMD_DataFieldAdd(e);
//       break;
//     case t.CMD_DataFieldLabelChange:
//       Collab.CMD_DataFieldLabelChange(e);
//       break;
//     case t.CMD_DataFieldTypeSelect:
//       Collab.CMD_DataFieldTypeSelect(e);
//       break;
//     case t.CMD_DataFieldDelete:
//       Collab.CMD_DataFieldDelete(e);
//       break;
//     case t.CMD_DataFieldMoveUp:
//       Collab.CMD_DataFieldMoveUp(e);
//       break;
//     case t.CMD_DataFieldMoveDown:
//       Collab.CMD_DataFieldMoveDown(e);
//       break;
//     case t.CMD_DataFieldRenameTable:
//       Collab.CMD_DataFieldRenameTable(e);
//       break;
//     case t.FieldedDataUpdateFromFile:
//       Collab.FieldedDataUpdateFromFile(e);
//       break;
//     case t.FieldedDataImportFromURL:
//       Collab.FieldedDataImportFromURL(e);
//       break;
//     case t.FieldedDataUpdateFromURL:
//       Collab.FieldedDataUpdateFromURL(e);
//       break;
//     case t.CMD_HandleDataChange:
//       Collab.CMD_HandleDataChange(e);
//       break;
//     case t.UpdateFieldedDataTooltipItem:
//       Collab.UpdateFieldedDataTooltipItem(e);
//       break;
//     case t.AddDataRule:
//       Collab.AddDataRule(e);
//       break;
//     case t.UpdateDataRule:
//       Collab.UpdateDataRule(e);
//       break;
//     case t.DeleteDataRule:
//       Collab.DeleteDataRule(e);
//       break;
//     case t.CMD_SelectDataRule:
//       Collab.CMD_SelectDataRule(e);
//       break;
//     case t.AttachRowToShape:
//       Collab.AttachRowToShape(e);
//       break;
//     case t.CMD_DataFieldUnlinkShape:
//       Collab.CMD_DataFieldUnlinkShape(e);
//       break;
//     case t.CMD_DataFieldDeleteData_NoShape:
//       Collab.CMD_DataFieldDeleteData_NoShape(e);
//       break;
//     case t.CMD_DataFieldDeleteData:
//       Collab.CMD_DataFieldDeleteData(e);
//       break;
//     case t.FieldedDataSetFieldPresetList:
//       Collab.FieldedDataSetFieldPresetList(e);
//       break;
//     case t.FieldedDataClearFieldPresetList:
//       Collab.FieldedDataClearFieldPresetList(e);
//       break;
//     case t.HandleDataDrop:
//       Collab.HandleDataDrop(e);
//       break;
//     case t.SetHideIconState:
//       SDUI.Commands.MainController.DataPanel.SetHideIconState(e.Data.hide);
//       break;
//     case t.AddSelectedSymbol:
//       Collab.AddSelectedSymbol(e);
//       break;
//     case t.NudgeSelectedObjects:
//       Collab.NudgeSelectedObjects(e);
//       break;
//     case t.SetSpellCheck:
//       SDUI.Commands.MainController.Document.SetSpellCheck(e.Data.bEnable, !0, !0);
//       break;
//     case t.ClearImage:
//       Collab.ClearImage(e);
//       break;
//     case t.Table_ImportPicture:
//       Collab.Table_ImportPicture(e);
//       break;
//     case t.Shape_ImportPicture:
//       Collab.Shape_ImportPicture(e);
//       break;
//     case t.AddShape_ImportPicture:
//       Collab.AddShape_ImportPicture(e);
//       break;
//     case t.ContainerDoubleClick:
//       Collab.ContainerDoubleClick(e);
//       break;
//     case t.SetFractionalPrecision:
//       SDUI.Commands.MainController.Document.SetFractionalPrecision(e.Data.precision, e);
//       break;
//     case t.SetDecimalPrecision:
//       SDUI.Commands.MainController.Document.SetDecimalPrecision(e.Data.precision, e);
//       break;
//     case t.SwitchTheme:
//       SDUI.Commands.MainController.SwitchTheme(e.Data.themeName, !1);
//       break;
//     case t.UpdateDimensionFromTextObj:
//       Collab.UpdateDimensionFromTextObj(e);
//       break;
//     case t.SetDefaultWallThickness:
//       SDUI.Commands.MainController.Shapes.SetDefaultWallThickness(null, e);
//       break;
//     case t.SetShapeMoreFlags:
//       Collab.SetShapeMoreFlags(e);
//       break;
//     case t.Pr_InsertSymbol:
//       Collab.Pr_InsertSymbol(e);
//       break;
//     case t.HandleDataRecordAdd:
//       Collab.HandleDataRecordAdd(e);
//       break;
//     case t.InsertFrameContainer:
//       Collab.InsertFrameContainer(e);
//       break;
//     case t.CreateTableFromReport:
//       Collab.CreateTableFromReport(e);
//       break;
//     case t.Jira_CreateShapesForIssues:
//       Collab.Jira_CreateShapesForIssues(e);
//       break;
//     case t.UpdateSelectedShapeFromJiraInformation:
//       Collab.UpdateSelectedShapeFromJiraInformation(e);
//       break;
//     case t.Jira_ProductRoadMap:
//       Collab.Jira_ProductRoadMap(e);
//       break;
//     case t.Multiplicity_SwitchSides:
//       Collab.Multiplicity_SwitchSides(e);
//       break;
//     case t.UpdateObjectWithIntegrationCardItemInformation:
//       Collab.UpdateObjectWithIntegrationCardItemInformation(e);
//       break;
//     case t.CreateShapesForIntegrationCardItems:
//       Collab.CreateShapesForIntegrationCardItems(e);
//       break;
//     case t.TimelineAddEvent:
//       gListManager.TimelineAddEvent(e.Data.newEvent, !0);
//       break;
//     case t.TimelineRemoveEvent:
//       gListManager.TimelineRemoveEvent(!0);
//       break;
//     case t.TimelineChangePosition:
//       gListManager.TimelineChangePosition(e.Data.eventPosition, !0);
//       break;
//     case t.TimelineChangeType:
//       gListManager.TimelineChangeType(e.Data.eventType, !0);
//       break;
//     case t.TimelineChangeDate:
//       gListManager.TimelineChangeDate(e.Data.startDate, e.Data.duration, e.Data.units, !0);
//       break;
//     case t.TimelineSetAuto:
//       gListManager.TimelineSetAuto(!0);
//       break;
//     case t.TimelineMoveEvent:
//       gListManager.TimelineMoveEvent(e.Data.lineBlockID, e.Data.deltaX, !0);
//       break;
//     case t.HitAreaClick:
//       Collab.HitAreaClick(e);
//       break;
//     case t.Table_FillSwimlane:
//       Collab.Table_FillSwimlane(e);
//       break;
//     case t.SwimLane_Operation:
//       Collab.SwimLane_Operation(e);
//       break;
//     case t.CreateSubProcess:
//       Collab.CreateSubProcess(e);
//       break;
//     case t.SubProcess_UpdateParent:
//       Collab.SubProcess_UpdateParent(e);
//       break;
//     case t.SetViewport:
//       SDUI.Commands.MainController.SetViewport(e.Data.zoom, e.Data.position, e)
//   }
//   a = gListManager.ActiveVisibleZList();
//   if (
//     o ? m() : h(e, !1),
//     (
//       y = gListManager.GetObjectPtr(gListManager.tedSessionBlockId, !1)
//     ).theActiveTextEditObjectID = Collab.ValidateEditID(y.theActiveTextEditObjectID, a, !0),
//     y.theActiveTableObjectID = Collab.ValidateEditID(y.theActiveTableObjectID, a, !0),
//     y.theActiveOutlineObjectID = Collab.ValidateEditID(y.theActiveOutlineObjectID, a),
//     - 1 != y.theActiveTextEditObjectID
//   ) {
//     if (
//       C(e, y),
//       y &&
//       y.theActiveTableObjectID === y.theActiveTextEditObjectID
//     ) {
//       var T = gListManager.GetObjectPtr(y.theActiveTableObjectID, !1),
//         b = gListManager.svgObjectLayer.GetElementByID(y.theActiveTableObjectID);
//       b &&
//         (
//           b.textElem = b.GetElementByID(ConstantData.SVGElementClass.TEXT, T.DataID)
//         )
//     }
//     if (- 1 != y.theActiveTextEditObjectID) {
//       if (
//         T = gListManager.GetObjectPtr(y.theActiveTextEditObjectID, !1),
//         !d
//       ) {
//         var M = gListManager.GetObjectPtr(T.DataID, !1),
//           P = null;
//         M &&
//           gListManager.ReplaceStdText(T, M.runtimeText.text, null, !0) &&
//           ((P = Utils1.DeepCopy(M.runtimeText)).text = ''),
//           gListManager.ResetActiveTextEditAfterUndo(P)
//       }
//       u &&
//         function (e) {
//           e &&
//             e.SetSelectedRange(u.start, u.end)
//         }(f = gListManager.svgDoc.GetActiveEdit())
//     }
//   }
//   return d ||
//     D
// }

// Collab.LockMessages = function () {
//   Collab.LockMessage = !0
// }

// Collab.AreMessagesLocked = function () {
//   return Collab.LockMessage
// }

// Collab.UnLockMessages = function () {
//   Collab.LockMessage = !1
// }

// Collab.BlockMessages = function () {
//   Collab.IsCollaborating() &&
//     (
//       Collab.ProcessMessage ||
//       (
//         Collab.ProcessUIOperation = !0,
//         null != Collab.Timer &&
//         (clearTimeout(Collab.Timer), Collab.Timer = null),
//         Collab.Timer = setTimeout(Collab.ProcessBurst, Collab.Delay)
//       )
//     )
// }

// Collab.ProcessBurst = function () {
//   null != Collab.Timer &&
//     (clearTimeout(Collab.Timer), Collab.Timer = null),
//     Collab.IsCollaborating() &&
//     (
//       Collab.LockMessage ||
//       (
//         Collab.ProcessUIOperation ? Collab.Timer = setTimeout(Collab.ProcessBurst, Collab.Delay) : Collab.ProcessUIOperation ||
//           Collab.UnBlockMessages()
//       )
//     )
// }

// Collab.UnBlockMessages = function () {
//   // if (
//   //   Collab.IsCollaborating() &&
//   //   !Collab.LockMessage &&
//   //   !Collab.ProcessMessage &&
//   //   (Collab.ProcessUIOperation = !1, null == Collab.Timer)
//   // ) {
//   //   var e = Collab.GetNextClientMessage();
//   //   e &&
//   //     (
//   //       gListManager.nudgeOpen &&
//   //       (
//   //         Collab.LockMessages(),
//   //         gListManager.CloseOpenNudge(),
//   //         Collab.UnLockMessages()
//   //       ),
//   //       Collab.ProcessMessage = !0,
//   //       Collab.PlayMessages(e),
//   //       Collab.ProcessMessage = !1
//   //     )
//   // }
// }

// Collab.GetNextClientMessage = function () {
//   var e = null;
//   return Collab.ClientMessageQueue.length &&
//     (e = Collab.ClientMessageQueue.shift()),
//     e
// }

// Collab.GetNextMessage = function () {
//   if (!Collab.AllowPlay) return null;
//   if (SDUI.AppSettings.UseBackplane) {
//     var e = SDUI.SDBackplane.Collaboration.GetNextMessage();
//     if (e && e.Data) return e.Data
//   }
//   return null
// }

// Collab.AddToClientMessageQueue = function (e) {
//   Collab.ClientMessageQueue.push(e);
//   var t = Collab.GetNextMessage();
//   t ? Collab.Load_Symbol(t, Collab.AddToClientMessageQueue) : Collab.ProcessUIOperation ||
//     Collab.UnBlockMessages()
// }

// Collab.MessageArrived = function (e) {
//   if (null == Collab.SymbolTimer) {
//     var t = Collab.GetNextMessage();
//     Collab.Load_Symbol(t, Collab.AddToClientMessageQueue)
//   }
// }

// Collab.ReSyncCollaboration = function (e) {
//   if (
//     'function' != typeof e &&
//     (e = function (e) {
//     }),
//     !0 === SDUI.AppSettings.UseBackplane
//   ) {
//     var t = SDUI.SDBackplane.GetAndApplySessionStatusAsync();
//     t.then(
//       (
//         function (t) {
//           if (0 == t) throw Error('Failed to re-initiate connection to backplane.');
//           e(!0)
//         }
//       )
//     ),
//       t.catch((function (t) {
//         e(!1)
//       }))
//   } else e(!1)
// }

// Collab.SecondaryToPrimary = function () {

//   console.log('SecondaryToPrimary');

//   Collab.objectStore &&
//     (
//       Collab.ProcessUIOperation &&
//       (
//         T3Gv.optManager.CancelModalOperation(),
//         T3Gv.optManager.TEUnregisterEvents(!0),
//         T3Gv.optManager.WorkAreaHammer &&
//         (
//           T3Gv.optManager.WorkAreaHammer.off('drag'),
//           T3Gv.optManager.WorkAreaHammer.off('dragend'),
//           T3Gv.optManager.WorkAreaHammer.off('dragstart'),
//           T3Gv.optManager.WorkAreaHammer.off('doubletap'),
//           T3Gv.optManager.WorkAreaHammer.off('mousemove'),
//           T3Gv.optManager.WorkAreaHammer.off('tap'),
//           T3Gv.optManager.WorkAreaHammer.off('doubletap'),
//           T3Gv.optManager.WorkAreaHammer.on('dragstart', Evt_WorkAreaHammerDragStart),
//           T3Gv.optManager.WorkAreaHammer.on('tap', Evt_WorkAreaHammerClick)
//         ),
//         T3Gv.optManager.linkParams = null,
//         T3Gv.optManager.dragBBoxList = [],
//         T3Gv.optManager.dragElementList = [],
//         T3Gv.optManager.moveList = null,
//         T3Gv.optManager.dragEnclosingRect = null,
//         T3Gv.optManager.dragGotMove = !1,
//         T3Gv.optManager.ResetAutoScrollTimer(),
//         Collab.ProcessUIOperation = !1
//       ),
//       Collab.CloseSecondaryEdit()
//     )
// }

// Collab.SetEditorToCollaborate = function (e) {
//   if ('boolean' != typeof e) throw Error('collabReady must be a boolean.');
//   if (SDUI.AppSettings.UseBackplane) return SDUI.SDBackplane.Collaboration.IsCollaborationLeader ? (
//     !0 === Collab.Secondary &&
//     (Collab.SecondaryToPrimary(), Collab.Secondary = !1),
//     Collab.Delay = Collab.PrimaryDelay,
//     Collab.AllowMessagePlayback(e)
//   ) : (
//     Collab.AllowMessagePlayback(e),
//     Collab.Delay = Collab.SecondaryDelay,
//     !0 === Collab.Secondary &&
//     !1 === e &&
//     (
//       Collab.SecondaryToPrimary(),
//       Collab.Delay = Collab.PrimaryDelay
//     ),
//     Collab.Secondary = e
//   ),
//     Collab.ProcessMessage = !1,
//     Collab.ProcessUIOperation = !1,
//     Collab.EditorID = SDUI.SDBackplane.ClientID,
//     gListManager.GetObjectPtr(gListManager.tedSessionBlockId, !1).EditorID = Collab.EditorID,
//     '' === ConstantData.DocumentContext.UserName &&
//     SDUI.Utils.GetUser(ConstantData.DocumentContext.UserId),
//     void $(document).on(
//       'SDUI.SDBackplane.Collab.MessageArrived',
//       (
//         function (e) {
//           Collab.Timer &&
//             Collab.UnBlockMessages()
//         }
//       )
//     )
// }

// Collab.SVGStore = []
// Collab.SVGRecordEvents = !1
// Collab.SVGEvent = function (e, t, a, r) {
//   this.BlockID = e,
//     this.EventType = t,
//     this.Frame = a,
//     this.Data = r
// }

// Collab.SendSVGEvent = function (e, t, a, r) {
//   if (Collab.SVGRecordEvents) {
//     var i = new Collab.SVGEvent(e, t, a, r);
//     Collab.SVGStore.push(i)
//   }
// }

// Collab.ReplaySVGEvents = function () {
//   var e,
//     t,
//     a,
//     r;
//   Collab.SVGRecordEvents = !1;
//   var i = ConstantData.CollabSVGEventTypes;
//   t = Collab.SVGStore.length;
//   var n;
//   e = 0;
//   var o = function () {
//     if (
//       a = Collab.SVGStore[e],
//       n = gListManager.svgObjectLayer.GetElementByID(a.BlockID),
//       r = gListManager.GetObjectPtr(a.BlockID, !1),
//       n
//     ) switch (a.EventType) {
//       case i.Object_Move:
//         n.SetPos(a.Frame.x, a.Frame.y);
//         break;
//       case i.Shape_Grow:
//         if (
//           (S = Utils1.DeepCopy(r)).trect = a.Data.trect,
//           S.Frame = Utils1.DeepCopy(a.Frame),
//           l = r.GetTable(!1)
//         ) {
//           var s = Utils1.DeepCopy(l);
//           gListManager.Table_Resize(S, l, s, a.Frame.width, a.Frame.height)
//         }
//         r.Resize(n, a.Frame, S, a.Data.action, a.Data.prevBBox);
//         break;
//       case i.Table_GrowColumn:
//         var l,
//           S = Utils1.DeepCopy(r);
//         (l = r.GetTable(!1)) &&
//           gListManager.Table_GrowColumn(S, l, a.Data.column, a.Data.theDeltaX, S.TextGrow, !1, !1, !1)
//     }
//     ++e < t &&
//       setTimeout(o, 25)
//   };
//   setTimeout(o, 25)
// }

// Collab.RecordSVGEvents = function () {
//   Collab.SVGRecordEvents = !0,
//     Collab.SVGStore = []
// }

// Collab.Cursors = []
// Collab.ColorRecords = new Map
// Collab.ClientRecord = function (e, t, a, r) {
//   this.ClientID = e,
//     this.PageID = t,
//     this.PageName = null,
//     this.Color = a,
//     this.TextColor = Collab.GetTextColor(a),
//     this.UserName = r,
//     this.DisplayName = r.split('@')[0],
//     this.Initial = r.charAt(0),
//     this.Node = null,
//     this.IsDuplicate = !1
// }

// Collab.GetTextColor = function (e) {
//   let t = Collab.Colors.indexOf(e);
//   return t >= 0 ? Collab.TextColors[t] : '#000000'
// }

// Collab.ClientColorRecord = function (e, t, a) {
//   this.ClientID = e,
//     this.UserName = t,
//     this.Color = a,
//     this.TextColor = Collab.GetTextColor(a)
// }

// Collab.Animation_Cursor = function (e, t, a, r, i) {
//   this.EditorID = e,
//     this.UserName = a,
//     this.DisplayName = i,
//     this.Color = r,
//     this.selectionArray = []
// }

// Collab.Animation_GetNextColor = function () {
//   var e = Collab.Colors[Collab.ColorIndex];
//   return Collab.ColorIndex = (Collab.ColorIndex + 1) % Collab.Colors.length,
//     e
// }

// Collab.GetColorRecord = function (e, t) {
//   let a = Collab.Colors.length,
//     r = t.charAt(0),
//     i = Collab.Animation_GetNextColor(),
//     n = [];
//   if (Collab.ColorRecords.has(r)) {
//     n = Collab.ColorRecords.get(r);
//     let t = n.find((t => t.ClientID === e));
//     if (null != t) return t;
//     let o = 0;
//     for (; o < a && null != n.find((e => e.Color === i));) i = Collab.Animation_GetNextColor(),
//       o++
//   }
//   let o = new Collab.ClientColorRecord(e, t, i);
//   return n.push(o),
//     Collab.ColorRecords.set(r, n),
//     o
// }

// Collab.Animation_GetCursorRecord = function (e) {
//   let t = e.EditorID,
//     a = SDUI.Commands.MainController.CollabPanelController.ClientList,
//     r = a.get(t);
//   if (null == r) return null;
//   if (!0 === r.IsDuplicate) {
//     let e;
//     a.forEach(
//       (
//         (t, a, i) => {
//           r.PageID === t.PageID &&
//             r.UserName === t.UserName &&
//             !1 === t.IsDuplicate &&
//             (e = t)
//         }
//       )
//     ),
//       e?.ClientID &&
//       (t = e.ClientID)
//   }
//   let i = Collab.Cursors.find((e => e.EditorID === t));
//   if (null == i) {
//     let a = Collab.GetColorRecord(t, e.UserName),
//       r = {
//         fontColor: a.TextColor
//       };
//     i = new Collab.Animation_Cursor(
//       t,
//       ConstantData.CursorTypes.Default,
//       e.UserName,
//       a.Color,
//       e.UserName.split('@')[0]
//     ),
//       Collab.Cursors.push(i);
//     SDUI.SDBackplane.Collaboration.GetUserCollaborationName(
//       t,
//       (
//         function (e) {
//           Collab.UpdateCursorDisplayName(t, e.CommandBody.UserCollaborationName)
//         }
//       )
//     );
//     var n = {
//       x: e.x,
//       y: e.y
//     };
//     SDUI.Commands.MainController.CollabOverlayController.AddUserCursor(
//       t,
//       Collab.GetCursorName(i),
//       a.Color,
//       ConstantData.CursorTypes.Default,
//       n,
//       null,
//       r
//     )
//   }
//   return i
// }

// Collab.GetCursorName = function (e) {
//   switch (
//   ConstantData.DocumentContext.UserSettings.UserNameDisplayMode
//   ) {
//     case Resources.CollabNamePreference.Email:
//       return e.UserName;
//     case Resources.CollabNamePreference.Initial:
//     case Resources.CollabNamePreference.DisplayName:
//     default:
//       return e.DisplayName
//   }
// }

// Collab.Animation_CursorMove = function (e) {
//   var t = Collab.Animation_GetCursorRecord(e);
//   if (t) {
//     var a = {
//       x: e.x,
//       y: e.y
//     };
//     SDUI.Commands.MainController.CollabOverlayController.MoveUserCursor(t.EditorID, a, e.Data.CursorType)
//   }
// }

// Collab.UpdateCursorNames = function () {
//   Collab.Cursors.forEach(
//     (
//       e => {
//         SDUI.Commands.MainController.CollabOverlayController.UpdateCursorName(e.EditorID, Collab.GetCursorName(e))
//       }
//     )
//   )
// }

// Collab.UpdateCursorDisplayName = function (e, t) {
//   let a = Collab.Cursors.find((t => t.EditorID === e)),
//     r = (
//       SDUI.Commands.MainController.CollabPanelController.ClientList.get(e)?.UserName,
//       Collab.Cursors.filter((e => {
//         e.UserName
//       }))
//     );
//   if (a && 0 === r.length) a.DisplayName !== t &&
//     (
//       a.DisplayName = t,
//       ConstantData.DocumentContext.UserSettings.UserNameDisplayMode === Resources.CollabNamePreference.DisplayName &&
//       SDUI.Commands.MainController.CollabOverlayController.UpdateCursorName(e, t)
//     );
//   else for (let a = 0; a < r.length; a++) {
//     const i = r[a];
//     i &&
//       i.DisplayName !== t &&
//       (
//         i.DisplayName = t,
//         ConstantData.DocumentContext.UserSettings.UserNameDisplayMode === Resources.CollabNamePreference.DisplayName &&
//         SDUI.Commands.MainController.CollabOverlayController.UpdateCursorName(e, t)
//       )
//   }
// }

// Collab.Animation_ChangeSelection = function (e) {
//   var t = Collab.Animation_GetCursorRecord(e);
//   if (null != t) {
//     var a = e.Data;
//     if (a) {
//       var r,
//         i,
//         n = a.length;
//       for (r = 0; r < n; r++) if ((i = a[r]) >= 0) {
//         var o = Collab.GetRemapList(e);
//         o &&
//           (i = Collab.GetRemappedID(o, i)),
//           (i = Collab.ValidateShapeID(i)) < 0 ? a.splice(r, 1) : a[r] = i
//       }
//     } else a = [];
//     n = a.length;
//     var s,
//       l,
//       S = t.selectionArray.length;
//     for (r = 0; r < S; r++) s = t.selectionArray[r],
//       (l = gListManager.GetObjectPtr(s, !1)) &&
//       a.indexOf(s) < 0 &&
//       (l.collabGlowColor = null, l.SetRuntimeEffects());
//     for (r = 0; r < n; r++) s = a[r],
//       (l = gListManager.GetObjectPtr(s, !1)) &&
//       l instanceof BaseDrawingObject &&
//       t.selectionArray.indexOf(s) < 0 &&
//       (l.collabGlowColor = t.Color, l.SetRuntimeEffects());
//     t.selectionArray = a
//   }
// }

// Collab.Animation_AllowSelectionMessage = function (e) {
//   return !(
//     Collab.IsSecondary() &&
//     null != Collab.objectStore &&
//     null != e &&
//     e > Collab.CURRENT_SEQ_OBJECT_ID
//   )
// }

// Collab.Animation_Message = function (e, t, a, r) {
//   this.x = e,
//     this.y = t,
//     this.MessageType = a,
//     this.Data = r,
//     this.EditorID = Collab.EditorID,
//     this.UserName = ConstantData.DocumentContext.UserName
// }

// Collab.Animation_BuildMessage = function (e, t, a, r) {
//   if (Collab.IsCollaborating()) {
//     let n = document.body.classList.contains('modal-open');
//     if ('' != ConstantData.DocumentContext.UserName && !n) {
//       var i = new Collab.Animation_Message(e, t, a, r);
//       SDUI.SDBackplane.Collaboration.SendAnimationMessage(i)
//     }
//   }
// }

// Collab.Animation_ReceiveMessage = function (e) {
//   var t = JSON.parse(e.AnimationData),
//     a = ConstantData.Collab_AnimationMessages;
//   switch (t.MessageType) {
//     case a.CursorMove:
//       Collab.Animation_CursorMove(t);
//       break;
//     case a.ChangeSelection:
//       Collab.Animation_ChangeSelection(t)
//   }
// }

// Collab.DeepCopyMessage = function (e) {
//   var t,
//     a;
//   if (null == e) return null;
//   var r = typeof e;
//   if (e instanceof Array) {
//     t = [];
//     var i = e.length;
//     for (a = 0; a < i; a++) t.push(Collab.DeepCopyMessage(e[a]));
//     return t
//   }
//   if ('string' === r || 'number' === r || 'boolean' === r || 'function' === r) return e;
//   if (e instanceof Blob) return e.slice();
//   if (e instanceof Uint8Array) return Collab.BufferToString(e);
//   if ('object' === r) {
//     for (var n in t = Array.isArray(e) ? [] : {
//     }, e) {
//       var o = e[n],
//         s = typeof o;
//       if (null == o) t[n] = o;
//       else if ('string' === s || 'number' === s || 'boolean' === s) t[n] = o;
//       else if (o instanceof Array) {
//         null == t[n] &&
//           (t[n] = []);
//         var l = o.length;
//         for (a = 0; a < l; a++) t[n].push(Collab.DeepCopyMessage(o[a]))
//       } else 'function' !== s &&
//         (t[n] = Collab.DeepCopyMessage(o))
//     }
//     return t
//   }
//   return null
// }

// Collab.JSONToArrayBuffer = function (e) {
//   var t,
//     a = 0;
//   for (byteArray = [], t = e[a]; void 0 !== t;) byteArray.push(t),
//     t = e[++a];
//   return new Uint8Array(byteArray)
// }

// export default Collab
