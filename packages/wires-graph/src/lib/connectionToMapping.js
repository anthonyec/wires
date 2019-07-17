export default function connectiontoMapping(connection) {
  const fromProp = connection.from.prop;
  const toProp = connection.to.prop;

  return {
    [toProp]: fromProp
  };
}
