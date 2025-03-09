
import ConstantData from "../../Data/ConstantData"
import T3Constant from "../../Data/T3Constant";

const ConnectionPointsController = function () {
  var e,
    t,
    a = null,
    r = null,
    i = null,
    n = null,
    o = null,
    s = - 1,
    l = null,
    S = null,
    c = null,
    u = 200,
    p = 200,
    d = 10,
    D = null,
    g = null,
    h = null,
    m = null,
    C = null,
    y = null,
    f = null,
    L = 1,
    I = 0,
    T = 0,
    b = [],
    M = [],
    P = null,
    R = 0,
    A = 0,
    _ = 0,
    E = 0,
    w = [],
    F = !1,
    v = !1,
    G = null,
    N = null,
    k = null,
    U = null,
    J = '',
    x = 1,
    O = 0,
    B = !1,
    H = 0,
    V = {
      x: 0,
      y: 0
    },
    j = {
      x: 0,
      y: 0
    };
  this.BuildDialog = function () {
    if (
      gListManager.CloseEdit(),
      R = 0,
      b = [],
      M = [],
      P = null,
      V = {
        x: 0,
        y: 0
      },
      a = null,
      r = null,
      i = null,
      n = null,
      o = null,
      l = null,
      S = null,
      s = - 1,
      null,
      w = [],
      A = 0,
      v = !1,
      F = !1,
      B = !1,
      !(
        G = Resources.Controls.Modal_ConnectionPoints.CustomValues.GetControl()
      )
    ) return !1;
    if (
      !(
        N = Resources.Controls.Modal_ConnectionPoints.CustomXValue.GetControl()
      )
    ) return !1;
    if (
      !(
        k = Resources.Controls.Modal_ConnectionPoints.CustomYValue.GetControl()
      )
    ) return !1;
    if (
      !(
        U = Resources.Controls.Modal_ConnectionPoints.UseSnaps.GetControl()
      )
    ) return !1;
    if (
      B = U[0].checked,
      'Chrome' !== Utils2.BrowserDetect.browser &&
      'Safari' !== Utils2.BrowserDetect.browser ||
      (
        g = $(gListManager.SVGroot),
        D = $(gListManager.SVGroot.parentNode),
        g.detach()
      ),
      (s = gListManager.GetTargetSelect()) < 0
    ) return !1;
    var e = gListManager.GetObjectPtr(s, !1);
    switch (
    l = Utils1.DeepCopy(e),
    V.x = l.attachpoint.x,
    V.y = l.attachpoint.y,
    j.x = l.attachpoint.x,
    j.y = l.attachpoint.y,
    l.RotationAngle = 0,
    l.extraflags = Utils2.SetFlag(l.extraflags, ConstantData.ExtraFlags.SEDE_FlipHoriz, !1),
    l.extraflags = Utils2.SetFlag(l.extraflags, ConstantData.ExtraFlags.SEDE_FlipVert, !1),
    c = $.extend(!0, {
    }, l.Frame),
    l.OffsetShape(- c.x, - c.y),
    c.x = 0,
    c.y = 0,
    L = 1,
    I = 0,
    T = 0,
    c.height > c.width ? (L = 180 / c.height, I = (u / L - c.width) / 2, T = d / L) : (L = 180 / c.width, I = d / L, T = (p / L - c.height) / 2),
    l.OffsetShape(I, T),
    x = l.StyleRecord.Line.Thickness,
    J = l.StyleRecord.Line.Paint.Color,
    l.flags & ConstantData.ObjFlags.SEDO_ContConn ? R = ConstantData.ObjFlags.SEDO_ContConn : l.flags & ConstantData.ObjFlags.SEDO_UseConnect &&
      (R = ConstantData.ObjFlags.SEDO_UseConnect),
    R
    ) {
      case ConstantData.ObjFlags.SEDO_ContConn:
        Resources.Controls.Modal_ConnectionPoints.Continuous.GetControl()[0].checked = !0,
          G.hide(),
          this.ChangeToContinuous();
        break;
      case ConstantData.ObjFlags.SEDO_UseConnect:
        Resources.Controls.Modal_ConnectionPoints.Custom.GetControl()[0].checked = !0,
          v = !0,
          G.show(),
          this.ChangeToCustom();
        break;
      default:
        Resources.Controls.Modal_ConnectionPoints.Default.GetControl()[0].checked = !0,
          G.hide(),
          this.ChangeToDefault()
    }
    return T3Constant.DocContext.CanTypeInWorkArea = !1,
      !0
  },
    this.ResetSVGDocument = function () {
      (
        C = Resources.Controls.Modal_ConnectionPoints.Preview.GetControl()
      ).empty(),
        a = new SDGraphics.Document(
          Resources.Controls.Modal_ConnectionPoints.Preview.Id,
          Globals.WebFonts
        ),
        o = a.AddLayer('CPD_backgroundLayer'),
        r = a.AddLayer('CPD_svgObjectLayer'),
        i = a.AddLayer('CPD_gridLayer'),
        n = a.AddLayer('CPD_svgOverlayLayer'),
        a.SetDocumentSize(220 / L, 220 / L),
        a.SetDocumentDPI(96),
        a.SetDocumentScale(L)
    },
    this.DrawShape = function () {
      r.RemoveAll(),
        l instanceof ListManager.GroupSymbol ? (
          l.RotationAngle = 0,
          S = l.CreateShape(a, !0),
          r.AddElement(S),
          l.PostCreateShapeCallback(a, S, !0),
          l.flags & ConstantData.ObjFlags.SEDO_ContConn &&
          (
            (m = a.CreateShape(ConstantData.CreateShapeType.RECT)).SetFillColor('none'),
            m.SetStrokeColor('black'),
            m.SetStrokeWidth(4 / L),
            m.SetSize(l.Frame.width, l.Frame.height),
            m.SetPos(l.Frame.x, l.Frame.y),
            r.AddElement(m)
          )
        ) : (
          l.flags & ConstantData.ObjFlags.SEDO_ContConn ? (
            l.StyleRecord.Line.Paint.Color = 'black',
            l.StyleRecord.Line.Thickness = 4 / L
          ) : (
            l.StyleRecord.Line.Paint.Color = J,
            l.StyleRecord.Line.Thickness = x
          ),
          S = l.CreateShape(a),
          r.AddElement(S)
        );
      var e = S.DOMElement();
      (f = Hammer(e)).on('tap', this.AddConnectPointFactory(this, f))
    },
    this.RoundToTenths = function (e) {
      return (e = Math.floor(10 * e)) / 10
    },
    this.ToggleSnaps = function () {
      B = U[0].checked
    },
    this.SnapToGrid = function (e) {
      var t = c.x + I,
        a = c.y + T,
        r = e.x - t,
        i = e.y - a,
        n = c.width,
        o = c.height,
        s = r / n,
        l = i / o;
      s < 0 &&
        (s = 0),
        s > 1 &&
        (s = 1),
        l < 0 &&
        (l = 0),
        l > 1 &&
        (l = 1),
        s = 0.25 * Math.ceil(4 * (s - 0.125)),
        l = 0.25 * Math.ceil(4 * (l - 0.125)),
        e.x = s * n + t,
        e.y = l * o + a
    },
    this.ShowGrid = function () {
      var e,
        t,
        r,
        n,
        o;
      if (i) {
        i.RemoveAll();
        var s = u / L,
          l = p / L;
        for (
          t = a.CreateShape(ConstantData.CreateShapeType.PATH),
          e = '',
          o = I,
          n = c.width / 4,
          e = '',
          r = 0;
          r < 5;
          ++r
        ) e += 'M' + o + ',0v' + l,
          o += n;
        for (o = T, n = c.height / 4, r = 0; r < 5; ++r) e += 'M0,' + o + 'h' + s,
          o += n;
        t.SetPath(e),
          t.SetFillColor('none'),
          t.SetStrokeColor('#0F0'),
          t.SetStrokeOpacity('1'),
          t.SetStrokeWidth(0.5 / L),
          i.AddElement(t)
      }
    },
    this.HideGrid = function () {
      null !== i &&
        i.RemoveAll()
    },
    this.HideBackground = function () {
      null !== o &&
        o.RemoveAll()
    },
    this.AddBackgroundShape = function () {
      var e = u / L,
        t = p / L;
      o.RemoveAll(),
        (h = a.CreateShape(ConstantData.CreateShapeType.RECT)).SetFillColor('#FFFFFF'),
        h.SetStrokeColor('none'),
        h.SetSize(e - 1, t - 1),
        h.SetPos(1, 1),
        o.AddElement(h);
      var r = h.DOMElement();
      (y = Hammer(r)).on('tap', this.AddConnectPointFactory(this, y))
    },
    this.SetDefaultConnectPoints = function () {
      b = [
        {
          x: 0,
          y: 0
        },
        {
          x: ConstantData.Defines.SED_CDim / 4,
          y: 0
        },
        {
          x: ConstantData.Defines.SED_CDim / 2,
          y: 0
        },
        {
          x: 3 * ConstantData.Defines.SED_CDim / 4,
          y: 0
        },
        {
          x: ConstantData.Defines.SED_CDim,
          y: 0
        },
        {
          x: ConstantData.Defines.SED_CDim,
          y: ConstantData.Defines.SED_CDim / 4
        },
        {
          x: ConstantData.Defines.SED_CDim,
          y: ConstantData.Defines.SED_CDim / 2
        },
        {
          x: ConstantData.Defines.SED_CDim,
          y: 3 * ConstantData.Defines.SED_CDim / 4
        },
        {
          x: ConstantData.Defines.SED_CDim,
          y: ConstantData.Defines.SED_CDim
        },
        {
          x: 3 * ConstantData.Defines.SED_CDim / 4,
          y: ConstantData.Defines.SED_CDim
        },
        {
          x: ConstantData.Defines.SED_CDim / 2,
          y: ConstantData.Defines.SED_CDim
        },
        {
          x: ConstantData.Defines.SED_CDim / 4,
          y: ConstantData.Defines.SED_CDim
        },
        {
          x: 0,
          y: ConstantData.Defines.SED_CDim
        },
        {
          x: 0,
          y: 3 * ConstantData.Defines.SED_CDim / 4
        },
        {
          x: 0,
          y: ConstantData.Defines.SED_CDim / 2
        },
        {
          x: 0,
          y: ConstantData.Defines.SED_CDim / 4
        }
      ]
    },
    this.CalculateNewConnectPoint = function (e) {
      var t,
        a;
      t = w[e].x - I,
        t /= c.width,
        t *= 30000,
        a = w[e].y - T,
        a /= c.height,
        a *= 30000,
        e != H ? (
          b[e].x = t,
          b[e].y = a,
          l.ConnectPoints = Utils1.DeepCopy(b),
          P = Utils1.DeepCopy(b)
        ) : V = {
          x: t,
          y: a
        }
    },
    this.UnHighlightSelectedPoint = function (e) {
      var t = w[e].renderPoint;
      t.SetFillColor('black'),
        t.SetSize(_, _),
        t.SetPos(w[e].x - _ / 2, w[e].y - _ / 2)
    },
    this.HighlightSelectedPoint = function (e) {
      var t = w[e].renderPoint;
      t.SetFillColor('red'),
        t.SetSize(E, E),
        t.SetPos(w[e].x - E / 2, w[e].y - E / 2)
    },
    this.ConvertClickPoint = function (e) {
      var t = a.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY);
      return B &&
        this.SnapToGrid(t),
        t
    },
    this.ConvertClickPointNoSnap = function (e) {
      return a.ConvertWindowToDocCoords(e.gesture.center.clientX, e.gesture.center.clientY)
    },
    this.AddConnectPointFactory = function (e, t) {
      return function (t) {
        if (2 == O) {
          if (16 == b.length) return void Utils2.Alert(Resources.Strings.MaxConnectPoints, null);
          var a = !1;
          if (
            (a = t.gesture ? t.gesture.srcEvent.altKey : t.altKey) ||
            (a = t.gesture ? t.gesture.srcEvent.ctrlKey : t.ctrlKey),
            a
          ) {
            var r = e.ConvertClickPoint(t),
              i = (r.x - c.x - I) / c.width * 100;
            if (i < 0 || i > 100) return;
            var n = (r.y - c.y - T) / c.height * 100;
            if (n < 0 || n > 100) return;
            var o = {
              x: i / 100 * 30000,
              y: n / 100 * 30000
            };
            b.push(o),
              P = Utils1.DeepCopy(b),
              A = b.length - 1,
              H += 1,
              e.ChangeToCustom(),
              N[0].value = e.RoundToTenths(i),
              k[0].value = e.RoundToTenths(n)
          }
        }
      }
    },
    this.CustomPointTapFactory = function (e, t, a, r) {
      return function (t) {
        A != r &&
          e.UnHighlightSelectedPoint(A),
          A = r,
          e.HighlightSelectedPoint(A),
          N[0].value = e.RoundToTenths((w[r].x - c.x - I) / c.width * 100),
          k[0].value = e.RoundToTenths((w[r].y - c.y - T) / c.height * 100)
      }
    },
    this.CustomPointDragFactory = function (a, r, i, n) {
      return function (r) {
        var i = a.ConvertClickPoint(r);
        if (B) F = !0;
        else if (!F) {
          if (!(Math.abs(i.x - e) > 2 || Math.abs(i.y - t) > 2)) return;
          F = !0
        }
        var o = (i.x - c.x - I) / c.width * 100;
        o < 0 &&
          (o = 0, i.x = c.x + I),
          o > 100 &&
          (o = 100, i.x = c.x + I + c.width);
        var s = (i.y - c.y - T) / c.height * 100;
        s < 0 &&
          (s = 0, i.y = c.y + T),
          s > 100 &&
          (s = 100, i.y = c.y + T + c.height),
          w[n].x = i.x,
          w[n].y = i.y,
          a.HighlightSelectedPoint(n),
          N[0].value = a.RoundToTenths(o),
          k[0].value = a.RoundToTenths(s)
      }
    },
    this.CustomPointDragEndFactory = function (e, t, a, r) {
      return function (a) {
        if (F) {
          var i = e.ConvertClickPoint(a),
            n = (i.x - c.x - I) / c.width * 100;
          n < 0 &&
            (n = 0, i.x = c.x + I),
            n > 100 &&
            (n = 100, i.x = c.x + I + c.width);
          var o = (i.y - c.y - T) / c.height * 100;
          o < 0 &&
            (o = 0, i.y = c.y + T),
            o > 100 &&
            (o = 100, i.y = c.y + T + c.height),
            w[r].x = i.x,
            w[r].y = i.y,
            e.HighlightSelectedPoint(r),
            N[0].value = e.RoundToTenths(n),
            k[0].value = e.RoundToTenths(o),
            e.CalculateNewConnectPoint(r)
        }
        t.off('drag'),
          t.off('dragend')
      }
    },
    this.CustomPointDragStartFactory = function (a, r, i, n) {
      return function (o) {
        var s = a.ConvertClickPointNoSnap(o);
        a.UnHighlightSelectedPoint(A),
          A = n,
          e = s.x,
          t = s.y,
          F = !1,
          a.HighlightSelectedPoint(A),
          N[0].value = a.RoundToTenths((w[n].x - c.x - I) / c.width * 100),
          k[0].value = a.RoundToTenths((w[n].y - c.y - T) / c.height * 100),
          r.on('drag', a.CustomPointDragFactory(a, r, i, n)),
          r.on('dragend', a.CustomPointDragEndFactory(a, r, i, n))
      }
    },
    this.ShowConnectPoints = function () {
      if (n) {
        var e,
          t;
        n.RemoveAll();
        var r,
          i,
          o,
          S = R == ConstantData.ObjFlags.SEDO_UseConnect;
        if (b = Utils1.DeepCopy(l.GetTargetPoints()), S) {
          for (M = [], t = b.length, e = 0; e < t; ++e) M.push({
            x: b[e].x / 30000 * c.width,
            y: b[e].y / 30000 * c.height
          });
          H = b.length,
            M.push({
              x: V.x / 30000 * c.width,
              y: V.y / 30000 * c.height
            }),
            t++
        } else for (t = (M = l.GetPerimPts(s, b, null, !0, null, - 1)).length, e = 0; e < t; ++e) M[e].x -= I,
          M[e].y -= T;
        _ = 9 / L;
        E = 1.4 * _,
          null,
          w = [];
        var u = !1;
        for (e = 0; e < t; ++e) {
          if (
            r = M[e].x,
            i = M[e].y,
            S ? e != H ? o = a.CreateShape(ConstantData.CreateShapeType.OVAL) : (
              o = a.CreateShape(ConstantData.CreateShapeType.RECT),
              u = !0
            ) : o = a.CreateShape(ConstantData.CreateShapeType.OVAL),
            n.AddElement(o),
            o.SetOpacity(0.8),
            o.SetStrokeWidth(0),
            o.SetFillColor('black'),
            o.SetSize(_, _),
            o.SetPos(r - _ / 2 + I, i - _ / 2 + T),
            o.SetID(ConstantData.SVGElementClass.SHAPE),
            o.SetUserData('CONN' + e),
            w.push({
              renderPoint: o,
              x: r + I,
              y: i + T
            }),
            S
          ) {
            var p = o.DOMElement(),
              d = Hammer(p);
            d.on('tap', this.CustomPointTapFactory(this, d, o, e)),
              d.on('dragstart', this.CustomPointDragStartFactory(this, d, o, e)),
              o.SetEventProxy(d)
          }
          u &&
            o.SetRotation(45)
        }
        S &&
          this.HighlightSelectedPoint(A)
      }
    },
    this.HideConnectPoints = function () {
      null !== n &&
        n.RemoveAll()
    },
    this.ChangeToContinuous = function () {
      Resources.Controls.Modal_ConnectionPoints.Continuous.GetControl()[0].checked &&
        (
          O = 1,
          G.hide(),
          this.ResetSVGDocument(),
          R = ConstantData.ObjFlags.SEDO_ContConn,
          l.flags = Utils2.SetFlag(l.flags, ConstantData.ObjFlags.SEDO_UseConnect, !1),
          l.flags = Utils2.SetFlag(l.flags, ConstantData.ObjFlags.SEDO_ContConn, !0),
          this.HideGrid(),
          this.HideBackground(),
          this.DrawShape(),
          this.HideConnectPoints()
        )
    },
    this.ChangeToDefault = function () {
      Resources.Controls.Modal_ConnectionPoints.Default.GetControl()[0].checked &&
        (
          O = 0,
          G.hide(),
          this.ResetSVGDocument(),
          R = 0,
          l.flags = Utils2.SetFlag(l.flags, ConstantData.ObjFlags.SEDO_UseConnect, !1),
          l.flags = Utils2.SetFlag(l.flags, ConstantData.ObjFlags.SEDO_ContConn, !1),
          b = Utils1.DeepCopy(l.GetTargetPoints()),
          j = {
            x: ConstantData.Defines.SED_CDim / 2,
            y: ConstantData.Defines.SED_CDim / 2
          },
          this.HideGrid(),
          this.HideBackground(),
          this.DrawShape(),
          this.ShowConnectPoints()
        )
    },
    this.ChangeToCustom = function () {
      if (
        Resources.Controls.Modal_ConnectionPoints.Custom.GetControl()[0].checked
      ) {
        O = 2,
          G.show(),
          this.ResetSVGDocument(),
          v ||
          (
            this.SetDefaultConnectPoints(),
            l.ConnectPoints = Utils1.DeepCopy(b),
            v = !0
          ),
          P &&
          (
            l.ConnectPoints = Utils1.DeepCopy(P),
            l.attachpoint = Utils1.DeepCopy(V)
          ),
          R = ConstantData.ObjFlags.SEDO_UseConnect,
          l.flags = Utils2.SetFlag(l.flags, ConstantData.ObjFlags.SEDO_UseConnect, !0),
          l.flags = Utils2.SetFlag(l.flags, ConstantData.ObjFlags.SEDO_ContConn, !1);
        var e = l.GetTargetPoints();
        b = Utils1.DeepCopy(e),
          this.AddBackgroundShape(),
          this.ShowGrid(),
          this.DrawShape(),
          this.ShowConnectPoints();
        var t = null;
        t = A != H ? b[A] : V,
          N[0].value = this.RoundToTenths(t.x / 30000 * 100),
          k[0].value = this.RoundToTenths(t.y / 30000 * 100)
      }
    },
    this.RecalculateCurrentPoint = function () {
      var e = w[A],
        t = (e.x - c.x - I) / c.width * 100;
      t < 0 &&
        (t = 0, e.x = c.x + I),
        t > 100 &&
        (t = 100, e.x = c.x + I + c.width);
      var a = (e.y - c.y - T) / c.height * 100;
      a < 0 &&
        (a = 0, e.y = c.y + T),
        a > 100 &&
        (a = 100, e.y = c.y + T + c.height),
        w[A].x = e.x,
        w[A].y = e.y,
        this.HighlightSelectedPoint(A),
        N[0].value = this.RoundToTenths(t),
        k[0].value = this.RoundToTenths(a),
        this.CalculateNewConnectPoint(A)
    },
    this.PointMoveRight = function () {
      2 == O &&
        (w[A].x += 1 / L, this.RecalculateCurrentPoint())
    },
    this.PointMoveLeft = function () {
      2 == O &&
        (w[A].x -= 1 / L, this.RecalculateCurrentPoint())
    },
    this.PointMoveDown = function () {
      2 == O &&
        (w[A].y += 1 / L, this.RecalculateCurrentPoint())
    },
    this.PointMoveUp = function () {
      2 == O &&
        (w[A].y -= 1 / L, this.RecalculateCurrentPoint())
    },
    this.PointSelectNext = function () {
      if (2 == O) {
        var e = w.length;
        e > 1 &&
          (
            this.UnHighlightSelectedPoint(A),
            ++A >= e &&
            (A = 0),
            this.HighlightSelectedPoint(A)
          )
      }
    },
    this.PointSelectPrev = function () {
      if (2 == O) {
        var e = w.length;
        e > 1 &&
          (
            this.UnHighlightSelectedPoint(A),
            --A < 0 &&
            (A = e - 1),
            this.HighlightSelectedPoint(A)
          )
      }
    },
    this.PointDelete = function () {
      2 == O &&
        w.length > 1 &&
        A != H &&
        (
          b.splice(A, 1),
          P = Utils1.DeepCopy(b),
          H -= 1,
          (A -= 1) < 0 &&
          (A = P.length ? P.length - 1 : H),
          this.ChangeToCustom()
        )
    },
    this.SetCustomXValue = function () {
      var e = N[0].value;
      isNaN(e) &&
        (e = 100 * (w[A].x - I) / c.width),
        (e = this.RoundToTenths(e)) < 0 &&
        (e = 0),
        e > 100 &&
        (e = 100),
        N[0].value = e,
        w[A].x = e / 100 * c.width + I,
        this.RecalculateCurrentPoint()
    },
    this.SetCustomYValue = function () {
      var e = k[0].value;
      isNaN(e) &&
        (e = 100 * (w[A].y - T) / c.height),
        (e = this.RoundToTenths(e)) < 0 &&
        (e = 0),
        e > 100 &&
        (e = 100),
        k[0].value = e,
        w[A].y = e / 100 * c.height + T,
        this.RecalculateCurrentPoint()
    },
    this.UI_OnEnter = function (e) {
      try {
        this.DialogOK(e),
          Resources.Controls.Modals.ConnectionPoints.GetControl().modal('hide')
      } catch (e) {
        gListManager.ExceptionCleanup(e)
      }
    },
    this.UI_OnEsc = function (e) {
      try {
        this.DialogCancel(e),
          Resources.Controls.Modals.ConnectionPoints.GetControl().modal('hide')
      } catch (e) {
        gListManager.ExceptionCleanup(e)
      }
    },
    this.DialogOK = function (e) {
      a = null,
        r = null,
        i = null,
        n = null,
        l = null,
        S = null,
        y &&
        y.off('tap'),
        f &&
        f.off('tap'),
        y = null,
        f = null,
        C.empty(),
        'Chrome' !== Utils2.BrowserDetect.browser &&
        'Safari' !== Utils2.BrowserDetect.browser ||
        D.append(g),
        T3Constant.DocContext.CanTypeInWorkArea = !0;
      try {
        var t = {};
        R === ConstantData.ObjFlags.SEDO_UseConnect ? (t.x = V.x, t.y = V.y) : (t.x = j.x, t.y = j.y),
          gListManager.SetTargetConnectionPoints(R, b, t)
      } catch (e) {
        gListManager.ExceptionCleanup(e)
      }
    },
    this.DialogCancel = function (e) {
      a = null,
        r = null,
        i = null,
        n = null,
        l = null,
        S = null,
        y &&
        y.off('tap'),
        f &&
        f.off('tap'),
        y = null,
        f = null,
        C.empty(),
        'Chrome' !== Utils2.BrowserDetect.browser &&
        'Safari' !== Utils2.BrowserDetect.browser ||
        D.append(g),
        T3Constant.DocContext.CanTypeInWorkArea = !0
    }
}

export default ConnectionPointsController
