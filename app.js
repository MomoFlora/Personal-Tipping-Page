/**
 * 打赏页面 - 交互逻辑 & 粒子动画
 * ==========================================
 * 图片路径已设置为本地 images 目录：
 * - 背景图：images/bg.webp
 * - 微信收款码：images/WeChat.jpg
 * - 支付宝收款码：images/Alipay.jpg
 * ==========================================
 */

// ==================== 配置区 ====================
const QR_CONFIG = {
    wechat: {
        // 微信收款码图片路径
        imageUrl: 'images/WeChat.jpg',
        label: '微信',
        colorName: '微信',
    },
    alipay: {
        // 支付宝收款码图片路径
        imageUrl: 'images/Alipay.jpg',
        label: '支付宝',
        colorName: '支付宝',
    },
};

// 支付方式对应的主题色配置
const THEME_COLORS = {
    wechat: {
        accent: '#07c160',
        glow: 'rgba(7, 193, 96, 0.45)',
        rgb: '7, 193, 96',
    },
    alipay: {
        accent: '#1677ff',
        glow: 'rgba(22, 119, 255, 0.45)',
        rgb: '22, 119, 255',
    },
};

// ==================== DOM 元素 ====================
const qrImage = document.getElementById('qrImage');
const qrContainer = document.getElementById('qrContainer');
const qrScanHint = document.getElementById('qrScanHint');
const qrTip = document.getElementById('qrTip');
const btnWechat = document.getElementById('btnWechat');
const btnAlipay = document.getElementById('btnAlipay');
const rewardCard = document.getElementById('rewardCard');
const particleCanvas = document.getElementById('particleCanvas');
const ctx = particleCanvas.getContext('2d');

// ==================== 状态 ====================
let currentMethod = 'wechat';
let targetAccentRgb = THEME_COLORS.wechat.rgb;
let currentAccentRgb = THEME_COLORS.wechat.rgb;
let particles = [];
let animationFrameId;

// ==================== 粒子系统 ====================
function resizeCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}

function createParticles() {
    const count = Math.min(Math.floor(window.innerWidth * 0.12), 80);
    particles = [];
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * particleCanvas.width,
            y: Math.random() * particleCanvas.height,
            radius: Math.random() * 1.8 + 0.4,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: -(Math.random() * 0.5 + 0.2),
            opacity: Math.random() * 0.5 + 0.2,
            pulseSpeed: Math.random() * 0.02 + 0.005,
            pulseOffset: Math.random() * Math.PI * 2,
        });
    }
}

function updateParticles() {
    for (const p of particles) {
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += Math.sin(Date.now() * p.pulseSpeed + p.pulseOffset) * 0.003;

        // 限制透明度范围
        p.opacity = Math.max(0.12, Math.min(0.7, p.opacity));

        // 循环粒子位置
        if (p.y < -10) {
            p.y = particleCanvas.height + 10;
            p.x = Math.random() * particleCanvas.width;
        }
        if (p.x < -10) p.x = particleCanvas.width + 10;
        if (p.x > particleCanvas.width + 10) p.x = -10;
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    // 平滑过渡当前主题色
    const targetRgbArr = targetAccentRgb.split(',').map(Number);
    const currentRgbArr = currentAccentRgb.split(',').map(Number);
    const lerpFactor = 0.06;

    const newRgb = currentRgbArr.map((val, i) =>
        Math.round(val + (targetRgbArr[i] - val) * lerpFactor)
    );
    currentAccentRgb = newRgb.join(',');

    for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        // 粒子颜色混合主题色
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
        gradient.addColorStop(0, `rgba(${currentAccentRgb}, ${p.opacity * 1.3})`);
        gradient.addColorStop(0.5, `rgba(${currentAccentRgb}, ${p.opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(${currentAccentRgb}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fill();

        // 微弱的白色光点核心
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.6})`;
        ctx.fill();
    }
}

function animateParticles() {
    updateParticles();
    drawParticles();
    animationFrameId = requestAnimationFrame(animateParticles);
}

// ==================== 主题切换 ====================
function updateThemeColors(method) {
    const colors = THEME_COLORS[method];
    targetAccentRgb = colors.rgb;

    // 更新 CSS 变量
    document.documentElement.style.setProperty('--accent', colors.accent);
    document.documentElement.style.setProperty('--accent-glow', colors.glow);
    document.documentElement.style.setProperty('--accent-rgb', colors.rgb);

    // 更新光晕颜色
    const glowOrbs = document.querySelectorAll('.glow-orb');
    glowOrbs.forEach((orb) => {
        orb.style.background = orb.style.background.replace(
            /rgba\([\d,\s]+/,
            `rgba(${colors.rgb}`
        );
    });
}

function switchPaymentMethod(method) {
    if (currentMethod === method) return;

    currentMethod = method;
    const config = QR_CONFIG[method];

    // 更新按钮状态
    btnWechat.classList.toggle('active', method === 'wechat');
    btnAlipay.classList.toggle('active', method === 'alipay');

    // 添加二维码切换动画
    qrContainer.style.transform = 'scale(0.92)';
    qrContainer.style.opacity = '0.5';
    qrContainer.style.transition = 'all 0.2s ease-in';

    setTimeout(() => {
        // 更新二维码图片
        qrImage.src = config.imageUrl;

        // 更新提示文字
        qrTip.innerHTML = `请使用 <strong>${config.colorName}</strong> 扫码打赏`;

        // 恢复二维码显示
        qrContainer.style.transform = 'scale(1)';
        qrContainer.style.opacity = '1';
        qrContainer.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }, 200);

    // 更新主题色
    updateThemeColors(method);
}

// ==================== 事件绑定 ====================
btnWechat.addEventListener('click', () => switchPaymentMethod('wechat'));
btnAlipay.addEventListener('click', () => switchPaymentMethod('alipay'));

// 二维码点击放大效果
qrContainer.addEventListener('click', () => {
    qrContainer.style.transform = 'scale(1.08)';
    qrContainer.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    qrContainer.style.boxShadow =
        '0 0 0 2px rgba(var(--accent-rgb), 0.5), 0 16px 50px rgba(0,0,0,0.6), 0 0 70px rgba(var(--accent-rgb), 0.35)';

    setTimeout(() => {
        qrContainer.style.transform = 'scale(1)';
        qrContainer.style.boxShadow =
            '0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.4)';
        qrContainer.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }, 600);
});

// 窗口大小变化时重建粒子
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        resizeCanvas();
        createParticles();
    }, 300);
});

// ==================== 键盘切换（桌面端快捷键） ====================
window.addEventListener('keydown', (e) => {
    if (e.key === '1' || e.key === 'w' || e.key === 'W') {
        switchPaymentMethod('wechat');
    } else if (e.key === '2' || e.key === 'a' || e.key === 'A') {
        switchPaymentMethod('alipay');
    }
});

// ==================== 初始化 ====================
function init() {
    resizeCanvas();
    createParticles();
    animateParticles();

    // 设置初始主题
    updateThemeColors('wechat');
    btnWechat.classList.add('active');

    // 初始提示文字
    qrTip.innerHTML = `请使用 <strong>${QR_CONFIG.wechat.colorName}</strong> 扫码打赏`;

    console.log('✨ 打赏页面已就绪');
    console.log('💡 桌面端可按 1/W 切换到微信，按 2/A 切换到支付宝');
}

init();
