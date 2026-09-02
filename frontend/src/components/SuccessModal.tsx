type Props = {
  reference: string;
  onClose: () => void;
};

export function SuccessModal({ reference, onClose }: Props) {
  return (
    <div className="modal-backdrop" role="presentation">
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="success-title">
        <div className="success-icon">✓</div>
        <p className="section-kicker">Plan selected</p>
        <h2 id="success-title">You're ready to continue</h2>
        <p>
          Your EMI selection has been recorded for the next step of the application.
        </p>
        <div className="reference">
          <span>Application reference</span>
          <strong>{reference}</strong>
        </div>
        <button className="proceed-button" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}
