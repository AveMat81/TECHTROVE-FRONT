const Account = () => {
    const user = useSelector(state => state.user);

    return (
        <div>
            <h3>{user.name}</h3>
            <button>Edit profile</button>
            <button>My orders</button>
            {user.isAdmin &&
            <button>Dasboard Admin</button>
            }
        </div>
    )
};

export default Account;