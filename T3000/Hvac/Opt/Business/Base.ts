
import GlobalData from '../../Data/GlobalData'
import ListManager from '../../Data/ListManager'
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
        c = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !1)
      ).RecentSymbols.length,
        S = o(t);
      if (i) if (S >= 0) return (
        c = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !0)
      ).RecentSymbols.splice(S, 1)
      // ,
      // void SDUI.Commands.MainController.Symbols.RecentSymbols_DisplaySymbols(c.RecentSymbols, l);
      if (
        S > 0 &&
        (n = c.RecentSymbols.splice(S, 1), c.RecentSymbols.unshift(n[0])),
        - 1 === o(t)
      ) {
        e.IsSwimlane() &&
          (s = !0),
          e.flags & ConstantData.ObjFlags.SEDO_NoLinking &&
          (s = !0);
        var c = GlobalData.optManager.GetObjectPtr(GlobalData.optManager.theSEDSessionBlockID, !0);
        n = new RecentSymbol(t, a, s),
          c.RecentSymbols.unshift(n),
          c.RecentSymbols.length > ConstantData.Defines.MaxRecentSymbols &&
          c.RecentSymbols.pop(),
          r &&
          1
        // SDUI.Commands.MainController.Symbols.StoreSpecialSymbol(c.RecentSymbols[0].ItemId, c.RecentSymbols[0])
      }
      // SDUI.Commands.MainController.Symbols.RecentSymbols_DisplaySymbols(c.RecentSymbols, l)
    }
  }

  ChangeTarget(e) { }
}

export default Base;
