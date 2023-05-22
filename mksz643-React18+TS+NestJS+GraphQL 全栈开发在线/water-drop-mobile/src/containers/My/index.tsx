import { useMutation } from '@apollo/client';
import {
  Button, Form, Input, ImageUploader,
} from 'antd-mobile';
import classNames from 'classnames';
import { useUploadOSS } from '@/hooks/useUploadOSS';
import { COMMIT_STUDENT_INFO } from '@/graphql/user';
import { IStudent } from '@/utils/types';
import { showFail, showSuccess } from '@/utils';
import { useEffect } from 'react';
import { useUserContext } from '@/hooks/userHooks';
import style from './index.module.less';

const App = () => {
  const uploadHandler = useUploadOSS();
  const [commit] = useMutation(COMMIT_STUDENT_INFO);
  const [form] = Form.useForm();
  const { store } = useUserContext();
  useEffect(() => {
    if (!store.tel) return;
    form.setFieldsValue({
      tel: store.tel,
      name: store.name,
      desc: store.desc,
      avatar: [{
        url: store.avatar,
      }],
    });
  }, [store]);

  const onClickHandler = async (v: IStudent & { avatar: [{ url:string }] }) => {
    const res = await commit(
      {
        variables: {
          params: {
            ...v,
            avatar: v.avatar[0]?.url,
          },
        },
      },
    );
    if (res.data.commitStudentInfo.code === 200) {
      showSuccess(res.data.commitStudentInfo.message);
      return;
    }
    showFail(res.data.commitStudentInfo.message);
  };

  return (
    <div className={style.container}>
      <div className={style.logo}>
        <img src="https://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/henglogo.png" alt="" />
      </div>
      <Form
        form={form}
        className={classNames(style.form, style.formPadding)}
        onFinish={onClickHandler}
        footer={(
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
      )}
      >
        <Form.Header>请提交个人信息，都是必填的</Form.Header>
        <Form.Item
          name="name"
          label="昵称"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="tel"
          label="手机号"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="avatar"
          label="头像"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <ImageUploader
            maxCount={1}
            upload={uploadHandler}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
