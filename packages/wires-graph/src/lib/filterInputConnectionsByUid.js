export default function filterInputConnectionsByUid(connections = [], uid = '') {
  return connections.filter((connection) => {
    return connection.to.uid === uid;
  });
}
