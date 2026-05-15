const skills = [
  {
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React", "Tailwind"],
  },
  {
    title: "Backend",
    items: ["Firebase", "Node.js"],
  },
  {
    title: "Database",
    items: ["Firestore", "MySQL","MongoDB","MicrosoftSQL"],
  },
  {
    title: "Cybersecurity",
    items: ["Linux", "Network Security", "Ethical Hacking"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "VS Code", "Figma"],
  },
];

function Skills() {
  return (
    <section className="skills-section">
      <h2 className="skills-title">My Skills</h2>

      <div className="skills-container">
        {skills.map((skill, index) => (
          <div className="skill-card" key={index}>
            <h3>{skill.title}</h3>

            <div className="skill-items">
              {skill.items.map((item, i) => (
                <span className="skill-badge" key={i}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;