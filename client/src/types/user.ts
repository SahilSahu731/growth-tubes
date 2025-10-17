export interface User {
  _id: string;
  username: string;
  email: string;
  profilePic?: string;
  bio?: string;
  role: 'user' | 'creator' | 'admin';
  subscription: {
    isActive: boolean;
    plan: 'free' | 'monthly' | 'yearly';
    startDate?: Date;
    endDate?: Date;
  };
  curiosityPaths: CuriosityPath[];
  boards: Board[];
  growthJournal: JournalEntry[];
  interests: string[];
  savedResources: SavedResource[];
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

export interface CuriosityPath {
  pathId: {
    _id: string;
    title: string;
    description: string;
  };
  progress: number;
  completed: boolean;
}

export interface Board {
  boardId: {
    _id: string;
    title: string;
  };
  title: string;
  createdAt: Date;
}

export interface JournalEntry {
  _id: string;
  entry: string;
  resourceId?: string;
  createdAt: Date;
}

export interface SavedResource {
  _id: string;
  title: string;
  type: string;
}

export interface UserProfileResponse {
  success: boolean;
  user: User;
}