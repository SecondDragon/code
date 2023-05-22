import React,{useEffect, useState,PropsWithChildren } from 'react';
import { RouteComponentProps } from 'react-router-dom'
import NavHeader from '@/components/NavHeader'
import { Descriptions, message ,Button,Alert,Upload} from 'antd';
import {connect, useStore} from 'react-redux';
import actions from '@/store/actions/profile';
import {CombinedState} from '@/store/reducers';
import {ProfileState} from '@/store/reducers/profile';
import {LOGIN_TYPES} from '@/typings/login_status';
import './index.less';
import { LoadingOutlined, UploadOutlined } from '_@ant-design_icons@4.6.2@@ant-design/icons';
type stateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof actions;
interface Params { }
type Props = PropsWithChildren<RouteComponentProps<Params> & stateProps & DispatchProps>;
function Profile(props: Props) {
    let [uploading,setUploading]= useState(false);
    useEffect(()=>{
        props.validate().catch((error:any)=>message.error(error.message));
    },[]);
    const handleChange = (uploadInfo:any)=>{
        if(uploadInfo.file.status === 'uploading'){//开始上传的时候
            setUploading(true);
        }else if(uploadInfo.file.status === 'done'){//上传结束的时候
            //{ success: true, data: avatar }
            let {success,data,message} = uploadInfo.file.response;
            if(success){
                setUploading(false);
                props.changeAvatar(data);
            }else{
                message.error(message);
            }
        }
    }
    let uploadButton  = (
        <div>
            {uploading?<LoadingOutlined/>:<UploadOutlined/>}
            <div className="ant-upload-text">上传</div>
        </div>
    )
    let content;//要渲染的内容
    if(props.loginState === LOGIN_TYPES.UN_VALIDATE){
        content=null;
    }else if(props.loginState === LOGIN_TYPES.LOGIN_SUCCESS){
        content = (
            <div className="user-info">
                <Descriptions title="当前用户">
                    <Descriptions.Item label="用户名">{props.user.username}</Descriptions.Item>
                    <Descriptions.Item label="邮箱">{props.user.email}</Descriptions.Item>
                    <Descriptions.Item label="头像">
                        <Upload
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          action="http://localhost:8899/user/uploadAvatar"
                          beforeUpload={beforeUpload}
                          data={{userId:props.user.id}}
                          onChange={handleChange}   
                        >
                           {
                               props.user.avatar?(
                                   <img src={props.user.avatar} alt="avatar" style={{width:'100%'}}/>
                               ):uploadButton
                           }     
                        </Upload>
                    </Descriptions.Item>
                </Descriptions>
                <Button type="primary"
                    onClick={async ()=>{
                        await props.logout();
                        props.history.push('/login');
                    }}
                >退出</Button>
            </div>
        )
    }else {
        content = (
            <>
                <Alert
                    type="warning"
                    message="尚未登录"
                    description="你好，你尚未登录，请选择注册或者登录"
                />
                <div style={{textAlign:'center',padding:'50px'}}>
                    <Button type="dashed" onClick={()=>props.history.push('/login')}>登录</Button>
                    <Button type="dashed" style={{marginLeft:'50px'}} onClick={()=>props.history.push('/register')}>注册</Button>
                </div>
            </>
        )
    }
    return (
        <section>
            <NavHeader history={props.history}>个人中心</NavHeader>
            {content}
        </section>
    )
}
function beforeUpload(file:any){
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if(!isJpgOrPng)
        message.error('你只能上传JPG/PNG文件');
    const isLessThan2M = file.size/1024/1024 < 2;
    if(!isLessThan2M){
        message.error('你只能上传小于2M的文件');
    }
    return isJpgOrPng && isLessThan2M;
}
function mapStateToProps(state:CombinedState):ProfileState{
    return state.profile;
}
export default connect(
    mapStateToProps,
    actions
)(Profile);