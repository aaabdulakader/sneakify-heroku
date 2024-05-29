// const fs = require("fs");
// const path = require("path");

// const componentsList = [
//   "Header",
//   "Footer",
//   "ProductList",
//   "ProductDetail",
//   "Cart",
//   "Checkout",
//   "Product",
//   "RelatedProducts",
//   "Filters",
//   "SearchBar",
//   "UserAccount",
//   "ProductThumbnail",
//   "Reviews",
//   "Breadcrumb",
//   "LoginForm",
//   "SignUpForm",
//   "AddressForm",
//   "PaymentForm",
//   "ContactForm",
//   "NotFound",
// ];

// const srcPath = path.join(__dirname, "src", "components");

// // Create component directories and files
// components.forEach((component) => {
//   const componentDir = path.join(srcPath, component);
//   const componentFileJS = path.join(componentDir, `${component}.js`);
//   const componentFileCSS = path.join(componentDir, `${component}.module.css`);

//   fs.mkdirSync(componentDir, { recursive: true });

//   fs.writeFileSync(
//     componentFileJS,
//     `import React from 'react';\n\nfunction ${component}() {\n    return (\n        <div>\n            {/* ${component} component */}\n        </div>\n    );\n}\n\nexport default ${component};\n`
//   );

//   fs.writeFileSync(componentFileCSS, `/* ${component} component styles */\n`);
// });

// console.log("Component structure created successfully!");
/////////////////////////////////

const fs = require("fs");
const path = require("path");

function createComponent(componentNames) {
  // client/src/components
  const srcPath = path.join(__dirname, "src", "components");

  componentNames.forEach((component) => {
    const componentDir = path.join(srcPath, component);
    const componentFileJS = path.join(componentDir, `${component}.js`);
    const componentFileCSS = path.join(componentDir, `${component}.module.css`);

    fs.mkdirSync(componentDir, { recursive: true });

    let cssVariableName = "styles";

    fs.writeFileSync(
      componentFileJS,
      `import React from 'react'; \n\n import ${cssVariableName} from './${component}.module.css';\n\n \n\nfunction ${component}() {\n    return (\n        <div>\n            {/* ${component} component */}\n        </div>\n    );\n}\n\nexport default ${component};\n`
    );

    fs.writeFileSync(componentFileCSS, `/* ${component} component styles */\n`);

    // add the component to the index.js file in the components directory which will be used to import all components from the components directory if they aren't already there

    // if the index.js file doesn't exist, create it
    if (!fs.existsSync(path.join(srcPath, "index.js"))) {
      fs.writeFileSync(path.join(srcPath, "index.js"), "");
    }

    const indexFile = path.join(srcPath, "index.js");
    const indexFileData = fs.readFileSync(indexFile, "utf8");

    if (
      !indexFileData.includes(`export { ${component} } from "./${component}";`)
    ) {
      fs.appendFileSync(
        indexFile,
        `export { default as ${component} } from "./${component}/${component}.js";\n`
      );
    }
  });

  console.log("Component structure created successfully!");
}

// Get component names from command-line arguments
// const componentNames = process.argv.slice(2);
// const componentNames = []
const componentNames =
  process.argv.slice(2).length > 0 ? process.argv.slice(2) : ["None"];

// Validate component names
if (componentNames.length === 0) {
  console.error("Please provide at least one component name.");
} else {
  createComponent(componentNames);
}
