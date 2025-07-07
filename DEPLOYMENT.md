# NETKit网站部署指南

## 🎯 部署概览

本指南提供简单快速的Vercel云端部署方式。

---

## 🚀 Vercel部署

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

---

## 🎉 部署完成

您的网站将在以下地址可访问：
- **Vercel域名**: https://netkit-website.vercel.app
- **自定义域名**: https://netkit.189cm.com（如果配置了）

您的同事现在可以访问网站并下载NETKit软件了！

---

**祝您部署顺利！** 🚀
