export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="/products/iphone-17-pro" aria-label="1Fi home">
          <span className="brand-mark">1Fi</span>
          <span className="brand-copy">
            <strong>1Fi</strong>
            <small>Smart EMI</small>
          </span>
        </a>

        <div className="header-right">
          <span className="secure-badge">🔒 Secure checkout</span>
        </div>
      </div>
    </header>
  );
}
