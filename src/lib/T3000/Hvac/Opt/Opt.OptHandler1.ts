

import Models from '../Data/Constant';
import Formatter from '../Basic/B.Text.Formatter';
import Text from '../Basic/B.Text';
import ContentHeader from '../Doc/Doc.ContentHeader';
import DocHandler from '../Doc/Doc.DocHandler1';
import * as Utils from '../Helper/Utils1';
import Point from '../Model/Point';

class OptHandler1 {

  //#region

  public svgDocId: string;
  public svgObjectLayer: any;
  public svgOverlayLayer: any;
  public svgHighlightLayer: any;
  public svgCollabLayer: any;
  public SVGroot: any;
  public dragStartX: number;
  public dragStartY: number;
  public dragDeltaX: number;
  public dragDeltaY: number;
  public dragTargetId: any;
  public dragTargetBBox: any;
  public dragGotMove: boolean;
  public dragGotAutoResizeRight: boolean;
  public dragGotAutoResizeBottom: boolean;
  public dragGotAutoResizeOldX: any[];
  public dragGotAutoResizeOldY: any[];
  public drawStartX: number;
  public drawStartY: number;
  public lineDrawStartX: number;
  public lineDrawStartY: number;
  public lineDrawId: number;
  public lineDrawLineId: number;
  public autoScrollTimerId: number;
  public autoScrollXPos: number;
  public autoScrollYPos: number;
  public inAutoScroll: boolean;
  public textEntryTimer: any;
  public TopLeftPastePos: any;
  public TopLeftPasteScrollPos: any;
  public theContentHeader: any;
  public inZoomIdle: boolean;
  public rubberBandFrame: any;
  public rubberBandStartX: number = 0;
  public rubberBandStartY: number = 0;
  public rubberBand: any;
  public svgDoc: any;
  public docHandler: DocHandler;

  //#endregion

  Initialize = () => {

    //#region

    this.svgDocId = 'svg-area';
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.dragDeltaX = 0;
    this.dragDeltaY = 0;
    this.dragTargetId = null;
    this.dragTargetBBox = {};
    this.dragGotMove = false;
    this.dragGotAutoResizeRight = false;
    this.dragGotAutoResizeBottom = false;
    this.dragGotAutoResizeOldX = [];
    this.dragGotAutoResizeOldY = [];
    this.drawStartX = 0;
    this.drawStartY = 0;
    this.lineDrawStartX = 0;
    this.lineDrawStartY = 0;
    this.lineDrawId = -1;
    this.lineDrawLineId = -1;
    this.autoScrollTimerId = -1;
    this.autoScrollXPos = 0;
    this.autoScrollYPos = 0;
    this.inAutoScroll = true;
    this.textEntryTimer = null;
    // this.svgDoc = null;
    this.svgObjectLayer = null;
    this.svgOverlayLayer = null;
    this.svgHighlightLayer = null;
    this.theContentHeader = new ContentHeader();
    this.InitSVGDocument();
    this.SVGroot = this.svgDoc.svgObj.node;
    this.TopLeftPastePos = { x: 0, y: 0 };
    this.TopLeftPasteScrollPos = { x: 0, y: 0 };
    this.theContentHeader = new ContentHeader();

    //#endregion
  }

  InitSVGDocument = () => {
    this.svgObjectLayer = this.svgDoc.AddLayer('svgObjectLayer');
    this.svgDoc.SetDocumentLayer('svgObjectLayer');
    this.svgOverlayLayer = this.svgDoc.AddLayer('svgOverlayLayer');
    this.svgOverlayLayer.ExcludeFromExport(true);
    this.svgHighlightLayer = this.svgDoc.AddLayer('svgHighlightLayer');
    this.svgHighlightLayer.ExcludeFromExport(true);
    this.svgCollabLayer = this.svgDoc.AddLayer('svgCollabLayer');
    this.svgCollabLayer.ExcludeFromExport(true);
    this.svgCollabLayer.AllowScaling(false);
  }

  UpdateDocumentScale = () => {
    // Reset all svg items
  }

  IsRightClick = (event) => {
    let isRightClick = false;

    if (event instanceof MouseEvent) {
      isRightClick = (event.which === 3 || (event.ctrlKey && event.metaKey));
    } else if ('onpointerdown' in window && event instanceof PointerEvent) {
      isRightClick = (event.which === 3);
    }

    return isRightClick;
  }

  ShowXY = (showRulers: boolean) => {
    this.docHandler.documentConfig.showRulers = showRulers;
  }

  IsCtrlClick = (event) => {
    let isCtrlClick = false;

    if (event instanceof MouseEvent || ('onpointerdown' in window && event instanceof PointerEvent)) {
      isCtrlClick = event.ctrlKey;
    }

    return isCtrlClick;
  }

  SetDocumentScale = (scale: number, adjustScroll: boolean) => {
    if (this.svgDoc) {
      this.docHandler.SetZoomFactor(scale, adjustScroll);
    }
  }

  UpdateDisplayCoordinates = function (coords, cursorPos, cursorType, dimensionFlags) {

  }

  StartRubberBandSelect = (e) => {
    console.log('StartRubberBandSelect event:', e);

    const rubberBand = this.svgDoc.CreateShape(Models.CreateShapeType.RECT);
    rubberBand.SetStrokeColor("black");

    rubberBand.SetFillColor("black");
    rubberBand.SetFillOpacity(0.03);

    const scale = 1 / this.docHandler.GetZoomFactor();
    rubberBand.SetStrokeWidth(1 * scale);

    const pattern = `${2 * scale},${scale}`;
    rubberBand.SetStrokePattern(pattern);

    const coords = this.svgDoc.ConvertWindowToDocCoords(e.clientX, e.clientY);
    this.rubberBandStartX = coords.x;
    this.rubberBandStartY = coords.y;

    console.log('StartRubberBandSelect coords: 1', e.clientX, e.clientY);
    console.log('StartRubberBandSelect coords: 2', coords.x, coords.y);

    rubberBand.SetSize(1, 1);
    rubberBand.SetPos(coords.x, coords.y);

    this.svgOverlayLayer.AddElement(rubberBand);
    this.rubberBand = rubberBand;

    console.log('StartRubberBandSelect rubberBand:', this.rubberBand);

    this.EndStampSession();
  }


  AutoScrollCommon = (e, t, a) => {
    let isAutoScrollNeeded = false;
    // this.OverrideSnaps(e) && (t = false);

    let clientX, clientY;
    if (e.gesture) {
      clientX = e.gesture.center.clientX;
      clientY = e.gesture.center.clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    let scrollX = clientX;
    let scrollY = clientY;

    if (clientX >= this.svgDoc.docInfo.dispX + this.svgDoc.docInfo.dispWidth - 8) {
      isAutoScrollNeeded = true;
      scrollX = this.svgDoc.docInfo.dispX + this.svgDoc.docInfo.dispWidth - 8 + 32;
    }

    if (clientX < this.svgDoc.docInfo.dispX) {
      isAutoScrollNeeded = true;
      scrollX = this.svgDoc.docInfo.dispX - 32;
    }

    if (clientY >= this.svgDoc.docInfo.dispY + this.svgDoc.docInfo.dispHeight - 8) {
      isAutoScrollNeeded = true;
      scrollY = this.svgDoc.docInfo.dispY + this.svgDoc.docInfo.dispHeight - 8 + 32;
    }

    if (clientY < this.svgDoc.docInfo.dispY) {
      isAutoScrollNeeded = true;
      scrollY = this.svgDoc.docInfo.dispY - 32;
    }

    if (isAutoScrollNeeded) {
      if (t && this.docHandler.documentConfig.enableSnap) {
        const snappedCoords = this.docHandler.SnapToGrid({ x: scrollX, y: scrollY });
        scrollX = snappedCoords.x;
        scrollY = snappedCoords.y;
      }

      this.autoScrollXPos = scrollX;
      this.autoScrollYPos = scrollY;

      if (this.autoScrollTimerId !== -1) {
        return false;
      }

      // this.autoScrollTimerId = this.autoScrollTimer.setTimeout(a, 0);
      return false;
    }

    this.ResetAutoScrollTimer();
    return true;
  }

  IsRectEnclosed = (outerRect, innerRect) => {
    return (
      innerRect.x >= outerRect.x &&
      innerRect.x + innerRect.width <= outerRect.x + outerRect.width &&
      innerRect.y >= outerRect.y &&
      innerRect.y + innerRect.height <= outerRect.y + outerRect.height
    );
  }



  RotateRectAboutCenter = (rect, center, angle) => {
    const points = [
      new Point(rect.x, rect.y),
      new Point(rect.x + rect.width, rect.y),
      new Point(rect.x + rect.width, rect.y + rect.height),
      new Point(rect.x, rect.y + rect.height),
      new Point(rect.x, rect.y)
    ];

    if (points.length > 0 && angle) {
      const radians = -2 * Math.PI * (angle / 360);
      this.RotatePointsAboutPoint(center, radians, points);
      Utils.GetPolyRect(rect, points);
    }

    return rect;
  }



  RotatePointsAboutPoint = (center, angle, points) => {
    if (angle === 0) return;

    const sinAngle = Math.sin(angle);
    const cosAngle = Math.cos(angle);

    // Adjust for floating point precision issues
    const adjustedCosAngle = Math.abs(cosAngle) < 1e-4 ? 0 : cosAngle;
    const adjustedSinAngle = Math.abs(sinAngle) < 1e-4 ? 0 : sinAngle;

    points.forEach(point => {
      const dx = point.x - center.x;
      const dy = point.y - center.y;

      point.x = dx * adjustedCosAngle + dy * adjustedSinAngle + center.x;
      point.y = -dx * adjustedSinAngle + dy * adjustedCosAngle + center.y;
    });
  }



  ResetAutoScrollTimer = () => {

  }



  EndStampSession = function () {

  }

  public testWall: any;
  public wStartx: any;
  public wEndx: any;

  RubberBandSelectMoveCommon = (x: number, y: number) => {
    // console.log('RubberBandSelectMoveCommon event:', x, y);

    if (this.testWall != null) {
      this.testWall.SetPath(`M${this.wStartx},${this.wEndx} L${x},${y}`);
      this.testWall.SetStrokeWidth(19.5);
    }

    if (!this.rubberBand) return;

    const startX = this.rubberBandStartX;
    const startY = this.rubberBandStartY;

    if (x >= startX && y >= startY) {
      this.rubberBand.SetSize(x - startX, y - startY);
      this.rubberBandFrame = { x: startX, y: startY, width: x - startX, height: y - startY };
    } else if (y < startY) {
      if (x >= startX) {
        this.rubberBand.SetSize(x - startX, startY - y);
        this.rubberBand.SetPos(startX, y);
        this.rubberBandFrame = { x: startX, y: y, width: x - startX, height: startY - y };
      } else {
        this.rubberBand.SetSize(startX - x, startY - y);
        this.rubberBand.SetPos(x, y);
        this.rubberBandFrame = { x: x, y: y, width: startX - x, height: startY - y };
      }
    } else if (x < startX) {
      this.rubberBand.SetSize(startX - x, y - startY);
      this.rubberBand.SetPos(x, startY);
      this.rubberBandFrame = { x: x, y: startY, width: startX - x, height: y - startY };
    }
  }

  DrawTest = (event) => {


    // T3Svg().addTo('#svg-area').rect(100, 100).attr({ fill: 'red' });

    // this.svgObjectLayer.AddElement(100, 100).attr({ fill: 'blue' });

    let x = event.clientX;
    let y = event.clientY;

    let nx = this.svgDoc.ConvertWindowToDocCoords(event.clientX, event.clientY);

    this.wStartx = nx.x;
    this.wEndx = nx.y;

    let nshape = this.svgDoc.CreateShape(Models.CreateShapeType.PATH);
    nshape.SetStrokeWidth(1);
    nshape.SetStrokeColor('black');
    nshape.SetFillColor('none');
    // nshape.SetStrokePattern('4,2');
    nshape.SetPath(`M ${this.wStartx} ${this.wEndx} L ${this.wStartx + 10} ${this.wEndx}`);//'M 100 100 L 200 200 L 300 100 L 100 100');

    this.testWall = nshape;
    this.svgObjectLayer.AddElement(this.testWall);

    /*
    var svgElem = T3Svg("#svg-area").get(0);
    console.log('DrawTest 1 svgElem', svgElem);
    svgElem.rect(100, 100).attr({ fill: 'red' });
    */
  }
}

export default OptHandler1;
