# ============================================
# Gemfile - Ruby依赖定义
# 运行 bundle install 安装所有依赖
# ============================================

source "https://rubygems.org"           # RubyGems源

# Jekyll核心
gem "jekyll", "~> 4.3.3"                # Jekyll静态网站生成器

# 主题相关 (使用minimal主题作为基础)
gem "jekyll-theme-minimal"              # 基础主题

# 插件
gem "jekyll-feed", "~> 0.17"            # RSS/Atom feed生成
gem "jekyll-seo-tag", "~> 2.8"          # SEO优化标签
gem "jekyll-sitemap", "~> 1.4"          # 自动生成sitemap.xml
gem "jekyll-paginate", "~> 1.1"         # 分页功能（用于博客）

# Markdown处理
gem "kramdown", "~> 2.4"                # Markdown解析器
gem "kramdown-parser-gfm", "~> 1.1"     # GitHub Flavored Markdown支持

# 开发工具
group :jekyll_plugins do
  gem "jekyll-admin", "~> 0.11"         # 管理后台（可选）
end

# 本地开发
group :development do
  gem "webrick", "~> 1.8"               # Web服务器
  gem "jekyll-serve", "~> 1.0"          # 开发服务器
end

# Windows兼容性 (如果是Windows系统)
# gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# 性能优化
gem "jekyll-minifier", "~> 0.1"         # HTML/CSS/JS压缩（可选）
