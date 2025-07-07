# NETKit 网站

这是NETKit工具的官方网站，提供软件下载和相关信息。

## 🚀 快速部署

### 推荐方式：Vercel部署

1. **Fork或克隆此仓库**
2. **推送到GitHub**
3. **连接到Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 使用GitHub登录
   - 导入此仓库
   - 点击部署

### 传统方式：服务器部署

查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 获取详细的Ubuntu服务器部署指南。

## 📁 项目结构

```
├── index.html          # 主页面
├── style.css          # 样式文件
├── script.js          # JavaScript功能
├── vercel.json        # Vercel配置文件
├── DEPLOYMENT.md      # 详细部署指南
├── README.md          # 项目说明
└── downloads/         # 软件下载目录
    └── README.md      # 下载说明
```

## 🔧 本地开发

由于这是一个静态网站，您可以直接在浏览器中打开 `index.html` 文件进行预览。

或者使用简单的HTTP服务器：

```bash
# 使用Python
python -m http.server 8000

# 使用Node.js
npx serve .

# 使用PHP
php -S localhost:8000
```

然后访问 `http://localhost:8000`

## 📦 添加新版本软件

1. 将新的可执行文件放入 `downloads/` 目录
2. 更新 `index.html` 中的下载链接和版本信息
3. 提交并推送更改

如果使用Vercel，网站会自动重新部署。

## 🌐 访问地址

- **开发环境**: 本地文件或本地服务器
- **Vercel部署**: https://your-project.vercel.app
- **自定义域名**: https://netkit.189cm.com

## 📝 许可证

此项目仅用于NETKit工具的分发和展示。
