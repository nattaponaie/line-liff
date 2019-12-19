import { apiResponse } from '/utils/json';
import { logInfo } from '/utils/logger';

const initializeSSE = ({
  res,
  clientId,
}) => {
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Content-type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  });

  const newClient = {
    id: clientId,
    res,
  };

  return newClient;
};

const sendSSEMessage = ({
  clients,
  eventName,
  resource,
  message,
}) => {
  clients.forEach(c => {
    c.res.write('event: ' + eventName + '\n');
    c.res.write('data: ' + JSON.stringify(apiResponse({ resource, response: message })) + '\n\n');
  });
};

const closeSSEConnection = ({
  clients,
  clientId,
}) => {
  logInfo(`${clientId} Connection closed`);
  clients = clients.filter(c => c.id !== clientId);
};

export {
  initializeSSE,
  closeSSEConnection,
  sendSSEMessage,
};
