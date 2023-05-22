windows redis:https://github.com/ServiceStack/redis-windows/raw/master/downloads/redis-latest.zip


mac redis /bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
brew install redis
brew services start redis


可视化工具：https://pan.baidu.com/s/1Ov6M_kOOclATfY4Hak1V4Q



## 给redis 安装到本地服务中
- redis-server --service-install redis.windows.conf --loglevel verbose
  

## 基本操作
- keys * 
- flushall


## 安全问题
- 用户设置密码
- config set requirepass jw
- config get requirepass 
- auth jw 


## 登录
- 用户访问服务器 发送验证码  （2分内不能重复发短信） 超过2分钟以前的验证码就没用了
