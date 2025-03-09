

import GlobalData from '../../Data/T3Gv'

import Resources from '../../Data/Resources'
import Commands from './ToolOpt'
import ConstantData from '../../Data/ConstantData'

// DO NOT USE THIS CLASS
class ActiveSelection {

  // SetFormatPainterHighlight(e) {
  //   // var t = Resources.Controls.Ribbon_Home;
  //   // e ? this.HighlightControl(t.FormatPainter.Id) : this.UnHighlightControl(t.FormatPainter.Id)
  // }

  /**
   * Sets the current selection tool and manages related states
   * @param toolType - The type of selection tool to set
   * @param isSticky - Whether the tool should be sticky
   */
  SetSelectionTool(toolType, isSticky) {
    console.log('O.ActiveSelection.SetSelectionTool - Input:', { toolType, isSticky });

    // Initial render of all SVG selection states
    T3Gv.optManager.RenderAllSVGSelectionStates();

    // Check if we're currently using the wall tool
    const isCurrentlyWallTool = ConstantData.DocumentContext.SelectionTool === Resources.Tools.Tool_Wall;

    // Update context with new tool settings
    ConstantData.DocumentContext.SelectionTool = toolType;
    ConstantData.DocumentContext.SelectionToolSticky = isSticky;
    ConstantData.DocumentContext.SelectionToolMultiple = false;

    // Additional handling for wall tool transitions
    if (toolType !== Resources.Tools.Tool_Wall) {
      ConstantData.DocumentContext.UsingWallTool = false;

      // If we were previously using the wall tool, re-render all states
      if (isCurrentlyWallTool) {
        T3Gv.optManager.RenderAllSVGSelectionStates();
      }
    }

    console.log('O.ActiveSelection.SetSelectionTool - Output:', {
      updatedTool: ConstantData.DocumentContext.SelectionTool,
      isSticky: ConstantData.DocumentContext.SelectionToolSticky,
      usingWallTool: ConstantData.DocumentContext.UsingWallTool
    });
  }

  GetSelectionContext() {
    return Commands.MainController.Shapes.GetSelectionContext()
  }
}

export default ActiveSelection

