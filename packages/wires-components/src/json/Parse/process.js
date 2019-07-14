export default function Parse({ jsonString = null } = {}) {
  try {
    return {
      out: JSON.parse(jsonString)
    };
  } catch(err) {
    return { err };
  }
}
