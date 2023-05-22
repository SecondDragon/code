import React from 'react';

class Home extends React.Component{
    render(){
        console.log(JSON.stringify(this.props));
        return <div>Home</div>
    }
}
export default Home;