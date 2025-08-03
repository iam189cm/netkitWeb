// NETKit网站交互脚本

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('NETKit网站已加载');
    
    // 初始化功能
    initSmoothScroll();
    initDownloadTracking();
    initMockupInteraction();
    initScreenshotCarousel();
});

// 平滑滚动功能
function initSmoothScroll() {
    // 为所有内部链接添加平滑滚动
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 下载统计功能
function initDownloadTracking() {
    const downloadBtn = document.querySelector('.btn-download');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            trackDownload();
        });
    }
}

// 下载统计函数
function trackDownload() {
    const timestamp = new Date().toISOString();
    const userAgent = navigator.userAgent;
    const platform = getPlatform();
    
    // 记录到控制台（实际部署时可以发送到服务器）
    console.log('下载统计:', {
        time: timestamp,
        platform: platform,
        userAgent: userAgent,
        version: 'v1.2.0'
    });
    
    // 可选：发送统计数据到服务器
    // sendDownloadStats(timestamp, platform, userAgent);
}

// 获取用户平台信息
function getPlatform() {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (userAgent.includes('windows')) return 'Windows';
    if (userAgent.includes('mac')) return 'macOS';
    if (userAgent.includes('linux')) return 'Linux';
    if (userAgent.includes('android')) return 'Android';
    if (userAgent.includes('iphone') || userAgent.includes('ipad')) return 'iOS';
    
    return 'Unknown';
}

// 软件界面模拟交互
function initMockupInteraction() {
    const mockupTabs = document.querySelectorAll('.mockup-tabs span');
    
    mockupTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有活动状态
            mockupTabs.forEach(t => t.classList.remove('active'));
            
            // 添加当前活动状态
            this.classList.add('active');
            
            // 模拟切换内容（可以扩展）
            console.log('切换到标签页:', this.textContent);
        });
    });
}

// 发送下载统计到服务器（可选功能）
function sendDownloadStats(timestamp, platform, userAgent) {
    // 如果服务器支持统计API，可以使用这个函数
    fetch('/api/download-stats', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            timestamp: timestamp,
            platform: platform,
            userAgent: userAgent,
            version: 'v1.2.0'
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('统计数据已发送:', data);
    })
    .catch(error => {
        console.log('统计发送失败:', error);
    });
}

// 页面滚动动画效果
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.feature-card, .use-case, .spec-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 简单的错误处理
window.addEventListener('error', function(e) {
    console.log('页面错误:', e.message);
});

// 检查浏览器兼容性
function checkBrowserCompatibility() {
    const isModernBrowser = 'fetch' in window && 'Promise' in window;
    
    if (!isModernBrowser) {
        console.warn('浏览器版本较旧，部分功能可能不可用');
    }
}

// 初始化兼容性检查
checkBrowserCompatibility();

// 截图轮播功能
let currentImageIndex = 0;
const totalImages = 3;

// 初始化截图轮播
function initScreenshotCarousel() {
    console.log('初始化截图轮播功能');
    
    // 自动轮播（可选）
    // setInterval(nextImage, 5000); // 每5秒自动切换
}

// 显示指定索引的图片
function showImage(index) {
    const screenshots = document.querySelectorAll('.software-screenshot');
    const dots = document.querySelectorAll('.dot');
    
    // 隐藏所有图片
    screenshots.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // 显示指定图片
    if (screenshots[index]) {
        screenshots[index].classList.add('active');
        dots[index].classList.add('active');
        currentImageIndex = index;
    }
}

// 显示下一张图片
function nextImage() {
    const nextIndex = (currentImageIndex + 1) % totalImages;
    showImage(nextIndex);
}

// 显示上一张图片
function previousImage() {
    const prevIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    showImage(prevIndex);
}

// 显示指定图片（供HTML调用）
function currentImage(index) {
    showImage(index);
}

// 全局函数，供HTML调用
window.trackDownload = trackDownload;
window.nextImage = nextImage;
window.previousImage = previousImage;
window.currentImage = currentImage;
