export default function mapPropsWithValues(props = {}, mapping = {}) {
  return Object.keys(mapping).reduce((combinedProps, mappingKey) => {
    const mappingPropKey = mapping[mappingKey];

    if (!combinedProps[mappingPropKey]) {
      combinedProps[mappingKey] = props[mappingPropKey];
    }

    return combinedProps;
  }, {});
}
