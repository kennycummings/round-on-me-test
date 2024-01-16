module.exports = {
  // Function to format time
  format_time: (date) => {
    return new Date(date).toLocaleTimeString();
  },

  // Function to format date
  format_date: (date) => {
    const formattedDate = new Date(date);
    return `${formattedDate.getMonth() + 1}/${formattedDate.getDate()}/${formattedDate.getFullYear()}`;
  },
};