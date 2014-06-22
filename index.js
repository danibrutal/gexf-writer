var requirejs = require('requirejs');

requirejs.config({
    //Use node's special variable __dirname to
    //get the directory containing this file.
    //Useful if building a library that will
    //be used in node but does not require the
    //use of node outside
    baseUrl: __dirname,

    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

requirejs( 
    ['express', 'lib/routes/Home', 'neo4j'], 
    function(express, home, neo4j) {

    var db    = new neo4j.GraphDatabase('http://localhost:7474');
    
    var app = express();

    app.set('views', __dirname + '/lib/views');
    app.set('view engine', 'ejs');
    app.use(express.static(__dirname + '/lib/public'));

    app.get( '/', home.index);

    app.listen(3000);
});

