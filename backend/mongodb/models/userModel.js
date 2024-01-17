class User {
  constructor(bio, educationHistory, jobHistory, projects, awards, languages, skills) {
    this.bio = bio;
    this.educationHistory = educationHistory;
    this.jobHistory = jobHistory;
    this.projects = projects;
    this.awards = awards;
    this.languages = languages;
    this.skills = skills;
  }

  // Add methods for database interaction here
}

module.exports = User;