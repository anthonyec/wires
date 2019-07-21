import translations from './config/locales/en-GB.json';
import uidGenerator from './lib/uidGenerator';

function Graph() {
  let currentProcessUid = null;

  const getUid = uidGenerator();
  const processes = {};

  return {
    createProcess(processor) {
      if (!processor || !(processor instanceof Function)) {
        throw new Error(translations['error_createProcess']);
      }

      const uid = getUid(processor.name);

      return {
        uid,
        processor
      }
    },
    process(createdProcess) {
      if (!createdProcess) {
        throw new Error(translations['error_process_missing_arg']);
      }

      if (
        !createdProcess.uid ||
        !createdProcess.processor ||
        (typeof createdProcess.uid !=='string') ||
        (typeof createdProcess.processor !=='function')
      ) {
        throw new Error(translations['error_process_wrong_schema']);
      }

      currentProcessUid = createdProcess.uid;
    }
  };
}

export default () => {
  return new Graph();
};

// Get the next component the current component is connected to.
  // For each next component connection:
  // Get the next component.
  // Get the outlet to inlet mapping for the next component.
  // Combine values from the output to the input mapping.
  // Store combinedProps as state for next time for value are additive.
  // Execute next component with combined props/values in state.
  // Repeat.....recurssion....lovelyness

// Combine with existing props that may be there on init.
// Execute current component with input props and get the output.
  // Check if output props is a function
  // Execute the function returned and pass in a callback
// When the callback is done, do the rest of the stuff...
