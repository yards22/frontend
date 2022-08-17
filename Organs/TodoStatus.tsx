import { useObserver } from "mobx-react-lite";
import { useStores } from "../Logic/Providers/StoresProviders";

function TodoStatus() {
  const { todoStore } = useStores();
  return useObserver(() => {
    const { error, message } = todoStore;
    return (
      <div>
        <h3>Status</h3>
        <p>{error}</p>
        <p>{message}</p>
      </div>
    );
  });
}

export default TodoStatus;
