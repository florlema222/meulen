import { getAllTeamMembers, type TeamMember } from '@/lib/team'
import { getDictionary, type Locale } from '@/lib/i18n'

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex flex-col items-center text-center">
      {member.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={member.photo}
          alt={member.name}
          className="w-32 h-32 rounded-full object-cover mb-4 shadow-md"
        />
      ) : (
        <div className="w-32 h-32 rounded-full mb-4 flex items-center justify-center bg-gradient-to-br from-meulen-brown to-meulen-brown-light text-white text-3xl font-playfair font-bold shadow-md">
          {initials(member.name)}
        </div>
      )}
      <h3 className="font-playfair text-lg font-bold text-meulen-dark-brown">
        {member.name}
      </h3>
      {member.description && (
        <p className="text-sm text-meulen-dark-brown/70 mt-2 leading-relaxed max-w-xs">
          {member.description}
        </p>
      )}
    </div>
  )
}

export default function TeamSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const members = getAllTeamMembers(locale)
  const leadership = members.filter((m) => m.category === 'Responsables')
  const rest = members.filter((m) => m.category !== 'Responsables')

  return (
    <section className="relative">
      {/* Topographic background */}
      <div
        className="absolute inset-0 bg-repeat opacity-25"
        style={{ backgroundImage: 'url(/images/hero-topographic.png)', backgroundSize: '1200px auto' }}
      />
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-meulen-dark-brown mb-12 text-center">
            {t.team.title}
          </h1>

          {members.length === 0 ? (
            <div className="text-center text-meulen-dark-brown/60 py-12">
              <p className="text-lg">{t.team.empty}</p>
            </div>
          ) : (
            <>
              {leadership.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl font-playfair font-bold text-meulen-dark-brown mb-10 text-center">
                    {t.team.leadership}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-4xl mx-auto">
                    {leadership.map((member) => (
                      <MemberCard key={member.slug} member={member} />
                    ))}
                  </div>
                </div>
              )}

              {rest.length > 0 && (
                <div>
                  <h2 className="text-2xl font-playfair font-bold text-meulen-dark-brown mb-10 text-center">
                    {t.team.members}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {rest.map((member) => (
                      <MemberCard key={member.slug} member={member} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
