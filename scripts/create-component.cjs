#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Get component name from command line arguments
const componentName = process.argv[2];

if (!componentName) {
  console.error("Error: Please provide a component name");
  console.log("Usage: node scripts/create-component.js ComponentName");
  process.exit(1);
}

// Validate component name (should be PascalCase)
if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
  console.error(
    "Error: Component name should be in PascalCase (e.g., MyComponent)",
  );
  process.exit(1);
}

// Generate file names
const folderName = componentName;
const componentFileName = `${componentName}.tsx`;
const cssModuleFileName = `${componentName.charAt(0).toLowerCase() + componentName.slice(1)}.module.css`;

// Define paths
const componentsDir = path.join(__dirname, "..", "src", "components");
const componentDir = path.join(componentsDir, folderName);
const componentFilePath = path.join(componentDir, componentFileName);
const cssFilePath = path.join(componentDir, cssModuleFileName);

// Check if component already exists
if (fs.existsSync(componentDir)) {
  console.error(`Error: Component "${componentName}" already exists`);
  process.exit(1);
}

// Create component directory
fs.mkdirSync(componentDir, { recursive: true });

// Component template
const componentTemplate = `import styles from "./${cssModuleFileName}";

type Props = {
  children?: React.ReactNode;
};

export const ${componentName} = ({ children }: Props) => {
  return (
    <div className={styles.${componentName.charAt(0).toLowerCase() + componentName.slice(1)}}>
      {children}
    </div>
  );
};
`;

// CSS module template
const cssTemplate = `.${componentName.charAt(0).toLowerCase() + componentName.slice(1)} {
  /* Add your styles here */
}
`;

// Write files
fs.writeFileSync(componentFilePath, componentTemplate);
fs.writeFileSync(cssFilePath, cssTemplate);

console.log(`✓ Component "${componentName}" created successfully!`);
console.log(`  - ${path.relative(process.cwd(), componentFilePath)}`);
console.log(`  - ${path.relative(process.cwd(), cssFilePath)}`);
