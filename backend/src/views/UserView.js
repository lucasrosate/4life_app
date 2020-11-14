const UserView = (user) => {
    return {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        state: user.state,
        phone: user.phone,
        birth: user.birth
    }
}

module.exports = UserView;