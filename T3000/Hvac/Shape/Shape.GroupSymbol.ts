

import BaseSymbol from './Shape.BaseSymbol'
import Utils1 from '../Helper/Utils1';
import Utils2 from "../Helper/Utils2";
import Utils3 from "../Helper/Utils3";
import GlobalData from '../Data/GlobalData'
// import Collab from '../Data/Collab'
import FileParser from '../Data/FileParser'
import DefaultEvt from "../Event/DefaultEvt";
import Resources from '../Data/Resources'
import ListManager from '../Data/ListManager';
import Document from '../Basic/Basic.Document'
import Element from '../Basic/Basic.Element';
import WResult from '../Model/WResult'
import SDF from '../Data/SDF'
import Globals from '../Data/Globals'
import $ from 'jquery'
import Effects from '../Basic/Basic.Element.Effects'
import Instance from '../Data/Instance/Instance'
import ConstantData from '../Data/ConstantData'
import ConstantData2 from '../Data/ConstantData2'

class GroupSymbol extends BaseSymbol {

  public collabGlowColor: string;

  constructor(options) {
    options = options || {};
    options.ShapeType = ConstantData.ShapeType.GROUPSYMBOL;
    options.flags = ConstantData.ObjFlags.SEDO_ImageOnly;
    console.log('S.GroupSymbol - Input options:', options);
    super(options);
    console.log('S.GroupSymbol - GroupSymbol created');
  }

  CreateShape(svgDocument, shapeOptions) {
    console.log("S.GroupSymbol - CreateShape input:", { svgDocument, shapeOptions });
    if (this.flags & ConstantData.ObjFlags.SEDO_NotVisible) {
      console.log("S.GroupSymbol - CreateShape output:", null);
      return null;
    }
    // Retrieve any style override if present
    this.GetFieldDataStyleOverride();
    const shapeContainer = svgDocument.CreateShape(ConstantData.CreateShapeType.SHAPECONTAINER);
    console.log("S.GroupSymbol - CreateShape output:", shapeContainer);
    return shapeContainer;
  }

  PostCreateShapeCallback(svgDocument, groupElement, eventSettings, extraFlags) {
    console.log("S.GroupSymbol - PostCreateShapeCallback input:", {
      svgDocument,
      groupElement,
      eventSettings,
      extraFlags
    });

    if (!(this.flags & ConstantData.ObjFlags.SEDO_NotVisible)) {
      let groupContainer = svgDocument.CreateShape(ConstantData.CreateShapeType.GROUP);
      groupContainer.SetID(ConstantData.SVGElementClass.SHAPE);
      groupElement.AddElement(groupContainer);

      let currentFrame = this.Frame;
      let width = currentFrame.width;
      let height = currentFrame.height;
      groupElement.SetSize(width, height);
      groupElement.SetPos(currentFrame.x, currentFrame.y);

      let shapeObj, totalShapes = this.ShapesInGroup.length;
      let originalDimensions = null, currentShapeInstance = null, rotationAngle = 0, textElement = null;
      let isFlipHorizontally = (this.extraflags & ConstantData.ExtraFlags.SEDE_FlipHoriz) > 0;
      let isFlipVertically = (this.extraflags & ConstantData.ExtraFlags.SEDE_FlipVert) > 0;
      let updatedFlipHoriz = isFlipHorizontally, updatedFlipVert = isFlipVertically;
      let flagValue = 0;

      if (extraFlags != null) {
        if ((extraFlags & ConstantData.ExtraFlags.SEDE_FlipHoriz) > 0) {
          updatedFlipHoriz = !updatedFlipHoriz;
        }
        if ((extraFlags & ConstantData.ExtraFlags.SEDE_FlipVert) > 0) {
          updatedFlipVert = !updatedFlipVert;
        }
      }
      flagValue = Utils2.SetFlag(flagValue, ConstantData.ExtraFlags.SEDE_FlipHoriz, updatedFlipHoriz);
      flagValue = Utils2.SetFlag(flagValue, ConstantData.ExtraFlags.SEDE_FlipVert, updatedFlipVert);

      for (let idx = 0; idx < totalShapes; ++idx) {
        let shapeId = this.ShapesInGroup[idx];
        shapeObj = GlobalData.optManager.GetObjectPtr(shapeId, false);
        originalDimensions = shapeObj.Dimensions;
        shapeObj.Dimensions = 0;

        currentShapeInstance = shapeObj.CreateShape(svgDocument);
        if (currentShapeInstance) {
          currentShapeInstance.SetID(shapeId);
          groupContainer.AddElement(currentShapeInstance);
          shapeObj.PostCreateShapeCallback(svgDocument, currentShapeInstance, null, flagValue);
        }
        shapeObj.Dimensions = originalDimensions;
        rotationAngle = shapeObj.RotationAngle;

        if (shapeObj instanceof Instance.Shape.BaseShape) {
          if (rotationAngle !== 0) {
            currentShapeInstance.SetRotation(rotationAngle);
          }
          if (shapeObj.DataID >= 0 && (updatedFlipHoriz || updatedFlipVert)) {
            textElement = currentShapeInstance.GetElementByID(ConstantData.SVGElementClass.TEXT);
            if (textElement) {
              if (updatedFlipHoriz) {
                textElement.SetMirror(updatedFlipHoriz);
              }
              if (updatedFlipVert) {
                textElement.SetFlip(updatedFlipVert);
              }
            }
          }
        }
      }

      groupContainer.SetSize(width, height);
      groupElement.isShape = true;

      let slopRect = svgDocument.CreateShape(ConstantData.CreateShapeType.RECT);
      slopRect.SetStrokeColor('white');
      slopRect.SetFillColor('none');
      slopRect.SetOpacity(0);
      slopRect.SetStrokeWidth(5);

      if (eventSettings) {
        slopRect.SetEventBehavior(ConstantData2.EventBehavior.HIDDEN_ALL);
      } else {
        slopRect.SetEventBehavior(ConstantData2.EventBehavior.NONE);
      }

      groupElement.AddElement(slopRect);
      slopRect.SetID(ConstantData.SVGElementClass.SLOP);
      slopRect.ExcludeFromExport(true);
      slopRect.SetSize(width, height);
      groupContainer.SetScale(
        width / this.InitialGroupBounds.width,
        height / this.InitialGroupBounds.height
      );
      if (isFlipHorizontally) {
        groupContainer.SetMirror(isFlipHorizontally);
      }
      if (isFlipVertically) {
        groupContainer.SetFlip(isFlipVertically);
      }
      if (this.DataID !== -1) {
        this.LM_AddSVGTextObject(svgDocument, groupElement);
      }
      this.UpdateDimensionLines(groupElement);
      this.AddIcons(svgDocument, groupElement);
      this.ApplyEffects(groupElement, false, false);
    }
    console.log("S.GroupSymbol - PostCreateShapeCallback output executed");
  }

  SetObjectStyle(styleOptions: any) {
    console.log("S.GroupSymbol - SetObjectStyle input:", styleOptions);
    if (!styleOptions.ImageURL || styleOptions.ImageURL === '') {
      const filteredStyle = GlobalData.optManager.ApplyColorFilter(styleOptions, this, this.StyleRecord, this.colorfilter);
      GlobalData.optManager.ApplyGroupProperties(filteredStyle, this);
      console.log("S.GroupSymbol - SetObjectStyle output: Applied color filter and group properties");
    } else {
      console.log("S.GroupSymbol - SetObjectStyle output: No changes applied since ImageURL exists");
    }
  }

  ChangeTextAttributes(
    textContent: any,
    styleOptions: any,
    textAlignment: any,
    textRotation: any,
    textMargin: any,
    textPadding: any,
    parentElementOverride: any,
    forceUpdate: any
  ) {
    console.log("S.GroupSymbol - ChangeTextAttributes input:", {
      textContent,
      styleOptions,
      textAlignment,
      textRotation,
      textMargin,
      textPadding,
      parentElementOverride,
      forceUpdate
    });

    let shapeHeightBefore: any;
    let shapeWidthBefore: any;
    const shapesGroup = this.ShapesInGroup;
    const shapesCount = shapesGroup.length;
    let frameSizeChanged = false;

    if (shapesCount !== 0) {
      let svgElement;
      if (parentElementOverride) {
        svgElement = parentElementOverride;
      } else {
        svgElement = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
      }

      let shapeElement;
      if (svgElement) {
        shapeElement = svgElement.GetElementByID(ConstantData.SVGElementClass.SHAPE);
      }
      if (shapeElement != null) {
        // If text editing is allowed, call the base ChangeTextAttributes function
        if (this.AllowTextEdit()) {
          ListManager.BaseSymbol.prototype.ChangeTextAttributes.call(
            this,
            textContent,
            styleOptions,
            textAlignment,
            textRotation,
            textMargin,
            textPadding,
            shapeElement,
            forceUpdate
          );
        }

        if (styleOptions) {
          if (styleOptions.FontName !== undefined) {
            this.StyleRecord.Text.FontName = styleOptions.FontName;
          }
          if (styleOptions.FontId !== undefined) {
            this.StyleRecord.Text.FontId = styleOptions.FontId;
          }
          if (styleOptions.FontSize !== undefined) {
            this.StyleRecord.Text.FontSize = styleOptions.FontSize;
          }
          if (styleOptions.Face !== undefined) {
            this.StyleRecord.Text.Face = styleOptions.Face;
          }
          if (styleOptions.Color !== undefined) {
            this.StyleRecord.Text.Paint.Color = styleOptions.Color;
          }
          if (styleOptions.Opacity !== undefined) {
            this.StyleRecord.Text.Paint.Opacity = styleOptions.Opacity;
          }
        }

        for (let index = 0; index < shapesCount; ++index) {
          let shapeObject = GlobalData.optManager.GetObjectPtr(shapesGroup[index], true);
          if (shapeObject && (shapeObject.colorfilter & ConstantData2.SDRColorFilters.SD_NOCOLOR_TEXT) === 0) {
            let childShapeElement = shapeElement.GetElementByID(shapeObject.BlockID);
            // Remember current dimensions to check for changes after update
            shapeHeightBefore = shapeObject.Frame.height;
            shapeWidthBefore = shapeObject.Frame.width;

            shapeObject.ChangeTextAttributes(
              textContent,
              styleOptions,
              textAlignment,
              textRotation,
              textMargin,
              textPadding,
              childShapeElement,
              forceUpdate
            );

            if (shapeObject.Frame.width !== shapeWidthBefore || shapeObject.Frame.height !== shapeHeightBefore) {
              frameSizeChanged = true;
            }
          }
        }

        if (frameSizeChanged) {
          GlobalData.optManager.AddToDirtyList(this.BlockID);
          const scaleWidth = this.Frame.width / this.InitialGroupBounds.width;
          const scaleHeight = this.Frame.height / this.InitialGroupBounds.height;
          if (!isNaN(scaleWidth) && !isNaN(scaleHeight)) {
            const newFrame = Utils1.DeepCopy(this.Frame);
            newFrame.width = scaleWidth * this.InitialGroupBounds.width;
            newFrame.height = scaleHeight * this.InitialGroupBounds.height;
            this.UpdateFrame(newFrame);
          }
        }
        this.ConvertToNative(GlobalData.optManager.RichGradients, false);
      }
    }
    console.log("S.GroupSymbol - ChangeTextAttributes output executed");
  }

  GetTextures(textureList: any): void {
    console.log("S.GroupSymbol - GetTextures input:", textureList);
    const totalShapes = this.ShapesInGroup.length;
    for (let index = 0; index < totalShapes; index++) {
      const shapeObject = GlobalData.optManager.GetObjectPtr(this.ShapesInGroup[index], false);
      if (shapeObject) {
        shapeObject.GetTextures(textureList);
      }
    }
    console.log("S.GroupSymbol - GetTextures output executed");
  }

  Resize(svgElement, newDimensions, resizeInfo) {
    console.log("S.GroupSymbol - Resize input:", { svgElement, newDimensions, resizeInfo });

    const rotation = svgElement.GetRotation();
    const previousBoundingBox = $.extend(true, {}, this.prevBBox);
    const newBoundingBox = $.extend(true, {}, newDimensions);
    const offset = GlobalData.optManager.svgDoc.CalculateRotatedOffsetForResize(previousBoundingBox, newBoundingBox, rotation);

    svgElement.SetSize(newDimensions.width, newDimensions.height);
    svgElement.SetPos(newDimensions.x + offset.x, newDimensions.y + offset.y);

    const shapeElement = svgElement.GetElementByID(ConstantData.SVGElementClass.SHAPE);
    shapeElement.SetSize(newDimensions.width, newDimensions.height);
    shapeElement.SetScale(
      newDimensions.width / this.InitialGroupBounds.width,
      newDimensions.height / this.InitialGroupBounds.height
    );

    const slopElement = svgElement.GetElementByID(ConstantData.SVGElementClass.SLOP);
    slopElement.SetSize(newDimensions.width, newDimensions.height);

    this.LM_ResizeSVGTextObject(svgElement, resizeInfo, newDimensions);

    svgElement.SetRotation(rotation);
    this.UpdateDimensionLines(svgElement);

    console.log("S.GroupSymbol - Resize output:", offset);
    return offset;
  }

  CreateActionTriggers(svgDocument, triggerType, shapeOptions, actionRequest) {
    console.log("S.GroupSymbol - CreateActionTriggers input:", { svgDocument, triggerType, shapeOptions, actionRequest });
    const actionTriggers = this.BaseShape_CreateActionTriggers(svgDocument, triggerType, shapeOptions, actionRequest);
    console.log("S.GroupSymbol - CreateActionTriggers output:", actionTriggers);
    return actionTriggers;
  }

  BaseShape_CreateActionTriggers(svgDocument, triggerType, shapeOptions, actionRequest) {
    console.log("S.GroupSymbol - BaseShape_CreateActionTriggers input:", { svgDocument, triggerType, shapeOptions, actionRequest });

    // Define the list of resize cursors in a clockwise order starting from the top-left
    const resizeCursorList = [
      ConstantData2.CursorType.RESIZE_LT,
      ConstantData2.CursorType.RESIZE_T,
      ConstantData2.CursorType.RESIZE_RT,
      ConstantData2.CursorType.RESIZE_R,
      ConstantData2.CursorType.RESIZE_RB,
      ConstantData2.CursorType.RESIZE_B,
      ConstantData2.CursorType.RESIZE_LB,
      ConstantData2.CursorType.RESIZE_L
    ];

    if (GlobalData.optManager.Table_GetActiveID() === this.BlockID) {
      console.log("S.GroupSymbol - BaseShape_CreateActionTriggers output:", null);
      return null;
    }

    let actionTriggerGroup = svgDocument.CreateShape(ConstantData.CreateShapeType.GROUP);
    const knobSize = ConstantData.Defines.SED_KnobSize;
    const smallKnobSize = ConstantData.Defines.SED_RKnobSize;
    let useSideKnobs = ((this.extraflags & ConstantData.ExtraFlags.SEDE_SideKnobs) &&
      this.dataclass === ConstantData.SDRShapeTypes.SED_S_Poly) > 0;
    const minSidePointLength = ConstantData.Defines.MinSidePointLength;
    let docScale = svgDocument.docInfo.docToScreenScale;
    if (svgDocument.docInfo.docScale <= 0.5) {
      docScale *= 2;
    }
    const adjustedKnobSize = knobSize / docScale;
    const adjustedSmallKnobSize = smallKnobSize / docScale;
    let fillColor = 'black';
    const frame = this.Frame;
    let frameWidth = frame.width;
    let frameHeight = frame.height;
    frameWidth += adjustedKnobSize;
    frameHeight += adjustedKnobSize;

    // Calculate the group position by enlarging the frame by the knob size offset
    let groupPosition = $.extend(true, {}, frame);
    groupPosition.x -= adjustedKnobSize / 2;
    groupPosition.y -= adjustedKnobSize / 2;
    groupPosition.width += adjustedKnobSize;
    groupPosition.height += adjustedKnobSize;

    let rotationAngle = shapeOptions.GetRotation() + 22.5;
    if (rotationAngle >= 360) {
      rotationAngle = 0;
    }
    const rotationSector = Math.floor(rotationAngle / 45);
    let orderedCursorList = resizeCursorList.slice(rotationSector).concat(resizeCursorList.slice(0, rotationSector));

    // Determine which knobs should be enabled based on the object's grow behavior
    let allowGrow = true;
    let allowHorizontal = !useSideKnobs;
    let allowVertical = !useSideKnobs;
    switch (this.ObjGrow) {
      case ConstantData.GrowBehavior.HCONSTRAIN:
        allowGrow = false;
        allowVertical = false;
        break;
      case ConstantData.GrowBehavior.VCONSTRAIN:
        allowGrow = false;
        allowHorizontal = false;
        break;
      case ConstantData.GrowBehavior.PROPORTIONAL:
        allowGrow = true;
        allowHorizontal = false;
        allowVertical = false;
    }

    let knobProps = {
      svgDoc: svgDocument,
      shapeType: ConstantData.CreateShapeType.RECT,
      x: 0,
      y: 0,
      knobSize: adjustedKnobSize,
      fillColor: fillColor,
      fillOpacity: 1,
      strokeSize: 1,
      strokeColor: '#777777',
      locked: false
    };

    if (triggerType !== actionRequest) {
      knobProps.fillColor = 'white';
      knobProps.strokeSize = 1;
      knobProps.strokeColor = 'black';
      knobProps.fillOpacity = '0.0';
    }

    if (this.flags & ConstantData.ObjFlags.SEDO_Lock) {
      knobProps.fillColor = 'gray';
      knobProps.locked = true;
      useSideKnobs = false;
    } else if (this.NoGrow()) {
      knobProps.fillColor = 'red';
      useSideKnobs = false;
      knobProps.strokeColor = 'red';
      orderedCursorList = [
        ConstantData2.CursorType.DEFAULT,
        ConstantData2.CursorType.DEFAULT,
        ConstantData2.CursorType.DEFAULT,
        ConstantData2.CursorType.DEFAULT,
        ConstantData2.CursorType.DEFAULT,
        ConstantData2.CursorType.DEFAULT,
        ConstantData2.CursorType.DEFAULT,
        ConstantData2.CursorType.DEFAULT
      ];
    }

    // Add corner knobs if growing is allowed
    if (allowGrow) {
      knobProps.knobID = ConstantData.ActionTriggerType.TOPLEFT;
      knobProps.cursorType = orderedCursorList[0];
      let newKnob = this.GenericKnob(knobProps);
      actionTriggerGroup.AddElement(newKnob);

      knobProps.x = frameWidth - adjustedKnobSize;
      knobProps.y = 0;
      knobProps.cursorType = orderedCursorList[2];
      knobProps.knobID = ConstantData.ActionTriggerType.TOPRIGHT;
      newKnob = this.GenericKnob(knobProps);
      actionTriggerGroup.AddElement(newKnob);

      knobProps.x = frameWidth - adjustedKnobSize;
      knobProps.y = frameHeight - adjustedKnobSize;
      knobProps.cursorType = orderedCursorList[4];
      knobProps.knobID = ConstantData.ActionTriggerType.BOTTOMRIGHT;
      newKnob = this.GenericKnob(knobProps);
      actionTriggerGroup.AddElement(newKnob);

      knobProps.x = 0;
      knobProps.y = frameHeight - adjustedKnobSize;
      knobProps.cursorType = orderedCursorList[6];
      knobProps.knobID = ConstantData.ActionTriggerType.BOTTOMLEFT;
      newKnob = this.GenericKnob(knobProps);
      actionTriggerGroup.AddElement(newKnob);
    }

    // Add center top and bottom knobs if vertical growth is allowed
    if (allowVertical) {
      knobProps.x = frameWidth / 2 - adjustedKnobSize / 2;
      knobProps.y = 0;
      knobProps.cursorType = orderedCursorList[1];
      knobProps.knobID = ConstantData.ActionTriggerType.TOPCENTER;
      let centerKnob = this.GenericKnob(knobProps);
      actionTriggerGroup.AddElement(centerKnob);

      knobProps.x = frameWidth / 2 - adjustedKnobSize / 2;
      knobProps.y = frameHeight - adjustedKnobSize;
      knobProps.cursorType = orderedCursorList[5];
      knobProps.knobID = ConstantData.ActionTriggerType.BOTTOMCENTER;
      centerKnob = this.GenericKnob(knobProps);
      actionTriggerGroup.AddElement(centerKnob);
    }

    // Add left and right side knobs if horizontal growth is allowed
    if (allowHorizontal) {
      knobProps.x = 0;
      knobProps.y = frameHeight / 2 - adjustedKnobSize / 2;
      knobProps.cursorType = orderedCursorList[7];
      knobProps.knobID = ConstantData.ActionTriggerType.CENTERLEFT;
      let sideKnob = this.GenericKnob(knobProps);
      actionTriggerGroup.AddElement(sideKnob);

      knobProps.x = frameWidth - adjustedKnobSize;
      knobProps.y = frameHeight / 2 - adjustedKnobSize / 2;
      knobProps.cursorType = orderedCursorList[3];
      knobProps.knobID = ConstantData.ActionTriggerType.CENTERRIGHT;
      sideKnob = this.GenericKnob(knobProps);
      actionTriggerGroup.AddElement(sideKnob);
    }

    // Check for connector hook information and add icon if available
    const connectorInfo = (function (currentObject) {
      let hookInfo = null;
      if (currentObject.hooks.length) {
        const hookTarget = GlobalData.optManager.GetObjectPtr(currentObject.hooks[0].objid, false);
        if ((hookTarget && hookTarget.DrawingObjectBaseClass === ConstantData.DrawingObjectBaseClass.CONNECTOR) ||
          (hookTarget && hookTarget instanceof Instance.Shape.ShapeContainer)) {
          hookInfo = hookTarget.Pr_GetShapeConnectorInfo(currentObject.hooks[0]);
        }
      }
      return hookInfo;
    })(this);

    if (connectorInfo && connectorInfo.length) {
      const iconProps = {
        svgDoc: svgDocument,
        iconSize: 14,
        imageURL: null,
        iconID: 0,
        userData: 0,
        cursorType: 0
      };
      for (let i = 0, len = connectorInfo.length; i < len; i++) {
        if (connectorInfo[i].position === 'right') {
          iconProps.x = frameWidth - 14 - 1 - adjustedKnobSize;
        } else if (connectorInfo[i].position === 'bottom') {
          iconProps.y = frameHeight - 14 - 1 - adjustedKnobSize;
        } else {
          iconProps.x = adjustedKnobSize + 1;
          iconProps.y = adjustedKnobSize + 1;
        }
        iconProps.cursorType = connectorInfo[i].cursorType;
        iconProps.iconID = connectorInfo[i].knobID;
        iconProps.imageURL = connectorInfo[i].polyType === 'vertical' ?
          ConstantData.Defines.Connector_Move_Vertical_Path :
          ConstantData.Defines.Connector_Move_Horizontal_Path;
        iconProps.userData = connectorInfo[i].knobData;
        let newIcon = this.GenericIcon(iconProps);
        actionTriggerGroup.AddElement(newIcon);
        iconProps.x += 16;
      }
    }

    // If side knobs are enabled, add additional knobs along the polyline of the shape
    if (useSideKnobs) {
      let copyOfThis = Utils1.DeepCopy(this);
      copyOfThis.inside = $.extend(true, {}, copyOfThis.Frame);
      let polyPoints = GlobalData.optManager.ShapeToPolyLine(this.BlockID, false, true, copyOfThis)
        .GetPolyPoints(ConstantData.Defines.NPOLYPTS, true, true, false, []);
      if (polyPoints) {
        for (let k = 1, len = polyPoints.length; k < len; k++) {
          const deltaX = polyPoints[k].x - polyPoints[k - 1].x;
          const deltaY = polyPoints[k].y - polyPoints[k - 1].y;
          if (Utils2.sqrt(deltaX * deltaX + deltaY * deltaY) > minSidePointLength) {
            knobProps.cursorType = deltaX * deltaX > deltaY * deltaY ? ConstantData2.CursorType.RESIZE_TB : ConstantData2.CursorType.RESIZE_LR;
            knobProps.x = polyPoints[k - 1].x + deltaX / 2;
            knobProps.y = polyPoints[k - 1].y + deltaY / 2;
            let polyKnob = this.GenericKnob(knobProps);
            polyKnob.SetUserData(k);
            actionTriggerGroup.AddElement(polyKnob);
          }
        }
      }
    }

    // Add the rotate knob if rotation is enabled
    const disableRotation = this.NoRotate() || this.NoGrow() || GlobalData.optManager.bTouchInitiated || knobProps.locked;
    const isNarrow = frame.width < 44;
    let hasConnectorHook = this.hooks.length > 0;
    if (hasConnectorHook) {
      const hookObject = GlobalData.optManager.GetObjectPtr(this.hooks[0].objid, false);
      if (hookObject && hookObject.DrawingObjectBaseClass !== ConstantData.DrawingObjectBaseClass.CONNECTOR) {
        hasConnectorHook = false;
      }
    }

    if (!disableRotation && !isNarrow && !hasConnectorHook) {
      const isTextGrowHorizontal = this.TextGrow === ConstantData.TextGrowBehavior.HORIZONTAL &&
        (this.flags & ConstantData.ObjFlags.SEDO_TextOnly) &&
        SDF.TextAlignToWin(this.TextAlign).just === ConstantData2.TextJust.TA_LEFT;
      knobProps.shapeType = ConstantData.CreateShapeType.OVAL;
      knobProps.x = isTextGrowHorizontal ? frameWidth + adjustedSmallKnobSize : frameWidth - 3 * adjustedSmallKnobSize;
      knobProps.y = frameHeight / 2 - adjustedSmallKnobSize / 2;
      knobProps.cursorType = ConstantData2.CursorType.ROTATE;
      knobProps.knobID = ConstantData.ActionTriggerType.ROTATE;
      knobProps.fillColor = 'white';
      knobProps.fillOpacity = 0.001;
      knobProps.strokeSize = 1.5;
      knobProps.strokeColor = 'black';
      let rotateKnob = this.GenericKnob(knobProps);
      actionTriggerGroup.AddElement(rotateKnob);
    }

    // Create dimension adjustment knobs if applicable
    if (this.Dimensions & ConstantData.DimensionFlags.SED_DF_Standoff && this.CanUseStandOffDimensionLines()) {
      const svgElement = GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
      this.CreateDimensionAdjustmentKnobs(actionTriggerGroup, svgElement, knobProps);
    }

    actionTriggerGroup.SetSize(frameWidth, frameHeight);
    actionTriggerGroup.SetPos(groupPosition.x, groupPosition.y);
    actionTriggerGroup.isShape = true;
    actionTriggerGroup.SetID(ConstantData.Defines.Action + triggerType);

    console.log("S.GroupSymbol - BaseShape_CreateActionTriggers output:", actionTriggerGroup);
    return actionTriggerGroup;
  }

  // InsertNewTable(e, t, a) {
  //   return !1
  // }

  ContainsText(): boolean {
    console.log("S.GroupSymbol - ContainsText input:", {
      DataID: this.DataID,
      BlockID: this.BlockID,
      ShapesCount: this.ShapesInGroup.length
    });

    if (this.DataID >= 0) {
      console.log("S.GroupSymbol - ContainsText output:", false);
      return false;
    }

    if (GlobalData.optManager.SD_GetVisioTextChild(this.BlockID) >= 0) {
      console.log("S.GroupSymbol - ContainsText output:", false);
      return false;
    }

    for (let index = 0; index < this.ShapesInGroup.length; index++) {
      const shapeObject = GlobalData.optManager.GetObjectPtr(this.ShapesInGroup[index], false);
      if (shapeObject.ContainsText()) {
        console.log("S.GroupSymbol - ContainsText output:", true);
        return true;
      }
    }

    console.log("S.GroupSymbol - ContainsText output:", false);
    return false;
  }

  ConvertToNative(richGradients: any, enableVisio: boolean, shouldReturnBuffer: boolean) {
    console.log('S.GroupSymbol - ConvertToNative input:', { richGradients, enableVisio, shouldReturnBuffer });

    let preservedBlock: any;
    const result = new WResult();
    result.RichGradients = richGradients;

    const shapesCount = this.ShapesInGroup.length;
    if (shapesCount > 0) {
      for (let idx = 0; idx < shapesCount; idx++) {
        const shapeID = this.ShapesInGroup[idx];
        result.zList.push(shapeID);
        const shapeObj = GlobalData.optManager.GetObjectPtr(shapeID, false);
        shapeObj.layer = this.Layer;
        shapeObj.GetTextures(result.TextureList);
      }

      result.sdp = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, false);
      result.tLMB = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLayersManagerBlockID, false);
      result.ctp = GlobalData.optManager.theContentHeader;
      result.GroupOffset.x = 0;
      result.GroupOffset.y = 0;
      result.WriteGroupBlock = true;
      result.fontlist = GlobalData.optManager.theContentHeader.FontList;

      if (enableVisio) {
        result.WriteVisio = true;
      }

      GlobalData.docHandler.svgDoc.GetWorkArea();
      result.docDpi = GlobalData.docHandler.svgDoc.docInfo.docDpi;

      const buffer = SDF.WriteBuffer(result, true, true, true);
      if (shouldReturnBuffer === true) {
        console.log('S.GroupSymbol - ConvertToNative output:', buffer);
        return buffer;
      }

      let uint8Buffer: Uint8Array | null = null;
      if (buffer) {
        uint8Buffer = new Uint8Array(buffer);
        if (this.NativeID >= 0) {
          preservedBlock = GlobalData.objectStore.PreserveBlock(this.NativeID);
          if (preservedBlock) {
            preservedBlock.Data = uint8Buffer;
          }
        } else {
          preservedBlock = GlobalData.objectStore.CreateBlock(ConstantData.StoredObjectType.H_NATIVE_OBJECT, uint8Buffer);
          this.NativeID = preservedBlock.ID;
        }
      }
      console.log('S.GroupSymbol - ConvertToNative output:', { preservedBlock });
    } else {
      console.log('S.GroupSymbol - ConvertToNative output: No shapes in group');
    }
  }

  WriteSDFAttributes(writer, writeOptions) {
    console.log("S.GroupSymbol - WriteSDFAttributes input:", { writer, writeOptions });

    let numShapes: number, shapeObj: any, buffer: any, codeLength: any;
    let nativeStorageResult = new WResult();
    let dataId = this.DataID;

    // Modify dataId if text attachment flags are set and we are not writing blocks
    if ((this.TextFlags & ConstantData.TextFlags.SED_TF_AttachB ||
      this.TextFlags & ConstantData.TextFlags.SED_TF_AttachA) &&
      !writeOptions.WriteBlocks) {
      dataId = -1;
    }

    nativeStorageResult.RichGradients = GlobalData.optManager.RichGradients;

    SDF.WriteTextParams(writer, this, dataId, writeOptions);

    if (writeOptions.WriteBlocks) {
      SDF.WriteNativeID(writer, this.NativeID, writeOptions);
    } else if (this.NativeID && (numShapes = this.ShapesInGroup.length)) {
      for (let i = 0; i < numShapes; i++) {
        const shapeId = this.ShapesInGroup[i];
        nativeStorageResult.zList.push(shapeId);
        shapeObj = GlobalData.optManager.GetObjectPtr(shapeId, false);
        shapeObj.layer = this.Layer;
        shapeObj.GetTextures(nativeStorageResult.TextureList);
      }

      nativeStorageResult.sdp = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, false);
      nativeStorageResult.tLMB = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theLayersManagerBlockID, false);
      nativeStorageResult.ctp = GlobalData.optManager.theContentHeader;

      if (this.InitialGroupBounds.x > 0 || this.InitialGroupBounds.y > 0) {
        nativeStorageResult.GroupOffset.x = this.Frame.x + writeOptions.GroupOffset.x;
        nativeStorageResult.GroupOffset.y = this.Frame.y + writeOptions.GroupOffset.y;
      } else {
        nativeStorageResult.GroupOffset.x = writeOptions.GroupOffset.x;
        nativeStorageResult.GroupOffset.y = writeOptions.GroupOffset.y;
      }

      nativeStorageResult.WriteGroupBlock = writeOptions.WriteGroupBlock;
      nativeStorageResult.WriteVisio = writeOptions.WriteVisio;
      nativeStorageResult.WriteWin32 = writeOptions.WriteWin32;

      GlobalData.docHandler.svgDoc.GetWorkArea();
      nativeStorageResult.docDpi = GlobalData.docHandler.svgDoc.docInfo.docDpi;

      buffer = SDF.WriteBuffer(nativeStorageResult, true, true, true);
      codeLength = SDF.Write_CODE(writer, ConstantData2.SDROpCodesByName.SDF_C_NATIVESTORAGE);
      FileParser.write_nativebuffer(writer, buffer);
      SDF.Write_LENGTH(writer, codeLength);
    }

    console.log("S.GroupSymbol - WriteSDFAttributes output executed");
  }

  DeleteObject() {
    console.log("S.GroupSymbol - DeleteObject input: none");
    const shapesInGroup = this.ShapesInGroup;
    const count = shapesInGroup.length;
    for (let index = 0; index < count; index++) {
      const shapeObject = GlobalData.optManager.GetObjectPtr(shapesInGroup[index], false);
      if (shapeObject) {
        const storeObject = GlobalData.objectStore.GetObject(shapesInGroup[index]);
        shapeObject.DeleteObject();
        if (storeObject) {
          storeObject.Delete();
        }
      }
    }
    // ListManager.BaseDrawingObject.prototype.DeleteObject.call(this)
    // Double === TODO
    this.BaseDrawingObject_DeleteObject();
    console.log("S.GroupSymbol - DeleteObject output: deleted");
  }


  BaseDrawingObject_DeleteObject() {
    console.log("S.GroupSymbol - BaseDrawingObject_DeleteObject input: none");

    let currentObject = null;
    let hookObject = null;
    let tempHookElement = null;
    let hooksBackup = [];

    // Delete Table object if exists
    if (this.TableID !== -1) {
      let tablePointer = GlobalData.optManager.GetObjectPtr(this.TableID, true);
      if (tablePointer) {
        GlobalData.optManager.Table_DeleteObject(tablePointer);
      }
      currentObject = GlobalData.objectStore.GetObject(this.TableID);
      if (currentObject) {
        currentObject.Delete();
      }
    }

    // Delete Data object if exists
    if (this.DataID !== -1) {
      currentObject = GlobalData.objectStore.GetObject(this.DataID);
      if (currentObject) {
        currentObject.Delete();
      }
    }

    // Delete Note object if exists
    if (this.NoteID !== -1) {
      currentObject = GlobalData.objectStore.GetObject(this.NoteID);
      if (currentObject) {
        currentObject.Delete();
      }
    }

    // Delete Native object if exists
    if (this.NativeID !== -1) {
      currentObject = GlobalData.objectStore.GetObject(this.NativeID);
      if (currentObject) {
        currentObject.Delete();
      }
    }

    // Delete Gantt info object if exists
    if (this.GanttInfoID !== -1) {
      currentObject = GlobalData.objectStore.GetObject(this.GanttInfoID);
      if (currentObject) {
        currentObject.Delete();
      }
    }

    // Delete Blob bytes if exists and its URL if necessary
    if (this.BlobBytesID !== -1) {
      currentObject = GlobalData.objectStore.GetObject(this.BlobBytesID);
      if (currentObject) {
        currentObject.Delete();
      }
      if (GlobalData.optManager.IsBlobURL(this.ImageURL)) {
        GlobalData.optManager.DeleteURL(this.ImageURL);
      }
    }

    // Delete EMF Blob bytes if exists
    if (this.EMFBlobBytesID !== -1) {
      currentObject = GlobalData.objectStore.GetObject(this.EMFBlobBytesID);
      if (currentObject) {
        currentObject.Delete();
      }
    }

    // Delete Ole Blob bytes if exists
    if (this.OleBlobBytesID !== -1) {
      currentObject = GlobalData.objectStore.GetObject(this.OleBlobBytesID);
      if (currentObject) {
        currentObject.Delete();
      }
    }

    // Remove field data
    this.BaseDrawingObject_RemoveFieldData(true);

    // Update hooked object's dimension lines if applicable
    if (this.hooks.length) {
      hookObject = GlobalData.optManager.GetObjectPtr(this.hooks[0].objid, false);
      if (hookObject && hookObject.objecttype === ConstantData.ObjectTypes.SD_OBJT_FLOORPLAN_WALL && !(hookObject.Dimensions & ConstantData.DimensionFlags.SED_DF_HideHookedObjDimensions)) {
        hooksBackup = Utils1.DeepCopy(this.hooks);
        this.hooks = [];
        tempHookElement = GlobalData.optManager.svgObjectLayer.GetElementByID(hookObject.BlockID);
        hookObject.UpdateDimensionLines(tempHookElement);
        this.hooks = hooksBackup;
      }
    }

    // Delete Comment object if exists
    if (this.CommentID >= 0) {
      GlobalData.optManager.CommentObjectDelete(this);
    }

    console.log("S.GroupSymbol - BaseDrawingObject_DeleteObject output: executed");
  }

  BaseDrawingObject_RemoveFieldData(shouldRemove: boolean, fieldDataTableId?: number) {
    console.log("S.GroupSymbol - BaseDrawingObject_RemoveFieldData input:", { shouldRemove, fieldDataTableId });

    if (this.HasFieldData() && (!fieldDataTableId || this.fieldDataTableID === fieldDataTableId)) {
      // Retrieve the object pointer for the current BlockID (forcing load)
      GlobalData.optManager.GetObjectPtr(this.BlockID, true);

      if (shouldRemove) {
        if (this.fieldDataElemID < 0) {
          ListManager.SDData.DeleteFieldedDataTable(this.fieldDataTableID);
        } else {
          ListManager.SDData.FieldedDataDelRecord(this.fieldDataTableID, this.fieldDataElemID);
        }
      }

      // Reset field data properties
      this.fieldDataDatasetID = -1;
      this.fieldDataTableID = -1;
      this.fieldDataElemID = -1;
      this.dataStyleOverride = null;

      // Mark the Block as dirty so it gets refreshed
      GlobalData.optManager.AddToDirtyList(this.BlockID);

      // Refresh from field data
      this.BaseDrawingObject_RefreshFromFieldData();
    }

    console.log("S.GroupSymbol - BaseDrawingObject_RemoveFieldData output executed");
  }

  BaseDrawingObject_RefreshFromFieldData(tableId) {
    console.log('S.GroupSymbol - BaseDrawingObject_RefreshFromFieldData input:', { tableId });

    if (tableId && this.fieldDataTableID !== tableId) {
      console.log('S.GroupSymbol - BaseDrawingObject_RefreshFromFieldData output:', false);
      return false;
    }

    const hasFieldDataInText = this.HasFieldDataInText(tableId);
    const hasFieldDataRules = this.HasFieldDataRules(tableId);
    let needsRefresh = false;

    if (!hasFieldDataInText && !hasFieldDataRules) {
      console.log('S.GroupSymbol - BaseDrawingObject_RefreshFromFieldData output:', false);
      return false;
    }

    this.GetFieldDataStyleOverride();

    if (hasFieldDataInText) {
      this.ChangeTextAttributes(null, null, null, null, null, null, null, true);
      needsRefresh = true;
    }

    if (ListManager.SDData.FieldedDataHasRulesForRecord(this.fieldDataTableID, this.fieldDataElemID)) {
      GlobalData.optManager.AddToDirtyList(this.BlockID);
      needsRefresh = true;
    }

    console.log('S.GroupSymbol - BaseDrawingObject_RefreshFromFieldData output:', needsRefresh);
    return needsRefresh;
  }

  ApplyEffects(svgElement, isHighlighted, extraParam) {
    console.log("S.GroupSymbol - ApplyEffects input:", { svgElement, isHighlighted, extraParam });

    svgElement = svgElement || GlobalData.optManager.svgObjectLayer.GetElementByID(this.BlockID);
    if (!svgElement) {
      console.log("S.GroupSymbol - ApplyEffects output: No SVG element found");
      return;
    }

    if (!GlobalData.optManager.bDrawEffects || GlobalData.optManager.bTokenizeStyle) {
      console.log("S.GroupSymbol - ApplyEffects output: Global flags disable effects");
      return;
    }

    const targetElement = svgElement.shapeGroup || svgElement;
    const effectsList = [];
    let glowColor = null;
    let glowSize = 4;

    if (isHighlighted) {
      glowColor = '#FFD64A';
    } else if (this.collabGlowColor) {
      glowColor = this.collabGlowColor;
      glowSize = 6;
    } else if (this.dataStyleOverride && this.dataStyleOverride.glowColor) {
      glowColor = this.dataStyleOverride.glowColor;
    }

    if (glowColor) {
      effectsList.push({
        type: Effects.EffectType.GLOW,
        params: {
          color: glowColor,
          size: glowSize,
          asSecondary: true
        }
      });
      targetElement.Effects().SetEffects(effectsList, this.Frame);
      console.log("S.GroupSymbol - ApplyEffects output:", "Effects applied with glowColor", glowColor);
    } else {
      console.log("S.GroupSymbol - ApplyEffects output: No glow color configured");
    }
  }

  AllowTextEdit(): boolean {
    console.log("S.GroupSymbol - AllowTextEdit input:", {});
    const canEdit = Boolean(
      (this.TextFlags & ConstantData.TextFlags.SED_TF_AttachB) ||
      (this.TextFlags & ConstantData.TextFlags.SED_TF_AttachA) ||
      (this.TextFlags & ConstantData.TextFlags.SED_TF_AttachD) ||
      (this.DataID >= 0)
    );
    console.log("S.GroupSymbol - AllowTextEdit output:", canEdit);
    return canEdit;
  }

  RemoveFieldData(fieldKey, fieldValue) {
    console.log("S.GroupSymbol - RemoveFieldData input:", { fieldKey, fieldValue });
    ListManager.BaseSymbol.prototype.RemoveFieldData.call(this, fieldKey, fieldValue);
    const shapesList = this.ShapesInGroup;
    const totalShapes = shapesList.length;
    for (let i = 0; i < totalShapes; i++) {
      const shapeObject = GlobalData.optManager.GetObjectPtr(shapesList[i], false);
      if (shapeObject) {
        shapeObject.RemoveFieldData(fieldKey, fieldValue);
      }
    }
    console.log("S.GroupSymbol - RemoveFieldData output executed");
  }

  HasFieldDataInText(fieldData: any): boolean {
    console.log("S.GroupSymbol - HasFieldDataInText input:", { fieldData });

    const shapesInGroup = this.ShapesInGroup;
    const totalShapes = shapesInGroup.length;

    if (ListManager.BaseSymbol.prototype.HasFieldDataInText.call(this, fieldData)) {
      console.log("S.GroupSymbol - HasFieldDataInText output:", true);
      return true;
    }

    for (let index = 0; index < totalShapes; ++index) {
      const shapeObject = GlobalData.optManager.GetObjectPtr(shapesInGroup[index], false);
      if (shapeObject && shapeObject.HasFieldDataInText(fieldData)) {
        console.log("S.GroupSymbol - HasFieldDataInText output:", true);
        return true;
      }
    }

    console.log("S.GroupSymbol - HasFieldDataInText output:", false);
    return false;
  }

  HasFieldDataRules(criteria: any): boolean {
    console.log("S.GroupSymbol - HasFieldDataRules input:", { criteria });

    const shapesInGroup = this.ShapesInGroup;
    const shapesCount = shapesInGroup.length;

    if (ListManager.BaseSymbol.prototype.HasFieldDataRules.call(this, criteria)) {
      console.log("S.GroupSymbol - HasFieldDataRules output:", true);
      return true;
    }

    for (let index = 0; index < shapesCount; index++) {
      const shapeObject = GlobalData.optManager.GetObjectPtr(shapesInGroup[index], false);
      if (shapeObject && shapeObject.HasFieldDataRules(criteria)) {
        console.log("S.GroupSymbol - HasFieldDataRules output:", true);
        return true;
      }
    }

    console.log("S.GroupSymbol - HasFieldDataRules output:", false);
    return false;
  }

  HasFieldDataForTable(tableId: any): boolean {
    console.log("S.GroupSymbol - HasFieldDataForTable input:", { tableId });
    const groupShapes = this.ShapesInGroup;
    const totalShapes = groupShapes.length;

    // Check in base symbol first
    if (ListManager.BaseSymbol.prototype.HasFieldDataForTable.call(this, tableId)) {
      console.log("S.GroupSymbol - HasFieldDataForTable output:", true);
      return true;
    }

    // Check each shape in the group
    for (let index = 0; index < totalShapes; index++) {
      const shapeObj = GlobalData.optManager.GetObjectPtr(groupShapes[index], false);
      if (shapeObj && shapeObj.HasFieldDataForTable(tableId)) {
        console.log("S.GroupSymbol - HasFieldDataForTable output:", true);
        return true;
      }
    }

    console.log("S.GroupSymbol - HasFieldDataForTable output:", false);
    return false;
  }

  HasFieldDataRecord(fieldKey, fieldValue, recordId) {
    console.log("S.GroupSymbol - HasFieldDataRecord input:", { fieldKey, fieldValue, recordId });
    const shapesInGroup = this.ShapesInGroup;
    const totalShapes = shapesInGroup.length;

    if (ListManager.BaseSymbol.prototype.HasFieldDataRecord.call(this, fieldKey, fieldValue, recordId)) {
      console.log("S.GroupSymbol - HasFieldDataRecord output:", true);
      return true;
    }
    if (!recordId) {
      console.log("S.GroupSymbol - HasFieldDataRecord output:", false);
      return false;
    }
    for (let index = 0; index < totalShapes; ++index) {
      const shapeObject = GlobalData.optManager.GetObjectPtr(shapesInGroup[index], false);
      if (shapeObject && shapeObject.HasFieldDataRecord(fieldKey, fieldValue, recordId)) {
        console.log("S.GroupSymbol - HasFieldDataRecord output:", true);
        return true;
      }
    }
    console.log("S.GroupSymbol - HasFieldDataRecord output:", false);
    return false;
  }

  RefreshFromFieldData(fieldData) {
    console.log("S.GroupSymbol - refreshFromFieldData input:", fieldData);

    let needsRefresh = false;

    if (ListManager.BaseSymbol.prototype.RefreshFromFieldData.call(this, fieldData)) {
      needsRefresh = true;
    }

    if (this.HasFieldDataInText(fieldData)) {
      this.GetFieldDataStyleOverride();
      this.ChangeTextAttributes(null, null, null, null, null, null, null, true);
      needsRefresh = true;
    }

    if (this.HasFieldDataRules(fieldData)) {
      GlobalData.optManager.AddToDirtyList(this.BlockID);
      needsRefresh = true;
    }

    console.log("S.GroupSymbol - refreshFromFieldData output:", needsRefresh);
    return needsRefresh;
  }

  RemapDataFields(fieldData) {
    console.log("S.GroupSymbol - remapDataFields input:", fieldData);

    ListManager.BaseSymbol.prototype.RemapDataFields.call(this, fieldData);
    const shapesGroup = this.ShapesInGroup;
    for (let index = 0; index < shapesGroup.length; index++) {
      const shapeObject = GlobalData.optManager.GetObjectPtr(shapesGroup[index], false);
      if (shapeObject) {
        shapeObject.RemapDataFields(fieldData);
      }
    }

    console.log("S.GroupSymbol - remapDataFields output: completed");
  }

}

export default GroupSymbol;

