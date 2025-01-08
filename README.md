# Sample-tracing-nodejs-javascript

This is Sample NodeJS App for sending traces to OpenObserve.

## Prerequisites

- Node.js version 12 or newer. Download the latest version of Node.js [here](https://nodejs.org/en/download/).
- OpenObserve: You can get started with [OpenObserve Cloud](https://cloud.openobserve.ai) or a [self hosted installation](https://openobserve.ai/docs/quickstart/#self-hosted-installation). 

## Getting Started

1. **Clone the Repository:**:
```bash
git clone https://github.com/openobserve/sample-tracing-nodejs-javascript
```

2. **Make Changes to `tracing.js` file**:
 
 The `OTLPTraceExporter` sends the captured traces to OpenObserve. Replace `url` and `YOUR_AUTH_TOKEN` with your actual HTTP endpoint and authentication token, which you can find in your Data Sources -> Custom -> Traces -> OpenTelemetry -> OTLP HTTP.

> Add **`/v1/traces`** to your **`OTLP HTTP`** endpoint.

```js
const opentelemetry = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');


// For troubleshooting, set the log level to DiagLogLevel.DEBUG
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const exporterOptions = {
  url: "url/v1/traces",
  headers: {
    Authorization: "Basic YOUR_AUTH_TOKEN" ,
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
```

3. **Verify Node installation**:

Ensure that Node.js is installed correctly by checking the version
```bash
node - v
```
4. **Install the dependency packages**:
```bash
npm install
```

5. **Start the Service and Begin Sending Data to OpenObserve**:

Run the application using the following command:
```bash
 node --require './tracing.js' app.js
```
App will start on `http://localhost:8080` by default.

6. **Validate instrumentation by checking for traces**

Applications will not produce traces unless they are being interacted with, and OpenTelemetry will often buffer data before sending. So you need to interact with your application and wait for some time to see your tracing data in OpenObserve.

Refresh page couple of times to get more traces exported.

Traces are captured, you can check these captured traces in the **Traces** tab.

![image](https://github.com/user-attachments/assets/add0956f-3971-4cd7-9464-3ec21da041fd)



