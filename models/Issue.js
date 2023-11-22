const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const dbPath = path.join(__dirname, '../data/Issues.json');

class Issue {
  constructor({ userId,description, image,latitude,longitude,city,state,suburb,display_name,postcode,status}) {
    this.id = uuidv4();
    this.userId = userId;
    this.description = description;
    this.image = image;
    this.latitude = latitude;
    this.longitude = longitude;
    this.city = city;
    this.state = state;
    this.suburb =suburb;
    this.display_name = display_name;
    this.postcode = postcode;
    this.status=status || 'pending';
    this.createdDate=new Date().toDateString();
    this.closedDate = null;

  }
  updateStatus(newStatus) 
  {
    this.status = newStatus;
    if (newStatus === 'resolved' && !this.closedDate) {
      this.closedDate = new Date().toDateString();
    }


  }

  // static getAllIssues() {
  //   const issues = getAllIssues();
  //   return issues;
  // }

  static getAllIssues() {
    try {
      const data = fs.readFileSync(dbPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  save() {
    const issues = Issue.getAllIssues();
    issues.push(this);
    fs.writeFileSync(dbPath, JSON.stringify(issues, null, 2));
    return this;
  }
}

module.exports = Issue;
