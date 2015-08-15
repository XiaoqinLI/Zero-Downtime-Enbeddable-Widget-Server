# This is the Physician-card widget.

## directory structure:

```
model                 -- component's model or DB schema
public                -- the actually widget JS snippet served to clients
styles                -- customized CSS widget style, which is injected into JS snippet default embeddable widget for demo use.
test                  -- tests (mocha by default)
view                  -- widget markup template, jade or ejs.
index.js              -- express router setting up endpoints for rendering the widget.
middleware.js         -- any middleware needed by the widget, eg. CORS for third party JS. 
```

## To use this widget:
1. Make sure you have Jquery Lib
2. create a div tag with classname as : "physician-card"
```
  <div class="physician-card">
  </div>
```
3. append:
```
 <script type="text/javascript" src="ATXCMALAPP-d04.devid.local:88/widget/js"></script> 
```
at the end of 'body tag' in your page.
