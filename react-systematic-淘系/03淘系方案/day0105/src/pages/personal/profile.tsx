import { withRouter, useSearchParams, createSearchParams, useLocation } from "umi";

const ProfilePage = ({ location }) => {
    /* console.log(location.search); //?lx=0&name=zhufeng
    const usp = new URLSearchParams(location.search);
    //=>createSearchParams(location.search)
    // console.log(usp.get('lx')); */
    /* // v6自带的Hook
    const [usp] = useSearchParams();
    console.log(usp.get('lx')); */

    const locationV6 = useLocation();
    console.log(location.state, locationV6.state);

    return (
        <div>
            我的信息
        </div>
    );
};
export default withRouter(ProfilePage);