'use client';

import { useState } from 'react';

export default function WorkflowManager() {
  const [workflows] = useState([
    {
      id: '1',
      name: 'Daily Health Tips',
      description: 'Auto-generate and post daily health tips',
      frequency: 'Daily at 9:00 AM',
      active: true,
      lastRun: new Date(Date.now() - 86400000),
      nextRun: new Date(Date.now() + 3600000)
    },
    {
      id: '2',
      name: 'Weekly Patient Stories',
      description: 'Share patient testimonials every week',
      frequency: 'Weekly on Monday',
      active: true,
      lastRun: new Date(Date.now() - 604800000),
      nextRun: new Date(Date.now() + 172800000)
    },
    {
      id: '3',
      name: 'Health Awareness Campaigns',
      description: 'Monthly health awareness content',
      frequency: 'Monthly (1st day)',
      active: false,
      lastRun: new Date(Date.now() - 2592000000),
      nextRun: null
    },
    {
      id: '4',
      name: 'Engagement Response',
      description: 'Auto-respond to comments and messages',
      frequency: 'Real-time',
      active: true,
      lastRun: new Date(Date.now() - 300000),
      nextRun: new Date()
    }
  ]);

  const formatDate = (date: Date | null) => {
    if (!date) return 'Not scheduled';
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card">
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Workflow Automation
      </h2>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {workflows.map((workflow) => (
          <div
            key={workflow.id}
            style={{
              padding: '1.5rem',
              border: '1px solid var(--border)',
              borderRadius: '0.75rem',
              background: workflow.active ? 'white' : 'var(--surface)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  {workflow.name}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
                  {workflow.description}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.875rem' }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    background: 'var(--surface)',
                    borderRadius: '0.25rem',
                    fontWeight: '500'
                  }}>
                    {workflow.frequency}
                  </span>
                  <span
                    className="badge"
                    style={{
                      background: workflow.active ? '#dcfce7' : '#f1f5f9',
                      color: workflow.active ? '#166534' : '#64748b'
                    }}
                  >
                    {workflow.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <button
                className="btn"
                style={{
                  background: workflow.active ? 'var(--error)' : 'var(--secondary)',
                  color: 'white',
                  fontSize: '0.875rem',
                  padding: '0.5rem 1rem'
                }}
              >
                {workflow.active ? 'Pause' : 'Activate'}
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginTop: '1rem',
              padding: '1rem',
              background: 'var(--surface)',
              borderRadius: '0.5rem'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginBottom: '0.25rem' }}>
                  Last Run
                </div>
                <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>
                  {formatDate(workflow.lastRun)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginBottom: '0.25rem' }}>
                  Next Run
                </div>
                <div style={{ fontWeight: '500', fontSize: '0.875rem', color: workflow.active ? 'var(--primary)' : 'var(--text-light)' }}>
                  {formatDate(workflow.nextRun)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '1.5rem',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
        borderRadius: '0.75rem',
        border: '1px solid #3b82f6'
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e40af' }}>
          AI Workflow Features
        </h3>
        <ul style={{ marginLeft: '1.25rem', color: '#1e40af', fontSize: '0.875rem', lineHeight: '1.8' }}>
          <li>Automatic content generation based on trending health topics</li>
          <li>Smart scheduling based on audience engagement patterns</li>
          <li>Auto-response to comments and messages with context-aware replies</li>
          <li>Performance monitoring and optimization recommendations</li>
          <li>Crisis detection and alert system for negative sentiment</li>
          <li>Compliance checking for healthcare regulations</li>
        </ul>
      </div>
    </div>
  );
}
