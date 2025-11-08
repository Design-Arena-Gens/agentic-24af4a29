'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import ContentGenerator from '@/components/ContentGenerator';
import PostCalendar from '@/components/PostCalendar';
import Analytics from '@/components/Analytics';
import PostList from '@/components/PostList';
import WorkflowManager from '@/components/WorkflowManager';
import { Post } from '@/types';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 'demo1',
      content: 'Stay hydrated this summer! 💧 Drinking adequate water helps regulate body temperature, improves digestion, and keeps your skin healthy. At Bharat Life Care, we recommend at least 8-10 glasses per day. #HealthyLiving #HydrationMatters #BharatLifeCare',
      platform: ['facebook', 'instagram'],
      status: 'published',
      createdAt: new Date(Date.now() - 172800000),
      hashtags: ['#HealthyLiving', '#HydrationMatters', '#BharatLifeCare'],
      engagement: {
        likes: 342,
        comments: 28,
        shares: 54,
        reach: 4521
      }
    },
    {
      id: 'demo2',
      content: 'World Heart Day Reminder ❤️ Take care of your cardiovascular health with regular exercise, balanced diet, and routine checkups. Schedule your heart health screening at Bharat Life Care today! #WorldHeartDay #HeartHealth #BharatLifeCare',
      platform: ['facebook', 'twitter', 'linkedin'],
      status: 'scheduled',
      scheduledFor: new Date(Date.now() + 86400000),
      createdAt: new Date(Date.now() - 86400000),
      hashtags: ['#WorldHeartDay', '#HeartHealth', '#BharatLifeCare']
    }
  ]);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'content' | 'calendar' | 'analytics' | 'workflows'>('dashboard');

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const handleUpdatePost = (updatedPost: Post) => {
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)' }}>
      <Header />

      {/* Navigation Tabs */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <nav style={{ display: 'flex', gap: '2rem', padding: '1rem 0' }}>
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'content', label: 'Create Content' },
              { id: 'calendar', label: 'Calendar' },
              { id: 'analytics', label: 'Analytics' },
              { id: 'workflows', label: 'Workflows' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.5rem 0',
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-light)',
                  borderBottom: activeTab === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container" style={{ padding: '2rem 1rem' }}>
        {activeTab === 'dashboard' && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            {/* Welcome Section */}
            <div className="card" style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
              color: 'white'
            }}>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Welcome to Bharat Life Care Social Media Manager
              </h1>
              <p style={{ fontSize: '1.125rem', opacity: 0.9 }}>
                AI-powered social media management for healthcare excellence
              </p>
            </div>

            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div className="card" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: 'white' }}>
                <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>Total Posts</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{posts.length}</div>
              </div>
              <div className="card" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white' }}>
                <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>Published</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                  {posts.filter(p => p.status === 'published').length}
                </div>
              </div>
              <div className="card" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white' }}>
                <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>Scheduled</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                  {posts.filter(p => p.status === 'scheduled').length}
                </div>
              </div>
              <div className="card" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', color: 'white' }}>
                <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>Draft</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                  {posts.filter(p => p.status === 'draft').length}
                </div>
              </div>
            </div>

            {/* Recent Posts */}
            <PostList posts={posts.slice(0, 3)} onUpdatePost={handleUpdatePost} />

            {/* Workflow Status */}
            <div className="card">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Active Workflows
              </h2>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div className="badge badge-success">Daily Health Tips: Active</div>
                <div className="badge badge-success">Weekly Patient Stories: Active</div>
                <div className="badge badge-success">Engagement Response: Active</div>
                <div className="badge badge-warning">Health Awareness: Paused</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <ContentGenerator onPostCreated={handlePostCreated} />
        )}

        {activeTab === 'calendar' && (
          <PostCalendar posts={posts} />
        )}

        {activeTab === 'analytics' && (
          <Analytics posts={posts} />
        )}

        {activeTab === 'workflows' && (
          <WorkflowManager />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        background: 'white',
        borderTop: '1px solid var(--border)',
        padding: '2rem 0',
        marginTop: '4rem'
      }}>
        <div className="container" style={{ textAlign: 'center', color: 'var(--text-light)' }}>
          <p>© 2025 Bharat Life Care - AI-Powered Social Media Management</p>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Empowering healthcare communication through intelligent automation
          </p>
        </div>
      </footer>
    </div>
  );
}
