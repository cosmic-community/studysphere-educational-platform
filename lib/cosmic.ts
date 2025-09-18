import { createBucketClient } from '@cosmicjs/sdk'
import type { 
  LearningModule, 
  QuizQuestion, 
  ProgressRecord, 
  AppBlockingRule, 
  StudySchedule, 
  SystemConfiguration,
  CosmicResponse 
} from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Learning Modules
export async function getLearningModules(): Promise<LearningModule[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'learning-modules' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as LearningModule[]).sort((a, b) => {
      const titleA = a.metadata?.module_title || a.title || '';
      const titleB = b.metadata?.module_title || b.title || '';
      return titleA.localeCompare(titleB);
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch learning modules');
  }
}

export async function getLearningModule(slug: string): Promise<LearningModule | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'learning-modules',
      slug
    }).depth(1);
    
    return response.object as LearningModule;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Quiz Questions
export async function getQuizQuestions(): Promise<QuizQuestion[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'quiz-questions' })
      .props(['id', 'title', 'metadata'])
      .depth(1);
    
    return response.objects as QuizQuestion[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch quiz questions');
  }
}

export async function getQuizQuestionsByModule(moduleId: string): Promise<QuizQuestion[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'quiz-questions',
        'metadata.learning_module': moduleId
      })
      .props(['id', 'title', 'metadata'])
      .depth(1);
    
    return response.objects as QuizQuestion[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch quiz questions for module');
  }
}

// Progress Tracking
export async function getProgressRecords(): Promise<ProgressRecord[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'progress-tracking' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as ProgressRecord[]).sort((a, b) => {
      const dateA = new Date(a.metadata?.started_date || '').getTime();
      const dateB = new Date(b.metadata?.started_date || '').getTime();
      return dateB - dateA; // Newest first
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch progress records');
  }
}

// App Blocking Rules
export async function getAppBlockingRules(): Promise<AppBlockingRule[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'app-blocking-rules' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as AppBlockingRule[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch app blocking rules');
  }
}

// Study Schedules
export async function getStudySchedules(): Promise<StudySchedule[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'study-schedules' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as StudySchedule[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch study schedules');
  }
}

// System Configuration
export async function getSystemConfigurations(): Promise<SystemConfiguration[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'system-configuration' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as SystemConfiguration[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch system configurations');
  }
}