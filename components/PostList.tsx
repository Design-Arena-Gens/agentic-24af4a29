'use client';

import { Post } from '@/types';

export default function PostList({ posts, onUpdatePost }: { posts: Post[]; onUpdatePost: (post: Post) => void }) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: '#f59e0b',
      scheduled: '#3b82f6',
      published: '#22c55e',
      failed: '#ef4444'
    };
    return colors[status] || '#64748b';
  };

  const handlePublish = (post: Post) => {
    const updatedPost = {
      ...post,
      status: 'published' as const,
      engagement: {
        likes: Math.floor(Math.random() * 500) + 100,
        comments: Math.floor(Math.random() * 50) + 10,
        shares: Math.floor(Math.random() * 100) + 20,
        reach: Math.floor(Math.random() * 5000) + 1000
      }
    };
    onUpdatePost(updatedPost);
  };

  return (
    <div className="card">
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        All Posts
      </h2>

      {posts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: 'var(--text-light)'
        }}>
          <p>No posts created yet. Start by generating content!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                padding: '1.5rem',
                border: '1px solid var(--border)',
                borderRadius: '0.75rem',
                borderLeft: `4px solid ${getStatusColor(post.status)}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    {post.platform.map((p) => (
                      <span key={p} className="badge badge-info" style={{ textTransform: 'capitalize' }}>
                        {p}
                      </span>
                    ))}
                    <span
                      className="badge"
                      style={{
                        background: `${getStatusColor(post.status)}20`,
                        color: getStatusColor(post.status),
                        textTransform: 'capitalize'
                      }}
                    >
                      {post.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                    Created: {formatDate(post.createdAt)}
                    {post.scheduledFor && ` • Scheduled: ${formatDate(post.scheduledFor)}`}
                  </div>
                </div>
                {(post.status === 'draft' || post.status === 'scheduled') && (
                  <button
                    onClick={() => handlePublish(post)}
                    className="btn btn-primary"
                    style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                  >
                    Publish Now
                  </button>
                )}
              </div>

              <p style={{
                marginBottom: '1rem',
                lineHeight: '1.6',
                color: 'var(--text)'
              }}>
                {post.content}
              </p>

              {post.hashtags.length > 0 && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {post.hashtags.map((tag, idx) => (
                    <span key={idx} style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: '500' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {post.engagement && (
                <div style={{
                  display: 'flex',
                  gap: '2rem',
                  padding: '1rem',
                  background: 'var(--surface)',
                  borderRadius: '0.5rem',
                  flexWrap: 'wrap'
                }}>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                      {post.engagement.likes}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Likes</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                      {post.engagement.comments}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Comments</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                      {post.engagement.shares}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Shares</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                      {post.engagement.reach}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Reach</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
