export default function Stringify({ jsonObject = null } = {}) {
  try {
    return {
      out: JSON.stringify(jsonObject)
    };
  } catch(err) {
    return { err };
  }
}
