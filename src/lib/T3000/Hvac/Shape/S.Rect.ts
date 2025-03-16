

import BaseShape from './S.BaseShape'
import Utils2 from "../Util/Utils2";
import T3Gv from '../Data/T3Gv'
import $ from 'jquery';
import Point from '../Model/Point'
import Instance from '../Data/Instance/Instance';
import NvConstant from '../Data/Constant/NvConstant'
import PolygonConstant from '../Opt/Polygon/PolygonConstant';
import OptConstant from '../Data/Constant/OptConstant';
import T3Util from '../Util/T3Util';

class Rect extends BaseShape {

  /**
   * Constructor for the Rect shape class
   * @param options - Configuration options for the rectangle
   */
  constructor(options: any) {
    T3Util.Log("= S.Rect Input:", options);
    options = options || {};
    options.ShapeType = OptConstant.ShapeType.RECT;
    options.moreflags |= OptConstant.ObjMoreFlags.SED_MF_FixedRR;

    super(options);

    this.dataclass = options.dataclass || PolygonConstant.ShapeTypes.RECTANGLE;
    this.nativeDataArrayBuffer = options.nativeDataArrayBuffer || null;
    this.SymbolData = options.SymbolData || null;

    T3Util.Log("= S.Rect Created instance:", this);
  }

  /**
   * Creates an SVG shape representation of the rectangle
   * @param renderer - The rendering engine to create SVG elements
   * @param enableEvents - Whether to enable event handling on the shape
   * @returns The created SVG shape container or null if shape is not visible
   */
  CreateShape(renderer, enableEvents) {
    // Don't render if the shape is marked as not visible
    if (this.flags & NvConstant.ObjFlags.SEDO_NotVisible) return null;

    // Create the main shape container
    const shapeContainer = renderer.CreateShape(OptConstant.CSType.SHAPECONTAINER);

    // Clone the frame and apply necessary adjustments
    const adjustedFrame = $.extend(true, {}, this.Frame);
    const styleRecord = this.StyleRecord;

    // Inflate the rectangle if border thickness is set
    if (styleRecord.Line.BThick && this.polylist === null) {
      Utils2.InflateRect(adjustedFrame, styleRecord.Line.BThick, styleRecord.Line.BThick);
    }

    // Process style attributes through any hooks
    const processedStyle = this.SVGTokenizerHook(styleRecord);

    // Extract styling properties
    const strokeColor = processedStyle.Line.Paint.Color;
    const strokeWidth = processedStyle.Line.Thickness;
    const strokePattern = processedStyle.Line.LinePattern;
    const opacity = processedStyle.Line.Paint.Opacity;
    const width = adjustedFrame.width;
    const height = adjustedFrame.height;

    // Set container dimensions and position
    shapeContainer.SetSize(width, height);
    shapeContainer.SetPos(adjustedFrame.x, adjustedFrame.y);

    // Get corner radius for rounded rectangle
    const cornerRadius = this.RRect_GetCornerSize();
    let mainShape;

    // Handle symbol URL case (using image)
    if (this.SymbolURL) {
      const imageRect = renderer.CreateShape(OptConstant.CSType.RECT);
      imageRect.SetID(OptConstant.SVGElementClass.SHAPE);
      imageRect.SetSize(width, height);
      imageRect.SetImageFill(this.SymbolURL, { scaleType: 'NOPROP' });

      // Apply flip transformations if needed
      const isFlipHorizontal = (this.extraflags & OptConstant.ExtraFlags.SEDE_FlipHoriz) > 0;
      const isFlipVertical = (this.extraflags & OptConstant.ExtraFlags.SEDE_FlipVert) > 0;

      if (isFlipHorizontal) {
        imageRect.SetMirror(isFlipHorizontal);
      }
      if (isFlipVertical) {
        imageRect.SetFlip(isFlipVertical);
      }

      shapeContainer.AddElement(imageRect);
      this.GetFieldDataStyleOverride();
    }
    // Otherwise create a regular rectangle or rounded rectangle
    else {
      if (cornerRadius > 0) {
        mainShape = renderer.CreateShape(OptConstant.CSType.RRECT);
        mainShape.SetRRectSize(width, height, cornerRadius, cornerRadius);
      } else {
        mainShape = renderer.CreateShape(OptConstant.CSType.RECT);
      }

      // Apply stroke styling
      mainShape.SetStrokeColor(strokeColor);
      mainShape.SetStrokeOpacity(opacity);
      mainShape.SetStrokeWidth(strokeWidth);

      if (strokePattern !== 0) {
        mainShape.SetStrokePattern(strokePattern);
      }

      mainShape.SetID(OptConstant.SVGElementClass.SHAPE);
      mainShape.SetSize(width, height);
      shapeContainer.AddElement(mainShape);
    }

    // Apply additional styles and effects
    this.ApplyStyles(mainShape, processedStyle);
    this.ApplyEffects(shapeContainer, false, false);

    // Create interactive slop area for better user interaction
    if (!(this instanceof Instance.Shape.ShapeContainer)) {
      let slopSize = OptConstant.Defines.SED_Slop;
      const slopHeight = height;
      const slopWidth = width;

      // Increase slop size for certain shape types
      if ((this.objecttype === NvConstant.ObjectTypes.SD_OBJT_TABLE_WITH_SHAPECONTAINER)) {
        slopSize *= 3;
      }

      let slopShape;
      if (cornerRadius > 0) {
        slopShape = renderer.CreateShape(OptConstant.CSType.RRECT);
        slopShape.SetRRectSize(slopWidth, slopHeight, cornerRadius, cornerRadius);
      } else {
        slopShape = renderer.CreateShape(OptConstant.CSType.RECT);
      }

      // Configure slop area (invisible interactive area)
      slopShape.SetStrokeColor('white');
      slopShape.SetFillColor('none');
      slopShape.SetOpacity(0);
      slopShape.SetStrokeWidth(strokeWidth + slopSize);

      // Set event behavior based on conditions
      if (enableEvents) {
        const isTransparentFillWithData = this.SymbolURL ||
          (processedStyle.Fill.Paint.FillType === NvConstant.FillTypes.Transparent && this.DataID >= 0);

        slopShape.SetEventBehavior(isTransparentFillWithData ?
          OptConstant.EventBehavior.HIDDEN_ALL :
          OptConstant.EventBehavior.HIDDEN_OUT);
      } else {
        slopShape.SetEventBehavior(OptConstant.EventBehavior.NONE);
      }

      slopShape.SetID(OptConstant.SVGElementClass.SLOP);
      slopShape.ExcludeFromExport(true);
      slopShape.SetSize(slopWidth || 1, slopHeight);
      shapeContainer.AddElement(slopShape);
    }

    // Create hatch fill pattern if needed
    const hatchPattern = processedStyle.Fill.Hatch;
    if (hatchPattern && hatchPattern !== 0) {
      let hatchShape;
      if (cornerRadius > 0) {
        hatchShape = renderer.CreateShape(OptConstant.CSType.RRECT);
        hatchShape.SetRRectSize(width, height, cornerRadius, cornerRadius);
      } else {
        hatchShape = renderer.CreateShape(OptConstant.CSType.RECT);
      }

      hatchShape.SetID(OptConstant.SVGElementClass.HATCH);
      hatchShape.SetSize(width, height);
      hatchShape.SetStrokeWidth(0);
      this.SetFillHatch(hatchShape, hatchPattern);
      shapeContainer.AddElement(hatchShape);
    }

    // Mark as shape
    shapeContainer.isShape = true;

    // Add table and graph objects if present
    const table = null; // this.GetTable(false); - Commented out in original code
    if (table) {
      T3Gv.opt.LM_AddSVGTableObject(this, renderer, shapeContainer, table);
    }

    const graph = this.GetGraph(false);
    if (graph) {
      T3Gv.opt.LM_AddSVGGraphObject(this, renderer, shapeContainer, graph);
    }

    // Add text if there's data
    if (this.DataID >= 0) {
      this.LM_AddSVGTextObject(renderer, shapeContainer);
    }

    return shapeContainer;
  }

  GetCornerSize(inputSize) {
    T3Util.Log("= S.Rect GetCornerSize Input:", inputSize);
    const cornerSize = this.RRect_GetCornerSize(inputSize);
    T3Util.Log("= S.Rect GetCornerSize Output:", cornerSize);
    return cornerSize;
  }

  RRect_GetCornerSize(inputSize) {
    T3Util.Log("= S.Rect RRect_GetCornerSize Input:", inputSize);

    let width = this.Frame.width;
    let height = this.Frame.height;
    let minDimension = width < height ? width : height;

    if (inputSize) {
      minDimension = inputSize;
    }

    if (this.moreflags & OptConstant.ObjMoreFlags.SED_MF_FixedRR) {
      let fixedSize = OptConstant.Defines.RRectFixedDim * this.shapeparam;
      let maxSize = 0.4 * minDimension;
      if (fixedSize > maxSize) {
        fixedSize = maxSize;
      }
      T3Util.Log("= S.Rect RRect_GetCornerSize Output:", fixedSize);
      return fixedSize;
    }

    let cornerSize = minDimension * this.shapeparam;
    T3Util.Log("= S.Rect RRect_GetCornerSize Output:", cornerSize);
    return cornerSize;
  }

  GetPolyPoints(event, type, arg, rect, index) {
    T3Util.Log("= S.Rect GetPolyPoints Input:", { event, type, arg, rect, index });
    const cornerSize = this.RRect_GetCornerSize();
    let polyPoints;
    if (cornerSize > 0) {
      polyPoints = this.RRect_GetPolyPoints(event, type, arg, rect, index);
    } else {
      polyPoints = this.BaseDrawingObject_GetPolyPoints(event, type, arg, rect, index);
    }
    T3Util.Log("= S.Rect GetPolyPoints Output:", polyPoints);
    return polyPoints;
  }

  RRect_GetPolyPoints(event, type, arg, rect, index) {
    T3Util.Log("= S.Rect RRect_GetPolyPoints Input:", { event, type, arg, rect, index });

    let points = [];
    let frameCopy = {};
    let cornerRect = {};

    Utils2.CopyRect(frameCopy, this.Frame);
    let halfThickness = this.StyleRecord.Line.Thickness / 2;
    if (rect) {
      Utils2.InflateRect(frameCopy, halfThickness, halfThickness);
    }

    let cornerSize = this.GetCornerSize();

    cornerRect.x = 0;
    cornerRect.y = 0;
    cornerRect.width = cornerSize;
    cornerRect.height = 2 * cornerSize;
    T3Gv.opt.PolyYCurve(points, cornerRect, event / 2, 0, 0, 0, cornerSize, true);

    cornerRect.x = 0;
    cornerRect.y = frameCopy.height - 2 * cornerSize;
    cornerRect.width = cornerSize;
    cornerRect.height = 2 * cornerSize;
    T3Gv.opt.PolyYCurve(points, cornerRect, event / 2, 0, 0, cornerSize, 0, true);

    cornerRect.x = frameCopy.width - cornerSize;
    cornerRect.y = frameCopy.height;
    cornerRect.width = cornerSize;
    cornerRect.height = -2 * cornerSize;
    T3Gv.opt.PolyYCurve(points, cornerRect, event / 2, 0, 0, 0, -cornerSize, false);

    cornerRect.x = frameCopy.width - cornerSize;
    cornerRect.y = 2 * cornerSize;
    cornerRect.width = cornerSize;
    cornerRect.height = -2 * cornerSize;
    T3Gv.opt.PolyYCurve(points, cornerRect, event / 2, 0, 0, -cornerSize, 0, false);

    points.push(new Point(points[0].x, points[0].y));

    if (!type) {
      for (let i = 0, len = points.length; i < len; i++) {
        points[i].x += frameCopy.x;
        points[i].y += frameCopy.y;
      }
    }

    T3Util.Log("= S.Rect RRect_GetPolyPoints Output:", points);
    return points;
  }

  BaseDrawingObject_GetPolyPoints(event, type, arg, rect, index) {
    T3Util.Log("= S.Rect BaseDrawingObject_GetPolyPoints Input:", { event, type, arg, rect, index });

    let points = [];
    let frameCopy = {};

    Utils2.CopyRect(frameCopy, this.Frame);
    let halfThickness = this.StyleRecord.Line.Thickness / 2;

    if (rect) {
      Utils2.InflateRect(frameCopy, halfThickness, halfThickness);
    }

    points.push(new Point(0, 0));
    points.push(new Point(frameCopy.width, 0));
    points.push(new Point(frameCopy.width, frameCopy.height));
    points.push(new Point(0, frameCopy.height));
    points.push(new Point(0, 0));

    if (!type) {
      for (let i = 0, len = points.length; i < len; i++) {
        points[i].x += frameCopy.x;
        points[i].y += frameCopy.y;
      }
    }

    T3Util.Log("= S.Rect BaseDrawingObject_GetPolyPoints Output:", points);
    return points;
  }

  ExtendLines(extend) {
    T3Util.Log("= S.Rect ExtendLines Input:", extend);
    const cornerSize = this.RRect_GetCornerSize();
    if (cornerSize > 0 || extend) {
      this.RRect_ExtendLines();
    }
    T3Util.Log("= S.Rect ExtendLines Output");
  }

  // RRect_ExtendLines() {
  //   // T3Util.Log("= S.Rect RRect_ExtendLines Input");

  //   // var table = this.GetTable(false);
  //   // if (table) {
  //   //   T3Gv.opt.Table_ExtendLines(this, table);
  //   // }

  //   // T3Util.Log("= S.Rect RRect_ExtendLines Output");
  // }

  // ExtendCell(event, type, arg) {
  //   T3Util.Log("= S.Rect ExtendCell Input:", { event, type, arg });
  //   const cornerSize = this.RRect_GetCornerSize();
  //   let result;
  //   if (cornerSize > 0) {
  //     result = this.RRect_ExtendCell(event, type, arg);
  //   }
  //   T3Util.Log("= S.Rect ExtendCell Output:", result);
  //   return result;
  // }

  // RRect_ExtendCell(event, type, arg) {
  //   T3Util.Log("= S.Rect RRect_ExtendCell Input:", { event, type, arg });

  //   var table = this.GetTable(false);
  //   let result = null;

  //   if (table) {
  //     result = T3Gv.opt.Table_ExtendCell(this, table, event, type, arg);

  //     if (result) {
  //       var offsetX = this.inside.x - this.Frame.x;
  //       var offsetY = this.inside.y - this.Frame.y;

  //       if (offsetX || offsetY) {
  //         for (let i = 0; i < result.length; i++) {
  //           result[i].x += offsetX;
  //           result[i].y += offsetY;
  //         }
  //       }
  //     }
  //   }

  //   T3Util.Log("= S.Rect RRect_ExtendCell Output:", result);
  //   return result;
  // }

  SetShapeIndent(indentOptions) {
    T3Util.Log("= S.Rect SetShapeIndent Input:", indentOptions);
    const cornerSize = this.RRect_GetCornerSize();
    let result;
    if (cornerSize > 0) {
      result = this.RRect_SetShapeIndent(indentOptions);
    } else {
      this.left_sindent = 0;
      this.right_sindent = 0;
      this.top_sindent = 0;
      this.bottom_sindent = 0;
      result = super.SetShapeIndent(indentOptions);
    }
    T3Util.Log("= S.Rect SetShapeIndent Output:", result);
    return result;
  }

  RRect_SetShapeIndent(indentOptions) {
    T3Util.Log("= S.Rect RRect_SetShapeIndent Input:", indentOptions);

    let width = this.inside.width;
    let height = this.inside.height;
    let minDimension = width < height ? width : height;
    let shapeParam = this.shapeparam;

    if (this.moreflags & OptConstant.ObjMoreFlags.SED_MF_FixedRR) {
      let adjustedDimension = minDimension;
      if (indentOptions) {
        adjustedDimension += 2 * (this.GetCornerSize() * OptConstant.Defines.SED_RoundFactor);
        adjustedDimension = minDimension + 2 * (this.GetCornerSize(adjustedDimension) * OptConstant.Defines.SED_RoundFactor);
      }
      shapeParam = this.GetCornerSize(adjustedDimension) / adjustedDimension;
    }

    this.left_sindent = shapeParam * OptConstant.Defines.SED_RoundFactor;
    this.top_sindent = this.left_sindent;
    this.right_sindent = this.left_sindent;
    this.bottom_sindent = this.left_sindent;

    let scaleX = 1, scaleY = 1, scaleRight = 1, scaleBottom = 1;
    if (indentOptions) {
      scaleX = scaleY = scaleRight = scaleBottom = 1 - 2 * this.left_sindent;
    }

    this.tindent.left = this.left_sindent * width / scaleX;
    this.tindent.top = this.top_sindent * height / scaleY;
    this.tindent.right = this.right_sindent * width / scaleRight;
    this.tindent.bottom = this.bottom_sindent * height / scaleBottom;

    T3Util.Log("= S.Rect RRect_SetShapeIndent Output:", {
      left_sindent: this.left_sindent,
      top_sindent: this.top_sindent,
      right_sindent: this.right_sindent,
      bottom_sindent: this.bottom_sindent,
      tindent: this.tindent
    });
  }

  SetShapeProperties(properties) {
    T3Util.Log("= S.Rect SetShapeProperties Input:", properties);
    let updated = false;
    const fixedRRectFlag = OptConstant.ObjMoreFlags.SED_MF_FixedRR;

    if (properties.hasrrectselected) {
      const isFixedRRectChanged = (this.moreflags & fixedRRectFlag) > 0 !== properties.rrectfixed;
      const isShapeParamChanged = properties.rrectparam !== this.shapeparam;

      if (isFixedRRectChanged || isShapeParamChanged) {
        this.moreflags = Utils2.SetFlag(this.moreflags, fixedRRectFlag, properties.rrectfixed);
        this.shapeparam = properties.rrectparam;
        this.GetTable(true);

        if (this.shapeparam === 0) {
          this.left_sindent = 0;
          this.top_sindent = 0;
          this.right_sindent = 0;
          this.bottom_sindent = 0;
          this.tindent.left = 0;
          this.tindent.top = 0;
          this.tindent.right = 0;
          this.tindent.bottom = 0;
        }

        this.SetSize(this.Frame.width, 0, OptConstant.ActionTriggerType.LINELENGTH);

        if (this.shapeparam === 0) {
          this.ExtendLines(true);
        }

        updated = true;
      }
    }

    if (Instance.Shape.BaseShape.prototype.SetShapeProperties.call(this, properties)) {
      updated = true;
    }

    T3Util.Log("= S.Rect SetShapeProperties Output:", updated);
    return updated;
  }

  ApplyCurvature(curvatureParam) {
    T3Util.Log("= S.Rect ApplyCurvature Input:", curvatureParam);

    // var table = this.GetTable(false);
    // if (table) {
    //   var firstRow = table.rows[0];
    //   for (var i = 0; i < firstRow.ncells; i++) {
    //     if (table.cells[i].flags & TODO.Table.CellFlags.SDT_F_UseExpandedRectAsFrame) {
    //       T3Util.Log("= S.Rect ApplyCurvature Output: No action taken due to expanded rect as frame");
    //       return;
    //     }
    //   }
    // }

    var shapeProperties = {
      hasrrectselected: true,
      rrectfixed: true,
      rrectparam: curvatureParam
    };

    this.SetShapeProperties(shapeProperties);
    T3Util.Log("= S.Rect ApplyCurvature Output: Shape properties updated");
  }

}

export default Rect;
