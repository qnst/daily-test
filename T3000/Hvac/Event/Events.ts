
import Utils4 from '../Helper/Utils4'
import Resources from '../Data/Resources'
import $ from 'jquery'
import GlobalData from '../Data/GlobalData'
import Commands from '../Opt/Business/Commands'
import ConstantData from '../Data/ConstantData'
import ConstantData2 from '../Data/ConstantData2'

class Events {

  static OnClick(e, t, a) {
    var r = e.currentTarget;
    if (r) {
      var i = $(r);
      if (i.attr("disabled") || i.hasClass("disabled"))
        return !1
    }
    Events.Handle(e, t, a)
  }

  static OnFocus(e, t, a) {
    return Events.Handle(e, t, a)
  }

  static OnMouseDown(e, t, a) {
    Events.Handle(e, t, a)
  }

  static OnMouseOver(e, t, a) {
    Events.Handle(e, t, a)
  }

  static OnKeyUp(e) {
    e.keyCode === ConstantData2.Keys.Space && (ConstantData.DocumentContext.SpacebarDown = !1)
  }

  static OnKeyDown(e) {
    var t = e.keyCode
      , a = Utils4.GetModifierKeys(e);
    t === ConstantData2.Keys.Space && (ConstantData.DocumentContext.SpacebarDown = !0);
    var r = $(e.target || e.srcElement);
    8 != e.keyCode || r.is('input,[contenteditable="true"],textarea') && "radio" != r.attr("type") && "checkbox" != r.attr("type") || e.preventDefault();
    try {
      var i = !1;
      r && r[0].attributes && (i = r[0].attributes.getNamedItem(/*Constants.Attr_DropdownText*/"dropDownText")),
        null != i && "1" === i.value || e.keyCode !== ConstantData2.Keys.Alt && e.keyCode !== ConstantData2.Keys.Ctrl,
        // && Commands.MainController.Dropdowns.HideAllDropdowns(),
        Commands.MainController.HandleKeyDown(e, t, a)
    } catch (e) {

      GlobalData.optManager.ExceptionCleanup(e);
      throw e;
    }
  }

  static OnKeyPress(e) {
    var t = e.charCode;
    try {
      Commands.MainController.HandleKeyPress(e, t)
    } catch (e) {
      throw e;
    }
  }

}

export default Events
