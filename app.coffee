class App

  _swfpath = "assets/font-detect/FontList.swf"
  @fonts = []

  constructor: () ->
    if @checkFlashVersion()
      fd = new FontDetect "font-detect-swf", _swfpath, (fd) =>
        do @onReady fd

  checkFlashVersion: () ->
    if !swfobject.hasFlashPlayerVersion("9.0.0")
      @message "You don't have a compatible version of Flash installed?"
      return false
    else
      @message "Loading... (this may beach ball your browser for ~10 seconds)"
      return true

  message: (msg) ->
    $("#status span").html(msg)

  onReady: (fd) ->
    @fonts = fd.fonts()
    @message "Loaded " + @fonts.length + " fonts"
    do @render

  render: () ->
    @renderFontNameList()

    text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit,
     sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

    for font in @fonts
      node = document.createElement("p")
      $(node).css("font-family", "'#{font.fontName}'")
      $(node).css("font-size", "32px")
      $(node).addClass("sample-text")
      # $(node).html(text)
      $("#content").append(node)

      nameNode = document.createElement "p"
      $(nameNode).addClass "sample-text-name"
      $(nameNode).html "[" + font.fontName + "]"
      $("#content").append nameNode

  renderFontNameList: () ->
    for font in @fonts
      a = document.createElement("a")
      $(a).addClass "menu-item"
      $(a).attr "href", "#"
      $(a).text font.fontName
      $("#fontnamelist").append(a)
