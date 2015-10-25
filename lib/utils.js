
module.exports = {
  convertEmailToName: function (emails) {
    return emails.map(function (email) {
      var names = email.split('@')[0].split('.');
      return names.map(function (name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
      }).join(' ');
    });
  },
  concatEmails: function (emails) {
    return emails.join(', ');
  }
}
