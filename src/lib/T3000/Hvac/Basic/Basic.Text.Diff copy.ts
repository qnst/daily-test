



// // import SDJS from "../SDJS/SDJS.Index";
// // import SDUI from "../SDUI/SDUI.Index";
// // import Basic from "./Basic.Index";
// // import GPP from "../gListManager";
// import $ from 'jquery';
// import T3Svg from "../Helper/SVG.t2"

// import Utils1 from "../Helper/Utils1"
// import Utils2 from "../Helper/Utils2"
// import Utils3 from "../Helper/Utils3"







// Basic.Text._DiffObj = null,
//   Basic.Text.DiffObj = function () {
//     //'use strict';
//     return Basic.Text._DiffObj ||
//       (Basic.Text._DiffObj = new Basic.Text.Diff),
//       Basic.Text._DiffObj
//   },
//   Basic.Text.DiffStrings = function (e, t) {
//     //'use strict';
//     var a,
//       r,
//       i = Basic.Text.DiffObj().diff(e, t),
//       n = {
//         str: '',
//         pos: 0,
//         replace: 0
//       },
//       o = 0,
//       s = 0;
//     if (i && i.length) for (
//       i[0].added ||
//       i[0].removed ||
//       (o++, r = i[0].value || '', n.pos = r.length),
//       i[(s = i.length) - 1].added ||
//       i[s - 1].removed ||
//       s--,
//       a = o;
//       a < s;
//       a++
//     ) r = i[a].value ||
//       '',
//       i[a].added ||
//       (n.replace += r.length),
//       i[a].removed ||
//       (n.str += r);
//     return n
//   },
//   Basic.Text.Diff = function () {
//   },
//   Basic.Text.Diff.prototype = {
//     diff: function (e, t) {
//       var a = this;
//       if (t === e) return [{
//         value: t
//       }
//       ];
//       if (!t) return [{
//         value: e,
//         removed: !0
//       }
//       ];
//       if (!e) return [{
//         value: t,
//         added: !0
//       }
//       ];
//       t = this.removeEmpty(this.tokenize(t)),
//         e = this.removeEmpty(this.tokenize(e));
//       var r = t.length,
//         i = e.length,
//         n = 1,
//         o = r + i,
//         s = [
//           {
//             newPos: - 1,
//             components: []
//           }
//         ],
//         l = this.extractCommon(s[0], t, e, 0);
//       if (s[0].newPos + 1 >= r && l + 1 >= i) return [{
//         value: t.join('')
//       }
//       ];
//       function S() {
//         for (var o = - 1 * n; o <= n; o += 2) {
//           var l = void 0,
//             S = s[o - 1],
//             c = s[o + 1],
//             u = (c ? c.newPos : 0) - o;
//           S &&
//             (s[o - 1] = void 0);
//           var p = S &&
//             S.newPos + 1 < r,
//             d = c &&
//               0 <= u &&
//               u < i;
//           if (p || d) {
//             if (
//               !p ||
//                 d &&
//                 S.newPos < c.newPos ? (l = a.clonePath(c), a.pushComponent(l.components, void 0, !0)) : ((l = S).newPos++, a.pushComponent(l.components, !0, void 0)),
//               u = a.extractCommon(l, t, e, o),
//               l.newPos + 1 >= r &&
//               u + 1 >= i
//             ) return a.buildValues(l.components, t, e, a.useLongestToken);
//             s[o] = l
//           } else s[o] = void 0
//         }
//         n++
//       }
//       for (; n <= o;) {
//         var c = S();
//         if (c) return c
//       }
//     },
//     pushComponent: function (e, t, a) {
//       var r = e[e.length - 1];
//       r &&
//         r.added === t &&
//         r.removed === a ? e[e.length - 1] = {
//           count: r.count + 1,
//           added: t,
//           removed: a
//         }
//         : e.push({
//           count: 1,
//           added: t,
//           removed: a
//         })
//     },
//     extractCommon: function (e, t, a, r) {
//       for (
//         var i = t.length,
//         n = a.length,
//         o = e.newPos,
//         s = o - r,
//         l = 0;
//         o + 1 < i &&
//         s + 1 < n &&
//         t[o + 1] === a[s + 1];
//       ) o++,
//         s++,
//         l++;
//       return l &&
//         e.components.push({
//           count: l
//         }),
//         e.newPos = o,
//         s
//     },
//     removeEmpty: function (e) {
//       for (var t = [], a = 0; a < e.length; a++) e[a] &&
//         t.push(e[a]);
//       return t
//     },
//     tokenize: function (e) {
//       return e.split('')
//     },
//     buildValues: function (e, t, a, r) {
//       for (var i = 0, n = e.length, o = 0, s = 0; i < n; i++) {
//         var l = e[i];
//         if (l.removed) {
//           if (
//             l.value = a.slice(s, s + l.count).join(''),
//             s += l.count,
//             i &&
//             e[i - 1].added
//           ) {
//             var S = e[i - 1];
//             e[i - 1] = e[i],
//               e[i] = S
//           }
//         } else {
//           if (!l.added && r) {
//             var c = t.slice(o, o + l.count);
//             c = _utilMap2.default(c, (function (e, t) {
//               var r = a[s + t];
//               return r.length > e.length ? r : e
//             })),
//               l.value = c.join('')
//           } else l.value = t.slice(o, o + l.count).join('');
//           o += l.count,
//             l.added ||
//             (s += l.count)
//         }
//       }
//       return e
//     },
//     clonePath: function (e) {
//       return {
//         newPos: e.newPos,
//         components: e.components.slice(0)
//       }
//     }
//   }

// export default Basic.Text.Diff
