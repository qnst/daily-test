
import App from './Page/Page.Main';
import * as Utils from './Helper/Utils1';
import Models from './Data/Constant';
import Doc from './Doc/Doc.DocHandler1';
import UI from './Doc/Doc.UI';

const Hvac = {
  App: new App(),
  Doc: new Doc(),
  UI: new UI(),
  Utils: Utils,
  Models: Models
}

export default Hvac;
