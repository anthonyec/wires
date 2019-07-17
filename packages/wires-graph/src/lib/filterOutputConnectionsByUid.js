export default function filterOutputConnectionsByUid(connections = [], uid = '') {
  return connections.filter((connection) => {
    return connection.from.uid === uid;
  });
}
