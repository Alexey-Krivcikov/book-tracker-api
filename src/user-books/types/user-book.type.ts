export enum UserBookStatus {
  PLANNED = "planned",
  READING = "reading",
  COMPLETED = "completed",
  DROPPED = "dropped",
}

export interface UserBook {
  id: string;
  userId: string;
  bookId: string;
  rating?: number; // 1–10
  status: UserBookStatus;
  createdAt: Date;
}
