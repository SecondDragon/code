
function Profile(props){
    return null;
}
function Auth(props){
    return props.children;
}
Profile.wrappers = [Auth,Auth2];

function render(Component){
    let wrappers = Component.wrappers;
    <Auth2>
        <Auth>
           <Profile/>
        </Auth>
    </Auth2>
}

render(Profile);