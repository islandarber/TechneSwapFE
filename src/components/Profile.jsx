const Profile = ({ user, isEditMode, handleChange }) => {
    return (
      <div>
        {isEditMode ? (
          <form>
            <input
              type="text"
              name="firstName"
              defaultValue={user.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              defaultValue={user.lastName}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              defaultValue={user.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="location"
              defaultValue={user.location}
              onChange={handleChange}
            />
          </form>
        ) : (
          <div>
            <p>{user.firstName} {user.lastName}</p>
            <p>{user.email}</p>
            <p>{user.location}</p>
          </div>
        )}
      </div>
    );
  };
  
  export default Profile;