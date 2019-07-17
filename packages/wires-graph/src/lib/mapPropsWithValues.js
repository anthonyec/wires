export default function mapPropsWithValues(props = {}, mapping = {}) {
  return Object.keys(mapping).reduce((combinedProps, mappingKey) => {
    const mappingPropKey = mapping[mappingKey];
    const propWithMappingKey = props[mappingPropKey];

    // If not already combined and prop with mapping key exists.
    if (!combinedProps[mappingPropKey] && propWithMappingKey) {
      combinedProps[mappingKey] = propWithMappingKey;
    }

    return combinedProps;
  }, {});
}
