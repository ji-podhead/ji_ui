var PROTO_PATH = __dirname + '/../../protos/ui.proto'; // Stellen Sie sicher, dass der Pfad korrekt ist

var parseArgs = require('minimist');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var ji_ui = grpc.loadPackageDefinition(packageDefinition).ji_ui; // Verwenden Sie den Paketnamen aus Ihrer Proto-Datei

function main() {
 var argv = parseArgs(process.argv.slice(2), {
    string: 'target'
 });
 var target;
 if (argv.target) {
    target = argv.target;
 } else {
    target = '0.0.0.0:50051';
 }
 var client = new ji_ui.Greeter(target,
                                 grpc.credentials.createInsecure());
 var user;
 if (argv._.length > 0) {
    user = argv._[0];
 } else {
    user = 'world';
 }
 client.sayHello({name: user}, function(err, response) {
    console.log('Greeting:', response);
 });
}

main();