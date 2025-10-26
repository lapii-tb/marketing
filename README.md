# 568Win Marketing

568Win Marketing website project - 22/10/2025

## Overview

This project generates localized HTML marketing pages for 568Win using a component-based system with multiple language support.

## Supported Languages

- **English** (en) - Generates `index.html`
- **Chinese Simplified** (zh-CN) - Generates `index_cn.html`

## Quick Start

To generate the index.html files for all supported languages, run:

```bash
node 22102025/assets/js/generate.js
```

## How It Works

The generator:
1. Reads HTML components from the `components/` directory
2. Loads language-specific content from `locale/` JSON files
3. Combines components using the defined template
4. Replaces locale keys with translated content
5. Generates separate HTML files for each language

## Project Structure

```
22102025/
├── assets/
│   ├── css/          # Stylesheets
│   ├── image/        # Images and media
│   └── js/           # JavaScript files including the generator
├── components/       # HTML component files
├── locale/           # Language translation files
│   ├── en.json       # English translations
│   └── zh-CN.json    # Chinese translations
└── providers/        # Provider-specific content
```

## Generated Output

After running the command, you'll find:
- `index.html` - English version
- `index_cn.html` - Chinese version

Both files will be generated in the project root directory.
