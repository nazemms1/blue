# Blue-Module

A React + TypeScript + Vite project for the Blue Module.

## 📦 Project Structure (FSD Architecture)
Blue-Module/
├── src/
│ ├── app/
│ │ ├── App.tsx
│ │ ├── main.tsx
│ │ └── providers/
│ │ └── index.tsx
│ │
│ ├── pages/
│ │ ├── HomePage/
│ │ │ └── ui/
│ │ │ └── HomePage.tsx
│ │ └── MediaPage/
│ │ └── ui/
│ │ └── MediaPage.tsx
│ │
│ ├── widgets/
│ │ ├── ContentWidget/
│ │ │ ├── ui/
│ │ │ │ └── ContentWidget.tsx
│ │ │ ├── model/
│ │ │ │ └── contentSlice.ts
│ │ │ └── index.ts
│ │ └── MediaWidget/
│ │ ├── ui/
│ │ │ └── MediaWidget.tsx
│ │ ├── model/
│ │ │ └── mediaSlice.ts
│ │ └── index.ts
│ │
│ ├── features/
│ │ ├── contentEditor/
│ │ │ ├── ui/
│ │ │ │ └── ContentEditor.tsx
│ │ │ ├── model/
│ │ │ │ └── contentEditorSlice.ts
│ │ │ └── index.ts
│ │ └── mediaUploader/
│ │ ├── ui/
│ │ │ └── MediaUploader.tsx
│ │ ├── model/
│ │ │ └── mediaUploaderSlice.ts
│ │ └── index.ts
│ │
│ ├── entities/
│ │ ├── content/
│ │ │ ├── ui/
│ │ │ │ └── ContentCard.tsx
│ │ │ ├── model/
│ │ │ │ └── contentTypes.ts
│ │ │ └── index.ts
│ │ └── media/
│ │ ├── ui/
│ │ │ └── MediaCard.tsx
│ │ ├── model/
│ │ │ └── mediaTypes.ts
│ │ └── index.ts
│ │
│ ├── shared/
│ │ ├── ui/
│ │ │ ├── Button/
│ │ │ ├── Input/
│ │ │ ├── Modal/
│ │ │ └── index.ts
│ │ ├── lib/
│ │ │ ├── api/
│ │ │ ├── utils/
│ │ │ └── helpers/
│ │ ├── config/
│ │ │ └── index.ts
│ │ ├── types/
│ │ │ └── global.d.ts
│ │ └── constants/
│ │ └── index.ts
│ │
│ └── index.css
│
├── public/
│ └── media/
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md


 
## 📄 Content & Media

This project includes two main sections:

### Content
- Manages and displays text-based content
- Handles data presentation and formatting
- Contains the core information architecture

### Media
- Handles images, videos, and other media files
- Manages media assets in `/public/media/` directory
- Provides responsive media components

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone <your-repository-url>
cd Blue-Module

# Switch to Blue-Module branch
git checkout Blue-Module

# Install dependencies
npm install

# Start development server
npm run dev
📤 Git Push Instructions
To push changes to GitLab on Blue-Module branch:
bash
# Add all changes
git add .

# Commit with a message
git commit -m "Your commit message here"

# Push to GitLab Blue-Module branch
git push gitlab Blue-Module
If remote is already set as 'origin':
bash
git push origin Blue-Module
First time setup (if remote not configured):
bash
# Add GitLab remote
git remote add gitlab https://gitlab.com/your-username/your-repository.git

# Or with SSH
git remote add gitlab git@gitlab.com:your-username/your-repository.git

# Push to Blue-Module branch
git push gitlab Blue-Module