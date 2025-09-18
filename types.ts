// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Learning Modules
interface LearningModule extends CosmicObject {
  type: 'learning-modules';
  metadata: {
    module_title: string;
    subject?: {
      key: string;
      value: string;
    };
    difficulty_level?: {
      key: string;
      value: string;
    };
    description: string;
    learning_content: string;
    estimated_duration: number;
    prerequisites?: LearningModule[];
    module_image?: {
      url: string;
      imgix_url: string;
    };
    is_active?: boolean;
  };
}

// Quiz Questions
interface QuizQuestion extends CosmicObject {
  type: 'quiz-questions';
  metadata: {
    question_text: string;
    question_type: {
      key: string;
      value: string;
    };
    learning_module: LearningModule;
    difficulty_level: {
      key: string;
      value: string;
    };
    answer_options?: string[];
    correct_answer: string;
    explanation: string;
    points: number;
  };
}

// Progress Tracking
interface ProgressRecord extends CosmicObject {
  type: 'progress-tracking';
  metadata: {
    student_id: string;
    learning_module: LearningModule;
    completion_status: {
      key: string;
      value: string;
    };
    quiz_score?: number;
    attempts_count?: number;
    time_spent_minutes?: number;
    started_date?: string;
    completed_date?: string;
    pass_mark_achieved?: boolean;
    notes?: string;
  };
}

// App Blocking Rules
interface AppBlockingRule extends CosmicObject {
  type: 'app-blocking-rules';
  metadata: {
    rule_name: string;
    app_category: {
      key: string;
      value: string;
    };
    blocked_apps: string[];
    block_during_study_time?: boolean;
    priority_level: {
      key: string;
      value: string;
    };
    description?: string;
    is_active?: boolean;
  };
}

// Study Schedules
interface StudySchedule extends CosmicObject {
  type: 'study-schedules';
  metadata: {
    schedule_name: string;
    description?: string;
    start_time: string;
    end_time: string;
    days_of_week: string[];
    is_template?: boolean;
    recommended_for?: string;
  };
}

// System Configuration
interface SystemConfiguration extends CosmicObject {
  type: 'system-configuration';
  metadata: {
    setting_name: string;
    setting_category: {
      key: string;
      value: string;
    };
    setting_value: string;
    value_type: {
      key: string;
      value: string;
    };
    description: string;
    is_active?: boolean;
  };
}

// API response types
interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type literals for select-dropdown values
type CompletionStatus = 'not_started' | 'in_progress' | 'completed' | 'failed';
type QuestionType = 'multiple_choice' | 'short_answer' | 'true_false';
type DifficultyLevel = 'easy' | 'medium' | 'hard';
type Subject = 'math' | 'science' | 'english' | 'history' | 'geography';
type AppCategory = 'social_media' | 'games' | 'entertainment' | 'messaging' | 'shopping' | 'news';
type PriorityLevel = 'high' | 'medium' | 'low';
type SettingCategory = 'quiz_settings' | 'blocking_rules' | 'ai_analysis' | 'notifications' | 'general';
type ValueType = 'number' | 'text' | 'boolean' | 'json';

export type {
  CosmicObject,
  LearningModule,
  QuizQuestion,
  ProgressRecord,
  AppBlockingRule,
  StudySchedule,
  SystemConfiguration,
  CosmicResponse,
  CompletionStatus,
  QuestionType,
  DifficultyLevel,
  Subject,
  AppCategory,
  PriorityLevel,
  SettingCategory,
  ValueType
}