
import $ from 'jquery';
import Style from '../../Basic/B.Element.Style';
import OptConstant from "../../Data/Constant/OptConstant";
import StyleConstant from "../../Data/Constant/StyleConstant";
import T3Gv from '../../Data/T3Gv';
import '../../Util/T3Hammer';
import T3Util from "../../Util/T3Util";
import Utils1 from "../../Util/Utils1";
import Utils2 from "../../Util/Utils2";
import Utils3 from "../../Util/Utils3";
import DataUtil from "../Data/DataUtil";
import DSConstant from "../DS/DSConstant";
import LayerUtil from './LayerUtil';

class ExportUtil {

  static ExportSVGXML(e, t, a, r, i, n) {
    var o = window.navigator.msPointerEnabled,
      s = !1;
    n &&
      n.inlineExternalImages &&
      (s = n.inlineExternalImages);
    var l = n &&
      n.zList ||
      LayerUtil.ZList();
    n &&
      n.zList &&
      function (e) {
        const t = LayerUtil.ZList().filter((t => !e.includes(t)));
        for (let e = 0, a = t.length; e < a; e++) {
          const a = T3Gv.opt.svgObjectLayer.GetElementById(t[e]);
          a &&
            a.svgObj &&
            a.svgObj.node &&
            a.svgObj.node.setAttribute('no-export-force', '1')
        }
      }(n.zList);
    l.length;
    var S,
      c,
      u = {};
    this.GetBlobImages(l, u);
    var p,
      d = DataUtil.GetObjectPtr(T3Gv.opt.sdDataBlockId, !1);
    if (
      n &&
        n.renderBounds ? p = n.renderBounds : e &&
          l.length ? (
        t = t ||
        0,
        (
          p = T3Gv.opt.GetSRect(!1, !1, n && n.zList ? n.zList : null) ||
          {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          }
        ).x -= t,
        p.y -= t,
        p.width += 2 * t,
        p.height += 2 * t
      ) : p = {
        x: 0,
        y: 0,
        width: d.dim.x,
        height: d.dim.y
      },
      p.x = Utils1.RoundCoord(p.x),
      p.y = Utils1.RoundCoord(p.y),
      p.width = Utils1.RoundCoord(p.width),
      p.height = Utils1.RoundCoord(p.height),
      T3Gv.opt.RemoveAllActionArrows(),
      - 1 !== this.curHiliteShape
    ) {
      var D = DataUtil.GetObjectPtr(this.curHiliteShape, !1);
      D &&
        (D.SetRuntimeEffects(!1), D.ClearCursors())
    }
    var g = document.getElementById('svg-area'),
      h = Utils3.CloneToDoc($('svg', g)[0], o),
      m = 'http://www.w3.org/2000/svg';
    o ||
      h.setAttribute('xmlns', m),
      h.setAttribute('version', '1.1'),
      h.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    var C,
      y,
      f,
      L = [],
      I = [],
      T = h.childNodes[0],
      b = T.childNodes.length,
      M = {};
    for (S = 0; S < b; S++) 0 === (C = (f = T.childNodes[S]).getAttribute('id')).indexOf('FX_NONE') ? L.push(f) : 0 === C.indexOf('FX_') &&
      (
        y = SDUI.Utils.MakeGuid(),
        f.setAttribute('id', y),
        y = 'url(#' + y + ')',
        M[C = 'url(#' + C + ')'] = {
          used: !1,
          node: f,
          id: y
        }
      );
    var P,
      R,
      A,
      _ = h.getElementsByTagNameNS(m, 'pattern'),
      E = _.length,
      w = {};
    for (S = 0; S < E; ++S) C = (R = _[S]).getAttribute('id'),
      y = Utils1.MakeGuid(),
      A = R.hasAttribute('_isImage_'),
      R.setAttribute('id', y),
      y = 'url(#' + y + ')',
      w[C = 'url(#' + C + ')'] = {
        id: y,
        needFilter: !0,
        isImage: A
      };
    for (
      E = (_ = h.getElementsByTagNameNS(m, 'linearGradient')).length,
      S = 0;
      S < E;
      ++S
    ) C = (R = _[S]).getAttribute('id'),
      y = Utils1.MakeGuid(),
      R.setAttribute('id', y),
      y = 'url(#' + y + ')',
      w[C = 'url(#' + C + ')'] = {
        id: y,
        needFilter: !0
      };
    for (
      E = (_ = h.getElementsByTagNameNS(m, 'radialGradient')).length,
      S = 0;
      S < E;
      ++S
    ) C = (R = _[S]).getAttribute('id'),
      y = Utils1.MakeGuid(),
      R.setAttribute('id', y),
      y = 'url(#' + y + ')',
      w[C = 'url(#' + C + ')'] = {
        id: y,
        needFilter: !0
      };
    var F,
      v = h.getElementsByTagNameNS(m, 'clipPath'),
      G = v.length,
      N = {};
    for (S = 0; S < G; ++S) C = (F = v[S]).getAttribute('id'),
      y = Utils1.MakeGuid(),
      F.setAttribute('id', y),
      y = 'url(#' + y + ')',
      N[C = 'url(#' + C + ')'] = y;
    var k,
      U,
      J = function () {
        if (!P) {
          var e = document.createElementNS(this.ns, 'filter'),
            t = document.createElementNS(this.ns, 'feMerge'),
            a = document.createElementNS(this.ns, 'feMergeNode');
          P = Utils1.MakeGuid(),
            e.setAttribute('id', P),
            e.setAttribute('x', '-0.5'),
            e.setAttribute('y', '-0.5'),
            e.setAttribute('width', '2'),
            e.setAttribute('height', '2'),
            a.setAttribute('in', 'SourceGraphic'),
            t.appendChild(a),
            e.appendChild(t),
            T.appendChild(e),
            P = 'url(#' + P + ')'
        }
        return P
      },
      x = n &&
        n.exportLinks,
      O = n &&
        n.exportTT,
      B = function (e, t, a, r) {
        var i,
          n,
          o,
          s,
          l,
          S,
          c,
          u,
          p,
          d,
          D,
          g,
          h;
        if (e.hasAttribute && e.getAttribute && e.removeAttribute) if (
          S = x &&
          e.hasAttribute('_explink_'),
          c = O &&
          e.hasAttribute('_expnotett_'),
          u = O &&
          e.hasAttribute('_expdatatt_'),
          p = O &&
          e.hasAttribute('_expextendtt_'),
          !e.hasAttribute('no-export') ||
          S ||
          c ||
          u ||
          p
        ) if (
            e.removeAttribute('no-export'),
            e.hasAttribute('no-export-force')
          ) t.push(e);
          else if ('hidden' != (n = e.getAttribute('visibility'))) {
            if ('g' == e.nodeName) {
              if (!e.childNodes.length) return void t.push(e);
              e.removeAttribute('style')
            }
            if (
              (o = e.getAttribute('filter')) &&
              (
                (o = o.replace(/[\\|\"]/g, '')).indexOf('FX_NONE') >= 0 ? (e.removeAttribute('filter'), o = null) : void 0 !== M[o] &&
                  (e.setAttribute('filter', M[o].id), M[o].used = !0)
              ),
              h = !(r = r || !!o),
              r ||
              (
                D = e.getAttribute('width'),
                g = e.getAttribute('height'),
                D &&
                g &&
                (D = Number(D), g = Number(g), isNaN(D) || isNaN(g) || (h = D * g < 500000))
              ),
              (n = e.getAttribute('fill')) &&
              (
                n = n.replace(/[\\|\"]/g, ''),
                void 0 !== w[n] &&
                (
                  e.setAttribute('fill', w[n].id),
                  w[n].needFilter &&
                  !r &&
                  h &&
                  (e.setAttribute('filter', J()), r = !0)
                )
              ),
              (n = e.getAttribute('stroke')) &&
              (
                n = n.replace(/[\\|\"]/g, ''),
                void 0 !== w[n] &&
                (
                  e.setAttribute('stroke', w[n].id),
                  w[n].needFilter &&
                  !r &&
                  h &&
                  (e.setAttribute('filter', J()), r = !0)
                )
              ),
              (n = e.getAttribute('clip-path')) &&
              (
                n = n.replace(/[\\|\"]/g, ''),
                void 0 !== N[n] &&
                e.setAttribute('clip-path', N[n])
              ),
              e.hasAttribute('export-needfilter') &&
              !r &&
              h &&
              (e.setAttribute('filter', J()), r = !0),
              e.removeAttribute('pointer-events'),
              e.removeAttribute('class'),
              'tspan' == e.nodeName &&
              (n = e.getAttribute('style')) &&
              (s = (n = n.replace(/[\"]/g, '\'')).match(/(font-family\:.+?\;)/i)).length > 0
            ) for (n = (n = s[0].slice(12, - 1)).trim().split(','), i = 0; i < n.length; i++) l = n[i].trim(),
              a.indexOf(l) < 0 &&
              a.push(l);
            if (S) {
              var m = e.getAttribute('_explink_');
              $(e).wrap(
                '<a xlink:href="' + m + '" target="_blank" style="cursor:pointer"></a>'
              )
            }
            var C,
              y,
              f,
              L;
            for (
              e.removeAttribute('_explink_'),
              c &&
              (
                C = e.getAttribute('_expnotett_'),
                y = parseInt(C, 10),
                f = null,
                (L = DataUtil.GetObjectPtr(y, !1)) &&
                L.runtimeText &&
                (f = L.runtimeText.text),
                f &&
                (f = Utils2.UTF8_to_B64(f)),
                (d = f) &&
                e.setAttribute('onclick', '_SDRShowNoteTT(evt,\'' + d + '\')')
              ),
              e.removeAttribute('_expnotett_'),
              u &&
              (
                d = function (e) {
                  var t,
                    a,
                    r,
                    i,
                    n,
                    o,
                    s,
                    l,
                    S,
                    c,
                    u,
                    p,
                    d = parseInt(e, 10),
                    D = DataUtil.GetObjectPtr(d, !1),
                    g = [];
                  if (D && D.HasFieldData()) for (
                    t = D.GetFieldDataTable(),
                    a = D.GetFieldDataRecord(),
                    r = TODO.STData.FieldedDataGetFieldList(t, !0),
                    i = 0;
                    i < r.length;
                    i++
                  ) n = r[i].fieldID,
                    o = r[i].name,
                    s = r[i].type,
                    l = TODO.STData.FieldedDataGetFieldValue(t, a, n),
                    l = T3Gv.opt.ModifyFieldDataForDisplay(l, s),
                    S = TODO.STData.FieldedDataGetFieldStyle(t, a, n),
                    p = T3Gv.opt.CleanShapeDataHyperlink(TODO.STData.FieldedDataGetFieldHyperlink(t, a, n)),
                    c = u = '',
                    s == TODO.STData.FieldedDataTypes.HEADER &&
                    (
                      p = '',
                      c = S + 'max-width:none;display:block;',
                      S = 'display:none;',
                      u = 'display:block;'
                    ),
                    p &&
                    (l = '<a target="_blank" href="' + p + '">' + l + '</a>'),
                    g.push({
                      name: o,
                      val: l,
                      dstyle: S,
                      lstyle: c,
                      rstyle: u
                    });
                  var h = JSON.stringify(g);
                  return Utils2.UTF8_to_B64(h)
                }(C = e.getAttribute('_expdatatt_')),
                d &&
                e.setAttribute('onclick', '_SDRShowDataTT(evt,\'' + d + '\')')
              ),
              e.removeAttribute('_expdatatt_'),
              p &&
              (
                d = function (e) {
                  var t = parseInt(e, 10),
                    a = DataUtil.GetObjectPtr(t, !1);
                  return a &&
                    (a = Utils2.UTF8_to_B64(a)),
                    a
                }(C = e.getAttribute('_expextendtt_')),
                d &&
                e.setAttribute('onclick', '_SDRShowSVGTT(evt,\'' + d + '\')')
              ),
              e.removeAttribute('_expextendtt_'),
              i = 0;
              i < e.childNodes.length;
              i++
            ) B(e.childNodes[i], t, a, r)
          } else t.push(e);
        else t.push(e)
      },
      H = n &&
        n.docOnly,
      V = n &&
        n.backOnly,
      j = n &&
        n.allowGrid;
    // Double ===
    var node;
    for (b = h.childNodes.length, S = 1; S < b; S++) node = h.childNodes[S],
      k = node.hasAttribute('t3-background'),
      (U = node.hasAttribute('t3-grid')) &&
      j &&
      !V &&
      (
        node.removeAttribute('no-export'),
        node.removeAttribute('style'),
        node.setAttribute('transform', 'scale(1.041667,1.041667) translate(0,0)')
      ),
      k &&
        V ||
        !k &&
        H ||
        !V &&
        !H ? (B(node, L, I, !1), U || node.removeAttribute('transform')) : L.push(node);
    for (
      var z in function () {
        const e = LayerUtil.ZList();
        for (let t = 0, a = e.length; t < a; t++) {
          const a = T3Gv.opt.svgObjectLayer.GetElementById(e[t]);
          a &&
            a.svgObj &&
            a.svgObj.node &&
            (
              a.svgObj.node.hasAttribute('no-export-force') &&
              a.svgObj.node.removeAttribute('no-export-force')
            )
        }
      }(),
      M
    ) M[z] &&
      !M[z].used &&
      M[z].node &&
      L.push(M[z].node);
    var W = L.length;
    for (S = 0; S < W; S++) (f = L[S]).parentNode.removeChild(f);
    var q,
      K = h.getElementsByTagNameNS(m, 'g');
    for (S = K.length - 1; S >= 0; S--) (q = K[S]).childNodes.length ||
      q.parentNode.removeChild(q);
    if (!i) {
      var X,
        Y,
        Z,
        Q,
        ee,
        te,
        ae,
        re,
        ie,
        ne,
        oe,
        se,
        le,
        Se = h.getElementsByTagNameNS(m, 'image'),
        ce = [],
        ue = Se.length,
        pe = '',
        de = n &&
          n.externImagePrep,
        De = [],
        ge = !1,
        he = !1,
        me = !1,
        Ce = !1;
      for (S = 0; S < ue; S++) ce.push(Se[S]);
      for (S = 0; S < ue; ++S) {
        if (
          Z = (X = ce[S]).getAttribute('xlink:href'),
          oe = !1,
          le = (le = X.getElementsByTagName('title')).length ? le[0] : null,
          0 == Z.toLowerCase().indexOf('blob:') &&
          u[Z]
        ) Y = u[Z],
          pe = 'data:' + DSConstant.GetImageBlobType(Y.ImageDir) + ';base64,' + Utils2.ArrayBufferToBase64(Y.Bytes),
          X.setAttribute('xlink:href', pe);
        else if (
          0 === Z.toLowerCase().indexOf(Constants.FilePath_CMSRoot.toLowerCase())
        ) {
          if (0 == Z.indexOf('/cmsstorage')) if ('PRD' === SDUI.Environment) Z = Z.replace('/cmsstorage', 'https://app.smartdraw.com/cmsstorage');
          else Z = Z.replace(
            '/cmsstorage',
            'https://' + SDUI.Environment.toLowerCase() + 'app.smartdraw.com/cmsstorage'
          );
          pe = Constants.URL_Cloud.indexOf('localcloud') >= 0 ||
            Constants.URL_Cloud.indexOf('localapp') >= 0 ? Z.replace('localcloud', 'devcloud') : Z,
            X.setAttribute('xlink:href', pe),
            oe = de
        } else 0 === Z.toLowerCase().indexOf(Constants.FilePath_DataIcons.toLowerCase()) ? (
          pe = de ? Z : Constants.URL_Cloud.indexOf('localcloud') >= 0 ||
            Constants.URL_Cloud.indexOf('localapp') >= 0 ? 'https://devapp.smartdraw.com/' + Z : Constants.URL_Cloud + Z,
          X.setAttribute('xlink:href', pe),
          oe = de
        ) : Z.indexOf(Constants.Icon_Hyperlink) >= 0 ? (
          ge ||
          (
            ee = SDUI.Utils.MakeGuid(),
            X.setAttribute(
              'xlink:href',
              'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMl8xXyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxOCAxOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTggMTg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiMzMzMzMzM7fQ0KCS5zdDF7ZmlsbDojRkZGRkZGO30NCjwvc3R5bGU+DQo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTUuMyw2LjVjLTAuNC0wLjUtMS0wLjctMS43LTAuN2gtMi4xYy0xLjIsMC0yLjIsMC45LTIuMywyLjFIOWMtMC4xLTAuNS0wLjMtMS0wLjctMS40QzcuOSw2LDcuMyw1LjgsNi43LDUuOA0KCUg0LjZjLTEuMywwLTIuMywxLjEtMi4zLDIuNHYxLjRjMCwwLjYsMC4yLDEuMiwwLjcsMS43YzAuNCwwLjUsMSwwLjcsMS43LDAuN2gyYzAuNiwwLDEuMi0wLjIsMS43LTAuN2MwLjQtMC40LDAuNi0wLjgsMC43LTEuNGgwLjINCgljMC4xLDAuNSwwLjMsMSwwLjcsMS40YzAuNCwwLjQsMSwwLjcsMS43LDAuN2gyLjFjMS4zLDAsMi4zLTEuMSwyLjMtMi4zVjguMUMxNiw3LjUsMTUuNyw2LjksMTUuMyw2LjV6Ii8+DQo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTMuNiw2LjFjMC41LDAsMSwwLjIsMS40LDAuNmMwLjQsMC40LDAuNiwwLjksMC42LDEuNHYxLjVjMCwwLjUtMC4yLDEuMS0wLjYsMS40Yy0wLjQsMC40LTAuOSwwLjYtMS40LDAuNmgtMg0KCWMtMC41LDAtMS4xLTAuMi0xLjQtMC42Yy0wLjQtMC40LTAuNi0wLjktMC42LTEuNUg4LjdjMCwxLjEtMC45LDItMiwySDQuNmMtMC41LDAtMS0wLjItMS40LTAuNWMtMC40LTAuNC0wLjYtMC45LTAuNi0xLjRWOC4xDQoJYzAtMS4xLDAuOS0yLDItMmgyYzEuMSwwLDIsMC45LDIsMmMwLDAsMCwwLDAsMC4xaDAuOWMwLTAuNSwwLjItMS4xLDAuNi0xLjVjMC40LTAuNCwwLjktMC42LDEuNC0wLjZMMTMuNiw2LjF6IE03LjMsOC4xDQoJYzAtMC4yLTAuMS0wLjQtMC4yLTAuNUM3LDcuNSw2LjgsNy40LDYuNiw3LjRoLTJjLTAuMiwwLTAuMywwLjEtMC41LDAuMkM0LjEsNy43LDQsNy45LDQsOC4xdjEuNWMwLDAuNCwwLjMsMC43LDAuNywwLjdoMg0KCWMwLjIsMCwwLjMtMC4xLDAuNS0wLjJjMC4xLTAuMSwwLjItMC4zLDAuMi0wLjVINi45Yy0wLjEsMC0wLjEsMC0wLjIsMGMtMC4xLDAtMC4xLDAtMC4yLTAuMWMtMC4xLDAtMC4xLTAuMS0wLjItMC4xDQoJQzYuMiw5LDYuMiw4LjYsNi40LDguNGMwLDAsMC4xLTAuMSwwLjItMC4xYzAuMSwwLDAuMS0wLjEsMC4yLTAuMWgwLjJMNy4zLDguMUw3LjMsOC4xeiBNMTQuMyw4LjFjMC0wLjQtMC4zLTAuNy0wLjctMC43aC0yLjENCgljLTAuNCwwLTAuNywwLjMtMC43LDAuN2MwLDAsMCwwLDAsMGgwLjRoMC4yYzAuMSwwLDAuMSwwLDAuMiwwLjFjMC4xLDAsMC4xLDAuMSwwLjIsMC4xQzEyLDguNiwxMiw5LDExLjgsOS4zYzAsMC0wLjEsMC4xLTAuMiwwLjENCgljLTAuMSwwLTAuMSwwLjEtMC4yLDAuMWMtMC4xLDAtMC4xLDAtMC4yLDBoLTAuNGMwLDAuMiwwLjEsMC40LDAuMiwwLjVjMC4xLDAuMSwwLjMsMC4yLDAuNSwwLjJoMmMwLjIsMCwwLjMtMC4xLDAuNS0wLjINCgljMC4xLTAuMSwwLjItMC4zLDAuMi0wLjVMMTQuMyw4LjFMMTQuMyw4LjF6Ii8+DQo8L3N2Zz4NCg=='
            )
          ),
          (Q = document.createElementNS(this.ns, 'use')).setAttribute('xlink:href', '#' + ee),
          X.parentNode.replaceChild(Q, X),
          (ie = X.getAttribute('transform')) &&
          (
            Q.setAttribute('transform', ie),
            X.removeAttribute('transform')
          ),
          le &&
          (X.removeChild(le), Q.appendChild(le)),
          ge ||
          (X.setAttribute('id', ee), T.appendChild(X), ge = !0)
        ) : Z.indexOf(Constants.Icon_Note) >= 0 ? (
          he ||
          (
            te = SDUI.Utils.MakeGuid(),
            X.setAttribute(
              'xlink:href',
              'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxOCAxOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTggMTg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiNGRjk5MDA7fQ0KCS5zdDF7ZmlsbDojRkZGRjAwO30NCjwvc3R5bGU+DQo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTQuMiw2Ljh2N2MwLDAuNC0wLjMsMC44LTAuOCwwLjhINC45Yy0wLjQsMC0wLjgtMC4zLTAuOC0wLjhWMy4zYzAtMC40LDAuMy0wLjgsMC44LTAuOGg1DQoJYzAuMiwwLDAuNSwwLjEsMC43LDAuMmMwLjIsMC4xLDAuNCwwLjIsMC42LDAuNGwyLjUsMi40YzAuMiwwLjIsMC4zLDAuNCwwLjQsMC42QzE0LjEsNi40LDE0LjIsNi42LDE0LjIsNi44eiBNNS4yLDEzLjZoOHYtNkg5LjkNCgljLTAuNCwwLTAuOC0wLjMtMC44LTAuOFYzLjZoLTRWMTMuNnoiLz4NCjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik01LjIsMTMuNmg4di02SDkuOWMtMC40LDAtMC44LTAuMy0wLjgtMC44VjMuNmgtNFYxMy42eiIvPg0KPC9zdmc+DQo='
            )
          ),
          (Q = document.createElementNS(this.ns, 'use')).setAttribute('xlink:href', '#' + te),
          X.parentNode.replaceChild(Q, X),
          ne = X.getAttribute('onclick'),
          Q.setAttribute('onclick', ne),
          Q.setAttribute('style', 'cursor:pointer'),
          X.removeAttribute('onclick'),
          (ie = X.getAttribute('transform')) &&
          (
            Q.setAttribute('transform', ie),
            X.removeAttribute('transform')
          ),
          le &&
          X.removeChild(le),
          he ||
          (X.setAttribute('id', te), T.appendChild(X), he = !0)
        ) : Z.indexOf(Constants.Icon_Info) >= 0 ? (
          me ||
          (
            ae = SDUI.Utils.MakeGuid(),
            X.setAttribute(
              'xlink:href',
              'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMl8xXyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxOCAxOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTggMTg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiMzMzY2OTk7fQ0KCS5zdDF7ZmlsbDojRkZGRkZGO30NCjwvc3R5bGU+DQo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTMuOSw2LjJjMSwxLjcsMSwzLjgsMCw1LjVjLTAuNSwwLjgtMS4yLDEuNS0yLDJjLTEuNywxLTMuOCwxLTUuNSwwYy0wLjgtMC41LTEuNS0xLjItMi0yYy0xLTEuNy0xLTMuOCwwLTUuNQ0KCWMwLjUtMC44LDEuMi0xLjUsMi0yYzEuNy0xLDMuOC0xLDUuNSwwQzEyLjgsNC42LDEzLjQsNS4zLDEzLjksNi4yeiIvPg0KPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwLjgsMTEuNnYwLjdjMCwwLjItMC4yLDAuMy0wLjMsMC4zSDcuOGMtMC4yLDAtMC4zLTAuMS0wLjMtMC4zdi0wLjdjMC0wLjEsMC0wLjIsMC4xLTAuMg0KCWMwLjEtMC4xLDAuMS0wLjEsMC4yLTAuMWgwLjN2LTJINy44Yy0wLjIsMC0wLjMtMC4yLTAuMy0wLjNWOC4yYzAtMC4yLDAuMS0wLjMsMC4zLTAuM2gyYzAuMiwwLDAuMywwLjIsMC4zLDAuM3YzaDAuMw0KCWMwLjEsMCwwLjIsMCwwLjIsMC4xQzEwLjgsMTEuNCwxMC44LDExLjUsMTAuOCwxMS42eiBNMTAuMiw1LjV2MWMwLDAuMi0wLjEsMC4zLTAuMywwLjNIOC41Yy0wLjEsMC0wLjIsMC0wLjItMC4xDQoJQzguMiw2LjcsOC4yLDYuNiw4LjIsNi41di0xYzAtMC4xLDAtMC4yLDAuMS0wLjJjMC4xLTAuMSwwLjEtMC4xLDAuMi0wLjFoMS4zQzEwLDUuMiwxMC4yLDUuMywxMC4yLDUuNXoiLz4NCjwvc3ZnPg0K'
            )
          ),
          (Q = document.createElementNS(this.ns, 'use')).setAttribute('xlink:href', '#' + ae),
          X.parentNode.replaceChild(Q, X),
          ne = X.getAttribute('onclick'),
          Q.setAttribute('onclick', ne),
          Q.setAttribute('style', 'cursor:pointer'),
          X.removeAttribute('onclick'),
          (ie = X.getAttribute('transform')) &&
          (
            Q.setAttribute('transform', ie),
            X.removeAttribute('transform')
          ),
          le &&
          X.removeChild(le),
          me ||
          (X.setAttribute('id', ae), T.appendChild(X), me = !0)
        ) : Z.indexOf(Constants.Icon_ExpandedView) >= 0 ? (
          Ce ||
          (
            re = SDUI.Utils.MakeGuid(),
            X.setAttribute(
              'xlink:href',
              'data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIwLjIyMjIyaW4iIGhlaWdodD0iMC4yNzc3OGluIiB2aWV3Qm94PSIwIDAgMTYgMjAiPjx0aXRsZT5pY29uLWV4cGFuZC1zdmctMDI8L3RpdGxlPjxwYXRoIGQ9Ik01LjA1MTkyLDguNDEyYS4xOTYyNy4xOTYyNywwLDAsMSwwLC4yODczNkwyLjk3NywxMC43NzQ0bC45LjlhLjM5MjYuMzkyNiwwLDAsMSwwLC41NjI1Ni4zODcyNC4zODcyNCwwLDAsMS0uMjgxMjkuMTE4NzJoLTIuOEEuMzg3Mi4zODcyLDAsMCwxLC41MTQ0OCwxMi4yMzdhLjM4MTUzLjM4MTUzLDAsMCwxLS4xMTg3Mi0uMjgxMjh2LTIuOEEuMzgxNTMuMzgxNTMsMCwwLDEsLjUxNDQ4LDguODc0NGEuMzkyNTkuMzkyNTksMCwwLDEsLjU2MjU3LDBsLjkuOSwyLjA3NDg4LTIuMDc1YS4xOTY4MS4xOTY4MSwwLDAsMSwuMjg3NTMsMGwuNzEyNDcuNzEyNjRaTTkuOTk1NzYsMy4xNTU2OHYyLjhhLjM4MTU2LjM4MTU2LDAsMCwxLS4xMTg3MS4yODEyOC4zOTI1OS4zOTI1OSwwLDAsMS0uNTYyNTcsMGwtLjktLjktMi4wNzUsMi4wNzVhLjE5NjgxLjE5NjgxLDAsMCwxLS4yODc1MywwbC0uNzEyNDctLjcxMjY0YS4xOTY2Mi4xOTY2MiwwLDAsMSwwLS4yODczNmwyLjA3NS0yLjA3NS0uOS0uOWEuMzkyNTcuMzkyNTcsMCwwLDEsMC0uNTYyNTYuMzg3Mi4zODcyLDAsMCwxLC4yODEyOC0uMTE4NzJoMi44YS4zODcyNC4zODcyNCwwLDAsMSwuMjgxMjkuMTE4NzJBLjM4MTU2LjM4MTU2LDAsMCwxLDkuOTk1NzYsMy4xNTU2OFoiLz48L3N2Zz4='
            )
          ),
          (Q = document.createElementNS(this.ns, 'use')).setAttribute('xlink:href', '#' + re),
          X.parentNode.replaceChild(Q, X),
          ne = X.getAttribute('onclick'),
          Q.setAttribute('onclick', ne),
          Q.setAttribute('style', 'cursor:pointer'),
          X.removeAttribute('onclick'),
          (ie = X.getAttribute('transform')) &&
          (
            Q.setAttribute('transform', ie),
            X.removeAttribute('transform')
          ),
          le &&
          X.removeChild(le),
          Ce ||
          (X.setAttribute('id', re), T.appendChild(X), Ce = !0)
        ) : s &&
        (oe = !0, pe = Z);
        if (oe) {
          for (se = !1, c = 0; c < De.length; c++) De[c].url == pe &&
            (y = De[c].id, se = !0);
          se ||
            (y = SDUI.Utils.MakeGuid()),
            (Q = document.createElementNS(this.ns, 'use')).setAttribute('xlink:href', '#' + y),
            X.parentNode.replaceChild(Q, X),
            (ie = X.getAttribute('transform')) &&
            (
              Q.setAttribute('transform', ie),
              X.removeAttribute('transform')
            ),
            le &&
            (X.removeChild(le), Q.appendChild(le)),
            se ||
            (
              X.setAttribute('id', y),
              T.appendChild(X),
              De.push({
                url: pe,
                id: y
              })
            )
        }
      }
      de &&
        De.length &&
        (n.externImageList = De)
    }
    var ye,
      fe,
      Le,
      Ie,
      Te = '';
    if (!r) for (S = 0; S < I.length; ++S) '\'' == (ye = I[S])[0] &&
      '\'' == ye[ye.length - 1] &&
      (ye = ye.slice(1, - 1)),
      (fe = this.GetFontImportName(ye)) &&
      fe.length &&
      (Te += fe);
    if (
      Te.length > 0 &&
      (
        (Le = document.createElementNS(m, 'style')).setAttribute('type', 'text/css'),
        Le.removeAttribute('xml:space'),
        Ie = document.createTextNode(Te),
        Le.appendChild(Ie),
        T.appendChild(Le)
      ),
      h.setAttribute('width', p.width),
      h.setAttribute('height', p.height),
      h.setAttribute('viewBox', p.x + ' ' + p.y + ' ' + p.width + ' ' + p.height),
      h.removeAttribute('class'),
      n &&
      (
        n.width &&
        h.setAttribute('width', n.width),
        n.height &&
        h.setAttribute('height', n.height),
        void 0 !== n.left &&
        void 0 !== n.top &&
        h.setAttribute(
          'style',
          'position:relative; left:' + Math.round(n.left) + 'px; top:' + Math.round(n.top) + 'px; display:block;'
        ),
        void 0 !== n.id &&
        h.setAttribute('id', n.id),
        n.asDOMElement
      )
    ) return h;
    var be,
      Me = Utils3.XML2Str(h);
    be = / xmlns=\"(undefined)?\"/g,
      Me = Me.replace(be, ''),
      o &&
      (
        be = /xmlns:NS[0-9]+=\"\" /g,
        Me = Me.replace(be, ''),
        be = /NS[0-9]+:/g,
        Me = Me.replace(be, '')
      ),
      be = / xmlns="http:\/\/www.w3.org\/1999\/xhtml"/g,
      Me = Me.replace(be, ''),
      be = /\xA0/g,
      Me = Utils3.StrReplaceAll('&nbsp;', ' ', Me = Me.replace(be, ' ')),
      Me = Utils3.StrReplaceAll('&quot;', '', Me),
      Me = Utils3.StrReplaceAll('$', '&#36;', Me);
    return a ||
      (
        Me = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' + Me
      ),
      n &&
        n.returnBoth ? {
        element: h,
        svg: Me
      }
        : Me
  }

  /**
     * Cleans up resources when an exception occurs during export operations
     * @param error - The exception that was thrown
     * @throws Rethrows the passed exception after cleanup
     */
  static ExportExceptionCleanup(error) {
    T3Util.Log("O.Opt ExportExceptionCleanup - Input:", error);

    // Simply rethrow the error after performing any necessary cleanup
    // Additional cleanup logic would be added here if needed

    T3Util.Log("O.Opt ExportExceptionCleanup - Output: Rethrowing exception");
    throw error;
  }

  /**
     * Generates a PNG or JPEG preview image from the current document
     * @param callback - Function to call with the resulting blob
     * @param maxWidth - Maximum width of the preview image (default: 2400)
     * @param maxHeight - Maximum height of the preview image (default: 2400)
     * @param options - Additional options for image generation (format, fillBackground, zList)
     * @returns void - Result is provided through the callback
     */
  static GeneratePreviewPNG1(callback, maxWidth, maxHeight, options) {
    T3Util.Log("O.Opt GeneratePreviewPNG - Input:", {
      maxWidth: maxWidth || "default",
      maxHeight: maxHeight || "default",
      options
    });

    // Set default dimensions if not provided
    maxWidth = maxWidth || 2400;
    maxHeight = maxHeight || 2400;

    // Determine export format from options or default to PNG
    const exportFormat = options && options.format || OptConstant.ExportType.PNG;

    if (exportFormat == OptConstant.ExportType.PNG || exportFormat == OptConstant.ExportType.JPEG) {
      // Generate SVG and convert it to image
      this.GenerateEncapsulatedSVG((svgData, success) => {
        if (svgData && success) {
          // Extract SVG dimensions and calculate scale factor
          const svgSize = Style.ExtractSVGSize(svgData);
          const scaleFactor = Math.min(1, maxWidth / svgSize.width, maxHeight / svgSize.height);

          // Apply scale factor to dimensions
          svgSize.width = Math.round(svgSize.width * scaleFactor);
          svgSize.height = Math.round(svgSize.height * scaleFactor);

          // Create an image from the SVG data
          const image = new Image();
          image.onload = function () {
            // Create canvas with appropriate dimensions
            const canvas = document.createElement('canvas');
            canvas.width = svgSize.width;
            canvas.height = svgSize.height;

            const context = canvas.getContext('2d');

            // Fill background with white for JPEG or if explicitly requested
            if (exportFormat == OptConstant.ExportType.JPEG || (options && options.fillBackground)) {
              context.fillStyle = '#fff';
              context.fillRect(0, 0, svgSize.width, svgSize.height);
            }

            // Draw the SVG image onto the canvas
            context.drawImage(image, 0, 0, svgSize.width, svgSize.height);

            // Determine the MIME type based on export format
            const mimeType = exportFormat == OptConstant.ExportType.JPEG ? 'image/jpeg' : 'image/png';

            // Convert canvas to blob and provide it to the callback
            canvas.toBlob((blob) => {
              T3Util.Log("O.Opt GeneratePreviewPNG - Output:", {
                format: mimeType,
                blobSize: blob ? blob.size : 0
              });
              callback(blob);
            }, mimeType, 0.8);
          };

          // Set the image source to the SVG data
          image.src = 'data:image/svg+xml,' + encodeURIComponent(svgData);
        } else {
          T3Util.Log("O.Opt GeneratePreviewPNG - Output: null (invalid SVG data)");
          callback(null);
        }
      }, false, false, true, 0, options && options.zList || null);
    } else {
      T3Util.Log("O.Opt GeneratePreviewPNG - Output: null (unsupported format)");
      callback(null);
    }
  }

  static GeneratePreviewPNG(e, t, a, r) {
    t = t ||
      2400,
      a = a ||
      2400;
    const i = r &&
      r.format ||
      OptConstant.ExportType.PNG;
    if (
      i == OptConstant.ExportType.PNG ||
      i == OptConstant.ExportType.JPEG
    ) {
      this.GenerateEncapsulatedSVG(
        (
          function (n, o) {
            if (n && o) {
              var s = Style.ExtractSVGSize(n),
                l = Math.min(1, t / s.width, a / s.height);
              s.width = Math.round(s.width * l),
                s.height = Math.round(s.height * l);
              var S = new Image;
              S.onload = function () {
                var t = document.createElement('canvas');
                t.width = s.width,
                  t.height = s.height;
                var a = t.getContext('2d');
                (i == OptConstant.ExportType.JPEG || r && r.fillBackground) &&
                  (a.fillStyle = '#fff', a.fillRect(0, 0, s.width, s.height)),
                  a.drawImage(S, 0, 0, s.width, s.height);
                var n = i == OptConstant.ExportType.JPEG ? 'image/jpeg' : 'image/png';
                t.toBlob((function (t) {
                  e(t)
                }), n, 0.8)
              },
                S.src = 'data:image/svg+xml,' + encodeURIComponent(n)
            } else e(null)
          }
        ),
        !1,
        !1,
        !0,
        0,
        r &&
        r.zList ||
        null
      )
    } else e(null)
  }

  /**
   * Generates an encapsulated SVG representation of the document
   * @param callback - Function to call with the resulting SVG and a success flag
   * @param includeLinks - Whether to include hyperlinks in the SVG
   * @param includeTooltips - Whether to include tooltips in the SVG
   * @param inlineImages - Whether to inline images as base64 data URIs
   * @param padding - Padding to add around the SVG content (default: 12)
   * @param objectList - Optional list of specific objects to include in the SVG
   * @returns The SVG string directly if no callback is provided
   */
  static GenerateEncapsulatedSVG(callback, includeLinks, includeTooltips, inlineImages, padding, objectList) {
    T3Util.Log("O.Opt GenerateEncapsulatedSVG - Input:", {
      hasCallback: !!callback,
      includeLinks,
      includeTooltips,
      inlineImages,
      padding,
      hasObjectList: !!objectList
    });

    let svgOutput = null;
    const exportOptions = {
      externImagePrep: true
    };

    // Configure export options based on parameters
    if (includeLinks) {
      exportOptions.exportLinks = true;
    }

    if (includeTooltips) {
      exportOptions.exportTT = true;
    }

    if (inlineImages) {
      exportOptions.inlineExternalImages = true;
    }

    if (objectList) {
      exportOptions.zList = objectList;
    }

    // Use default padding of 12 if not specified or not a number
    if (padding === undefined || typeof padding !== 'number') {
      padding = 12;
    }

    // Generate the SVG
    svgOutput = this.ExportSVGXML(true, padding, false, !includeLinks, false, exportOptions);

    // If no callback, just return the SVG string
    if (!callback) {
      T3Util.Log("O.Opt GenerateEncapsulatedSVG - Output: SVG string returned directly");
      return svgOutput;
    }

    // If we have external images to process
    if (exportOptions.externImageList && exportOptions.externImageList.length) {
      // Function to replace image URLs in the SVG
      const replaceImageRef = (originalUrl, newUrl) => {
        svgOutput = svgOutput.replace(originalUrl, newUrl);
      };

      // Process an individual external image
      const processExternalImage = (imageUrl) => {
        let relativePath;
        const originalUrl = imageUrl;
        let isCmsResource = false;

        // Check if this is a CMS resource
        if (imageUrl.toLowerCase().indexOf(Constants.FilePath_CMSRoot.toLowerCase()) === 0) {
          relativePath = imageUrl.slice(Constants.FilePath_CMSRoot.length);
          isCmsResource = true;
        }

        let isBinaryImage = false;
        let imageType = DSConstant.GetImageBlobType(StyleConstant.ImageDir.Svg);

        // Determine image type from extension
        if (imageUrl.toLowerCase().indexOf('.png') > 0) {
          imageType = DSConstant.GetImageBlobType(StyleConstant.ImageDir.Png);
          isBinaryImage = true;
        } else if (imageUrl.toLowerCase().indexOf('.jpg') > 0) {
          imageType = DSConstant.GetImageBlobType(StyleConstant.ImageDir.Jpg);
          isBinaryImage = true;
        }

        // Handle image data once loaded
        const onImageLoaded = (imageData) => {
          if (imageData) {
            // For inline images that aren't already binary, detect format from content
            if (exportOptions.inlineExternalImages && !isBinaryImage) {
              const imageBytes = new Uint8Array(imageData);
              let formatDetected = false;

              // Check for JPEG signature
              if (imageData.byteLength >= 3 &&
                imageBytes[0] === 255 &&
                imageBytes[1] === 216 &&
                imageBytes[2] === 255) {
                imageType = DSConstant.GetImageBlobType(StyleConstant.ImageDir.Jpg);
                formatDetected = true;
              }

              // Check for PNG signature
              if (!formatDetected &&
                imageData.byteLength >= 8 &&
                imageBytes[0] === 137 &&
                imageBytes[1] === 80 &&
                imageBytes[2] === 78 &&
                imageBytes[3] === 71 &&
                imageBytes[4] === 13 &&
                imageBytes[5] === 10 &&
                imageBytes[6] === 26 &&
                imageBytes[7] === 10) {
                imageType = DSConstant.GetImageBlobType(StyleConstant.ImageDir.Png);
                formatDetected = true;
              }

              // Default to SVG if no binary format detected
              if (!formatDetected) {
                imageType = DSConstant.GetImageBlobType(StyleConstant.ImageDir.Svg);
              }
            }

            // Create data URI from image data
            const dataUri = 'data:' + imageType + ';base64,' + Utils2.ArrayBufferToBase64(imageData);

            // Replace the URL in the SVG
            if (!isCmsResource && inlineImages) {
              const encodedUrl = SDJS_StrReplaceAll('&', '&amp;', imageUrl);
              replaceImageRef(encodedUrl, dataUri);
            } else {
              replaceImageRef(originalUrl, dataUri);
            }
          }

          // Remove this image from the processing list
          removeProcessedImage(originalUrl);
        };

        // Load the image data
        if (isCmsResource) {
          SDUI.CMSContent.GetResourceByRelativePath(SDUI.AppSettings.ContentSource, relativePath, onImageLoaded);
        } else {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', imageUrl, true);
          xhr.responseType = 'arraybuffer';

          xhr.onload = function () {
            if (xhr.status === 200) {
              onImageLoaded(this.response);
            } else {
              onImageLoaded(null);
            }
          };

          xhr.onerror = function () {
            onImageLoaded(null);
          };

          xhr.send();
        }
      };

      // Remove an image from the processing list
      const removeProcessedImage = (imageUrl) => {
        for (let i = 0; i < exportOptions.externImageList.length; i++) {
          if (exportOptions.externImageList[i].url === imageUrl) {
            exportOptions.externImageList.splice(i, 1);
            break;
          }
        }
      };

      // Start processing all external images
      for (let i = 0; i < exportOptions.externImageList.length; i++) {
        processExternalImage(exportOptions.externImageList[i].url);
      }

      // Poll until all images are processed or timeout is reached
      let attemptCount = 0;
      const checkCompletion = () => {
        if (exportOptions.externImageList.length) {
          if (attemptCount < 100) {
            setTimeout(checkCompletion, 100);
          } else {
            // Timeout reached, return what we have
            callback(svgOutput, false);
          }
          attemptCount++;
        } else {
          // All images processed successfully
          callback(svgOutput, true);
        }
      };

      setTimeout(checkCompletion, 100);
      T3Util.Log("O.Opt GenerateEncapsulatedSVG - Output: Processing external images asynchronously");
      return svgOutput;
    }

    // No external images to process
    callback(svgOutput, true);
    T3Util.Log("O.Opt GenerateEncapsulatedSVG - Output: SVG generated and passed to callback");
  }

}

export default ExportUtil
