


import RulerSettings from '../Model/RulerSettings';
import $ from 'jquery';
import GlobalData from '../Data/GlobalData';
import DefaultEvt from '../Event/DefaultEvt';
import Document from '../Basic/Basic.Document';
import Globals from '../Data/Globals';
import FileParser from '../Data/FileParser';
// import Global from '../Basic/Basic.Global';
import '../Helper/HammerTest2';
import '../Helper/pathseg';
import Element from '../Basic/Basic.Element';
import Utils1 from '../Helper/Utils1';
import Utils2 from '../Helper/Utils2';
import Utils3 from '../Helper/Utils3';
import Resources from '../Data/Resources'
import ListManager from '../Data/ListManager'
import ConstantData from '../Data/ConstantData'

class DocHandler {

  public documentConfig: any;
  public rulerSettings: RulerSettings;
  public workAreaID: any;
  public svgAreaID: any;
  public hRulerAreaID: any;
  public vRulerAreaID: any;
  public cRulerAreaID: any;
  public svgDoc: any;
  public hRulerDoc: any;
  public vRulerDoc: any;
  public rulerVis: any;
  public gridVis: any;
  public gridLayer: any;
  public pageDividerLayer: any;
  public backgroundLayer: any;
  public backgroundElem: any;
  public scaleToFit: any;
  public scaleToPage: any;
  public scrollWidth: any;
  public printHandler: any;
  public hRulerGuide: any;
  public vRulerGuide: any;
  public rulerGuideWinPos: any;
  public rulerGuideScrollTimer: any;
  public rulerInDrag: any;

  constructor() {

    this.documentConfig = {
      showRulers: true,// Globals.DocumentToolbarOptions[0].value,
      showGrid: true,// Globals.DocumentToolbarOptions[1].value,
      enableSnap: true,// Globals.DocumentToolbarOptions[2].value,
      centerSnap: true,// Globals.DocumentToolbarOptions[3].value,
      zoom: true,//Globals.DocumentToolbarOptions[4].value,
      zoomLevels: true,//Globals.DocumentToolbarOptions[5].value,
      scale: true,//Globals.DocumentToolbarOptions[6].value,
      showPageDivider: true,// Globals.DocumentToolbarOptions[7].value,
      spellCheck: true,// Globals.DocumentToolbarOptions[8].value,
      spellDict: true,//Globals.DocumentToolbarOptions[9].value,
      spellFlags: true,// Globals.DocumentToolbarOptions[10].value,
      printAllPages: !1,
      includeLinks: !1,
      snapToShapes: !1
    }

    this.rulerSettings = new RulerSettings();
  }

  // rulerSettings = () => {
  //   // this.useInches = !0,
  //   //   this.majorScale = 1,
  //   //   this.units = Resources.RulerUnits.SED_Inches,
  //   //   this.nTics = 12,
  //   //   this.nMid = 1,
  //   //   this.nGrid = 12,
  //   //   this.originx = 0,
  //   //   this.originy = 0,
  //   //   this.major = ConstantData.Defines.DefaultRulerMajor,
  //   //   this.metricConv = ConstantData.Defines.MetricConv,
  //   //   this.dp = 2,
  //   //   this.showpixels = !1,
  //   //   this.fractionaldenominator = 1

  // }

  InitializeWorkArea = (config: any) => {
    console.log("= D.DocHandler: InitializeWorkArea - Input:", config);

    config = config || {};

    this.workAreaID = config.workAreaID || '#document-area';
    this.svgAreaID = config.svgAreaID || '#svg-area';
    this.hRulerAreaID = config.hRulerAreaID || '#h-ruler';
    this.vRulerAreaID = config.vRulerAreaID || '#v-ruler';
    this.cRulerAreaID = config.cRulerAreaID || '#c-ruler';

    this.svgDoc = null;
    this.hRulerDoc = null;
    this.vRulerDoc = null;
    this.rulerVis = true;
    this.gridVis = true;
    this.gridLayer = '_DOCGRID';
    this.pageDividerLayer = '_DOCPAGEDIVIDER';
    this.backgroundLayer = '_BACKGROUND';
    this.backgroundElem = null;
    this.scaleToFit = false;
    this.scaleToPage = false;
    this.scrollWidth = 0;
    this.printHandler = null;

    $(window).bind('resize', this, function (e) {
      e.data.HandleResizeEvent();
    });

    $(this.svgAreaID).bind('scroll', this, function (e) {
      e.data.HandleScrollEvent();
    });

    this.UpdateWorkArea();
    this.rulerSettings = new RulerSettings();
    this.rulerSettings.fractionaldenominator = GlobalData.optManager.GetFractionDenominator();
    this.UpdateRulerVisibility();

    $(window).bind('mousemove', DefaultEvt.Evt_MouseMove);
    this.InitSVGArea(config);

    this.UpdateGridVisibility();
    // this.UpdatePageDividerVisibility();
    this.SetupRulers();
    this.UpdateGrid();
    this.UpdatePageDivider();
    this.UpdateWorkArea();
    // this.InitSpellCheck();

    console.log("= D.DocHandler: InitializeWorkArea - Output:", {
      workAreaID: this.workAreaID,
      svgAreaID: this.svgAreaID,
      hRulerAreaID: this.hRulerAreaID,
      vRulerAreaID: this.vRulerAreaID,
      cRulerAreaID: this.cRulerAreaID,
      gridLayer: this.gridLayer,
      pageDividerLayer: this.pageDividerLayer,
      backgroundLayer: this.backgroundLayer,
      scaleToFit: this.scaleToFit,
      scaleToPage: this.scaleToPage
    });
  }

  InitSVGArea = (config: any) => {
    console.log("= D.DocHandler: InitSVGArea - Input:", config);
    config = config || {};

    console.log("= D.DocHandler: InitSVGArea - Initializing SVG Document");
    if (!this.svgDoc) {
      this.svgDoc = new Document(this.svgAreaID, [] /* Globals.WebFonts */);
    }

    // Set up background layer and shape
    let layer = this.svgDoc.AddLayer(this.backgroundLayer);
    this.backgroundElem = this.svgDoc.CreateShape(ConstantData.CreateShapeType.RECT);
    layer.AddElement(this.backgroundElem);
    this.backgroundElem.SetPos(0, 0);
    this.backgroundElem.SetStrokeWidth(0);
    this.backgroundElem.SetStrokeColor('none');
    this.backgroundElem.SetFillColor('none');
    this.backgroundElem.ExcludeFromExport(true);
    layer.SetCustomAttribute('sdjs-background', '1');

    // Set up grid layer
    layer = this.svgDoc.AddLayer(this.gridLayer);
    layer.AllowScaling(false);
    layer.ExcludeFromExport(true);
    layer.SetCustomAttribute('sdjs-grid', '1');

    // Set up page divider layer
    layer = this.svgDoc.AddLayer(this.pageDividerLayer);
    layer.AllowScaling(false);
    layer.ExcludeFromExport(true);

    // Add additional layers if provided
    if (config.layers && Array.isArray(config.layers)) {
      config.layers.forEach((layerName: string) => {
        this.svgDoc.AddLayer(layerName);
      });
    }

    // Set document size if provided
    if (config.documentWidth && config.documentHeight) {
      this.svgDoc.SetDocumentSize(config.documentWidth, config.documentHeight);
    }

    // Set document DPI if provided
    if (config.documentDPI) {
      this.svgDoc.SetDocumentDPI(config.documentDPI);
    }

    // Adjust background dimensions to match document dimensions
    this.backgroundElem.SetSize(this.svgDoc.docInfo.docWidth, this.svgDoc.docInfo.docHeight);

    this.svgDoc.ImageLoadResetRefCount();

    console.log("= D.DocHandler: InitSVGArea - Output:", {
      documentWidth: this.svgDoc.docInfo.docWidth,
      documentHeight: this.svgDoc.docInfo.docHeight,
      layers: [this.backgroundLayer, this.gridLayer, this.pageDividerLayer]
    });
  }

  CheckScaleToFit = (): boolean => {
    console.log("= D.DocHandler: CheckScaleToFit - Input: scaleToFit =", this.scaleToFit);

    if (!this.scaleToFit) {
      console.log("= D.DocHandler: CheckScaleToFit - Output: false (scaleToFit disabled)");
      return false;
    }

    const workAreaSize = this.GetWorkAreaSize();
    const verticalRulerWidth = $(this.vRulerAreaID).width();
    const horizontalRulerHeight = $(this.hRulerAreaID).height();

    let availableRect = {
      x: 0,
      y: 0,
      width: workAreaSize.width,
      height: workAreaSize.height
    };

    if (this.documentConfig.showRulers) {
      availableRect.x += verticalRulerWidth;
      availableRect.width -= verticalRulerWidth;
      availableRect.y += horizontalRulerHeight;
      availableRect.height -= horizontalRulerHeight;
    }

    console.log("= D.DocHandler: CheckScaleToFit - Available rect:", availableRect);

    const scalingResult = this.svgDoc.CalcScaleToFit(availableRect.width - 20, availableRect.height - 20);
    console.log("= D.DocHandler: CheckScaleToFit - CalcScaleToFit result:", scalingResult);

    const result = (this.svgDoc.docInfo.docScale !== scalingResult.scale);
    console.log("= D.DocHandler: CheckScaleToFit - Output:", result);

    return result;
  }

  UpdateWorkArea = () => {
    // Get input values
    const showRulers = this.documentConfig.showRulers;
    const workSize = this.GetWorkAreaSize();
    const vRulerWidth = $(this.vRulerAreaID).width();
    const hRulerHeight = $(this.hRulerAreaID).height();

    console.log("= D.DocHandler: UpdateWorkArea - Input:",
      { workSize, showRulers, vRulerWidth, hRulerHeight });

    // Initialize variables
    if (!this.scrollWidth) {
      this.scrollWidth = this.GetScrollBarSize();
    }

    // Compute the available area 'adjustedRect'
    let adjustedRect = {
      x: 0,
      y: 0,
      width: workSize.width,
      height: workSize.height
    };

    // Adjust for ruler dimensions if rulers are visible
    if (showRulers) {
      adjustedRect.x += vRulerWidth;
      adjustedRect.width -= vRulerWidth;
      adjustedRect.y += hRulerHeight;
      adjustedRect.height -= hRulerHeight;
    }

    // Determine target dimensions based on svgDoc scaling options
    let targetDimensions: { width: number; height: number } = { width: 0, height: 0 };
    let tempArea: any = null;

    if (this.svgDoc) {
      if (this.scaleToFit) {
        if (GlobalData.optManager.bInAutoScroll) {
          tempArea = this.svgDoc.GetWorkArea();
          targetDimensions = {
            width: tempArea.docScreenWidth,
            height: tempArea.docScreenHeight
          };
        } else if (adjustedRect.width > 0 && adjustedRect.height > 0) {
          tempArea = this.svgDoc.CalcScaleToFit(adjustedRect.width - 20, adjustedRect.height - 20);
          targetDimensions = {
            width: tempArea.width,
            height: tempArea.height
          };

          if (this.svgDoc.docInfo.docScale !== tempArea.scale) {
            this.svgDoc.SetDocumentScale(tempArea.scale);
            this.IdleZoomUI();
            this.UpdateGrid();
            this.UpdatePageDivider();
            this.ResetRulers();
          }
        } else {
          tempArea = this.svgDoc.GetWorkArea();
          targetDimensions = {
            width: tempArea.docScreenWidth,
            height: tempArea.docScreenHeight
          };
        }
      } else if (this.scaleToPage && adjustedRect.width > 0 && adjustedRect.height > 0) {
        const pageWidth = GlobalData.optManager.theContentHeader.Page.papersize.x -
          (GlobalData.optManager.theContentHeader.Page.margins.left + GlobalData.optManager.theContentHeader.Page.margins.right);
        const pageHeight = GlobalData.optManager.theContentHeader.Page.papersize.y -
          (GlobalData.optManager.theContentHeader.Page.margins.top + GlobalData.optManager.theContentHeader.Page.margins.bottom);

        tempArea = this.svgDoc.CalcScaleToFit(adjustedRect.width - 20, adjustedRect.height - 20, pageWidth, pageHeight);
        targetDimensions = {
          width: tempArea.width,
          height: tempArea.height
        };

        if (!GlobalData.optManager.bInAutoScroll && this.svgDoc.docInfo.docScale !== tempArea.scale) {
          this.svgDoc.SetDocumentScale(tempArea.scale);
          this.IdleZoomUI();
          this.UpdateGrid();
          this.UpdatePageDivider();
          this.ResetRulers();
        }
      } else {
        tempArea = this.svgDoc.GetWorkArea();
        targetDimensions = {
          width: tempArea.docScreenWidth,
          height: tempArea.docScreenHeight
        };
      }
    } else {
      targetDimensions = { width: adjustedRect.width, height: adjustedRect.height };
    }

    // Determine the final svg area size S
    const finalSize = {
      width: Math.min(adjustedRect.width, targetDimensions.width),
      height: Math.min(adjustedRect.height, targetDimensions.height)
    };

    let needHScroll = false;
    let needVScroll = false;

    if (finalSize.width < targetDimensions.width) {
      needHScroll = true;
      finalSize.height += this.scrollWidth;
      if (finalSize.height > adjustedRect.height) {
        finalSize.height = adjustedRect.height;
        needVScroll = true;
      }
    }

    if (finalSize.height < targetDimensions.height) {
      needVScroll = true;
      finalSize.width += this.scrollWidth;
      if (finalSize.width > adjustedRect.width) {
        finalSize.width = adjustedRect.width;
        needHScroll = true;
      }
    }

    // Center the svg area within adjusted area
    const finalPos = {
      x: adjustedRect.x + (adjustedRect.width - finalSize.width) / 2,
      y: adjustedRect.y + (adjustedRect.height - finalSize.height) / 2
    };

    // Apply CSS to svg area
    $(this.svgAreaID).css({
      left: finalPos.x,
      top: finalPos.y,
      width: finalSize.width,
      height: finalSize.height,
      "overflow-x": needHScroll ? "scroll" : "hidden",
      "overflow-y": needVScroll ? "scroll" : "hidden"
    });

    // Adjust ruler positions if rulers are visible
    if (showRulers) {
      $(this.hRulerAreaID).css({
        left: finalPos.x,
        top: finalPos.y - hRulerHeight,
        width: finalSize.width,
        height: hRulerHeight
      });
      $(this.vRulerAreaID).css({
        left: finalPos.x - vRulerWidth,
        top: finalPos.y,
        width: vRulerWidth,
        height: finalSize.height
      });
      $(this.cRulerAreaID).css({
        left: finalPos.x - vRulerWidth,
        top: finalPos.y - hRulerHeight
      });
    }

    // Recalculate work area and adjust everything in svgDoc
    if (this.svgDoc) {
      this.svgDoc.CalcWorkArea();
      // AdjustScroll without parameters will internally re-calc based on svgDoc's state
      this.AdjustScroll();
      this.svgDoc.ApplyDocumentTransform(true);
    }

    console.log("= D.DocHandler: UpdateWorkArea - Output:",
      { finalPosition: finalPos, finalSize, targetDimensions, needHScroll, needVScroll });
  }

  GetWorkAreaSize = () => {
    return {
      width: $(this.workAreaID).width(),
      height: $(this.workAreaID).height()
    }
  }

  GetScrollBarSize = () => {
    var e,
      t,
      a;
    return e = (
      t = (
        a = $(
          '<div style="width:50px;height:50px;overflow:auto"><div/></div>'
        ).appendTo('body')
      ).children()
    ).innerWidth() - t.height(99).innerWidth(),
      a.remove(),
      e
  }

  AdjustScroll = (scrollX?: number, scrollY?: number) => {
    console.log("= D.DocHandler: AdjustScroll - Input:", { scrollX, scrollY });

    const workArea = this.svgDoc.GetWorkArea();

    const targetScrollX = Math.min(
      scrollX !== undefined ? scrollX : workArea.scrollX,
      workArea.maxScrollX
    );
    const targetScrollY = Math.min(
      scrollY !== undefined ? scrollY : workArea.scrollY,
      workArea.maxScrollY
    );

    $(this.svgAreaID).scrollLeft(targetScrollX);
    $(this.svgAreaID).scrollTop(targetScrollY);

    this.svgDoc.CalcWorkArea();
    this.SyncRulers();

    console.log("= D.DocHandler: AdjustScroll - Output:", { targetScrollX, targetScrollY });
  }

  HandleResizeEvent = () => {
    this.UpdateWorkArea()
  }

  HandleScrollEvent = () => {
    var e = this.svgDoc.GetWorkArea(),
      t = e.scrollX,
      a = e.scrollY;
    this.svgDoc.CalcWorkArea(),
      this.SyncRulers();
    var r = t - (e = this.svgDoc.GetWorkArea()).scrollX,
      i = a - e.scrollY;
    this.UpdateDocumentUIElementPos(r, i)
  }

  UpdateDocumentUIElementPos = (e, t) => {
    (e || t) &&
      GlobalData.optManager.UpdateFieldDataTooltipPos(e, t)
  }

  SetResolution = (e) => {
    this.svgDoc &&
      (this.svgDoc.SetDocumentDPI(e), this.UpdateWorkArea())
  }

  ResizeDocument = (e, t, a) => {
    this.svgDoc &&
      (
        this.svgDoc.SetDocumentSize(e, t),
        this.backgroundElem.SetSize(e, t),
        a ||
        (
          this.ResetRulers(),
          this.UpdateGrid(),
          this.UpdatePageDivider(),
          this.UpdateWorkArea()
        )
      )
  }

  GetDocumentSize = () => {
    return this.svgDoc.GetDocumentSize()
  }

  DocumentPageSizeChanged = () => {
    this.svgDoc &&
      (
        this.scaleToPage ? this.UpdateWorkArea() : this.UpdatePageDivider()
      )
  }

  MaintainView = (e) => {
    var t,
      a,
      r,
      i = this.svgDoc.GetWorkArea(),
      n = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, !1);
    (
      r = n.length ? GlobalData.optManager.GetListSRect(n) : GlobalData.optManager.CalcAllObjectEnclosingRect(!1)
    ).width ||
      r.height ||
      (r.x = 0, r.y = 0, r.width = i.docWidth, r.height = i.docHeight),
      e &&
      (r.width = 0, r.height = 0),
      t = (r.x + r.width / 2) * i.docToScreenScale - i.dispWidth / 2,
      a = (r.y + r.height / 2) * i.docToScreenScale - i.dispHeight / 2,
      this.AdjustScroll(t, a)
  }

  SetZoomFactor = (e, t) => {
    if (!this.svgDoc) return !1;
    if (
      !this.scaleToFit &&
      !this.scaleToPage &&
      e === this.GetZoomFactor()
    ) return !1;
    if (
      this.scaleToFit = !1,
      this.scaleToPage = !1,
      this.svgDoc.SetDocumentScale(e),
      !t
    ) {
      var a,
        r,
        i,
        n = this.svgDoc.GetWorkArea(),
        o = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, !1);
      (
        i = o.length ? GlobalData.optManager.GetListSRect(o) : GlobalData.optManager.CalcAllObjectEnclosingRect(!1)
      ).width ||
        i.height ||
        (i.x = 0, i.y = 0, i.width = n.docWidth, i.height = n.docHeight),
        a = (i.x + i.width / 2) * n.docToScreenScale - n.dispWidth / 2,
        r = (i.y + i.height / 2) * n.docToScreenScale - n.dispHeight / 2,
        this.AdjustScroll(a, r)
    }
    return this.IdleZoomUI(),
      this.ResetRulers(),
      this.UpdateGrid(),
      this.UpdatePageDivider(),
      this.UpdateWorkArea(),
      !0
  }

  GetZoomFactor = () => {
    var e = 1;
    return this.svgDoc &&
      (e = this.svgDoc.GetWorkArea().docScale),
      e
  }

  SetSizeToFit = (e) => {
    this.scaleToFit = e,
      e &&
      (this.scaleToPage = !1),
      this.UpdateWorkArea()
  }

  GetSizeToFit = () => {
    return this.scaleToFit
  }

  SetSizeToPage = (e) => {
    this.scaleToPage = e,
      e &&
      (this.scaleToFit = !1),
      this.UpdateWorkArea()
  }

  GetSizeToPage = () => {
    return this.scaleToPage
  }

  IdleZoomUI = () => {
    GlobalData.optManager.UpdateDocumentScale()
  }

  SetScroll = (e, t) => {
    this.AdjustScroll(e, t)
  }

  ScrollToPosition = (e, t) => {
    var a = this.svgDoc.CalcScrollToVisible(e, t);
    a &&
      this.AdjustScroll(a.xOff, a.yOff)
  }

  RulersNotEqual = (e, t) => {
    e = e || {};
    t = t || {};

    var a = 0,
      r = 0;
    t.originx &&
      (a = t.originx),
      t.originy &&
      (r = t.originy);
    var i = e.useInches != t.useInches ||
      e.units != t.units ||
      e.major != t.major ||
      e.majorScale != t.majorScale ||
      e.nTics != t.nTics ||
      e.nMid != t.nMid ||
      e.nGrid != t.nGrid ||
      e.dp != t.dp ||
      e.fractionaldenominator != t.fractionaldenominator ||
      e.originx != a ||
      e.originy != r;
    return e.major &&
      t.major &&
      e.major != t.major &&
      (i = !0),
      null != e.showpixels &&
      null != t.showpixels &&
      e.showpixels != t.showpixels &&
      (i = !0),
      i
  }

  PagesNotEqual = (e, t) => {

    const check = e == undefined || e == null || t === undefined || t === null;

    if (check) {
      return false;
    }

    return e.papersize.x != t.papersize.x ||
      e.papersize.y != t.papersize.y ||
      e.margins.left != t.margins.left ||
      e.margins.right != t.margins.right ||
      e.margins.top != t.margins.top ||
      e.margins.bottom != t.margins.bottom ||
      e.landscape != t.landscape
  }

  DocObject = () => {
    return this.svgDoc
  }

  SetRulers = (e, t) => {
    var sdp; //Double ===
    e &&
      (
        this.rulerSettings.useInches = void 0 !== e.useInches ? e.useInches : this.rulerSettings.useInches,
        this.rulerSettings.units = void 0 !== e.units ? e.units : this.rulerSettings.units,
        this.rulerSettings.major = void 0 !== e.major ? e.major : this.rulerSettings.major,
        this.rulerSettings.majorScale = void 0 !== e.majorScale ? e.majorScale : this.rulerSettings.majorScale,
        this.rulerSettings.nTics = void 0 !== e.nTics ? e.nTics : this.rulerSettings.nTics,
        this.rulerSettings.nMid = void 0 !== e.nMid ? e.nMid : this.rulerSettings.nMid,
        this.rulerSettings.nGrid = void 0 !== e.nGrid ? e.nGrid : this.rulerSettings.nGrid,
        this.rulerSettings.originx = void 0 !== e.originx ? e.originx : this.rulerSettings.originx,
        this.rulerSettings.originy = void 0 !== e.originy ? e.originy : this.rulerSettings.originy,
        this.rulerSettings.dp = void 0 !== e.dp ? e.dp : this.rulerSettings.dp,
        this.rulerSettings.fractionaldenominator = void 0 !== e.fractionaldenominator ? e.fractionaldenominator : this.rulerSettings.fractionaldenominator,
        null != e.showpixels &&
        (this.rulerSettings.showpixels = e.showpixels),
        t ||
        (
          sdp = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !0),
          sdp.rulerSettings = Utils1.DeepCopy(this.rulerSettings)
        ),
        this.ResetRulers(),
        this.UpdateGrid(),
        this.UpdatePageDivider()
      )
  }

  ShowCoordinates = (e) => {
    if (0 != this.documentConfig.showRulers || !e) {
      var t = Resources.Controls.WorkArea.Coordinates.Id,
        a = Resources.Controls.GetControl(t);
      if (null == a) return !1;
      if (a.GetControl(), null == a.Control) return !1;
      if (e) {
        a.Control.removeClass('hide');
        var r,
          i = GlobalData.optManager.GetTargetSelect();
        if (i > 0) {
          var n = GlobalData.optManager.GetObjectPtr(i, !1);
          n &&
            n.GetDimensionsForDisplay &&
            (r = n.GetDimensionsForDisplay()),
            GlobalData.optManager.UpdateDisplayCoordinates(r, null, null, n),
            GlobalData.optManager.ShowFrame(!0)
        } else GlobalData.optManager.ShowFrame(!1)
      } else a.Control.addClass('hide');
      return !0
    }
  }

  UpdateRulerVisibility = () => {
    console.log("= D.DocHandler: UpdateRulerVisibility - Input:", {
      showRulers: this.documentConfig.showRulers,
      currentVisibility: this.rulerVis
    });

    if (this.documentConfig.showRulers !== this.rulerVis) {
      if (this.documentConfig.showRulers) {
        $(this.hRulerAreaID).css("visibility", "visible");
        $(this.vRulerAreaID).css("visibility", "visible");
        $(this.cRulerAreaID).css("visibility", "visible");
        this.ShowCoordinates(true);
      } else {
        $(this.hRulerAreaID).css("visibility", "hidden");
        $(this.vRulerAreaID).css("visibility", "hidden");
        $(this.cRulerAreaID).css("visibility", "hidden");
        this.ShowCoordinates(false);
      }
      this.UpdateWorkArea();
      this.rulerVis = this.documentConfig.showRulers;
    }

    console.log("= D.DocHandler: UpdateRulerVisibility - Output:", {
      updatedVisibility: this.rulerVis
    });

    return true;
  }

  SetupRulers = () => {
    console.log("= D.DocHandler: SetupRulers - Input:", {
      hRulerAreaID: this.hRulerAreaID,
      vRulerAreaID: this.vRulerAreaID,
      cRulerAreaID: this.cRulerAreaID,
      isReadOnly: this.IsReadOnly()
    });

    // Initialize horizontal ruler document if not already set
    if (!this.hRulerDoc) {
      this.hRulerDoc = new Document(this.hRulerAreaID, [] /* Globals.WebFonts */);
    }

    // Initialize vertical ruler document if not already set
    if (!this.vRulerDoc) {
      this.vRulerDoc = new Document(this.vRulerAreaID, [] /* Globals.WebFonts */);
    }

    // Initialize ruler guides and state properties
    this.hRulerGuide = null;
    this.vRulerGuide = null;
    this.rulerGuideWinPos = { x: 0, y: 0 };
    this.rulerGuideScrollTimer = null;
    this.rulerInDrag = false;

    // Attach Hammer.js event handlers if not read-only
    if (!this.IsReadOnly()) {
      Hammer($(this.hRulerAreaID)[0]).on('doubletap', this.RulerTopDoubleClick);
      Hammer($(this.vRulerAreaID)[0]).on('doubletap', this.RulerLeftDoubleClick);
      Hammer($(this.cRulerAreaID)[0]).on('doubletap', this.RulerCenterDoubleClick);

      Hammer($(this.hRulerAreaID)[0]).on('dragstart', this.RulerDragStart);
      Hammer($(this.vRulerAreaID)[0]).on('dragstart', this.RulerDragStart);
      Hammer($(this.cRulerAreaID)[0]).on('dragstart', this.RulerDragStart);

      Hammer($(this.hRulerAreaID)[0]).on('drag', this.RulerTopDrag);
      Hammer($(this.vRulerAreaID)[0]).on('drag', this.RulerLeftDrag);
      Hammer($(this.cRulerAreaID)[0]).on('drag', this.RulerCenterDrag);

      Hammer($(this.hRulerAreaID)[0]).on('dragend', this.RulerDragEnd);
      Hammer($(this.vRulerAreaID)[0]).on('dragend', this.RulerDragEnd);
      Hammer($(this.cRulerAreaID)[0]).on('dragend', this.RulerDragEnd);
    }

    // Reset rulers to update display
    this.ResetRulers();

    console.log("= D.DocHandler: SetupRulers - Output:", {
      hRulerDocInitialized: !!this.hRulerDoc,
      vRulerDocInitialized: !!this.vRulerDoc,
      guides: { hRulerGuide: this.hRulerGuide, vRulerGuide: this.vRulerGuide },
      rulerInDrag: this.rulerInDrag
    });
  }

  ResetRulers = () => {
    var e = this.svgDoc.GetWorkArea(),
      t = $(this.vRulerAreaID).width(),
      a = $(this.hRulerAreaID).height();
    this.hRulerDoc.SetDocumentSize(e.docScreenWidth + 100, a),
      this.vRulerDoc.SetDocumentSize(t, e.docScreenHeight + 100),
      this.hRulerDoc.RemoveAll(),
      this.vRulerDoc.RemoveAll(),
      this.SetRulerContent(this.hRulerDoc, !0),
      this.SetRulerContent(this.vRulerDoc, !1)
  }

  SD_GetScaledRuler = (e) => {
    var t = Math.floor(this.svgDoc.docInfo.docScale);
    return 0 == t ? (t = Math.floor(1 / this.svgDoc.docInfo.docScale)) > 1 &&
      (e /= t) : t > 1 &&
    (e *= t),
      e
  }

  SetRulerContent = (e, t) => {
    var a,
      r,
      i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p,
      d,
      D,
      g,
      h,
      m,
      C,
      y,
      f,
      L,
      I,
      T,
      b,
      M,
      P,
      R = this.svgDoc.GetWorkArea(),
      A = $(this.vRulerAreaID).width(),
      _ = $(this.hRulerAreaID).height(),
      E = 1,
      w = !1,
      F = this.SD_GetScaledRuler(E);
    i = e.CreateShape(ConstantData.CreateShapeType.PATH),
      a = t ? _ : A,
      r = '',
      o = Utils1.RoundCoordLP(Math.round(3 * a / 4)),
      s = Utils1.RoundCoordLP(Math.round(a / 2)),
      l = Utils1.RoundCoordLP(Math.round(a / 4)),
      g = 0,
      this.rulerSettings.useInches ||
      (E *= ConstantData.Defines.MetricConv),
      p = this.rulerSettings.nTics,
      d = this.rulerSettings.nMid,
      p % 2 &&
      (d = 0),
      D = Math.round(p / (d + 1)),
      T = t ? R.docScreenWidth : R.docScreenHeight,
      m = this.rulerSettings.major / E,
      b = [],
      (
        y = (C = t ? this.rulerSettings.originx : this.rulerSettings.originy) - Math.floor(C)
      ) &&
      (y -= 1),
      y *= m,
      f = - Math.ceil(C) * this.rulerSettings.majorScale,
      m /= F;
    do {
      for (
        L = h = y + g * this.rulerSettings.major / F / E,
        I = Utils1.RoundCoordLP(L * R.docToScreenScale),
        S = this.rulerSettings.showpixels ? 100 * (f + g * this.rulerSettings.majorScale / F) : f + g * this.rulerSettings.majorScale / F,
        t ? (b.push({
          label: S,
          x: I + 2,
          y: 1
        }), r += 'M' + I + ',' + a + 'v-' + o) : (b.push({
          label: S,
          x: 3,
          y: I + 2
        }), r += 'M' + a + ',' + I + 'h-' + o),
        u = 1;
        u < p;
        u++
      ) L = h + u * (m / p),
        I = Utils1.RoundCoordLP(L * R.docToScreenScale),
        c = u % D ? l : s,
        r += t ? 'M' + I + ',' + a + 'v-' + c : 'M' + a + ',' + I + 'h-' + c;
      g++
    } while (I < T);
    for (
      i.SetPath(r),
      i.SetFillColor('none'),
      i.SetStrokeColor('#000'),
      i.SetStrokeWidth('.5'),
      e.AddElement(i),
      e.SetCursor(ConstantData.CursorType.DEFAULT),
      u = 0;
      u < b.length;
      u++
    ) if (b[u].label !== parseInt(b[u].label, 10)) {
      w = !0;
      break
    }
    if (w) for (u = 0; u < b.length; u++) b[u].label = b[u].label.toFixed(1);
    M = {
      size: 10,
      color: '#000'
    },
      P = b.length;
    var v = Math.floor(P / 250);
    // debugger
    for (u = 0; u < P; u++) (n = e.CreateShape(ConstantData.CreateShapeType.TEXT)).SetText(b[u].label, M),
      e.AddElement(n),
      n.SetPos(b[u].x, b[u].y),
      u += v
  }

  SyncRulers = () => {
    var e = $(this.svgAreaID).scrollLeft(),
      t = $(this.svgAreaID).scrollTop();
    $(this.hRulerAreaID).scrollLeft(e),
      $(this.vRulerAreaID).scrollTop(t)
  }

  UpdateGridVisibility = () => {
    console.log('UpdateGridVisibility -============', this.documentConfig.showGrid, this.gridVis);

    //Double set the default to show grid

    var e = this.svgDoc ? this.svgDoc.GetLayer(this.gridLayer) : null;
    return !(!e || this.documentConfig.showGrid === this.gridVis) &&
      (
        e.SetVisible(this.documentConfig.showGrid),
        this.gridVis = this.documentConfig.showGrid,
        !0
      )
  }

  UpdateGrid = () => {
    var e,
      t,
      a,
      r,
      i,
      n,
      o,
      s,
      l,
      S,
      c,
      u,
      p,
      d,
      D,
      g,
      h,
      m,
      C,
      y,
      f = this.svgDoc.GetWorkArea(),
      L = this.svgDoc.GetLayer(this.gridLayer),
      I = 1;
    if (L) {
      var T = this.SD_GetScaledRuler(I);
      L.RemoveAll(),
        a = this.svgDoc.CreateShape(ConstantData.CreateShapeType.PATH),
        r = this.svgDoc.CreateShape(ConstantData.CreateShapeType.PATH),
        this.rulerSettings.useInches ||
        (I = ConstantData.Defines.MetricConv),
        l = this.rulerSettings.major / I,
        n = this.rulerSettings.nGrid * T,
        e = '',
        t = '',
        p = GlobalData.optManager.theContentHeader.Page.papersize.x - (
          GlobalData.optManager.theContentHeader.Page.margins.left + GlobalData.optManager.theContentHeader.Page.margins.right
        ) / 2,
        d = GlobalData.optManager.theContentHeader.Page.papersize.y - (
          GlobalData.optManager.theContentHeader.Page.margins.top + GlobalData.optManager.theContentHeader.Page.margins.bottom
        ) / 2,
        D = Utils1.RoundCoordLP(f.docScreenWidth + 2 * p * f.docToScreenScale),
        g = Utils1.RoundCoordLP(f.docScreenHeight + 2 * d * f.docToScreenScale),
        C = (h = - Utils1.RoundCoordLP(p * f.docToScreenScale)) + D,
        y = (m = - Utils1.RoundCoordLP(d * f.docToScreenScale)) + g,
        (
          S = this.rulerSettings.originx - Math.floor(this.rulerSettings.originx)
        ) &&
        (S -= 1),
        S *= l,
        o = - Math.ceil(p / l);
      do {
        if (
          c = s = S + o * this.rulerSettings.major / I,
          (u = Utils1.RoundCoordLP(c * f.docToScreenScale)) > C
        ) break;
        for (
          e += 'M' + u + ',' + m + 'v' + g,
          i = 1;
          i < n &&
          (
            c = s + i * (l / n),
            !((u = Utils1.RoundCoordLP(c * f.docToScreenScale)) > C)
          );
          i++
        ) t += 'M' + u + ',' + m + 'v' + g;
        o++
      } while (u < C);
      (
        S = this.rulerSettings.originy - Math.floor(this.rulerSettings.originy)
      ) &&
        (S -= 1),
        S *= l,
        o = - Math.ceil(d / l);
      do {
        if (
          c = s = S + o * this.rulerSettings.major / I,
          (u = Utils1.RoundCoordLP(c * f.docToScreenScale)) > y
        ) break;
        for (
          e += 'M' + h + ',' + u + 'h' + D,
          i = 1;
          i < n &&
          (
            c = s + i * (l / n),
            !((u = Utils1.RoundCoordLP(c * f.docToScreenScale)) > y)
          );
          i++
        ) t += 'M' + h + ',' + u + 'h' + D;
        o++
      } while (u < y);
      a.SetPath(e),
        r.SetPath(t),
        a.SetFillColor('none'),
        a.SetStrokeColor('#000'),
        a.SetStrokeOpacity('.4'),
        a.SetStrokeWidth('.5'),
        r.SetFillColor('none'),
        r.SetStrokeColor('#000'),
        r.SetStrokeOpacity('.2'),
        r.SetStrokeWidth('.5'),
        L.AddElement(r),
        L.AddElement(a),
        L.SetEventBehavior(ConstantData.EventBehavior.NONE)
    }
  }

  UpdatePageDividerVisibility = () => {
    console.log("= D.DocHandler UpdatePageDividerVisibility - Input:", {
      showPageDivider: this.documentConfig.showPageDivider,
      printFlags: GlobalData.optManager.theContentHeader.Page.printflags,
      layerExists: !!(this.svgDoc && this.svgDoc.GetLayer(this.pageDividerLayer))
    });

    const pageDividerLayer = this.svgDoc ? this.svgDoc.GetLayer(this.pageDividerLayer) : null;
    const printFlags = GlobalData.optManager.theContentHeader.Page.printflags;
    const shouldShow =
      !(printFlags & FileParser.PrintFlags.SEP_OnePage) &&
      !(printFlags & FileParser.PrintFlags.SEP_CustomPageSize) &&
      this.documentConfig.showPageDivider;

    if (!pageDividerLayer) {
      console.log("= D.DocHandler UpdatePageDividerVisibility - Output:", {
        message: "Page divider layer not found."
      });
      return false;
    }

    if (shouldShow === pageDividerLayer.GetVisible()) {
      console.log("= D.DocHandler UpdatePageDividerVisibility - Output:", {
        message: "Visibility unchanged.",
        currentVisibility: pageDividerLayer.GetVisible()
      });
      return false;
    } else {
      pageDividerLayer.SetVisible(shouldShow);
      console.log("= D.DocHandler UpdatePageDividerVisibility - Output:", {
        updatedVisibility: shouldShow
      });
      return true;
    }
  }

  UpdatePageDivider = () => {
    // Retrieve current work area and page divider layer
    const workArea = this.svgDoc.GetWorkArea();
    const pageDividerLayer = this.svgDoc.GetLayer(this.pageDividerLayer);

    console.log("= D.DocHandler: UpdatePageDivider input:", { workArea });

    if (pageDividerLayer) {
      // Clear existing divider elements
      pageDividerLayer.RemoveAll();

      // Create a new path shape for the page divider
      const pathShape = this.svgDoc.CreateShape(ConstantData.CreateShapeType.PATH);
      let pathString = '';

      // Adjust paper margins if needed
      (function (paperSize, margins) {
        if (paperSize.x - (margins.left + margins.right) <= 0) {
          margins.left = 50;
          margins.right = 50;
        }
        if (paperSize.y - (margins.top + margins.bottom) <= 0) {
          margins.top = 50;
          margins.bottom = 50;
        }
      })(GlobalData.optManager.theContentHeader.Page.papersize, GlobalData.optManager.theContentHeader.Page.margins);

      // Calculate effective paper width and height based on margins
      let paperWidth =
        GlobalData.optManager.theContentHeader.Page.papersize.x -
        (GlobalData.optManager.theContentHeader.Page.margins.left +
          GlobalData.optManager.theContentHeader.Page.margins.right);
      let paperHeight =
        GlobalData.optManager.theContentHeader.Page.papersize.y -
        (GlobalData.optManager.theContentHeader.Page.margins.top +
          GlobalData.optManager.theContentHeader.Page.margins.bottom);

      // Scale dimensions to screen coordinates
      paperWidth *= workArea.docToScreenScale;
      paperHeight *= workArea.docToScreenScale;

      // Draw vertical dividers along the width
      let pos = paperWidth;
      while (pos < workArea.docScreenWidth) {
        pathString += 'M' + Utils1.RoundCoordLP(pos) + ',0v' + workArea.docScreenHeight;
        pos += paperWidth;
      }

      // Draw horizontal dividers along the height
      pos = paperHeight;
      while (pos < workArea.docScreenHeight) {
        pathString += 'M0,' + Utils1.RoundCoordLP(pos) + 'h' + workArea.docScreenWidth;
        pos += paperHeight;
      }

      // Apply path and styling settings to the shape
      pathShape.SetPath(pathString);
      pathShape.SetFillColor('none');
      pathShape.SetStrokeColor('#000088');
      pathShape.SetStrokeOpacity('.6');
      pathShape.SetStrokePattern('10,4');
      pathShape.SetStrokeWidth('.5');

      // Add the completed shape to the page divider layer
      pageDividerLayer.AddElement(pathShape);

      console.log("= D.DocHandler: UpdatePageDivider output:", { path: pathString });
    }
  }

  SnapToGrid = (e) => {
    this.svgDoc.GetWorkArea();
    var t,
      a,
      r,
      i,
      n = 1,
      o = {},
      s = {};
    this.rulerSettings.useInches ||
      (n = ConstantData.Defines.MetricConv);
    var l = this.SD_GetScaledRuler(n);
    return s.x = e.x,
      s.y = e.y,
      a = (t = this.rulerSettings.major / n) / (this.rulerSettings.nGrid * l),
      r = Math.floor(s.x / t),
      o.x = r * t,
      s.x -= o.x,
      i = Math.round(s.x / a),
      o.x += i * a,
      r = Math.floor(s.y / t),
      o.y = r * t,
      s.y -= o.y,
      i = Math.round(s.y / a),
      o.y += i * a,
      o
  }

  RulerTopDoubleClick = (e) => {
    Utils2.StopPropagationAndDefaults(e),
      GlobalData.docHandler.RulerHandleDoubleClick(e, !1, !0)
  }

  RulerLeftDoubleClick = (e) => {
    Utils2.StopPropagationAndDefaults(e),
      GlobalData.docHandler.RulerHandleDoubleClick(e, !0, !1)
  }

  RulerCenterDoubleClick = (e) => {
    Utils2.StopPropagationAndDefaults(e),
      GlobalData.docHandler.RulerHandleDoubleClick(e, !0, !0)
  }

  RulerDragStart = (e) => {
    if (!GlobalData.docHandler.IsReadOnly()) {
      if (GlobalData.optManager.IsRightClick(e)) return Utils2.StopPropagationAndDefaults(e),
        void SDUI.Commands.MainController.ShowDropdown(
          Resources.Controls.Dropdowns.SetScale.Id.toLowerCase(),
          e.gesture.center.clientX,
          e.gesture.center.clientY
        );
      GlobalData.docHandler.rulerInDrag = !0
    }
  }

  RulerTopDrag = (e) => {
    if (
      Utils2.StopPropagationAndDefaults(e),
      GlobalData.optManager.IsCtrlClick(e)
    ) return Utils2.StopPropagationAndDefaults(e),
      void GlobalData.docHandler.RulerHandleDoubleClick(e, !1, !0);
    GlobalData.docHandler.RulerDragGuides(e, !1, !0)
  }

  RulerLeftDrag = (e) => {
    if (
      Utils2.StopPropagationAndDefaults(e),
      GlobalData.optManager.IsCtrlClick(e)
    ) return Utils2.StopPropagationAndDefaults(e),
      void GlobalData.docHandler.RulerHandleDoubleClick(e, !0, !1);
    GlobalData.docHandler.RulerDragGuides(e, !0, !1)
  }

  RulerCenterDrag = (e) => {
    if (
      Utils2.StopPropagationAndDefaults(e),
      GlobalData.optManager.IsCtrlClick(e)
    ) return Utils2.StopPropagationAndDefaults(e),
      void GlobalData.docHandler.RulerHandleDoubleClick(e, !0, !0);
    GlobalData.docHandler.RulerDragGuides(e, !0, !0)
  }

  RulerDragEnd = (e) => {
    Utils2.StopPropagationAndDefaults(e),
      GlobalData.docHandler.RulerEndGuides()
  }

  RulerHandleDoubleClick = (e, t, a) => {

    console.log('RulerHandleDoubleClick -============', e, t, a);
    //DOUBLE
    if (!GlobalData.optManager.IsRightClick(e)) {
      var r = {
        originx: this.rulerSettings.originx,
        originy: this.rulerSettings.originy
      },
        i = this.svgDoc.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY);
      this.svgDoc.GetWorkArea();
      if (this.rulerInDrag = !1, !this.IsReadOnly()) {
        if (t && a) r.originx = 0,
          r.originy = 0;
        else if (a) r.originx = i.x / this.rulerSettings.major,
          this.rulerSettings.useInches ||
          (r.originx *= ConstantData.Defines.MetricConv);
        else {
          if (!t) return;
          r.originy = i.y / this.rulerSettings.major,
            this.rulerSettings.useInches ||
            (r.originy *= ConstantData.Defines.MetricConv)
        }
        this.SetRulers(r),
          this.ShowCoordinates(!0);
        var n = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, !1);
        GlobalData.optManager.UpdateSelectionAttributes(n)
      }
    }
  }

  RulerDragGuides = (e, t, a) => {
    var r = this.svgDoc.GetWorkArea(),
      i = 1 / r.docScale,
      n = 4 * i + ',' + 2 * i;
    this.rulerInDrag &&
      (
        (
          this.hRulerGuide &&
          !a ||
          this.vRulerGuide &&
          !t ||
          a &&
          !this.hRulerGuide ||
          t &&
          !this.vRulerGuide
        ) &&
        (this.RulerEndGuides(), this.rulerInDrag = !0),
        t &&
        !this.hRulerGuide &&
        (
          this.hRulerGuide = this.svgDoc.CreateShape(ConstantData.CreateShapeType.LINE),
          this.hRulerGuide.SetFillColor('none'),
          this.hRulerGuide.SetStrokeColor('black'),
          this.hRulerGuide.SetStrokeWidth(i),
          this.hRulerGuide.SetStrokePattern(n),
          GlobalData.optManager.svgOverlayLayer.AddElement(this.hRulerGuide)
        ),
        a &&
        !this.vRulerGuide &&
        (
          this.vRulerGuide = this.svgDoc.CreateShape(ConstantData.CreateShapeType.LINE),
          this.vRulerGuide.SetFillColor('none'),
          this.vRulerGuide.SetStrokeColor('black'),
          this.vRulerGuide.SetStrokeWidth(i),
          this.vRulerGuide.SetStrokePattern(n),
          GlobalData.optManager.svgOverlayLayer.AddElement(this.vRulerGuide)
        ),
        this.rulerGuideWinPos.x = e.gesture.center.clientX,
        this.rulerGuideWinPos.y = e.gesture.center.clientY,
        a ||
        (this.rulerGuideWinPos.x = r.dispX + r.dispWidth / 2),
        t ||
        (this.rulerGuideWinPos.y = r.dispY + r.dispHeight / 2),
        this.RulerDrawGuides(),
        this.rulerGuideScrollTimer ||
        (
          !t ||
          !a ||
          this.rulerGuideWinPos.x > r.dispX &&
          this.rulerGuideWinPos.y > r.dispY
        ) &&
        (
          this.rulerGuideScrollTimer = setInterval((() => {
            GlobalData.docHandler.RulerAutoScrollGuides()
          }), 100)
        )
      )
  }

  RulerAutoScrollGuides = () => {
    var e = this.svgDoc.GetWorkArea(),
      t = !1,
      a = this.svgDoc.ConvertWindowToDocCoords(this.rulerGuideWinPos.x, this.rulerGuideWinPos.y);
    (
      this.rulerGuideWinPos.x < e.dispX ||
      this.rulerGuideWinPos.x > e.dispX + e.dispWidth ||
      this.rulerGuideWinPos.y < e.dispY ||
      this.rulerGuideWinPos.y > e.dispY + e.dispHeight
    ) &&
      (t = !0),
      t &&
      (this.ScrollToPosition(a.x, a.y), this.RulerDrawGuides())
  }

  RulerDrawGuides = () => {
    var e = this.svgDoc.GetWorkArea(),
      t = this.svgDoc.ConvertWindowToDocCoords(this.rulerGuideWinPos.x, this.rulerGuideWinPos.y);
    this.documentConfig.enableSnap &&
      (t = this.SnapToGrid(t)),
      this.vRulerGuide &&
      (
        t.x < e.docVisX ? t.x = e.docVisX : t.x > e.docVisX + e.docVisWidth &&
          (t.x = e.docVisX + e.docVisWidth),
        this.vRulerGuide.SetPoints(t.x, 0, t.x, e.docHeight)
      ),
      this.hRulerGuide &&
      (
        t.y < e.docVisY ? t.y = e.docVisY : t.y > e.docVisY + e.docVisHeight &&
          (t.y = e.docVisY + e.docVisHeight),
        this.hRulerGuide.SetPoints(0, t.y, e.docWidth, t.y)
      )
  }

  RulerEndGuides = () => {
    this.rulerGuideScrollTimer &&
      (
        clearInterval(this.rulerGuideScrollTimer),
        this.rulerGuideScrollTimer = null
      ),
      this.hRulerGuide &&
      (
        GlobalData.optManager.svgOverlayLayer.RemoveElement(this.hRulerGuide),
        this.hRulerGuide = null
      ),
      this.vRulerGuide &&
      (
        GlobalData.optManager.svgOverlayLayer.RemoveElement(this.vRulerGuide),
        this.vRulerGuide = null
      ),
      this.rulerInDrag = !1
  }

  SnapRect = (e) => {
    var t,
      a,
      r,
      i,
      n,
      o,
      s = {},
      l = {},
      S = {};
    return s.x = e.x,
      s.y = e.y,
      l.x = e.x + e.width,
      l.y = e.y + e.height,
      t = this.SnapToGrid(s),
      a = this.SnapToGrid(l),
      r = t.x - s.x,
      i = a.x - l.x,
      Math.abs(r) > Math.abs(i) ? S.x = i : S.x = r,
      n = t.y - s.y,
      o = a.y - l.y,
      Math.abs(n) > Math.abs(o) ? S.y = o : S.y = n,
      S
  }

  UpdateConfig = (e) => {
    this.documentConfig = e,
      this.UpdateRulerVisibility(),
      this.UpdateGridVisibility(),
      this.UpdatePageDividerVisibility()
  }

  GetBackground = () => {
    return this.backgroundElem
  }

  HandleSocketStatus = (e, t) => {
    - 1 !== t.access &&
      0 !== t.access ||
      t.status === SocketClient.SDSocketStatus.InvalidLicense ||
      Utils.Alert('You have no access to this document or folder', null)
  }


  HandleHashChange = (e) => {
    void 0 !== this.oldHash &&
      null != this.oldHash &&
      this.oldHash.length > 0 &&
      (null == window.location.hash || window.location.hash.length <= 0) &&
      (window.location.hash = this.oldHash),
      this.oldHash = window.location.hash
  }

  HandleSocketCommand = (e, t) => {
    var a = JSON.parse(t.manifestJSON),
      r = ListManager.SocketActions,
      i = null,
      n = null;
    switch (t.action) {
      case SDF.BlockActions.ClosePage:
        if (GlobalData.optManager.PageAction.length) switch (GlobalData.optManager.PageAction[0]) {
          case r.AddNewPage:
          case r.AddDupPage:
          case r.Insert_Template:
          case r.Insert_Document:
            GlobalData.optManager.PageAction.length > 1 &&
              (i = GlobalData.optManager.PageAction[1]),
              GlobalData.optManager.PageAction.length > 2 &&
              (n = GlobalData.optManager.PageAction[2]),
              SDF.AddPage_Create(GlobalData.optManager.PageAction[0], i, n)
        }
        break;
      case SDF.BlockActions.AddPage:
        if (GlobalData.optManager.PageAction.length) switch (GlobalData.optManager.PageAction[0]) {
          case r.CompleteAdd:
            SDF.AddPage_Complete();
            break;
          case r.AddNewPage:
          case r.AddDupPage:
            SDF.AddPage_Create(GlobalData.optManager.PageAction[0], GlobalData.optManager.PageAction[1]);
            break;
          case r.AddNewPage_Init:
            SDF.AddPage_Initiate(r.AddNewPage, null);
            break;
          case r.AddDupPage_Init:
            SDF.AddPage_Initiate(r.AddDupPage, null);
            break;
          case r.Insert_Template_Init:
            SDF.AddPage_Initiate(r.Insert_Template, null, GlobalData.optManager.PageAction[2]);
            break;
          case r.Insert_Document_Init:
            SDF.AddPage_Initiate(r.Insert_Document, null, GlobalData.optManager.PageAction[2])
        }
        break;
      case SDF.BlockActions.ChangePage:
        if (
          GlobalData.optManager.PageAction.length &&
          GlobalData.optManager.PageAction[0] === r.CompleteChange
        ) SDF.ChangePage_Complete(a);
        break;
      case SDF.BlockActions.RenamePage:
        if (
          GlobalData.optManager.PageAction.length &&
          GlobalData.optManager.PageAction[0] === r.CompleteRename
        ) SDF.RenamePage_Complete(a);
        break;
      case SDF.BlockActions.CurrentPage:
        if (GlobalData.optManager.PageAction.length) switch (GlobalData.optManager.PageAction[0]) {
          case r.RenamePage:
            SDF.RenamePage_Initiate(GlobalData.optManager.PageAction[1], GlobalData.optManager.PageAction[2]);
            break;
          case r.DeletePage:
            SDF.DeletePage_Initiate(GlobalData.optManager.PageAction[1])
        }
        break;
      case SDF.BlockActions.DeletePage:
        if (
          GlobalData.optManager.PageAction.length &&
          GlobalData.optManager.PageAction[0] === r.CompleteDelete
        ) SDF.DeletePage_Complete(a);
        break;
      case SDF.BlockActions.ReorderPages:
        if (
          GlobalData.optManager.PageAction.length &&
          GlobalData.optManager.PageAction[0] === r.CompleteReorder
        ) SDF.ReorderPages_Complete(a)
    }
  }

  IsReadOnly = () => {
    // return SDUI.AppSettings.ReadOnly
    return false;//Double ========
  }

  InitSpellCheck = () => {
    // this.svgDoc &&
    //   this.svgDoc.InitSpellCheck()
  }

  InitSpellCheckUser = () => {
    // this.svgDoc &&
    //   this.svgDoc.InitSpellCheckUser()
  }

  SetPageMargins = (e) => {
    try {
      if (GlobalData.optManager.theContentHeader.Page.margins.left !== e) {
        if (
          Collab.AllowMessage() &&
          Collab.BeginSecondaryEdit(),
          GlobalData.optManager.theContentHeader.Page.margins.left = e,
          GlobalData.optManager.theContentHeader.Page.margins.top = e,
          GlobalData.optManager.theContentHeader.Page.margins.right = e,
          GlobalData.optManager.theContentHeader.Page.margins.bottom = e,
          GlobalData.optManager.FitDocumentWorkAreaToPaperSize(),
          Collab.AllowMessage()
        ) {
          var t = {
            margin: e
          };
          Collab.BuildMessage(ConstantData.CollabMessages.SetPageMargins, t, !1)
        }
        GlobalData.optManager.CompleteOperation()
      }
    } catch (e) {
      throw e;
    }
  }

  SetCustomPageMargins = (e, t, a, r) => {
    try {
      if (
        Collab.AllowMessage() &&
        Collab.BeginSecondaryEdit(),
        GlobalData.optManager.theContentHeader.Page.margins.left = e,
        GlobalData.optManager.theContentHeader.Page.margins.top = t,
        GlobalData.optManager.theContentHeader.Page.margins.right = a,
        GlobalData.optManager.theContentHeader.Page.margins.bottom = r,
        GlobalData.optManager.FitDocumentWorkAreaToPaperSize(),
        Collab.AllowMessage()
      ) {
        var i = {
          left: e,
          top: t,
          right: a,
          bottom: r
        };
        Collab.BuildMessage(ConstantData.CollabMessages.SetCustomPageMargins, i, !1)
      }
      GlobalData.optManager.CompleteOperation()
    } catch (e) {
      throw e;
    }
  }

  SetIncludeLinks = (e) => {
    this.documentConfig.includeLinks = e
  }

  GetIncludeLinks = () => {
    return this.documentConfig.includeLinks
  }

}

export default DocHandler;
