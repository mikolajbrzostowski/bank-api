import { setupServer } from 'msw/node';

type HandlerParams = Parameters<typeof setupServer>;
function setupMockServer(...handlers: HandlerParams) {
  return setupServer(...handlers);
}

export { setupMockServer };
