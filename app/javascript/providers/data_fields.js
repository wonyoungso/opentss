const evictionDataFields = {
  "Case Number": {
    "value": true,
    "critical": false
  },
  "Case Type": {
    "value": false,
    "critical": true
  },
  "Court Name": {
    "value": true,
    "critical": false
  },
  "Defendant’s Name": {
    "value": true,
    "critical": false
  },
  "Defendant’s Address": {
    "value": true,
    "critical": false
  },
  "Defendant’s SSN": {
    "value": true,
    "critical": false
  },
  "Amount": {
    "value": true,
    "critical": false
  },
  "Any Dates": {
    "value": true,
    "critical": true
  },
  "Judgment": {
    "value": true,
    "critical": true
  },
  "Plaintiff’s Name": {
    "value": true,
    "critical": false
  }
}

const criminalDataFields = {
  "Case Number": {
    "value": true,
    "critical": false
  },
  "Any Dates": {
    "value": true,
    "critical": true
  },
  "Comments": {
    "value": false,
    "critical": false
  },
  "Disposition": {
    "value": true,
    "critical": true
  },
  "Jurisdiction": {
    "value": true,
    "critical": false
  },
  "Jurisdiction State": {
    "value": false,
    "critical": false
  },
  "Method Verified": {
    "value": false,
    "critical": false
  },
  "Offense Degree": {
    "value": true,
    "critical": true
  },
  "Person's Info": {
    "value": true,
    "critical": false
  },
  "Reporting Agency": {
    "value": false,
    "critical": false
  },
  "Sentence": {
    "value": false,
    "critical": false
  },
  "Statute": {
    "value": false,
    "critical": false
  },
  "Types of Charge": {
    "value": true,
    "critical": true
  },
  "Case Type": {
    "value": true,
    "critical": true
  }
};

export { criminalDataFields, evictionDataFields }

