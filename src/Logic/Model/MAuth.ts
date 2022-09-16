export interface MAuth {
  user_id: number;
  mail_id: string;
  created_at: Date;
  identity_provider: string | null;
  subject_id: string | null;
}
