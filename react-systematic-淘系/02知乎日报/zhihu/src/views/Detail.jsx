import React, { useState, useEffect, useMemo } from "react";
import './Detail.less';
import { LeftOutline, MessageOutline, LikeOutline, StarOutline, MoreOutline } from 'antd-mobile-icons';
import { Badge, Toast } from 'antd-mobile';
import api from '../api';
import SkeletonAgain from '../components/SkeletonAgain';
import { flushSync } from 'react-dom';
import { connect } from 'react-redux';
import action from '../store/action';

const Detail = function Detail(props) {
    let { navigate, params } = props;
    /* 定义状态 */
    let [info, setInfo] = useState(null),
        [extra, setExtra] = useState(null);
    /* 第一次渲染完毕:获取数据 */
    let link;
    const handleStyle = (result) => {
        let { css } = result;
        if (!Array.isArray(css)) return;
        css = css[0];
        if (!css) return;
        // 创建<LINK>导入样式
        link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = css;
        document.head.appendChild(link);
    };
    const handleImage = (result) => {
        let imgPlaceHolder = document.querySelector('.img-place-holder');
        if (!imgPlaceHolder) return;
        // 创建大图
        let tempImg = new Image;
        tempImg.src = result.image;
        tempImg.onload = () => {
            imgPlaceHolder.appendChild(tempImg);
        };
        tempImg.onerror = () => {
            let parent = imgPlaceHolder.parentNode;
            parent.parentNode.removeChild(parent);
        };
    };
    useEffect(() => {
        (async () => {
            try {
                let result = await api.queryNewsInfo(params.id);
                flushSync(() => {
                    setInfo(result);
                    handleStyle(result);
                });
                handleImage(result);
            } catch (_) { }
        })();
        // 销毁组件:移除创建的样式
        return () => {
            if (link) document.head.removeChild(link);
        };
    }, []);
    useEffect(() => {
        (async () => {
            try {
                let result = await api.queryStoryExtra(params.id);
                setExtra(result);
            } catch (_) { }
        })();
    }, []);

    //=========下面的逻辑是关于登录/收藏的
    let {
        base: { info: userInfo }, queryUserInfoAsync,
        location,
        store: { list: storeList }, queryStoreListAsync, removeStoreListById
    } = props;
    useEffect(() => {
        (async () => {
            // 第一次渲染完:如果userInfo不存在,我们派发任务同步登录者信息
            if (!userInfo) {
                let { info } = await queryUserInfoAsync();
                userInfo = info;
            }
            // 如果已经登录 && 没有收藏列表信息:派发任务同步收藏列表
            if (userInfo && !storeList) {
                queryStoreListAsync();
            }
        })();
    }, []);
    // 依赖于收藏列表和路径参数,计算出是否收藏
    const isStore = useMemo(() => {
        if (!storeList) return false;
        return storeList.some(item => {
            return +item.news.id === +params.id;
        });
    }, [storeList, params]);

    // 点击收藏按钮
    const handleStore = async () => {
        if (!userInfo) {
            // 未登录
            Toast.show({
                icon: 'fail',
                content: '请先登录'
            });
            navigate(`/login?to=${location.pathname}`, { replace: true });
            return;
        }
        // 已经登录:收藏或者移除收藏
        if (isStore) {
            // 移除收藏
            let item = storeList.find(item => {
                return +item.news.id === +params.id;
            });
            if (!item) return;
            let { code } = await api.storeRemove(item.id);
            if (+code !== 0) {
                Toast.show({
                    icon: 'fail',
                    content: '操作失败'
                });
                return;
            }
            Toast.show({
                icon: 'success',
                content: '操作成功'
            });
            removeStoreListById(item.id); //告诉redux中也把这一项移除掉
            return;
        }
        // 收藏
        try {
            let { code } = await api.store(params.id);
            if (+code !== 0) {
                Toast.show({
                    icon: 'fail',
                    content: '收藏失败'
                });
                return;
            }
            Toast.show({
                icon: 'success',
                content: '收藏成功'
            });
            queryStoreListAsync(); //同步最新的收藏列表到redux容器中
        } catch (_) { }
    };

    return <div className="detail-box">
        {/* 新闻内容 */}
        {!info ? <SkeletonAgain /> :
            <div className="content"
                dangerouslySetInnerHTML={{
                    __html: info.body
                }}
            ></div>
        }
        {/* 底部图标 */}
        <div className="tab-bar">
            <div className="back"
                onClick={() => {
                    navigate(-1);
                }}>
                <LeftOutline />
            </div>
            <div className="icons">
                <Badge content={extra ? extra.comments : 0}><MessageOutline /></Badge>
                <Badge content={extra ? extra.popularity : 0}><LikeOutline /></Badge>
                <span className={isStore ? 'stored' : ''}
                    onClick={handleStore}>
                    <StarOutline />
                </span>
                <span><MoreOutline /></span>
            </div>
        </div>
    </div>;
};
export default connect(
    state => {
        return {
            base: state.base,
            store: state.store
        };
    },
    { ...action.base, ...action.store }
)(Detail);