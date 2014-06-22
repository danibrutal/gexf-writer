define(['xml-writer'], function(xmlWriter) {  

  var gexfWriter = function(graphType) {
    //var query = "START n=node(*) RETURN n";

    this.type = graphType;

    this.xmlWriter  = new xmlWriter();
    this.nodeWriter = new xmlWriter();
    this.edgeWriter = new xmlWriter();

    /*
    db.query(query, function(err, results) {
      
      results.map(function (result) {
        console.dir(result.n.data);
        console.dir(result.n.id);
        //  console.dir(result);
      });

    });
  */

  };

  gexfWriter.prototype = {

    /**
     * @return string
     */
    getDocument : function() {
      
      return this.xmlWriter
        .startDocument("1.0", "UTF-8")
        .startElement('gexf')
          .writeAttribute('xmlns', 'http://www.gexf.net/1.2draft')
          .writeAttribute('version', '1.2')
          .startElement('graph')
            .writeAttribute('defaultedgetype', this.type)

            // Nodes
            .startElement('nodes')
              .writeRaw(this.nodeWriter.toString())
            .endElement()

            // Edges
            .startElement('edges')
              .writeRaw(this.edgeWriter.toString())
            .endElement()

          .endElement()        
        .endElement()
        .toString();
    },

    /**
     * @param nodeId
     * @param label
     * @return string
     */
    writeNode : function(nodeId, label, attributes) {

      this.nodeWriter.startElement('node');
      this.nodeWriter.writeAttribute('id',   nodeId.toString());
      this.nodeWriter.writeAttribute('label', label);
      this.nodeWriter.text('Some content');
      this.nodeWriter.endElement();

      return this.nodeWriter.toString();
    },

    /**
     * @param nodeId
     * @param label
     * @return string
     */
    writeEdge : function(id, source, target, weight) {

      this.edgeWriter.startElement('edge');
      this.edgeWriter.writeAttribute('id',   id.toString());
      this.edgeWriter.writeAttribute('source', source.toString());
      this.edgeWriter.writeAttribute('target', target.toString());
      this.edgeWriter.endElement();

      return this.edgeWriter.toString();
    }
  };

  return gexfWriter;
});