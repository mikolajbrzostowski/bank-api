import { setupServer } from "msw/node";

type HandlerParams = Parameters<typeof setupServer>;
function setupMockServer(...handlers: HandlerParams) {
  const server = setupServer(...handlers );

  return server;
}

export { setupMockServer };
