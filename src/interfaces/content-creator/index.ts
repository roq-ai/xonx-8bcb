import { VideoInterface } from 'interfaces/video';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ContentCreatorInterface {
  id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  video?: VideoInterface[];
  user?: UserInterface;
  _count?: {
    video?: number;
  };
}

export interface ContentCreatorGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
