import React, { useState } from 'react'

const TextInputLarge = ({name, onChange}) => {

    const [inputValue, setInputValue] = useState("");
    const [isCharacterLimit, setIsCharacterLimit] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setIsCharacterLimit(value.length > 1500);
        onChange(value);
    }
    
    if(isCharacterLimit) {
        return (
            <>
                <textarea className='w-full px-2 py-1 text-xl border border-red-500 rounded-md' rows="4" placeholder="请输入（不超过100字）" value={inputValue} onChange={handleInputChange}></textarea>
                <div className='text-sm text-red-500 ml-1 mt-1'>{name}不能超过1500字</div>
            </>
        )
    }
    else {
        return (
            <textarea className='w-full px-2 py-1 text-xl border border-alpha-blue rounded-md' rows="4" placeholder="请输入（不超过1500字）" value={inputValue} onChange={handleInputChange}></textarea>
        )
    }
}

export default TextInputLarge