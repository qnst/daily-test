
import Globals from "../../Data/Globals";
import Resources from '../../Data/Resources';
import GlobalData from '../../Data/GlobalData';
import $ from 'jquery'

import ConstantData from '../../Data/ConstantData'


class DocumentController {

  public documentConfig: any;
  public StandardRulers: any;

  constructor() {
    this.documentConfig = {
      showRulers: Globals.DocumentToolbarOptions[0].value,
      showGrid: Globals.DocumentToolbarOptions[1].value,
      enableSnap: Globals.DocumentToolbarOptions[2].value,
      centerSnap: Globals.DocumentToolbarOptions[3].value,
      zoom: Globals.DocumentToolbarOptions[4].value,
      zoomLevels: Globals.DocumentToolbarOptions[5].value,
      scale: Globals.DocumentToolbarOptions[6].value,
      showPageDivider: Globals.DocumentToolbarOptions[7].value,
      spellCheck: Globals.DocumentToolbarOptions[8].value,
      spellDict: Globals.DocumentToolbarOptions[9].value,
      spellFlags: Globals.DocumentToolbarOptions[10].value,
      printAllPages: !1,
      includeLinks: !1,
      snapToShapes: !1
    };

    // this.StandardRulers = [
    //   {
    //     useInches: !0,
    //     majorScale: 1,
    //     units: Resources.RulerUnits.SED_Inches,
    //     nTics: 12,
    //     nGrid: 12,
    //     nMid: 1,
    //     dp: 2
    //   },
    //   {
    //     useInches: !0,
    //     majorScale: 4,
    //     units: Resources.RulerUnits.SED_Feet,
    //     nTics: 12,
    //     nGrid: 12,
    //     nMid: 1,
    //     dp: 2
    //   },
    //   {
    //     useInches: !1,
    //     majorScale: 1,
    //     units: Resources.RulerUnits.SED_Cm,
    //     nTics: 5,
    //     nGrid: 5,
    //     nMid: 0,
    //     dp: 1
    //   },
    //   {
    //     useInches: !1,
    //     majorScale: 0.5,
    //     units: Resources.RulerUnits.SED_M,
    //     nTics: 5,
    //     nGrid: 5,
    //     nMid: 0,
    //     dp: 2
    //   },
    //   {
    //     useInches: !0,
    //     majorScale: 8,
    //     units: Resources.RulerUnits.SED_Feet,
    //     nTics: 12,
    //     nGrid: 12,
    //     nMid: 1,
    //     dp: 2
    //   },
    //   {
    //     useInches: !1,
    //     majorScale: 1,
    //     units: Resources.RulerUnits.SED_M,
    //     nTics: 5,
    //     nGrid: 5,
    //     nMid: 0,
    //     dp: 2
    //   },
    //   {
    //     useInches: !0,
    //     majorScale: 2,
    //     units: Resources.RulerUnits.SED_Feet,
    //     nTics: 12,
    //     nGrid: 12,
    //     nMid: 1,
    //     dp: 2
    //   },
    //   {
    //     useInches: !1,
    //     majorScale: 25,
    //     units: Resources.RulerUnits.SED_Cm,
    //     nTics: 5,
    //     nGrid: 5,
    //     nMid: 0,
    //     dp: 1
    //   }
    // ];
  }

  ZoomInandOut = function (e, t) {
    var a,
      r = 0.25,
      i = GlobalData.docHandler.GetZoomFactor();
    if (e) {
      if (i >= 4) return;
      (a = Math.ceil(i / r) * r) === i &&
        (a = i + 0.25),
        a > 4 &&
        (a = 4)
    } else {
      if (i <= 0.25) return;
      (a = Math.floor(i / r) * r) === i &&
        (a = i - 0.25),
        a < 0.25 &&
        (a = 0.25)
    }
    this.SetZoomLevel(100 * a, t)
  }

  SetZoomLevel = function (e, t) {
    e <= 0 ||
      this.inZoomIdle ||
      GlobalData.optManager &&
      GlobalData.optManager.SetDocumentScale(e / 100, t)
  }

  SetZoomLevelByIndex = function (e) {
    e < 0 ||
      e >= this.documentConfig.zoomLevels.length ||
      (
        this.documentConfig.zoom = e,
        GlobalData.optManager &&
        GlobalData.optManager.SetDocumentScale(this.documentConfig.zoomLevels[e] / 100)
      )
  }

  IdleZoomControls = function () {
    var e = $('#' + Resources.Controls.WA_DocumentToolbar.Zoom.Id),
      t = Math.round(100 * GlobalData.docHandler.GetZoomFactor());
    GlobalData.docHandler.GetSizeToFit();
    this.inZoomIdle = !0,
      e.val(t).change(),
      this.inZoomIdle = !1
  }

}

// console.log('DocumentController', Resources);


export default DocumentController
