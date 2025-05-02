Object.defineProperty(global, 'window', {
    value: global,
});

import { initialize, connectToDevTools } from "react-devtools-core";
initialize();
connectToDevTools();
