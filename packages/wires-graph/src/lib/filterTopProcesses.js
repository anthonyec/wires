export default function filterTopProcesses(connections = []) {
  const topComponents = Object.keys(connections).filter((uid) => {
    console.log(uid)
    // const componentWithNoInlets = connections.filter((connection) => {
    //   return connection.to.uid === uid;
    // });

    // const componentWithOutlets = connections.filter((connection) => {
    //   return connection.from.uid === uid;
    // });

    // return (
    //   componentWithNoInlets.length === 0 &&
    //   componentWithOutlets.length !== 0
    // );
  });

  // return topComponents.map((uid) => {
    // return connections[uid];
  // });
}
