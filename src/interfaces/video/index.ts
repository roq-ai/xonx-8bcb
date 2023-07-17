import { SavedVideoInterface } from 'interfaces/saved-video';
import { ContentCreatorInterface } from 'interfaces/content-creator';
import { GetQueryInterface } from 'interfaces';

export interface VideoInterface {
  id?: string;
  title: string;
  content: string;
  content_creator_id?: string;
  created_at?: any;
  updated_at?: any;
  saved_video?: SavedVideoInterface[];
  content_creator?: ContentCreatorInterface;
  _count?: {
    saved_video?: number;
  };
}

export interface VideoGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
  content_creator_id?: string;
}
