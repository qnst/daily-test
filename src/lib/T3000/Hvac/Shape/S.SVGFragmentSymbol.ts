

import BaseSymbol from './S.BaseSymbol'
import Utils1 from '../Util/Utils1';
import Utils2 from "../Util/Utils2";
import T3Gv from '../Data/T3Gv'
import NvConstant from '../Data/Constant/NvConstant'
import $ from 'jquery';
import ShapeUtil from '../Opt/Shape/ShapeUtil';
import PolygonConstant from '../Opt/Polygon/PolygonConstant';
import OptConstant from '../Data/Constant/OptConstant';
import CursorConstant from '../Data/Constant/CursorConstant';
import TextConstant from '../Data/Constant/TextConstant';
import StyleConstant from '../Data/Constant/StyleConstant';
import T3Util from '../Util/T3Util';

class SVGFragmentSymbol extends BaseSymbol {

  constructor(options: any) {
    T3Util.Log("= S.SVGFragmentSymbol | Constructor Input:", options);
    options = options || {};
    options.ShapeType = OptConstant.ShapeType.SVGFRAGMENTSYMBOL;
    super(options);
    T3Util.Log("= S.SVGFragmentSymbol | Constructor Output:", this);
  }

  CreateShape(svgDoc: any, useEvent: any) {
    T3Util.Log("= S.SVGFragmentSymbol | CreateShape Input:", { svgDoc, useEvent });

    if (this.flags & NvConstant.ObjFlags.SEDO_NotVisible) {
      return null;
    }

    // Create container and symbol shapes
    const container = svgDoc.CreateShape(OptConstant.CSType.SHAPECONTAINER);
    const symbol = svgDoc.CreateShape(OptConstant.CSType.SYMBOL);

    // Set up symbol properties
    symbol.SetSymbolSource(this.SVGFragment);
    symbol.SetID(OptConstant.SVGElementClass.SHAPE);

    const frame = this.Frame;
    const styleRecord = this.StyleRecord;
    let lineColor = styleRecord.Line.Paint.Color;
    const lineThickness = styleRecord.Line.Thickness;

    // Override with field data style if available
    let fieldStyle = this.GetFieldDataStyleOverride();
    if (fieldStyle && fieldStyle.strokeColor) {
      lineColor = fieldStyle.strokeColor;
    }

    // Set stroke color and width based on color changes flags
    if (fieldStyle || (this.colorchanges & (StyleConstant.SDRColorFilters.SD_NOCOLOR_LINE | StyleConstant.SDRColorFilters.SD_NOCOLOR_STYLE))) {
      symbol.SetStrokeColor(lineColor);
    }

    if (this.colorchanges & (StyleConstant.SDRColorFilters.SD_NOCOLOR_LINETHICK | StyleConstant.SDRColorFilters.SD_NOCOLOR_STYLE)) {
      symbol.SetStrokeWidth(lineThickness);
    }

    // Set fill and stroke opacities
    symbol.SetFillOpacity(styleRecord.Fill.Paint.Opacity);
    symbol.SetStrokeOpacity(styleRecord.Line.Paint.Opacity);

    // Update container and symbol sizes/positions
    const width = frame.width;
    const height = frame.height;

    container.SetSize(width, height);
    container.SetPos(frame.x, frame.y);

    symbol.SetSize(width, height);
    symbol.SetScale(width / this.InitialGroupBounds.width, height / this.InitialGroupBounds.height);

    // Apply mirror/flip effects if needed
    const flipHoriz = (this.extraflags & OptConstant.ExtraFlags.SEDE_FlipHoriz) > 0;
    const flipVert = (this.extraflags & OptConstant.ExtraFlags.SEDE_FlipVert) > 0;
    if (flipHoriz) {
      symbol.SetMirror(flipHoriz);
    }
    if (flipVert) {
      symbol.SetFlip(flipVert);
    }

    container.AddElement(symbol);
    this.ApplyStyles(symbol, styleRecord);
    this.ApplyEffects(container, false, false);

    // Create a slop shape for event handling
    const slopShape = svgDoc.CreateShape(OptConstant.CSType.RECT);
    slopShape.SetStrokeColor('white');
    slopShape.SetFillColor('none');
    slopShape.SetOpacity(0);
    slopShape.SetStrokeWidth(0);
    if (useEvent) {
      slopShape.SetEventBehavior(OptConstant.EventBehavior.HIDDEN_ALL);
    } else {
      slopShape.SetEventBehavior(OptConstant.EventBehavior.NONE);
    }
    slopShape.SetID(OptConstant.SVGElementClass.SLOP);
    slopShape.ExcludeFromExport(true);
    slopShape.SetSize(width, height);

    container.AddElement(slopShape);
    container.isShape = true;

    // Add SVG text object if applicable
    if (this.DataID !== -1) {
      this.LM_AddSVGTextObject(svgDoc, container);
    }

    T3Util.Log("= S.SVGFragmentSymbol | CreateShape Output:", container);
    return container;
  }

  /**
   * Applies visual styling (fill colors, gradients, textures) to an SVG fragment symbol
   * @param shapeElement - The target SVG element to apply styles to
   * @param styleRecord - The style record containing appearance information
   */
  ApplyStyles(shapeElement, styleRecord) {
    T3Util.Log("S.SVGFragmentSymbol | ApplyStyles Input:", { shapeElement, styleRecord });

    const fieldDataStyle = this.GetFieldDataStyleOverride();
    const overrideFillColor = fieldDataStyle && fieldDataStyle.fillColor;

    if (
      overrideFillColor ||
      this.colorchanges & (StyleConstant.SDRColorFilters.SD_NOCOLOR_FILL | StyleConstant.SDRColorFilters.SD_NOCOLOR_STYLE)
    ) {
      let fillType = styleRecord.Fill.Paint.FillType;
      let fillColor = styleRecord.Fill.Paint.Color;

      // Override fill color if field data style provides an override
      if (overrideFillColor) {
        fillType = NvConstant.FillTypes.Solid;
        fillColor = fieldDataStyle.fillColor;
      }

      if (fillType === NvConstant.FillTypes.Gradient) {
        shapeElement.SetFillColor(styleRecord.Fill.Paint.Color);
        shapeElement.SetGradientFill(
          this.CreateGradientRecord(
            styleRecord.Fill.Paint.GradientFlags,
            fillColor,
            styleRecord.Fill.Paint.Opacity,
            styleRecord.Fill.Paint.EndColor,
            styleRecord.Fill.Paint.EndOpacity
          )
        );
        shapeElement.fillPaintType = fillType;
      } else if (fillType === NvConstant.FillTypes.Texture) {
        const texture = styleRecord.Fill.Paint.Texture;
        const textureData = T3Gv.opt.TextureList.Textures[texture];
        if (textureData) {
          const textureFill = {
            url: textureData.ImageURL || (Constants.FilePath_CMSRoot + Constants.FilePath_Textures + textureData.filename),
            scale: T3Gv.opt.CalcTextureScale(styleRecord.Fill.Paint.TextureScale, textureData.dim.x),
            alignment: styleRecord.Fill.Paint.TextureScale.AlignmentScalar,
            dim: textureData.dim
          };
          // Update scale inside styleRecord for consistency
          styleRecord.Fill.Paint.TextureScale.Scale = textureFill.scale;
          shapeElement.SetTextureFill(textureFill);
        }
      } else if (fillType === NvConstant.FillTypes.Transparent) {
        shapeElement.SetFillColor('none');
      } else {
        shapeElement.SetFillColor(fillColor);
        shapeElement.SetFillOpacity(styleRecord.Fill.Paint.Opacity);
      }
    }

    T3Util.Log("S.SVGFragmentSymbol | ApplyStyles Output:", { shapeElement });
  }

  Resize(shapeElement, newBBox, eventInfo) {
    T3Util.Log("= S.SVGFragmentSymbol | Resize Input:", {
      shapeElement,
      newBBox,
      eventInfo
    });

    // Get the current rotation, previous bounding box and calculate offset for rotation.
    const rotation = shapeElement.GetRotation();
    const prevBBox = $.extend(true, {}, this.prevBBox);
    const updatedBBox = $.extend(true, {}, newBBox);
    const offset = T3Gv.opt.svgDoc.CalculateRotatedOffsetForResize(prevBBox, updatedBBox, rotation);

    // Update the main shape size and position.
    shapeElement.SetSize(updatedBBox.width, updatedBBox.height);
    shapeElement.SetPos(updatedBBox.x + offset.x, updatedBBox.y + offset.y);

    // Update the inner shape content.
    const shapeContent = shapeElement.GetElementByID(OptConstant.SVGElementClass.SHAPE);
    shapeContent.SetSize(updatedBBox.width, updatedBBox.height);
    shapeContent.SetScale(
      updatedBBox.width / this.InitialGroupBounds.width,
      updatedBBox.height / this.InitialGroupBounds.height
    );

    // Update the "slop" element, if present.
    const slopElement = shapeElement.GetElementByID(OptConstant.SVGElementClass.SLOP);
    if (slopElement) {
      slopElement.SetSize(updatedBBox.width, updatedBBox.height);
    }

    // Resize the SVG text object.
    this.LM_ResizeSVGTextObject(shapeElement, eventInfo, updatedBBox);

    // Reset rotation and update dimension lines.
    shapeElement.SetRotation(rotation);
    this.UpdateDimensionLines(shapeElement);

    T3Util.Log("= S.SVGFragmentSymbol | Resize Output:", {
      offset,
      shapeElement
    });
    return offset;
  }

  ResizeInTextEdit(shapeElement, newBBox) {
    T3Util.Log("= S.SVGFragmentSymbol | ResizeInTextEdit Input:", { shapeElement, newBBox });

    if (shapeElement) {
      const shapeID = shapeElement.GetID();
      if (shapeID >= 0) {
        const shapeObject = T3Gv.opt.GetObjectPtr(shapeID, false);
        this.prevBBox = $.extend(true, {}, this.Frame);
        const offset = this.Resize(shapeElement, newBBox, shapeObject);
        T3Util.Log("= S.SVGFragmentSymbol | ResizeInTextEdit Output:", { offset });
        return offset;
      }
    }

    const defaultOffset = { x: 0, y: 0 };
    T3Util.Log("= S.SVGFragmentSymbol | ResizeInTextEdit Output:", { offset: defaultOffset });
    return defaultOffset;
  }

  CreateActionTriggers(svgDoc: any, triggerType: any, action: any, extraParams: any) {
    T3Util.Log("= S.SVGFragmentSymbol | CreateActionTriggers Input:", { svgDoc, triggerType, action, extraParams });
    const result = super.CreateActionTriggers2(svgDoc, triggerType, action, extraParams);
    T3Util.Log("= S.SVGFragmentSymbol | CreateActionTriggers Output:", result);
    return result;
  }

  BaseShape_CreateActionTriggers(svgDoc: any, triggerId: any, shape: any, additionalParams: any) {
    T3Util.Log("= S.SVGFragmentSymbol | BaseShape_CreateActionTriggers Input:", { svgDoc, triggerId, shape, additionalParams });

    const cursors = [
      CursorConstant.CursorType.RESIZE_LT,
      CursorConstant.CursorType.RESIZE_T,
      CursorConstant.CursorType.RESIZE_RT,
      CursorConstant.CursorType.RESIZE_R,
      CursorConstant.CursorType.RESIZE_RB,
      CursorConstant.CursorType.RESIZE_B,
      CursorConstant.CursorType.RESIZE_LB,
      CursorConstant.CursorType.RESIZE_L,
    ];

    // if (T3Gv.opt.Table_GetActiveID() === this.BlockID) {
    //   T3Util.Log("= S.SVGFragmentSymbol | BaseShape_CreateActionTriggers Output:", null);
    //   return null;
    // }

    let connectorData,
      knobIcon,
      groupShape = svgDoc.CreateShape(OptConstant.CSType.GROUP),
      knobSize = OptConstant.Defines.SED_KnobSize,
      rKnobSize = OptConstant.Defines.SED_RKnobSize,
      sideKnobs = ((this.extraflags & OptConstant.ExtraFlags.SEDE_SideKnobs &&
        this.dataclass === PolygonConstant.ShapeTypes.POLYGON) > 0),
      minSidePointLength = OptConstant.Defines.MinSidePointLength,
      docToScreenScale = svgDoc.docInfo.docToScreenScale;

    if (svgDoc.docInfo.docScale <= 0.5) {
      docToScreenScale *= 2;
    }

    const adjustedKnobSize = knobSize / docToScreenScale,
      adjustedRKnobSize = rKnobSize / docToScreenScale,
      fillColor = 'black';
    let { x, y, width, height } = this.Frame;

    width += adjustedKnobSize;
    height += adjustedKnobSize;

    const pos = $.extend(true, {}, this.Frame);
    pos.x -= adjustedKnobSize / 2;
    pos.y -= adjustedKnobSize / 2;
    pos.width += adjustedKnobSize;
    pos.height += adjustedKnobSize;

    let rotation = shape.GetRotation() + 22.5;
    if (rotation >= 360) {
      rotation = 0;
    }

    const rotationIndex = Math.floor(rotation / 45);
    let rotatedCursors = cursors.slice(rotationIndex).concat(cursors.slice(0, rotationIndex));
    let allowProportional = true, allowHorizontal = !sideKnobs, allowVertical = !sideKnobs;

    switch (this.ObjGrow) {
      case OptConstant.GrowBehavior.HCONSTRAIN:
        allowProportional = false;
        allowVertical = false;
        break;
      case OptConstant.GrowBehavior.VCONSTRAIN:
        allowProportional = false;
        allowHorizontal = false;
        break;
      case OptConstant.GrowBehavior.ProPortional:
        allowProportional = true;
        allowHorizontal = false;
        allowVertical = false;
        break;
    }

    const knobConfig: any = {
      svgDoc: svgDoc,
      shapeType: OptConstant.CSType.RECT,
      x: 0,
      y: 0,
      knobSize: adjustedKnobSize,
      fillColor: fillColor,
      fillOpacity: 1,
      strokeSize: 1,
      strokeColor: '#777777',
      locked: false
    };

    if (triggerId !== additionalParams) {
      knobConfig.fillColor = 'white';
      knobConfig.strokeSize = 1;
      knobConfig.strokeColor = 'black';
      knobConfig.fillOpacity = 0.0;
    }

    if (this.flags & NvConstant.ObjFlags.SEDO_Lock) {
      knobConfig.fillColor = 'gray';
      knobConfig.locked = true;
      sideKnobs = false;
    } else if (this.NoGrow()) {
      knobConfig.fillColor = 'red';
      sideKnobs = false;
      knobConfig.strokeColor = 'red';
      rotatedCursors = [
        CursorConstant.CursorType.DEFAULT,
        CursorConstant.CursorType.DEFAULT,
        CursorConstant.CursorType.DEFAULT,
        CursorConstant.CursorType.DEFAULT,
        CursorConstant.CursorType.DEFAULT,
        CursorConstant.CursorType.DEFAULT,
        CursorConstant.CursorType.DEFAULT,
        CursorConstant.CursorType.DEFAULT,
      ];
    }

    // Proportional knobs (corners)
    if (allowProportional) {
      knobConfig.knobID = OptConstant.ActionTriggerType.TOPLEFT;
      knobConfig.cursorType = rotatedCursors[0];
      let knob = this.GenericKnob(knobConfig);
      groupShape.AddElement(knob);

      knobConfig.x = width - adjustedKnobSize;
      knobConfig.y = 0;
      knobConfig.cursorType = rotatedCursors[2];
      knobConfig.knobID = OptConstant.ActionTriggerType.TOPRIGHT;
      knob = this.GenericKnob(knobConfig);
      groupShape.AddElement(knob);

      knobConfig.x = width - adjustedKnobSize;
      knobConfig.y = height - adjustedKnobSize;
      knobConfig.cursorType = rotatedCursors[4];
      knobConfig.knobID = OptConstant.ActionTriggerType.BOTTOMRIGHT;
      knob = this.GenericKnob(knobConfig);
      groupShape.AddElement(knob);

      knobConfig.x = 0;
      knobConfig.y = height - adjustedKnobSize;
      knobConfig.cursorType = rotatedCursors[6];
      knobConfig.knobID = OptConstant.ActionTriggerType.BOTTOMLEFT;
      knob = this.GenericKnob(knobConfig);
      groupShape.AddElement(knob);
    }

    // Vertical side knobs (top and bottom centers)
    if (allowVertical) {
      knobConfig.x = width / 2 - adjustedKnobSize / 2;
      knobConfig.y = 0;
      knobConfig.cursorType = rotatedCursors[1];
      knobConfig.knobID = OptConstant.ActionTriggerType.TOPCENTER;
      let knob = this.GenericKnob(knobConfig);
      groupShape.AddElement(knob);

      knobConfig.x = width / 2 - adjustedKnobSize / 2;
      knobConfig.y = height - adjustedKnobSize;
      knobConfig.cursorType = rotatedCursors[5];
      knobConfig.knobID = OptConstant.ActionTriggerType.BOTTOMCENTER;
      knob = this.GenericKnob(knobConfig);
      groupShape.AddElement(knob);
    }

    // Horizontal side knobs (left and right centers)
    if (allowHorizontal) {
      knobConfig.x = 0;
      knobConfig.y = height / 2 - adjustedKnobSize / 2;
      knobConfig.cursorType = rotatedCursors[7];
      knobConfig.knobID = OptConstant.ActionTriggerType.CENTERLEFT;
      let knob = this.GenericKnob(knobConfig);
      groupShape.AddElement(knob);

      knobConfig.x = width - adjustedKnobSize;
      knobConfig.y = height / 2 - adjustedKnobSize / 2;
      knobConfig.cursorType = rotatedCursors[3];
      knobConfig.knobID = OptConstant.ActionTriggerType.CENTERRIGHT;
      knob = this.GenericKnob(knobConfig);
      groupShape.AddElement(knob);
    }

    // Connector knob/icon if applicable
    connectorData = (function (obj: any) {
      let hook, result = null;
      if (obj.hooks.length) {
        hook = T3Gv.opt.GetObjectPtr(obj.hooks[0].objid, false);
        if (hook && hook.DrawingObjectBaseClass === OptConstant.DrawingObjectBaseClass.CONNECTOR) {
          result = hook.Pr_GetShapeConnectorInfo(obj.hooks[0]);
        } else if (hook && hook instanceof Instance.Shape.ShapeContainer) {
          result = hook.Pr_GetShapeConnectorInfo(obj.hooks[0]);
        }
      }
      return result;
    })(this);

    if (connectorData && connectorData.length) {
      const iconConfig: any = {
        svgDoc: svgDoc,
        iconSize: 14,
        imageURL: null,
        iconID: 0,
        userData: 0,
        cursorType: 0
      };

      for (let w = connectorData.length, index = 0; index < w; index++) {
        if (connectorData[index].position === 'right') {
          iconConfig.x = width - 14 - 1 - adjustedKnobSize;
        } else if (connectorData[index].position === 'bottom') {
          iconConfig.y = height - 14 - 1 - adjustedKnobSize;
        } else {
          iconConfig.x = adjustedKnobSize + 1;
          iconConfig.y = adjustedKnobSize + 1;
        }
        iconConfig.cursorType = connectorData[index].cursorType;
        iconConfig.iconID = connectorData[index].knobID;
        iconConfig.imageURL = connectorData[index].polyType === 'vertical'
          ? OptConstant.Defines.Connector_Move_Vertical_Path
          : OptConstant.Defines.Connector_Move_Horizontal_Path;
        iconConfig.userData = connectorData[index].knobData;

        knobIcon = this.GenericIcon(iconConfig);
        groupShape.AddElement(knobIcon);

        iconConfig.x += 16;
      }
    }

    // Side knobs for poly shape
    if (sideKnobs) {
      const sideObj = Utils1.DeepCopy(this);
      sideObj.inside = $.extend(true, {}, sideObj.Frame);
      const polyPoints = T3Gv.opt
        .ShapeToPolyLine(this.BlockID, false, true, sideObj)
        .GetPolyPoints(OptConstant.Defines.NPOLYPTS, true, true, false, []);

      if (polyPoints) {
        for (let i = 1, len = polyPoints.length; i < len; i++) {
          const diffX = polyPoints[i].x - polyPoints[i - 1].x,
            diffY = polyPoints[i].y - polyPoints[i - 1].y;
          if (Utils2.sqrt(diffX * diffX + diffY * diffY) > minSidePointLength) {
            knobConfig.cursorType = (diffX * diffX > diffY * diffY) ? CursorConstant.CursorType.RESIZE_TB : CursorConstant.CursorType.RESIZE_LR;
            knobConfig.x = polyPoints[i - 1].x + diffX / 2;
            knobConfig.y = polyPoints[i - 1].y + diffY / 2;
            const knob = this.GenericKnob(knobConfig);
            knob.SetUserData(i);
            groupShape.AddElement(knob);
          }
        }
      }
    }

    // Check conditions for rotation knob
    const smallWidth = this.Frame.width < 44,
      hasHooks = this.hooks.length > 0 &&
        (T3Gv.opt.GetObjectPtr(this.hooks[0].objid, false) ?
          T3Gv.opt.GetObjectPtr(this.hooks[0].objid, false).DrawingObjectBaseClass === OptConstant.DrawingObjectBaseClass.CONNECTOR
          : false);
    if (
      !(
        this.NoRotate() ||
        this.NoGrow() ||
        T3Gv.opt.touchInitiated ||
        knobConfig.locked ||
        smallWidth ||
        hasHooks
      )
    ) {
      const isTextGrowHorizontal = this.TextGrow === NvConstant.TextGrowBehavior.Horizontal &&
        (this.flags & NvConstant.ObjFlags.SEDO_TextOnly) &&
        ShapeUtil.TextAlignToWin(this.TextAlign).just === TextConstant.TextJust.TA_LEFT;
      knobConfig.shapeType = OptConstant.CSType.OVAL;
      knobConfig.x = isTextGrowHorizontal ? width + adjustedRKnobSize : width - 3 * adjustedRKnobSize;
      knobConfig.y = height / 2 - adjustedRKnobSize / 2;
      knobConfig.cursorType = CursorConstant.CursorType.ROTATE;
      knobConfig.knobID = OptConstant.ActionTriggerType.ROTATE;
      knobConfig.fillColor = 'white';
      knobConfig.fillOpacity = 0.001;
      knobConfig.strokeSize = 1.5;
      knobConfig.strokeColor = 'black';
      const knob = this.GenericKnob(knobConfig);
      groupShape.AddElement(knob);
    }

    // Create dimension adjustment knobs if applicable
    if ((this.Dimensions & NvConstant.DimensionFlags.Standoff) && this.CanUseStandOffDimensionLines()) {
      const svgObj = T3Gv.opt.svgObjectLayer.GetElementByID(this.BlockID);
      this.CreateDimensionAdjustmentKnobs(groupShape, svgObj, knobConfig);
    }

    groupShape.SetSize(width, height);
    groupShape.SetPos(pos.x, pos.y);
    groupShape.isShape = true;
    groupShape.SetID(OptConstant.Defines.Action + triggerId);

    T3Util.Log("= S.SVGFragmentSymbol | BaseShape_CreateActionTriggers Output:", groupShape);
    return groupShape;
  }

}

export default SVGFragmentSymbol
