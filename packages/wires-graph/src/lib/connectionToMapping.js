/**
 * Return mapping of to and from props in a connection.
 * To be used with `mapPropsWithValues()`
 */
export default function connectiontoMapping(connection) {
  const fromProp = connection.from.prop;
  const toProp = connection.to.prop;

  return {
    [toProp]: fromProp
  };
}
