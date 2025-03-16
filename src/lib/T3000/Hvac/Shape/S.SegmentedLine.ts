

import BaseLine from './S.BaseLine'
import Utils1 from '../Util/Utils1';
import Utils2 from "../Util/Utils2";
import Utils3 from "../Util/Utils3";
import T3Gv from '../Data/T3Gv'
import NvConstant from '../Data/Constant/NvConstant'
import SelectionAttributes from '../Model/SelectionAttributes'
import SegLine from '../Model/SegLine';
import Point from '../Model/Point'
import $ from 'jquery'
import ShapeUtil from '../Opt/Shape/ShapeUtil'
import T3Constant from '../Data/Constant/T3Constant'
import Instance from '../Data/Instance/Instance';
import ShapeConstant from '../Opt/DS/DSConstant';
import OptConstant from '../Data/Constant/OptConstant';
import CursorConstant from '../Data/Constant/CursorConstant';
import T3Util from '../Util/T3Util';
import TextConstant from '../Data/Constant/TextConstant';

class SegmentedLine extends BaseLine {

  public segl: any;
  public hoplist: any;
  public ArrowheadData: any;
  public StartArrowID: number;
  public EndArrowID: number;
  public StartArrowDisp: boolean;
  public EndArrowDisp: boolean;
  public ArrowSizeIndex: number;
  public TextDirection: boolean;

  constructor(options: any) {
    T3Util.Log("= S.SegmentedLine: constructor input", options);

    const e = options || {};
    e.LineType = e.LineType || OptConstant.LineType.SEGLINE;

    super(e);

    // Initialize segmentation line information
    this.segl = e.segl || new SegLine();
    if (e.curveparam != null) {
      this.segl.curveparam = e.curveparam;
    }

    // Set up start and end points with defaults
    this.StartPoint = e.StartPoint || { x: 0, y: 0 };
    this.EndPoint = e.EndPoint || { x: 0, y: 0 };

    // Format segmented line and calculate frame based on end point
    this.SegLFormat(this.EndPoint, OptConstant.ActionTriggerType.LINEEND, 0);
    this.CalcFrame();

    // Initialize hoplist and arrowhead data
    this.hoplist = e.hoplist || { nhops: 0, hops: [] };
    this.ArrowheadData = e.ArrowheadData || [];

    // Set up arrow properties
    this.StartArrowID = e.StartArrowID || 0;
    this.EndArrowID = e.EndArrowID || 0;
    this.StartArrowDisp = e.StartArrowDisp || false;
    this.EndArrowDisp = e.EndArrowDisp || false;
    this.ArrowSizeIndex = e.ArrowSizeIndex || 0;
    this.TextDirection = e.TextDirection || false;

    T3Util.Log("= S.SegmentedLine: constructor output", {
      segl: this.segl,
      StartPoint: this.StartPoint,
      EndPoint: this.EndPoint,
      hoplist: this.hoplist,
      ArrowheadData: this.ArrowheadData,
      StartArrowID: this.StartArrowID,
      EndArrowID: this.EndArrowID,
      StartArrowDisp: this.StartArrowDisp,
      EndArrowDisp: this.EndArrowDisp,
      ArrowSizeIndex: this.ArrowSizeIndex,
      TextDirection: this.TextDirection,
    });
  }

  CreateShape(svgDoc, isHidden) {
    T3Util.Log("= S.SegmentedLine: CreateShape input", { svgDoc, isHidden });
    if (this.flags & NvConstant.ObjFlags.SEDO_NotVisible) return null;

    let polyPoints = [];
    const container = svgDoc.CreateShape(OptConstant.CSType.SHAPECONTAINER);
    const shapeLine = svgDoc.CreateShape(OptConstant.CSType.POLYLINE);
    shapeLine.SetID(OptConstant.SVGElementClass.SHAPE);

    const slopLine = svgDoc.CreateShape(OptConstant.CSType.POLYLINE);
    slopLine.SetID(OptConstant.SVGElementClass.SLOP);
    slopLine.ExcludeFromExport(true);

    this.CalcFrame();
    const frameRect = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);

    // Obtain and format style record details.
    let style = this.StyleRecord;
    style = this.SVGTokenizerHook(style);
    const fillColor = style.Fill.Paint.Color; // not used further
    const strokeColor = style.Line.Paint.Color;
    let strokeThickness = style.Line.Thickness;
    const strokeOpacity = style.Line.Paint.Opacity;
    const strokePattern = style.Line.LinePattern;

    if (strokeThickness > 0 && strokeThickness < 1) {
      strokeThickness = 1;
    }

    let width = frameRect.width;
    let height = frameRect.height;
    if (width < strokeThickness) {
      width = strokeThickness;
    }
    if (height < strokeThickness) {
      height = strokeThickness;
    }

    container.SetSize(width, height);
    container.SetPos(frameRect.x, frameRect.y);
    shapeLine.SetSize(width, height);

    polyPoints = this.GetPolyPoints(OptConstant.Defines.NPOLYPTS, true, false, false, null);
    if (this.hoplist.nhops !== 0) {
      const hopsResult = T3Gv.opt.InsertHops(this, polyPoints, polyPoints.length);
      polyPoints = polyPoints.slice(0, hopsResult.npts);
    }

    this.UpdateSVG(shapeLine, polyPoints);
    shapeLine.SetFillColor("none");
    shapeLine.SetStrokeColor(strokeColor);
    shapeLine.SetStrokeOpacity(strokeOpacity);
    shapeLine.SetStrokeWidth(strokeThickness);
    if (strokePattern !== 0) {
      shapeLine.SetStrokePattern(strokePattern);
    }

    slopLine.SetSize(width, height);
    this.UpdateSVG(slopLine, polyPoints);
    slopLine.SetStrokeColor("white");
    slopLine.SetFillColor("none");
    slopLine.SetOpacity(0);
    if (isHidden) {
      slopLine.SetEventBehavior(OptConstant.EventBehavior.HIDDEN_OUT);
    } else {
      slopLine.SetEventBehavior(OptConstant.EventBehavior.NONE);
    }
    slopLine.SetStrokeWidth(strokeThickness + OptConstant.Defines.SED_Slop);

    container.AddElement(shapeLine);
    container.AddElement(slopLine);

    this.ApplyStyles(shapeLine, style);
    this.ApplyEffects(container, false, true);
    container.isShape = true;
    this.AddIcons(svgDoc, container);

    T3Util.Log("= S.SegmentedLine: CreateShape output", { shape: container });
    return container;
  }

  UpdateSVG(shape, points) {
    T3Util.Log("= S.SegmentedLine: UpdateSVG input", { shape, points });
    if (shape && shape.SetPoints) {
      shape.SetPoints(points);
    }
    T3Util.Log("= S.SegmentedLine: UpdateSVG output", { shape });
  }

  AllowHeal(): boolean {
    T3Util.Log("= S.SegmentedLine: AllowHeal input");
    const result: boolean = true;
    T3Util.Log("= S.SegmentedLine: AllowHeal output", result);
    return result;
  }

  CanUseStandOffDimensionLines() {
    T3Util.Log("= S.SegmentedLine: CanUseStandOffDimensionLines input");
    const result = false;
    T3Util.Log("= S.SegmentedLine: CanUseStandOffDimensionLines output", result);
    return result;
  }

  SegLFormat(point: Point, action: number, providedDir: number) {
    T3Util.Log("= S.SegmentedLine: SegLFormat input", { point, action, providedDir });

    let deltaX: number, deltaY: number, absDeltaX: number, absDeltaY: number;
    let rect: any;
    let ptsCount: number;
    let isLeftModified = false;
    let isRightModified = false;
    let isDirectionModified = false;
    const SegLDir = NvConstant.SegLDir;

    // Helper function to determine the new direction based on current direction and two points.
    const determineDirection = (currentDir: number, basePoint: Point, comparePoint: Point): number => {
      let direction = 0;
      const diffX = Math.abs(comparePoint.x - basePoint.x);
      const diffY = Math.abs(comparePoint.y - basePoint.y);
      switch (currentDir) {
        case NvConstant.SegLDir.SED_KTC:
          direction = comparePoint.y < basePoint.y
            ? (diffY >= diffX ? SegLDir.SED_KBC : (comparePoint.x < basePoint.x ? SegLDir.SED_KRC : SegLDir.SED_KLC))
            : SegLDir.SED_KTC;
          break;
        case NvConstant.SegLDir.SED_KBC:
          direction = comparePoint.y >= basePoint.y
            ? (diffY >= diffX ? SegLDir.SED_KTC : (comparePoint.x < basePoint.x ? SegLDir.SED_KRC : SegLDir.SED_KLC))
            : SegLDir.SED_KBC;
          break;
        case NvConstant.SegLDir.SED_KLC:
          direction = comparePoint.x < basePoint.x
            ? (diffY <= diffX ? SegLDir.SED_KRC : (comparePoint.y < basePoint.y ? SegLDir.SED_KBC : SegLDir.SED_KTC))
            : SegLDir.SED_KLC;
          break;
        case NvConstant.SegLDir.SED_KRC:
          direction = comparePoint.x > basePoint.x
            ? (diffY < diffX ? SegLDir.SED_KLC : (comparePoint.y < basePoint.y ? SegLDir.SED_KBC : SegLDir.SED_KTC))
            : SegLDir.SED_KRC;
          break;
        default:
          direction = currentDir;
      }
      return direction;
    };

    if (this.segl != null) {
      // Update StartPoint or EndPoint based on action type.
      switch (action) {
        case OptConstant.ActionTriggerType.LINESTART:
          this.StartPoint.x = point.x;
          this.StartPoint.y = point.y;
          break;
        case OptConstant.ActionTriggerType.SEGL_PRESERVE:
        case OptConstant.ActionTriggerType.LINEEND:
          this.EndPoint.x = point.x;
          this.EndPoint.y = point.y;
          break;
      }

      if (this.segl.firstdir !== 0 || this.segl.lastdir !== 0) {
        if (this.segl.lastdir === 0) {
          switch (action) {
            case OptConstant.ActionTriggerType.LINESTART:
            case OptConstant.ActionTriggerType.SEGL_ONE:
            case OptConstant.ActionTriggerType.SEGL_TWO:
            case OptConstant.ActionTriggerType.SEGL_THREE:
              providedDir = determineDirection(this.segl.firstdir, point, this.EndPoint);
              break;
            case OptConstant.ActionTriggerType.SEGL_PRESERVE:
              providedDir = determineDirection(this.segl.firstdir, this.StartPoint, this.EndPoint);
              break;
            default:
              providedDir = determineDirection(this.segl.firstdir, this.StartPoint, point);
          }
          isLeftModified = true;
          this.segl.lastdir = providedDir;
          isDirectionModified = true;
        }
        if (this.segl.firstdir === 0) {
          switch (action) {
            case OptConstant.ActionTriggerType.LINEEND:
            case OptConstant.ActionTriggerType.SEGL_ONE:
            case OptConstant.ActionTriggerType.SEGL_TWO:
            case OptConstant.ActionTriggerType.SEGL_THREE:
              providedDir = determineDirection(this.segl.lastdir, point, this.StartPoint);
              break;
            case OptConstant.ActionTriggerType.SEGL_PRESERVE:
              providedDir = determineDirection(this.segl.lastdir, this.EndPoint, this.StartPoint);
              break;
            default:
              providedDir = determineDirection(this.segl.lastdir, this.EndPoint, point);
          }
          isRightModified = true;
          this.segl.firstdir = providedDir;
          isDirectionModified = true;
        }

        // Execute segmentation based on the first direction.
        switch (this.segl.firstdir) {
          case NvConstant.SegLDir.SED_KTC:
            switch (this.segl.lastdir) {
              case NvConstant.SegLDir.SED_KTC:
                this.SegLTopToTop(action, point, 1, false, isDirectionModified);
                break;
              case NvConstant.SegLDir.SED_KBC:
                this.SegLTopToBottom(action, point, 1, false);
                break;
              case NvConstant.SegLDir.SED_KLC:
                this.SegLTopToLeft(action, point, 1, 1, false, isDirectionModified);
                break;
              case NvConstant.SegLDir.SED_KRC:
                this.SegLTopToLeft(action, point, 1, -1, false, isDirectionModified);
                break;
            }
            break;
          case NvConstant.SegLDir.SED_KBC:
            switch (this.segl.lastdir) {
              case NvConstant.SegLDir.SED_KTC:
                this.SegLTopToBottom(action, point, -1, false);
                break;
              case NvConstant.SegLDir.SED_KBC:
                this.SegLTopToTop(action, point, -1, false, isDirectionModified);
                break;
              case NvConstant.SegLDir.SED_KLC:
                this.SegLTopToLeft(action, point, -1, 1, false, isDirectionModified);
                break;
              case NvConstant.SegLDir.SED_KRC:
                this.SegLTopToLeft(action, point, -1, -1, false, isDirectionModified);
                break;
            }
            break;
          case NvConstant.SegLDir.SED_KLC:
            switch (this.segl.lastdir) {
              case NvConstant.SegLDir.SED_KTC:
                this.SegLTopToLeft(action, point, 1, 1, true, isDirectionModified);
                break;
              case NvConstant.SegLDir.SED_KBC:
                this.SegLTopToLeft(action, point, 1, -1, true, isDirectionModified);
                break;
              case NvConstant.SegLDir.SED_KLC:
                this.SegLTopToTop(action, point, 1, true, isDirectionModified);
                break;
              case NvConstant.SegLDir.SED_KRC:
                this.SegLTopToBottom(action, point, 1, true);
                break;
            }
            break;
          case NvConstant.SegLDir.SED_KRC:
            switch (this.segl.lastdir) {
              case NvConstant.SegLDir.SED_KTC:
                this.SegLTopToLeft(action, point, -1, 1, true, isDirectionModified);
                break;
              case NvConstant.SegLDir.SED_KBC:
                this.SegLTopToLeft(action, point, -1, -1, true, isDirectionModified);
                break;
              case NvConstant.SegLDir.SED_KLC:
                this.SegLTopToBottom(action, point, -1, true);
                break;
              case NvConstant.SegLDir.SED_KRC:
                this.SegLTopToTop(action, point, -1, true, isDirectionModified);
                break;
            }
            break;
        }
        if (isLeftModified) {
          this.segl.lastdir = 0;
        }
        if (isRightModified) {
          this.segl.firstdir = 0;
        }
      } else {
        // When both firstdir and lastdir are zero, re-calculate segmentation solely based on difference.
        deltaX = this.EndPoint.x - this.StartPoint.x;
        deltaY = this.EndPoint.y - this.StartPoint.y;
        absDeltaX = Math.abs(deltaX);
        absDeltaY = Math.abs(deltaY);
        rect = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
        if ((absDeltaY >= 1 || absDeltaX >= 1)) {
          if (providedDir === 0) {
            providedDir = (absDeltaX - absDeltaY > 0.01)
              ? OptConstant.Defines.SED_HorizOnly
              : OptConstant.Defines.SED_VertOnly;
          }
          // Clear previous segmentation array.
          this.segl.pts.splice(0);
          this.segl.lengths.splice(0);
          if (providedDir === OptConstant.Defines.SED_HorizOnly) {
            if (absDeltaY < 1) {
              this.segl.pts.push(new Point(this.StartPoint.x, this.StartPoint.y));
              this.segl.pts.push(new Point(this.EndPoint.x, this.EndPoint.y));
              this.segl.lengths.push(deltaX);
            } else {
              const half = deltaX / 2;
              this.segl.pts.push(new Point(this.StartPoint.x, this.StartPoint.y));
              this.segl.pts.push(new Point(this.StartPoint.x + deltaX / 2, this.StartPoint.y));
              this.segl.pts.push(new Point(this.StartPoint.x + deltaX / 2, this.EndPoint.y));
              this.segl.pts.push(new Point(this.EndPoint.x, this.EndPoint.y));
              this.segl.lengths.push(half);
              this.segl.lengths.push(deltaY);
              this.segl.lengths.push(half);
            }
          } else if (providedDir === OptConstant.Defines.SED_VertOnly) {
            if (absDeltaX < 1) {
              this.segl.pts.push(new Point(this.StartPoint.x, this.StartPoint.y));
              this.segl.pts.push(new Point(this.EndPoint.x, this.EndPoint.y));
              this.segl.lengths.push(deltaY);
            } else {
              const half = deltaY / 2;
              this.segl.pts.push(new Point(this.StartPoint.x, this.StartPoint.y));
              this.segl.pts.push(new Point(this.StartPoint.x, this.StartPoint.y + deltaY / 2));
              this.segl.pts.push(new Point(this.EndPoint.x, this.StartPoint.y + deltaY / 2));
              this.segl.pts.push(new Point(this.EndPoint.x, this.EndPoint.y));
              this.segl.lengths.push(half);
              this.segl.lengths.push(deltaX);
              this.segl.lengths.push(half);
            }
          }
          // Adjust all points relative to the rectangle origin.
          ptsCount = this.segl.pts.length;
          for (let idx = 0; idx < ptsCount; idx++) {
            this.segl.pts[idx].x -= rect.x;
            this.segl.pts[idx].y -= rect.y;
          }
        }
      }

      T3Util.Log("= S.SegmentedLine: SegLFormat output", { StartPoint: this.StartPoint, EndPoint: this.EndPoint, segl: this.segl });
    }
  }

  GetDimensionPoints() {
    T3Util.Log("= S.SegmentedLine: GetDimensionPoints input", {
      Dimensions: this.Dimensions,
      Frame: this.Frame,
      StartPoint: this.StartPoint,
      EndPoint: this.EndPoint,
    });

    let dimensionPoints: Point[] = [];

    // Use all segmentation points if flag set
    if (this.Dimensions & NvConstant.DimensionFlags.AllSeg) {
      dimensionPoints = this.segl.pts;
    }
    // Calculate total dimension if flag set
    else if (this.Dimensions & NvConstant.DimensionFlags.Total) {
      // Deep copy the points and adjust them by the frame offsets
      let copiedPoints = Utils1.DeepCopy(this.segl.pts);
      for (let i = 0; i < copiedPoints.length; i++) {
        copiedPoints[i].x += this.Frame.x;
        copiedPoints[i].y += this.Frame.y;
      }

      // Calculate segment distances (result not used directly, but kept for potential logging)
      for (let i = 1; i < copiedPoints.length; i++) {
        const dx = Math.abs(copiedPoints[i - 1].x - copiedPoints[i].x);
        const dy = Math.abs(copiedPoints[i - 1].y - copiedPoints[i].y);
        const distance = Math.sqrt(dx * dx + dy * dy);
        T3Util.Log("= S.SegmentedLine: Segment distance", { index: i, distance });
      }

      // Calculate center based on the overall rectangle
      const rect = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
      const halfYOffset = (this.Frame.y - rect.y) / 2;
      const halfXOffset = (this.Frame.x - rect.x) / 2;
      const center = {
        x: this.Frame.width / 2 + halfXOffset,
        y: this.Frame.height / 2 + halfYOffset,
      };

      // Create two measurement points offset by 10 pixels to the left and right of center
      const startMeasurePoint = { x: center.x - 10, y: center.y };
      const endMeasurePoint = { x: center.x + 10, y: center.y };

      dimensionPoints.push(new Point(startMeasurePoint.x, startMeasurePoint.y));
      dimensionPoints.push(new Point(endMeasurePoint.x, endMeasurePoint.y));
    }
    // Fallback: use start and end points relative to the rectangle
    else {
      const rect = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
      dimensionPoints.push(new Point(this.StartPoint.x - rect.x, this.StartPoint.y - rect.y));
      dimensionPoints.push(new Point(this.EndPoint.x - rect.x, this.EndPoint.y - rect.y));
    }

    T3Util.Log("= S.SegmentedLine: GetDimensionPoints output", dimensionPoints);
    return dimensionPoints;
  }

  SegLTopToTop(
    action: number,
    point: Point,
    factor: number,
    isVertical: boolean,
    flag: boolean
  ) {
    T3Util.Log("= S.SegmentedLine: SegLTopToTop input", {
      action,
      point,
      factor,
      isVertical,
      flag,
    });

    // Define readable variable names
    let horizontalDiff: number,
      verticalDiff: number;
    let startPrimary: number,
      startSecondary: number;
    let endPrimary: number,
      endSecondary: number;
    let boundingRect: any;
    let totalPoints: number;
    let hookObjRect: any;
    let adjustmentValue: number;
    let hookAdjustmentNeeded = 0;
    let preserve = false;
    const SEG_DIM = OptConstant.Defines.SED_CDim;

    // Temporary max dimension placeholder
    let maxDim: Point = { x: 0, y: 0 };

    if (isVertical) {
      // Compute based on vertical differences.
      verticalDiff = Math.abs(this.EndPoint.y - this.StartPoint.y);
      horizontalDiff = Math.abs(this.EndPoint.x - this.StartPoint.x);
      startPrimary = this.StartPoint.y;
      startSecondary = this.StartPoint.x;
      endPrimary = this.EndPoint.y;
      endSecondary = this.EndPoint.x;
      boundingRect = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
      // Swap boundingRect.x and boundingRect.y for proper adjustment
      let temp = boundingRect.x;
      boundingRect.x = boundingRect.y;
      boundingRect.y = temp;
      T3Gv.opt.GetMaxDim(maxDim);
      temp = maxDim.x;
      maxDim.x = maxDim.y;
      maxDim.y = temp;
    } else {
      // Compute based on horizontal differences.
      verticalDiff = Math.abs(this.EndPoint.x - this.StartPoint.x);
      horizontalDiff = Math.abs(this.EndPoint.y - this.StartPoint.y);
      startPrimary = this.StartPoint.x;
      startSecondary = this.StartPoint.y;
      endPrimary = this.EndPoint.x;
      endSecondary = this.EndPoint.y;
      boundingRect = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
      T3Gv.opt.GetMaxDim(maxDim);
    }

    totalPoints = this.segl.pts.length;
    // Clear segmentation points
    this.segl.pts.splice(0);

    // Check hooks for adjustment if available.
    if (this.hooks && this.hooks.length > 0) {
      if (
        isVertical
          ? (factor === -1
            ? this.StartPoint.x > this.EndPoint.x
            : this.StartPoint.x < this.EndPoint.x)
          : (factor === -1
            ? this.StartPoint.y > this.EndPoint.y
            : this.StartPoint.y < this.EndPoint.y)
      ) {
        for (let j = 0; j < this.hooks.length; j++) {
          if (this.hooks[j].hookpt === OptConstant.HookPts.SED_KTL) {
            const hookObj = T3Gv.opt.GetObjectPtr(
              this.hooks[j].objid,
              false
            );
            if (hookObj) {
              hookObjRect = hookObj.GetTargetRect();
              if (isVertical) {
                adjustmentValue =
                  this.StartPoint.y +
                  hookObjRect.height *
                  ((SEG_DIM - this.hooks[j].connect.y) / SEG_DIM) +
                  OptConstant.Defines.SED_SegDefLen;
              } else {
                adjustmentValue =
                  this.StartPoint.x +
                  hookObjRect.width *
                  ((SEG_DIM - this.hooks[j].connect.x) / SEG_DIM) +
                  OptConstant.Defines.SED_SegDefLen;
              }
              break;
            }
          }
        }
      } else {
        for (let j = 0; j < this.hooks.length; j++) {
          if (this.hooks[j].hookpt === OptConstant.HookPts.SED_KTR) {
            const hookObj = T3Gv.opt.GetObjectPtr(
              this.hooks[j].objid,
              false
            );
            if (hookObj) {
              hookObjRect = hookObj.GetTargetRect();
              if (isVertical) {
                adjustmentValue =
                  this.EndPoint.y +
                  hookObjRect.height *
                  ((SEG_DIM - this.hooks[j].connect.y) / SEG_DIM) +
                  OptConstant.Defines.SED_SegDefLen;
              } else {
                adjustmentValue =
                  this.EndPoint.x +
                  hookObjRect.width *
                  ((SEG_DIM - this.hooks[j].connect.x) / SEG_DIM) +
                  OptConstant.Defines.SED_SegDefLen;
              }
              break;
            }
          }
        }
      }
      if (hookObjRect) {
        hookAdjustmentNeeded = isVertical
          ? verticalDiff < hookObjRect.height / 2 + OptConstant.Defines.SED_SegMinLen
            ? 1
            : 0
          : verticalDiff < hookObjRect.width / 2 + OptConstant.Defines.SED_SegMinLen
            ? 1
            : 0;
      }
    }

    if (horizontalDiff < OptConstant.Defines.SED_SegMinSeg) {
      horizontalDiff = 0;
    }

    if (action === OptConstant.ActionTriggerType.SEGL_PRESERVE) {
      preserve = totalPoints === 4;
    }

    if (flag) {
      preserve = true;
    }

    if (
      !preserve &&
      ((verticalDiff > OptConstant.Defines.SED_SegMinLen ||
        horizontalDiff < OptConstant.Defines.SED_SegMinLen) &&
        !hookAdjustmentNeeded)
    ) {
      if (totalPoints !== 4) {
        this.segl.lengths.splice(0);
      }
      if (isVertical) {
        this.segl.pts.push(new Point(startSecondary - boundingRect.y, startPrimary - boundingRect.x));
      } else {
        this.segl.pts.push(new Point(startPrimary - boundingRect.x, startSecondary - boundingRect.y));
      }
      if (this.segl.lengths.length < 1) {
        this.segl.lengths.push(OptConstant.Defines.SED_SegDefLen);
      }
      let firstLength = this.segl.lengths[0];
      let computedLength: number;
      if (action === OptConstant.ActionTriggerType.SEGL_ONE) {
        if (isVertical) {
          this.segl.lengths[0] = factor * (startSecondary - point.x);
          computedLength = factor * (endSecondary - point.x);
        } else {
          this.segl.lengths[0] = factor * (startSecondary - point.y);
          computedLength = factor * (endSecondary - point.y);
        }
        if (this.segl.lengths[0] < OptConstant.Defines.SED_SegMinLen) {
          this.segl.lengths[0] = OptConstant.Defines.SED_SegMinLen;
        }
        if (computedLength < OptConstant.Defines.SED_SegMinLen) {
          computedLength = OptConstant.Defines.SED_SegMinLen;
        }
        if (computedLength < firstLength) {
          firstLength = computedLength;
        }
      } else if (firstLength > OptConstant.Defines.SED_SegDefLen) {
        firstLength = OptConstant.Defines.SED_SegDefLen;
      }
      let coordU = startSecondary - factor * this.segl.lengths[0];
      if (coordU < 0) {
        coordU = 0;
      }
      if (coordU > maxDim.y) {
        coordU = maxDim.y;
      }
      let coordP = endSecondary - factor * firstLength;
      if (coordP < 0) {
        coordP = 0;
      }
      if (coordP > maxDim.y) {
        coordP = maxDim.y;
      }
      if (factor === -1) {
        if (coordP > coordU) {
          coordU = coordP;
        }
      } else {
        if (coordP < coordU) {
          coordU = coordP;
        }
      }
      if (isVertical) {
        this.segl.pts.push(new Point(coordU - boundingRect.y, startPrimary - boundingRect.x));
        this.segl.pts.push(new Point(coordU - boundingRect.y, endPrimary - boundingRect.x));
        this.segl.pts.push(new Point(endSecondary - boundingRect.y, endPrimary - boundingRect.x));
      } else {
        this.segl.pts.push(new Point(startPrimary - boundingRect.x, coordU - boundingRect.y));
        this.segl.pts.push(new Point(endPrimary - boundingRect.x, coordU - boundingRect.y));
        this.segl.pts.push(new Point(endPrimary - boundingRect.x, endSecondary - boundingRect.y));
      }
    } else {
      if (totalPoints !== 6) {
        this.segl.lengths.splice(0);
      }
      if (isVertical) {
        this.segl.pts.push(new Point(startSecondary - boundingRect.y, startPrimary - boundingRect.x));
      } else {
        this.segl.pts.push(new Point(startPrimary - boundingRect.x, startSecondary - boundingRect.y));
      }
      if (this.segl.lengths.length < 1) {
        this.segl.lengths.push(OptConstant.Defines.SED_SegDefLen);
      }
      if (action === OptConstant.ActionTriggerType.SEGL_ONE) {
        if (isVertical) {
          this.segl.lengths[0] = factor * (startSecondary - point.x);
        } else {
          this.segl.lengths[0] = factor * (startSecondary - point.y);
        }
        if (this.segl.lengths[0] < OptConstant.Defines.SED_SegMinLen) {
          this.segl.lengths[0] = OptConstant.Defines.SED_SegMinLen;
        }
      }
      let coordU = startSecondary - factor * this.segl.lengths[0];
      if (coordU < 0) {
        coordU = 0;
      }
      if (coordU > maxDim.y) {
        coordU = maxDim.y;
      }
      if (isVertical) {
        this.segl.pts.push(new Point(coordU - boundingRect.y, startPrimary - boundingRect.x));
      } else {
        this.segl.pts.push(new Point(startPrimary - boundingRect.x, coordU - boundingRect.y));
      }
      if (this.segl.lengths.length < 2) {
        this.segl.lengths.push(OptConstant.Defines.SED_SegDefLen);
      }
      if (action === OptConstant.ActionTriggerType.SEGL_TWO) {
        if (isVertical) {
          this.segl.lengths[1] = point.y - startPrimary;
        } else {
          this.segl.lengths[1] = point.x - startPrimary;
        }
        if (this.segl.lengths[1] < OptConstant.Defines.SED_SegMinLen) {
          this.segl.lengths[1] = OptConstant.Defines.SED_SegMinLen;
        }
      } else if (hookAdjustmentNeeded) {
        const lengthToHook = adjustmentValue - startPrimary;
        if (this.segl.lengths[1] < lengthToHook) {
          this.segl.lengths[1] = lengthToHook;
        }
      }
      let coordD = startPrimary + this.segl.lengths[1];
      if (coordD < 0) {
        coordD = 0;
      }
      if (coordD > maxDim.x) {
        coordD = maxDim.x;
      }
      if (isVertical) {
        this.segl.pts.push(new Point(coordU - boundingRect.y, coordD - boundingRect.x));
      } else {
        this.segl.pts.push(new Point(coordD - boundingRect.x, coordU - boundingRect.y));
      }
      if (this.segl.lengths.length < 3) {
        this.segl.lengths.push(OptConstant.Defines.SED_SegDefLen);
      }
      if (action === OptConstant.ActionTriggerType.SEGL_THREE) {
        if (isVertical) {
          this.segl.lengths[2] = factor * (endSecondary - point.x);
        } else {
          this.segl.lengths[2] = factor * (endSecondary - point.y);
        }
        if (this.segl.lengths[2] < OptConstant.Defines.SED_SegMinLen) {
          this.segl.lengths[2] = OptConstant.Defines.SED_SegMinLen;
        }
      }
      let coordP = endSecondary - factor * this.segl.lengths[2];
      if (coordP < 0) {
        coordP = 0;
      }
      if (coordP > maxDim.y) {
        coordP = maxDim.y;
      }
      if (isVertical) {
        this.segl.pts.push(new Point(coordP - boundingRect.y, coordD - boundingRect.x));
        this.segl.pts.push(new Point(coordP - boundingRect.y, endPrimary - boundingRect.x));
        this.segl.pts.push(new Point(endSecondary - boundingRect.y, endPrimary - boundingRect.x));
      } else {
        this.segl.pts.push(new Point(coordD - boundingRect.x, coordP - boundingRect.y));
        this.segl.pts.push(new Point(endPrimary - boundingRect.x, coordP - boundingRect.y));
        this.segl.pts.push(new Point(endPrimary - boundingRect.x, endSecondary - boundingRect.y));
      }
    }

    T3Util.Log("= S.SegmentedLine: SegLTopToTop output", {
      pts: this.segl.pts,
      lengths: this.segl.lengths,
    });
  }

  SegLTopToBottom(actionType: number, pt: Point, factor: number, isVertical: boolean) {
    T3Util.Log("= S.SegmentedLine: SegLTopToBottom input", { actionType, pt, factor, isVertical });

    let calcVar: any;
    let SDim: number;
    let startPrimary: number;
    let startSecondary: number;
    let endPrimary: number;
    let endSecondary: number;
    let rect: any;
    let maxDim: Point = { x: 0, y: 0 };
    let hookCondition: boolean;
    let ptsCount = this.segl.pts.length;
    // Temporary variables for later use
    let tempPoint: number;
    let hookAdjustLength: number = 0;
    const segDim: number = OptConstant.Defines.SED_CDim;

    // Depending on orientation, calculate geometry variables
    if (isVertical) {
      // Vertical orientation
      // Calculate horizontal differences etc.
      Math.abs(this.EndPoint.y - this.StartPoint.y);
      SDim = Math.abs(this.EndPoint.x - this.StartPoint.x);
      startPrimary = this.StartPoint.y;
      startSecondary = this.StartPoint.x;
      endPrimary = this.EndPoint.y;
      endSecondary = this.EndPoint.x;
      rect = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
      // Swap rect coordinates for vertical adjustment
      let swap = rect.x;
      rect.x = rect.y;
      rect.y = swap;
      T3Gv.opt.GetMaxDim(maxDim);
      swap = maxDim.x;
      maxDim.x = maxDim.y;
      maxDim.y = swap;
    } else {
      // Horizontal orientation
      Math.abs(this.EndPoint.x - this.StartPoint.x);
      SDim = Math.abs(this.EndPoint.y - this.StartPoint.y);
      startPrimary = this.StartPoint.x;
      startSecondary = this.StartPoint.y;
      endPrimary = this.EndPoint.x;
      endSecondary = this.EndPoint.y;
      rect = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
      T3Gv.opt.GetMaxDim(maxDim);
    }

    // Determine hook condition based on factor and segment minimum length constraints
    hookCondition = (factor === -1 ? (endSecondary - 2 * OptConstant.Defines.SED_SegMinLen > startSecondary)
      : (endSecondary + 2 * OptConstant.Defines.SED_SegMinLen < startSecondary));
    // Store current point segment count and clear points
    ptsCount = this.segl.pts.length;
    this.segl.pts.splice(0);

    // When preserving, override hookCondition based on a segment count check
    if (actionType === OptConstant.ActionTriggerType.SEGL_PRESERVE) {
      hookCondition = (ptsCount !== 6);
    }

    // CASE 1: Hook condition satisfied
    if (hookCondition) {
      // If the primary coordinate difference is minimal, simply create two points
      if (Math.abs(startPrimary - endPrimary) <= 1) {
        if (isVertical) {
          this.segl.pts.push(new Point(startSecondary - rect.y, startPrimary - rect.x));
          this.segl.pts.push(new Point(endSecondary - rect.y, startPrimary - rect.x));
        } else {
          this.segl.pts.push(new Point(startPrimary - rect.x, startSecondary - rect.y));
          this.segl.pts.push(new Point(startPrimary - rect.x, endSecondary - rect.y));
        }
        this.segl.lengths.splice(0);
      } else {
        // Otherwise, adjust segmentation lengths and compute intermediate points
        if (ptsCount !== 4) {
          this.segl.lengths.splice(0);
        }
        if (isVertical) {
          this.segl.pts.push(new Point(startSecondary - rect.y, startPrimary - rect.x));
        } else {
          this.segl.pts.push(new Point(startPrimary - rect.x, startSecondary - rect.y));
        }
        if (this.segl.lengths.length < 1) {
          this.segl.lengths.push(OptConstant.Defines.SED_SegDefLen);
        }
        if (actionType === OptConstant.ActionTriggerType.SEGL_ONE) {
          this.segl.lengths[0] = isVertical ? factor * (startSecondary - pt.x) : factor * (startSecondary - pt.y);
          if (this.segl.lengths[0] < OptConstant.Defines.SED_SegMinLen) {
            this.segl.lengths[0] = OptConstant.Defines.SED_SegMinLen;
          }
        } else {
          if (actionType !== OptConstant.ActionTriggerType.SEGL_PRESERVE && this.segl.lengths[0] < OptConstant.Defines.SED_SegDefLen) {
            this.segl.lengths[0] = OptConstant.Defines.SED_SegDefLen;
          }
          if (this.segl.lengths[0] > SDim - OptConstant.Defines.SED_SegMinLen) {
            this.segl.lengths[0] = SDim - OptConstant.Defines.SED_SegMinLen;
          }
        }
        // Calculate new intermediate coordinate i based on factor and segment length
        tempPoint = startSecondary - factor * this.segl.lengths[0];
        if (tempPoint < 0) {
          tempPoint = 0;
        }
        if (tempPoint > maxDim.y) {
          tempPoint = maxDim.y;
        }
        // Calculate another coordinate n using minimum segment length
        let nCoord = endSecondary + factor * OptConstant.Defines.SED_SegMinLen;
        if (nCoord < 0) {
          nCoord = 0;
        }
        if (nCoord > maxDim.y) {
          nCoord = maxDim.y;
        }
        // Adjust coordinates based on factor polarity
        if (factor === -1) {
          if (nCoord < startSecondary + OptConstant.Defines.SED_SegMinLen) {
            nCoord = startSecondary + OptConstant.Defines.SED_SegMinLen;
          }
          if (nCoord < tempPoint) {
            tempPoint = nCoord;
          }
        } else {
          if (nCoord > startSecondary - OptConstant.Defines.SED_SegMinLen) {
            nCoord = startSecondary - OptConstant.Defines.SED_SegMinLen;
          }
          if (nCoord > tempPoint) {
            tempPoint = nCoord;
          }
        }
        // Push remaining segmentation points
        if (isVertical) {
          this.segl.pts.push(new Point(tempPoint - rect.y, startPrimary - rect.x));
          this.segl.pts.push(new Point(tempPoint - rect.y, endPrimary - rect.x));
          this.segl.pts.push(new Point(endSecondary - rect.y, endPrimary - rect.x));
        } else {
          this.segl.pts.push(new Point(startPrimary - rect.x, tempPoint - rect.y));
          this.segl.pts.push(new Point(endPrimary - rect.x, tempPoint - rect.y));
          this.segl.pts.push(new Point(endPrimary - rect.x, endSecondary - rect.y));
        }
      }
    } else {
      // CASE 2: Hook condition not satisfied
      // Try to calculate hook adjustment from available hooks
      if (this.hooks && this.hooks.length > 0) {
        for (let h = 0; h < this.hooks.length; h++) {
          if (this.hooks[h].hookpt === OptConstant.HookPts.SED_KTL) {
            const hookObj = T3Gv.opt.GetObjectPtr(this.hooks[h].objid, false);
            if (hookObj) {
              const hookRect = hookObj.GetTargetRect();
              if (isVertical) {
                hookAdjustLength = startPrimary <= endPrimary
                  ? this.StartPoint.y + hookRect.height * ((segDim - this.hooks[h].connect.y) / segDim) + OptConstant.Defines.SED_SegDefLen
                  : this.StartPoint.y + hookRect.height * (this.hooks[h].connect.y / segDim) + OptConstant.Defines.SED_SegDefLen;
              } else {
                hookAdjustLength = startPrimary <= endPrimary
                  ? this.StartPoint.x + hookRect.width * ((segDim - this.hooks[h].connect.x) / segDim) + OptConstant.Defines.SED_SegDefLen
                  : this.StartPoint.x + hookRect.width * (this.hooks[h].connect.x / segDim) + OptConstant.Defines.SED_SegDefLen;
              }
              break;
            }
          }
        }
      }
      if (ptsCount !== 6) {
        this.segl.lengths.splice(0);
      }
      // Add first segmentation point
      if (isVertical) {
        this.segl.pts.push(new Point(startSecondary - rect.y, startPrimary - rect.x));
      } else {
        this.segl.pts.push(new Point(startPrimary - rect.x, startSecondary - rect.y));
      }
      if (this.segl.lengths.length < 1) {
        this.segl.lengths.push(OptConstant.Defines.SED_SegDefLen);
      }
      if (actionType === OptConstant.ActionTriggerType.SEGL_ONE) {
        this.segl.lengths[0] = isVertical ? factor * (startSecondary - pt.x) : factor * (startSecondary - pt.y);
        if (this.segl.lengths[0] < OptConstant.Defines.SED_SegMinLen) {
          this.segl.lengths[0] = OptConstant.Defines.SED_SegMinLen;
        }
      }
      tempPoint = startSecondary - factor * this.segl.lengths[0];
      if (tempPoint < 0) {
        tempPoint = 0;
      }
      if (tempPoint > maxDim.y) {
        tempPoint = maxDim.y;
      }
      if (isVertical) {
        this.segl.pts.push(new Point(tempPoint - rect.y, startPrimary - rect.x));
      } else {
        this.segl.pts.push(new Point(startPrimary - rect.x, tempPoint - rect.y));
      }
      if (this.segl.lengths.length < 2) {
        this.segl.lengths.push(OptConstant.Defines.SED_SegDefLen);
      }
      if (actionType === OptConstant.ActionTriggerType.SEGL_TWO) {
        this.segl.lengths[1] = startPrimary <= endPrimary
          ? (isVertical ? pt.y - startPrimary : pt.x - startPrimary)
          : (isVertical ? -(pt.y - startPrimary) : -(pt.x - startPrimary));
      } else if (hookAdjustLength) {
        const availableLength = hookAdjustLength - startPrimary;
        if (this.segl.lengths[1] < availableLength) {
          this.segl.lengths[1] = availableLength;
        }
      }
      // Calculate coordinate o based on the second segment
      let oCoord: number;
      if (startPrimary <= endPrimary) {
        oCoord = startPrimary + this.segl.lengths[1];
        if (Math.abs(endPrimary - oCoord) < OptConstant.Defines.SED_SegMinLen) {
          oCoord = oCoord < endPrimary ? endPrimary - OptConstant.Defines.SED_SegMinLen : endPrimary + OptConstant.Defines.SED_SegMinLen;
        }
      } else {
        oCoord = startPrimary - this.segl.lengths[1];
        if (Math.abs(oCoord - endPrimary) < OptConstant.Defines.SED_SegMinLen) {
          oCoord = oCoord < endPrimary ? endPrimary - OptConstant.Defines.SED_SegMinLen : endPrimary + OptConstant.Defines.SED_SegMinLen;
        }
      }
      if (oCoord < 0) {
        oCoord = 0;
      }
      if (oCoord > maxDim.x) {
        oCoord = maxDim.x;
      }
      if (isVertical) {
        this.segl.pts.push(new Point(tempPoint - rect.y, oCoord - rect.x));
      } else {
        this.segl.pts.push(new Point(oCoord - rect.x, tempPoint - rect.y));
      }
      if (this.segl.lengths.length < 3) {
        this.segl.lengths.push(OptConstant.Defines.SED_SegDefLen);
      }
      if (actionType === OptConstant.ActionTriggerType.SEGL_THREE) {
        this.segl.lengths[2] = isVertical ? -factor * (endSecondary - pt.x) : -factor * (endSecondary - pt.y);
        if (this.segl.lengths[2] < OptConstant.Defines.SED_SegMinLen) {
          this.segl.lengths[2] = OptConstant.Defines.SED_SegMinLen;
        }
      }
      tempPoint = endSecondary + factor * this.segl.lengths[2];
      if (tempPoint < 0) {
        tempPoint = 0;
      }
      if (tempPoint > maxDim.y) {
        tempPoint = maxDim.y;
      }
      if (isVertical) {
        this.segl.pts.push(new Point(tempPoint - rect.y, oCoord - rect.x));
        this.segl.pts.push(new Point(tempPoint - rect.y, endPrimary - rect.x));
        this.segl.pts.push(new Point(endSecondary - rect.y, endPrimary - rect.x));
      } else {
        this.segl.pts.push(new Point(oCoord - rect.x, tempPoint - rect.y));
        this.segl.pts.push(new Point(endPrimary - rect.x, tempPoint - rect.y));
        this.segl.pts.push(new Point(endPrimary - rect.x, endSecondary - rect.y));
      }
    }

    T3Util.Log("= S.SegmentedLine: SegLTopToBottom output", { pts: this.segl.pts, lengths: this.segl.lengths });
  }

  /**
   * Formats a segmented line from top to left direction
   * This function calculates points and lengths for drawing a segmented line that connects
   * from a top point to a left point, handling both horizontal and vertical orientations.
   *
   * @param actionType - The type of action triggering this format (e.g. SEGL_ONE, SEGL_TWO)
   * @param point - The current point being manipulated
   * @param primaryFactor - The primary direction factor (1 or -1)
   * @param secondaryFactor - The secondary direction factor (1 or -1)
   * @param isVertical - Whether the orientation is vertical (true) or horizontal (false)
   * @param directionFlag - Flag to preserve current direction
   */
  SegLTopToLeft(
    actionType: number,
    point: Point,
    primaryFactor: number,
    secondaryFactor: number,
    isVertical: boolean,
    directionFlag: boolean
  ) {
    T3Util.Log("= S.SegmentedLine: SegLTopToLeft input", { actionType, point, primaryFactor, secondaryFactor, isVertical, directionFlag });

    // Variable declarations with meaningful names
    let coordU: number,
      coordP: number,
      rectTemp: number,
      isShortcutNeeded: boolean,
      isPreserveFormat: boolean,
      isPrimaryLessThanSecondary: boolean,
      hookObj: any,
      loopIndex: number,
      distance: number,
      totalPoints: number,
      startPrimary: number,
      startSecondary: number,
      endPrimary: number,
      endSecondary: number,
      hookStartAdjustment: number = 0,
      hookEndAdjustment: number = 0,
      isAutoInsertAllowed: boolean = false,
      boundingRect: any = {},
      maxDimensions: Point = {
        x: 0,
        y: 0
      };

    const segmentDimension = OptConstant.Defines.SED_CDim;

    // Check if auto-insert is allowed
    T3Gv.opt.GetObjectPtr(T3Gv.opt.sedSessionBlockId, false);
    if (T3Gv.opt.AllowAutoInsert()) {
      isAutoInsertAllowed = true;
    }

    // Calculate dimensions
    Math.abs(this.EndPoint.x - this.StartPoint.x);
    Math.abs(this.EndPoint.y - this.StartPoint.y);

    // Set up coordinates based on orientation
    if (isVertical) {
      startPrimary = this.StartPoint.y;
      startSecondary = this.StartPoint.x;
      endPrimary = this.EndPoint.y;
      endSecondary = this.EndPoint.x;
      boundingRect = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);

      // Swap x and y for vertical orientation
      rectTemp = boundingRect.x;
      boundingRect.x = boundingRect.y;
      boundingRect.y = rectTemp;

      T3Gv.opt.GetMaxDim(maxDimensions);
      rectTemp = maxDimensions.x;
      maxDimensions.x = maxDimensions.y;
      maxDimensions.y = rectTemp;
    } else {
      startPrimary = this.StartPoint.x;
      startSecondary = this.StartPoint.y;
      endPrimary = this.EndPoint.x;
      endSecondary = this.EndPoint.y;
      boundingRect = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
      T3Gv.opt.GetMaxDim(maxDimensions);
    }

    // Get current points count and clear points
    totalPoints = this.segl.pts.length;
    this.segl.pts.splice(0);

    // Calculate conditions for format decisions
    isPrimaryLessThanSecondary = secondaryFactor == -1 ?
      startPrimary - 2 * OptConstant.Defines.SED_SegMinLen > endPrimary :
      startPrimary + 2 * OptConstant.Defines.SED_SegMinLen < endPrimary;

    isShortcutNeeded = primaryFactor == -1 ?
      endSecondary - 2 * OptConstant.Defines.SED_SegMinLen > startSecondary && isPrimaryLessThanSecondary :
      endSecondary + 2 * OptConstant.Defines.SED_SegMinLen < startSecondary && isPrimaryLessThanSecondary;

    // Override format based on action type or flag
    if (actionType === OptConstant.ActionTriggerType.SEGL_PRESERVE) {
      isShortcutNeeded = totalPoints !== 5;
    }

    if (directionFlag) {
      isShortcutNeeded = true;
    }

    // Shortcut case: create simple 3-point line
    if (isShortcutNeeded) {
      this.segl.lengths.splice(0);

      // Add points based on orientation
      if (isVertical) {
        this.segl.pts.push(new Point(startSecondary - boundingRect.y, startPrimary - boundingRect.x));
        this.segl.pts.push(new Point(endSecondary - boundingRect.y, startPrimary - boundingRect.x));
        this.segl.pts.push(new Point(endSecondary - boundingRect.y, endPrimary - boundingRect.x));
      } else {
        this.segl.pts.push(new Point(startPrimary - boundingRect.x, startSecondary - boundingRect.y));
        this.segl.pts.push(new Point(startPrimary - boundingRect.x, endSecondary - boundingRect.y));
        this.segl.pts.push(new Point(endPrimary - boundingRect.x, endSecondary - boundingRect.y));
      }
    } else {
      // Complex case: create 5-point segmented line

      // Check for primary/secondary relationship
      isPrimaryLessThanSecondary = startPrimary < endPrimary;

      // Clear lengths array if we don't have exactly 5 points
      if (totalPoints != 5) {
        this.segl.lengths.splice(0);
      }

      // Process hooks for adjustments
      if (this.hooks) {
        if (isPrimaryLessThanSecondary) {
          if (secondaryFactor === -1) {
            // Calculate hook start adjustment
            hookStartAdjustment = isVertical ?
              this.EndPoint.y + OptConstant.Defines.SED_SegDefLen :
              this.EndPoint.x + OptConstant.Defines.SED_SegDefLen;

            // Look for hook at KTR point
            for (loopIndex = 0; loopIndex < this.hooks.length; loopIndex++) {
              if (this.hooks[loopIndex].hookpt === OptConstant.HookPts.SED_KTR) {
                hookObj = T3Gv.opt.GetObjectPtr(this.hooks[loopIndex].objid, false);
                if (hookObj) {
                  const hookRect = hookObj.GetTargetRect();
                  const heightDiff = startSecondary - (hookRect.y + hookRect.height);

                  // Determine hook end adjustment based on connection point and space
                  hookEndAdjustment = heightDiff < OptConstant.Defines.SED_SegDefLen + OptConstant.Defines.SED_SegMinLen ?
                    isVertical ?
                      this.EndPoint.x - hookRect.width * (this.hooks[loopIndex].connect.x / segmentDimension) - OptConstant.Defines.SED_SegDefLen :
                      this.EndPoint.y - hookRect.height * (this.hooks[loopIndex].connect.y / segmentDimension) - OptConstant.Defines.SED_SegDefLen
                    : isVertical ?
                      this.EndPoint.x + hookRect.width * ((segmentDimension - this.hooks[loopIndex].connect.x) / segmentDimension) + OptConstant.Defines.SED_SegDefLen :
                      this.EndPoint.y + hookRect.height * ((segmentDimension - this.hooks[loopIndex].connect.y) / segmentDimension) + OptConstant.Defines.SED_SegDefLen;
                }
                break;
              }
            }
          } else {
            // Handle other factor cases
            for (loopIndex = 0; loopIndex < this.hooks.length; loopIndex++) {
              if (this.hooks[loopIndex].hookpt === OptConstant.HookPts.SED_KTR) {
                hookObj = T3Gv.opt.GetObjectPtr(this.hooks[loopIndex].objid, false);
                if (hookObj) {
                  const hookRect = hookObj.GetTargetRect();
                  hookStartAdjustment = isVertical ?
                    this.StartPoint.y + hookRect.height / 2 + OptConstant.Defines.SED_SegDefLen :
                    this.StartPoint.x + hookRect.width / 2 + OptConstant.Defines.SED_SegDefLen;
                }
                break;
              }
            }
          }
        } else {
          // Handle the case where primary is greater than or equal to secondary
          for (loopIndex = 0; loopIndex < this.hooks.length; loopIndex++) {
            if (this.hooks[loopIndex].hookpt === OptConstant.HookPts.SED_KTR) {
              hookObj = T3Gv.opt.GetObjectPtr(this.hooks[loopIndex].objid, false);
              if (hookObj) {
                const hookRect = hookObj.GetTargetRect();
                hookEndAdjustment = isVertical ?
                  this.EndPoint.x - hookRect.width / 2 - OptConstant.Defines.SED_SegDefLen :
                  this.EndPoint.y - hookRect.height / 2 - OptConstant.Defines.SED_SegDefLen;
              }
              break;
            }
          }
        }
      }

      // Reset adjustments if auto-insert is allowed
      if (isAutoInsertAllowed) {
        hookEndAdjustment = 0;
        hookStartAdjustment = 0;
      }

      // Add the first point based on orientation
      if (isVertical) {
        this.segl.pts.push(new Point(startSecondary - boundingRect.y, startPrimary - boundingRect.x));
      } else {
        this.segl.pts.push(new Point(startPrimary - boundingRect.x, startSecondary - boundingRect.y));
      }

      // Ensure we have at least one length
      if (this.segl.lengths.length < 1) {
        this.segl.lengths.push(OptConstant.Defines.SED_SegDefLen);
      }

      // Handle SEGL_ONE action type
      if (actionType === OptConstant.ActionTriggerType.SEGL_ONE) {
        this.segl.lengths[0] = isVertical ?
          primaryFactor * (startSecondary - point.x) :
          primaryFactor * (startSecondary - point.y);

        // Ensure minimum length
        if (this.segl.lengths[0] < OptConstant.Defines.SED_SegMinLen) {
          this.segl.lengths[0] = OptConstant.Defines.SED_SegMinLen;
        }
      }

      // Calculate primary distance
      distance = primaryFactor * this.segl.lengths[0];

      // Adjust distance based on hooks and primary/secondary relationship
      if (isPrimaryLessThanSecondary) {
        if (hookEndAdjustment) {
          distance = startSecondary - hookEndAdjustment;
          if (distance < OptConstant.Defines.SED_SegDefLen) {
            distance = OptConstant.Defines.SED_SegDefLen;
          }
          if (distance < this.segl.lengths[0]) {
            distance = primaryFactor * this.segl.lengths[0];
          }
        }
      } else {
        if (hookEndAdjustment) {
          distance = startSecondary - hookEndAdjustment;
          if (primaryFactor === -1) {
            if (-distance < OptConstant.Defines.SED_SegDefLen) {
              distance = -OptConstant.Defines.SED_SegDefLen;
            }
          } else if (distance < OptConstant.Defines.SED_SegDefLen) {
            distance = OptConstant.Defines.SED_SegDefLen;
          }

          if (this.segl.lengths[0] < primaryFactor * distance) {
            distance = primaryFactor * this.segl.lengths[0];
          }
        }
      }

      // Ensure length consistency
      if (this.segl.lengths[0] > primaryFactor * distance) {
        distance = primaryFactor * this.segl.lengths[0];
      }

      // Calculate coordinate U and ensure it's within bounds
      coordU = startSecondary - distance;
      if (coordU < 0) {
        coordU = 0;
      }
      if (coordU > maxDimensions.y) {
        coordU = maxDimensions.y;
      }

      // Add second point based on orientation
      if (isVertical) {
        this.segl.pts.push(new Point(coordU - boundingRect.y, startPrimary - boundingRect.x));
      } else {
        this.segl.pts.push(new Point(startPrimary - boundingRect.x, coordU - boundingRect.y));
      }

      // Ensure we have at least two lengths
      if (this.segl.lengths.length < 2) {
        this.segl.lengths.push(OptConstant.Defines.SED_SegDefLen);
      }

      // Handle SEGL_TWO action type (adjust second segment)
      if (actionType === OptConstant.ActionTriggerType.SEGL_TWO) {
        if (isPrimaryLessThanSecondary) {
          if (isVertical) {
            // Adjust point y for vertical orientation
            if (secondaryFactor === -1) {
              if (point.y < endPrimary + OptConstant.Defines.SED_SegDefLen) {
                point.y = endPrimary + OptConstant.Defines.SED_SegDefLen;
              }
            } else if (point.y > endPrimary - OptConstant.Defines.SED_SegDefLen) {
              point.y = endPrimary - OptConstant.Defines.SED_SegDefLen;
            }
            this.segl.lengths[1] = Math.abs(point.y - startPrimary);
          } else {
            // Adjust point x for horizontal orientation
            if (secondaryFactor === -1) {
              if (point.x < endPrimary + OptConstant.Defines.SED_SegDefLen) {
                point.x = endPrimary + OptConstant.Defines.SED_SegDefLen;
              }
            } else if (point.x > endPrimary - OptConstant.Defines.SED_SegDefLen) {
              point.x = endPrimary - OptConstant.Defines.SED_SegDefLen;
            }
            this.segl.lengths[1] = Math.abs(point.x - startPrimary);
          }
        } else {
          if (isVertical) {
            // Different constraints for reversed direction
            if (secondaryFactor === -1) {
              if (point.y < endPrimary - OptConstant.Defines.SED_SegMinLen) {
                point.y = endPrimary - OptConstant.Defines.SED_SegMinLen;
              }
            } else if (point.y > endPrimary + OptConstant.Defines.SED_SegMinLen) {
              point.y = endPrimary + OptConstant.Defines.SED_SegMinLen;
            }
            this.segl.lengths[1] = Math.abs(point.y - startPrimary);
          } else {
            // Ensure minimum segment length for horizontal
            if (point.x > startPrimary - OptConstant.Defines.SED_SegMinLen) {
              point.x = startPrimary - OptConstant.Defines.SED_SegMinLen;
            }
            this.segl.lengths[1] = Math.abs(point.x - startPrimary);
          }
        }
      }

      // Calculate coordinate P based on primary/secondary relationship
      if (isPrimaryLessThanSecondary) {
        distance = this.segl.lengths[1];
        if (hookStartAdjustment && hookStartAdjustment > this.segl.lengths[1] + startPrimary) {
          distance = hookStartAdjustment - startPrimary;
        }
        coordP = startPrimary + distance;
        if (secondaryFactor == -1) {
          if (coordP <= endPrimary) {
            coordP = startPrimary + distance;
          }
        } else if (coordP >= endPrimary) {
          coordP = startPrimary - distance;
        }
      } else {
        coordP = startPrimary - this.segl.lengths[1];
        const tempCoord = endPrimary - secondaryFactor * OptConstant.Defines.SED_SegDefLen;
        if (secondaryFactor == -1 && this.segl.lengths[1] != OptConstant.Defines.SED_SegDefLen) {
          if (tempCoord > coordP) {
            coordP = tempCoord;
          }
        } else if (tempCoord < coordP) {
          coordP = tempCoord;
        }
      }

      // Ensure coordinate P is within bounds
      if (coordP < 0) {
        coordP = 0;
      }
      if (coordP > maxDimensions.x) {
        coordP = maxDimensions.x;
      }

      // Add remaining points based on orientation
      if (isVertical) {
        this.segl.pts.push(new Point(coordU - boundingRect.y, coordP - boundingRect.x));
        this.segl.pts.push(new Point(endSecondary - boundingRect.y, coordP - boundingRect.x));
        this.segl.pts.push(new Point(endSecondary - boundingRect.y, endPrimary - boundingRect.x));
      } else {
        this.segl.pts.push(new Point(coordP - boundingRect.x, coordU - boundingRect.y));
        this.segl.pts.push(new Point(coordP - boundingRect.x, endSecondary - boundingRect.y));
        this.segl.pts.push(new Point(endPrimary - boundingRect.x, endSecondary - boundingRect.y));
      }
    }

    T3Util.Log("= S.SegmentedLine: SegLTopToLeft output", {
      pts: this.segl.pts,
      lengths: this.segl.lengths
    });
  }

  GetCornerSize(inputSize: number, maxAllowedCorner: number): number {
    T3Util.Log("= S.SegmentedLine: GetCornerSize input", { inputSize, maxAllowedCorner });

    // Choose the smaller of the two sizes as the base for calculation
    const baseSize = Math.min(inputSize, maxAllowedCorner);

    // Get the current curve parameter and define the maximum allowed curve (40% of base size)
    const currentCurve = this.segl.curveparam;
    const maxCurve = 0.4 * baseSize;

    // Limit the curve parameter to the maximum allowed value if necessary
    const cornerSize = currentCurve > maxCurve ? maxCurve : currentCurve;

    T3Util.Log("= S.SegmentedLine: GetCornerSize output", { cornerSize });
    return cornerSize;
  }

  GetPolyPoints(numPolyPts, translatePoints, skipCurves, reserved, extraOption) {
    T3Util.Log("= S.SegmentedLine: GetPolyPoints input", {
      numPolyPts,
      translatePoints,
      skipCurves,
      reserved,
      extraOption
    });

    let polyPoints: Point[] = [];
    let cornerSizeCalc = 0;

    if (this.segl && this.segl.pts.length) {
      const totalPts = this.segl.pts.length;
      // If curve parameter > 0 and curves are not skipped, add curves to the polyline
      if (this.segl.curveparam > 0 && !skipCurves) {
        for (let n = 0; n < totalPts; n++) {
          let lenPrev = 0, lenNext = 0;
          let isVertical = false;
          let directionPrev: number, directionNext: number;
          let curveSegment: Point[];

          if (n > 0 && n < totalPts - 1) {
            // Calculate length from previous point
            if (this.segl.pts[n].x === this.segl.pts[n - 1].x) {
              lenPrev = Math.abs(this.segl.pts[n].y - this.segl.pts[n - 1].y);
              isVertical = true;
              directionPrev = this.segl.pts[n].y - this.segl.pts[n - 1].y > 0 ? 1 : -1;
            } else {
              lenPrev = Math.abs(this.segl.pts[n].x - this.segl.pts[n - 1].x);
              directionPrev = this.segl.pts[n].x - this.segl.pts[n - 1].x > 0 ? 1 : -1;
            }
            // Calculate length to next point
            if (this.segl.pts[n].x === this.segl.pts[n + 1].x) {
              lenNext = Math.abs(this.segl.pts[n].y - this.segl.pts[n + 1].y);
              directionNext = this.segl.pts[n + 1].y - this.segl.pts[n].y > 0 ? 1 : -1;
            } else {
              lenNext = Math.abs(this.segl.pts[n].x - this.segl.pts[n + 1].x);
              directionNext = this.segl.pts[n + 1].x - this.segl.pts[n].x > 0 ? 1 : -1;
            }
            // Calculate the corner size based on the length differences
            cornerSizeCalc = this.GetCornerSize(lenPrev, lenNext);

            // Depending on the orientation, adjust the point and add curve points
            if (isVertical) {
              polyPoints.push(new Point(this.segl.pts[n].x, this.segl.pts[n].y - cornerSizeCalc * directionPrev));
              curveSegment = T3Gv.opt.Lines_AddCurve(
                true,
                directionPrev,
                directionNext,
                this.segl.pts[n].x,
                this.segl.pts[n].y,
                cornerSizeCalc
              );
              polyPoints = polyPoints.concat(curveSegment);
            } else {
              polyPoints.push(new Point(this.segl.pts[n].x - cornerSizeCalc * directionPrev, this.segl.pts[n].y));
              curveSegment = T3Gv.opt.Lines_AddCurve(
                false,
                directionPrev,
                directionNext,
                this.segl.pts[n].x,
                this.segl.pts[n].y,
                cornerSizeCalc
              );
              polyPoints = polyPoints.concat(curveSegment);
            }
          } else {
            // For endpoints, simply push the original point
            polyPoints.push(new Point(this.segl.pts[n].x, this.segl.pts[n].y));
          }
        }
      } else {
        // No curve formatting requested, so simply clone all segmentation points
        for (let n = 0; n < totalPts; n++) {
          polyPoints.push(new Point(this.segl.pts[n].x, this.segl.pts[n].y));
        }
      }

      // If translation flag is false, translate the points by the top-left of the bounding rectangle
      if (!translatePoints) {
        const rectStart = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
        for (let n = 0; n < polyPoints.length; n++) {
          polyPoints[n].x += rectStart.x;
          polyPoints[n].y += rectStart.y;
        }
      }
    } else {
      // Fallback to base class implementation (Double === TODO)
      polyPoints = super.GetPolyPoints(numPolyPts, translatePoints, true, extraOption);
    }

    T3Util.Log("= S.SegmentedLine: GetPolyPoints output", polyPoints);
    return polyPoints;
  }

  LM_DrawPreTrack(svgDoc) {
    T3Util.Log("= S.SegmentedLine: LM_DrawPreTrack input", { svgDoc });

    // Call the base class method and log its result
    const basePreTrackResult = super.LM_DrawPreTrack(svgDoc);
    T3Util.Log("= S.SegmentedLine: Base LM_DrawPreTrack output", { basePreTrackResult });

    let connectObject;
    if (
      T3Gv.opt.linkParams &&
      T3Gv.opt.linkParams.SConnectIndex >= 0
    ) {
      connectObject = T3Gv.opt.GetObjectPtr(
        T3Gv.opt.linkParams.SConnectIndex,
        false
      );
      if (connectObject) {
        this.segl.firstdir = connectObject.GetSegLFace(
          T3Gv.opt.linkParams.ConnectPt,
          this.EndPoint,
          svgDoc
        );
        T3Util.Log("= S.SegmentedLine: Updated segl.firstdir", {
          firstdir: this.segl.firstdir
        });
      }
    }

    T3Util.Log("= S.SegmentedLine: LM_DrawPreTrack output", { result: true });
    return true;
  }

  AdjustLine(svgDoc, x, y, trigger) {
    T3Util.Log("= S.SegmentedLine: AdjustLine input", { svgDoc, x, y, trigger });

    let shapeElem, slopElem;
    if (svgDoc) {
      shapeElem = svgDoc.GetElementByID(OptConstant.SVGElementClass.SHAPE);
      slopElem = svgDoc.GetElementByID(OptConstant.SVGElementClass.SLOP);
    }

    const newPoint = new Point(x, y);
    this.SegLFormat(newPoint, trigger, 0);
    this.CalcFrame();

    const frameRect = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
    // Get the updated polyline points with readable parameters
    const polyPoints = this.GetPolyPoints(OptConstant.Defines.NPOLYPTS, true, false, false, null);

    if (svgDoc) {
      svgDoc.SetSize(this.Frame.width, this.Frame.height);
      svgDoc.SetPos(frameRect.x, frameRect.y);

      shapeElem.SetSize(this.Frame.width, this.Frame.height);
      this.UpdateSVG(shapeElem, polyPoints);

      slopElem.SetSize(this.Frame.width, this.Frame.height);
      this.UpdateSVG(slopElem, polyPoints);

      new SelectionAttributes();
      this.UpdateDimensionLines(svgDoc);

      T3Gv.opt.UpdateDisplayCoordinates(
        this.Frame,
        newPoint,
        CursorConstant.CursorTypes.Grow,
        this
      );

      if (this.DataID !== -1) {
        this.LM_ResizeSVGTextObject(svgDoc, this, this.Frame);
      }
    }

    T3Util.Log("= S.SegmentedLine: AdjustLine output", { Frame: this.Frame, newPoint });
  }

  AdjustLineEnd(svgDoc, newX, newY, trigger) {
    T3Util.Log("= S.SegmentedLine: AdjustLineEnd input", { svgDoc, newX, newY, trigger });

    // Save current endpoint values
    const originalEndPoint = { x: this.EndPoint.x, y: this.EndPoint.y };

    // Temporarily update EndPoint to new values and enforce minimum dimensions
    this.EndPoint.x = newX;
    this.EndPoint.y = newY;
    this.EnforceMinimum(false);

    // Use the enforced new values
    newX = this.EndPoint.x;
    newY = this.EndPoint.y;

    // Restore original EndPoint
    this.EndPoint.x = originalEndPoint.x;
    this.EndPoint.y = originalEndPoint.y;

    // Create an adjusted endpoint object for direction calculation
    const adjustedEndPoint = { x: newX, y: newY };

    // Update directional properties based on connected object if applicable
    if (T3Gv.opt.linkParams && T3Gv.opt.linkParams.ConnectIndex >= 0) {
      const connectedObj = T3Gv.opt.GetObjectPtr(T3Gv.opt.linkParams.ConnectIndex, false);
      if (connectedObj) {
        this.segl.lastdir = connectedObj.GetSegLFace(T3Gv.opt.linkParams.ConnectPt, this.StartPoint, adjustedEndPoint);
      }
    } else if (T3Gv.opt.ob && T3Gv.opt.ob.BlockID === this.BlockID) {
      this.segl.firstdir = T3Gv.opt.ob.segl.firstdir;
      this.segl.lastdir = T3Gv.opt.ob.segl.lastdir;
    }

    // Adjust the line using the svg document and the new endpoint values
    this.AdjustLine(svgDoc, newX, newY, OptConstant.ActionTriggerType.LINEEND);

    T3Util.Log("= S.SegmentedLine: AdjustLineEnd output", { EndPoint: this.EndPoint, segl: this.segl });
  }

  AdjustLineStart(svgDoc, newX, newY) {
    T3Util.Log("= S.SegmentedLine: AdjustLineStart input", { svgDoc, newX, newY });

    // Save the original StartPoint values
    const originalStartPoint = {
      x: this.StartPoint.x,
      y: this.StartPoint.y,
    };

    // Minimum allowed dimension value
    const minDim = OptConstant.Defines.SED_MinDim;

    // Temporarily update StartPoint to the new position and enforce minimum dimensions
    this.StartPoint.x = newX;
    this.StartPoint.y = newY;
    this.EnforceMinimum(true);

    // Get the adjusted values after enforcing minimum dimensions
    const adjustedX = this.StartPoint.x;
    const adjustedY = this.StartPoint.y;

    // Restore original StartPoint for further calculations
    this.StartPoint.x = originalStartPoint.x;
    this.StartPoint.y = originalStartPoint.y;

    // Adjust the first segmentation length based on the orientation
    if (this.segl.pts[0].x === this.segl.pts[1].x) {
      // Vertical line: adjust based on Y difference
      this.segl.lengths[0] += this.StartPoint.y - adjustedY;
      if (this.segl.lengths[0] < minDim) {
        this.segl.lengths[0] = minDim;
      }
    } else {
      // Horizontal line: adjust based on X difference
      this.segl.lengths[0] += this.StartPoint.x - adjustedX;
      if (this.segl.lengths[0] < minDim) {
        this.segl.lengths[0] = minDim;
      }
    }

    // Prepare the connection point using the adjusted coordinates
    const connectionPoint = { x: adjustedX, y: adjustedY };

    // Update segl.firstdir based on a connected object if available
    if (T3Gv.opt.linkParams && T3Gv.opt.linkParams.ConnectIndex >= 0) {
      const connectedObj = T3Gv.opt.GetObjectPtr(T3Gv.opt.linkParams.ConnectIndex, false);
      if (connectedObj) {
        this.segl.firstdir = connectedObj.GetSegLFace(T3Gv.opt.linkParams.ConnectPt, this.EndPoint, connectionPoint);
      }
    } else if (T3Gv.opt.ob && T3Gv.opt.ob.BlockID === this.BlockID) {
      // Fallback to using the current object's directional values
      this.segl.firstdir = T3Gv.opt.ob.segl.firstdir;
      this.segl.lastdir = T3Gv.opt.ob.segl.lastdir;
    }

    // Adjust the line using the updated parameters
    this.AdjustLine(svgDoc, adjustedX, adjustedY, OptConstant.ActionTriggerType.LINESTART);

    T3Util.Log("= S.SegmentedLine: AdjustLineStart output", {
      originalStartPoint,
      adjustedPoint: connectionPoint,
      seglFirstDir: this.segl.firstdir,
      seglLength0: this.segl.lengths[0]
    });
  }

  GetDimensions() {
    T3Util.Log("= S.SegmentedLine: GetDimensions input", {
      StartPoint: this.StartPoint,
      EndPoint: this.EndPoint
    });
    const width = Math.abs(this.EndPoint.x - this.StartPoint.x);
    const height = Math.abs(this.EndPoint.y - this.StartPoint.y);
    const dimensions = { x: width, y: height };
    T3Util.Log("= S.SegmentedLine: GetDimensions output", dimensions);
    return dimensions;
  }

  GetDimensionsForDisplay() {
    T3Util.Log("= S.SegmentedLine: GetDimensionsForDisplay input", { Frame: this.Frame });
    const dimensions = {
      x: this.Frame.x,
      y: this.Frame.y,
      width: this.Frame.width,
      height: this.Frame.height
    };
    T3Util.Log("= S.SegmentedLine: GetDimensionsForDisplay output", dimensions);
    return dimensions;
  }

  UpdateDimensions(offsetElement, offsetX, offsetY) {
    T3Util.Log("= S.SegmentedLine: UpdateDimensions input", { offsetElement, offsetX, offsetY });
    const svgObject = T3Gv.opt.svgObjectLayer.GetElementByID(this.BlockID);
    const newX = offsetX ? this.StartPoint.x + offsetX : this.EndPoint.x;
    const newY = offsetY ? this.StartPoint.y + offsetY : this.EndPoint.y;
    T3Util.Log("= S.SegmentedLine: UpdateDimensions computed", { newX, newY });
    this.AdjustLineEnd(svgObject, newX, newY, OptConstant.ActionTriggerType.LINEEND);
    T3Util.Log("= S.SegmentedLine: UpdateDimensions output", { EndPoint: this.EndPoint });
  }

  SetSize(newWidth, newHeight, forceFlag) {
    T3Util.Log("= S.SegmentedLine: SetSize input", { newWidth, newHeight, forceFlag });

    let isEndAdjusted = false;
    let deltaWidth = 0;
    let deltaHeight = 0;

    // Calculate delta values based on current frame size
    if (newWidth) {
      deltaWidth = newWidth - this.Frame.width;
    }
    if (newHeight) {
      deltaHeight = newHeight - this.Frame.height;
    }

    // Clear floating point dimension flags if present
    if (this.rflags) {
      this.rflags = Utils2.SetFlag(this.rflags, NvConstant.FloatingPointDim.SD_FP_Width, false);
      this.rflags = Utils2.SetFlag(this.rflags, NvConstant.FloatingPointDim.SD_FP_Height, false);
    }

    // Determine adjustment mode based on StartPoint and EndPoint ordering
    if (
      this.StartPoint.x < this.EndPoint.x ||
      (Utils2.IsEqual(this.StartPoint.x, this.EndPoint.x) && this.StartPoint.y < this.EndPoint.y)
    ) {
      isEndAdjusted = true;
    }

    const svgElement = T3Gv.opt.svgObjectLayer.GetElementByID(this.BlockID);

    // Adjust line end or start based on order
    if (isEndAdjusted) {
      this.AdjustLineEnd(svgElement, this.EndPoint.x + deltaWidth, this.EndPoint.y + deltaHeight, 0);
    } else {
      this.AdjustLineStart(svgElement, this.StartPoint.x + deltaWidth, this.StartPoint.y + deltaHeight, 0);
    }

    T3Gv.opt.SetLinkFlag(this.BlockID, ShapeConstant.LinkFlags.SED_L_MOVE);
    T3Util.Log("= S.SegmentedLine: SetSize output", { deltaWidth, deltaHeight, isEndAdjusted });
  }

  Flip(flipFlags: number): void {
    T3Util.Log("= S.SegmentedLine: Flip input", { flipFlags });
    let isFlipped = false;
    let rect: any;
    let i: number;
    let reposition: number;
    let tempPoints: Point[] = [];
    const segLDir = NvConstant.SegLDir;

    // Create a backup of current object
    T3Gv.opt.ob = Utils1.DeepCopy(this);

    // Process vertical flip if flag is set
    if (flipFlags & OptConstant.ExtraFlags.SEDE_FlipVert) {
      isFlipped = true;

      // Flip first directional flag vertically
      switch (this.segl.firstdir) {
        case segLDir.SED_KTC:
          this.segl.firstdir = segLDir.SED_KBC;
          break;
        case segLDir.SED_KBC:
          this.segl.firstdir = segLDir.SED_KTC;
          break;
      }

      // Flip last directional flag vertically
      switch (this.segl.lastdir) {
        case segLDir.SED_KTC:
          this.segl.lastdir = segLDir.SED_KBC;
          break;
        case segLDir.SED_KBC:
          this.segl.lastdir = segLDir.SED_KTC;
          break;
      }

      // Calculate the rectangle from start to end points
      rect = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
      const numPoints = this.segl.pts.length;

      // Adjust each point: shift relative to the rectangle and frame
      for (i = 0; i < numPoints; i++) {
        tempPoints.push(
          new Point(this.segl.pts[i].x, this.segl.pts[i].y + rect.y - this.Frame.y)
        );
      }
      // Flip the vertical positions based on frame height
      const frameHeight = this.Frame.height;
      for (i = 0; i < numPoints; i++) {
        tempPoints[i].y = frameHeight - tempPoints[i].y;
      }
      // Update StartPoint and EndPoint y coordinates
      this.StartPoint.y = tempPoints[0].y + this.Frame.y;
      this.EndPoint.y = tempPoints[numPoints - 1].y + this.Frame.y;
      // Compute adjustment offset based on which point is higher
      reposition =
        this.EndPoint.y < this.StartPoint.y
          ? this.EndPoint.y - this.Frame.y
          : this.StartPoint.y - this.Frame.y;
      // Reposition the segmentation points
      for (i = 0; i < numPoints; i++) {
        this.segl.pts[i].y = tempPoints[i].y - reposition;
      }
      // Clear temporary points for reuse
      tempPoints = [];
    }

    // Process horizontal flip if flag is set
    if (flipFlags & OptConstant.ExtraFlags.SEDE_FlipHoriz) {
      isFlipped = true;

      // Flip first directional flag horizontally
      switch (this.segl.firstdir) {
        case segLDir.SED_KLC:
          this.segl.firstdir = segLDir.SED_KRC;
          break;
        case segLDir.SED_KRC:
          this.segl.firstdir = segLDir.SED_KLC;
          break;
      }

      // Flip last directional flag horizontally
      switch (this.segl.lastdir) {
        case segLDir.SED_KLC:
          this.segl.lastdir = segLDir.SED_KRC;
          break;
        case segLDir.SED_KRC:
          this.segl.lastdir = segLDir.SED_KLC;
          break;
      }

      // Calculate the rectangle from start to end points
      rect = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
      const numPoints = this.segl.pts.length;

      // Adjust each point: shift relative to the rectangle and frame
      for (i = 0; i < numPoints; i++) {
        tempPoints.push(
          new Point(this.segl.pts[i].x + rect.x - this.Frame.x, this.segl.pts[i].y)
        );
      }
      // Flip the horizontal positions based on frame width
      const frameWidth = this.Frame.width;
      for (i = 0; i < numPoints; i++) {
        tempPoints[i].x = frameWidth - tempPoints[i].x;
      }
      // Update StartPoint and EndPoint x coordinates
      this.StartPoint.x = tempPoints[0].x + this.Frame.x;
      this.EndPoint.x = tempPoints[numPoints - 1].x + this.Frame.x;
      // Compute adjustment offset based on which point is more to the left
      reposition =
        this.EndPoint.x < this.StartPoint.x
          ? this.EndPoint.x - this.Frame.x
          : this.StartPoint.x - this.Frame.x;
      // Reposition the segmentation points
      for (i = 0; i < numPoints; i++) {
        this.segl.pts[i].x = tempPoints[i].x - reposition;
      }
      // Clear temporary points
      tempPoints = [];
    }

    // If any flip occurred, update the text object and maintain links
    if (isFlipped) {
      const svgElement = T3Gv.opt.svgObjectLayer.GetElementByID(this.BlockID);
      if (this.DataID !== -1) {
        this.LM_ResizeSVGTextObject(svgElement, this, this.Frame);
      }
      if (T3Gv.opt.ob.Frame) {
        T3Gv.opt.MaintainLink(
          this.BlockID,
          this,
          T3Gv.opt.ob,
          OptConstant.ActionTriggerType.ROTATE
        );
      }
      T3Gv.opt.SetLinkFlag(this.BlockID, ShapeConstant.LinkFlags.SED_L_MOVE);
    }

    T3Gv.opt.ob = {};
    T3Util.Log("= S.SegmentedLine: Flip output", {
      StartPoint: this.StartPoint,
      EndPoint: this.EndPoint,
      segl: this.segl,
    });
  }

  GetFrameIntersects(intersectFrame: any, shapeDoc: any, outputPoints: Point[], resultContext: any): boolean {
    T3Util.Log("= S.SegmentedLine: GetFrameIntersects input", { intersectFrame, shapeDoc, outputPoints, resultContext });

    const minThreshold = 2 * OptConstant.Defines.SED_SegMinLen;
    // Get the bounding rect of the entire segmented line object
    const segRect = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
    // Translate the given frame by subtracting the segmented line's origin
    let localFrame: any = {
      x: intersectFrame.x - segRect.x,
      y: intersectFrame.y - segRect.y,
      width: intersectFrame.width,
      height: intersectFrame.height
    };

    const totalPoints = this.segl.pts.length;
    // Loop through each segment
    for (let idx = 1; idx < totalPoints; idx++) {
      // Check if the segment is vertical (x coordinates are equal)
      if (this.segl.pts[idx].x === this.segl.pts[idx - 1].x) {
        // Determine vertical min and max Y
        let segMinY = this.segl.pts[idx].y < this.segl.pts[idx - 1].y ? this.segl.pts[idx].y : this.segl.pts[idx - 1].y;
        let segMaxY = this.segl.pts[idx].y > this.segl.pts[idx - 1].y ? this.segl.pts[idx].y : this.segl.pts[idx - 1].y;
        // The common X coordinate for vertical segments
        const segX = this.segl.pts[idx].x;

        if ((segMinY + minThreshold < localFrame.y) &&
          (segMaxY - minThreshold > localFrame.y + localFrame.height) &&
          (segX > localFrame.x) &&
          (segX < localFrame.x + localFrame.width)) {
          shapeDoc.AdjustAutoInsertShape(intersectFrame, true);
          resultContext.AutoSeg = idx;
          // Update localFrame with original values
          localFrame = {
            x: intersectFrame.x - segRect.x,
            y: intersectFrame.y - segRect.y,
            width: intersectFrame.width,
            height: intersectFrame.height
          };
          // Add intersection points based on segment direction
          if (this.segl.pts[idx - 1].y < this.segl.pts[idx].y) {
            outputPoints.push(new Point(segX + segRect.x, localFrame.y + segRect.y));
            outputPoints[0].index = idx;
            outputPoints.push(new Point(segX + segRect.x, localFrame.y + localFrame.height + segRect.y));
            outputPoints[1].index = idx;
          } else {
            outputPoints.push(new Point(segX + segRect.x, localFrame.y + localFrame.height + segRect.y));
            outputPoints.push(new Point(segX + segRect.x, localFrame.y + segRect.y));
            outputPoints[0].index = idx;
            outputPoints[1].index = idx;
          }
          T3Util.Log("= S.SegmentedLine: GetFrameIntersects output", { outputPoints, resultContext, hitSegment: idx });
          return true;
        }
      } else {
        // Horizontal segment - determine minimal and maximal X values
        let segMinX = this.segl.pts[idx].x < this.segl.pts[idx - 1].x ? this.segl.pts[idx].x : this.segl.pts[idx - 1].x;
        let segMaxX = this.segl.pts[idx].x > this.segl.pts[idx - 1].x ? this.segl.pts[idx].x : this.segl.pts[idx - 1].x;
        // Common Y coordinate for horizontal segments
        const segY = this.segl.pts[idx].y;

        if ((segMinX + minThreshold < localFrame.x) &&
          (segMaxX - minThreshold > localFrame.x + localFrame.width) &&
          (segY > localFrame.y) &&
          (segY < localFrame.y + localFrame.height)) {
          shapeDoc.AdjustAutoInsertShape(intersectFrame, false);
          resultContext.AutoSeg = idx;
          localFrame = {
            x: intersectFrame.x - segRect.x,
            y: intersectFrame.y - segRect.y,
            width: intersectFrame.width,
            height: intersectFrame.height
          };
          if (this.segl.pts[idx - 1].x < this.segl.pts[idx].x) {
            outputPoints.push(new Point(localFrame.x + segRect.x, segY + segRect.y));
            outputPoints.push(new Point(localFrame.x + localFrame.width + segRect.x, segY + segRect.y));
            outputPoints[0].index = idx;
            outputPoints[1].index = idx;
          } else {
            outputPoints.push(new Point(localFrame.x + localFrame.width + segRect.x, segY + segRect.y));
            outputPoints.push(new Point(localFrame.x + segRect.x, segY + segRect.y));
            outputPoints[0].index = idx;
            outputPoints[1].index = idx;
          }
          T3Util.Log("= S.SegmentedLine: GetFrameIntersects output", { outputPoints, resultContext, hitSegment: idx });
          return true;
        }
      }
    }

    T3Util.Log("= S.SegmentedLine: GetFrameIntersects output", { result: false });
    return false;
  }

  NoRotate(): boolean {
    T3Util.Log("= S.SegmentedLine: NoRotate input", {});
    const result = true;
    T3Util.Log("= S.SegmentedLine: NoRotate output", result);
    return result;
  }

  CalcTextPosition(textParams) {
    T3Util.Log("= S.SegmentedLine: CalcTextPosition input", { textParams });

    // Calculate the center of the text position relative to the object's frame.
    const centerPoint = {
      x: textParams.Frame.x + textParams.Frame.width / 2 - this.Frame.x,
      y: textParams.Frame.y + textParams.Frame.height / 2 - this.Frame.y,
    };
    T3Util.Log("= S.SegmentedLine: Center calculated", { centerPoint });

    const totalPoints = this.segl.pts.length;
    let selectedSegmentIndex = 1; // index of the segment chosen for alignment
    let referenceCoordinate = 0; // reference coordinate: x for horizontal, y for vertical segments
    let minDistanceCandidate: number | undefined = undefined;
    const segmentLengths: number[] = [];
    let totalSegmentLength = 0;

    // Loop through segments to find the segment closest to the center
    for (let i = 1; i < totalPoints; i++) {
      const previousPoint = this.segl.pts[i - 1];
      const currentPoint = this.segl.pts[i];

      if (Utils2.IsEqual(previousPoint.x, currentPoint.x)) {
        // Vertical segment
        const segMinY = Math.min(previousPoint.y, currentPoint.y);
        const segMaxY = Math.max(previousPoint.y, currentPoint.y);
        const diffX = Math.abs(centerPoint.x - previousPoint.x);

        // Check if the center's y coordinate lies within this vertical segment's range
        if (centerPoint.y >= segMinY && centerPoint.y <= segMaxY) {
          if (minDistanceCandidate === undefined || diffX < minDistanceCandidate) {
            minDistanceCandidate = diffX;
            selectedSegmentIndex = i;
            referenceCoordinate = previousPoint.y;
          }
        }

        const segLength = Math.abs(previousPoint.y - currentPoint.y);
        segmentLengths.push(segLength);
        totalSegmentLength += segLength;
        T3Util.Log("= S.SegmentedLine: Vertical segment", { index: i, segLength, totalSegmentLength });
      } else {
        // Horizontal segment
        const segMinX = Math.min(previousPoint.x, currentPoint.x);
        const segMaxX = Math.max(previousPoint.x, currentPoint.x);
        const diffY = Math.abs(centerPoint.y - previousPoint.y);

        // Check if the center's x coordinate lies within this horizontal segment's range
        if (centerPoint.x >= segMinX && centerPoint.x <= segMaxX) {
          if (minDistanceCandidate === undefined || diffY < minDistanceCandidate) {
            minDistanceCandidate = diffY;
            selectedSegmentIndex = i;
            referenceCoordinate = previousPoint.x;
          }
        }

        const segLength = Math.abs(previousPoint.x - currentPoint.x);
        segmentLengths.push(segLength);
        totalSegmentLength += segLength;
        T3Util.Log("= S.SegmentedLine: Horizontal segment", { index: i, segLength, totalSegmentLength });
      }
    }

    T3Util.Log("= S.SegmentedLine: Chosen segment", {
      selectedSegmentIndex,
      minDistanceCandidate,
      referenceCoordinate,
      totalSegmentLength,
    });

    // Determine offset along and across the chosen segment.
    const previousPt = this.segl.pts[selectedSegmentIndex - 1];
    const nextPt = this.segl.pts[selectedSegmentIndex];
    let offsetAlongSegment: number;
    let offsetAcrossSegment: number;

    if (Utils2.IsEqual(previousPt.x, nextPt.x)) {
      // For vertical segment: primary offset is along the Y axis; secondary offset is horizontal.
      offsetAlongSegment = Math.abs(centerPoint.y - referenceCoordinate);
      offsetAcrossSegment = -(centerPoint.x - previousPt.x);
      T3Util.Log("= S.SegmentedLine: Vertical offset", { offsetAlongSegment, offsetAcrossSegment });
    } else {
      // For horizontal segment: primary offset is along the X axis; secondary offset is vertical.
      offsetAlongSegment = Math.abs(centerPoint.x - referenceCoordinate);
      offsetAcrossSegment = centerPoint.y - previousPt.y;
      T3Util.Log("= S.SegmentedLine: Horizontal offset", { offsetAlongSegment, offsetAcrossSegment });
    }

    // Calculate the accumulated distance along the polyline up to the chosen segment.
    let accumulatedDistance = 0;
    for (let i = 0; i < selectedSegmentIndex - 1; i++) {
      accumulatedDistance += segmentLengths[i];
    }
    accumulatedDistance += offsetAlongSegment;
    T3Util.Log("= S.SegmentedLine: Accumulated distance", { accumulatedDistance });

    // Set relative text positions.
    this.LineTextX = totalSegmentLength ? accumulatedDistance / totalSegmentLength : 0;
    this.LineTextY = offsetAcrossSegment;

    // If there's a valid horizontal text position, copy the text rectangle.
    if (this.LineTextX) {
      this.trect = $.extend(true, {}, textParams.trect);
    }

    // Set text growth behavior and update text flags.
    textParams.TextGrow = NvConstant.TextGrowBehavior.Vertical;
    this.TextFlags = Utils2.SetFlag(this.TextFlags, NvConstant.TextFlags.SED_TF_HorizText, true);

    T3Util.Log("= S.SegmentedLine: CalcTextPosition output", {
      LineTextX: this.LineTextX,
      LineTextY: this.LineTextY,
      trect: this.trect,
    });
  }

  /**
   * Calculates the text positioning parameters along a segmented line
   * This function determines the optimal position for text along a segmented line based on:
   * - The LineTextX property (proportional position along the total line length)
   * - Text alignment settings when LineTextX is not specified
   * - The geometry of the segmented line's points
   *
   * @param textOptions - Text formatting options
   * @returns Object containing text positioning data including frame, start/end points and center proportion
   */
  GetTextOnLineParams(textOptions) {
    T3Util.Log("= S.SegmentedLine: GetTextOnLineParams input", { textOptions });

    // Initialize variables and the result structure
    let segmentStartIndex, segmentEndIndex;
    let selectedSegmentIndex, segmentLength, currentSegmentLength;
    let accumulatedLineLength = 0;
    let positionProportion = 0.5; // default center position value
    const positionParams = {
      Frame: new Instance.Shape.Rect(),
      StartPoint: new Point(0, 0),
      EndPoint: new Point(0, 0),
      CenterProp: 0
    };

    const segmentPoints = this.segl.pts;
    const pointCount = segmentPoints.length;
    let isReverseAlignment = false;

    // Determine initial alignment indices based on point order (left-to-right or right-to-left)
    if (
      segmentPoints[0].x < segmentPoints[pointCount - 1].x ||
      (segmentPoints[0].x === segmentPoints[pointCount - 1].x && segmentPoints[0].y < segmentPoints[pointCount - 1].y)
    ) {
      segmentStartIndex = 0;
      segmentEndIndex = pointCount - 2;
    } else {
      segmentStartIndex = pointCount - 2;
      segmentEndIndex = 0;
      isReverseAlignment = true;
    }

    if (this.LineTextX !== 0) {
      // When LineTextX is specified: Calculate position based on proportional distance along the line
      let totalLineLength = 0;

      // Calculate the total length of the segmented line by summing all segment lengths
      for (let j = 1; j < pointCount; j++) {
        if (Utils2.IsEqual(segmentPoints[j - 1].x, segmentPoints[j].x)) {
          // Vertical segment: use Y-distance
          totalLineLength += Math.abs(segmentPoints[j - 1].y - segmentPoints[j].y);
        } else {
          // Horizontal segment: use X-distance
          totalLineLength += Math.abs(segmentPoints[j - 1].x - segmentPoints[j].x);
        }
      }

      // Determine the target distance along the line based on LineTextX proportion
      const targetDistance = this.LineTextX * totalLineLength;
      T3Util.Log("= S.SegmentedLine: Total line length calculated", { totalLineLength, targetDistance });

      accumulatedLineLength = 0;
      selectedSegmentIndex = pointCount - 2; // default value if not found

      // Walk through segments until we find the one containing the target position
      for (let j = 1; j < pointCount; j++) {
        currentSegmentLength = Utils2.IsEqual(segmentPoints[j - 1].x, segmentPoints[j].x)
          ? Math.abs(segmentPoints[j - 1].y - segmentPoints[j].y)
          : Math.abs(segmentPoints[j - 1].x - segmentPoints[j].x);

        accumulatedLineLength += currentSegmentLength;

        if (accumulatedLineLength > targetDistance) {
          selectedSegmentIndex = j - 1;
          // Calculate the exact proportional position within the selected segment
          positionProportion = (currentSegmentLength - (accumulatedLineLength - targetDistance)) / currentSegmentLength;
          break;
        }
      }

      positionParams.CenterProp = positionProportion;

      // Set the frame and positioning points based on the selected segment
      positionParams.Frame = Utils1.DeepCopy(this.Frame);
      positionParams.StartPoint.x = positionParams.Frame.x + segmentPoints[selectedSegmentIndex].x;
      positionParams.StartPoint.y = positionParams.Frame.y + segmentPoints[selectedSegmentIndex].y;
      positionParams.EndPoint.x = positionParams.Frame.x + segmentPoints[selectedSegmentIndex + 1].x;
      positionParams.EndPoint.y = positionParams.Frame.y + segmentPoints[selectedSegmentIndex + 1].y;
    } else {
      // When LineTextX is zero: determine segment based on segment count and relative lengths
      switch (pointCount) {
        case 2:
          // Simple line with just two points - use the only available segment
          selectedSegmentIndex = 0;
          break;
        case 3:
          // For 3-point line, compare relative segment lengths and choose the longer one
          if (Utils2.IsEqual(segmentPoints[0].x, segmentPoints[1].x)) {
            // First segment is vertical
            segmentLength = Math.abs(segmentPoints[0].y - segmentPoints[1].y);
            currentSegmentLength = Math.abs(segmentPoints[1].x - segmentPoints[2].x);
          } else {
            // First segment is horizontal
            segmentLength = Math.abs(segmentPoints[0].x - segmentPoints[1].x);
            currentSegmentLength = Math.abs(segmentPoints[1].y - segmentPoints[2].y);
          }
          selectedSegmentIndex = segmentLength > currentSegmentLength ? 0 : 1;
          break;
        case 5:
          // For 5-point line, compare middle segment lengths
          if (Utils2.IsEqual(segmentPoints[1].x, segmentPoints[2].x)) {
            segmentLength = Math.abs(segmentPoints[1].y - segmentPoints[2].y);
            currentSegmentLength = Math.abs(segmentPoints[2].x - segmentPoints[3].x);
          } else {
            segmentLength = Math.abs(segmentPoints[1].x - segmentPoints[2].x);
            currentSegmentLength = Math.abs(segmentPoints[2].y - segmentPoints[3].y);
          }
          selectedSegmentIndex = segmentLength > currentSegmentLength ? 1 : 2;
          break;
        default:
          // For other point counts, select the middle segment
          selectedSegmentIndex = Math.round((pointCount - 1.1) / 2);
      }

      // Adjust start and end points based on TextAlign property
      switch (this.TextAlign) {
        case TextConstant.TextAlign.TOPLEFT:
        case TextConstant.TextAlign.LEFT:
        case TextConstant.TextAlign.BOTTOMLEFT:
          // Left alignment: use the leftmost segment
          if (isReverseAlignment) {
            positionParams.EndPoint.x = this.Frame.x + segmentPoints[segmentStartIndex].x;
            positionParams.EndPoint.y = this.Frame.y + segmentPoints[segmentStartIndex].y;
            positionParams.StartPoint.x = this.Frame.x + segmentPoints[segmentStartIndex + 1].x;
            positionParams.StartPoint.y = this.Frame.y + segmentPoints[segmentStartIndex + 1].y;
          } else {
            positionParams.StartPoint.x = this.Frame.x + segmentPoints[segmentStartIndex].x;
            positionParams.StartPoint.y = this.Frame.y + segmentPoints[segmentStartIndex].y;
            positionParams.EndPoint.x = this.Frame.x + segmentPoints[segmentStartIndex + 1].x;
            positionParams.EndPoint.y = this.Frame.y + segmentPoints[segmentStartIndex + 1].y;
          }
          break;
        case TextConstant.TextAlign.TOPRIGHT:
        case TextConstant.TextAlign.RIGHT:
        case TextConstant.TextAlign.BOTTOMRIGHT:
          // Right alignment: use the rightmost segment
          if (isReverseAlignment) {
            positionParams.EndPoint.x = this.Frame.x + segmentPoints[segmentEndIndex].x;
            positionParams.EndPoint.y = this.Frame.y + segmentPoints[segmentEndIndex].y;
            positionParams.StartPoint.x = this.Frame.x + segmentPoints[segmentEndIndex + 1].x;
            positionParams.StartPoint.y = this.Frame.y + segmentPoints[segmentEndIndex + 1].y;
          } else {
            positionParams.StartPoint.x = this.Frame.x + segmentPoints[segmentEndIndex].x;
            positionParams.StartPoint.y = this.Frame.y + segmentPoints[segmentEndIndex].y;
            positionParams.EndPoint.x = this.Frame.x + segmentPoints[segmentEndIndex + 1].x;
            positionParams.EndPoint.y = this.Frame.y + segmentPoints[segmentEndIndex + 1].y;
          }
          break;
        default:
          // Center or other alignment: use the selected segment from earlier calculations
          if (isReverseAlignment) {
            positionParams.EndPoint.x = this.Frame.x + segmentPoints[selectedSegmentIndex].x;
            positionParams.EndPoint.y = this.Frame.y + segmentPoints[selectedSegmentIndex].y;
            positionParams.StartPoint.x = this.Frame.x + segmentPoints[selectedSegmentIndex + 1].x;
            positionParams.StartPoint.y = this.Frame.y + segmentPoints[selectedSegmentIndex + 1].y;
          } else {
            positionParams.StartPoint.x = this.Frame.x + segmentPoints[selectedSegmentIndex].x;
            positionParams.StartPoint.y = this.Frame.y + segmentPoints[selectedSegmentIndex].y;
            positionParams.EndPoint.x = this.Frame.x + segmentPoints[selectedSegmentIndex + 1].x;
            positionParams.EndPoint.y = this.Frame.y + segmentPoints[selectedSegmentIndex + 1].y;
          }
      }
      positionParams.Frame = Utils1.DeepCopy(this.Frame);
    }

    T3Util.Log("= S.SegmentedLine: GetTextOnLineParams output", positionParams);
    return positionParams;
  }

  CreateActionTriggers(
    svgDoc: any,
    triggerId: any,
    paramA: any,
    relatedId: any
  ) {
    T3Util.Log("= S.SegmentedLine: CreateActionTriggers input", {
      svgDoc,
      triggerId,
      paramA,
      relatedId
    });

    const groupShape = svgDoc.CreateShape(OptConstant.CSType.GROUP);
    const knobSizeDef = OptConstant.Defines.SED_KnobSize;

    let docToScreenScale = svgDoc.docInfo.docToScreenScale;
    if (svgDoc.docInfo.docScale <= 0.5) {
      docToScreenScale *= 2;
    }
    const knobSize = knobSizeDef / docToScreenScale;
    const rect = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
    let frameWidth = this.Frame.width;
    let frameHeight = this.Frame.height;
    const hookObj = T3Gv.opt.GetObjectPtr(triggerId, false);

    frameWidth += knobSize;
    frameHeight += knobSize;

    const adjustedFrame = $.extend(true, {}, this.Frame);
    adjustedFrame.x -= knobSize / 2;
    adjustedFrame.y -= knobSize / 2;
    adjustedFrame.width += knobSize;
    adjustedFrame.height += knobSize;

    let knobConfig: any = {
      svgDoc: svgDoc,
      shapeType: OptConstant.CSType.RECT,
      knobSize: knobSize,
      fillColor: "black",
      fillOpacity: 1,
      strokeSize: 1,
      strokeColor: "#777777",
      cursorType: this.CalcCursorForSegment(this.StartPoint, this.EndPoint, false),
      locked: false
    };

    // Modify knob appearance based on connection status
    if (triggerId != relatedId) {
      knobConfig.fillColor = "white";
      knobConfig.strokeSize = 1;
      knobConfig.strokeColor = "black";
      knobConfig.fillOpacity = 0;
    }
    if (this.flags & NvConstant.ObjFlags.SEDO_Lock) {
      knobConfig.fillColor = "gray";
      knobConfig.locked = true;
    } else if (this.NoGrow()) {
      knobConfig.fillColor = "red";
      knobConfig.strokeColor = "red";
      knobConfig.cursorType = CursorConstant.CursorType.DEFAULT;
    }

    // Set knob position for start knob
    knobConfig.x = this.StartPoint.x - this.Frame.x;
    knobConfig.y = this.StartPoint.y - this.Frame.y;
    knobConfig.knobID = OptConstant.ActionTriggerType.LINESTART;

    if (hookObj && hookObj.hooks) {
      for (let d = 0; d < hookObj.hooks.length; d++) {
        if (hookObj.hooks[d].hookpt === OptConstant.HookPts.SED_KTL) {
          knobConfig.shapeType = OptConstant.CSType.OVAL;
          break;
        }
      }
    }
    let startKnob = this.GenericKnob(knobConfig);
    groupShape.AddElement(startKnob);

    // Set knob configuration for end knob
    knobConfig.shapeType = OptConstant.CSType.RECT;
    if (hookObj && hookObj.hooks) {
      for (let d = 0; d < hookObj.hooks.length; d++) {
        if (hookObj.hooks[d].hookpt === OptConstant.HookPts.SED_KTR) {
          knobConfig.shapeType = OptConstant.CSType.OVAL;
          break;
        }
      }
    }
    knobConfig.x = this.EndPoint.x - this.Frame.x;
    knobConfig.y = this.EndPoint.y - this.Frame.y;
    knobConfig.knobID = OptConstant.ActionTriggerType.LINEEND;

    let endKnob = this.GenericKnob(knobConfig);
    groupShape.AddElement(endKnob);

    // Create additional knobs along the segmented line if available
    knobConfig.shapeType = OptConstant.CSType.RECT;
    if (this.segl && this.segl.pts && this.segl.firstdir > 0) {
      const ptsCount = this.segl.pts.length;
      for (let d = 2; d < ptsCount - 1; d++) {
        if (this.segl.pts[d - 1].x === this.segl.pts[d].x) {
          knobConfig.x = this.segl.pts[d].x + rect.x - this.Frame.x;
          knobConfig.y =
            (this.segl.pts[d - 1].y + this.segl.pts[d].y) / 2 +
            rect.y -
            this.Frame.y;
        } else {
          knobConfig.y = this.segl.pts[d].y + rect.y - this.Frame.y;
          knobConfig.x =
            (this.segl.pts[d - 1].x + this.segl.pts[d].x) / 2 +
            rect.x -
            this.Frame.x;
        }
        knobConfig.cursorType = this.CalcCursorForSegment(
          this.segl.pts[d],
          this.segl.pts[d - 1],
          true
        );
        knobConfig.knobID =
          OptConstant.ActionTriggerType.SEGL_ONE + d - 2;
        if (this.NoGrow()) {
          knobConfig.cursorType = CursorConstant.CursorType.DEFAULT;
        }
        let midKnob = this.GenericKnob(knobConfig);
        groupShape.AddElement(midKnob);
      }
    }

    groupShape.SetSize(frameWidth, frameHeight);
    groupShape.SetPos(adjustedFrame.x, adjustedFrame.y);
    groupShape.isShape = true;
    groupShape.SetID(OptConstant.Defines.Action + triggerId);

    T3Util.Log("= S.SegmentedLine: CreateActionTriggers output", {
      groupShape,
      adjustedFrame,
      frameWidth,
      frameHeight
    });
    return groupShape;

  }

  ModifyShape(svgDoc, newX, newY, trigger, extra) {
    T3Util.Log("= S.SegmentedLine: ModifyShape input", {
      svgDoc,
      newX,
      newY,
      trigger,
      extra
    });

    // Get the main shape and slop elements
    const shapeElem = svgDoc.GetElementByID(OptConstant.SVGElementClass.SHAPE);
    const slopElem = svgDoc.GetElementByID(OptConstant.SVGElementClass.SLOP);

    // Create a new point from the provided coordinates
    const newPoint = new Point(newX, newY);

    // Format the segmented line with the new point and trigger, then recalc the frame
    this.SegLFormat(newPoint, trigger, 0);
    this.CalcFrame();

    // Get updated polyline points for the shape
    const polyPoints = this.GetPolyPoints(OptConstant.Defines.NPOLYPTS, true, false, null);

    // Calculate frame rectangle based on StartPoint and EndPoint
    const frameRect = Utils2.Pt2Rect(this.StartPoint, this.EndPoint);

    // Adjust the svgDoc position and size based on the new frame
    svgDoc.SetSize(this.Frame.width, this.Frame.height);
    svgDoc.SetPos(frameRect.x, frameRect.y);

    // Update the primary shape element
    shapeElem.SetSize(this.Frame.width, this.Frame.height);
    this.UpdateSVG(shapeElem, polyPoints);

    // Update the slop element for event capture, etc.
    slopElem.SetSize(this.Frame.width, this.Frame.height);
    this.UpdateSVG(slopElem, polyPoints);

    // Update dimension lines and text if applicable
    this.UpdateDimensionLines(svgDoc);
    if (this.DataID !== -1) {
      this.LM_ResizeSVGTextObject(svgDoc, this, this.Frame);
    }

    T3Util.Log("= S.SegmentedLine: ModifyShape output", {
      Frame: this.Frame,
      polyPoints,
      frameRect
    });
  }

  OnConnect(svgElementId, connectObj, hookPoint, connectionCoord, extra) {
    T3Util.Log("= S.SegmentedLine: OnConnect input", {
      svgElementId,
      connectObj,
      hookPoint,
      connectionCoord,
      extra
    });

    let xCoord, yCoord;
    let actionTrigger = 0;
    const svgDoc = T3Gv.opt.svgObjectLayer.GetElementByID(svgElementId);

    switch (hookPoint) {
      case OptConstant.HookPts.SED_KTL:
        // Update first directional face based on connection point at the end of the line
        this.segl.firstdir = connectObj.GetSegLFace(T3Gv.opt.linkParams.ConnectPt, this.EndPoint, connectionCoord);
        actionTrigger = OptConstant.ActionTriggerType.LINEEND;
        xCoord = this.EndPoint.x;
        yCoord = this.EndPoint.y;
        break;
      case OptConstant.HookPts.SED_KTR:
        // Update last directional face based on connection point at the start of the line
        this.segl.lastdir = connectObj.GetSegLFace(T3Gv.opt.linkParams.ConnectPt, this.StartPoint, connectionCoord);
        actionTrigger = OptConstant.ActionTriggerType.LINESTART;
        xCoord = this.StartPoint.x;
        yCoord = this.StartPoint.y;
        break;
      default:
        T3Util.Log("= S.SegmentedLine: OnConnect unknown hookPoint", { hookPoint });
    }

    if (actionTrigger) {
      T3Util.Log("= S.SegmentedLine: OnConnect calling AdjustLine", { svgDoc, xCoord, yCoord, actionTrigger });
      this.AdjustLine(svgDoc, xCoord, yCoord, actionTrigger);
    }

    T3Util.Log("= S.SegmentedLine: OnConnect output");
  }

  OnDisconnect(elementId: string, unusedParam: any, hookType: number, extraParam: any): void {
    T3Util.Log("= S.SegmentedLine: OnDisconnect input", { elementId, unusedParam, hookType, extraParam });

    let xCoord: number = 0;
    let yCoord: number = 0;
    let actionTrigger: number = 0;
    const svgDoc = T3Gv.opt.svgObjectLayer.GetElementByID(elementId);

    // If the current object is active, update directional properties from the global object
    if (T3Gv.opt.ob && T3Gv.opt.ob.BlockID === this.BlockID) {
      this.segl.firstdir = T3Gv.opt.ob.segl.firstdir;
      this.segl.lastdir = T3Gv.opt.ob.segl.lastdir;
    }

    switch (hookType) {
      case OptConstant.HookPts.SED_KTL:
        actionTrigger = OptConstant.ActionTriggerType.LINEEND;
        xCoord = this.EndPoint.x;
        yCoord = this.EndPoint.y;
        this.segl.firstdir = 0;
        if (T3Gv.opt.ob && T3Gv.opt.ob.segl) {
          T3Gv.opt.ob.segl.firstdir = 0;
        }
        break;
      case OptConstant.HookPts.SED_KTR:
        actionTrigger = OptConstant.ActionTriggerType.LINESTART;
        xCoord = this.StartPoint.x;
        yCoord = this.StartPoint.y;
        this.segl.lastdir = 0;
        if (T3Gv.opt.ob && T3Gv.opt.ob.segl) {
          T3Gv.opt.ob.segl.lastdir = 0;
        }
        break;
      default:
        // Optionally handle other hook types if needed.
        break;
    }

    if (actionTrigger) {
      T3Util.Log("= S.SegmentedLine: OnDisconnect - calling AdjustLine", { svgDoc, xCoord, yCoord, actionTrigger });
      this.AdjustLine(svgDoc, xCoord, yCoord, actionTrigger);
    }

    T3Util.Log("= S.SegmentedLine: OnDisconnect output", { updatedStartPoint: this.StartPoint, updatedEndPoint: this.EndPoint, actionTrigger });
  }

  LinkGrow(elementId, hookType, point) {
    T3Util.Log("= S.SegmentedLine: LinkGrow input", {
      elementId,
      hookType,
      point
    });

    switch (hookType) {
      case OptConstant.HookPts.SED_KTL:
        if (
          !(
            Utils2.IsEqual(point.x, this.StartPoint.x) &&
            Utils2.IsEqual(point.y, this.StartPoint.y)
          )
        ) {
          this.SegLFormat(point, OptConstant.ActionTriggerType.LINESTART, 0);
        }
        break;
      case OptConstant.HookPts.SED_KTR:
        if (
          !(
            Utils2.IsEqual(point.x, this.EndPoint.x) &&
            Utils2.IsEqual(point.y, this.EndPoint.y)
          )
        ) {
          this.SegLFormat(point, OptConstant.ActionTriggerType.LINEEND, 0);
        }
        break;
      default:
        // Optionally handle other hook types if needed.
        break;
    }

    this.CalcFrame(true);
    T3Gv.opt.SetLinkFlag(elementId, ShapeConstant.LinkFlags.SED_L_MOVE);
    T3Gv.opt.AddToDirtyList(elementId);

    T3Util.Log("= S.SegmentedLine: LinkGrow output", {
      StartPoint: this.StartPoint,
      EndPoint: this.EndPoint
    });
  }

  HookToPoint(hookId: number, outRect?: { x: number; y: number; width: number; height: number }): Point {
    T3Util.Log("= S.SegmentedLine: HookToPoint input", { hookId, outRect });

    const stData = OptConstant;
    let resultPoint: Point = { x: 0, y: 0 };
    let tempPoint: Point = { x: 0, y: 0 };
    let rectData: any = {};

    switch (hookId) {
      case stData.HookPts.SED_KTL:
        resultPoint.x = this.StartPoint.x;
        resultPoint.y = this.StartPoint.y;
        if (outRect) {
          tempPoint.x = this.StartPoint.x + this.segl.pts[1].x;
          tempPoint.y = this.StartPoint.y + this.segl.pts[1].y;
          rectData = Utils2.Pt2Rect(this.StartPoint, tempPoint);
          outRect.x = rectData.x;
          outRect.y = rectData.y;
          outRect.width = rectData.width;
          outRect.height = rectData.height;
        }
        break;
      case stData.HookPts.SED_KTR:
      default:
        resultPoint.x = this.EndPoint.x;
        resultPoint.y = this.EndPoint.y;
        const ptsLength = this.segl.pts.length;
        if (outRect) {
          tempPoint.x = this.StartPoint.x + this.segl.pts[ptsLength - 2].x;
          tempPoint.y = this.StartPoint.y + this.segl.pts[ptsLength - 2].y;
          rectData = Utils2.Pt2Rect(this.EndPoint, tempPoint);
          outRect.x = rectData.x;
          outRect.y = rectData.y;
          outRect.width = rectData.width;
          outRect.height = rectData.height;
        }
        break;
    }

    T3Util.Log("= S.SegmentedLine: HookToPoint output", { resultPoint, rectData });
    return resultPoint;
  }

  GetTargetPoints(hook, flags, connectedObjectId) {
    T3Util.Log("= S.SegmentedLine: GetTargetPoints input", { hook, flags, connectedObjectId });

    const hookPts = OptConstant.HookPts;
    const sedDim = OptConstant.Defines.SED_CDim;
    let targetPoints = [
      { x: 0, y: 0, id: hookPts.SED_KTL },
      { x: sedDim, y: sedDim, id: hookPts.SED_KTR }
    ];

    // Check if a connected object exists and is a SHAPE
    if (
      connectedObjectId != null &&
      connectedObjectId >= 0 &&
      T3Gv.opt.GetObjectPtr(connectedObjectId, false).DrawingObjectBaseClass === OptConstant.DrawingObjectBaseClass.SHAPE
    ) {
      // Determine a normalized hook id value
      let normalizedId = hook.id;
      if (hook.id >= hookPts.SED_CustomBase) {
        normalizedId = hookPts.SED_CustomBase;
      }
      switch (normalizedId) {
        case hookPts.SED_CustomBase:
        case hookPts.SED_KTC:
        case hookPts.SED_KBC:
        case hookPts.SED_KRC:
        case hookPts.SED_KLC: {
          // Ensure valid frame dimensions
          let frameWidth = this.Frame.width;
          if (frameWidth <= 0) {
            frameWidth = 1;
          }
          let frameHeight = this.Frame.height;
          if (frameHeight <= 0) {
            frameHeight = 1;
          }
          // Calculate target points relative to the Frame
          targetPoints[0].x = ((this.StartPoint.x - this.Frame.x) / frameWidth) * sedDim;
          targetPoints[0].y = ((this.StartPoint.y - this.Frame.y) / frameHeight) * sedDim;
          targetPoints[1].x = ((this.EndPoint.x - this.Frame.x) / frameWidth) * sedDim;
          targetPoints[1].y = ((this.EndPoint.y - this.Frame.y) / frameHeight) * sedDim;

          // Process hooks if available
          if (this.hooks.length === 0) {
            T3Util.Log("= S.SegmentedLine: GetTargetPoints output", targetPoints);
            return targetPoints;
          }
          if (this.hooks.length !== 1) {
            T3Util.Log("= S.SegmentedLine: GetTargetPoints output", []);
            return [];
          }
          if (this.hooks[0].hookpt === hookPts.SED_KTR) {
            targetPoints[1].skip = true;
            T3Util.Log("= S.SegmentedLine: GetTargetPoints output", targetPoints);
            return targetPoints;
          }
          if (this.hooks[0].hookpt === hookPts.SED_KTL) {
            targetPoints[0].skip = true;
            // Mirror target point 1 into target point 0 if necessary
            targetPoints[0].x = targetPoints[1].x;
            targetPoints[0].y = targetPoints[1].y;
            T3Util.Log("= S.SegmentedLine: GetTargetPoints output", targetPoints);
            return targetPoints;
          }
          break;
        }
      }
    }

    // Fallback to base shape poly get targets
    const result = this.BaseShape_PolyGetTargets(hook, flags, this.Frame);
    T3Util.Log("= S.SegmentedLine: GetTargetPoints output", result);
    return result;
  }

  /**
   * Calculates target points on a polyline for connection or interaction purposes
   * This function finds the closest point on the polyline segments to the specified input point,
   * handling grid snapping and coordinate transformations as needed. It's primarily used
   * for determining connection targets when objects are linked together.
   *
   * @param inputPoint - The reference point for target calculation
   * @param hookFlags - Flags that modify the targeting behavior
   * @param boundingRect - The bounding rectangle of the shape
   * @returns Array of normalized target points or null if no suitable target found
   */
  BaseShape_PolyGetTargets(inputPoint, hookFlags, boundingRect) {
    T3Util.Log("= S.SegmentedLine: BaseShape_PolyGetTargets input", { inputPoint, hookFlags, boundingRect });

    // Get the list of target points from the polyline
    const polylinePoints = this.PolyGetTargetPointList(hookFlags);
    if (inputPoint == null) {
      T3Util.Log("= S.SegmentedLine: BaseShape_PolyGetTargets output", { targets: null });
      return null;
    }

    // Initialize variables
    const candidatePoints: Point[] = [{ x: 0, y: 0 }];
    const targetPoints: Point[] = [];
    let closestDistance = OptConstant.Defines.LongIntMax;
    const candidatePoint: { x: number; y: number } = { x: 0, y: 0 };
    const referencePoint: { x: number; y: number } = { x: inputPoint.x, y: inputPoint.y };
    const temporaryPoint: { x: number; y: number } = { x: inputPoint.x, y: inputPoint.y };
    let isGridSnapEnabled: boolean = false;
    let segmentRect: any = {};
    let bestSegmentIndex = -1;

    // Prepare the snapping point if enabled
    let snapPoint = { x: inputPoint.x, y: inputPoint.y };
    if (T3Gv.docUtil.docConfig.enableSnap && (hookFlags & NvConstant.HookFlags.SED_LC_NoSnaps) === 0) {
      snapPoint = T3Gv.docUtil.SnapToGrid(snapPoint);
      // Clamp snap point within the boundingRect
      if (snapPoint.y < boundingRect.y) { snapPoint.y = boundingRect.y; }
      if (snapPoint.y > boundingRect.y + boundingRect.height) { snapPoint.y = boundingRect.y + boundingRect.height; }
      if (snapPoint.x < boundingRect.x) { snapPoint.x = boundingRect.x; }
      if (snapPoint.x > boundingRect.x + boundingRect.width) { snapPoint.x = boundingRect.x + boundingRect.width; }
      isGridSnapEnabled = true;
    }

    // Loop through the polyline segments to find the best target point
    const pointCount = polylinePoints.length;
    for (let segmentIndex = 1; segmentIndex < pointCount; segmentIndex++) {
      // Reset the temporary point to the reference point each iteration
      temporaryPoint.x = inputPoint.x;
      temporaryPoint.y = inputPoint.y;

      // Get two consecutive points that define the current segment
      const segmentStart = polylinePoints[segmentIndex - 1];
      const segmentEnd = polylinePoints[segmentIndex];

      // Skip if the segment has zero length
      if (Utils2.EqualPt(segmentStart, segmentEnd)) {
        continue;
      }

      // Compute segment vector and ensure non-zero components
      const segmentVectorX = segmentEnd.x - segmentStart.x;
      const segmentVectorY = segmentEnd.y - segmentStart.y;
      const safeVectorX = segmentVectorX === 0 ? 1 : segmentVectorX;
      const safeVectorY = segmentVectorY === 0 ? 1 : segmentVectorY;

      // Determine if segment is more vertical or horizontal and calculate projection
      if (Math.abs(safeVectorY / safeVectorX) > 1) {
        // For steep (vertical) segments, adjust x coordinate using y
        if (isGridSnapEnabled) {
          temporaryPoint.y = snapPoint.y;
        }
        const projectedX = safeVectorX / safeVectorY * (temporaryPoint.y - segmentStart.y) + segmentStart.x;
        let distanceToSegment = Math.abs(projectedX - temporaryPoint.x);
        temporaryPoint.x = projectedX;

        // Ensure the projected point lies on the segment
        const minX = Math.min(segmentStart.x, segmentEnd.x);
        const maxX = Math.max(segmentStart.x, segmentEnd.x);
        if (projectedX < minX || projectedX > maxX) {
          distanceToSegment = OptConstant.Defines.LongIntMax;
        } else {
          // Create a slightly inflated rectangle around the segment for tolerance
          segmentRect = Utils2.Pt2Rect(segmentStart, segmentEnd);
          Utils2.InflateRect(segmentRect, 1, 1);
          if (!Utils2.pointInRect(segmentRect, temporaryPoint)) {
            distanceToSegment = OptConstant.Defines.LongIntMax;
          }
        }

        // Update if this is the closest point so far
        if (distanceToSegment < closestDistance) {
          bestSegmentIndex = segmentIndex;
          candidatePoint.x = projectedX;
          candidatePoint.y = temporaryPoint.y;
          closestDistance = distanceToSegment;
        }
      } else {
        // For shallow (horizontal) segments, adjust y coordinate using x
        if (isGridSnapEnabled) {
          temporaryPoint.x = snapPoint.x;
        }
        const projectedY = safeVectorY / safeVectorX * (temporaryPoint.x - segmentStart.x) + segmentStart.y;
        let distanceToSegment = Math.abs(projectedY - temporaryPoint.y);
        temporaryPoint.y = projectedY;

        // Ensure the projected point lies on the segment
        const minY = Math.min(segmentStart.y, segmentEnd.y);
        const maxY = Math.max(segmentStart.y, segmentEnd.y);
        if (projectedY < minY || projectedY > maxY) {
          distanceToSegment = OptConstant.Defines.LongIntMax;
        } else {
          segmentRect = Utils2.Pt2Rect(segmentStart, segmentEnd);
          Utils2.InflateRect(segmentRect, 1, 1);
          if (!Utils2.pointInRect(segmentRect, temporaryPoint)) {
            distanceToSegment = OptConstant.Defines.LongIntMax;
          }
        }

        // Update if this is the closest point so far
        if (distanceToSegment < closestDistance) {
          bestSegmentIndex = segmentIndex;
          candidatePoint.x = temporaryPoint.x;
          candidatePoint.y = projectedY;
          closestDistance = distanceToSegment;
        }
      }
    }

    // If a candidate segment was found, prepare the final target point
    if (bestSegmentIndex >= 0) {
      candidatePoints[0].x = candidatePoint.x;
      candidatePoints[0].y = candidatePoint.y;

      // Use the provided boundingRect as the reference for normalized coordinates
      const referenceRect = boundingRect;

      // If the object is rotated, rotate the candidate point about the center of the bounding rectangle
      if (this.RotationAngle !== 0) {
        const angleInRadians = this.RotationAngle / (180 / NvConstant.Geometry.PI);
        Utils3.RotatePointsAboutCenter(referenceRect, angleInRadians, candidatePoints);
      }

      // Calculate normalized coordinates relative to the bounding rectangle
      const rectWidth = referenceRect.width;
      const rectHeight = referenceRect.height;
      const normalizedX = rectWidth === 0 ? 0 : (candidatePoints[0].x - referenceRect.x) / rectWidth;
      const normalizedY = rectHeight === 0 ? 0 : (candidatePoints[0].y - referenceRect.y) / rectHeight;

      // Scale the normalized coordinates to the standard coordinate system
      targetPoints.push(new Point(
        normalizedX * OptConstant.Defines.SED_CDim,
        normalizedY * OptConstant.Defines.SED_CDim
      ));

      T3Util.Log("= S.SegmentedLine: BaseShape_PolyGetTargets output", { targets: targetPoints });
      return targetPoints;
    }

    T3Util.Log("= S.SegmentedLine: BaseShape_PolyGetTargets output", { targets: null });
    return null;
  }


  GetPerimPts(input: any, hooks: any, hookType: any, paramR: any, paramI: any, connectedObjectId: number) {
    T3Util.Log("= S.SegmentedLine: GetPerimPts input", { input, hooks, hookType, paramR, paramI, connectedObjectId });

    let frame = this.Frame;
    let resultPoints: Point[] = [];
    let index = 0;
    let numHooks = 0;

    // Quick reference to NvConstant.ObjectTypes (unused, but kept as in original)
    NvConstant.ObjectTypes;

    if (hooks) {
      // Special case: exactly 2 hooks with SED_KTL and SED_KTR
      numHooks = hooks.length;
      if (
        numHooks === 2 &&
        hooks[0].id && hooks[0].id === OptConstant.HookPts.SED_KTL &&
        hooks[1].id && hooks[1].id === OptConstant.HookPts.SED_KTR
      ) {
        if (hooks[0].skip == null) {
          resultPoints.push(new Point(this.StartPoint.x, this.StartPoint.y));
          resultPoints[0].id = hooks[0].id;
          index = 1;
        }
        if (hooks[1].skip == null) {
          resultPoints.push(new Point(this.EndPoint.x, this.EndPoint.y));
          resultPoints[index].id = hooks[1].id;
        }
        T3Util.Log("= S.SegmentedLine: GetPerimPts output", resultPoints);
        return resultPoints;
      }

      // Handle connected object cases if provided
      if (connectedObjectId >= 0) {
        const connectedObj = T3Gv.opt.GetObjectPtr(connectedObjectId, false);
        if (connectedObj) {
          // Case for multiplicity object
          if (connectedObj.objecttype === NvConstant.ObjectTypes.SD_OBJT_MULTIPLICITY && numHooks === 1) {
            let offsetX = 5, offsetY = 5;
            offsetX += connectedObj.Frame.width / 2;

            if (hooks[0].x === 0) {
              const ptStart = this.segl.pts[0];
              const ptNext = this.segl.pts[1];
              if (ptStart.x === ptNext.x) {
                if (connectedObj.subtype === NvConstant.ObjectSubTypes.SD_SUBT_MULTIPLICITY_FLIPPED) {
                  offsetX = -offsetX;
                }
                offsetY = ptStart.y > ptNext.y ? -offsetY : offsetY + connectedObj.Frame.height;
                resultPoints.push(new Point(this.StartPoint.x + offsetX, this.StartPoint.y + offsetY));
                resultPoints[0].id = hooks[0].id;
              } else {
                if (connectedObj.subtype === NvConstant.ObjectSubTypes.SD_SUBT_MULTIPLICITY_FLIPPED) {
                  offsetY = -connectedObj.Frame.height - 5;
                }
                offsetY = -offsetY;
                if (ptStart.x > ptNext.x) {
                  offsetX = -offsetX;
                }
                resultPoints.push(new Point(this.StartPoint.x + offsetX, this.StartPoint.y + offsetY));
                resultPoints[0].id = hooks[0].id;
              }
            } else {
              const ptsLength = this.segl.pts.length;
              const ptPrev = this.segl.pts[ptsLength - 2];
              const ptLast = this.segl.pts[ptsLength - 1];
              if (ptPrev.x === ptLast.x) {
                if (connectedObj.subtype === NvConstant.ObjectSubTypes.SD_SUBT_MULTIPLICITY_FLIPPED) {
                  offsetX = -offsetX;
                }
                offsetY = ptPrev.y < ptLast.y ? -offsetY : offsetY + connectedObj.Frame.height;
                if (hookType === OptConstant.HookPts.SED_KCBR) {
                  offsetX = -offsetX;
                }
                resultPoints.push(new Point(this.EndPoint.x + offsetX, this.EndPoint.y + offsetY));
                resultPoints[0].id = hooks[0].id;
              } else {
                if (connectedObj.subtype === NvConstant.ObjectSubTypes.SD_SUBT_MULTIPLICITY_FLIPPED) {
                  offsetY = -connectedObj.Frame.height - 5;
                }
                offsetY = -offsetY;
                if (ptPrev.x < ptLast.x) {
                  offsetX = -offsetX;
                }
                resultPoints.push(new Point(this.EndPoint.x + offsetX, this.EndPoint.y + offsetY));
                resultPoints[0].id = hooks[0].id;
              }
            }
            T3Util.Log("= S.SegmentedLine: GetPerimPts output", resultPoints);
            return resultPoints;
          }
          // Case for extra text label object
          if (connectedObj.objecttype === NvConstant.ObjectTypes.SD_OBJT_EXTRATEXTLABEL && numHooks === 1) {
            const extraLabelPoints = super.GetPerimPts(input, hooks, hookType, paramR, paramI, connectedObjectId);
            T3Util.Log("= S.SegmentedLine: GetPerimPts output", extraLabelPoints);
            return extraLabelPoints;
          }
        }
      }
    }

    // Default processing: map hook coordinates relative to the frame
    numHooks = hooks ? hooks.length : 0;
    resultPoints = new Array(numHooks);
    for (let C = 0; C < numHooks; C++) {
      resultPoints[C] = { x: 0, y: 0, id: 0 };
      const frameWidth = frame.width;
      const frameHeight = frame.height;
      resultPoints[C].x = (hooks[C].x / OptConstant.Defines.SED_CDim) * frameWidth + frame.x;
      resultPoints[C].y = (hooks[C].y / OptConstant.Defines.SED_CDim) * frameHeight + frame.y;
      if (hooks[C].id != null) {
        resultPoints[C].id = hooks[C].id;
      }
    }
    T3Util.Log("= S.SegmentedLine: GetPerimPts output", resultPoints);
    return resultPoints;
  }

  ScaleObject(
    scaleX: number,
    scaleY: number,
    deltaX: number,
    deltaY: number,
    pivotX: number,
    pivotY: number,
    preserveAspectRatio: boolean
  ): void {
    T3Util.Log("= S.SegmentedLine: ScaleObject input", {
      scaleX,
      scaleY,
      deltaX,
      deltaY,
      pivotX,
      pivotY,
      preserveAspectRatio,
    });

    // Call the base class scale function
    super.ScaleObject(scaleX, scaleY, deltaX, deltaY, pivotX, pivotY, preserveAspectRatio);

    // Recalculate the segmented line with preserved format and update frame values
    this.SegLFormat(
      this.EndPoint,
      OptConstant.ActionTriggerType.SEGL_PRESERVE,
      0
    );
    this.CalcFrame();

    T3Util.Log("= S.SegmentedLine: ScaleObject output", {
      EndPoint: this.EndPoint,
      Frame: this.Frame,
    });
  }

  /**
   * Determines the connection direction/face when connecting to a segmented line
   * This function analyzes which face (top, bottom, left, right) of the segmented
   * line should be used as a connection point based on the intersection of a test point
   * with one of the line's segments.
   *
   * @param hookPoint - The hook point identifier
   * @param referencePoint - The reference point for direction determination
   * @param testPoint - The test point to check for intersection with the line segments
   * @returns The appropriate hook direction (SED_KTC, SED_KBC, SED_KLC, or SED_KRC) or 0 if no intersection
   */
  GetSegLFace(hookPoint, referencePoint, testPoint) {
    T3Util.Log("= S.SegmentedLine: GetSegLFace input", { hookPoint, referencePoint, testPoint });

    // Get the polyline points with curves skipped (third parameter true)
    const polylinePoints = this.GetPolyPoints(OptConstant.Defines.NPOLYPTS, false, true, null);
    let hookDirection = 0;
    let segmentRect = null;

    // Prepare the point for hit testing
    const pointToTest = { x: testPoint.x, y: testPoint.y };
    const hitInformation = {};

    // Check if the test point intersects with any line segment
    if (Utils3.LineDStyleHit(polylinePoints, pointToTest, this.StyleRecord.Line.Thickness, 0, hitInformation) &&
      hitInformation.lpHit >= 0) {

      // Get the rectangle defining the segment that was hit
      segmentRect = Utils2.Pt2Rect(polylinePoints[hitInformation.lpHit], polylinePoints[hitInformation.lpHit + 1]);

      // Determine hook direction based on segment orientation and relative positions
      if (segmentRect.width >= segmentRect.height) {
        // For horizontal segments, use top or bottom connection
        hookDirection = (referencePoint.y >= testPoint.y) ?
          OptConstant.HookPts.SED_KBC :  // Bottom connection
          OptConstant.HookPts.SED_KTC;   // Top connection
      } else {
        // For vertical segments, use left or right connection
        hookDirection = (referencePoint.x >= testPoint.x) ?
          OptConstant.HookPts.SED_KRC :  // Right connection
          OptConstant.HookPts.SED_KLC;   // Left connection
      }
    }

    T3Util.Log("= S.SegmentedLine: GetSegLFace output", { hookDirection });
    return hookDirection;
  }

  GetSpacing() {
    T3Util.Log("= S.SegmentedLine: GetSpacing input", {
      hooks: this.hooks,
      segl: this.segl,
      StartPoint: this.StartPoint,
      EndPoint: this.EndPoint
    });

    const hookPoints = OptConstant.HookPts;
    let spacing = { width: null, height: null };

    let hookObj1, hookObj2;
    if (this.hooks.length === 2) {
      hookObj1 = T3Gv.opt.GetObjectPtr(this.hooks[0].objid, false);
      hookObj2 = T3Gv.opt.GetObjectPtr(this.hooks[1].objid, false);
    }

    switch (this.segl.firstdir) {
      case hookPoints.SED_KTC:
        if (this.segl.lastdir === hookPoints.SED_KBC) {
          spacing.height = Math.abs(this.StartPoint.y - this.EndPoint.y);
          if (hookObj1 && hookObj2) {
            if (hookObj1.Frame.y < hookObj2.Frame.y) {
              spacing.height = hookObj2.Frame.y - (hookObj1.Frame.y + hookObj1.Frame.height);
            } else {
              spacing.height = hookObj1.Frame.y - (hookObj2.Frame.y + hookObj2.Frame.height);
            }
          }
        }
        break;
      case hookPoints.SED_KBC:
        if (this.segl.lastdir === hookPoints.SED_KTC) {
          spacing.height = Math.abs(this.StartPoint.y - this.EndPoint.y);
          if (hookObj1 && hookObj2) {
            if (hookObj1.Frame.y < hookObj2.Frame.y) {
              spacing.height = hookObj2.Frame.y - (hookObj1.Frame.y + hookObj1.Frame.height);
            } else {
              spacing.height = hookObj1.Frame.y - (hookObj2.Frame.y + hookObj2.Frame.height);
            }
          }
        }
        break;
      case hookPoints.SED_KLC:
        if (this.segl.lastdir === hookPoints.SED_KRC) {
          spacing.width = Math.abs(this.StartPoint.x - this.EndPoint.x);
          if (hookObj1 && hookObj2) {
            if (hookObj1.Frame.x < hookObj2.Frame.x) {
              spacing.width = hookObj2.Frame.x - (hookObj1.Frame.x + hookObj1.Frame.width);
            } else {
              spacing.width = hookObj1.Frame.x - (hookObj2.Frame.x + hookObj2.Frame.width);
            }
          }
        }
        break;
      case hookPoints.SED_KRC:
        if (this.segl.lastdir === hookPoints.SED_KLC) {
          spacing.width = Math.abs(this.StartPoint.x - this.EndPoint.x);
          if (hookObj1 && hookObj2) {
            if (hookObj1.Frame.x < hookObj2.Frame.x) {
              spacing.width = hookObj2.Frame.x - (hookObj1.Frame.x + hookObj1.Frame.width);
            } else {
              spacing.width = hookObj1.Frame.x - (hookObj2.Frame.x + hookObj2.Frame.width);
            }
          }
        }
        break;
    }

    T3Util.Log("= S.SegmentedLine: GetSpacing output", spacing);
    return spacing;
  }

  GetShapeConnectPoint(inputHook: number) {
    T3Util.Log("= S.SegmentedLine: GetShapeConnectPoint input", { inputHook });

    let pt1: Point, pt2: Point;
    let resultLeft: { x?: number; y?: number } = {};
    let resultRight: { x?: number; y?: number } = {};
    let lastDirection = this.segl.lastdir;
    let firstDirection = this.segl.firstdir;
    const shapeDim = OptConstant.Defines.SED_CDim;
    const ptsLength = this.segl.pts.length;

    // Choose endpoints based on the hook parameter:
    if (inputHook === OptConstant.HookPts.SED_KTL) {
      pt1 = this.segl.pts[0];
      pt2 = this.segl.pts[1];
    } else {
      pt1 = this.segl.pts[ptsLength - 2];
      pt2 = this.segl.pts[ptsLength - 1];
    }

    // Determine connection point based on the orientation of the segment:
    if (pt1.x === pt2.x) {
      // Vertical segment:
      resultLeft.x = shapeDim / 2;
      resultRight.x = shapeDim / 2;
      if (pt2.y > pt1.y) {
        resultLeft.y = 0;
        resultRight.y = shapeDim;
        lastDirection = OptConstant.HookPts.SED_KTC;
        firstDirection = OptConstant.HookPts.SED_KBC;
      } else {
        resultLeft.y = shapeDim;
        resultRight.y = 0;
        lastDirection = OptConstant.HookPts.SED_KBC;
        firstDirection = OptConstant.HookPts.SED_KTC;
      }
    } else {
      // Horizontal segment:
      resultLeft.y = shapeDim / 2;
      resultRight.y = shapeDim / 2;
      if (pt2.x > pt1.x) {
        resultLeft.x = 0;
        resultRight.x = shapeDim;
        lastDirection = OptConstant.HookPts.SED_KLC;
        firstDirection = OptConstant.HookPts.SED_KRC;
      } else {
        resultLeft.x = shapeDim;
        resultRight.x = 0;
        lastDirection = OptConstant.HookPts.SED_KRC;
        firstDirection = OptConstant.HookPts.SED_KLC;
      }
    }

    // Set output and update directional properties:
    let outputPoint: { x?: number; y?: number };
    if (inputHook === OptConstant.HookPts.SED_KTL) {
      this.segl.firstdir = firstDirection;
      outputPoint = resultRight;
    } else {
      this.segl.lastdir = lastDirection;
      outputPoint = resultLeft;
    }

    T3Util.Log("= S.SegmentedLine: GetShapeConnectPoint output", outputPoint);
    return outputPoint;
  }

  ConnectToHook(connectedObjectId: number, hookType: number): number {
    T3Util.Log("= S.SegmentedLine: ConnectToHook input", { connectedObjectId, hookType });

    let resultHook = hookType;
    if (ShapeUtil.LineIsReversed(this, null, false)) {
      if (resultHook === OptConstant.HookPts.SED_KTL) {
        resultHook = OptConstant.HookPts.SED_KTR;
      } else if (resultHook === OptConstant.HookPts.SED_KTR) {
        resultHook = OptConstant.HookPts.SED_KTL;
      }
    }

    T3Util.Log("= S.SegmentedLine: ConnectToHook output", { result: resultHook });
    return resultHook;
  }

  GetBestHook(objectId: number, inputHook: number, pt: Point): number {
    T3Util.Log("= S.SegmentedLine: GetBestHook input", { objectId, inputHook, pt });

    // Define constants and extract hook points from constant data.
    const sedCDim: number = OptConstant.Defines.SED_CDim;
    // Call Pt2Rect for side-effect (if needed) and get hook points.
    Utils2.Pt2Rect(this.StartPoint, this.EndPoint);
    const hookPts = OptConstant.HookPts;

    const totalPts: number = this.segl.pts.length;
    // Start with pt.x as baseline
    let compareValue = pt.x;
    // If there are exactly 2 points and they form a vertical line, use pt.y instead.
    if (totalPts === 2 && this.segl.pts[0].x === this.segl.pts[1].x) {
      compareValue = pt.y;
    }

    // Determine the two candidate points (r and i) from the segmentation points.
    let firstPt: Point, secondPt: Point;
    if (ShapeUtil.LineIsReversed(this, null, false)) {
      if (compareValue === 0) {
        // Use the last two points.
        firstPt = this.segl.pts[totalPts - 2];
        secondPt = this.segl.pts[totalPts - 1];
      } else {
        // Use the first two points.
        secondPt = this.segl.pts[0];
        firstPt = this.segl.pts[1];
      }
    } else {
      if (compareValue === sedCDim) {
        // Use the last two points.
        firstPt = this.segl.pts[totalPts - 2];
        secondPt = this.segl.pts[totalPts - 1];
      } else {
        // Use the first two points.
        secondPt = this.segl.pts[0];
        firstPt = this.segl.pts[1];
      }
    }

    // Retrieve the object pointer for the given objectId.
    const shapeObj = T3Gv.opt.GetObjectPtr(objectId, false);
    let bestHook = inputHook;
    if (shapeObj && shapeObj.DrawingObjectBaseClass === OptConstant.DrawingObjectBaseClass.SHAPE) {
      switch (inputHook) {
        case hookPts.SED_KTC:
        case hookPts.SED_KBC:
        case hookPts.SED_KRC:
        case hookPts.SED_KLC:
          // For vertical segments: choose SED_KBC if firstPt is above secondPt, else SED_KTC.
          // For horizontal segments: choose SED_KRC if firstPt is to the left of secondPt, else SED_KLC.
          if (firstPt.x === secondPt.x) {
            bestHook = firstPt.y < secondPt.y ? hookPts.SED_KBC : hookPts.SED_KTC;
          } else {
            bestHook = firstPt.x < secondPt.x ? hookPts.SED_KRC : hookPts.SED_KLC;
          }
          break;
        default:
          bestHook = inputHook;
      }
    }

    T3Util.Log("= S.SegmentedLine: GetBestHook output", { bestHook });
    return bestHook;
  }

  MaintainPoint(
    point: Point,
    targetId: number,
    paramA: any,
    currentObj: any,
    paramI: any
  ): boolean {
    T3Util.Log("= S.SegmentedLine: MaintainPoint input", { point, targetId, paramA, currentObj, paramI });

    let result = true;
    let obj = currentObj; // alias for input object
    let hookRect: any = {};
    let polyRect: any = {};
    let tempCopy: any = {};

    switch (obj.DrawingObjectBaseClass) {
      case OptConstant.DrawingObjectBaseClass.LINE:
        switch (obj.LineType) {
          case OptConstant.LineType.SEGLINE:
          case OptConstant.LineType.ARCSEGLINE:
          case OptConstant.LineType.POLYLINE:
            // Look for a hook with matching targetId
            let hookFound = false;
            for (let idx = 0; idx < obj.hooks.length; idx++) {
              if (obj.hooks[idx].targetid === targetId) {
                obj.HookToPoint(obj.hooks[idx].hookpt, hookRect);
                hookFound = true;
                break;
              }
            }
            if (!hookFound) {
              T3Util.Log("= S.SegmentedLine: MaintainPoint - no matching hook found, returning true");
              T3Util.Log("= S.SegmentedLine: MaintainPoint output", true);
              return true;
            }
            // Create a deep copy and update its Frame and endpoints based on hookRect
            tempCopy = Utils1.DeepCopy(obj);
            Utils2.CopyRect(tempCopy.Frame, hookRect);
            tempCopy.StartPoint.x = hookRect.x;
            tempCopy.StartPoint.y = hookRect.y;
            tempCopy.EndPoint.x = hookRect.x + hookRect.width;
            tempCopy.EndPoint.y = hookRect.y + hookRect.height;
            obj = tempCopy;
            break;
        }
        break;
      case OptConstant.DrawingObjectBaseClass.SHAPE:
        T3Gv.opt.Lines_MaintainDist(this, paramA, paramI, point);
        T3Util.Log("= S.SegmentedLine: MaintainPoint processed for SHAPE, returning true");
        T3Util.Log("= S.SegmentedLine: MaintainPoint output", true);
        return true;
    }

    // Get the polyline points without translation and with curves skipped
    const polyPoints = this.GetPolyPoints(OptConstant.Defines.NPOLYPTS, false, true, null);
    const totalPoints = polyPoints.length;

    for (let idx = 1; idx < totalPoints; idx++) {
      // Get rectangle defined by the current segment points
      polyRect = Utils2.Pt2Rect(polyPoints[idx], polyPoints[idx - 1]);

      // Create a deep copy of this segmented line and update its frame using the segment rectangle
      tempCopy = Utils1.DeepCopy(this);
      Utils2.CopyRect(tempCopy.Frame, polyRect);
      tempCopy.StartPoint.x = polyRect.x;
      tempCopy.StartPoint.y = polyRect.y;
      tempCopy.EndPoint.x = polyRect.x + polyRect.width;
      tempCopy.EndPoint.y = polyRect.y + polyRect.height;

      // Check if the point lies on this segment
      if (T3Gv.opt.LineCheckPoint(tempCopy, point)) {
        T3Util.Log("= S.SegmentedLine: MaintainPoint - LineCheckPoint returned true", { segment: idx, polyRect });
        T3Util.Log("= S.SegmentedLine: MaintainPoint output", true);
        return true;
      }
      // Check for intersection with the current object
      if (T3Gv.opt.Lines_Intersect(tempCopy, obj, point)) {
        T3Util.Log("= S.SegmentedLine: MaintainPoint - Lines_Intersect returned true", { segment: idx, polyRect });
        T3Util.Log("= S.SegmentedLine: MaintainPoint output", true);
        return true;
      }
    }

    T3Gv.opt.Lines_MaintainDist(this, paramA, paramI, point);
    T3Util.Log("= S.SegmentedLine: MaintainPoint output", result);
    return result;
  }

  WriteShapeData(outputStream, options) {
    T3Util.Log("= S.SegmentedLine: WriteShapeData input", { outputStream, options });

    const numPoints = this.segl.pts.length;
    T3Util.Log("= S.SegmentedLine: Number of segmentation points", { numPoints });

    const instanceId = options.WriteBlocks ? this.BlockID : options.nsegl++;
    T3Util.Log("= S.SegmentedLine: Instance ID", { instanceId });

    const reversed = ShapeUtil.LineIsReversed(this, options, false);
    T3Util.Log("= S.SegmentedLine: Is line reversed?", { reversed });

    let copiedSeg = Utils1.DeepCopy(this.segl);
    let lastSegIndex = numPoints - 1;
    if (lastSegIndex < 0) lastSegIndex = 0;

    // If the line is reversed, reverse the segmentation points and swap the direction flags.
    if (reversed) {
      T3Util.Log("= S.SegmentedLine: Reversing segmentation points and swapping direction flags");
      for (let i = 0; i < numPoints; i++) {
        copiedSeg.pts[numPoints - 1 - i].x = this.segl.pts[i].x;
        copiedSeg.pts[numPoints - 1 - i].y = this.segl.pts[i].y;
      }
      const tempDir = copiedSeg.firstdir;
      copiedSeg.firstdir = copiedSeg.lastdir;
      copiedSeg.lastdir = tempDir;
      T3Util.Log("= S.SegmentedLine: Reversed direction flags", {
        firstdir: copiedSeg.firstdir,
        lastdir: copiedSeg.lastdir,
      });

      for (let i = 0; i < numPoints - 1; i++) {
        if (Utils2.IsEqual(copiedSeg.pts[i + 1].x, copiedSeg.pts[i].x)) {
          copiedSeg.lengths[i] = Math.abs(copiedSeg.pts[i + 1].y - copiedSeg.pts[i].y);
        } else {
          copiedSeg.lengths[i] = Math.abs(copiedSeg.pts[i + 1].x - copiedSeg.pts[i].x);
        }
      }
      if (numPoints === 6) {
        copiedSeg.lengths[2] = copiedSeg.lengths[4];
      }
    }

    let sdfData;
    if (options.WriteWin32) {
      sdfData = {
        InstId: instanceId,
        firstdir: copiedSeg.firstdir,
        lastdir: copiedSeg.lastdir,
        nsegs: lastSegIndex,
        segr: [],
        lengths: [0, 0, 0, 0, 0],
        lsegr: [],
        llengths: [0, 0, 0, 0, 0],
      };
    } else {
      sdfData = {
        InstId: instanceId,
        firstdir: copiedSeg.firstdir,
        lastdir: copiedSeg.lastdir,
        curveparam: copiedSeg.curveparam,
        nsegs: lastSegIndex,
        lsegr: [],
        llengths: [0, 0, 0, 0, 0],
      };
    }
    T3Util.Log("= S.SegmentedLine: Initialized sdfData", sdfData);

    // Determine the minimum X and Y coordinates from all segmentation points.
    let minX, minY;
    for (let i = 0; i < numPoints; i++) {
      if (i === 0 || copiedSeg.pts[i].x < minX) {
        minX = copiedSeg.pts[i].x;
      }
      if (i === 0 || copiedSeg.pts[i].y < minY) {
        minY = copiedSeg.pts[i].y;
      }
    }
    T3Util.Log("= S.SegmentedLine: Computed minX and minY", { minX, minY });

    // Convert each segment's length to SD window coordinates.
    const lengthsCount = copiedSeg.lengths.length;
    for (let i = 0; i < lengthsCount; i++) {
      sdfData.llengths[i] = ShapeUtil.ToSDWinCoords(copiedSeg.lengths[i], options.coordScaleFactor);
    }
    T3Util.Log("= S.SegmentedLine: Converted segment lengths", { llengths: sdfData.llengths });

    // Create rectangle info for each segment between adjacent points.
    for (let i = 0; i < numPoints - 1; i++) {
      let segmentRect = {
        left: ShapeUtil.ToSDWinCoords(copiedSeg.pts[i].x - minX, options.coordScaleFactor),
        top: ShapeUtil.ToSDWinCoords(copiedSeg.pts[i].y - minY, options.coordScaleFactor),
        right: ShapeUtil.ToSDWinCoords(copiedSeg.pts[i + 1].x - minX, options.coordScaleFactor),
        bottom: ShapeUtil.ToSDWinCoords(copiedSeg.pts[i + 1].y - minY, options.coordScaleFactor),
      };

      // Ensure the rectangle is properly ordered.
      if (numPoints > 2) {
        if (segmentRect.left > segmentRect.right) {
          let temp = segmentRect.left;
          segmentRect.left = segmentRect.right;
          segmentRect.right = temp;
        }
        if (segmentRect.top > segmentRect.bottom) {
          let temp = segmentRect.top;
          segmentRect.top = segmentRect.bottom;
          segmentRect.bottom = temp;
        }
      }
      sdfData.lsegr.push(segmentRect);

      if (options.WriteWin32) {
        sdfData.segr.push({ left: 0, top: 0, right: 0, bottom: 0 });
      }
    }
    T3Util.Log("= S.SegmentedLine: Created segmentation rectangles", { lsegr: sdfData.lsegr });

    // If there are fewer than 5 segments, pad the remaining segment info with zeros.
    for (let i = numPoints - 1; i < 5; i++) {
      sdfData.lsegr.push({ left: 0, top: 0, right: 0, bottom: 0 });
      if (options.WriteWin32) {
        sdfData.segr.push({ left: 0, top: 0, right: 0, bottom: 0 });
      }
    }
    T3Util.Log("= S.SegmentedLine: Padded segmentation rectangles", { lsegr: sdfData.lsegr });

    const code = ShapeUtil.WriteCode(outputStream, ShapeConstant.OpNameCode.cDrawSegl);
    if (options.WriteWin32) {
      outputStream.writeStruct(ShapeConstant.SegLineStruct, sdfData);
    } else {
      outputStream.writeStruct(ShapeConstant.SegLineStruct210, sdfData);
    }
    ShapeUtil.WriteLength(outputStream, code);

    // Call the base class implementation.
    super.WriteShapeData(outputStream, options);

    T3Util.Log("= S.SegmentedLine: WriteShapeData output", { sdfData, code });
  }

}

export default SegmentedLine

