import React, { useState } from 'react'
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddIncomeForm = ({onAddIncome}) => {
    const [income, setIncome] = useState({
        source:"",
        amount:"",
        date:"",
        icon:""
    })

    const handleChange = (key, value) => setIncome({...income, [key]: value});

  return (
    <div>
        <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)} />



        <Input value={income.source} onChange={({ target }) => handleChange("source", target.value)} lable="Income source" placeholder="Freelance, Salary, etc" type="text" />
        <Input value={income.amount} onChange={({ target }) => handleChange("amount", target.value)} lable="Income amount" placeholder="" type="number" />
        <Input value={income.date} onChange={({ target }) => handleChange("date", target.value)} lable="Income date" placeholder="" type="date" />

        <div className='flex justify-end mt-5'>
            <button type='button' className='add-btn add-btn-fill' onClick={() => onAddIncome(income)}>
                Add Income
            </button>
        </div>
    </div>
  )
}

export default AddIncomeForm