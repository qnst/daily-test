


import RulerSettings from '../Model/RulerSettings'
import $ from 'jquery'
import GlobalData from '../Data/GlobalData'
import EvtUtil from '../Event/EvtUtil'
import Document from '../Basic/Basic.Document'
import Globals from '../Data/Globals'
import FileParser from '../Data/FileParser'
import '../Helper/HammerTest2'
import '../Helper/pathseg'
import Element from '../Basic/Basic.Element'
import Utils1 from '../Helper/Utils1'
import Utils2 from '../Helper/Utils2'
import Utils3 from '../Helper/Utils3'
import Resources from '../Data/Resources'
import ListManager from '../Data/ListManager'
import ConstantData from '../Data/ConstantData'
import DocumentConfig from '../Model/DocumentConfig'

class DocHandler {

  public documentConfig: DocumentConfig;
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

    this.documentConfig = new DocumentConfig();
    this.rulerSettings = new RulerSettings();

    this.documentConfig.showRulers = true;
    this.documentConfig.showGrid = true;
    this.documentConfig.enableSnap = false;
    this.documentConfig.centerSnap = true;
    this.documentConfig.zoom = true;
    this.documentConfig.zoomLevels = true;
    this.documentConfig.scale = true;
    this.documentConfig.showPageDivider = true;
    this.documentConfig.spellCheck = true;
    this.documentConfig.spellDict = true;
    this.documentConfig.spellFlags = true;
    this.documentConfig.snapToShapes = false;
  }

  InitializeWorkArea(config: any) {
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

    // this.UpdateWorkArea();
    this.rulerSettings = new RulerSettings();
    this.rulerSettings.fractionaldenominator = GlobalData.optManager.GetFractionDenominator();
    this.UpdateRulerVisibility();

    $(window).bind('mousemove', EvtUtil.Evt_MouseMove);
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

  InitSVGArea(config: any) {

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

  CheckScaleToFit(): boolean {
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

  UpdateWorkArea() {
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

  GetWorkAreaSize(): { width: number; height: number } {
    console.log("= D.DocHandler: GetWorkAreaSize - Input:", { workAreaID: this.workAreaID });

    const width = $(this.workAreaID).width();
    const height = $(this.workAreaID).height();

    const result = { width, height };
    console.log("= D.DocHandler: GetWorkAreaSize - Output:", result);

    return result;
  }

  GetScrollBarSize() {
    console.log("= D.DocHandler: GetScrollBarSize - Input:");

    const container = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
    const innerElement = container.children();

    const initialWidth = innerElement.innerWidth();
    const adjustedWidth = innerElement.height(99).innerWidth();
    const scrollBarSize = initialWidth - adjustedWidth;

    container.remove();

    console.log("= D.DocHandler: GetScrollBarSize - Output:", { scrollBarSize });
    return scrollBarSize;
  }

  AdjustScroll(scrollX?: number, scrollY?: number) {
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

  HandleResizeEvent() {
    this.UpdateWorkArea()
  }

  HandleScrollEvent() {
    var e = this.svgDoc.GetWorkArea(),
      t = e.scrollX,
      a = e.scrollY;
    this.svgDoc.CalcWorkArea(),
      this.SyncRulers();
    var r = t - (e = this.svgDoc.GetWorkArea()).scrollX,
      i = a - e.scrollY;
    // this.UpdateDocumentUIElementPos(r, i)
  }

  // UpdateDocumentUIElementPos(e, t) {
  //   (e || t) &&
  //     GlobalData.optManager.UpdateFieldDataTooltipPos(e, t)
  // }

  SetResolution(e) {
    this.svgDoc &&
      (this.svgDoc.SetDocumentDPI(e), this.UpdateWorkArea())
  }

  ResizeDocument(e, t, a) {
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

  GetDocumentSize() {
    return this.svgDoc.GetDocumentSize()
  }

  DocumentPageSizeChanged() {
    this.svgDoc &&
      (
        this.scaleToPage ? this.UpdateWorkArea() : this.UpdatePageDivider()
      )
  }

  MaintainView(e) {
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

  SetZoomFactor(e, t) {
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

  GetZoomFactor() {
    var e = 1;
    return this.svgDoc &&
      (e = this.svgDoc.GetWorkArea().docScale),
      e
  }

  SetSizeToFit(e) {
    this.scaleToFit = e,
      e &&
      (this.scaleToPage = !1),
      this.UpdateWorkArea()
  }

  GetSizeToFit() {
    return this.scaleToFit
  }

  SetSizeToPage(e) {
    this.scaleToPage = e,
      e &&
      (this.scaleToFit = !1),
      this.UpdateWorkArea()
  }

  GetSizeToPage() {
    return this.scaleToPage
  }

  IdleZoomUI() {
    GlobalData.optManager.UpdateDocumentScale()
  }

  SetScroll(e, t) {
    this.AdjustScroll(e, t)
  }

  ScrollToPosition(e, t) {
    var a = this.svgDoc.CalcScrollToVisible(e, t);
    a &&
      this.AdjustScroll(a.xOff, a.yOff)
  }

  RulersNotEqual(e, t) {
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

  PagesNotEqual(e, t) {

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

  DocObject() {
    return this.svgDoc
  }

  SetRulers(settings: any, propagate?: boolean) {
    console.log("= D.DocHandler: SetRulers - Input:", { settings, propagate });
    let sdp;

    if (settings) {
      this.rulerSettings.useInches = settings.useInches !== undefined ? settings.useInches : this.rulerSettings.useInches;
      this.rulerSettings.units = settings.units !== undefined ? settings.units : this.rulerSettings.units;
      this.rulerSettings.major = settings.major !== undefined ? settings.major : this.rulerSettings.major;
      this.rulerSettings.majorScale = settings.majorScale !== undefined ? settings.majorScale : this.rulerSettings.majorScale;
      this.rulerSettings.nTics = settings.nTics !== undefined ? settings.nTics : this.rulerSettings.nTics;
      this.rulerSettings.nMid = settings.nMid !== undefined ? settings.nMid : this.rulerSettings.nMid;
      this.rulerSettings.nGrid = settings.nGrid !== undefined ? settings.nGrid : this.rulerSettings.nGrid;
      this.rulerSettings.originx = settings.originx !== undefined ? settings.originx : this.rulerSettings.originx;
      this.rulerSettings.originy = settings.originy !== undefined ? settings.originy : this.rulerSettings.originy;
      this.rulerSettings.dp = settings.dp !== undefined ? settings.dp : this.rulerSettings.dp;
      this.rulerSettings.fractionaldenominator = settings.fractionaldenominator !== undefined ? settings.fractionaldenominator : this.rulerSettings.fractionaldenominator;
      if (settings.showpixels != null) {
        this.rulerSettings.showpixels = settings.showpixels;
      }

      if (!propagate) {
        sdp = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, true);
        sdp.rulerSettings = Utils1.DeepCopy(this.rulerSettings);
      }

      this.ResetRulers();
      this.UpdateGrid();
      this.UpdatePageDivider();
    }

    console.log("= D.DocHandler: SetRulers - Output:", { rulerSettings: this.rulerSettings });
  };

  ShowCoordinates(show: boolean): boolean {
    console.log("= D.DocHandler: ShowCoordinates - Input:", {
      show,
      showRulers: this.documentConfig.showRulers,
    });

    // if (this.documentConfig.showRulers !== 0 || !show) {
    //   const controlId = Resources.Controls.WorkArea.Coordinates.Id;
    //   const controlWrapper = Resources.Controls.GetControl(controlId);

    //   if (controlWrapper == null) {
    //     console.log("= D.DocHandler: ShowCoordinates - Output: controlWrapper not found");
    //     return false;
    //   }

    //   controlWrapper.GetControl();

    //   if (controlWrapper.Control == null) {
    //     console.log("= D.DocHandler: ShowCoordinates - Output: control not found in controlWrapper");
    //     return false;
    //   }

    //   if (show) {
    //     controlWrapper.Control.removeClass("hide");

    //     const targetSelect = GlobalData.optManager.GetTargetSelect();
    //     if (targetSelect > 0) {
    //       const obj = GlobalData.optManager.GetObjectPtr(targetSelect, false);
    //       let dimensions = null;
    //       if (obj && obj.GetDimensionsForDisplay) {
    //         dimensions = obj.GetDimensionsForDisplay();
    //       }
    //       GlobalData.optManager.UpdateDisplayCoordinates(dimensions, null, null, obj);
    //       GlobalData.optManager.ShowFrame(true);
    //     } else {
    //       GlobalData.optManager.ShowFrame(false);
    //     }
    //   } else {
    //     controlWrapper.Control.addClass("hide");
    //   }

    //   console.log("= D.DocHandler: ShowCoordinates - Output: returning true");
    //   return true;
    // }

    console.log("= D.DocHandler: ShowCoordinates - Output: condition not met, returning false");
    return false;
  };

  UpdateRulerVisibility() {
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

  SetupRulers() {
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
      new Hammer($(this.hRulerAreaID)[0]).on('doubletap', this.RulerTopDoubleClick);
      new Hammer($(this.vRulerAreaID)[0]).on('doubletap', this.RulerLeftDoubleClick);
      new Hammer($(this.cRulerAreaID)[0]).on('doubletap', this.RulerCenterDoubleClick);

      new Hammer($(this.hRulerAreaID)[0]).on('dragstart', this.RulerDragStart);
      new Hammer($(this.vRulerAreaID)[0]).on('dragstart', this.RulerDragStart);
      new Hammer($(this.cRulerAreaID)[0]).on('dragstart', this.RulerDragStart);

      new Hammer($(this.hRulerAreaID)[0]).on('drag', this.RulerTopDrag);
      new Hammer($(this.vRulerAreaID)[0]).on('drag', this.RulerLeftDrag);
      new Hammer($(this.cRulerAreaID)[0]).on('drag', this.RulerCenterDrag);

      new Hammer($(this.hRulerAreaID)[0]).on('dragend', this.RulerDragEnd);
      new Hammer($(this.vRulerAreaID)[0]).on('dragend', this.RulerDragEnd);
      new Hammer($(this.cRulerAreaID)[0]).on('dragend', this.RulerDragEnd);
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

  ResetRulers() {
    console.log("= D.DocHandler: ResetRulers - Input:");

    const workArea = this.svgDoc.GetWorkArea();
    const vRulerWidth = $(this.vRulerAreaID).width();
    const hRulerHeight = $(this.hRulerAreaID).height();

    console.log("= D.DocHandler: ResetRulers - WorkArea:", workArea, "vRulerWidth:", vRulerWidth, "hRulerHeight:", hRulerHeight);

    this.hRulerDoc.SetDocumentSize(workArea.docScreenWidth + 100, hRulerHeight);
    this.vRulerDoc.SetDocumentSize(vRulerWidth, workArea.docScreenHeight + 100);

    this.hRulerDoc.RemoveAll();
    this.vRulerDoc.RemoveAll();

    this.SetRulerContent(this.hRulerDoc, true);
    this.SetRulerContent(this.vRulerDoc, false);

    console.log("= D.DocHandler: ResetRulers - Output: Rulers have been reset");
  }

  SD_GetScaledRuler(inputScale: number): number {
    console.log("= D.DocHandler: SD_GetScaledRuler - Input:", {
      inputScale,
      docScale: this.svgDoc.docInfo.docScale
    });

    let docScaleFloor = Math.floor(this.svgDoc.docInfo.docScale);

    if (docScaleFloor === 0) {
      docScaleFloor = Math.floor(1 / this.svgDoc.docInfo.docScale);
      if (docScaleFloor > 1) {
        inputScale /= docScaleFloor;
      }
    } else if (docScaleFloor > 1) {
      inputScale *= docScaleFloor;
    }

    console.log("= D.DocHandler: SD_GetScaledRuler - Output:", {
      scaledValue: inputScale
    });

    return inputScale;
  }

  SetRulerContent(elem, isHorizontal) {
    console.log("= D.DocHandler: SetRulerContent - Input:", { elem, isHorizontal });

    // Get work area and ruler dimensions
    const workArea = this.svgDoc.GetWorkArea();
    const vRulerWidth = $(this.vRulerAreaID).width();
    const hRulerHeight = $(this.hRulerAreaID).height();
    const rulerLength = isHorizontal ? hRulerHeight : vRulerWidth;

    let scaledFactor = 1;
    const scaleAdj = this.SD_GetScaledRuler(scaledFactor);

    // Create a PATH shape used to draw tick marks
    const pathShape = elem.CreateShape(ConstantData.CreateShapeType.PATH);
    let pathStr = '';

    // Compute tick sizes for major, mid, and minor ticks
    const majorTickSize = Utils1.RoundCoordLP(Math.round(3 * rulerLength / 4));
    const midTickSize = Utils1.RoundCoordLP(Math.round(rulerLength / 2));
    const minorTickSize = Utils1.RoundCoordLP(Math.round(rulerLength / 4));

    let tickCounter = 0;

    // Adjust scale factor for metric units if needed
    if (!this.rulerSettings.useInches) {
      scaledFactor *= ConstantData.Defines.MetricConv;
    }

    const nTics = this.rulerSettings.nTics;
    let nMid = this.rulerSettings.nMid;
    if (nTics % 2) {
      nMid = 0;
    }
    const divider = Math.round(nTics / (nMid + 1));

    // Total available length in screen coordinates (width for horizontal, height for vertical)
    const totalLength = isHorizontal ? workArea.docScreenWidth : workArea.docScreenHeight;
    let majorTickSpacing = this.rulerSettings.major / scaledFactor;
    // Container for label data
    const labels = [];

    // Calculate fractional origin adjustment
    let origin = isHorizontal ? this.rulerSettings.originx : this.rulerSettings.originy;
    let fracOrigin = origin - Math.floor(origin);
    if (fracOrigin) {
      fracOrigin -= 1;
    }
    fracOrigin *= majorTickSpacing;

    // Compute initial label offset
    let labelOffset = -Math.ceil(origin) * this.rulerSettings.majorScale;
    // Adjust tick spacing by scaleAdj factor
    majorTickSpacing /= scaleAdj;

    // Loop until the ticks generated cover the full available length
    let currentScreenCoord = 0;
    do {
      // Compute the starting coordinate for this major tick mark
      let baseValue = fracOrigin + tickCounter * (this.rulerSettings.major / scaleAdj / scaledFactor);
      let majorCoord = Utils1.RoundCoordLP(baseValue * workArea.docToScreenScale);

      // Compute label value based on the tick counter and major scale
      let labelValue = this.rulerSettings.showpixels
        ? 100 * (labelOffset + tickCounter * (this.rulerSettings.majorScale / scaleAdj))
        : (labelOffset + tickCounter * (this.rulerSettings.majorScale / scaleAdj));

      // Append label and add the major tick path command
      if (isHorizontal) {
        labels.push({ label: labelValue, x: majorCoord + 2, y: 1 });
        pathStr += `M${majorCoord},${rulerLength}v-${majorTickSize}`;
      } else {
        labels.push({ label: labelValue, x: 3, y: majorCoord + 2 });
        pathStr += `M${rulerLength},${majorCoord}h-${majorTickSize}`;
      }

      // Draw intermediate ticks for this major interval
      for (let u = 1; u < nTics; u++) {
        let tickValue = baseValue + u * (majorTickSpacing / nTics);
        let tickCoord = Utils1.RoundCoordLP(tickValue * workArea.docToScreenScale);
        let tickLen = (u % divider) ? minorTickSize : midTickSize;
        if (isHorizontal) {
          pathStr += `M${tickCoord},${rulerLength}v-${tickLen}`;
        } else {
          pathStr += `M${rulerLength},${tickCoord}h-${tickLen}`;
        }
      }

      // Update current screen coordinate for loop termination
      currentScreenCoord = Utils1.RoundCoordLP((fracOrigin + (tickCounter + 1) * (this.rulerSettings.major / scaleAdj / scaledFactor)) * workArea.docToScreenScale);
      tickCounter++;
    } while (currentScreenCoord < totalLength);

    // Set the generated path and style it
    pathShape.SetPath(pathStr);
    pathShape.SetFillColor("none");
    pathShape.SetStrokeColor("#000");
    pathShape.SetStrokeWidth(".5");
    elem.AddElement(pathShape);
    elem.SetCursor(ConstantData.CursorType.DEFAULT);

    // Decide whether numeric labels need a fixed decimal format
    let needDecimal = false;
    for (let u = 0; u < labels.length; u++) {
      if (labels[u].label !== parseInt(labels[u].label, 10)) {
        needDecimal = true;
        break;
      }
    }
    if (needDecimal) {
      for (let u = 0; u < labels.length; u++) {
        labels[u].label = labels[u].label.toFixed(1);
      }
    }

    // Define text style and add labels at intervals to avoid overcrowding
    const textStyle = {
      size: 10,
      color: "#000"
    };
    const labelCount = labels.length;
    const step = Math.floor(labelCount / 250) || 1;
    for (let u = 0; u < labelCount; u += step) {
      const textShape = elem.CreateShape(ConstantData.CreateShapeType.TEXT);
      textShape.SetText(labels[u].label, textStyle);
      elem.AddElement(textShape);
      textShape.SetPos(labels[u].x, labels[u].y);
    }

    console.log("= D.DocHandler: SetRulerContent - Output:", { path: pathStr, labels });
  };

  SyncRulers(): void {
    // Get current scroll positions of the svg area
    const hScroll: number = $(this.svgAreaID).scrollLeft();
    const vScroll: number = $(this.svgAreaID).scrollTop();

    // Log input values
    console.log("= D.DocHandler: SyncRulers - Input:", { hScroll, vScroll });

    // Sync horizontal and vertical rulers with the svg area's scroll positions
    $(this.hRulerAreaID).scrollLeft(hScroll);
    $(this.vRulerAreaID).scrollTop(vScroll);

    // Log output after synchronizing rulers
    console.log("= D.DocHandler: SyncRulers - Output: Rulers synchronized", { hScroll, vScroll });
  }

  UpdateGridVisibility() {
    console.log("= D.DocHandler: UpdateGridVisibility - Input:", {
      showGrid: this.documentConfig.showGrid,
      currentGridVisibility: this.gridVis
    });

    const gridLayer = this.svgDoc ? this.svgDoc.GetLayer(this.gridLayer) : null;
    let updated = false;

    if (!gridLayer) {
      console.log("= D.DocHandler: UpdateGridVisibility - Output: Grid layer not found.");
      return updated;
    }

    if (this.documentConfig.showGrid === this.gridVis) {
      console.log("= D.DocHandler: UpdateGridVisibility - Output: No change in grid visibility. Current value:", this.gridVis);
      return updated;
    }

    gridLayer.SetVisible(this.documentConfig.showGrid);
    this.gridVis = this.documentConfig.showGrid;
    updated = true;

    console.log("= D.DocHandler: UpdateGridVisibility - Output: Grid visibility updated to", this.gridVis);
    return updated;
  }

  UpdateGrid() {
    console.log("= D.DocHandler: UpdateGrid - Input:", {
      workArea: this.svgDoc.GetWorkArea(),
      gridLayer: this.gridLayer,
      rulerSettings: this.rulerSettings
    });

    const workArea = this.svgDoc.GetWorkArea();
    const gridLayer = this.svgDoc.GetLayer(this.gridLayer);
    let conversionFactor = 1;

    if (gridLayer) {
      // Get the scale factor based on the current conversion factor
      const scaleFactor = this.SD_GetScaledRuler(conversionFactor);
      gridLayer.RemoveAll();

      const majorPath = this.svgDoc.CreateShape(ConstantData.CreateShapeType.PATH);
      const minorPath = this.svgDoc.CreateShape(ConstantData.CreateShapeType.PATH);

      // Update conversionFactor if not using inches
      if (!this.rulerSettings.useInches) {
        conversionFactor = ConstantData.Defines.MetricConv;
      }

      const majorUnit = this.rulerSettings.major / conversionFactor;
      const gridDivisions = this.rulerSettings.nGrid * scaleFactor;

      let pathMajor = "";
      let pathMinor = "";

      // Calculate margins and document boundaries
      const paperSize = GlobalData.optManager.theContentHeader.Page.papersize;
      const margins = GlobalData.optManager.theContentHeader.Page.margins;
      const paperMarginX =
        paperSize.x - (margins.left + margins.right) / 2;
      const paperMarginY =
        paperSize.y - (margins.top + margins.bottom) / 2;

      // Compute screen boundaries for the grid
      const endX = Utils1.RoundCoordLP(
        workArea.docScreenWidth + 2 * paperMarginX * workArea.docToScreenScale
      );
      const endY = Utils1.RoundCoordLP(
        workArea.docScreenHeight + 2 * paperMarginY * workArea.docToScreenScale
      );
      const startX = -Utils1.RoundCoordLP(
        paperMarginX * workArea.docToScreenScale
      );
      const startY = -Utils1.RoundCoordLP(
        paperMarginY * workArea.docToScreenScale
      );
      const maxX = startX + endX;
      const maxY = startY + endY;

      // Calculate horizontal grid lines (vertical lines in the grid)
      let offsetFractionX = this.rulerSettings.originx - Math.floor(this.rulerSettings.originx);
      if (offsetFractionX) {
        offsetFractionX -= 1;
      }
      // Adjust the starting offset in document units
      offsetFractionX *= majorUnit;

      // Start index for horizontal grid lines
      let gridIndexX = -Math.ceil(paperMarginX / majorUnit);
      let currentX = 0;
      let tempValue = 0;
      do {
        // Calculate the current grid line position in document units
        tempValue = offsetFractionX + gridIndexX * (this.rulerSettings.major / conversionFactor);
        currentX = Utils1.RoundCoordLP(tempValue * workArea.docToScreenScale);
        if (currentX > maxX) break;

        // Append the major grid line (vertical line)
        pathMajor += `M${currentX},${startY}v${endY}`;
        // Draw intermediate (minor) grid lines between major grid lines
        for (let i = 1; i < gridDivisions; i++) {
          tempValue =
            offsetFractionX +
            gridIndexX * (this.rulerSettings.major / conversionFactor) +
            i * (majorUnit / gridDivisions);
          currentX = Utils1.RoundCoordLP(tempValue * workArea.docToScreenScale);
          if (currentX > maxX) break;
          pathMinor += `M${currentX},${startY}v${endY}`;
        }
        gridIndexX++;
      } while (currentX < maxX);

      // Calculate vertical grid lines (horizontal lines in the grid)
      let offsetFractionY = this.rulerSettings.originy - Math.floor(this.rulerSettings.originy);
      if (offsetFractionY) {
        offsetFractionY -= 1;
      }
      offsetFractionY *= majorUnit;

      // Start index for vertical grid lines
      let gridIndexY = -Math.ceil(paperMarginY / majorUnit);
      let currentY = 0;
      do {
        tempValue = offsetFractionY + gridIndexY * (this.rulerSettings.major / conversionFactor);
        currentY = Utils1.RoundCoordLP(tempValue * workArea.docToScreenScale);
        if (currentY > maxY) break;

        // Append the major grid line (horizontal line)
        pathMajor += `M${startX},${currentY}h${endX}`;
        // Draw intermediate (minor) grid lines between major lines
        for (let i = 1; i < gridDivisions; i++) {
          tempValue =
            offsetFractionY +
            gridIndexY * (this.rulerSettings.major / conversionFactor) +
            i * (majorUnit / gridDivisions);
          currentY = Utils1.RoundCoordLP(tempValue * workArea.docToScreenScale);
          if (currentY > maxY) break;
          pathMinor += `M${startX},${currentY}h${endX}`;
        }
        gridIndexY++;
      } while (currentY < maxY);

      // Set the path and styling for major grid lines
      majorPath.SetPath(pathMajor);
      majorPath.SetFillColor("none");
      majorPath.SetStrokeColor("#000");
      majorPath.SetStrokeOpacity(".4");
      majorPath.SetStrokeWidth(".5");

      // Set the path and styling for minor grid lines
      minorPath.SetPath(pathMinor);
      minorPath.SetFillColor("none");
      minorPath.SetStrokeColor("#000");
      minorPath.SetStrokeOpacity(".2");
      minorPath.SetStrokeWidth(".5");

      gridLayer.AddElement(minorPath);
      gridLayer.AddElement(majorPath);
      gridLayer.SetEventBehavior(ConstantData.EventBehavior.NONE);

      console.log("= D.DocHandler: UpdateGrid - Output:", {
        pathMajor,
        pathMinor,
        boundaries: { startX, startY, endX, endY, maxX, maxY }
      });
    }
  }

  UpdatePageDividerVisibility() {

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

  UpdatePageDivider() {
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

  SnapToGrid(inputPoint: { x: number; y: number }) {
    console.log("= D.DocHandler: SnapToGrid - Input:", inputPoint);

    // Ensure the work area is updated (although not used further)
    this.svgDoc.GetWorkArea();

    // Determine conversion factor (1 for inches, MetricConv for metric)
    let conversionFactor = 1;
    if (!this.rulerSettings.useInches) {
      conversionFactor = ConstantData.Defines.MetricConv;
    }

    // Get the scaled ruler adjustment value
    const scaleAdjusted = this.SD_GetScaledRuler(conversionFactor);

    // Make copies of the input coordinates
    let remaining = { x: inputPoint.x, y: inputPoint.y };
    let snapped = { x: 0, y: 0 };

    // Calculate the major unit in document units
    const majorUnit = this.rulerSettings.major / conversionFactor;
    // Calculate the snap step: dividing major unit by the number of grid divisions and scale adjustment
    const snapStep = majorUnit / (this.rulerSettings.nGrid * scaleAdjusted);

    // Process X coordinate
    const gridCountX = Math.floor(remaining.x / majorUnit);
    snapped.x = gridCountX * majorUnit;
    remaining.x -= snapped.x;
    const snapStepsX = Math.round(remaining.x / snapStep);
    snapped.x += snapStepsX * snapStep;

    // Process Y coordinate
    const gridCountY = Math.floor(remaining.y / majorUnit);
    snapped.y = gridCountY * majorUnit;
    remaining.y -= snapped.y;
    const snapStepsY = Math.round(remaining.y / snapStep);
    snapped.y += snapStepsY * snapStep;

    console.log("= D.DocHandler: SnapToGrid - Output:", snapped);
    return snapped;
  }

  RulerTopDoubleClick(event) {
    console.log("= D.DocHandler: RulerTopDoubleClick - Input:", { event });

    Utils2.StopPropagationAndDefaults(event);
    GlobalData.docHandler.RulerHandleDoubleClick(event, false, true);

    console.log("= D.DocHandler: RulerTopDoubleClick - Output: Completed");
  }

  RulerLeftDoubleClick(event: any): void {
    console.log("= D.DocHandler: RulerLeftDoubleClick - Input:", { event });
    Utils2.StopPropagationAndDefaults(event);
    GlobalData.docHandler.RulerHandleDoubleClick(event, true, false);
    console.log("= D.DocHandler: RulerLeftDoubleClick - Output: Completed");
  }

  RulerCenterDoubleClick(event: any): void {
    console.log("= D.DocHandler: RulerCenterDoubleClick - Input:", { event });
    Utils2.StopPropagationAndDefaults(event);
    GlobalData.docHandler.RulerHandleDoubleClick(event, true, true);
    console.log("= D.DocHandler: RulerCenterDoubleClick - Output: Completed");
  }

  RulerDragStart(event: any): void {
    console.log("= D.DocHandler: RulerDragStart - Input:", { event });

    if (!GlobalData.docHandler.IsReadOnly()) {
      if (GlobalData.optManager.IsRightClick(event)) {
        Utils2.StopPropagationAndDefaults(event);
        console.log("= D.DocHandler: RulerDragStart - Right click detected. Showing dropdown.");
        // SDUI.Commands.MainController.ShowDropdown(
        //   Resources.Controls.Dropdowns.SetScale.Id.toLowerCase(),
        //   event.gesture.center.clientX,
        //   event.gesture.center.clientY
        // );
        console.log("= D.DocHandler: RulerDragStart - Output: Dropdown shown");
        return;
      }
      GlobalData.docHandler.rulerInDrag = true;
      console.log("= D.DocHandler: RulerDragStart - Output:", { rulerInDrag: GlobalData.docHandler.rulerInDrag });
    } else {
      console.log("= D.DocHandler: RulerDragStart - Output: Read-only mode, no action performed");
    }
  }

  RulerTopDrag(e) {
    console.log("= D.DocHandler: RulerTopDrag - Input:", e);

    // Stop propagation and default behavior
    Utils2.StopPropagationAndDefaults(e);

    // If Ctrl-click is detected, treat as a double-click event
    if (GlobalData.optManager.IsCtrlClick(e)) {
      console.log("= D.DocHandler: RulerTopDrag - Ctrl click detected, invoking double click handler");
      // Stop propagation again to ensure proper handling
      Utils2.StopPropagationAndDefaults(e);
      GlobalData.docHandler.RulerHandleDoubleClick(e, false, true);
      console.log("= D.DocHandler: RulerTopDrag - Output: Handled as double click");
      return;
    }

    // Otherwise, initiate ruler drag guides for top ruler
    GlobalData.docHandler.RulerDragGuides(e, false, true);
    console.log("= D.DocHandler: RulerTopDrag - Output: Ruler drag guides initiated");
  }

  RulerLeftDrag(event: any) {
    console.log("= D.DocHandler: RulerLeftDrag - Input:", { event });

    // Stop event propagation and defaults
    Utils2.StopPropagationAndDefaults(event);

    if (GlobalData.optManager.IsCtrlClick(event)) {
      console.log("= D.DocHandler: RulerLeftDrag - Ctrl click detected");
      Utils2.StopPropagationAndDefaults(event);
      GlobalData.docHandler.RulerHandleDoubleClick(event, true, false);
      console.log("= D.DocHandler: RulerLeftDrag - Output: Handled as double click");
      return;
    }

    GlobalData.docHandler.RulerDragGuides(event, true, false);
    console.log("= D.DocHandler: RulerLeftDrag - Output: Drag guides initiated");
  }

  RulerCenterDrag(e: any): void {
    console.log("= D.DocHandler: RulerCenterDrag - Input:", { event: e });

    // Stop event propagation and defaults
    Utils2.StopPropagationAndDefaults(e);

    // Check if Ctrl-click is detected
    if (GlobalData.optManager.IsCtrlClick(e)) {
      console.log("= D.DocHandler: RulerCenterDrag - Ctrl click detected, invoking double click handler");
      Utils2.StopPropagationAndDefaults(e);
      GlobalData.docHandler.RulerHandleDoubleClick(e, true, true);
      console.log("= D.DocHandler: RulerCenterDrag - Output: Double click action completed");
      return;
    }

    // Initiate ruler drag guides for center ruler
    GlobalData.docHandler.RulerDragGuides(e, true, true);
    console.log("= D.DocHandler: RulerCenterDrag - Output: Drag guides initiated");
  }

  RulerDragEnd(e) {
    console.log("= D.DocHandler: RulerDragEnd - Input:", { event: e });

    Utils2.StopPropagationAndDefaults(e);
    GlobalData.docHandler.RulerEndGuides();

    console.log("= D.DocHandler: RulerDragEnd - Output: Completed");
  }

  RulerHandleDoubleClick(event: any, isVertical: boolean, isCenter: boolean) {
    console.log("= D.DocHandler: RulerHandleDoubleClick - Input:", { event, isVertical, isCenter });

    // Check if the event is not a right-click
    if (!GlobalData.optManager.IsRightClick(event)) {
      // Initialize new origin values using current ruler settings
      let newOrigin = {
        originx: this.rulerSettings.originx,
        originy: this.rulerSettings.originy
      };

      // Convert window coordinates to document coordinates
      const docCoords = this.svgDoc.ConvertWindowToDocCoords(
        event.gesture.center.clientX,
        event.gesture.center.clientY
      );
      this.svgDoc.GetWorkArea();

      // End any ongoing ruler drag
      this.rulerInDrag = false;

      if (!this.IsReadOnly()) {
        if (isVertical && isCenter) {
          // If both vertical and center are true, reset both origins to zero.
          newOrigin.originx = 0;
          newOrigin.originy = 0;
        } else if (isCenter) {
          // If only center is active, update the horizontal origin.
          newOrigin.originx = docCoords.x / this.rulerSettings.major;
          if (!this.rulerSettings.useInches) {
            newOrigin.originx *= ConstantData.Defines.MetricConv;
          }
        } else if (isVertical) {
          // If only vertical is active, update the vertical origin.
          newOrigin.originy = docCoords.y / this.rulerSettings.major;
          if (!this.rulerSettings.useInches) {
            newOrigin.originy *= ConstantData.Defines.MetricConv;
          }
        } else {
          console.log("= D.DocHandler: RulerHandleDoubleClick - Early Exit: No valid direction specified.");
          return;
        }

        // Update rulers with the new origin values and show coordinates
        this.SetRulers(newOrigin);
        this.ShowCoordinates(true);

        // Update selection attributes for the currently selected object(s)
        const selectedObjects = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSelectedListBlockID, false);
        GlobalData.optManager.UpdateSelectionAttributes(selectedObjects);

        console.log("= D.DocHandler: RulerHandleDoubleClick - Output:", { newOrigin, selectedObjects });
      }
    }
  }

  RulerDragGuides(event: any, isVertical: boolean, isCenter: boolean) {
    console.log("= D.DocHandler: RulerDragGuides - Input:", { event, isVertical, isCenter });

    const workArea = this.svgDoc.GetWorkArea();
    const scaleFactor = 1 / workArea.docScale;
    const strokePattern = `${4 * scaleFactor},${2 * scaleFactor}`;

    if (this.rulerInDrag) {
      // Condition: if one of the guides is active when it is not required, then reset guides.
      if (
        (this.hRulerGuide && !isCenter) ||
        (this.vRulerGuide && !isVertical) ||
        (isCenter && !this.hRulerGuide) ||
        (isVertical && !this.vRulerGuide)
      ) {
        this.RulerEndGuides();
        this.rulerInDrag = true;
      }

      // Create horizontal guide if vertical flag is true and it is not created yet.
      if (isVertical && !this.hRulerGuide) {
        this.hRulerGuide = this.svgDoc.CreateShape(ConstantData.CreateShapeType.LINE);
        this.hRulerGuide.SetFillColor('none');
        this.hRulerGuide.SetStrokeColor('black');
        this.hRulerGuide.SetStrokeWidth(scaleFactor);
        this.hRulerGuide.SetStrokePattern(strokePattern);
        GlobalData.optManager.svgOverlayLayer.AddElement(this.hRulerGuide);
      }

      // Create vertical guide if center flag is true and it is not created yet.
      if (isCenter && !this.vRulerGuide) {
        this.vRulerGuide = this.svgDoc.CreateShape(ConstantData.CreateShapeType.LINE);
        this.vRulerGuide.SetFillColor('none');
        this.vRulerGuide.SetStrokeColor('black');
        this.vRulerGuide.SetStrokeWidth(scaleFactor);
        this.vRulerGuide.SetStrokePattern(strokePattern);
        GlobalData.optManager.svgOverlayLayer.AddElement(this.vRulerGuide);
      }

      // Update ruler guide window position from event gesture center coordinates.
      this.rulerGuideWinPos.x = event.gesture.center.clientX;
      this.rulerGuideWinPos.y = event.gesture.center.clientY;

      // If not center dragging, reset horizontal position to the center of work area.
      if (!isCenter) {
        this.rulerGuideWinPos.x = workArea.dispX + workArea.dispWidth / 2;
      }
      // If not vertical dragging, reset vertical position to the center of work area.
      if (!isVertical) {
        this.rulerGuideWinPos.y = workArea.dispY + workArea.dispHeight / 2;
      }

      // Draw the updated guides.
      this.RulerDrawGuides();

      // Start auto-scroll if not already started.
      if (
        !this.rulerGuideScrollTimer &&
        (
          !(isVertical && isCenter) ||
          (this.rulerGuideWinPos.x > workArea.dispX && this.rulerGuideWinPos.y > workArea.dispY)
        )
      ) {
        this.rulerGuideScrollTimer = setInterval(() => {
          GlobalData.docHandler.RulerAutoScrollGuides();
        }, 100);
      }
    }

    console.log("= D.DocHandler: RulerDragGuides - Output:", {
      hRulerGuide: this.hRulerGuide ? "exists" : "null",
      vRulerGuide: this.vRulerGuide ? "exists" : "null",
      rulerGuideWinPos: this.rulerGuideWinPos,
      rulerGuideScrollTimer: this.rulerGuideScrollTimer ? "active" : "inactive"
    });
  }

  RulerAutoScrollGuides() {
    console.log("= D.DocHandler: RulerAutoScrollGuides - Input:", {
      rulerGuideWinPos: this.rulerGuideWinPos,
      workArea: this.svgDoc.GetWorkArea()
    });

    const workArea = this.svgDoc.GetWorkArea();
    let needAutoScroll = false;
    const docCoords = this.svgDoc.ConvertWindowToDocCoords(
      this.rulerGuideWinPos.x,
      this.rulerGuideWinPos.y
    );

    // Check if the ruler guide window position is outside of the visible work area.
    if (
      this.rulerGuideWinPos.x < workArea.dispX ||
      this.rulerGuideWinPos.x > workArea.dispX + workArea.dispWidth ||
      this.rulerGuideWinPos.y < workArea.dispY ||
      this.rulerGuideWinPos.y > workArea.dispY + workArea.dispHeight
    ) {
      needAutoScroll = true;
    }

    if (needAutoScroll) {
      this.ScrollToPosition(docCoords.x, docCoords.y);
      this.RulerDrawGuides();
    }

    console.log("= D.DocHandler: RulerAutoScrollGuides - Output:", {
      autoScroll: needAutoScroll,
      docCoords: docCoords
    });
  }

  RulerDrawGuides() {
    console.log("= D.DocHandler: RulerDrawGuides - Input:", {
      rulerGuideWinPos: this.rulerGuideWinPos
    });

    const workArea = this.svgDoc.GetWorkArea();
    let docCoords = this.svgDoc.ConvertWindowToDocCoords(
      this.rulerGuideWinPos.x,
      this.rulerGuideWinPos.y
    );

    if (this.documentConfig.enableSnap) {
      docCoords = this.SnapToGrid(docCoords);
    }

    // Update vertical ruler guide (if exists)
    if (this.vRulerGuide) {
      // Constrain x coordinate to visible document bounds
      if (docCoords.x < workArea.docVisX) {
        docCoords.x = workArea.docVisX;
      } else if (docCoords.x > workArea.docVisX + workArea.docVisWidth) {
        docCoords.x = workArea.docVisX + workArea.docVisWidth;
      }
      this.vRulerGuide.SetPoints(docCoords.x, 0, docCoords.x, workArea.docHeight);
    }

    // Update horizontal ruler guide (if exists)
    if (this.hRulerGuide) {
      // Constrain y coordinate to visible document bounds
      if (docCoords.y < workArea.docVisY) {
        docCoords.y = workArea.docVisY;
      } else if (docCoords.y > workArea.docVisY + workArea.docVisHeight) {
        docCoords.y = workArea.docVisY + workArea.docVisHeight;
      }
      this.hRulerGuide.SetPoints(0, docCoords.y, workArea.docWidth, docCoords.y);
    }

    console.log("= D.DocHandler: RulerDrawGuides - Output:", {
      updatedCoordinates: docCoords,
      workArea
    });
  }

  RulerEndGuides(): void {
    console.log("= D.DocHandler: RulerEndGuides - Input:", {
      rulerGuideScrollTimer: this.rulerGuideScrollTimer,
      hRulerGuide: this.hRulerGuide,
      vRulerGuide: this.vRulerGuide,
      rulerInDrag: this.rulerInDrag
    });

    if (this.rulerGuideScrollTimer) {
      clearInterval(this.rulerGuideScrollTimer);
      this.rulerGuideScrollTimer = null;
    }

    if (this.hRulerGuide) {
      GlobalData.optManager.svgOverlayLayer.RemoveElement(this.hRulerGuide);
      this.hRulerGuide = null;
    }

    if (this.vRulerGuide) {
      GlobalData.optManager.svgOverlayLayer.RemoveElement(this.vRulerGuide);
      this.vRulerGuide = null;
    }

    this.rulerInDrag = false;

    console.log("= D.DocHandler: RulerEndGuides - Output:", {
      rulerGuideScrollTimer: this.rulerGuideScrollTimer,
      hRulerGuide: this.hRulerGuide,
      vRulerGuide: this.vRulerGuide,
      rulerInDrag: this.rulerInDrag
    });
  }

  SnapRect(rect: { x: number; y: number; width: number; height: number }): { x: number; y: number } {
    console.log("= D.DocHandler: SnapRect - Input:", rect);

    // Calculate the original top-left and bottom-right coordinates
    const topLeft = { x: rect.x, y: rect.y };
    const bottomRight = { x: rect.x + rect.width, y: rect.y + rect.height };

    // Snap the top-left and bottom-right coordinates to the grid
    const snappedTopLeft = this.SnapToGrid(topLeft);
    const snappedBottomRight = this.SnapToGrid(bottomRight);

    // Calculate the difference for the x coordinate
    const deltaXTop = snappedTopLeft.x - topLeft.x;
    const deltaXBottom = snappedBottomRight.x - bottomRight.x;
    const snapX = Math.abs(deltaXTop) > Math.abs(deltaXBottom) ? deltaXBottom : deltaXTop;

    // Calculate the difference for the y coordinate
    const deltaYTop = snappedTopLeft.y - topLeft.y;
    const deltaYBottom = snappedBottomRight.y - bottomRight.y;
    const snapY = Math.abs(deltaYTop) > Math.abs(deltaYBottom) ? deltaYBottom : deltaYTop;

    const output = { x: snapX, y: snapY };
    console.log("= D.DocHandler: SnapRect - Output:", output);
    return output;
  }

  UpdateConfig(config: any) {
    console.log("= D.DocHandler: UpdateConfig - Input:", config);
    this.documentConfig = config;
    this.UpdateRulerVisibility();
    this.UpdateGridVisibility();
    this.UpdatePageDividerVisibility();
    console.log("= D.DocHandler: UpdateConfig - Output: Updated documentConfig", this.documentConfig);
  }

  GetBackground() {
    return this.backgroundElem
  }


  IsReadOnly() {
    // return SDUI.AppSettings.ReadOnly
    return false;//Double ========
  }

  InitSpellCheck() {
    // this.svgDoc &&
    //   this.svgDoc.InitSpellCheck()
  }

  InitSpellCheckUser() {
    // this.svgDoc &&
    //   this.svgDoc.InitSpellCheckUser()
  }

  // SetPageMargins = (e) => {
  //   try {
  //     if (GlobalData.optManager.theContentHeader.Page.margins.left !== e) {
  //       if (
  //         Collab.AllowMessage() &&
  //         Collab.BeginSecondaryEdit(),
  //         GlobalData.optManager.theContentHeader.Page.margins.left = e,
  //         GlobalData.optManager.theContentHeader.Page.margins.top = e,
  //         GlobalData.optManager.theContentHeader.Page.margins.right = e,
  //         GlobalData.optManager.theContentHeader.Page.margins.bottom = e,
  //         GlobalData.optManager.FitDocumentWorkAreaToPaperSize(),
  //         Collab.AllowMessage()
  //       ) {
  //         var t = {
  //           margin: e
  //         };
  //         Collab.BuildMessage(ConstantData.CollabMessages.SetPageMargins, t, !1)
  //       }
  //       GlobalData.optManager.CompleteOperation()
  //     }
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  // SetCustomPageMargins = (e, t, a, r) => {
  //   try {
  //     if (
  //       Collab.AllowMessage() &&
  //       Collab.BeginSecondaryEdit(),
  //       GlobalData.optManager.theContentHeader.Page.margins.left = e,
  //       GlobalData.optManager.theContentHeader.Page.margins.top = t,
  //       GlobalData.optManager.theContentHeader.Page.margins.right = a,
  //       GlobalData.optManager.theContentHeader.Page.margins.bottom = r,
  //       GlobalData.optManager.FitDocumentWorkAreaToPaperSize(),
  //       Collab.AllowMessage()
  //     ) {
  //       var i = {
  //         left: e,
  //         top: t,
  //         right: a,
  //         bottom: r
  //       };
  //       Collab.BuildMessage(ConstantData.CollabMessages.SetCustomPageMargins, i, !1)
  //     }
  //     GlobalData.optManager.CompleteOperation()
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  // SetIncludeLinks = (e) => {
  //   this.documentConfig.includeLinks = e
  // }

  // GetIncludeLinks = () => {
  //   return this.documentConfig.includeLinks
  // }

}

export default DocHandler
