import type { OpenAPIObject } from "openapi3-ts/oas30";

const transformer = (inputSchema: OpenAPIObject): OpenAPIObject => {
  const paths = Object.fromEntries(
    Object.entries(inputSchema.paths ?? {}).filter(
      ([path]) => !path.startsWith("/api/auth")
    )
  );

  return {
    ...inputSchema,
    paths,
  };
};

export default transformer;
