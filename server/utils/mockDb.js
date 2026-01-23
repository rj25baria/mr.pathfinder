const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'mockData.json');

const defaultUsers = [
  {
    _id: "user_mock_1",
    name: "Riya Sharma",
    email: "riya.sharma@gmail.com",
    password: "hashed_password",
    role: "student",
    education: "B.Tech CSE",
    interests: ["Artificial Intelligence", "Machine Learning", "Python"],
    careerGoal: "AI Engineer",
    skillLevel: "Advanced",
    hoursPerWeek: "20",
    readinessScore: 92,
    streak: 21,
    lastActivity: new Date().toISOString(),
    badges: [{ name: "AI Wizard", date: new Date().toISOString() }]
  },
  {
    _id: "user_mock_2",
    name: "Richa Jaiswal",
    email: "richa.j@gmail.com",
    password: "hashed_password",
    role: "student",
    education: "B.E. IT",
    interests: ["Web Development", "React", "Node.js"],
    careerGoal: "Full Stack Developer",
    skillLevel: "Intermediate",
    hoursPerWeek: "15",
    readinessScore: 78,
    streak: 5,
    lastActivity: new Date().toISOString(),
    badges: [{ name: "Code Ninja", date: new Date().toISOString() }]
  },
  {
    _id: "user_mock_3",
    name: "Naitik Rathod",
    email: "naitik.r@gmail.com",
    password: "hashed_password",
    role: "student",
    education: "BCA",
    interests: ["Cloud Computing", "AWS", "DevOps"],
    careerGoal: "Cloud Engineer",
    skillLevel: "Beginner",
    hoursPerWeek: "25",
    readinessScore: 65,
    streak: 12,
    lastActivity: new Date().toISOString(),
    badges: [{ name: "Cloud Starter", date: new Date().toISOString() }]
  },
  {
    _id: "user_mock_hr",
    name: "HR Admin",
    email: "hr@gmail.com",
    password: "$2b$10$M2ShavGgJtvd0sy2PN9Q8OqEJqmiuBEXhnMhPyl5dOZWMp3dWilG2", // password123
    role: "hr",
    education: "MBA",
    interests: ["Recruiting", "Management"],
    careerGoal: "HR Manager",
    skillLevel: "Expert",
    hoursPerWeek: "40",
    readinessScore: 0,
    streak: 0,
    lastActivity: new Date().toISOString(),
    badges: []
  }
];

// Initialize data containers
let users = [...defaultUsers];
let roadmaps = [];
let feedbacks = [];

// Load from disk if available
const loadData = () => {
  if (fs.existsSync(DB_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
      if (data.users && Array.isArray(data.users)) users = data.users;
      if (data.roadmaps && Array.isArray(data.roadmaps)) roadmaps = data.roadmaps;
      if (data.feedbacks && Array.isArray(data.feedbacks)) feedbacks = data.feedbacks;
      
      // Ensure default users are present if users array is empty (or just merge them?)
      // For simplicity, if users loaded is empty but we expect defaults, we can add them.
      // But let's respect the file content. If file is corrupted, we might fallback.
      if (users.length === 0) users = [...defaultUsers];

    } catch (err) {
      console.error("Error loading mock DB from disk:", err);
    }
  }
};

const saveData = () => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify({ users, roadmaps, feedbacks }, null, 2));
  } catch (err) {
    console.error("Error saving mock DB to disk:", err);
  }
};

// Load initial data
loadData();

const addIdMethod = (arr) => {
  if (!arr) return [];
  arr.id = (itemId) => arr.find(i => i._id === itemId);
  return arr;
};

const enhanceDoc = (doc, dataStore) => {
  if (!doc) return null;
  
  // Add .id getter (mimic Mongoose)
  Object.defineProperty(doc, 'id', {
    get: function() { return this._id; },
    configurable: true
  });

  // Add save method
  doc.save = async () => {
    const idx = dataStore.findIndex(i => i._id === doc._id);
    if (idx !== -1) {
       dataStore[idx] = doc;
       saveData(); // Save on update
    }
    return doc;
  };

  // Add subdoc .id() methods for Roadmap
  if (doc.phases) doc.phases = addIdMethod(doc.phases);
  if (doc.projects) doc.projects = addIdMethod(doc.projects);
  
  return doc;
};

class MockModel {
  constructor(name, data) {
    this.name = name;
    this.data = data;
  }

  find(query = {}) {
    let results = [...this.data];
    
    // Filter
    if (Object.keys(query).length > 0) {
      results = results.filter(item => {
        if (query.$or) {
          return query.$or.some(condition => {
            const key = Object.keys(condition)[0];
            const val = condition[key];
            if (val.$regex) {
              const regex = new RegExp(val.$regex, val.$options);
              return regex.test(item[key]);
            }
            return item[key] === val;
          });
        }
        for (let key in query) {
          if (query[key]?.$gte) {
             if (item[key] < query[key].$gte) return false;
          } else if (item[key] !== query[key]) {
             return false;
          }
        }
        return true;
      });
    }

    const queryObj = {
      sort: (sortOpts) => {
        results.sort((a, b) => {
          const key = Object.keys(sortOpts)[0];
          return sortOpts[key] === -1 ? 
            (b[key] > a[key] ? 1 : -1) : 
            (a[key] > b[key] ? 1 : -1);
        });
        return queryObj;
      },
      select: () => queryObj,
      limit: (n) => {
        results = results.slice(0, n);
        return queryObj;
      },
      then: (resolve, reject) => {
        resolve(results.map(doc => enhanceDoc(doc, this.data)));
      }
    };
    return queryObj;
  }

  findOne(query = {}) {
    // Reuse find logic but return first item
    const findQuery = this.find(query);
    const originalThen = findQuery.then;
    
    findQuery.then = (resolve, reject) => {
      originalThen((results) => {
        resolve(results.length > 0 ? results[0] : null);
      }, reject);
    };
    
    return findQuery;
  }

  async findById(id) {
    const doc = this.data.find(item => item._id === id);
    return enhanceDoc(doc, this.data);
  }

  async create(doc) {
    const newDoc = { 
      ...doc, 
      _id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
    
    // Handle subdoc IDs
    if (newDoc.phases) newDoc.phases.forEach(p => p._id = Math.random().toString(36).substr(2, 9));
    if (newDoc.projects) newDoc.projects.forEach(p => p._id = Math.random().toString(36).substr(2, 9));

    this.data.push(newDoc);
    saveData(); // Save on create
    return enhanceDoc(newDoc, this.data);
  }

  async findByIdAndUpdate(id, update) {
    const idx = this.data.findIndex(i => i._id === id);
    if (idx === -1) return null;
    
    this.data[idx] = { ...this.data[idx], ...update };
    saveData(); // Save on update
    return enhanceDoc(this.data[idx], this.data);
  }
}

module.exports = {
  User: new MockModel('User', users),
  Roadmap: new MockModel('Roadmap', roadmaps),
  Feedback: new MockModel('Feedback', feedbacks)
};
