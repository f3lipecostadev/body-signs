import React from 'react';
import { TeamMember as TeamMemberType } from '../../types';
import styles from './TeamMember.module.css';

interface TeamMemberProps {
  member: TeamMemberType;
}

const TeamMember: React.FC<TeamMemberProps> = ({ member }) => {
  return (
    <div className={styles.teamMember}>
      <div className={styles.memberAvatar}>
        {member.avatar}
      </div>
      <h4 className={styles.memberName}>{member.name}</h4>
      <p className={styles.memberRole}>{member.role}</p>
      <p className={styles.memberContact}>{member.email}</p>
    </div>
  );
};

export default TeamMember;