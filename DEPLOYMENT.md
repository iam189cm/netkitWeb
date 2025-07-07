# NETKit网站部署指南

## 🎯 部署概览

本指南提供两种部署方式：
1. **Vercel部署** - 推荐的云端部署方式，简单快速
2. **Ubuntu服务器部署** - 传统的服务器部署方式

---

## 🚀 方式一：Vercel部署（推荐）

### 优势
- ✅ 零配置部署
- ✅ 自动HTTPS
- ✅ 全球CDN加速
- ✅ 自动构建和部署
- ✅ 免费额度充足

### 第1步: 准备代码仓库

```bash
# 初始化Git仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit for NETKit website"

# 推送到GitHub（需要先在GitHub创建仓库）
git remote add origin https://github.com/your-username/netkit-website.git
git branch -M main
git push -u origin main
```

### 第2步: 创建vercel.json配置文件

在项目根目录创建`vercel.json`文件：

```json
{
  "version": 2,
  "builds": [
    {
      "src": "**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/downloads/(.*)",
      "headers": {
        "Content-Disposition": "attachment",
        "X-Content-Type-Options": "nosniff"
      }
    },
    {
      "src": "/(.*\\.(css|js|png|jpg|jpeg|gif|ico|svg))",
      "headers": {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

### 第3步: 部署到Vercel

#### 方法A: 使用Vercel CLI（推荐）

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录Vercel
vercel login

# 部署项目
vercel

# 按照提示操作：
# ? Set up and deploy "~/netkit-website"? [Y/n] y
# ? Which scope do you want to deploy to? [选择您的账户]
# ? Link to existing project? [N/y] n
# ? What's your project's name? netkit-website
# ? In which directory is your code located? ./

# 生产环境部署
vercel --prod
```

#### 方法B: 通过Vercel网站部署

1. 访问 [vercel.com](https://vercel.com)
2. 使用GitHub账户登录
3. 点击"New Project"
4. 选择您的GitHub仓库
5. 点击"Deploy"

### 第4步: 配置自定义域名（可选）

```bash
# 添加自定义域名
vercel domains add netkit.189cm.com

# 或在Vercel Dashboard中配置
```

在您的域名管理面板中添加DNS记录：
```
类型: CNAME
名称: netkit
值: cname.vercel-dns.com
TTL: 300
```

### 第5步: 自动部署设置

Vercel会自动监听GitHub仓库的变化：
- 推送到`main`分支 → 自动部署到生产环境
- 推送到其他分支 → 自动创建预览部署

### 第6步: 上传软件文件

```bash
# 将NETKit可执行文件放入downloads目录
cp "path/to/NETKit.exe" downloads/NETKit-v1.2.exe

# 提交并推送
git add downloads/NETKit-v1.2.exe
git commit -m "Add NETKit v1.2 executable"
git push

# Vercel会自动重新部署
```

### Vercel部署完成！

您的网站将在以下地址可访问：
- **Vercel域名**: https://netkit-website.vercel.app
- **自定义域名**: https://netkit.189cm.com（如果配置了）

---

## 🖥️ 方式二：Ubuntu 24.04服务器部署

### 📋 系统要求

- **操作系统**: Ubuntu 24.04 LTS (64位)
- **内存**: 最低512MB，推荐1GB+
- **存储**: 最低1GB可用空间
- **网络**: 公网IP地址
- **域名**: 189cm.com (已配置)

### 第1步: 更新系统并安装软件

```bash
# 更新系统包
sudo apt update && sudo apt upgrade -y

# 安装必要软件
sudo apt install nginx ufw curl wget git -y

# 启动并设置开机自启
sudo systemctl start nginx
sudo systemctl enable nginx

# 检查Nginx状态
sudo systemctl status nginx
```

### 第2步: 配置防火墙

```bash
# 配置UFW防火墙
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# 查看防火墙状态
sudo ufw status
```

### 第3步: 创建网站目录

```bash
# 创建网站根目录
sudo mkdir -p /var/www/netkit
sudo mkdir -p /var/www/netkit/downloads

# 设置正确的所有者和权限
sudo chown -R www-data:www-data /var/www/netkit
sudo chmod -R 755 /var/www/netkit
```

### 第4步: 上传网站文件

#### 方法A: 使用SCP上传（推荐）

```bash
# 从本地计算机上传文件到服务器
scp -r website/* username@your-server-ip:/tmp/

# 在服务器上移动文件到正确位置
sudo mv /tmp/*.html /tmp/*.css /tmp/*.js /var/www/netkit/

# 设置文件权限
sudo chown -R www-data:www-data /var/www/netkit
sudo chmod 644 /var/www/netkit/*.html /var/www/netkit/*.css /var/www/netkit/*.js
```

### 第5步: 配置Nginx

```bash
# 创建Nginx站点配置
sudo nano /etc/nginx/sites-available/netkit
```

将以下内容粘贴到文件中：

```nginx
server {
    listen 80;
    server_name netkit.189cm.com;
    root /var/www/netkit;
    index index.html;

    # 日志文件
    access_log /var/log/nginx/netkit_access.log;
    error_log /var/log/nginx/netkit_error.log;

    # 主页面
    location / {
        try_files $uri $uri/ =404;
    }

    # 静态资源缓存
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 下载文件特殊处理
    location /downloads/ {
        add_header Content-Disposition "attachment";
        add_header X-Content-Type-Options nosniff;
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Gzip压缩
    gzip on;
    gzip_types text/plain text/css application/javascript;

    # 隐藏敏感文件
    location ~ /\. {
        deny all;
    }
}
```

### 第6步: 启用站点

```bash
# 启用站点
sudo ln -s /etc/nginx/sites-available/netkit /etc/nginx/sites-enabled/

# 测试Nginx配置
sudo nginx -t

# 重新加载Nginx
sudo systemctl reload nginx
```

### 第7步: 配置域名解析

在您的域名管理面板中添加DNS记录：

```
类型: A
名称: netkit
值: 您的服务器IP地址
TTL: 300
```

### 第8步: 验证部署

```bash
# 检查网站是否可访问
curl -I http://netkit.189cm.com

# 检查Nginx状态
sudo systemctl status nginx
```

### 🔐 SSL证书配置（推荐）

```bash
# 安装Certbot
sudo apt install certbot python3-certbot-nginx -y

# 获取SSL证书
sudo certbot --nginx -d netkit.189cm.com

# 设置自动续期
sudo crontab -e
# 添加: 0 2 * * * /usr/bin/certbot renew --quiet
```

### 📦 上传软件文件

```bash
# 构建NETKit可执行文件（在开发机器上）
cd "src/NETKit"
dotnet publish -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true

# 上传到服务器
scp "bin/Release/net9.0-windows/win-x64/publish/NETKit.exe" username@your-server-ip:/tmp/NETKit-v1.2.exe

# 在服务器上移动文件
sudo mv /tmp/NETKit-v1.2.exe /var/www/netkit/downloads/
sudo chown www-data:www-data /var/www/netkit/downloads/NETKit-v1.2.exe
sudo chmod 644 /var/www/netkit/downloads/NETKit-v1.2.exe
```

### 🔧 故障排除

#### 常见问题

1. **网站无法访问**
   ```bash
   sudo systemctl status nginx
   sudo nginx -t
   sudo tail -f /var/log/nginx/error.log
   ```

2. **文件权限问题**
   ```bash
   sudo chown -R www-data:www-data /var/www/netkit
   sudo chmod -R 644 /var/www/netkit/*.html
   ```

3. **DNS解析问题**
   ```bash
   nslookup netkit.189cm.com
   ```

### 📊 监控脚本（可选）

```bash
# 创建监控脚本
sudo nano /usr/local/bin/netkit-monitor.sh
```

```bash
#!/bin/bash
WEBSITE="http://netkit.189cm.com"

if curl -f -s -o /dev/null "$WEBSITE"; then
    echo "$(date): 网站正常"
else
    echo "$(date): 网站异常"
    sudo systemctl restart nginx
fi
```

```bash
# 设置权限和定时任务
sudo chmod +x /usr/local/bin/netkit-monitor.sh
sudo crontab -e
# 添加: 0 * * * * /usr/local/bin/netkit-monitor.sh
```

---

## 🎉 部署完成

### Vercel部署
- **Vercel域名**: https://netkit-website.vercel.app
- **自定义域名**: https://netkit.189cm.com

### Ubuntu服务器部署
- **HTTP**: http://netkit.189cm.com
- **HTTPS**: https://netkit.189cm.com (如果配置了SSL)

您的同事现在可以访问网站并下载NETKit软件了！

---

**祝您部署顺利！** 🚀
