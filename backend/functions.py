import googleapiclient.discovery
from datetime import datetime

api_service_name = "youtube"
api_version = "v3"
DEVELOPER_KEY = ""

youtube = googleapiclient.discovery.build(
    api_service_name, api_version, developerKey=DEVELOPER_KEY)

class YouTubeComments:
    def __init__(self, videoid):
        self.video_id = videoid
        self.comments = []
        self.unique_users = set()
        self.total_comments = 0
        self.max_time = datetime.min

    def fetch_comments(self):
            nextPageToken = None

            while True:
                comment_threads = youtube.commentThreads().list(
                    part="snippet",
                    videoId=self.video_id,
                    maxResults=100,
                    pageToken=nextPageToken
                ).execute()

                nextPageToken = comment_threads.get('nextPageToken')
                for item in comment_threads['items']:
                    snippet = item['snippet']['topLevelComment']['snippet']
                    self.comments.append([
                        snippet['authorDisplayName'],
                        snippet['textDisplay'],
                        snippet['publishedAt'],
                        snippet.get('likeCount', 0),
                        item['snippet'].get('totalReplyCount', 0),
                        '',  # Placeholder for reply author
                        '',  # Placeholder for reply
                        '',  # Placeholder for published
                        ''   # Placeholder for updated
                    ])
                    self.unique_users.add(snippet['authorDisplayName'])
                    self.total_comments += 1
                    if datetime.fromisoformat(snippet['publishedAt'][:-1]) > self.max_time:
                        self.max_time = datetime.fromisoformat(snippet['publishedAt'][:-1])


                    repCount = item['snippet'].get('totalReplyCount', 0)
                    if repCount > 0:
                        parent = item['snippet']['topLevelComment']['id']
                        nextPageTokenRep = None
                        while True:
                            replies = youtube.comments().list(
                                part="snippet",
                                parentId=parent,
                                maxResults=100,
                                pageToken=nextPageTokenRep
                            ).execute()
                            nextPageTokenRep = replies.get('nextPageToken')

                            for reply in replies['items']:
                                self.comments.append([
                                    '', '', '', '', '',
                                    reply['snippet']['authorDisplayName'],
                                    reply['snippet']['textDisplay'],
                                    reply['snippet']['publishedAt'],
                                    reply.get('likeCount', 0)
                                ])
                                self.unique_users.add(reply['snippet']['authorDisplayName'])
                                if datetime.fromisoformat(snippet['publishedAt'][:-1]) > self.max_time:
                                    self.max_time = datetime.fromisoformat(snippet['publishedAt'][:-1])

                            if not nextPageTokenRep:
                                break
                if not nextPageToken:
                    break
    
    def get_total_comments(self):
        return len(self.comments)
    def get_unique_users(self):
        return len(self.unique_users)
    def get_last_comment_time(self):
        return self.max_time