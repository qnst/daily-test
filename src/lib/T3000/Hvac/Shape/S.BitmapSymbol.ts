

import BaseSymbol from './S.BaseSymbol'
import NvConstant from '../Data/Constant/NvConstant'
import OptConstant from '../Data/Constant/OptConstant';

class BitmapSymbol extends BaseSymbol {

  /**
   * Creates a new bitmap symbol instance
   * @param options - Configuration options for the bitmap symbol
   */
  constructor(options = {}) {
    options.ShapeType = OptConstant.ShapeType.BitmapSymbol;

    super(options);
  }

  /**
   * Creates the visual representation of the bitmap symbol
   * @param drawingContext - The context used to create and manipulate shapes
   * @returns The container shape with the bitmap symbol or null if not visible
   */
  CreateShape(drawingContext) {
    if (this.flags & NvConstant.ObjFlags.NotVisible) {
      return null;
    }

    const containerShape = drawingContext.CreateShape(OptConstant.CSType.ShapeContainer);
    const imageShape = drawingContext.CreateShape(OptConstant.CSType.Image);

    imageShape.SetID(OptConstant.SVGElementClass.Shape);
    imageShape.SetURL(this.SymbolURL);

    const isFlippedHorizontally = (this.extraflags & OptConstant.ExtraFlags.FlipHoriz) > 0;
    const isFlippedVertically = (this.extraflags & OptConstant.ExtraFlags.FlipVert) > 0;

    if (isFlippedHorizontally) {
      imageShape.SetMirror(isFlippedHorizontally);
    }
    if (isFlippedVertically) {
      imageShape.SetFlip(isFlippedVertically);
    }

    const frame = this.Frame;
    this.GetFieldDataStyleOverride();

    const width = frame.width;
    const height = frame.height;

    containerShape.SetSize(width, height);
    containerShape.SetPos(frame.x, frame.y);
    imageShape.SetSize(width, height);
    containerShape.AddElement(imageShape);
    containerShape.isShape = true;

    if (this.DataID !== -1) {
      this.LM_AddSVGTextObject(drawingContext, containerShape);
    }

    return containerShape;
  }
}

export default BitmapSymbol
