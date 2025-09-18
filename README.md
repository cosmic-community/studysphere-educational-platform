# StudySphere Educational Platform

![StudySphere Preview](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=300&fit=crop&auto=format)

A comprehensive educational platform that combines interactive learning modules, intelligent quiz systems, and smart study management to create an optimal learning environment for students.

## Features

- 📚 **Interactive Learning Modules** - Rich educational content with multimedia support
- 📝 **Comprehensive Quiz System** - Multiple question types with instant feedback
- 📊 **Progress Tracking** - Detailed analytics on student performance and completion rates
- 🚫 **Smart App Blocking** - Intelligent rules to eliminate distractions during study time
- 📅 **Study Scheduling** - Flexible scheduling system with customizable time blocks
- ⚙️ **System Configuration** - Administrative controls for platform settings
- 📱 **Responsive Design** - Optimized for all devices and screen sizes
- 🎯 **Gamified Learning** - Achievement system that motivates continuous learning

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68cb90c5fe0840663f65015d&clone_repository=68cb94d3fe0840663f6501cb)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Build a complete login system for a web app called "StudySphere".

Frontend (React.js + TypeScript + Tailwind CSS)

UI Layout:

App name "StudySphere" displayed at the top center, large and prominent.

Login or Signup form displayed below the app name.

Forms should be centered and fully responsive for desktop and mobile.

Authentication Flow:

Role Selection Page: User chooses Student or Parent, then is redirected to the corresponding login/signup page.

Login/Signup Page: Users toggle between login and signup. Smooth transitions.

Student Login Form:

Email, Password

"Forgot Password" link below password field → triggers student password reset via email verification.

Parent Login Form:

Email, Password, Master Password

"Forgot Master Password" link below master password → triggers master password reset via email + phone verification.

No regular "Forgot Password" link.

Student Signup Form:

Full Name, Age, Date of Birth, Gender (Male/Female/Other), Qualifications, Email, Password, Interests (selectable or tags).

Parent Signup Form:

Name, Phone Number, Student's Email, Email, Password, Master Password.

Password Reset Workflows:

Students: email verification code → reset password.

Parents: email + phone verification codes → reset master password.

Validation:

Required fields, email format, phone format, password strength

Show error messages for invalid credentials.

Frontend Logic:

Only redirect to dashboard if backend returns a valid JWT token.

Use React Router for navigation.

Use Redux or Context API for authentication state management.

Tailwind CSS for styling and responsive design.

Backend (Node.js + Express + MongoDB + JWT)

Models:

Student: fullName, age, dob, gender, qualifications, email (unique), password (hashed), interests (array).

Parent: name, phone, studentEmail, email (unique), password (hashed), masterPassword (hashed).

Routes:

/api/auth/student/signup, /api/auth/student/login, /api/auth/student/forgot-password

/api/auth/parent/signup, /api/auth/parent/login, /api/auth/parent/forgot-master-password

Backend Logic:

Hash passwords & master passwords using bcrypt.

Compare hashed passwords during login.

Generate JWT tokens containing user ID and role, expiring in 1 hour.

Protect routes with JWT middleware.

Validate input fields: required, email format, phone number format, password strength.

Return clear JSON responses for success/failure.

Use environment variables for MongoDB URI and JWT secret.

Additional Requirements:

Students and parents cannot access each other's dashboards.

Frontend must only redirect if valid JWT token is received.

Fully responsive, mobile-friendly design.

Smooth navigation between login, signup, and password reset flows."

### Code Generation Prompt

> Based on the content model I created for "Build a complete login system for a web app called "StudySphere". [Previous content model details], now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless content management
- **React Icons** - Icon library
- **Inter Font** - Modern typography

## Getting Started

### Prerequisites

- Node.js 18+ 
- Bun package manager
- Cosmic CMS account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd studysphere-platform
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
# Copy the example file
cp .env.example .env.local

# Add your Cosmic CMS credentials
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Learning Modules
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all active learning modules
const modules = await cosmic.objects.find({
  type: 'learning-modules',
  'metadata.is_active': true
}).props(['id', 'title', 'slug', 'metadata']).depth(1)

// Get specific module with prerequisites
const module = await cosmic.objects.findOne({
  type: 'learning-modules',
  slug: 'basic-algebra-variables-and-equations'
}).depth(1)
```

### Managing Quiz Questions
```typescript
// Get questions for a specific learning module
const questions = await cosmic.objects.find({
  type: 'quiz-questions',
  'metadata.learning_module': moduleId
}).props(['id', 'title', 'metadata']).depth(1)

// Filter by difficulty level
const easyQuestions = await cosmic.objects.find({
  type: 'quiz-questions',
  'metadata.difficulty_level.key': 'easy'
}).props(['id', 'title', 'metadata']).depth(1)
```

### Tracking Student Progress
```typescript
// Update student progress
await cosmic.objects.updateOne(progressId, {
  metadata: {
    completion_status: { key: 'completed', value: 'Completed' },
    quiz_score: 85,
    pass_mark_achieved: true,
    completed_date: new Date().toISOString().split('T')[0]
  }
})

// Get progress for specific student
const progress = await cosmic.objects.find({
  type: 'progress-tracking',
  'metadata.student_id': 'student_12345'
}).depth(1)
```

## Cosmic CMS Integration

This application integrates with your Cosmic CMS bucket to manage:

- **Learning Modules** - Educational content with rich HTML, images, and metadata
- **Quiz Questions** - Interactive assessments with multiple question types
- **Progress Tracking** - Student completion status and performance metrics
- **App Blocking Rules** - Smart distraction management during study sessions
- **Study Schedules** - Flexible time management for optimal learning
- **System Configuration** - Administrative settings and platform controls

All content types support real-time updates through the Cosmic dashboard, making it easy to add new modules, modify quiz questions, and adjust system settings without touching code.

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Netlify
1. Build the application: `bun run build`
2. Deploy the `out` folder to Netlify
3. Configure environment variables
4. Set up continuous deployment

For production, ensure you set the required environment variables:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY` 
- `COSMIC_WRITE_KEY`
<!-- README_END -->