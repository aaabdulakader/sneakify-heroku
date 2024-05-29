const fs = require("fs");
const path = require("path");

const componentsList = [
  "Header",
  "Footer",
  "ProductList",
  "ProductDetail",
  "Cart",
  "Checkout",
  "SingleProduct",
  "RelatedProducts",
  "Filters",
  "SearchBar",
  "UserAccount",
  "ProductThumbnail",
  "Reviews",
  "Breadcrumb",
  "LoginForm",
  "SignUpForm",
  "AddressForm",
  "PaymentForm",
  "ContactForm",
  "NotFound",
];

function deleteComponent(componentNames) {
  const srcPath = path.join(__dirname, "src", "components");

  componentNames.forEach((component) => {
    const componentDir = path.join(srcPath, component);

    if (fs.existsSync(componentDir)) {
      fs.rmSync(componentDir, { recursive: true });
      console.log(`Component '${component}' deleted successfully.`);
    } else {
      console.error(`Component '${component}' does not exist.`);
    }
  });
}

// Get component names from command-line arguments or if none provided, use all components and clear the index.js file
const componentNames =
  process.argv.slice(2).length > 0 ? process.argv.slice(2) : componentsList;

const indexFilePath = path.join(__dirname, "src", "components", "index.js");

// Clear the index.js file
if (componentNames.length === componentsList.length) {
  fs.writeFileSync(indexFilePath, "");
}

// Validate component names
if (componentNames.length === 0) {
  console.error("Please provide at least one component name.");
} else {
  deleteComponent(componentNames);
}
