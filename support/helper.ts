import userList from "../fixtures/transactions.json";
import dayjs from 'dayjs'

class helper {
  getRandomUser(type: string) {
    const contactList = userList.users;
    const userObj = contactList[Math.floor(Math.random() * contactList.length)];
    userObj.amount = `${Math.floor(Math.random() * 99)}`;
    userObj.note = `${userObj.id}`;
    userObj.type = type;
    return userObj;
  }
  randomPhoneNumber() {
    const lastFourNumbers = dayjs().format("mmss");
    return `512-555-${lastFourNumbers}`;
  }
}
export default new helper();
