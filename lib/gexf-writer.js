define(['lib/gexf-document'], function(GexfDocument) {  
  'use strict';

  var gexfWriter = function () {};

  gexfWriter.prototype = {

    /**
     * @return string
     */
    createDocument : function(options) {
     return new GexfDocument(options);
    }
  };

  return gexfWriter;
});