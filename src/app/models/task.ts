export interface Task {
  id: number;
  title: string;
  description: string;
  user_name: string;
  status: string;
  user_id?: number; // Added user_id as an optional property
  // created_at: string;
}

export interface CreateTask {
  title: string;
  description: string;
}