import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "y6v7an",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000'
  },
});
