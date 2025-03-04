export interface NewsItem {
    created_at: string;
    view: number;
    like: number;
    comment: number;
    id: string;
    title: string;
    content: string;
    thumbnail_url: string;
    tags: {
      id: number;
      name: string;
      slug: string;
      pivot: {
        post_id: number;
        post_tag_id: number;
      };
    }[];
    created_by: string;
  }