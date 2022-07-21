// @ts-nocheck
import app from "./utils/app";
import {connect_to_db} from "./utils/database";

import appdynamics from "appdynamics";



appdynamics.profile({
    controllerHostName: 'rdc06062022.saas.appdynamics.com',
    controllerPort: 443,

    // If SSL, be sure to enable the next line
    controllerSslEnabled: true,
    accountName: 'rdc06062022',
    accountAccessKey: 'tzvth9avlusu',
    applicationName: 'ali_test_app',
    tierName: 'ali_test_tier',
    nodeName: 'process' // The controller will automatically append the node name with a unique number
})

// Connecting to db
connect_to_db();

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

