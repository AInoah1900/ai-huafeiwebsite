# 华飞科技网站部署指南 - Ubuntu 24.04 LTS

本文档提供了将华飞科技网站部署到Ubuntu 24.04 LTS服务器的详细步骤。

## 准备工作

### 1. 服务器准备
- 确保您已购买并配置好Ubuntu 24.04 LTS服务器实例
- 确保已开通以下端口：
  - 22端口 (SSH)
  - 80端口 (HTTP)
  - 443端口 (HTTPS，如需配置SSL)

### 2. 域名准备
- 如果您有自定义域名，请确保已完成域名备案
- 在DNS控制台将域名解析到您的服务器IP

## 部署方式选择

本文档提供两种部署方式：
1. **传统部署方式**：直接在服务器上安装Node.js和相关软件
2. **Docker部署方式**：使用Docker容器化部署（推荐，可避免系统兼容性问题）

## 方式一：传统部署步骤

### 步骤一：连接到Ubuntu服务器

```bash
ssh ubuntu@您的服务器IP
# 或者如果您使用root用户
ssh root@您的服务器IP
```

### 步骤二：安装必要的软件包

```bash
# 更新系统包
sudo apt update
sudo apt upgrade -y

# 安装开发工具
sudo apt install -y build-essential git

# 方法1：使用NVM安装Node.js（推荐，更灵活）
# 安装NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
# 加载NVM（可能需要重新登录终端）
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
# 安装Node.js 18（项目要求的最低版本）
nvm install 22
# 设置为默认版本
nvm alias default 22

# 验证Node.js安装
node -v
npm -v

# 安装pnpm
npm install -g pnpm

# 安装Nginx
sudo apt install -y nginx

# 启动Nginx并设置为开机自启
sudo systemctl start nginx
sudo systemctl enable nginx

# 安装PM2用于进程管理
npm install -g pm2
```

### 步骤三：克隆项目代码

```bash
# 创建应用目录
sudo mkdir -p /var/www/huafei
sudo chown -R $USER:$GROUP /var/www/huafei
cd /var/www/huafei


# 方法1：使用SSH方式克隆代码（需要先配置SSH密钥）
 git clone git@github.com:AInoah1900/website-huafei.git .

# 或者从本地上传代码到服务器
```

#### 如果使用SSH方式遇到权限问题，请按以下步骤配置SSH密钥：

```bash
# 1. 生成SSH密钥
ssh-keygen -t ed25519 -C "your_email@example.com"
# 按照提示操作，可以直接按Enter使用默认设置

# 2. 查看并复制公钥
cat ~/.ssh/id_ed25519.pub
# 复制输出的内容

# 3. 将公钥添加到GitHub账户：
# - 登录GitHub
# - 点击右上角头像 -> Settings -> SSH and GPG keys
# - 点击"New SSH key"
# - 粘贴您复制的公钥内容
# - 点击"Add SSH key"

# 4. 测试SSH连接
ssh -T git@github.com
# 如果看到"Hi username! You've successfully authenticated..."则表示成功
```

### 步骤四：使用pnpm安装依赖并构建项目

```bash
# 安装项目依赖
pnpm i

# 进入website目录
cd website

# 构建生产环境代码
pnpm build

# 导出静态文件（如果项目支持静态导出）
pnpm export
```

### 步骤五：使用PM2启动应用

```bash
# 返回项目根目录（如果在website目录中）
cd ..

# 创建PM2配置文件
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'huafei-website',
      cwd: './website',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 'max',
      exec_mode: 'cluster',
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
EOF

# 使用PM2启动应用
pm2 start ecosystem.config.js

# 设置PM2开机自启
pm2 startup
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME
pm2 save
```

### 步骤六：配置Nginx作为反向代理

```bash
# 创建Nginx配置文件
sudo tee /etc/nginx/sites-available/huafei << EOF
server {
    listen 80;
    server_name  https://jiujuaner.com;

    index index.html index.htm;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
    
    # 静态资源缓存设置
    location /_next/static/ {
        proxy_pass http://localhost:3000/_next/static/;
        proxy_cache_valid 60m;
        proxy_set_header Host \$host;
        add_header Cache-Control "public, max-age=3600";
    }
    
    location /static/ {
        proxy_pass http://localhost:3000/static/;
        proxy_cache_valid 60m;
        proxy_set_header Host \$host;
        add_header Cache-Control "public, max-age=3600";
    }
}
EOF

# 启用站点配置
sudo ln -s /etc/nginx/sites-available/huafei /etc/nginx/sites-enabled/

# 测试Nginx配置
sudo nginx -t

# 重启Nginx
sudo systemctl restart nginx
```

### 步骤七：配置SSL（可选但推荐）

```bash
# 安装certbot
sudo apt install -y certbot python3-certbot-nginx

# 获取SSL证书
sudo certbot --nginx -d jiujuaner.com -d https://jiujuaner.com

# 设置自动续期（Ubuntu已自动配置certbot定时任务）
sudo systemctl status certbot.timer
```

### 步骤八：设置防火墙（如果启用了防火墙）

```bash
# 安装UFW（如果尚未安装）
sudo apt install -y ufw

# 允许SSH连接
sudo ufw allow ssh

# 允许HTTP和HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 启用防火墙
sudo ufw enable

# 检查防火墙状态
sudo ufw status
```

## 方式二：Docker部署步骤（推荐）

### 步骤一：安装Docker

```bash
# 更新系统包
sudo apt update
sudo apt upgrade -y

# 安装必要的依赖
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# 添加Docker官方GPG密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 添加Docker仓库
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 更新包索引
sudo apt update

# 安装Docker
sudo apt install -y docker-ce docker-ce-cli containerd.io

# 启动Docker服务
sudo systemctl start docker
sudo systemctl enable docker

# 将当前用户添加到docker组（避免每次都需要sudo）
sudo usermod -aG docker $USER
# 注意：需要重新登录终端才能生效

# 验证Docker安装
docker --version
```

### 步骤二：安装Docker Compose

```bash
# 安装Docker Compose
sudo apt install -y docker-compose-plugin

# 验证安装
docker compose version
```

### 步骤三：克隆项目代码

```bash
# 安装Git（如果尚未安装）
sudo apt install -y git

# 创建项目目录
sudo mkdir -p /var/www/huafei
sudo chown -R $USER:$USER /var/www/huafei
cd /var/www/huafei

# 克隆代码（使用HTTPS方式）
git clone https://github.com/AInoah1900/website-huafei.git .
```

### 步骤四：创建Dockerfile

```bash
# 在项目根目录创建Dockerfile
cat > Dockerfile << 'EOF'
# 使用Node.js 18作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 安装pnpm
RUN npm install -g pnpm

# 复制package.json和pnpm-lock.yaml
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

# 复制website目录的package.json
COPY website/package.json ./website/

# 安装依赖
RUN pnpm install

# 复制所有文件
COPY . .

# 构建应用
RUN pnpm build

# 暴露3000端口
EXPOSE 3000

# 启动应用
CMD ["pnpm", "--filter", "website", "start"]
EOF
```

### 步骤五：创建Docker Compose配置文件

```bash
# 创建docker-compose.yml文件
cat > docker-compose.yml << 'EOF'
version: '3'

services:
  website:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: huafei-website
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./website/public:/app/website/public

  nginx:
    image: nginx:alpine
    container_name: huafei-nginx
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d
      - ./nginx/ssl:/etc/nginx/ssl
      - ./nginx/logs:/var/log/nginx
    depends_on:
      - website
EOF
```

### 步骤六：配置Nginx反向代理

```bash
# 创建Nginx配置目录
mkdir -p nginx/conf.d nginx/ssl nginx/logs

# 创建Nginx配置文件
cat > nginx/conf.d/default.conf << 'EOF'
server {
    listen 80;
    server_name 您的域名 www.您的域名;

    # 重定向到HTTPS（可选）
    # return 301 https://$host$request_uri;

    location / {
        proxy_pass http://website:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 静态资源缓存设置
    location /_next/static/ {
        proxy_pass http://website:3000/_next/static/;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, max-age=3600";
    }

    location /static/ {
        proxy_pass http://website:3000/static/;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, max-age=3600";
    }
}

# HTTPS配置（可选，需要SSL证书）
# server {
#     listen 443 ssl;
#     server_name 您的域名 www.您的域名;
#
#     ssl_certificate /etc/nginx/ssl/fullchain.pem;
#     ssl_certificate_key /etc/nginx/ssl/privkey.pem;
#     ssl_protocols TLSv1.2 TLSv1.3;
#     ssl_prefer_server_ciphers on;
#
#     location / {
#         proxy_pass http://website:3000;
#         proxy_http_version 1.1;
#         proxy_set_header Upgrade $http_upgrade;
#         proxy_set_header Connection 'upgrade';
#         proxy_set_header Host $host;
#         proxy_cache_bypass $http_upgrade;
#         proxy_set_header X-Real-IP $remote_addr;
#         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#         proxy_set_header X-Forwarded-Proto $scheme;
#     }
#
#     location /_next/static/ {
#         proxy_pass http://website:3000/_next/static/;
#         proxy_cache_valid 60m;
#         add_header Cache-Control "public, max-age=3600";
#     }
#
#     location /static/ {
#         proxy_pass http://website:3000/static/;
#         proxy_cache_valid 60m;
#         add_header Cache-Control "public, max-age=3600";
#     }
# }
EOF
```

### 步骤七：构建和启动Docker容器

```bash
# 构建和启动容器
docker compose up -d

# 查看容器状态
docker compose ps

# 查看容器日志
docker compose logs -f
```

### 步骤八：配置SSL证书（可选但推荐）

```bash
# 安装certbot
sudo apt install -y certbot

# 停止Nginx容器
docker compose stop nginx

# 获取证书
sudo certbot certonly --standalone -d 您的域名 -d www.您的域名

# 复制证书到Nginx目录
sudo cp /etc/letsencrypt/live/您的域名/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/您的域名/privkey.pem nginx/ssl/
sudo chown -R $USER:$USER nginx/ssl/

# 取消注释Nginx配置文件中的HTTPS部分
# 编辑nginx/conf.d/default.conf文件，取消HTTPS配置的注释

# 重启Nginx容器
docker compose start nginx

# 设置证书自动续期
echo "0 0,12 * * * root docker compose stop nginx && certbot renew && cp /etc/letsencrypt/live/您的域名/fullchain.pem /var/www/huafei/nginx/ssl/ && cp /etc/letsencrypt/live/您的域名/privkey.pem /var/www/huafei/nginx/ssl/ && docker compose start nginx" | sudo tee -a /etc/crontab > /dev/null
```

### 步骤九：设置防火墙（如果启用了防火墙）

```bash
# 安装UFW（如果尚未安装）
sudo apt install -y ufw

# 允许SSH连接
sudo ufw allow ssh

# 允许HTTP和HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 启用防火墙
sudo ufw enable

# 检查防火墙状态
sudo ufw status
```

## 维护与更新

### 更新网站内容

#### 传统部署方式

```bash
# 进入项目目录
cd /var/www/huafei

# 拉取最新代码
git pull

# 安装依赖并重新构建
pnpm i
cd website
pnpm build
# 如果支持静态导出
pnpm export

# 返回根目录
cd ..

# 重启应用
pm2 restart huafei-website
```

#### Docker部署方式

```bash
# 进入项目目录
cd /var/www/huafei

# 拉取最新代码
git pull

# 重新构建和启动容器
docker compose up -d --build
```

### 监控应用状态

#### 传统部署方式

```bash
# 查看应用状态
pm2 status

# 查看应用日志
pm2 logs huafei-website

# 监控资源使用
pm2 monit
```

#### Docker部署方式

```bash
# 查看容器状态
docker compose ps

# 查看网站容器日志
docker compose logs -f website

# 查看Nginx容器日志
docker compose logs -f nginx
```

## 项目结构说明

根据readme.md文件，该项目结构如下：

- `website/`: 主要网站代码
  - `ui/`: UI相关组件和样式
    - `components/`: 可复用UI组件
  - `pages/`: Next.js页面
  - `public/`: 静态资源
  - `lib/`: 工具函数和库

项目使用了以下技术栈：
- **框架**: Next.js
- **样式**: Tailwind CSS, Stitches
- **包管理**: pnpm
- **UI库**: 自定义组件 + Radix UI

## 常见问题排查

1. **Node.js版本问题**：
   - 项目要求Node.js 18或更高版本
   - 如果遇到兼容性问题，建议使用Docker部署方式

2. **pnpm相关问题**：
   - 如果pnpm安装依赖失败，尝试清除缓存：`pnpm store prune`
   - 检查Node.js版本兼容性：`node -v`

3. **网站无法访问**：
   - 传统部署：检查PM2进程是否运行：`pm2 status`
   - Docker部署：检查容器是否运行：`docker compose ps`
   - 检查Nginx是否运行：`sudo systemctl status nginx`或`docker compose logs nginx`
   - 检查防火墙设置：`sudo ufw status`

4. **性能问题**：
   - 检查服务器负载：`top`
   - 检查内存使用：`free -m`
   - 检查磁盘I/O：`iostat -x 1`（需安装sysstat：`sudo apt install sysstat`）

5. **博客系统更新**：
   - 新博客文章应放在`website/pages/blog`目录
   - 相关资源应放在`website/public/blog-assets`目录

如果您需要更多帮助或遇到特定问题，请随时联系我们的技术支持团队。
