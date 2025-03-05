




import BaseSymbol from './Shape.BaseSymbol';

// import Utils2 from "../Helper/Utils2";
// import Utils3 from "../Helper/Utils3";
// import GPP from '../Data/Data.GlobalData'
// import Collab from '../Data/Collab'
// import FileParser from '../Data/FileParser'
// import EvtUtil from "../Event/Event.Default";
// import Resources from '../Data/Resources'
// import Element from "../Basic/Basic.Element";






import Element from '../Basic/Basic.Element';
import ConstantData from '../Data/ConstantData'


class BitmapSymbol extends BaseSymbol {






  constructor(e) {
    //'use strict';
    e = e || {};
    e.ShapeType = ConstantData.ShapeType.BITMAPSYMBOL;
    // const t = ListManager.BaseSymbol.apply(this, [e]);
    // if (t) return t;

    super(e);
  }


  // ListManager.BitmapSymbol.prototype = new ListManager.BaseSymbol,
  // ListManager.BitmapSymbol.prototype.constructor = ListManager.BitmapSymbol,
  CreateShape(e, t) {
    if (this.flags & ConstantData.ObjFlags.SEDO_NotVisible) return null;
    var a = e.CreateShape(Document.CreateShapeType.SHAPECONTAINER),
      r = e.CreateShape(Document.CreateShapeType.IMAGE);
    r.SetID(ConstantData.SVGElementClass.SHAPE);
    r.SetURL(this.SymbolURL);
    var i = (this.extraflags & ConstantData.ExtraFlags.SEDE_FlipHoriz) > 0,
      n = (this.extraflags & ConstantData.ExtraFlags.SEDE_FlipVert) > 0;
    i &&
      r.SetMirror(i),
      n &&
      r.SetFlip(n);
    var o = this.Frame;
    this.trect,
      this.StyleRecord;
    this.GetFieldDataStyleOverride();
    var s = o.width,
      l = o.height;
    return a.SetSize(s, l),
      a.SetPos(o.x, o.y),
      r.SetSize(s, l),
      a.AddElement(r),
      a.isShape = !0,
      - 1 != this.DataID &&
      this.LM_AddSVGTextObject(e, a),
      a
  }
}

export default BitmapSymbol;
