import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";

// Function to commit a specific date
const commitForDate = async (date) => {
  const data = { date };
  await jsonfile.writeFile(path, data);
  await simpleGit().add([path]).commit(date, { "--date": date });
};

// Main function to commit for every day in the past year
const commitWholeYear = async () => {
  let currentDate = moment().subtract(1, "year").add(1, "day"); // start from 1 year ago
  const today = moment();

  while (currentDate.isBefore(today) || currentDate.isSame(today, "day")) {
    const formattedDate = currentDate.format();
    console.log("Committing for:", formattedDate);
    await commitForDate(formattedDate);
    currentDate.add(1, "day"); // move to the next day
  }

  await simpleGit().push(); // push all commits at the end
};

commitWholeYear();
