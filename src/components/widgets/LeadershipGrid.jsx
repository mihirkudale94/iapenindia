import { officeBearersBios, advisoryBoardBios } from '@/data/biographies';

const findBio = (name) => {
  const bios = { ...officeBearersBios, ...advisoryBoardBios };
  if (bios[name]) return bios[name];
  const key = Object.keys(bios).find((item) => name.includes(item) || item.includes(name));
  return key ? bios[key] : null;
};

const ROLE_PATTERN =
  /(president|secretary|treasurer|advisor|diabetologist|officer|member|chair|founder|mentor|patron|committee|coordinator|co-ordinator|media|research)/i;

const getIdentity = (member) => {
  if (!member.title)
    return {
      name: member.name,
      role: member.role || '',
      bio: [member.detail, findBio(member.name)].filter(Boolean).join('\n'),
    };
  const lines = member.title
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length > 1) {
    const firstLooksLikeRole = ROLE_PATTERN.test(lines[0]);
    return {
      name: firstLooksLikeRole ? lines.slice(1).join(' ') : lines[0],
      role: firstLooksLikeRole ? lines[0] : lines.slice(1).join(' '),
      bio: member.details,
    };
  }
  // Single-line "Role - Name" or "Name - Role" titles.
  const parts = member.title.split(/\s+-\s+/);
  if (parts.length === 2) {
    const nameFirst = /^(dr|mr|mrs|ms|prof)\b/i.test(parts[0]) && !ROLE_PATTERN.test(parts[0]);
    const [name, role] = nameFirst ? parts : [parts[1], parts[0]];
    if (ROLE_PATTERN.test(role) || nameFirst) return { name, role, bio: member.details };
  }
  return { name: member.title, role: '', bio: member.details };
};

// Same horizontal photo + bio card used on the Core Group and Chapter detail pages.
const LeadershipGrid = ({ members }) => (
  <div className="profile-directory-grid">
    {members.map((member, index) => {
      const profile = getIdentity(member);
      return (
        <article className="profile-directory-card" key={`${member.title || member.name}-${index}`}>
          <img src={member.image} alt={profile.name} className="profile-directory-image" />
          <div className="profile-directory-content">
            {profile.role && <span className="custom-badge bg-teal-light">{profile.role}</span>}
            <h3>{profile.name}</h3>
            {profile.bio && <p>{profile.bio}</p>}
          </div>
        </article>
      );
    })}
  </div>
);

export default LeadershipGrid;
