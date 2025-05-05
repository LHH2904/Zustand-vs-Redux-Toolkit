import useCounterStore from '../zustand/counterStore';

function ZustandCounter() {
  const { count, increment, decrement } = useCounterStore();

  return (
    <div>
      <h2>Zustand Counter</h2>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

export default ZustandCounter;