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
