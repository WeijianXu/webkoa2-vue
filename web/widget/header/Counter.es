
export default class Counter extends React.Component {
  static propTypes = {
    userId: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      totalVisitor: 0,
      currLoginCount: 0,
      currOnlineCount: 0
    }
  }
  render() {
    return (
      <div className="counterbar">
        <div className="counter">
          累计访问
          <em className="text-primary">{this.state.totalVisitor}</em>人，当前登录
          <em className="text-danger" >{this.state.currLoginCount}</em>人，当前在线
          <em className="text-info">{this.state.currOnlineCount}</em>人
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    var url = window.PATH_CONTEXT + "/portal/flowcount/visitUser";
    axios.get(url).then((res) => {
      this.setState({
        totalVisitor: res.totalCount ? res.totalCount : 0,
        currLoginCount: res.loginCount ? res.totalCount : 0,
        currOnlineCount: res.onlineCount ? res.onlineCount : 0
      })
    }).catch((error) => {
      console.log(error);
    });
  }
}