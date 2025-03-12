
import T3Gv from '../../Data/T3Gv'
import ConstantData from '../../Data/ConstantData'
import RecentSymbol from '../../Model/RecentSymbol'

class Base {
  UpdateShapeList(e, t, a, r, i) {
    console.log('Business.js Start to UpdateShapeList', e, t, a, r, i);

    var n,
      o = function (e) {
        var t,
          a = c.RecentSymbols.length;
        for (t = 0; t < a; t++) if (e === c.RecentSymbols[t].ItemId) return t;
        return - 1
      },
      s = !1;
    if (!e || null != e.BlockID) {
      var l = 0 === (
        c = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.sedSessionBlockId, !1)
      ).RecentSymbols.length,
        S = o(t);
      if (i) if (S >= 0) return (
        c = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.sedSessionBlockId, !0)
      ).RecentSymbols.splice(S, 1)
      if (
        S > 0 &&
        (n = c.RecentSymbols.splice(S, 1), c.RecentSymbols.unshift(n[0])),
        - 1 === o(t)
      ) {
        e.IsSwimlane() &&
          (s = !0),
          e.flags & ConstantData.ObjFlags.SEDO_NoLinking &&
          (s = !0);
        var c = T3Gv.optManager.GetObjectPtr(T3Gv.optManager.sedSessionBlockId, !0);
        n = new RecentSymbol(t, a, s),
          c.RecentSymbols.unshift(n),
          c.RecentSymbols.length > ConstantData.Defines.MaxRecentSymbols &&
          c.RecentSymbols.pop(),
          r &&
          1
      }
    }
  }

  ChangeTarget(e) { }
}

export default Base;
