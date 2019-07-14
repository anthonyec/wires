export default function NotGate({ in1 = false } = {}) {
  return {
    out: !in1
  };
}
