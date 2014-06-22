# JavaScript GEXF Writer 

[![Build Status](https://travis-ci.org/danibrutal/gexf-writer.svg)](https://travis-ci.org/danibrutal/gexf-writer)

# Installation

With [npm](http://npmjs.org) do:

    $ npm install gexf-writer

# Examples

## Basic
```javascript
    var GexfWriter = require('gexf-writer');
    var graphType = 'directed';    
    gexfWriter = new GexfWriter(graphType);

    // write some nodes
    gexfWriter.writeNode("id1",'foo');   
    gexfWriter.writeNode("id2",'foo2');   

    // and edge
    var idEdge   = '1';
    var idSource = 'id1';
    var idTarget = 'id2';
    gexfWriter.writeEdge(idEdge, idSource, idTarget);  

    console.log(gexfWriter.getDocument());
```
Output:

```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <gexf xmlns="http://www.gexf.net/1.2draft" version="1.2" xmlns:viz="http://www.gephi.org/gexf/viz">
      <graph defaultedgetype="directed" idtype="string" type="static">
        <nodes>
          <node id="id1" label="foo">
            <viz:size value="100"/>
            <viz:color b="113" g="42" r="78"/>
            <viz:position x="150" y="-53"/>
          </node>
          <node id="id2" label="foo2">
            <viz:size value="200"/>
            <viz:color b="237" g="250" r="36"/>
            <viz:position x="277" y="-73"/>
          </node>
        </nodes>
        <edges>
          <edge id="1" source="id1" target="id2"/>
        </edges>
      </graph>
    </gexf>
```

# Tests
With [mocha](http://visionmedia.github.io/mocha) do:

    $ mocha

# License

[MIT/X11](./LICENSE)

