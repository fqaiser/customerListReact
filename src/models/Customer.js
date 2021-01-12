class Customer {
  constructor(data) {
    const { firstName, surName, telephone, dateOfBirth, id } = data;
    this.id = id || 0;
    this.firstName = firstName || undefined;
    this.surName = surName || undefined;
    this.telephone = telephone || undefined;
    this.dateOfBirth = dateOfBirth || undefined;
    this.showModal = false;
  }

  getFullName() {
    if (this.firstName && this.surName) {
      return `${this.firstName} ${this.surName}`;
    } else if (this.firstName && !this.surName) {
      return `${this.firstName}`;
    } else if (!this.firstName && this.surName) {
      return `${this.surName}`;
    } else {
      return "";
    }
  }

  getAge() {
    if (this.dateOfBirth) {
      return (
        new Date().getFullYear() - new Date(this.dateOfBirth).getFullYear()
      );
    } else {
      return 0;
    }
  }

  getBackgroundColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      colour += ("00" + value.toString(16)).substr(-2);
    }
    return colour;
  }
}

export default Customer;
