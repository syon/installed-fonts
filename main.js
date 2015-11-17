var PreviewBox = React.createClass({
  loadPreviews: function(fonts) {
    this.setState({data: fonts});
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    var app = new InstalledFonts(this.loadPreviews);
  },
  render: function() {
    return (
      <div className="columns">
        <div className="previewMenu one-fourth column">
          <PreviewMenu data={this.state.data} />
        </div>
        <div className="previewBox three-fourths column">
          <PreviewList data={this.state.data} />
        </div>
      </div>
    );
  }
});

var PreviewMenu = React.createClass({
  render: function() {
    var fontNameNodes = this.props.data.map(function(font, idx) {
      return (
        <a href="#" className="menu-item" key={idx}>{font.fontName}</a>
      );
    });
    return (
      <nav className="menu">
        {fontNameNodes}
      </nav>
    );
  }
});

var PreviewList = React.createClass({
  render: function() {
    var previewNodes = this.props.data.map(function(preview, idx) {
      return (
        <Preview fontFamily={preview.fontName} key={idx} />
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
      <div className="preview">
        <code className="fontname">{this.props.fontFamily}</code>
        <p className="preview" style={previewStyle}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    );
  }
});

ReactDOM.render(
  <PreviewBox />,
  document.getElementById('content')
);
