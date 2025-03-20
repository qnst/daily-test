import NvConstant from "../../Data/Constant/NvConstant";
import OptConstant from "../../Data/Constant/OptConstant";
import T3Gv from "../../Data/T3Gv";
import T3Util from "../../Util/T3Util";
import Utils2 from "../../Util/Utils2";
import ObjectUtil from "../Data/ObjectUtil";
import RulerUtil from "./RulerUtil";


class UIUtil {

  /**
   * Shows a contextual menu at a specified position
   * @param element - The DOM element or selector for the contextual menu
   * @param positionX - The X position where to show the dropdown
   * @param positionY - The Y position where to show the dropdown
   * @returns void
   */
  static ShowContextMenu(element, positionX, positionY) {
    // const self = this;

    // // Hide all currently visible dropdowns
    // TODO.Dropdowns.HideAllDropdowns();

    // // Load the placeholder content
    // this.GetHtmlPartialLoader().LoadPlaceholder(element, false, (success) => {
    //   // If loading was successful, disable dropdown links
    //   if (success === true) {
    //     self.DisableDropdownLinks(element);
    //   }

    //   // Setup the dropdown
    //   self.RebuildDropdown(element);
    //   self.Selection.EnableDisableButtons(element);
    //   self.Selection.HighlightDropdownSelection(element);

    //   // Show the dropdown at the specified position
    //   self.Dropdowns.ShowDropdown(element, positionX, positionY);
    // });
  }

  static ShowFrame(isShowFrame: boolean) {
    T3Util.Log('O.Opt ShowFrame - Input:', { isShowFrame });

    const isShowRulers = T3Gv.docUtil.docConfig.showRulers;

    if (!isShowRulers) {
      T3Util.Log('O.Opt ShowFrame - Output: Rulers are not shown');
      return;
    }

    // Double show frame details

    T3Util.Log('O.Opt ShowFrame - Output: Frame visibility set to', isShowFrame);
  }

  static UpdateDisplayCoordinates(dimensions, position, cursorType, drawingObject) {
    // T3Util.Log("O.Opt UpdateDisplayCoordinates - Input:", {
    //   dimensions,
    //   position,
    //   cursorType,
    //   drawingObject: drawingObject ? drawingObject.BlockID : null
    // });

    // Set default cursor type if not provided
    if (cursorType == null) {
      // cursorType = CollabOverlayContoller.CursorTypes.Default;
      cursorType = "DEFAULT";
    }

    // // Handle collaboration cursor movement
    // if (Collab.IsCollaborating() && position) {
    //   const currentTime = Date.now();
    //   if (currentTime - Collab.MoveTimestamp > Collab.MoveDelay) {
    //     const message = {
    //       CursorType: cursorType
    //     };
    //     Collab.Animation_BuildMessage(
    //       position.x,
    //       position.y,
    //       NvConstant.Collab_AnimationMessages.CursorMove,
    //       message
    //     );
    //     Collab.MoveTimestamp = currentTime;
    //   }
    // }

    // Update ruler displays if rulers are enabled
    if (T3Gv.docUtil.docConfig.showRulers) {
      let showFractionalInches = 0;
      let showFeetAsInches = 0;
      const useFeet = T3Gv.docUtil.rulerConfig.useInches &&
        T3Gv.docUtil.rulerConfig.units === NvConstant.RulerUnit.Feet;

      // Configure display options for feet/inch mode
      if (useFeet) {
        showFractionalInches = showFeetAsInches = NvConstant.DimensionFlags.ShowFractionalInches;
        if (drawingObject) {
          showFeetAsInches = Utils2.SetFlag(
            showFractionalInches,
            NvConstant.DimensionFlags.ShowFeetAsInches,
            (drawingObject.Dimensions & NvConstant.DimensionFlags.ShowFeetAsInches) > 0
          );
        }
      }

      // Update dimension display
      if (dimensions) {
        const xLength = RulerUtil.GetLengthInRulerUnits(dimensions.x, false, T3Gv.docUtil.rulerConfig.originx, showFractionalInches);
        const yLength = RulerUtil.GetLengthInRulerUnits(dimensions.y, false, T3Gv.docUtil.rulerConfig.originy, showFractionalInches);
        const width = RulerUtil.GetLengthInRulerUnits(dimensions.width, false, null, showFeetAsInches);
        const height = RulerUtil.GetLengthInRulerUnits(dimensions.height, false, null, showFeetAsInches);

        // Helper function to format number values for display (assuming it's defined elsewhere)
        const formatValue = (value) => value ? value : "";

        // // Update UI controls with the dimension values
        // const workArea = Resources.Controls.WorkArea;

        // const leftEdit = workArea.LeftEdit;
        // leftEdit.GetControl();
        // if (leftEdit.Control) {
        //   leftEdit.Control[0].value = formatValue(NumberToString(xLength, useFeet));
        // }

        // const topEdit = workArea.TopEdit;
        // topEdit.GetControl();
        // if (topEdit.Control) {
        //   topEdit.Control[0].value = formatValue(NumberToString(yLength, useFeet));
        // }

        // const widthEdit = workArea.WidthEdit;
        // widthEdit.GetControl();
        // if (widthEdit.Control) {
        //   widthEdit.Control[0].value = formatValue(NumberToString(width, useFeet));
        // }

        // const heightEdit = workArea.HeightEdit;
        // heightEdit.GetControl();
        // if (heightEdit.Control) {
        //   heightEdit.Control[0].value = formatValue(NumberToString(height, useFeet));
        // }
      }

      // Constrain position to document bounds
      if (position) {
        position.x = Math.max(0, position.x);
        position.y = Math.max(0, position.y);

        const sessionBlock = ObjectUtil.GetObjectPtr(T3Gv.opt.sdDataBlockId, false);
        position.x = Math.min(sessionBlock.dim.x, position.x);
        position.y = Math.min(sessionBlock.dim.y, position.y);
      }
    }

    // T3Util.Log("O.Opt UpdateDisplayCoordinates - Output: Coordinates updated in UI");
  }

  static ShowXY(showCoordinates) {
    // T3Util.Log("O.Opt ShowXY - Input:", { showCoordinates });
    // Show the x and y coordinates of the mouse pointer
    // T3Util.Log("O.Opt ShowXY - Output: Coordinates display updated");
  }

}

export default UIUtil
