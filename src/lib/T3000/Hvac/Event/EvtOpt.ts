

import ToolOpt from "../Opt/Tool/ToolOpt"
import $ from 'jquery'

class EvtOpt {

  static toolOpt = new ToolOpt();

  /**
   * Initializes all UI control event bindings when the document is ready.
   * This method serves as the main entry point for setting up all tool interactions.
   */
  BindElemCtlEvent() {
    $(document).ready(() => {
      // Selection and basic tools
      this.BindSelectEvent();
      this.BindLibraryEvent();

      // Drawing tools
      this.BindLineEvent();
      this.BindLine1Event();
      this.BindWallEvent();

      // Shape creation tools
      this.BindRectEvent();
      this.BindOvalEvent();
      this.BindImageEvent();
      this.BindCircleEvent();
      this.BindTextEvent();

      // Arrow tools
      this.BindArrREvent();
      this.BindArrLEvent();
      this.BindArrTEvent();
      this.BindArrBEvent();

      // Transformation tools
      this.BindRoate45Event();
      this.BindRoate90Event();

      // Alignment tools
      this.BindAlignLeftEvent();
      this.BindAlignCentersEvent();
      this.BindAlignTopsEvent();
      this.BindAlignMiddlesEvent();
      this.BindAlignBottomsEvent();
      this.BindAlignRightsEvent();

      // Grouping tools
      this.BindGroupEvent();
      this.BindUngroupEvent();

      // Flip operations
      this.BindFlipHorizontalEvent();
      this.BindFlipVerticalEvent();

      // Size matching tools
      this.BindSameHeightEvent();
      this.BindSameWidthEvent();
      this.BindSameBothEvent();

      // Z-order controls
      this.BindBringToFrontEvent();
      this.BindSendToBackEvent();

      // Clipboard operations
      this.BindCopyEvent();
      this.BindCutEvent();
      this.BindPasteEvent();
      this.BindDeleteEvent();

      // History operations
      this.BindUndoEvent();
      this.BindRedoEvent();

      // File and utility operations
      this.BindSaveEvent();
      this.BindDuplicateEvent();
      this.BindClearEvent();

      // Measurement tools
      this.BindMeasureEvent();
      this.BindAreaMeasureEvent();

      this.BindLibSelectEvent();
      this.BindLibBoxEvent();
      this.BindLibTextEvent();
      this.BindLibIconEvent();
      this.BindLibSwitchIconEvent();
      this.BindLibLedEvent();
      this.BindLibRoomHumidityEvent();
      this.BindLibRoomTemperatureEvent();
      this.BindLibTemperatureEvent();
      this.BindLibBoilerEvent();
      this.BindLibHeatPumpEvent();
      this.BindLibPumpEvent();
      this.BindLibValueThreeWayEvent();
      this.BindLibValueTwoWayEvent();
      this.BindLibDuctEvent();
      this.BindLibFanEvent();
      this.BindLibCoolingCoilEvent();
      this.BindLibHeatingCoilEvent();
      this.BindLibFilterEvent();
      this.BindLibHumidifierEvent();
      this.BindLibHumidityEvent();
      this.BindLibPressureEvent();
      this.BindLibDamperEvent();
      this.BindLibTemperature2Event();
      this.BindLibThermalWheelEvent();
      this.BindLibEnthalpyEvent();
      this.BindLibFlowEvent();
      this.BindLibGuageEvent();
      this.BindLibDialEvent();
      this.BindLibValueEvent();
      this.BindLibIconWithTitleEvent();
      this.BindLibSetBackgroundColorEvent();
      this.BindLibSetBackgroundImageEvent();
      this.BindLibImportSVGSymbolEvent();
      this.BindLibLockEvent();
      this.BindLibAddNoteEvent();
      this.BindLibAddCommentEvent();
      this.BindLibHyperlinkEvent();

    });
  }

  /**
   * Binds the click event handler to the select button.
   * When clicked, activates the selection tool.
   */
  BindSelectEvent() {
    $("#btn_try_select").on("click", (event) => {
      EvtOpt.toolOpt.SelectAct(event);
    });
  }

  /**
   * Binds the click event handler to the library button.
   * When clicked, activates symbol click and drag-drop functionality.
   */
  BindLibraryEvent() {
    $("#btn_try_library").on("click", (event) => {
      // EvtOpt.toolOpt.ClickSymbolAct(event);
      EvtOpt.toolOpt.DragDropSymbolAct(event);
    });
  }

  /**
   * Binds the click event handler to the line drawing tool.
   * When clicked, activates the line drawing functionality.
   */
  BindLineEvent() {
    $("#btn_try_line").on("pointerdown", (event) => {
      EvtOpt.toolOpt.ToolLineAct(event);
    });
  }

  /**
   * Binds the click event handler to the alternative line drawing tool.
   * When clicked, activates the line drawing functionality.
   */
  BindLine1Event() {
    $("#btn_try_line1").on("pointerdown", (event) => {
      EvtOpt.toolOpt.ToolLineAct(event);
    });
  }

  /**
   * Binds the click event handler to the wall drawing tool.
   * When clicked, activates wall drawing functionality.
   */
  BindWallEvent() {
    $("#btn_try_wall").on("pointerdown", (event) => {
      EvtOpt.toolOpt.DrawWall(event);
    });
  }

  // Shape creation tools

  /**
   * Binds the click event handler to the rectangle tool.
   * When clicked, creates a rectangle shape.
   */
  BindRectEvent() {
    $("#btn_try_Rect").on("pointerdown", (event) => {
      EvtOpt.toolOpt.StampShapeFromToolAct(event, 2);
    });
  }

  /**
   * Binds the click event handler to the oval tool.
   * When clicked, creates an oval shape.
   */
  BindOvalEvent() {
    $("#btn_try_Oval").on("pointerdown", (event) => {
      EvtOpt.toolOpt.StampShapeFromToolAct(event, 4);
    });
  }

  /**
   * Binds the click event handler to the image insertion tool.
   * When clicked, allows inserting an image.
   */
  BindImageEvent() {
    $("#btn_try_Image").on("pointerdown", (event) => {
      EvtOpt.toolOpt.StampShapeFromToolAct(event, 1);
    });
  }

  /**
   * Binds the click event handler to the circle tool.
   * When clicked, creates a circle shape.
   */
  BindCircleEvent() {
    $("#btn_try_Circ").on("pointerdown", (event) => {
      EvtOpt.toolOpt.StampShapeFromToolAct(event, 9);
    });
  }

  /**
   * Binds the click event handler to the text tool.
   * When clicked, creates a text label.
   */
  BindTextEvent() {
    $("#btn_try_Text").on("pointerdown", (event) => {
      EvtOpt.toolOpt.StampShapeFromToolAct(event, 'textLabel');
    });
  }

  // Arrow tools

  /**
   * Binds the click event handler to the right arrow tool.
   * When clicked, creates a right-pointing arrow.
   */
  BindArrREvent() {
    $("#btn_try_ArrR").on("pointerdown", (event) => {
      EvtOpt.toolOpt.StampShapeFromToolAct(event, 10);
    });
  }

  /**
   * Binds the click event handler to the left arrow tool.
   * When clicked, creates a left-pointing arrow.
   */
  BindArrLEvent() {
    $("#btn_try_ArrL").on("pointerdown", (event) => {
      EvtOpt.toolOpt.StampShapeFromToolAct(event, 11);
    });
  }

  /**
   * Binds the click event handler to the top arrow tool.
   * When clicked, creates an up-pointing arrow.
   */
  BindArrTEvent() {
    $("#btn_try_ArrT").on("pointerdown", (event) => {
      EvtOpt.toolOpt.StampShapeFromToolAct(event, 12);
    });
  }

  /**
   * Binds the click event handler to the bottom arrow tool.
   * When clicked, creates a down-pointing arrow.
   */
  BindArrBEvent() {
    $("#btn_try_ArrB").on("pointerdown", (event) => {
      EvtOpt.toolOpt.StampShapeFromToolAct(event, 13);
    });
  }

  // Rotation tools

  /**
   * Binds the click event handler to the 45° rotation tool.
   * When clicked, rotates selected element(s) by 45 degrees.
   */
  BindRoate45Event() {
    $("#btn_try_Roate45").on("pointerdown", (event) => {
      EvtOpt.toolOpt.RotateAct(event, 45);
    });
  }

  /**
   * Binds the click event handler to the 90° rotation tool.
   * When clicked, rotates selected element(s) by 90 degrees.
   */
  BindRoate90Event() {
    $("#btn_try_Roate90").on("pointerdown", (event) => {
      EvtOpt.toolOpt.RotateAct(event, 90);
    });
  }

  // Alignment tools

  /**
   * Binds the click event handler to the left alignment tool.
   * When clicked, aligns selected elements to their leftmost edges.
   */
  BindAlignLeftEvent() {
    $("#btn_try_Align_lefts").on("pointerdown", (event) => {
      EvtOpt.toolOpt.ShapeAlignAct("lefts");
    });
  }

  /**
   * Binds the click event handler to the center alignment tool.
   * When clicked, aligns selected elements to their horizontal centers.
   */
  BindAlignCentersEvent() {
    $("#btn_try_Align_centers").on("pointerdown", (event) => {
      EvtOpt.toolOpt.ShapeAlignAct("centers");
    });
  }

  /**
   * Binds the click event handler to the top alignment tool.
   * When clicked, aligns selected elements to their top edges.
   */
  BindAlignTopsEvent() {
    $("#btn_try_Align_tops").on("pointerdown", (event) => {
      EvtOpt.toolOpt.ShapeAlignAct("tops");
    });
  }

  /**
   * Binds the click event handler to the middle alignment tool.
   * When clicked, aligns selected elements to their vertical centers.
   */
  BindAlignMiddlesEvent() {
    $("#btn_try_Align_middles").on("pointerdown", (event) => {
      EvtOpt.toolOpt.ShapeAlignAct("middles");
    });
  }

  /**
   * Binds the click event handler to the bottom alignment tool.
   * When clicked, aligns selected elements to their bottom edges.
   */
  BindAlignBottomsEvent() {
    $("#btn_try_Align_bottoms").on("pointerdown", (event) => {
      EvtOpt.toolOpt.ShapeAlignAct("bottoms");
    });
  }

  /**
   * Binds the click event handler to the right alignment tool.
   * When clicked, aligns selected elements to their right edges.
   */
  BindAlignRightsEvent() {
    $("#btn_try_Align_rights").on("pointerdown", (event) => {
      EvtOpt.toolOpt.ShapeAlignAct("rights");
    });
  }

  // Grouping tools

  /**
   * Binds the click event handler to the group tool.
   * When clicked, groups selected elements together.
   */
  BindGroupEvent() {
    $("#btn_try_Group").on("pointerdown", (event) => {
      EvtOpt.toolOpt.GroupAct(event);
    });
  }

  /**
   * Binds the click event handler to the ungroup tool.
   * When clicked, ungroups the selected group into individual elements.
   */
  BindUngroupEvent() {
    $("#btn_try_UnGroup").on("pointerdown", (event) => {
      EvtOpt.toolOpt.UnGroupAct(event);
    });
  }

  // Flip tools

  /**
   * Binds the click event handler to the horizontal flip tool.
   * When clicked, flips selected element(s) horizontally.
   */
  BindFlipHorizontalEvent() {
    $("#btn_try_Flip_Horizontal").on("pointerdown", (event) => {
      EvtOpt.toolOpt.ShapeFlipHorizontalAct(event);
    });
  }

  /**
   * Binds the click event handler to the vertical flip tool.
   * When clicked, flips selected element(s) vertically.
   */
  BindFlipVerticalEvent() {
    $("#btn_try_Flip_Vertical").on("pointerdown", (event) => {
      EvtOpt.toolOpt.ShapeFlipVerticalAct(event);
    });
  }

  // Size matching tools

  /**
   * Binds the click event handler to the same height tool.
   * When clicked, makes selected elements the same height.
   */
  BindSameHeightEvent() {
    $("#btn_try_Same_Height").on("pointerdown", (event) => {
      EvtOpt.toolOpt.MakeSameSizeAct(event, 1);
    });
  }

  /**
   * Binds the click event handler to the same width tool.
   * When clicked, makes selected elements the same width.
   */
  BindSameWidthEvent() {
    $("#btn_try_Same_Width").on("pointerdown", (event) => {
      EvtOpt.toolOpt.MakeSameSizeAct(event, 2);
    });
  }

  /**
   * Binds the click event handler to the same size tool.
   * When clicked, makes selected elements the same width and height.
   */
  BindSameBothEvent() {
    $("#btn_try_Same_Both").on("pointerdown", (event) => {
      EvtOpt.toolOpt.MakeSameSizeAct(event, 3);
    });
  }

  // Z-order tools

  /**
   * Binds the click event handler to the bring to front tool.
   * When clicked, brings selected element(s) to the front.
   */
  BindBringToFrontEvent() {
    $("#btn_try_BringToFront").on("pointerdown", (event) => {
      EvtOpt.toolOpt.ShapeBringToFrontAct(event);
    });
  }

  /**
   * Binds the click event handler to the send to back tool.
   * When clicked, sends selected element(s) to the back.
   */
  BindSendToBackEvent() {
    $("#btn_try_SendToBack").on("pointerdown", (event) => {
      EvtOpt.toolOpt.ShapeSendToBackAct(event);
    });
  }

  // Clipboard operations

  /**
   * Binds the click event handler to the paste tool.
   * When clicked, pastes previously copied or cut element(s).
   */
  BindPasteEvent() {
    $("#btn_try_Paste").on("pointerdown", (event) => {
      EvtOpt.toolOpt.PasteAct(event);
    });
  }

  /**
   * Binds the click event handler to the copy tool.
   * When clicked, copies selected element(s).
   */
  BindCopyEvent() {
    $("#btn_try_Copy").on("pointerdown", (event) => {
      EvtOpt.toolOpt.CopyAct(event);
    });
  }

  /**
   * Binds the click event handler to the cut tool.
   * When clicked, cuts selected element(s).
   */
  BindCutEvent() {
    $("#btn_try_Cut").on("pointerdown", (event) => {
      EvtOpt.toolOpt.CutAct(event);
    });
  }

  /**
   * Binds the click event handler to the delete tool.
   * When clicked, deletes selected element(s).
   */
  BindDeleteEvent() {
    $("#btn_try_Delete").on("pointerdown", (event) => {
      EvtOpt.toolOpt.DeleteAct(event);
    });
  }

  // History operations

  /**
   * Binds the click event handler to the undo tool.
   * When clicked, undoes the last action.
   */
  BindUndoEvent() {
    $("#btn_try_Undo").on("pointerdown", (event) => {
      EvtOpt.toolOpt.UndoAct(event);
    });
  }

  /**
   * Binds the click event handler to the redo tool.
   * When clicked, redoes the last undone action.
   */
  BindRedoEvent() {
    $("#btn_try_Redo").on("pointerdown", (event) => {
      EvtOpt.toolOpt.RedoAct(event);
    });
  }

  // File operations

  /**
   * Binds the click event handler to the save tool.
   * When clicked, saves the current work.
   */
  BindSaveEvent() {
    $("#btn_try_Save").on("pointerdown", (event) => {
      EvtOpt.toolOpt.CommitFilePickerSelectionAct(event);
    });
  }

  /**
   * Binds the click event handler to the duplicate tool.
   * When clicked, duplicates selected element(s).
   */
  BindDuplicateEvent() {
    $("#btn_try_Duplicate").on("pointerdown", (event) => {
      EvtOpt.toolOpt.DuplicateAct(event);
    });
  }

  /**
   * Binds the click event handler to the clear tool.
   * When clicked, clears local storage.
   */
  BindClearEvent() {
    $("#btn_try_Clear").on("pointerdown", (event) => {
      localStorage.clear();
    });
  }

  // Measurement tools

  /**
   * Binds the click event handler to the measure distance tool.
   * When clicked, allows measuring distance between points.
   */
  BindMeasureEvent() {
    $("#btn_try_Measure").on("pointerdown", (event) => {
      EvtOpt.toolOpt.MeasureDistanceAct(event);
    });
  }

  /**
   * Binds the click event handler to the measure area tool.
   * When clicked, allows measuring the area of a region.
   */
  BindAreaMeasureEvent() {
    $("#btn_try_AreaMeasure").on("pointerdown", (event) => {
      EvtOpt.toolOpt.MeasureAreaAct(event);
    });
  }

  BindLibSelectEvent() {
    $("#btn_try_Lib_Select").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibSelectAct(event);
    });
  }

  BindLibBoxEvent() {
    $("#btn_try_Lib_Box").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("Box", true);
    });
  }

  BindLibTextEvent() {
    $("#btn_try_Lib_Text").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("Text", true);
    });
  }

  BindLibIconEvent() {
    $("#btn_try_Lib_Icon").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("Icon", true);
    });
  }

  BindLibSwitchIconEvent() {
    $("#btn_try_Lib_SwitchIcon").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("SwitchIcon", true);
    });
  }

  BindLibLedEvent() {
    $("#btn_try_Lib_Led").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("Led", true);
    });
  }

  BindLibRoomHumidityEvent() {
    $("#btn_try_Lib_RoomHumidity").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("RoomHumidity", true);
    });
  }

  BindLibRoomTemperatureEvent() {
    $("#btn_try_Lib_RoomTemperature").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("RoomTemperature", true);
    });
  }

  BindLibTemperatureEvent() {
    $("#btn_try_Lib_Temperature").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("Temperature", true);
    });
  }

  BindLibBoilerEvent() {
    $("#btn_try_Lib_Boiler").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("Boiler", true);
    });
  }

  BindLibHeatPumpEvent() {
    $("#btn_try_Lib_HeatPump").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("HeatPump", true);
    });
  }

  BindLibPumpEvent() {
    $("#btn_try_Lib_Pump").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("Pump", true);
    });
  }

  BindLibValueThreeWayEvent() {
    $("#btn_try_Lib_ValueThreeWay").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("ValueThreeWay", true);
    });
  }

  BindLibValueTwoWayEvent() {
    $("#btn_try_Lib_ValueTwoWay").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("ValueTwoWay", true);
    });
  }

  BindLibDuctEvent() {
    $("#btn_try_Lib_Duct").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("Duct", true);
    });
  }

  BindLibFanEvent() {
    $("#btn_try_Lib_Fan").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("Fan", true);
    });
  }

  BindLibCoolingCoilEvent() {
    $("#btn_try_Lib_CoolingCoil").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("CoolingCoil", true);
    });
  }

  BindLibHeatingCoilEvent() {
    $("#btn_try_Lib_HeatingCoil").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("HeatingCoil", true);
    });
  }

  BindLibFilterEvent() {
    $("#btn_try_Lib_Filter").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("Filter", true);
    });
  }

  BindLibHumidifierEvent() {
    $("#btn_try_Lib_Humidifier").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("Humidifier", true);
    });
  }

  BindLibHumidityEvent() {
    $("#btn_try_Lib_Humidity").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("Humidity", true);
    });
  }

  BindLibPressureEvent() {
    $("#btn_try_Lib_Pressure").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("Pressure", true);
    });
  }

  BindLibDamperEvent() {
    $("#btn_try_Lib_Damper").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("Damper", true);
    });
  }

  BindLibTemperature2Event() {
    $("#btn_try_Lib_Temperature2").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("Temperature2", true);
    });
  }

  BindLibThermalWheelEvent() {
    $("#btn_try_Lib_ThermalWheel").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("ThermalWheel", true);
    });
  }

  BindLibEnthalpyEvent() {
    $("#btn_try_Lib_Enthalpy").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("Enthalpy", true);
    });
  }

  BindLibFlowEvent() {
    $("#btn_try_Lib_Flow").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("Flow", true);
    });
  }

  BindLibGuageEvent() {
    $("#btn_try_Lib_Guage").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("Guage", true);
    });
  }

  BindLibDialEvent() {
    $("#btn_try_Lib_Dial").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("Dial", true);
    });
  }

  BindLibValueEvent() {
    $("#btn_try_Lib_Value").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("Value", true);
    });
  }

  BindLibIconWithTitleEvent() {
    $("#btn_try_Lib_IconWithTitle").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibToolShape("IconWithTitle", true);
    });
  }

  BindLibSetBackgroundColorEvent() {
    $("#btn_try_Lib_SetBackgroundColor").on("pointerdown", (event) => {
      // EvtOpt.toolOpt.LibSetBackgroundColorAct("#20b2aa");
      EvtOpt.toolOpt.LibSetBackgroundColorAct("#ffffff");
    });
  }

  BindLibSetBackgroundImageEvent() {
    $("#btn_try_Lib_SetBackgroundImage").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibSetBackgroundImageAct(event, false);
    });
  }

  BindLibImportSVGSymbolEvent() {
    $("#btn_try_Lib_ImportSVGSymbol").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibImportSVGSymbolAct(event);
    });
  }

  BindLibLockEvent() {
    $("#btn_try_Lib_Lock").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibLockAct(event);
    });
  }

  BindLibAddNoteEvent() {
    $("#btn_try_Lib_AddNote").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibAddNoteAct(event);
    });
  }

  BindLibAddCommentEvent() {
    $("#btn_try_Lib_AddComment").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibAddCommentAct(event);
    });
  }

  BindLibHyperlinkEvent() {
    $("#btn_try_Lib_Hyperlink").on("pointerdown", (event) => {
      EvtOpt.toolOpt.LibHyperlinkAct(event);
    });
  }
}

export default EvtOpt
