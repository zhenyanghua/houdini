// Append properties.js content
// Setup template for main script by using Blob
// https://github.com/una/extra.css/blob/master/lib/superUnderline.js

// Add this is autogenerated

import fs from 'fs';

const out = 'houdini-leaf.js';

const properties = fs.readFileSync('properties.js');

const worklet = fs.readFileSync('worklet.js');

const template = `/* 
 * This file is autogenerated.
 * ${out} 
 * https://github.com/zhenyanghua/houdini/tree/master/leaf
 */
 
${properties}
(() => { const worklet = \`
${worklet}\`;

const workletBlob = URL.createObjectURL(new Blob([worklet], { type: 'application/javascript' }));

window.CSS.paintWorklet.addModule(workletBlob);
})();
`;

fs.writeFileSync(out, template);

