export const UserAPI = {
    add(user){
        let users = UserAPI.list();
        users.push(user);
        localStorage.setItem('users',JSON.stringify(users));
    },
    list(){
        let usersString = localStorage.getItem('users');
        let users = usersString?JSON.parse(usersString):[];
        return users;
    },
    find(id){
        let users = UserAPI.list();
        return users.find(user=>user.id === id);
    }
}