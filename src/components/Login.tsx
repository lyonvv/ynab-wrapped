import { handleLogin } from '../loginHelper';

export function Login() {
  return (
    <div>
      <button onClick={handleLogin}>{'Login'}</button>
    </div>
  );
}
