import type { User } from '../interfaces/User';

interface Props {
  user: User;
}

function UserList({ user }: Props) {
  return (
    <div className="card">
      <h3>{user.name}</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Ciudad:</strong> {user.address.city}</p>
      <p><strong>Teléfono:</strong> {user.phone}</p>
      <p><strong>Compañía:</strong> {user.company.name}</p>
    </div>
  );
}

export default UserList;
