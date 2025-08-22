import moment from "moment"
import { data } from "react-router-dom";
export const validateEmail = (email) => {
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return regex.test(email)
}

export const getInitials = (name) => {
    if(!name) return "";

    const word = name.split(" ")
    let initials = ""

    for(let i = 0; i < Math.min(word.length || 2); i++) {
        initials += word[i][0];
    }
    return initials.toUpperCase()
}

export const addThousendSeparator = (num) => {
    if(num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".")
    const formatedInterger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    return fractionalPart ? `${formatedInterger}.${fractionalPart}` : formatedInterger;
}


export const prepareExpenseBarChartData = (data = []) => {
    const chartData = data.map((item) => ({
        category:item?.category,
        amount:item?.amount
    }))

    return chartData


}
export const prepareIncomeBarChartData = (data = []) => {
    const sortData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date));

    const chartData = sortData.map((item) =>( {
        month: moment(item?.date).format("Do MMM"),
        amount:item?.amount,
        source:item?.source
    }))

    return chartData
}

export const prepareExpenseLineChartData = (data = []) => {
    const sortData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date));

    const chartData = sortData.map((item) =>( {
        month: moment(item?.date).format("Do MMM"),
        amount:item?.amount,
        category:item?.category
    }))

    return chartData
}