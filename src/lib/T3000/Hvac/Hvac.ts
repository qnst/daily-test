
import App from './Page/Page.Main';
import * as Utils from './Helper/Utils1';
import Models from './Data/Constant';
import T3Opt from './Doc/T3Opt';

const Hvac = {
  App: new App(),
  // Doc: new Doc(),
  UI: new T3Opt(),
  Utils: Utils,
  Models: Models
}

export default Hvac;
