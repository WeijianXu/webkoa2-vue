import './styles/common.less';
import Header from '../../widget/header/Header';
import Footer from '../../widget/footer/footer';
Footer.init();
// Header.init();
ReactDOM.render(
  <Header />,
  document.getElementById('header')
);