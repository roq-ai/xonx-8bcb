const mapping: Record<string, string> = {
  clients: 'client',
  'content-creators': 'content_creator',
  'saved-videos': 'saved_video',
  users: 'user',
  videos: 'video',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
