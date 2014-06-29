define(['xml-writer'], function (XMLWriter) {  
  'use strict';

  /**
   * @param GexfDocument gexfDocument
   */
  function DocWriter (gexfDocument) {

    if (typeof gexfDocument != 'object' || gexfDocument.constructor.name != 'GexfDocument') {
      throw "Type of argument not allowed in DocWriter. GexfDocument required";
    }

    this.doc       = gexfDocument;
    this.xmlWriter = new XMLWriter();
  };

  var 
  writeNodes = function(XMLDocument, nodes) {

    for (var idNode in nodes) {
      writeNode(
        XMLDocument,
        nodes[idNode].id,
        nodes[idNode].label,
        nodes[idNode].attributes
      ); 
    }
  },

  writeEdges = function(XMLDocument, edges) {

    for (var idEdge in edges) {
      writeEdge(XMLDocument, edges[idEdge]); 
    }
  },

  /**
   * @param nodeId
   * @param label
   * @return string
   */
  writeNode = function(XMLDocument, id, label, attributes, content) {

    XMLDocument.startElement('node');
    XMLDocument.writeAttribute('id',  id);
    XMLDocument.writeAttribute('label',label);
    
    if (content) {
      XMLDocument.text(content);
    }

    XMLDocument.endElement();
  },

  /**
   * @param nodeId
   * @param label
   * @return string
   */
  writeEdge = function(XMLDocument, edge) {

    XMLDocument.startElement('edge');
    XMLDocument.writeAttribute('id',   edge.id);
    XMLDocument.writeAttribute('source', edge.source);
    XMLDocument.writeAttribute('target', edge.target);
    XMLDocument.endElement();
  };
  

  DocWriter.prototype = 
  {

    /**
     * @return string GEXF document
     */
    toString : function() {

      var gexfDoc =  this.xmlWriter
        .startDocument(this.doc.getOp('version'), this.doc.getOp('encoding'))
        .startElement('gexf')
          .writeAttribute('xmlns', 'http://www.gexf.net/1.2draft')
          .writeAttribute('version', '1.2');

      if (this.doc.getOp('meta')) {
        gexfDoc.startElement('meta')
          .startElement('creator').text(this.doc.getOp('meta').creator).endElement()
          .startElement('description').text(this.doc.getOp('meta').description).endElement()
        gexfDoc.endElement();
      }

      gexfDoc.startElement('graph')
        .writeAttribute('defaultedgetype', this.doc.getOp('type'));

      // Nodes
      gexfDoc.startElement('nodes');
      writeNodes(gexfDoc, this.doc.getNodes());
      gexfDoc.endElement();

      // Edges
      gexfDoc.startElement('edges');
      writeEdges(gexfDoc, this.doc.getEdges());
      gexfDoc.endElement();

      return gexfDoc
          .endElement() // graph element
        .endElement() // gexf element
      .toString();
    }
  };

  return DocWriter;
});