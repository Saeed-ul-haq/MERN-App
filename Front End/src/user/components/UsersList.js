import React from 'react';

import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';
import './UsersList.css';
import LoadingSpin from '../../shared/components/UIElements/LoadingSpin';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

const UsersList = props => {
  if(props.isLoading) return <LoadingSpin />;
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      <ErrorModal error={props.error} onClear={props.onClear} />
      {props.items.map(user => (
        <UserItem
          key={user._id}
          id={user._id}
          image={user.image}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  );
};

export default UsersList;
