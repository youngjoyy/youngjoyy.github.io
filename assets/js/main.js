// ============================================
// 学术个人网站主JavaScript文件
// 包含：导航、交互、表单验证等功能
// ============================================

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 1. 移动端菜单切换
    initMobileMenu();
    
    // 2. 平滑滚动
    initSmoothScroll();
    
    // 3. 回到顶部按钮
    initBackToTop();
    
    // 4. 表单验证
    initFormValidation();
    
    // 5. 复制功能
    initCopyButtons();
    
    // 6. 图片懒加载
    initLazyLoading();
    
    // 7. 暗色模式切换
    initDarkMode();
    
    // 8. 出版物筛选功能
    initPublicationFilters();
    
    // 9. 项目卡片交互
    initProjectCards();
    
    // 10. 联系表单提交
    initContactForm();
    
    // 11. 博客搜索功能
    initBlogSearch();
});

// ============================================
// 1. 移动端菜单切换
// ============================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
            
            // 切换图标
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
        
        // 点击菜单外区域关闭菜单
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon.classList.contains('fa-times')) {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    }
}

// ============================================
// 2. 平滑滚动
// ============================================
function initSmoothScroll() {
    // 为所有内部链接添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 移动端关闭菜单
                const navLinks = document.getElementById('navLinks');
                const menuToggle = document.getElementById('menuToggle');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (menuToggle) {
                        menuToggle.classList.remove('active');
                        const icon = menuToggle.querySelector('i');
                        if (icon.classList.contains('fa-times')) {
                            icon.classList.replace('fa-times', 'fa-bars');
                        }
                    }
                }
            }
        });
    });
}

// ============================================
// 3. 回到顶部按钮
// ============================================
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.title = 'Back to top';
    document.body.appendChild(backToTopBtn);
    
    // 样式
    Object.assign(backToTopBtn.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease',
        zIndex: '1000'
    });
    
    // 显示/隐藏按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // 点击事件
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 悬停效果
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#2980b9';
        this.style.transform = 'translateY(-3px)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#3498db';
        this.style.transform = 'translateY(0)';
    });
}

// ============================================
// 4. 表单验证
// ============================================
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formData = {};
            
            // 验证所有必填字段
            const requiredFields = this.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                const errorElement = field.parentNode.querySelector('.error-message') || 
                                    createErrorMessage(field.parentNode);
                
                if (!field.value.trim()) {
                    showError(errorElement, 'This field is required');
                    isValid = false;
                } else {
                    hideError(errorElement);
                    
                    // 验证邮箱格式
                    if (field.type === 'email') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(field.value)) {
                            showError(errorElement, 'Please enter a valid email address');
                            isValid = false;
                        }
                    }
                }
                
                formData[field.name] = field.value;
            });
            
            if (isValid) {
                submitForm(formData);
            }
        });
    }
}

function createErrorMessage(parentElement) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.cssText = 'color: #e74c3c; font-size: 0.9rem; margin-top: 5px;';
    parentElement.appendChild(errorElement);
    return errorElement;
}

function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

function hideError(element) {
    element.textContent = '';
    element.style.display = 'none';
}

function submitForm(formData) {
    // 这里应该使用实际的API端点
    // 例如：fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
    
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // 显示加载状态
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // 模拟API调用延迟
    setTimeout(() => {
        // 模拟成功响应
        formMessage.className = 'success';
        formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        formMessage.style.display = 'block';
        
        // 重置表单
        const contactForm = document.getElementById('contactForm');
        if (contactForm) contactForm.reset();
        
        // 恢复按钮状态
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // 滚动到消息
        formMessage.scrollIntoView({ behavior: 'smooth' });
        
        // 3秒后隐藏消息
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 3000);
        
    }, 1500);
}

// ============================================
// 5. 复制功能（用于DOI、引用等）
// ============================================
function initCopyButtons() {
    // 为所有复制按钮添加点击事件
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.dataset.copyText || 
                              this.previousElementSibling?.textContent;
            
            if (textToCopy) {
                copyToClipboard(textToCopy);
                showCopyFeedback(this);
            }
        });
    });
}

function copyToClipboard(text) {
    // 创建临时textarea元素
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    
    // 选中并复制文本
    textarea.select();
    textarea.setSelectionRange(0, 99999); // 移动端支持
    
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Failed to copy text:', err);
    }
    
    // 清理
    document.body.removeChild(textarea);
}

function showCopyFeedback(button) {
    const originalHTML = button.innerHTML;
    const originalTitle = button.title;
    
    // 更新按钮状态
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    button.title = 'Copied to clipboard';
    button.disabled = true;
    
    // 2秒后恢复原状
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.title = originalTitle;
        button.disabled = false;
    }, 2000);
}

// ============================================
// 6. 图片懒加载
// ============================================
function initLazyLoading() {
    // 检查浏览器是否支持Intersection Observer
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // 替换data-src为src
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    // 替换data-srcset为srcset
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                        img.removeAttribute('data-srcset');
                    }
                    
                    // 加载完成后添加淡入效果
                    img.onload = () => {
                        img.style.opacity = '0';
                        img.style.transition = 'opacity 0.5s';
                        setTimeout(() => {
                            img.style.opacity = '1';
                        }, 100);
                    };
                    
                    observer.unobserve(img);
                }
            });
        });
        
        // 观察所有懒加载图片
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // 不支持Intersection Observer的浏览器回退
        const lazyImages = document.querySelectorAll('img[data-src]');
        let lazyImageCount = lazyImages.length;
        
        const lazyLoad = () => {
            lazyImages.forEach(img => {
                if (img.dataset.src && isInViewport(img)) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    lazyImageCount--;
                    
                    if (lazyImageCount === 0) {
                        document.removeEventListener('scroll', lazyLoad);
                        window.removeEventListener('resize', lazyLoad);
                        window.removeEventListener('orientationchange', lazyLoad);
                    }
                }
            });
        };
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationchange', lazyLoad);
        lazyLoad(); // 初始加载
    }
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0 &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.right >= 0
    );
}

// ============================================
// 7. 暗色模式切换
// ============================================
function initDarkMode() {
    // 创建暗色模式切换按钮
    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = 'darkModeToggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.title = 'Toggle dark mode';
    darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #2c3e50;
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: all 0.3s;
        z-index: 1000;
    `;
    document.body.appendChild(darkModeToggle);
    
    // 检查本地存储的暗色模式设置
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    if (currentTheme === 'dark') {
        enableDarkMode();
    }
    
    // 点击切换暗色模式
    darkModeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
    
    // 悬停效果
    darkModeToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    darkModeToggle.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    
    // 更新按钮图标
    const toggleBtn = document.getElementById('darkModeToggle');
    if (toggleBtn) {
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        toggleBtn.style.background = '#f1c40f';
    }
    
    // 添加暗色模式样式
    if (!document.getElementById('darkModeStyles')) {
        const darkModeStyles = document.createElement('style');
        darkModeStyles.id = 'darkModeStyles';
        darkModeStyles.textContent = `
            body.dark-mode {
                background-color: #1a1a1a;
                color: #e0e0e0;
            }
            
            body.dark-mode .sidebar {
                background-color: #2c3e50;
            }
            
            body.dark-mode .top-nav {
                background-color: #2c3e50;
                border-color: #34495e;
            }
            
            body.dark-mode .nav-links a {
                color: #ecf0f1;
            }
            
            body.dark-mode .card,
            body.dark-mode .project-card,
            body.dark-mode .post-card {
                background-color: #2c3e50;
                color: #ecf0f1;
                box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            }
            
            body.dark-mode .form-control {
                background-color: #34495e;
                border-color: #4a6278;
                color: #ecf0f1;
            }
            
            body.dark-mode .footer {
                background-color: #2c3e50;
                border-color: #34495e;
            }
        `;
        document.head.appendChild(darkModeStyles);
    }
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    
    // 更新按钮图标
    const toggleBtn = document.getElementById('darkModeToggle');
    if (toggleBtn) {
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        toggleBtn.style.background = '#2c3e50';
    }
}

// ============================================
// 8. 出版物筛选功能
// ============================================
function initPublicationFilters() {
    const yearFilter = document.getElementById('year-filter');
    const typeFilter = document.getElementById('type-filter');
    const searchInput = document.getElementById('search-publications');
    
    if (yearFilter && typeFilter) {
        // 组合筛选函数
        const filterPublications = () => {
            const year = yearFilter.value;
            const type = typeFilter.value;
            const search = searchInput ? searchInput.value.toLowerCase() : '';
            
            document.querySelectorAll('.publication-card').forEach(card => {
                const cardYear = card.dataset.year;
                const cardType = card.dataset.type;
                const cardTitle = card.querySelector('.pub-title').textContent.toLowerCase();
                const cardAuthors = card.querySelector('.pub-authors').textContent.toLowerCase();
                
                let show = true;
                
                // 年份筛选
                if (year !== 'all' && cardYear !== year) {
                    show = false;
                }
                
                // 类型筛选
                if (type !== 'all' && cardType !== type) {
                    show = false;
                }
                
                // 搜索筛选
                if (search && !cardTitle.includes(search) && !cardAuthors.includes(search)) {
                    show = false;
                }
                
                card.style.display = show ? 'block' : 'none';
            });
        };
        
        // 绑定事件
        yearFilter.addEventListener('change', filterPublications);
        typeFilter.addEventListener('change', filterPublications);
        if (searchInput) {
            searchInput.addEventListener('input', filterPublications);
        }
    }
}

// ============================================
// 9. 项目卡片交互
// ============================================
function initProjectCards() {
    document.querySelectorAll('.project-card').forEach(card => {
        // 点击卡片展开详情
        card.addEventListener('click', function(e) {
            // 避免点击链接时触发
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            this.classList.toggle('expanded');
        });
        
        // 键盘导航支持
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('expanded');
            }
        });
        
        // 设置可访问性属性
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
    });
}

// ============================================
// 10. 联系表单提交
// ============================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // 实时验证
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                const errorElement = this.parentNode.querySelector('.error-message');
                if (errorElement) {
                    hideError(errorElement);
                }
            });
        });
    }
}

// ============================================
// 11. 博客搜索功能
// ============================================
function initBlogSearch() {
    const searchInput = document.getElementById('blogSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const posts = document.querySelectorAll('.post-card');
            let visibleCount = 0;
            
            posts.forEach(post => {
                const title = post.querySelector('.post-title').textContent.toLowerCase();
                const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
                const content = post.textContent.toLowerCase();
                
                if (title.includes(searchTerm) || 
                    excerpt.includes(searchTerm) || 
                    content.includes(searchTerm)) {
                    post.style.display = 'block';
                    visibleCount++;
                } else {
                    post.style.display = 'none';
                }
            });
            
            // 显示/隐藏"无结果"消息
            const noResults = document.getElementById('noResults');
            if (noResults) {
                if (visibleCount === 0 && searchTerm.length > 0) {
                    noResults.style.display = 'block';
                } else {
                    noResults.style.display = 'none';
                }
            }
        });
    }
}

// ============================================
// 工具函数
// ============================================

// 防抖函数（用于搜索等频繁触发的事件）
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
