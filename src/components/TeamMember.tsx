import { TeamMember as TeamMemberType } from '../types.ts'

interface TeamMemberProps {
  member: TeamMemberType
}

export default function TeamMember({ member }: TeamMemberProps) {
  return (
    <div
      className="text-center p-6 bg-white rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6633FF] to-[#5229cc] mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
        {member.avatar}
      </div>

      <h4 className="font-bold text-[#6633FF] mb-1">
        {member.name}
      </h4>

      <p className="text-gray-600 text-sm mb-2">
        {member.role}
      </p>

      <p className="text-gray-500 text-xs">
        {member.email}
      </p>
    </div>
  )
}
