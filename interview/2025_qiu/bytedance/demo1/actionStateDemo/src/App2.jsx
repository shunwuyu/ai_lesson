import { useActionState } from 'react';
import TodoList from './components/TodoList';
// 模拟异步提交动作
async function submitForm(state, formData) {
  const errors = [];
  const name = formData.get('name');

  if (!name || name.length < 3) {
    errors.push('Name must be at least 3 characters');
  }

  // 模拟 API 调用
  await new Promise(resolve => setTimeout(resolve, 500));

  if (errors.length > 0) {
    return { ...state, errors, message: '' };
  }

  return { errors: [], message: `Hello, ${name}! Form submitted.` };
}

function MyForm() {
  const [state, formAction, isPending] = useActionState(submitForm, {
    errors: [],
    message: '',
  });

  return (
    <form action={formAction}>
      <h2>useActionState Example</h2>
      
      <input
        name="name"
        placeholder="Enter your name"
        disabled={isPending}
      />
      
      {state.errors.length > 0 && (
        <ul style={{ color: 'red' }}>
          {state.errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      )}

      {state.message && (
        <p style={{ color: 'green' }}>{state.message}</p>
      )}

      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

function App() {
  return (
    <>
      <MyForm></MyForm>
      <TodoList />
    </>
  )
}

export default App