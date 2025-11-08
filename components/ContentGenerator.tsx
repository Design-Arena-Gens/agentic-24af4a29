'use client';

import { useState } from 'react';
import { AIEngine } from '@/lib/aiEngine';
import { ContentCategory, ContentIdea, Platform } from '@/types';

export default function ContentGenerator({ onPostCreated }: { onPostCreated: (post: any) => void }) {
  const [selectedCategory, setSelectedCategory] = useState<ContentCategory>('health-tips');
  const [selectedIdea, setSelectedIdea] = useState<ContentIdea | null>(null);
  const [generatedContent, setGeneratedContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['facebook']);
  const [tone, setTone] = useState<'professional' | 'friendly' | 'inspiring'>('friendly');
  const [scheduledTime, setScheduledTime] = useState('');

  const contentIdeas = AIEngine.generateContentIdeas(selectedCategory);

  const handleGenerateContent = (idea: ContentIdea) => {
    setSelectedIdea(idea);
    const content = AIEngine.generatePostContent(idea, tone);
    setGeneratedContent(content);
  };

  const handlePlatformToggle = (platform: Platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleSchedulePost = () => {
    if (!generatedContent || selectedPlatforms.length === 0) {
      alert('Please generate content and select at least one platform');
      return;
    }

    const post = {
      id: Date.now().toString(),
      content: generatedContent,
      platform: selectedPlatforms,
      status: scheduledTime ? 'scheduled' : 'draft',
      scheduledFor: scheduledTime ? new Date(scheduledTime) : undefined,
      createdAt: new Date(),
      hashtags: selectedIdea?.suggestedHashtags || [],
    };

    onPostCreated(post);
    setGeneratedContent('');
    setSelectedIdea(null);
    setScheduledTime('');
    alert('Post created successfully!');
  };

  return (
    <div className="card">
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        AI Content Generator
      </h2>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {/* Category Selection */}
        <div>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '0.5rem' }}>
            Content Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as ContentCategory)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--border)',
              fontSize: '1rem'
            }}
          >
            <option value="health-tips">Health Tips</option>
            <option value="wellness-guide">Wellness Guide</option>
            <option value="health-awareness">Health Awareness</option>
            <option value="patient-testimonial">Patient Testimonial</option>
            <option value="company-news">Company News</option>
            <option value="product-showcase">Product Showcase</option>
          </select>
        </div>

        {/* Tone Selection */}
        <div>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '0.5rem' }}>
            Tone
          </label>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {(['professional', 'friendly', 'inspiring'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className="btn"
                style={{
                  background: tone === t ? 'var(--primary)' : 'var(--surface)',
                  color: tone === t ? 'white' : 'var(--text)',
                  textTransform: 'capitalize'
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Content Ideas */}
        <div>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '0.5rem' }}>
            AI-Suggested Content Ideas
          </label>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {contentIdeas.map((idea) => (
              <div
                key={idea.id}
                style={{
                  padding: '1rem',
                  border: `2px solid ${selectedIdea?.id === idea.id ? 'var(--primary)' : 'var(--border)'}`,
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  background: selectedIdea?.id === idea.id ? '#eff6ff' : 'white'
                }}
                onClick={() => handleGenerateContent(idea)}
              >
                <h3 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{idea.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
                  {idea.description}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {idea.suggestedHashtags.map((tag, idx) => (
                    <span key={idx} className="badge badge-info" style={{ fontSize: '0.75rem' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generated Content */}
        {generatedContent && (
          <div>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '0.5rem' }}>
              Generated Content
            </label>
            <textarea
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e.target.value)}
              rows={6}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
          </div>
        )}

        {/* Platform Selection */}
        {generatedContent && (
          <div>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '0.5rem' }}>
              Select Platforms
            </label>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {(['facebook', 'instagram', 'twitter', 'linkedin'] as Platform[]).map((platform) => (
                <button
                  key={platform}
                  onClick={() => handlePlatformToggle(platform)}
                  className="btn"
                  style={{
                    background: selectedPlatforms.includes(platform) ? 'var(--secondary)' : 'var(--surface)',
                    color: selectedPlatforms.includes(platform) ? 'white' : 'var(--text)',
                    textTransform: 'capitalize'
                  }}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Schedule Time */}
        {generatedContent && (
          <div>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '0.5rem' }}>
              Schedule Post (Optional)
            </label>
            <input
              type="datetime-local"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)',
                fontSize: '1rem'
              }}
            />
          </div>
        )}

        {/* Action Button */}
        {generatedContent && (
          <button
            onClick={handleSchedulePost}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', fontSize: '1rem' }}
          >
            {scheduledTime ? 'Schedule Post' : 'Save as Draft'}
          </button>
        )}
      </div>
    </div>
  );
}
