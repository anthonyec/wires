function Delay({ time = 1000 } = {}) {
  return (execute) => {
    setTimeout(() => {
      execute({ out: 'timeout_done' });
    }, time);
  }
};

// function useEffect(effectFunc) {
//   const execute = (props) => {
//     // Update component props somehow...
//     console.log('props', props);
//   };
//   const resp = effectFunc(execute);

//   if (typeof resp === 'function') {
//     resp();
//   }
// }

// function Delay({ time = 1000 } = {}) {
//   useEffect((execute) => {
//     const timeout = setTimeout(() => {
//       execute({ out: timeout });
//     });

//     return () => {
//       clearTimeout(timeout);
//     };
//   });

//   return {
//     out: null
//   }
// };

module.exports = Delay;
