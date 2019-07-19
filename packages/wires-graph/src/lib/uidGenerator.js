/**
 * Return a function that can be used to create uniquie incremented names
 * `const getUid = uidGenerator(); getUid('name'); // name_1`
 */
export default function uidGenerator() {
  let usedNames = {};

  return (name = '') => {
    if (!usedNames[name]) {
      usedNames[name] = 1;
    }

    const uid = `${name}_${usedNames[name]}`;

    usedNames[name] += 1;

    return uid;
  }
}
