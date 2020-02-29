/**
 * Return new object which maps prop values to keys in the mapping.
 * E.g: `{ a: 1, b: 2 }` will become `{ y: 1, z: 2 }` using
 * the mapping `{ y: 'a', z: 'b' }`
 */
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
