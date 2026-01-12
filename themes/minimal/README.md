# Minimal Theme

一个受 Apple 设计风格启发的 Hexo 博客主题，简洁、优雅、现代。

## 特性

- 🎨 **Apple 风格设计** - 简洁、优雅、高级感
- 📱 **完全响应式** - 完美支持桌面、平板、手机
- ✨ **流畅动画** - 精心设计的过渡和交互效果
- 🚀 **性能优化** - 轻量级，无依赖
- 🎯 **功能丰富** - 侧边栏、归档、分类、标签等

## 安装

1. 将主题文件夹复制到 `themes/` 目录：

```bash
git clone https://github.com/yourusername/hexo-theme-minimal.git themes/minimal
```

2. 修改 Hexo 配置文件 `_config.yml`：

```yaml
theme: minimal
```

## 配置

编辑主题配置文件 `themes/minimal/_config.yml`：

```yaml
profile:
  avatar: /images/avatar.png
  social:
    github: https://github.com/yourname
    email: mailto:your@email.com

features:
  reading_progress: true
  back_to_top: true
  lazy_load: true
```

## 目录结构

```
themes/minimal/
├── layout/              # 模板文件
├── source/              # 资源文件
│   ├── css/            # 样式文件
│   ├── js/             # JavaScript 文件
│   └── images/         # 图片资源
├── languages/          # 语言文件
└── _config.yml         # 主题配置
```

## 自定义

### 自定义 CSS

在 `source/_data/` 目录下创建 `styles.styl` 文件（需要 Hexo 配置支持）。

### 自定义头像

将头像图片放到 `source/images/avatar.png`。

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 开发

```bash
# 本地预览
hexo server

# 构建静态文件
hexo generate

# 部署
hexo deploy
```

## 许可证

MIT License
