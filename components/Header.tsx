export default function Header() {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
      color: 'white',
      padding: '1.5rem 0',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '50px',
            height: '50px',
            background: 'white',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#2563eb',
            fontSize: '1.5rem'
          }}>
            B
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
              Bharat Life Care
            </h1>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '0.875rem' }}>
              AI Social Media Manager
            </p>
          </div>
        </div>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <a href="#dashboard" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>
            Dashboard
          </a>
          <a href="#content" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>
            Content
          </a>
          <a href="#analytics" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>
            Analytics
          </a>
        </nav>
      </div>
    </header>
  );
}
