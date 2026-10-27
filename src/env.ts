import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
  API_BASE_URL: {
    description: "Base URL REST API Elysia",
    schema: (value) => {
      if (!value) throw new Error("Expected Base URL REST API Elysia");
      return value;
    },
  },
});
