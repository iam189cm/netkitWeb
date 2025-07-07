# NETKit 软件下载文件夹

## 📁 文件说明

这个文件夹用于存放NETKit软件的可执行文件，供用户下载使用。

## 📦 需要放置的文件

请将以下文件放入此文件夹：

### 主要软件文件
- `NETKit-v1.2.exe` - NETKit v1.2主程序
- `NETKit-v1.1.exe` - NETKit v1.1历史版本（可选）

### 可选文件
- `checksums.txt` - 文件校验和（推荐）
- `CHANGELOG.txt` - 版本更新日志（可选）

## 🔨 获取软件文件

### 方法1: 从项目构建
```bash
# 在项目根目录执行
cd "src/NETKit"
dotnet publish -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true

# 构建完成后，可执行文件位于：
# src/NETKit/bin/Release/net9.0-windows/win-x64/publish/NETKit.exe

# 复制到网站目录
cp "src/NETKit/bin/Release/net9.0-windows/win-x64/publish/NETKit.exe" "website/downloads/NETKit-v1.2.exe"
```

### 方法2: 从GitHub Releases下载
1. 访问 https://github.com/iam189cm/NETKit/releases
2. 下载最新版本的可执行文件
3. 重命名为 `NETKit-v1.2.exe`
4. 放入此文件夹

## 📋 文件校验（推荐）

为了确保文件完整性，建议创建校验文件：

```bash
# 在downloads文件夹中执行
# Windows PowerShell
Get-FileHash NETKit-v1.2.exe -Algorithm SHA256 > checksums.txt

# Linux/macOS
sha256sum NETKit-v1.2.exe > checksums.txt
```

## 🌐 网站链接

网站中的下载链接指向：
- `downloads/NETKit-v1.2.exe` - 主下载链接
- `downloads/NETKit-v1.1.exe` - 历史版本（如果有）

## ⚠️ 注意事项

1. **文件大小**: 确保软件文件大小合理（通常10-20MB）
2. **文件权限**: 在Linux服务器上设置正确的文件权限
   ```bash
   chmod 644 *.exe
   chmod 644 *.txt
   ```
3. **病毒扫描**: 建议上传前进行病毒扫描
4. **备份**: 保留历史版本作为备份

## 📊 下载统计

如果启用了下载统计功能，下载记录将保存在：
- `/var/log/netkit_downloads.log` (如果使用PHP统计)
- 浏览器控制台 (如果使用JavaScript统计)

## 🔄 更新流程

当有新版本时：
1. 构建新版本的可执行文件
2. 重命名为对应版本号（如 `NETKit-v1.3.exe`）
3. 上传到此文件夹
4. 更新网站中的下载链接
5. 更新版本信息

---

**提示**: 此README文件仅用于说明，部署时可以删除。
