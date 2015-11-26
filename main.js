var PreviewBox = React.createClass({
  loadPreviews: function(fonts) {
    this.setState({data: fonts});
  },
  getInitialState: function() {
    var dummy = "Lorem ipsum dolor sit amet, consectetur adipisicing elit,";
        dummy += " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    return {data: [], lorem: dummy};
  },
  componentDidMount: function() {
    var app = new InstalledFonts(this.loadPreviews);
  },
  handlePreviewSubmit: function(lorem) {
    this.setState({lorem: lorem});
  },
  render: function() {
    return (
      <div>
        <PreviewForm lorem={this.state.lorem} onPreviewSubmit={this.handlePreviewSubmit} />
        <hr />
        <PreviewList lorem={this.state.lorem} data={this.state.data} />
      </div>
    );
  }
});

var PreviewForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var text = ReactDOM.findDOMNode(this.refs.text).value.trim();
    if (!text) {
      return;
    }
    this.props.onPreviewSubmit(text);
    return;
  },
  render: function() {
    return (
      <form className="previewForm columns">
        <div className="columns">
          <div className="one-fourth column">
            <input type="text" className="input-block" />
          </div>
          <div className="three-fourths column">
            <textarea onChange={this.handleSubmit} ref="text"
              defaultValue={this.props.lorem} className="input-block"
              placeholder="Preview text" />
          </div>
        </div>
      </form>
    );
  }
});

var PreviewList = React.createClass({
  render: function() {
    var lorem = this.props.lorem;
    var previewNodes = this.props.data.map(function(preview, idx) {
      return (
        <Preview fontFamily={preview.fontName} lorem={lorem} key={idx} />
      );
    });
    return (
      <div className="previewList">
        {previewNodes}
      </div>
    );
  }
});

var Preview = React.createClass({
  render: function() {
    var previewStyle = {fontFamily: this.props.fontFamily};
    return (
      <div className="columns">
        <div className="one-fourth column">
          <code className="fontname">{this.props.fontFamily}</code>
        </div>
        <div className="three-fourths column">
          <p className="preview" style={previewStyle}>
            {this.props.lorem}
          </p>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <PreviewBox />,
  document.getElementById('content')
);
