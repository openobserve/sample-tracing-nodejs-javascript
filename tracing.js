/*tracing.js*/
// Require dependencies
const opentelemetry = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');


// For troubleshooting, set the log level to DiagLogLevel.DEBUG
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const exporterOptions = {
  url: "http://localhost:5080/api/default/v1/traces",
  headers: {
    Authorization: "Basic cm9vdEBleGFtcGxlLmNvbTpFNXcya2ZNRDVCQ082bzM5" ,
  },
}

const traceExporter = new OTLPTraceExporter(exporterOptions);
const sdk = new opentelemetry.NodeSDK({
 traceExporter: new opentelemetry.tracing.ConsoleSpanExporter(),
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
  serviceName: "nodejs-javascript-service",
});

sdk.start();
