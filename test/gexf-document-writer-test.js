var requirejs = require("requirejs");

requirejs.config({
    baseUrl: __dirname,
    nodeRequire: require
});

// Some dependencies
var expect    = require('chai').expect;
var assert    = require('chai').assert;
var DOMParser = require('xmldom').DOMParser;
var GexfWriter = requirejs('../lib/gexf-writer');

describe("GEXF-Writer", function(){

  var gexfWriter;

  beforeEach( function(){ 
    
    gexfWriter = new GexfWriter({
      type: 'directed'
    });

  });

  // Document
 describe("#getDocument()", function(){

     it("should return string", function(){
        var doc = gexfWriter.getDocument(); 
        expect(doc).to.be.a('string');
     });

     it("should have GEXF structure", function(){
        // write some nodes
        gexfWriter.writeNode("id1",'foo');   
        gexfWriter.writeNode("id2",'foo2');   

        // and edge
        gexfWriter.writeEdge("1", 1, 2);  

        var gexfDoc = gexfWriter.getDocument();         
        console.log(gexfDoc);
        var doc = new DOMParser().parseFromString(gexfDoc);

        var gexfTags = doc.getElementsByTagName('gexf');
        assert.equal(gexfTags.length, 1);

        var graphTags = gexfTags[0].getElementsByTagName('graph');
        assert.equal(graphTags.length, 1);
        assert.equal('directed', graphTags[0].getAttribute('defaultedgetype'));

        var nodesParent = gexfTags[0].getElementsByTagName('nodes');
        assert.equal(nodesParent.length, 1);

        var nodes = nodesParent[0].getElementsByTagName('node');
        assert.equal(nodes.length, 2);

        var edgesParent = gexfTags[0].getElementsByTagName('edges');
        assert.equal(edgesParent.length, 1);

        var edges = edgesParent[0].getElementsByTagName('edge');
        assert.equal(edges.length, 1);

     });

 });
 
 // Nodes
 describe("#writeNode()", function(){

     it("should return string", function(){
        var node = gexfWriter.writeNode(1,'foo');          
        expect(node).to.be.a('string');
     });

     it("should have all given attributes", function(){
        var idNode    = '1';
        var labelNode = 'myLabel';

        var node = gexfWriter.writeNode(idNode, labelNode);
        var doc = new DOMParser().parseFromString(node);
        var createdNodes =  doc.getElementsByTagName('node');
        
        assert.equal(createdNodes.length, 1);
        assert.equal(createdNodes[0].getAttribute('id'), idNode);
        assert.equal(createdNodes[0].getAttribute('label'), labelNode);
     });
 });

// Edges
 describe("#writeEdge()", function(){
     it("should return string", function(){
        
        var edge = gexfWriter.writeEdge(1,"1","3");       
        expect(edge).to.be.a('string');
     });
      

     it("should have all given attributes", function(){

        var idEdge   = '1';
        var idSource = 'source';
        var idTarget = 'target';

        var edge = gexfWriter.writeEdge(idEdge, idSource, idTarget);  
        var doc = new DOMParser().parseFromString(edge);
        var edges =  doc.getElementsByTagName('edge');
        
        assert.equal(edges.length, 1);
        assert.equal(edges[0].getAttribute('id'), idEdge);
        assert.equal(edges[0].getAttribute('source'), idSource);
        assert.equal(edges[0].getAttribute('target'), idTarget);
     });
 });

});
