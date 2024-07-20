import React, { useState } from 'react'
import { backIcon } from '../../lib/iconLab';

const DropdownInput = ({name, options, isRequired, hasOther, onChange}) => {
    
    const [selectedOption, setSelectedOption] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [isOther, setIsOther] = useState(false);
    const [isCharacterLimit, setIsCharacterLimit] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    const handleOptionSelect = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
        setIsOther(value === "Other");
        value === "Other" ? onChange("") : onChange(value);
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setIsCharacterLimit(value.length > 100);
        setIsEmpty(value.length == 0);
        onChange(value);
    }

    const handleReturnToDropdown = () => {
        setSelectedOption(options[0]);
        setInputValue("");
        setIsCharacterLimit(false);
        setIsEmpty(true);
        setIsOther(false);
        onChange(options[0]);
    }

    if(isOther) {
        if(isCharacterLimit) {
            return (
                <>
                    <div className='flex border border-red-500 rounded-md'>
                        <input className='w-full px-2 py-1 text-xl rounded-l-md' type="text" placeholder="请输入（不超过100字）" value={inputValue} onChange={handleInputChange}></input>
                        <button onClick={handleReturnToDropdown} className='bg-white rounded-r-md w-4'>{backIcon}</button>
                    </div>
                    <div className='text-sm text-red-500 ml-1 mt-1'>{name}不能超过100字</div>
                </>
            )
        }
        else if(isRequired && isEmpty) {
            return (
                <>
                    <div className='flex border border-red-500 rounded-md'>
                        <input className='w-full px-2 py-1 text-xl rounded-l-md' type="text" placeholder="请输入（不超过100字）" value={inputValue} onChange={handleInputChange}></input>
                        <button onClick={handleReturnToDropdown} className='bg-white rounded-r-md w-4'>{backIcon}</button>
                    </div>
                    <div className='text-sm text-red-500 ml-1 mt-1'>{name}是必填信息</div>
                </>
            )
        }
        else {
            return (
                <div className='flex border border-alpha-blue rounded-md'>
                    <input className='w-full px-2 py-1 text-xl rounded-l-md' type="text" placeholder="请输入（不超过100字）" value={inputValue} onChange={handleInputChange}></input>
                    <button onClick={handleReturnToDropdown} className='bg-white rounded-r-md w-4'>{backIcon}</button>
                </div> 
            )
        }
    }
    else {
        return (
            <div>
                <select className='w-full px-2 py-1 text-xl border border-alpha-blue rounded-md' onChange={handleOptionSelect} value={selectedOption}>
                    {options.map((option, index) => {
                        return <option key={index} value={option}>{option}</option>
                    })}
                    {hasOther ? <option value="Other">其他</option> : ""}
                </select>
            </div>
        )
    }
}

export default DropdownInput