'use client';

import { Post, Platform } from '@/types';
import { AIEngine } from '@/lib/aiEngine';

export default function Analytics({ posts }: { posts: Post[] }) {
  const publishedPosts = posts.filter(p => p.status === 'published');

  const totalEngagement = publishedPosts.reduce((sum, post) => {
    if (!post.engagement) return sum;
    return sum + post.engagement.likes + post.engagement.comments + post.engagement.shares;
  }, 0);

  const platformStats = (['facebook', 'instagram', 'twitter', 'linkedin'] as Platform[]).map(platform => {
    const platformPosts = publishedPosts.filter(p => p.platform.includes(platform));
    const engagement = platformPosts.reduce((sum, post) => {
      if (!post.engagement) return sum;
      return sum + post.engagement.likes + post.engagement.comments + post.engagement.shares;
    }, 0);

    return {
      platform,
      posts: platformPosts.length,
      engagement
    };
  });

  const topPost = publishedPosts.reduce((top, post) => {
    if (!post.engagement || !top.engagement) return post.engagement ? post : top;
    const postEng = post.engagement.likes + post.engagement.comments + post.engagement.shares;
    const topEng = top.engagement.likes + top.engagement.comments + top.engagement.shares;
    return postEng > topEng ? post : top;
  }, publishedPosts[0]);

  return (
    <div className="card">
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Performance Analytics
      </h2>

      {/* Overview Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          borderRadius: '0.75rem',
          color: 'white'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{publishedPosts.length}</div>
          <div style={{ opacity: 0.9 }}>Published Posts</div>
        </div>

        <div style={{
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          borderRadius: '0.75rem',
          color: 'white'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{totalEngagement.toLocaleString()}</div>
          <div style={{ opacity: 0.9 }}>Total Engagement</div>
        </div>

        <div style={{
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          borderRadius: '0.75rem',
          color: 'white'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            {publishedPosts.length > 0 ? Math.round(totalEngagement / publishedPosts.length) : 0}
          </div>
          <div style={{ opacity: 0.9 }}>Avg. Engagement</div>
        </div>

        <div style={{
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          borderRadius: '0.75rem',
          color: 'white'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{posts.filter(p => p.status === 'scheduled').length}</div>
          <div style={{ opacity: 0.9 }}>Scheduled Posts</div>
        </div>
      </div>

      {/* Platform Breakdown */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
          Platform Performance
        </h3>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {platformStats.map((stat) => (
            <div
              key={stat.platform}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: 'var(--surface)',
                borderRadius: '0.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'var(--primary)',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}>
                  {stat.platform[0]}
                </div>
                <div>
                  <div style={{ fontWeight: '600', textTransform: 'capitalize' }}>{stat.platform}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                    {stat.posts} posts
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                  {stat.engagement}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                  engagements
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performing Post */}
      {topPost && topPost.engagement && (
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
            Top Performing Post
          </h3>
          <div style={{
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            borderRadius: '0.75rem',
            border: '2px solid #f59e0b'
          }}>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              {topPost.content.substring(0, 200)}...
            </p>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d97706' }}>
                  {topPost.engagement.likes}
                </span>
                <span style={{ marginLeft: '0.5rem', color: '#92400e' }}>Likes</span>
              </div>
              <div>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d97706' }}>
                  {topPost.engagement.comments}
                </span>
                <span style={{ marginLeft: '0.5rem', color: '#92400e' }}>Comments</span>
              </div>
              <div>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d97706' }}>
                  {topPost.engagement.shares}
                </span>
                <span style={{ marginLeft: '0.5rem', color: '#92400e' }}>Shares</span>
              </div>
              <div>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d97706' }}>
                  {topPost.engagement.reach}
                </span>
                <span style={{ marginLeft: '0.5rem', color: '#92400e' }}>Reach</span>
              </div>
            </div>
            {topPost.engagement.reach > 0 && (
              <div style={{ marginTop: '1rem', padding: '1rem', background: 'white', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#92400e', marginBottom: '0.25rem' }}>
                  AI Analysis
                </div>
                <div style={{ fontWeight: '500' }}>
                  {AIEngine.analyzePerformance(
                    topPost.engagement.likes,
                    topPost.engagement.comments,
                    topPost.engagement.shares,
                    topPost.engagement.reach
                  ).recommendation}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
