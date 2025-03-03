

import Utils2 from "../../Helper/Utils2"
import Point from "../../Model/Point";

import ConstantData from '../../Data/ConstantData'


class PolygonShapeGenerator {

  constructor() {

  }


  static SED_S_Pgm(e, t) {
    return (t /= e.width) > 1 &&
      (t = 1),
      [
        {
          x: t,
          y: 0
        },
        {
          x: 1,
          y: 0
        },
        {
          x: 1 - t,
          y: 1
        },
        {
          x: 0,
          y: 1
        },
        {
          x: t,
          y: 0
        }
      ]
  }

  static SED_S_Diam(e, t) {
    return [{
      x: 0.5,
      y: 0
    },
    {
      x: 1,
      y: 0.5
    },
    {
      x: 0.5,
      y: 1
    },
    {
      x: 0,
      y: 0.5
    },
    {
      x: 0.5,
      y: 0
    }
    ]
  }

  static SED_S_Doc(e, t) {
    var a = [],
      r = e.width,
      i = e.height,
      n = t;
    n -= 0,
      a.push({
        x: 0,
        y: (i - n) / i
      }),
      a.push({
        x: 0,
        y: (i - n) / i
      }),
      a.length = 85,
      a[84] = {
        x: 0,
        y: (i - n) / i
      },
      a[1] = {
        x: 0,
        y: 0
      },
      a[2] = {
        x: 1,
        y: 0
      },
      a[3] = {
        x: 1,
        y: (i - n - 0) / i
      };
    for (var o, s, l, S = r / 4, c = n, u = 2 * S / 40, p = 1; p <= 40; p++) o = r - (l = u * p),
      l = (S - l) / S,
      s = i - n - 0 - Math.sqrt(1 - l * l) * c,
      a[p + 3] = {
        x: o / r,
        y: s / i
      };
    for (u = 2 * S / 40, p = 1; p <= 40; p++) o = r - ((l = u * p) + 2 * S),
      l = (S - l) / S,
      s = i - n + Math.sqrt(1 - l * l) * c,
      a[p + 43] = {
        x: o / r,
        y: s / i
      };
    return a
  }

  static SED_S_Term(e, t) {
    var a,
      r,
      i = [],
      n = e.width,
      o = e.height;
    return (a = Math.floor(o / 2)) > n / 2 &&
      (a = Math.floor(n / 2)),
      r = {
        left: 0,
        top: 0,
        right: a,
        bottom: 2 * a
      },
      i = Utils2.PolyYCurve(i, r, 40, 0, 0, 0, a, !0, n, o),
      r = {
        left: 0,
        top: o - 2 * a,
        right: a,
        bottom: o
      },
      i = Utils2.PolyYCurve(i, r, 40, 0, 0, a, 0, !0, n, o),
      r = {
        left: n - a,
        top: o,
        right: n,
        bottom: o - 2 * a
      },
      i = Utils2.PolyYCurve(i, r, 40, 0, 0, 0, - a, !1, n, o),
      r = {
        left: n - a,
        top: 2 * a,
        right: n,
        bottom: 0
      },
      (i = Utils2.PolyYCurve(i, r, 40, 0, 0, - a, 0, !1, n, o)).push(new Point(i[0].x, i[0].y)),
      i
  }

  static SED_S_ArrR(e, t) {
    return (t /= e.width) > 1 &&
      (t = 1),
      [
        {
          x: 0,
          y: 0.15
        },
        {
          x: 1 - t,
          y: 0.15
        },
        {
          x: 1 - t,
          y: 0
        },
        {
          x: 1,
          y: 0.5
        },
        {
          x: 1 - t,
          y: 1
        },
        {
          x: 1 - t,
          y: 0.85
        },
        {
          x: 0,
          y: 0.85
        },
        {
          x: 0,
          y: 0.15
        }
      ]
  }

  static SED_S_ArrL(e, t) {
    return (t /= e.width) > 1 &&
      (t = 1),
      [
        {
          x: 0,
          y: 0.5
        },
        {
          x: t,
          y: 0
        },
        {
          x: t,
          y: 0.15
        },
        {
          x: 1,
          y: 0.15
        },
        {
          x: 1,
          y: 0.85
        },
        {
          x: t,
          y: 0.85
        },
        {
          x: t,
          y: 1
        },
        {
          x: 0,
          y: 0.5
        }
      ]
  }

  static SED_S_ArrT(e, t) {
    return (t /= e.height) > 1 &&
      (t = 1),
      [
        {
          x: 0.5,
          y: 0
        },
        {
          x: 0,
          y: t
        },
        {
          x: 0.15,
          y: t
        },
        {
          x: 0.15,
          y: 1
        },
        {
          x: 0.85,
          y: 1
        },
        {
          x: 0.85,
          y: t
        },
        {
          x: 1,
          y: t
        },
        {
          x: 0.5,
          y: 0
        }
      ]
  }

  static SED_S_ArrB(e, t) {
    return (t /= e.height) > 1 &&
      (t = 1),
      [
        {
          x: 0.15,
          y: 0
        },
        {
          x: 0.15,
          y: 1 - t
        },
        {
          x: 0,
          y: 1 - t
        },
        {
          x: 0.5,
          y: 1
        },
        {
          x: 1,
          y: 1 - t
        },
        {
          x: 0.85,
          y: 1 - t
        },
        {
          x: 0.85,
          y: 0
        },
        {
          x: 0.15,
          y: 0
        }
      ]
  }

  static SED_S_Tri(e, t) {
    return [{
      x: 0.5,
      y: 0
    },
    {
      x: 1,
      y: 1
    },
    {
      x: 0,
      y: 1
    },
    {
      x: 0.5,
      y: 0
    }
    ]
  }

  static SED_S_TriB(e, t) {
    return [{
      x: 0,
      y: 0
    },
    {
      x: 1,
      y: 0
    },
    {
      x: 0.5,
      y: 1
    },
    {
      x: 0,
      y: 0
    }
    ]
  }

  static SED_S_Input(e, t) {
    return (t /= e.height) > 1 &&
      (t = 1),
      [
        {
          x: 0,
          y: t
        },
        {
          x: 1,
          y: 0
        },
        {
          x: 1,
          y: 1
        },
        {
          x: 0,
          y: 1
        },
        {
          x: 0,
          y: t
        }
      ]
  }

  static SED_S_Trap(e, t) {
    return (t /= e.width) > 0.5 &&
      (t = 0.5),
      [
        {
          x: t,
          y: 0
        },
        {
          x: 1 - t,
          y: 0
        },
        {
          x: 1,
          y: 1
        },
        {
          x: 0,
          y: 1
        },
        {
          x: t,
          y: 0
        }
      ]
  }

  static SED_S_TrapB(e, t) {
    return (t /= e.width) > 0.5 &&
      (t = 0.5),
      [
        {
          x: 0,
          y: 0
        },
        {
          x: 1,
          y: 0
        },
        {
          x: 1 - t,
          y: 1
        },
        {
          x: t,
          y: 1
        },
        {
          x: 0,
          y: 0
        }
      ]
  }

  static SED_S_Oct(e, t, a) {
    return [{
      x: t,
      y: 0
    },
    {
      x: 1 - t,
      y: 0
    },
    {
      x: 1,
      y: a
    },
    {
      x: 1,
      y: 1 - a
    },
    {
      x: 1 - t,
      y: 1
    },
    {
      x: t,
      y: 1
    },
    {
      x: 0,
      y: 1 - a
    },
    {
      x: 0,
      y: a
    },
    {
      x: t,
      y: 0
    }
    ]
  }

  static SED_S_Store(e, t, a) {
    var r,
      i,
      n = [],
      o = e.width,
      s = e.height;
    var l = {
      x: (a = t) / o,
      y: 1
    };
    n.push(l);
    for (
      r = {
        left: 0,
        top: 0,
        right: a,
        bottom: s
      },
      n.length = 42,
      n = Utils2.PolyYCurve(n, r, 40, 0, 0, 0, 0, !0, o, s),
      i = 0;
      i < 40;
      i++
    ) n[40 - i] = n[42 + i];
    return n[41] = {
      x: a / o,
      y: 0
    },
      n[42] = {
        x: 1,
        y: 0
      },
      r = {
        left: o - a,
        top: 0,
        right: o,
        bottom: s
      },
      a ? (
        r.left -= 0,
        r.right -= 0,
        n.length = 43,
        (n = Utils2.PolyYCurve(n, r, 40, 0, 0, 0, 0, !0, o, s)).push({
          x: 1,
          y: 1
        })
      ) : (
        r.top += 0,
        r.bottom -= 0,
        (n = Utils2.PolyYCurve(n, r, 40, 0, 0, 0, 0, !0, o, s)).push({
          x: 1,
          y: (s - 0) / s
        }),
        n.push({
          x: 1,
          y: 1
        })
      ),
      n
  }

  static SED_S_Hex(e, t) {
    return (t /= e.width) > 0.5 &&
      (t = 0.5),
      [
        {
          x: t,
          y: 0
        },
        {
          x: 1 - t,
          y: 0
        },
        {
          x: 1,
          y: 0.5
        },
        {
          x: 1 - t,
          y: 1
        },
        {
          x: t,
          y: 1
        },
        {
          x: 0,
          y: 0.5
        },
        {
          x: t,
          y: 0
        }
      ]
  }

  static SED_S_Pent(e, t) {
    return (t /= e.height) > 1 &&
      (t = 1),
      [
        {
          x: 0,
          y: 1 - t
        },
        {
          x: 0,
          y: 0
        },
        {
          x: 1,
          y: 0
        },
        {
          x: 1,
          y: 1 - t
        },
        {
          x: 0.5,
          y: 1
        },
        {
          x: 0,
          y: 1 - t
        }
      ]
  }

  static SED_S_PentL(e, t) {
    return (t /= e.width) > 1 &&
      (t = 1),
      [
        {
          x: t,
          y: 0
        },
        {
          x: 1,
          y: 0
        },
        {
          x: 1,
          y: 1
        },
        {
          x: t,
          y: 1
        },
        {
          x: 0,
          y: 0.5
        },
        {
          x: t,
          y: 0
        }
      ]
  }

  static SED_S_Delay(e, t) {
    var a = [],
      r = e.width,
      i = e.height,
      n = t;
    a[0] = {
      x: 0,
      y: 1
    },
      a[1] = {
        x: 0,
        y: 0
      },
      a[2] = {
        x: (r - n) / r,
        y: 0
      };
    var o = {
      left: r - n,
      top: 0,
      right: r,
      bottom: i
    };
    return (a = Utils2.PolyYCurve(a, o, 80, 0, 0, 0, 0, !1, r, i)).push({
      x: (r - n) / r,
      y: 1
    }),
      a
  }

  static SED_S_Disp(e, t) {
    var a = [],
      r = e.width,
      i = e.height,
      n = t;
    a[0] = {
      x: n / r,
      y: 1
    },
      a[1] = {
        x: 0,
        y: 0.5
      },
      a[2] = {
        x: n / r,
        y: 0
      },
      a[3] = {
        x: (r - n) / r,
        y: 0
      };
    var o = {
      left: r - n,
      top: 0,
      right: r,
      bottom: i
    };
    return (a = Utils2.PolyYCurve(a, o, 80, 0, 0, 0, 0, !1, r, i)).push({
      x: (r - n) / r,
      y: 1
    }),
      a.push({
        x: n / r,
        y: 1
      }),
      a
  }
}

export default PolygonShapeGenerator
