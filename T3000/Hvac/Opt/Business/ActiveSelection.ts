

import GlobalData from '../../Data/GlobalData'

import Resources from '../../Data/Resources'
import Commands from './Commands'
import ConstantData from '../../Data/ConstantData'

class ActiveSelection {

  SetFormatPainterHighlight(e) {
    // var t = Resources.Controls.Ribbon_Home;
    // e ? this.HighlightControl(t.FormatPainter.Id) : this.UnHighlightControl(t.FormatPainter.Id)
  }

  SetSelectionTool(e, t) {

    GlobalData.optManager.RenderAllSVGSelectionStates()

    // console.log('SetSelectionTool 1', e, t);
    var a = ConstantData.DocumentContext.SelectionTool === Resources.Tools.Tool_Wall;
    ConstantData.DocumentContext.SelectionTool = e,
      ConstantData.DocumentContext.SelectionToolSticky = t,
      ConstantData.DocumentContext.SelectionToolMultiple = !1,
      e !== Resources.Tools.Tool_Wall &&
      (
        ConstantData.DocumentContext.UsingWallTool = !1,
        a &&
        GlobalData.optManager.RenderAllSVGSelectionStates()
      );
  }

  GetSelectionContext() {
    return Commands.MainController.Shapes.GetSelectionContext()
  }
}

export default ActiveSelection

