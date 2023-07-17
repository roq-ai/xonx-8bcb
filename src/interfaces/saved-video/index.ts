import { ClientInterface } from 'interfaces/client';
import { VideoInterface } from 'interfaces/video';
import { GetQueryInterface } from 'interfaces';

export interface SavedVideoInterface {
  id?: string;
  client_id?: string;
  video_id?: string;
  created_at?: any;
  updated_at?: any;

  client?: ClientInterface;
  video?: VideoInterface;
  _count?: {};
}

export interface SavedVideoGetQueryInterface extends GetQueryInterface {
  id?: string;
  client_id?: string;
  video_id?: string;
}
