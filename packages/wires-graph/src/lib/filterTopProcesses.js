/**
 * Return the process UIDs that have connections coming from them but no
 * connections going to them. E.g `topProcess --> secondProcess`
 */
export default function filterTopProcesses(connections = []) {
  const uniqueUids = connections.reduce((mem, connection) => {
    if (!mem.includes(connection.from.uid)) {
      mem.push(connection.from.uid);
    }

    if (!mem.includes(connection.to.uid)) {
      mem.push(connection.to.uid);
    }

    return mem;
  }, []);

  const topComponents = uniqueUids.filter((uid) => {
    const componentWithNoInlets = connections.filter((connection) => {
      return connection.to.uid === uid;
    });

    const componentWithOutlets = connections.filter((connection) => {
      return connection.from.uid === uid;
    });

    return (
      componentWithNoInlets.length === 0 &&
      componentWithOutlets.length !== 0
    );
  });

  return topComponents;
}
