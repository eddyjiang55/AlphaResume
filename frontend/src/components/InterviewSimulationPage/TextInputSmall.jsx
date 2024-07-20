import React, { useState } from 'react'

const TextInputSmall = ({name, isRequired, onChange}) => {

    const [inputValue, setInputValue] = useState("");
    const [isCharacterLimit, setIsCharacterLimit] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setIsCharacterLimit(value.length > 100);
        setIsEmpty(value.length == 0);
        onChange(value);
    }
    
    if(isCharacterLimit) {
        return (
            <>
                <input className='w-full px-2 py-1 text-xl border border-red-500 rounded-md' type="text" placeholder="请输入（不超过100字）" value={inputValue} onChange={handleInputChange}></input>
                <div className='text-sm text-red-500 ml-1 mt-1'>{name}不能超过100字</div>
            </>
        )
    }
    else if(isRequired && isEmpty) {
        return (
            <>
                <input className='w-full px-2 py-1 text-xl border border-red-500 rounded-md' type="text" placeholder="请输入（不超过100字）" value={inputValue} onChange={handleInputChange}></input>
                <div className='text-sm text-red-500 ml-1 mt-1'>{name}是必填信息</div>
            </>
        )
    }
    else {
        return (
            <input className='w-full px-2 py-1 text-xl border border-alpha-blue rounded-md' type="text" placeholder="请输入（不超过100字）" value={inputValue} onChange={handleInputChange}></input>
        )
    }
}

export default TextInputSmall