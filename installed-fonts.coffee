class InstalledFonts

  _swfpath = "assets/font-detect/FontList.swf"
  @fonts = []
  @callback

  constructor: (cb) ->
    @callback = cb
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
    do @callback @fonts
