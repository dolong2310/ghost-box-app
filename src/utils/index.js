export const formatTime = (now) => {
    const date = `0${now.getDate()}`.slice(-2);
    const month = `0${now.getMonth()}`.slice(-2);
    const year = now.getFullYear();
    const hours = `0${now.getHours()}`.slice(-2);
    const minutes = `0${now.getMinutes()}`.slice(-2);
    const ampm = hours >= 12 ? "PM" : "AM";
    const time = `${date}/${month}/${year} ${hours}:${minutes}${ampm}`;
    return time;
};

export const randomId = () => {
    return Math.floor(Math.random() * 100000);
};

export const convertStringToDate = (dateString) => {
    // 04/3/2021 11:24AM
    const arrDate = dateString.split(" "); // ["04/3/2021", "11:24AM"]
    const date = arrDate[0].split("/"); // ["04","3","2021"]
    const time = arrDate[1].slice(0, arrDate[1].length - 2); // ["11:24"]

    const dateFormat = `${date[2]}-${date[1]}-${date[0]} ${time}`;

    return new Date(dateFormat);
};
