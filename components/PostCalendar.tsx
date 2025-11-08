'use client';

import { Post } from '@/types';

export default function PostCalendar({ posts }: { posts: Post[] }) {
  const scheduledPosts = posts.filter(p => p.status === 'scheduled' && p.scheduledFor);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
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

  return (
    <div className="card">
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Content Calendar
      </h2>

      {scheduledPosts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: 'var(--text-light)'
        }}>
          <p>No scheduled posts yet. Create and schedule your first post!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {scheduledPosts.map((post) => (
            <div
              key={post.id}
              style={{
                padding: '1rem',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                borderLeft: `4px solid ${getStatusColor(post.status)}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                    {formatDate(post.scheduledFor!)}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {post.platform.map((p) => (
                      <span key={p} className="badge badge-info" style={{ fontSize: '0.75rem', textTransform: 'capitalize' }}>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
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
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text)',
                marginBottom: '0.5rem',
                lineHeight: '1.5'
              }}>
                {post.content.substring(0, 150)}...
              </p>
              {post.hashtags.length > 0 && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {post.hashtags.map((tag, idx) => (
                    <span key={idx} style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
