export default function AndGate({ in1 = false, in2 = false } = {}) {
  return {
    out: in1 && in2
  };
}
