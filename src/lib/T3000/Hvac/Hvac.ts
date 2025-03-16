
import App from './Page/P.Main';
import * as Utils from './Util/Utils1';
import Models from './Data/Constant/T3Constant';
import T3Opt from './Doc/T3Opt';

const Hvac = {
  App: new App(),
  // Doc: new Doc(),
  UI: new T3Opt(),
  Utils: Utils,
  Models: Models
}

export default Hvac;
