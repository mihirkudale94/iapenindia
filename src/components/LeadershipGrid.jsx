import { useState } from 'react';
import { createPortal } from 'react-dom';
import { User, X } from 'lucide-react';
import { officeBearersBios, advisoryBoardBios } from '../data/biographies';

const findBio = (name) => {
  const bios = { ...officeBearersBios, ...advisoryBoardBios };
  if (bios[name]) return bios[name];
  const key = Object.keys(bios).find((item) => name.includes(item) || item.includes(name));
  return key ? bios[key] : null;
};

const getIdentity = (member) => {
  if (!member.title)
    return {
      name: member.name,
      role: member.role || '',
      detail: member.detail || '',
      bio: findBio(member.name),
    };
  const lines = member.title
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length > 1) {
    const firstLooksLikeRole =
      /(president|secretary|treasurer|advisor|diabetologist|officer|member|chair|founder)/i.test(
        lines[0]
      );
    return {
      name: firstLooksLikeRole ? lines.slice(1).join(' ') : lines[0],
      role: firstLooksLikeRole ? lines[0] : lines.slice(1).join(' '),
      detail: '',
      bio: member.details,
    };
  }
  return { name: member.title, role: '', detail: '', bio: member.details };
};

const LeadershipGrid = ({ members, accent = 'primary' }) => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="grid-3 office-grid">
        {members.map((member) => {
          const profile = getIdentity(member);
          const bio = profile.bio;
          return (
            <article
              key={member.title || member.name}
              className={`card bearer-card text-center ${bio ? 'cursor-pointer hover-lift' : ''}`}
              onClick={() => bio && setSelected({ ...member, ...profile, bio })}
            >
              <img src={member.image} alt={profile.name} className="bearer-image" />
              <h3 className="bearer-name">{profile.name}</h3>
              {profile.role && <span className="bearer-role">{profile.role}</span>}
              {profile.detail && <p className="bearer-dept">{profile.detail}</p>}
              {bio && (
                <span
                  className={`view-profile-btn mt-auto pt-4 text-${accent} font-semibold text-sm inline-block`}
                >
                  View Profile
                </span>
              )}
            </article>
          );
        })}
      </div>

      {selected &&
        createPortal(
          <div className="modal-backdrop" onClick={() => setSelected(null)}>
            <div
              className="modal-container"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="profile-name"
            >
              <button
                className="modal-close"
                onClick={() => setSelected(null)}
                aria-label="Close profile"
              >
                <X size={24} />
              </button>
              <div className="modal-body-content">
                <div className="modal-member-header">
                  <div className="modal-avatar">
                    <User size={48} className="text-primary" />
                  </div>
                  <div>
                    <h3 id="profile-name" className="modal-member-name">
                      {selected.name}
                    </h3>
                    {selected.role && <p className="modal-member-role">{selected.role}</p>}
                    {selected.detail && <p className="modal-member-dept">{selected.detail}</p>}
                  </div>
                </div>
                <div className="modal-bio-text text-left">
                  {selected.bio.split('\n').map((paragraph) => (
                    <p key={paragraph} className="bio-para">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default LeadershipGrid;
