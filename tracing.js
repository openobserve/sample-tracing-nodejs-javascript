/*tracing.js*/
// Require dependencies
const opentelemetry = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');


// For troubleshooting, set the log level to DiagLogLevel.DEBUG
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const exporterOptions = {
  url: "http://localhost:5080/api/test/v1/traces",  // Replace with your OpenObserve endpoint
  headers: {
    Authorization: "Basic YOUR_AUTH_TOKEN" ,  // Replace with your auth token
  },
  timeoutMillis: 15000,  // Increase timeout to 15 seconds
}

const traceExporter = new OTLPTraceExporter(exporterOptions);
const sdk = new opentelemetry.NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
  serviceName: "nodejs-javascript-service",
});

// Start the SDK
try {
  sdk.start();
  console.log('Tracing initialized');
} catch (error) {
  console.log('Error initializing tracing', error);
}

// Graceful shutdown
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});
