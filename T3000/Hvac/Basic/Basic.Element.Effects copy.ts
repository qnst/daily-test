



// import SDJS from "../SDJS/SDJS.Index";
// import SDUI from "../SDUI/SDUI.Index";
// import Basic from "./Basic.Index";
// import GPP from "../gListManager";
import $ from 'jquery';
import HvacSVG from "../Helper/SVG.t2"

import Global from "./Basic.Global";

import Document from "./Basic.Document";
import Utils1 from "../Helper/Utils1"
import Utils2 from "../Helper/Utils2"
import Utils3 from "../Helper/Utils3"

import ConstantData from "../Data/ConstantData"


class Effects {

  public element: any;
  public curBounds: any;

  constructor(e) {
    //'use strict';
    this.element = e,
      this.curBounds = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }
  }

  SetEffects(e, t) {
    //'use strict';
    var a,
      r = this.GetEffectsID(e, !1),
      i = [],
      n = Effects.EffectSize.DEFAULT,
      o = Effects.EffectSize.DEFAULT,
      s = !1,
      l = 0,
      S = 0;
    for (
      e &&
      (S = e.length || 0),
      t = t ||
      this.curBounds,
      this.curBounds = t,
      t &&
      (
        n = t.width < 500 ? Effects.EffectSize.SMALL : t.width < 1500 ? Effects.EffectSize.MEDIUM : t.width < 3000 ? Effects.EffectSize.LARGE : Effects.EffectSize.GIANT,
        o = t.height < 500 ? Effects.EffectSize.SMALL : t.height < 1500 ? Effects.EffectSize.MEDIUM : t.height < 3000 ? Effects.EffectSize.LARGE : Effects.EffectSize.GIANT
      ),
      a = 0;
      a < S;
      a++
    ) Effects.IsSecondaryEffect(e[a]) ? i.push(e[a]) : l++;
    if (
      l &&
      !this.FilterLimitNeeded(t, n, o) ||
      (
        this.element.svgObj.node.removeAttribute('filter'),
        this.element.svgObj.attr.filter &&
        delete this.element.svgObj.filter,
        s = !0
      ),
      !i.length &&
      this.element.externalEffects
    ) {
      for (a = 0; a < this.element.externalEffects.length; a++) this.element.parent.RemoveElement(this.element.externalEffects[a], !0);
      this.element.externalEffects = null
    }
    if (!s || i.length) {
      if (r += n.id + o.id, !s) {
        if (!this.element.doc.DefExists(r)) {
          var c,
            u,
            p = new HvacSVG.Container(HvacSVG.create('filter')),
            d = 'SourceGraphic',
            D = [];
          for (
            p.attr('id', r),
            p.attr('x', - n.pct),
            p.attr('y', - o.pct),
            p.attr('width', 1 + 2 * n.pct),
            p.attr('height', 1 + 2 * o.pct),
            a = 0;
            a < S;
            a++
          ) e[a].type.inside &&
            this.DefineEffect(p, e[a].type, e[a].params, d, 'sourceEffect') &&
            (d = 'sourceEffect');
          for (a = 0; a < S; a++) e[a].type.outside &&
            (
              e[a].type.id == Effects.EffectType.CASTSHADOW.id ||
                e[a].type.id == Effects.EffectType.REFLECT.id ? extraEffect = e[a] : (
                c = 'oEffect' + a,
                this.DefineEffect(p, e[a].type, e[a].params, d, c) &&
                D.push(c)
              )
            );
          for (
            h = new HvacSVG.Container(HvacSVG.create('feMerge')),
            S = D.length,
            a = 0;
            a < S;
            a++
          ) (u = new HvacSVG.Element(HvacSVG.create('feMergeNode'))).attr('in', D[a]),
            h.add(u);
          (u = new HvacSVG.Element(HvacSVG.create('feMergeNode'))).attr('in', d),
            h.add(u),
            p.add(h),
            this.element.doc.Defs().add(p)
        }
        this.element.SetEffect(r)
      }
      if (i.length) {
        var g,
          h;
        for (a = 0; a < i.length; a++) (g = i[a]).effectID = this.GetEffectsID([g], !0);
        if (this.element.externalEffects) for (a = this.element.externalEffects.length - 1; a >= 0; a--) {
          r = (h = this.element.externalEffects[a]).GetID();
          for (var m = 0; m < i.length; m++) if (r == (g = i[m]).effectID) {
            g.elem = h;
            break
          }
          this.element.parent.RemoveElement(this.element.externalEffects[a], !0)
        }
        for (this.element.externalEffects = [], a = 0; a < i.length; a++) (h = (g = i[a]).elem) ||
          (h = this.CreateSecondaryEffectElement(g, t, n, o)).SetID(g.effectID),
          h &&
          (
            this.element.externalEffects.push(h),
            this.element.parent.AddElement(h, a, !0)
          )
      }
    }
  }

  CreateSecondaryEffectElement(e, t, a, r) {
    //'use strict';
    var i;
    if (Effects.IsSecondaryEffect(e)) return (
      i = this.element.doc.CreateShape(Document.CreateShapeType.SHAPECOPY)
    ) &&
      (
        i.SetElementSource(this.element),
        i.Effects().SetSecondaryEffect(e, t, a, r),
        i.svgObj.attr('sfx', 1)
      ),
      i
  }

  SetSecondaryEffect(e, t, a, r) {
    //'use strict';
    var i,
      n,
      o,
      s,
      l,
      S,
      c = 's' + this.GetEffectsID([e], !0);
    if (Effects.IsSecondaryEffect(e)) if (
      e.type.id != Effects.EffectType.REFLECT.id &&
      e.type.id != Effects.EffectType.CASTSHADOW.id ||
      (
        n = (i = Math.abs(e.params.yOff)) / t.height,
        e.params.yOff > 0 ? (n = - n, o = t.height + i) : o = t.height - i,
        s = Math.max(- i, 2 * e.params.xOff),
        l = (s = Math.min(s, i)) / i * 45,
        s = i / Math.tan((90 - l) * Math.PI / 180),
        this.element.svgObj.size(t.width, t.height),
        S = 'translate(' + s + ',' + o + ') skewX(' + l + ') scale(1,' + n + ')',
        this.element.svgObj.attr('transform', S),
        e.type.id != Effects.EffectType.REFLECT.id
      )
    ) {
      if (c += a.id + r.id, !this.element.doc.DefExists(c)) {
        var u = new HvacSVG.Container(HvacSVG.create('filter'));
        u.attr('id', c),
          u.attr('x', - a.pct),
          u.attr('y', - r.pct),
          u.attr('width', 1 + 2 * a.pct),
          u.attr('height', 1 + 2 * r.pct),
          this.curBounds = t,
          e.type.id == Effects.EffectType.CASTSHADOW.id ? this.DefineCastShadow(u, e.params, 'SourceAlpha', '') : e.type.id == Effects.EffectType.REFLECT.id ? this.DefineReflect(u, e.params, 'SourceGraphic', '') : e.type.id == Effects.EffectType.DROPSHADOW.id ? this.DefineDropShadow(u, e.params, 'SourceAlpha', '') : e.type.id == Effects.EffectType.GLOW.id &&
            this.DefineGlow(u, e.params, 'SourceAlpha', ''),
          this.element.doc.Defs().add(u)
      }
      this.element.SetEffect(c)
    } else this.element.svgObj.attr('opacity', 0.4)
  }

  static CalcSecondaryEffectOffset(e, t) {
    //'use strict';
    var a,
      r;
    return a = Math.abs(t),
      e = Math.max(- a, 2 * e),
      r = (e = Math.min(e, a)) / a * 45,
      a / Math.tan((90 - r) * Math.PI / 180)
  }

  ClearEffects() {
    //'use strict';
    this.SetEffects()
  }

  FilterLimitNeeded(e, t, a) {
    //'use strict';
    if (!e || 'Safari' !== Utils2.BrowserDetect.browser) return !1;
    var r = this.element.doc.GetWorkArea(),
      i = 1 + 2 * t.pct,
      n = 1 + 2 * a.pct,
      o = e.width * r.docToScreenScale * i,
      s = e.height * r.docToScreenScale * n;
    return o > 4096 ||
      s > 4096
  }

  static IsSecondaryEffect(e) {
    return !(!e || !e.type) &&
      (
        e.params.asSecondary ||
        e.type.id == Effects.EffectType.CASTSHADOW.id ||
        e.type.id == Effects.EffectType.REFLECT.id
      )
  }

  GetEffectsID(e, t) {
    //'use strict';
    var a,
      r = 'FX',
      i = 0,
      n = 0,
      o = e &&
        e.length ||
        0;
    if (!o) return r += '_NONE';
    for (t = t || !1, a = 0; a < o; a++) if (e[a].type.outside) {
      if (Effects.IsSecondaryEffect(e[a]) != t) continue;
      r += '_' + e[a].type.id,
        void 0 !== e[a].params.xOff &&
        (r += '.' + e[a].params.xOff),
        void 0 !== e[a].params.yOff &&
        (r += '.' + e[a].params.yOff),
        void 0 !== e[a].params.size &&
        (r += '.' + e[a].params.size),
        void 0 !== e[a].params.color &&
        (r += e[a].params.color),
        i++
    }
    for (a = 0; a < o; a++) e[a].type.inside &&
      (
        r += '_' + e[a].type.id,
        void 0 !== e[a].params.size &&
        (r += '.' + e[a].params.size),
        void 0 !== e[a].params.type &&
        (r += '.' + e[a].params.type),
        void 0 !== e[a].params.dir &&
        (r += '.' + e[a].params.dir),
        void 0 !== e[a].params.color &&
        (r += e[a].params.color),
        n++
      );
    return i ||
      n ||
      (r += '_NONE'),
      r
  }


  DefineEffect(e, t, a, r, i) {
    //'use strict';
    switch (t.id) {
      case Effects.EffectType.DROPSHADOW.id:
        this.DefineDropShadow(e, a, r, i);
        break;
      case Effects.EffectType.CASTSHADOW.id:
        this.DefineCastShadow(e, a, r, i);
        break;
      case Effects.EffectType.REFLECT.id:
        this.DefineReflect(e, a, r, i);
        break;
      case Effects.EffectType.GLOW.id:
        this.DefineGlow(e, a, r, i);
        break;
      case Effects.EffectType.BEVEL.id:
        this.DefineBevel(e, a, r, i);
        break;
      case Effects.EffectType.GLOSS.id:
        this.DefineGloss(e, a, r, i);
        break;
      case Effects.EffectType.INNERGLOW.id:
        this.DefineInnerGlow(e, a, r, i);
        break;
      case Effects.EffectType.INNERSHADOW.id:
        this.DefineInnerShadow(e, a, r, i);
        break;
      case Effects.EffectType.RECOLOR.id:
        this.DefineRecolor(e, a, r, i);
        break;
      default:
        return !1
    }
    return !0
  }

  DefineDropShadow(e, t, a, r) {
    //'use strict';
    var i,
      n = t.xOff ||
        0,
      o = t.yOff ||
        0,
      s = t.color ||
        '#000',
      l = t.size ||
        2;
    (i = new HvacSVG.Element(HvacSVG.create('feFlood'))).attr('flood-color', s),
      i.attr('flood-opacity', 0.3),
      i.attr('result', 'flood'),
      e.add(i),
      (i = new HvacSVG.Element(HvacSVG.create('feComposite'))).attr('in', 'flood'),
      i.attr('in2', 'SourceAlpha'),
      i.attr('operator', 'in'),
      i.attr('result', 'mask'),
      e.add(i),
      (i = new HvacSVG.Element(HvacSVG.create('feGaussianBlur'))).attr('in', 'mask'),
      i.attr('stdDeviation', l),
      e.add(i),
      (i = new HvacSVG.Element(HvacSVG.create('feOffset'))).attr('dx', n),
      i.attr('dy', o),
      i.attr('result', r),
      e.add(i)
  }

  DefineCastShadow(e, t, a, r) {
    //'use strict';
    t.xOff,
      t.yOff;
    var i,
      n = t.size ||
        2;
    (i = new HvacSVG.Element(HvacSVG.create('feFlood'))).attr('flood-color', '#FFF'),
      i.attr('flood-opacity', 0.3),
      i.attr('result', 'flood'),
      e.add(i),
      (i = new HvacSVG.Element(HvacSVG.create('feComposite'))).attr('in2', 'flood'),
      i.attr('in', 'SourceAlpha'),
      i.attr('operator', 'in'),
      i.attr('result', 'mask'),
      e.add(i),
      (i = new HvacSVG.Element(HvacSVG.create('feGaussianBlur'))).attr('in', 'mask'),
      i.attr('stdDeviation', n),
      e.add(i)
  }

  DefineReflect(e, t, a, r) {
    //'use strict';
    var i;
    (i = new HvacSVG.Element(HvacSVG.create('feFlood'))).attr('flood-color', '#FFF'),
      i.attr('flood-opacity', 0.3),
      i.attr('result', 'flood'),
      e.add(i),
      (i = new HvacSVG.Element(HvacSVG.create('feComposite'))).attr('in2', 'flood'),
      i.attr('in', a),
      i.attr('operator', 'in'),
      i.attr('result', 'mask'),
      r &&
      i.attr('result', r),
      e.add(i)
  }

  DefineGlow(e, t, a, r) {
    //'use strict';
    var i,
      n = t.color ||
        '#fff',
      o = t.size ||
        2;
    (i = new HvacSVG.Element(HvacSVG.create('feFlood'))).attr('flood-color', n),
      i.attr('result', 'flood'),
      e.add(i),
      (i = new HvacSVG.Element(HvacSVG.create('feComposite'))).attr('in', 'flood'),
      i.attr('in2', 'SourceAlpha'),
      i.attr('operator', 'in'),
      i.attr('result', 'mask'),
      e.add(i),
      (i = new HvacSVG.Element(HvacSVG.create('feGaussianBlur'))).attr('in', 'mask'),
      i.attr('stdDeviation', o),
      i.attr('result', r),
      e.add(i)
  }

  DefineBevel(e, t, a, r) {
    //'use strict';
    var i,
      n,
      o = t.size ||
        1,
      s = 6,
      l = 0;
    switch (t.dir || Effects.FilterDirection.LEFTTOP) {
      case Effects.FilterDirection.RIGHT:
        l = 0;
        break;
      case Effects.FilterDirection.RIGHTBOTTOM:
        l = 45;
        break;
      case Effects.FilterDirection.BOTTOM:
        l = 90;
        break;
      case Effects.FilterDirection.LEFTBOTTOM:
        l = 135;
        break;
      case Effects.FilterDirection.LEFT:
        l = 180;
        break;
      case Effects.FilterDirection.LEFTTOP:
        l = 225;
        break;
      case Effects.FilterDirection.TOP:
        l = 270;
        break;
      case Effects.FilterDirection.RIGHTTOP:
        l = 315
    }
    t.type == Effects.BevelType.HARD &&
      (s = 20),
      t.type == Effects.BevelType.BUMP ? (
        (i = new HvacSVG.Element(HvacSVG.create('feMorphology'))).attr({
          in: 'SourceAlpha',
          operator: 'erode',
          radius: o
        }),
        e.add(i),
        (i = new HvacSVG.Element(HvacSVG.create('feGaussianBlur'))).attr({
          stdDeviation: o,
          result: 'blur'
        }),
        e.add(i),
        (i = new HvacSVG.Element(HvacSVG.create('feComposite'))).attr({
          in: 'blur',
          in2: 'SourceAlpha',
          operator: 'arithmetic',
          k2: '-1',
          k3: '1',
          result: 'inner'
        }),
        e.add(i),
        (i = new HvacSVG.Element(HvacSVG.create('feComposite'))).attr({
          in: 'blur',
          in2: 'inner',
          operator: 'in'
        }),
        e.add(i)
      ) : (
        (i = new HvacSVG.Element(HvacSVG.create('feGaussianBlur'))).attr({
          in: 'SourceAlpha',
          stdDeviation: o
        }),
        e.add(i),
        (i = new HvacSVG.Element(HvacSVG.create('feComposite'))).attr({
          in2: 'SourceAlpha',
          operator: 'in'
        }),
        e.add(i)
      ),
      (i = new HvacSVG.Container(HvacSVG.create('feDiffuseLighting'))).attr({
        surfaceScale: s,
        'lighting-color': 'white',
        diffuseConstant: '1',
        result: 'hilite'
      }),
      (n = new HvacSVG.Element(HvacSVG.create('feDistantLight'))).attr({
        azimuth: l,
        elevation: '40'
      }),
      i.add(n),
      e.add(i),
      (i = new HvacSVG.Element(HvacSVG.create('feComposite'))).attr({
        in: a,
        in2: 'hilite',
        k1: 1.5,
        operator: 'arithmetic',
        result: r
      }),
      e.add(i)
  }

  DefineGloss(e, t, a, r) {
    //'use strict';
    var i,
      n,
      o = t.size ||
        2,
      s = t.dir ||
        Effects.FilterDirection.LEFTTOP,
      l = t.type ||
        Effects.GlossType.SOFT,
      S = t.color ||
        '#ffffff',
      c = 1,
      u = 0;
    switch (s) {
      case Effects.FilterDirection.RIGHT:
        u = 0;
        break;
      case Effects.FilterDirection.RIGHTBOTTOM:
        u = 45;
        break;
      case Effects.FilterDirection.BOTTOM:
        u = 90;
        break;
      case Effects.FilterDirection.LEFTBOTTOM:
        u = 135;
        break;
      case Effects.FilterDirection.LEFT:
        u = 180;
        break;
      case Effects.FilterDirection.LEFTTOP:
        u = 225;
        break;
      case Effects.FilterDirection.TOP:
        u = 270;
        break;
      case Effects.FilterDirection.RIGHTTOP:
        u = 315
    }
    l == Effects.GlossType.HARD &&
      (c = 1.2),
      o /= 4,
      o = Math.max(Math.min(o, 20), 2),
      (i = new HvacSVG.Element(HvacSVG.create('feGaussianBlur'))).attr({
        in: 'SourceAlpha',
        stdDeviation: o
      }),
      e.add(i),
      (i = new HvacSVG.Element(HvacSVG.create('feComposite'))).attr({
        in2: 'SourceAlpha',
        operator: 'in'
      }),
      e.add(i),
      (i = new HvacSVG.Container(HvacSVG.create('feSpecularLighting'))).attr({
        surfaceScale: 20,
        'lighting-color': 'white',
        specularConstant: c,
        specularExponent: 2,
        result: 'hilite'
      }),
      (n = new HvacSVG.Element(HvacSVG.create('feDistantLight'))).attr({
        azimuth: u,
        elevation: '40'
      }),
      i.add(n),
      e.add(i),
      (i = new HvacSVG.Element(HvacSVG.create('feFlood'))).attr({
        'flood-color': S,
        'flood-opacity': 0.7
      }),
      e.add(i),
      (i = new HvacSVG.Element(HvacSVG.create('feComposite'))).attr({
        in2: 'SourceAlpha',
        operator: 'in',
        result: 'flood'
      }),
      e.add(i),
      (i = new HvacSVG.Element(HvacSVG.create('feComposite'))).attr({
        in: 'hilite',
        in2: 'flood',
        k1: 1.5,
        operator: 'arithmetic'
      }),
      e.add(i),
      (i = new HvacSVG.Element(HvacSVG.create('feBlend'))).attr({
        in2: a,
        mode: 'lighten',
        result: r
      }),
      e.add(i)
  }


  DefineInnerGlow(e, t, a, r) {
    //'use strict';
    var i,
      n = t.color ||
        '#fff',
      o = t.size ||
        0;
    (i = new HvacSVG.Element(HvacSVG.create('feGaussianBlur'))).attr({
      in: 'SourceAlpha',
      stdDeviation: o
    }),
      e.add(i),
      (i = new HvacSVG.Element(HvacSVG.create('feComposite'))).attr({
        in2: 'SourceAlpha',
        operator: 'arithmetic',
        k2: '-1',
        k3: '1',
        result: 'shadowdiff'
      }),
      e.add(i),
      (i = new HvacSVG.Element(HvacSVG.create('feFlood'))).attr({
        'flood-color': n,
        'flood-opacity': 1
      }),
      e.add(i),
      (i = new HvacSVG.Element(HvacSVG.create('feComposite'))).attr({
        in2: 'shadowdiff',
        operator: 'in'
      }),
      e.add(i),
      (i = new HvacSVG.Element(HvacSVG.create('feComposite'))).attr({
        in2: a,
        operator: 'over',
        result: r
      }),
      e.add(i)
  }

  DefineInnerShadow(e, t, a, r) {
    //'use strict';
    var i,
      n = t.dir ||
        Effects.FilterDirection.LEFTTOP,
      o = t.size ||
        0,
      s = 0,
      l = 0;
    switch (n) {
      case Effects.FilterDirection.RIGHT:
        s = - o,
          l = 0;
        break;
      case Effects.FilterDirection.RIGHTBOTTOM:
        s = - o,
          l = - o;
        break;
      case Effects.FilterDirection.BOTTOM:
        s = 0,
          l = - o;
        break;
      case Effects.FilterDirection.LEFTBOTTOM:
        s = o,
          l = - o;
        break;
      case Effects.FilterDirection.LEFT:
        s = o,
          l = 0;
        break;
      case Effects.FilterDirection.LEFTTOP:
        s = o,
          l = o;
        break;
      case Effects.FilterDirection.TOP:
        s = 0,
          l = o;
        break;
      case Effects.FilterDirection.RIGHTTOP:
        s = - o,
          l = o
    }(i = new HvacSVG.Element(HvacSVG.create('feGaussianBlur'))).attr({
      in: 'SourceAlpha',
      stdDeviation: o
    }),
      e.add(i),
      (i = new HvacSVG.Element(HvacSVG.create('feOffset'))).attr({
        dx: s,
        dy: l
      }),
      e.add(i),
      (i = new HvacSVG.Element(HvacSVG.create('feComposite'))).attr({
        in2: 'SourceAlpha',
        operator: 'arithmetic',
        k2: '-1',
        k3: '1',
        result: 'shadowdiff'
      }),
      e.add(i),
      (i = new HvacSVG.Element(HvacSVG.create('feFlood'))).attr({
        'flood-color': 'black',
        'flood-opacity': 1
      }),
      e.add(i),
      (i = new HvacSVG.Element(HvacSVG.create('feComposite'))).attr({
        in2: 'shadowdiff',
        operator: 'in'
      }),
      e.add(i),
      (i = new HvacSVG.Element(HvacSVG.create('feComposite'))).attr({
        in2: a,
        operator: 'over',
        result: r
      }),
      e.add(i)
  }




  DefineRecolor(e, t, a, r) {
    //'use strict';
    var i,
      n = t.color ||
        '000000';
    (i = new HvacSVG.Element(HvacSVG.create('feFlood'))).attr({
      'flood-color': n,
      'flood-opacity': 1
    }),
      e.add(i),
      (i = new HvacSVG.Element(HvacSVG.create('feComposite'))).attr({
        in2: 'SourceAlpha',
        operator: 'in',
        result: r
      }),
      e.add(i)
  }



  static EffectType = {
    DROPSHADOW: {
      id: 'SHD',
      outside: !0
    },
    CASTSHADOW: {
      id: 'SHC',
      outside: !0
    },
    GLOW: {
      id: 'GLW',
      outside: !0
    },
    REFLECT: {
      id: 'REFL',
      outside: !0
    },
    BEVEL: {
      id: 'BVL',
      inside: !0
    },
    GLOSS: {
      id: 'GLOSS',
      inside: !0
    },
    INNERGLOW: {
      id: 'IGLW',
      inside: !0
    },
    INNERSHADOW: {
      id: 'ISHD',
      inside: !0
    },
    RECOLOR: {
      id: 'RCLR',
      inside: !0
    }
  }

  // Object.freeze(Effects.EffectType),
  static FilterDirection = {
    LEFT: 'L',
    LEFTTOP: 'LT',
    TOP: 'T',
    RIGHTTOP: 'RT',
    RIGHT: 'R',
    RIGHTBOTTOM: 'RB',
    BOTTOM: 'B',
    LEFTBOTTOM: 'LB',
    CENTER: 'C'
  }

  // Object.freeze(Element.Effects.FilterDirection),
  static BevelType = {
    HARD: 'H',
    SOFT: 'S',
    BUMP: 'B'
  }

  // Object.freeze(Element.Effects.BevelType),
  static GlossType = {
    HARD: 'H',
    SOFT: 'S'
  }

  // Object.freeze(Element.Effects.GlossType),
  static EffectSize = {
    DEFAULT: {
      id: 'D',
      pct: 0.1
    },
    SMALL: {
      id: 'S',
      pct: 0.5
    },
    MEDIUM: {
      id: 'M',
      pct: 0.25
    },
    LARGE: {
      id: 'L',
      pct: 0.1
    },
    GIANT: {
      id: 'G',
      pct: 0.05
    }
  }

  // Object.freeze(Element.Effects.EffectSize)


}

export default Effects







// export default Basic.Element;
